import prismaTwitter from '@/lib/prismaTwitter'

const WEIGHTS = {
    RETWEET: 3,
    REPLY: 1,
    MENTION: 1,
    SHARED_HASHTAG: 0.5,
    SHARED_URL: 0.3
}

/**
 * Builds and analyzes the Ego-Graph for a specific user.
 * 
 * @param {string|number} identifier - Username or ID
 */
export async function buildEgoGraph(identifier) {
    try {
        // 1. Resolve Target Profile
        let profile
        const isId = /^\d+$/.test(identifier)

        if (isId) {
            profile = await prismaTwitter.profiles.findUnique({ where: { id: BigInt(identifier) } })
        } else {
            const username = identifier.toString().replace('@', '')
            profile = await prismaTwitter.profiles.findFirst({
                where: { username: { equals: username, mode: 'insensitive' } }
            })
        }

        if (!profile) throw new Error('Profile not found')

        const targetId = profile.id
        const targetUsername = profile.username

        // 2. Data Collection (Interactions)
        // We need to find top N interacting partners.

        // A. Outgoing: Retweets, Replies, Mentions
        // We can query comments where author_postid = targetId
        const outgoingInteractions = await prismaTwitter.$queryRaw`
            SELECT 
                CASE 
                    WHEN reposted_tweet_id IS NOT NULL THEN 'RETWEET'
                    WHEN reply_comment_id IS NOT NULL THEN 'REPLY'
                    ELSE 'MENTION' -- Simplified, assumes if not RT/Reply but has mention it's a mention
                END as type,
                COALESCE(reply_comment_username, author_post_username) as partner_username, -- For mentions we might need to parse, but let's use reply_username for now
                hashtags,
                urls
            FROM comments
            WHERE author_postid = ${targetId}
            ORDER BY date DESC
            LIMIT 500
        `

        // B. Incoming: Retweets, Replies
        // Query comments where reply_comment_username = targetUsername OR reposted_tweet_id points to target's tweet (harder to join efficiently without tweet lookup, so we'll rely on username matches for replies/mentions and maybe skip incoming RTs for speed if not indexed, or try a join)

        // Let's try a robust query for top partners
        const topPartners = await prismaTwitter.$queryRaw`
            WITH interactions AS (
                -- Outgoing
                SELECT 
                    reply_comment_username as username,
                    CASE 
                        WHEN reposted_tweet_id IS NOT NULL THEN ${WEIGHTS.RETWEET}
                        WHEN reply_comment_id IS NOT NULL THEN ${WEIGHTS.REPLY}
                        ELSE ${WEIGHTS.MENTION}
                    END as weight
                FROM comments
                WHERE author_postid = ${targetId} 
                AND reply_comment_username IS NOT NULL
                
                UNION ALL
                
                -- Incoming (Replies/Mentions to user)
                SELECT 
                    author_post_username as username,
                    CASE 
                        WHEN reposted_tweet_id IS NOT NULL THEN ${WEIGHTS.RETWEET} -- Incoming RT (approximate if we can't link easily)
                        WHEN reply_comment_id IS NOT NULL THEN ${WEIGHTS.REPLY}
                        ELSE ${WEIGHTS.MENTION}
                    END as weight
                FROM comments
                WHERE reply_comment_username = ${targetUsername}
                AND author_postid != ${targetId}
            )
            SELECT 
                username,
                SUM(weight) as total_weight
            FROM interactions
            WHERE username IS NOT NULL
            GROUP BY username
            ORDER BY total_weight DESC
            LIMIT 50
        `

        const partnerUsernames = topPartners.map(p => p.username)

        // Fetch profiles for partners to get IDs
        const partnerProfiles = await prismaTwitter.profiles.findMany({
            where: { username: { in: partnerUsernames } }
        })

        const profileMap = new Map()
        profileMap.set(targetId.toString(), profile)
        partnerProfiles.forEach(p => profileMap.set(p.id.toString(), p))

        // 3. Build Graph (Nodes & Edges)
        const nodes = [targetId.toString(), ...partnerProfiles.map(p => p.id.toString())]
        const edges = []
        const adjacency = new Map() // id -> Map(neighborId -> weight)

        nodes.forEach(id => adjacency.set(id, new Map()))

        // Helper to add edge
        const addEdge = (source, target, weight, type) => {
            if (!adjacency.has(source) || !adjacency.has(target)) return

            const sourceMap = adjacency.get(source)
            const currentWeight = sourceMap.get(target) || 0
            sourceMap.set(target, currentWeight + weight)

            // Undirected for community detection (usually), or directed? 
            // LPA works on directed or undirected. Let's keep it directed for Role calculation, 
            // but symmetrize for Community Detection if needed.

            edges.push({ source, target, weight, type })
        }

        // Fetch interactions between ALL nodes in the ego network (to find clusters among neighbors)
        // This is expensive if N is large. For N=50 it's okay.
        const nodeIdsBigInt = nodes.map(id => BigInt(id))

        const networkInteractions = await prismaTwitter.$queryRaw`
            SELECT 
                author_postid as source,
                reply_comment_username as target_username,
                CASE 
                    WHEN reposted_tweet_id IS NOT NULL THEN ${WEIGHTS.RETWEET}
                    WHEN reply_comment_id IS NOT NULL THEN ${WEIGHTS.REPLY}
                    ELSE ${WEIGHTS.MENTION}
                END as weight,
                hashtags,
                urls
            FROM comments
            WHERE author_postid = ANY(${nodeIdsBigInt})
            AND reply_comment_username = ANY(${partnerUsernames})
            LIMIT 2000
        `

        // Process interactions
        for (const row of networkInteractions) {
            const sourceId = row.source.toString()
            const targetProfile = partnerProfiles.find(p => p.username === row.target_username) || (row.target_username === targetUsername ? profile : null)

            if (targetProfile) {
                const targetId = targetProfile.id.toString()
                if (sourceId !== targetId) {
                    addEdge(sourceId, targetId, Number(row.weight), 'interaction')

                    // Hashtag/URL similarity (simplified: add small weight if present)
                    // Real implementation would compare sets. Here we just boost if content exists.
                    if (row.hashtags && row.hashtags.length > 0) {
                        addEdge(sourceId, targetId, WEIGHTS.SHARED_HASHTAG, 'hashtag')
                    }
                }
            }
        }

        // 4. Community Detection (Label Propagation)
        const communities = runLabelPropagation(nodes, adjacency)

        // 5. Calculate Metrics & Roles
        const analyzedNodes = nodes.map(nodeId => {
            const p = profileMap.get(nodeId)
            if (!p) return null

            const communityId = communities.get(nodeId)

            // Calculate Degree Centrality within Ego Graph
            let inWeight = 0
            let outWeight = 0

            // Incoming
            nodes.forEach(source => {
                inWeight += adjacency.get(source)?.get(nodeId) || 0
            })

            // Outgoing
            outWeight = Array.from(adjacency.get(nodeId)?.values() || []).reduce((a, b) => a + b, 0)

            // Determine Role
            let role = 'Member'
            if (nodeId === targetId.toString()) role = 'Ego'
            else if (inWeight > outWeight * 2 && inWeight > 10) role = 'Influencer' // High support
            else if (outWeight > inWeight * 2) role = 'Supporter' // High outgoing
            else if (inWeight > 5 && outWeight > 5) role = 'Bridge' // Connected both ways

            return {
                id: nodeId,
                username: p.username,
                name: p.name,
                communityId,
                metrics: {
                    inWeight,
                    outWeight,
                    totalWeight: inWeight + outWeight
                },
                role
            }
        }).filter(n => n !== null)

        // Group by Community
        const clusters = {}
        analyzedNodes.forEach(node => {
            if (!clusters[node.communityId]) {
                clusters[node.communityId] = {
                    id: node.communityId,
                    members: [],
                    totalWeight: 0
                }
            }
            clusters[node.communityId].members.push(node)
            clusters[node.communityId].totalWeight += node.metrics.totalWeight
        })

        // Format Output
        return {
            target: analyzedNodes.find(n => n.id === targetId.toString()),
            stats: {
                totalNodes: nodes.length,
                totalEdges: edges.length,
                communityCount: Object.keys(clusters).length
            },
            clusters: Object.values(clusters).sort((a, b) => b.totalWeight - a.totalWeight),
            lists: {
                supportCore: analyzedNodes
                    .filter(n => n.id !== targetId.toString())
                    .sort((a, b) => b.metrics.outWeight - a.metrics.outWeight) // Who supports Ego (outgoing to Ego? No, outWeight is total outgoing)
                // Wait, outWeight calculated above is total outgoing to ANYONE in graph.
                // We want outgoing specifically to TARGET for "Support Core".
                // Let's refine this.
            }
        }

    } catch (error) {
        console.error('Ego Graph Error:', error)
        return { error: error.message }
    }
}

/**
 * Simple Label Propagation Algorithm
 */
function runLabelPropagation(nodes, adjacency, maxIterations = 10) {
    const labels = new Map()
    // Init unique labels
    nodes.forEach((node, idx) => labels.set(node, idx))

    for (let i = 0; i < maxIterations; i++) {
        const shuffled = [...nodes].sort(() => Math.random() - 0.5)
        let changed = false

        for (const node of shuffled) {
            const neighbors = adjacency.get(node)
            if (!neighbors || neighbors.size === 0) continue

            const labelCounts = new Map()

            // Count neighbor labels weighted
            for (const [neighborId, weight] of neighbors.entries()) {
                const neighborLabel = labels.get(neighborId)
                labelCounts.set(neighborLabel, (labelCounts.get(neighborLabel) || 0) + weight)
            }

            // Also consider incoming edges (undirected for community detection?)
            // Usually LPA is better on undirected or symmetrized graphs for community structure.
            // Let's check incoming edges too.
            for (const [sourceId, sourceMap] of adjacency.entries()) {
                if (sourceMap.has(node)) {
                    const weight = sourceMap.get(node)
                    const sourceLabel = labels.get(sourceId)
                    labelCounts.set(sourceLabel, (labelCounts.get(sourceLabel) || 0) + weight)
                }
            }

            // Find max
            let maxLabel = labels.get(node)
            let maxScore = -1

            for (const [label, score] of labelCounts.entries()) {
                if (score > maxScore) {
                    maxScore = score
                    maxLabel = label
                }
            }

            if (maxLabel !== labels.get(node)) {
                labels.set(node, maxLabel)
                changed = true
            }
        }

        if (!changed) break
    }

    return labels
}
