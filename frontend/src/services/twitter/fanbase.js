import prismaTwitter from '@/lib/prismaTwitter'
import { analysisStore } from '@/lib/analysisStore'
import { ANALYSIS_CONFIG } from '@/config/twitter-analysis'
import Graph from 'graphology'
import louvain from 'graphology-communities-louvain'

/**
 * Processes fanbase clustering to identify organic support communities.
 * 
 * NEW Methodology (Support vs Opposition):
 * 1. Builds SUPPORT graph from retweets only (not replies/quotes)
 * 2. Detects communities using connected components
 * 3. Identifies leaders based on SUPPORT from cluster members (not total engagement)
 * 4. Calculates Support Scores using support edges only
 * 5. Distinguishes organic communities from bot networks
 * 
 * Key metrics:
 * - supportIn: Support edges (retweets) from cluster members
 * - shareInCluster: % of total support coming from this cluster
 * - supportRatio: Support vs opposition ratio (placeholder for future)
 */
export async function processFanbaseClustering(jobId) {
    try {
        analysisStore.updateJob(jobId, { progress: 5, message: 'Fetching active profiles...' })

        // Step 1: Get all active profiles with sufficient activity
        const activeProfiles = await prismaTwitter.$queryRaw`
            SELECT 
                p.id,
                p.username,
                p.name,
                CAST(COUNT(c.id) AS INTEGER) as comment_count
            FROM profiles p
            JOIN comments c ON c.author_postid = p.id
            GROUP BY p.id, p.username, p.name
            HAVING COUNT(c.id) >= ${ANALYSIS_CONFIG.LIMITS.MIN_COMMENTS_FOR_PROFILE}
            ORDER BY COUNT(c.id) DESC
            LIMIT ${ANALYSIS_CONFIG.LIMITS.COMMUNITY_DETECTION_PROFILES}
        `

        if (activeProfiles.length < 10) {
            analysisStore.updateJob(jobId, {
                status: 'failed',
                error: 'Insufficient data for fanbase clustering',
                progress: 100
            })
            return
        }

        const profileIds = activeProfiles.map(p => p.id.toString())
        const profileMap = new Map(activeProfiles.map(p => [p.id.toString(), p]))

        const totalComments = activeProfiles.reduce((acc, p) => acc + p.comment_count, 0)

        analysisStore.updateJob(jobId, {
            progress: 20,
            message: `Building Support Graph (${totalComments.toLocaleString()} comments)...`
        })

        // Step 2: Build SUPPORT Graph (Retweets ONLY)
        const supportRetweets = await prismaTwitter.$queryRaw`
            SELECT 
                c1.author_postid as source_id,
                c2.author_postid as target_id,
                CAST(COUNT(*) AS INTEGER) as weight
            FROM comments c1
            JOIN comments c2 ON c1.reply_comment_id = c2.tweet_id
            WHERE c1.author_postid = ANY(${profileIds}::bigint[])
                AND c2.author_postid = ANY(${profileIds}::bigint[])
                AND c1.author_postid != c2.author_postid
            GROUP BY c1.author_postid, c2.author_postid
            HAVING COUNT(*) >= ${ANALYSIS_CONFIG.FANBASE.THRESHOLDS.MIN_RETWEETS}
        `

        analysisStore.updateJob(jobId, {
            progress: 40,
            message: `Building Opposition Graph (for future use)...`
        })

        // Step 3: Build OPPOSITION Graph (Replies - for future opponent detection)
        const oppositionReplies = await prismaTwitter.$queryRaw`
            SELECT 
                c1.author_postid as source_id,
                c2.author_postid as target_id,
                CAST(COUNT(*) AS INTEGER) as weight
            FROM comments c1
            JOIN comments c2 ON c1.reply_comment_id = c2.id
            WHERE c1.author_postid = ANY(${profileIds}::bigint[])
                AND c2.author_postid = ANY(${profileIds}::bigint[])
                AND c1.author_postid != c2.author_postid
            GROUP BY c1.author_postid, c2.author_postid
            HAVING COUNT(*) >= ${ANALYSIS_CONFIG.FANBASE.THRESHOLDS.MIN_QUOTES_REPLIES}
        `

        analysisStore.updateJob(jobId, {
            progress: 55,
            message: `Analyzing Hashtag Co-Usage...`
        })

        // Step 4: Build Hashtag Co-Usage Graph (for Support Score calculation)
        const hashtagCoUsage = await prismaTwitter.$queryRaw`
            WITH user_hashtags AS (
                SELECT 
                    author_postid,
                    unnest(hashtags) as hashtag
                FROM comments
                WHERE author_postid = ANY(${profileIds}::bigint[])
                    AND hashtags IS NOT NULL
                    AND array_length(hashtags, 1) > 0
            ),
            hashtag_counts AS (
                SELECT 
                    author_postid,
                    COUNT(DISTINCT hashtag) as total_hashtags
                FROM user_hashtags
                GROUP BY author_postid
            )
            SELECT 
                uh1.author_postid as source_id,
                uh2.author_postid as target_id,
                CAST(COUNT(DISTINCT uh1.hashtag) AS INTEGER) as shared_hashtags,
                CAST(
                    COUNT(DISTINCT uh1.hashtag)::FLOAT / 
                    NULLIF(
                        (SELECT total_hashtags FROM hashtag_counts WHERE author_postid = uh1.author_postid) +
                        (SELECT total_hashtags FROM hashtag_counts WHERE author_postid = uh2.author_postid) -
                        COUNT(DISTINCT uh1.hashtag)
                    , 0)
                AS FLOAT) as jaccard_similarity
            FROM user_hashtags uh1
            JOIN user_hashtags uh2 ON 
                uh1.hashtag = uh2.hashtag
                AND uh1.author_postid < uh2.author_postid
            GROUP BY uh1.author_postid, uh2.author_postid
            HAVING COUNT(DISTINCT uh1.hashtag) >= ${ANALYSIS_CONFIG.FANBASE.THRESHOLDS.MIN_SHARED_HASHTAGS}
        `

        analysisStore.updateJob(jobId, {
            progress: 70,
            message: `Detecting communities...`
        })

        // Step 5: Build SUPPORT graph (retweets only)
        const supportGraph = new Map()
        const supportInDegree = new Map()  // Support from ALL profiles
        const supportOutDegree = new Map()

        profileIds.forEach(id => {
            supportGraph.set(id, new Map())
            supportInDegree.set(id, 0)
            supportOutDegree.set(id, 0)
        })

        // Add retweet edges to support graph
        supportRetweets.forEach(edge => {
            const sourceId = edge.source_id.toString()
            const targetId = edge.target_id.toString()

            supportGraph.get(sourceId).set(targetId, edge.weight)
            supportInDegree.set(targetId, supportInDegree.get(targetId) + edge.weight)
            supportOutDegree.set(sourceId, supportOutDegree.get(sourceId) + edge.weight)
        })

        // Build OPPOSITION graph (for future use)
        const oppositionGraph = new Map()
        const oppositionInDegree = new Map()

        profileIds.forEach(id => {
            oppositionGraph.set(id, new Map())
            oppositionInDegree.set(id, 0)
        })

        oppositionReplies.forEach(edge => {
            const sourceId = edge.source_id.toString()
            const targetId = edge.target_id.toString()

            oppositionGraph.get(sourceId).set(targetId, edge.weight)
            oppositionInDegree.set(targetId, oppositionInDegree.get(targetId) + edge.weight)
        })

        analysisStore.updateJob(jobId, {
            progress: 75,
            message: `Calculating global metrics...`
        })

        // Step 5.5: Calculate global metrics for all profiles
        const globalMetrics = new Map()

        for (const profileId of profileIds) {
            // 1. Global support (total retweets from ALL profiles)
            const globalSupport = supportInDegree.get(profileId) || 0

            // 2. Unique supporters (count of unique users who retweeted)
            const uniqueSupporters = new Set()
            for (const [sourceId, targets] of supportGraph.entries()) {
                if (targets.has(profileId)) {
                    uniqueSupporters.add(sourceId)
                }
            }

            // 3. Total comments (as proxy for activity/reach)
            const profile = profileMap.get(profileId)
            const totalComments = profile?.comment_count || 0

            globalMetrics.set(profileId, {
                globalSupport,
                uniqueSupporters: uniqueSupporters.size,
                totalComments
            })
        }

        // Normalize global metrics to 0-1 scale
        const maxGlobalSupport = Math.max(...Array.from(globalMetrics.values()).map(m => m.globalSupport), 1)
        const maxUniqueSupporters = Math.max(...Array.from(globalMetrics.values()).map(m => m.uniqueSupporters), 1)
        const maxComments = Math.max(...Array.from(globalMetrics.values()).map(m => m.totalComments), 1)

        for (const [profileId, metrics] of globalMetrics.entries()) {
            metrics.normalizedGlobalSupport = metrics.globalSupport / maxGlobalSupport
            metrics.normalizedUniqueSupporters = metrics.uniqueSupporters / maxUniqueSupporters
            metrics.normalizedComments = metrics.totalComments / maxComments
        }

        analysisStore.updateJob(jobId, {
            progress: 75,
            message: `Applying hub strategy and edge filtering...`
        })

        // Step 5.7: Apply hub strategy and edge filtering
        const { processedGraph, hubIds } = applyHubStrategyAndFiltering(
            supportGraph,
            supportInDegree,
            globalMetrics,
            profileIds
        )

        analysisStore.updateJob(jobId, {
            progress: 80,
            message: `Detecting communities using ${ANALYSIS_CONFIG.FANBASE.CLUSTERING.ALGORITHM}...`
        })

        // Step 6: Community detection using configured algorithm
        const communities = detectCommunities(processedGraph, profileIds, hubIds)

        // Step 7: Identify leaders and calculate metrics for each community
        const communityResults = []

        for (const community of communities) {
            if (community.length < ANALYSIS_CONFIG.FANBASE.THRESHOLDS.MIN_COMMUNITY_SIZE) {
                continue
            }

            // NEW: Identify leaders based on LeadershipScore (local + global)
            const leaderData = identifyLeaders(community, supportGraph, supportInDegree, profileIds, globalMetrics)
            const leaders = leaderData.map(l => l.id)

            // Calculate community metrics (using support graph)
            const metrics = calculateCommunityMetrics(community, supportGraph, leaders)

            // Determine if community is organic
            const isOrganic = isOrganicCommunity(metrics)

            // Get member details with support scores
            const members = community.map(id => {
                const profile = profileMap.get(id)
                const supportScore = calculateSupportScore(id, community, leaders, supportGraph, hashtagCoUsage)
                const leaderInfo = leaderData.find(l => l.id === id)

                return {
                    id: profile.id,
                    username: profile.username,
                    name: profile.name,
                    comment_count: profile.comment_count,
                    supportScore: supportScore.toFixed(3),
                    isLeader: leaders.includes(id),
                    // NEW metrics
                    supportIn: leaderInfo?.supportIn || 0,
                    shareInCluster: leaderInfo ? (leaderInfo.shareInCluster * 100).toFixed(1) : '0.0'
                }
            }).sort((a, b) => b.supportScore - a.supportScore)

            // Get top hashtags for this community
            const topHashtags = await getTopHashtags(community)

            // Identify potential opponents (high opposition, low support)
            const opponents = identifyOpponents(community, supportGraph, oppositionGraph, leaders, profileMap)

            // NEW: Identify Core Supporters (local activists not selected as leaders)
            // Get all candidates with scores first
            const allCandidates = identifyLeaders(community, supportGraph, supportInDegree, profileIds, globalMetrics)

            const coreSupporters = allCandidates
                .filter(c => !leaders.includes(c.id)) // Not already a leader
                .filter(c =>
                    c.supportIn >= ANALYSIS_CONFIG.FANBASE.LEADER_THRESHOLDS.MIN_SUPPORT_IN &&
                    c.shareInCluster >= 0.5 // High cluster specificity (>50%)
                )
                .sort((a, b) => b.supportIn - a.supportIn)
                .slice(0, 50) // Top 50

            communityResults.push({
                size: community.length,
                leaders: leaderData.map(l => {
                    const profile = profileMap.get(l.id)
                    return {
                        id: profile.id,
                        username: profile.username,
                        name: profile.name,
                        leadershipScore: l.leadershipScore,
                        supportIn: l.supportIn,
                        globalSupport: l.globalSupport,
                        uniqueSupporters: l.uniqueSupporters,
                        totalIn: l.totalIn,
                        shareInCluster: (l.shareInCluster * 100).toFixed(1) + '%',
                        supportRatio: l.supportRatio ? (l.supportRatio * 100).toFixed(1) + '%' : 'N/A'
                    }
                }),
                coreSupporters: coreSupporters.map(c => {
                    const profile = profileMap.get(c.id)
                    return {
                        id: profile.id,
                        username: profile.username,
                        name: profile.name,
                        supportIn: c.supportIn,
                        shareInCluster: (c.shareInCluster * 100).toFixed(1) + '%'
                    }
                }),
                members,
                opponents,
                metrics: {
                    density: (metrics.density * 100).toFixed(2),
                    reciprocity: (metrics.reciprocity * 100).toFixed(0),
                    clusteringCoefficient: metrics.clusteringCoefficient.toFixed(3),
                    avgEdgeWeight: metrics.avgEdgeWeight.toFixed(1),
                    totalWeight: metrics.totalWeight
                },
                topHashtags,
                isOrganic,
                organicityScore: calculateOrganicityScore(metrics)
            })
        }

        // Sort by size descending
        communityResults.sort((a, b) => b.size - a.size)

        const result = {
            totalProfiles: activeProfiles.length,
            totalCommunities: communityResults.length,
            organicCommunities: communityResults.filter(c => c.isOrganic).length,
            communities: communityResults.slice(0, 50), // Return top 50
            graphStats: {
                supportEdges: supportRetweets.length,
                oppositionEdges: oppositionReplies.length,
                hashtagEdges: hashtagCoUsage.length
            }
        }

        // Save results to database
        analysisStore.updateJob(jobId, {
            progress: 95,
            message: 'Saving results to database...'
        })

        try {
            console.log('[Fanbase] Calling saveFanbaseRunToDatabase...')
            await saveFanbaseRunToDatabase(communityResults, {
                nodeCount: activeProfiles.length,
                edgeCount: supportRetweets.length,
                method: ANALYSIS_CONFIG.FANBASE.CLUSTERING.ALGORITHM,
                params: {
                    resolution: ANALYSIS_CONFIG.FANBASE.CLUSTERING.RESOLUTION,
                    edgeThreshold: ANALYSIS_CONFIG.FANBASE.CLUSTERING.EDGE_WEIGHT_THRESHOLD,
                    hubStrategy: ANALYSIS_CONFIG.FANBASE.CLUSTERING.HUB_STRATEGY
                }
            })
            console.log('[Fanbase] Database save completed successfully')
        } catch (dbError) {
            console.error('[Fanbase] Failed to save to database:', dbError)
            console.error('[Fanbase] Error stack:', dbError.stack)
            // Continue anyway - in-memory result is still valid
        }

        analysisStore.updateJob(jobId, {
            status: 'completed',
            progress: 100,
            message: 'Analysis Complete',
            result
        })

    } catch (error) {
        console.error('Error in fanbase clustering:', error)
        analysisStore.updateJob(jobId, {
            status: 'failed',
            error: `Fanbase clustering failed: ${error.message}`,
            progress: 100
        })
    }
}

/**
 * NEW: Identify leaders based on LeadershipScore (local + global significance)
 * 
 * LeadershipScore combines:
 * 1. Local support (30%) - Support from cluster members
 * 2. Global support (40%) - Total retweets from all profiles
 * 3. Structural centrality (20%) - Unique supporters (reach)
 * 4. Cluster specificity (10%) - Share of activity from this cluster
 */
function identifyLeaders(community, supportGraph, totalSupportInDegree, allProfileIds, globalMetrics) {
    const candidates = []

    // Calculate max local support for normalization
    let maxSupportInCluster = 0
    for (const nodeId of community) {
        let supportIn = 0
        for (const sourceId of community) {
            supportIn += supportGraph.get(sourceId)?.get(nodeId) || 0
        }
        maxSupportInCluster = Math.max(maxSupportInCluster, supportIn)
    }

    for (const nodeId of community) {
        // 1. Local support (from cluster members)
        let supportInFromCluster = 0
        for (const sourceId of community) {
            supportInFromCluster += supportGraph.get(sourceId)?.get(nodeId) || 0
        }

        // 2. Global metrics
        const global = globalMetrics.get(nodeId)
        const totalSupportIn = totalSupportInDegree.get(nodeId) || 0

        // 3. Share in cluster
        const shareInCluster = totalSupportIn > 0
            ? supportInFromCluster / totalSupportIn
            : 0

        // 4. Normalized local support (0-1)
        const normalizedLocalSupport = maxSupportInCluster > 0
            ? supportInFromCluster / maxSupportInCluster
            : 0

        // 5. Calculate LeadershipScore
        const leadershipScore = (
            ANALYSIS_CONFIG.FANBASE.LEADERSHIP_WEIGHTS.LOCAL_SUPPORT * normalizedLocalSupport +
            ANALYSIS_CONFIG.FANBASE.LEADERSHIP_WEIGHTS.GLOBAL_SUPPORT * global.normalizedGlobalSupport +
            ANALYSIS_CONFIG.FANBASE.LEADERSHIP_WEIGHTS.STRUCTURAL_CENTRALITY * global.normalizedUniqueSupporters +
            ANALYSIS_CONFIG.FANBASE.LEADERSHIP_WEIGHTS.CLUSTER_SPECIFICITY * shareInCluster
        )

        candidates.push({
            id: nodeId,
            supportIn: supportInFromCluster,
            totalIn: totalSupportIn,
            shareInCluster,
            supportRatio: 1.0,  // Placeholder for future
            leadershipScore,
            globalSupport: global.globalSupport,
            uniqueSupporters: global.uniqueSupporters
        })
    }

    // Filter: must meet minimum thresholds (relaxed for global leaders)
    const validLeaders = candidates.filter(c =>
        (c.supportIn >= ANALYSIS_CONFIG.FANBASE.LEADER_THRESHOLDS.MIN_SUPPORT_IN ||
            c.globalSupport >= ANALYSIS_CONFIG.FANBASE.LEADER_THRESHOLDS.MIN_GLOBAL_SUPPORT) &&
        c.shareInCluster >= ANALYSIS_CONFIG.FANBASE.LEADER_THRESHOLDS.MIN_SHARE_IN_CLUSTER
    )

    // Sort by leadershipScore descending (not just supportIn)
    validLeaders.sort((a, b) => b.leadershipScore - a.leadershipScore)

    // Take top N% (default 5%) or minimum 1
    const leaderCount = Math.max(1, Math.ceil(validLeaders.length * ANALYSIS_CONFIG.FANBASE.LEADER_THRESHOLDS.PERCENTILE))
    return validLeaders.slice(0, leaderCount)
}

/**
 * NEW: Identify potential opponents (high opposition, low support)
 */
function identifyOpponents(community, supportGraph, oppositionGraph, leaders, profileMap) {
    const opponents = []

    for (const nodeId of community) {
        // Skip if already a leader
        if (leaders.includes(nodeId)) continue

        // Count opposition from cluster
        let oppositionIn = 0
        for (const sourceId of community) {
            const weight = oppositionGraph.get(sourceId)?.get(nodeId) || 0
            oppositionIn += weight
        }

        // Count support from cluster
        let supportIn = 0
        for (const sourceId of community) {
            const weight = supportGraph.get(sourceId)?.get(nodeId) || 0
            supportIn += weight
        }

        // Opponent criteria: high opposition, low support
        if (oppositionIn > 20 && oppositionIn > supportIn * 2) {
            const profile = profileMap.get(nodeId)
            opponents.push({
                id: profile.id,
                username: profile.username,
                name: profile.name,
                oppositionIn,
                supportIn,
                role: 'Frequently Discussed Opponent'
            })
        }
    }

    // Sort by opposition descending
    opponents.sort((a, b) => b.oppositionIn - a.oppositionIn)

    // Return top 5
    return opponents.slice(0, 5)
}

/**
 * Apply hub strategy (dampening or removal) and edge filtering
 */
function applyHubStrategyAndFiltering(supportGraph, supportInDegree, globalMetrics, profileIds) {
    const config = ANALYSIS_CONFIG.FANBASE.CLUSTERING
    const hubIds = new Set()

    // Step 1: Identify hubs
    for (const profileId of profileIds) {
        const globalSupport = globalMetrics.get(profileId)?.globalSupport || 0
        if (globalSupport >= config.HUB_THRESHOLD) {
            hubIds.add(profileId)
        }
    }

    console.log(`[Fanbase] Identified ${hubIds.size} hubs (threshold: ${config.HUB_THRESHOLD})`)

    // Step 2: Create processed graph
    const processedGraph = new Map()
    profileIds.forEach(id => processedGraph.set(id, new Map()))

    // Step 3: Apply strategy
    for (const [sourceId, targets] of supportGraph.entries()) {
        // Skip if source is a hub and strategy is 'remove'
        if (config.HUB_STRATEGY === 'remove' && hubIds.has(sourceId)) {
            continue
        }

        for (const [targetId, weight] of targets.entries()) {
            // Skip if target is a hub and strategy is 'remove'
            if (config.HUB_STRATEGY === 'remove' && hubIds.has(targetId)) {
                continue
            }

            // Apply edge weight threshold
            if (weight < config.EDGE_WEIGHT_THRESHOLD) {
                continue
            }

            // Apply dampening if strategy is 'dampen' and target is a hub
            let processedWeight = weight
            if (config.HUB_STRATEGY === 'dampen' && hubIds.has(targetId)) {
                const globalSupport = globalMetrics.get(targetId)?.globalSupport || 1
                if (config.HUB_DAMPEN_FACTOR === 'log') {
                    processedWeight = weight / Math.log(globalSupport + 10)
                } else if (config.HUB_DAMPEN_FACTOR === 'sqrt') {
                    processedWeight = weight / Math.sqrt(globalSupport + 1)
                }
            }

            processedGraph.get(sourceId).set(targetId, processedWeight)
        }
    }

    // Count edges
    let totalEdges = 0
    for (const targets of processedGraph.values()) {
        totalEdges += targets.size
    }

    console.log(`[Fanbase] Processed graph: ${totalEdges} edges (strategy: ${config.HUB_STRATEGY}, threshold: ${config.EDGE_WEIGHT_THRESHOLD})`)

    return { processedGraph, hubIds }
}

/**
 * Community detection using configured algorithm
 * Supports: connected_components, louvain
 */
function detectCommunities(graph, profileIds, hubIds = new Set()) {
    const config = ANALYSIS_CONFIG.FANBASE.CLUSTERING

    if (config.ALGORITHM === 'louvain') {
        return detectCommunitiesLouvain(graph, profileIds, hubIds)
    } else {
        return detectCommunitiesConnectedComponents(graph, profileIds)
    }
}

/**
 * Louvain community detection with resolution parameter
 */
function detectCommunitiesLouvain(graph, profileIds, hubIds) {
    const config = ANALYSIS_CONFIG.FANBASE.CLUSTERING

    // Build graphology graph
    const G = new Graph({ type: 'directed' })

    // Add nodes
    for (const nodeId of profileIds) {
        G.addNode(nodeId)
    }

    // Add edges
    for (const [sourceId, targets] of graph.entries()) {
        for (const [targetId, weight] of targets.entries()) {
            if (weight > 0) {
                try {
                    G.addEdge(sourceId, targetId, { weight })
                } catch (e) {
                    // Edge might already exist, skip
                }
            }
        }
    }

    console.log(`[Fanbase] Running Louvain with resolution=${config.RESOLUTION} on ${G.order} nodes, ${G.size} edges`)

    // Run Louvain
    const communityMap = louvain(G, {
        resolution: config.RESOLUTION,
        getEdgeWeight: 'weight'
    })

    // Convert to array of communities
    const communitiesMap = new Map()
    for (const [nodeId, communityId] of Object.entries(communityMap)) {
        if (!communitiesMap.has(communityId)) {
            communitiesMap.set(communityId, [])
        }
        communitiesMap.get(communityId).push(nodeId)
    }

    // Re-add hubs to their most connected community (if they were removed)
    if (config.HUB_STRATEGY === 'remove') {
        for (const hubId of hubIds) {
            // Find community with most connections to this hub
            let maxConnections = 0
            let bestCommunity = null

            for (const [communityId, members] of communitiesMap.entries()) {
                let connections = 0
                for (const memberId of members) {
                    // Check original support graph (before hub removal)
                    const weight = graph.get(memberId)?.get(hubId) || 0
                    connections += weight
                }
                if (connections > maxConnections) {
                    maxConnections = connections
                    bestCommunity = communityId
                }
            }

            if (bestCommunity !== null) {
                communitiesMap.get(bestCommunity).push(hubId)
            }
        }
    }

    const communities = Array.from(communitiesMap.values())
        .filter(c => c.length >= ANALYSIS_CONFIG.FANBASE.THRESHOLDS.MIN_COMMUNITY_SIZE)

    console.log(`[Fanbase] Louvain detected ${communities.length} communities (sizes: ${communities.map(c => c.length).join(', ')})`)

    return communities
}

/**
 * Connected components community detection (original algorithm)
 */
function detectCommunitiesConnectedComponents(graph, profileIds) {
    const visited = new Set()
    const communities = []

    function dfs(nodeId, community) {
        if (visited.has(nodeId)) return
        visited.add(nodeId)
        community.push(nodeId)

        const neighbors = graph.get(nodeId)
        if (neighbors) {
            for (const [neighborId, weight] of neighbors.entries()) {
                if (weight > 0 && !visited.has(neighborId)) {
                    dfs(neighborId, community)
                }
            }
        }
    }

    for (const nodeId of profileIds) {
        if (!visited.has(nodeId)) {
            const community = []
            dfs(nodeId, community)
            if (community.length >= ANALYSIS_CONFIG.FANBASE.THRESHOLDS.MIN_COMMUNITY_SIZE) {
                communities.push(community)
            }
        }
    }

    return communities
}

/**
 * Calculate community metrics (using SUPPORT graph only)
 */
function calculateCommunityMetrics(community, graph, leaders) {
    let actualEdges = 0
    let mutualEdges = 0
    let totalWeight = 0

    for (const nodeId of community) {
        const neighbors = graph.get(nodeId)
        if (neighbors) {
            for (const [neighborId, weight] of neighbors.entries()) {
                if (community.includes(neighborId)) {
                    actualEdges++
                    totalWeight += weight

                    const reverseWeight = graph.get(neighborId)?.get(nodeId) || 0
                    if (reverseWeight > 0) {
                        mutualEdges++
                    }
                }
            }
        }
    }

    const maxPossibleEdges = community.length * (community.length - 1)
    const density = maxPossibleEdges > 0 ? actualEdges / maxPossibleEdges : 0
    const reciprocity = actualEdges > 0 ? (mutualEdges / 2) / actualEdges : 0

    // Calculate clustering coefficient
    let clusteringSum = 0
    for (const nodeId of community) {
        const neighbors = Array.from(graph.get(nodeId)?.keys() || [])
            .filter(n => community.includes(n))

        if (neighbors.length < 2) continue

        let triangles = 0
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = i + 1; j < neighbors.length; j++) {
                if (graph.get(neighbors[i])?.has(neighbors[j])) {
                    triangles++
                }
            }
        }

        const possibleTriangles = (neighbors.length * (neighbors.length - 1)) / 2
        clusteringSum += possibleTriangles > 0 ? triangles / possibleTriangles : 0
    }
    const clusteringCoefficient = community.length > 0 ? clusteringSum / community.length : 0

    return {
        density,
        reciprocity,
        clusteringCoefficient,
        avgEdgeWeight: totalWeight / Math.max(actualEdges, 1),
        totalWeight,
        actualEdges
    }
}

/**
 * Calculate support score for a user (using SUPPORT graph only)
 */
function calculateSupportScore(userId, community, leaders, graph, hashtagData) {
    // 1. Engagement to leaders (SUPPORT edges only)
    let engagementToLeader = 0
    for (const leaderId of leaders) {
        const weight = graph.get(userId)?.get(leaderId) || 0
        engagementToLeader += weight
    }
    engagementToLeader = Math.min(engagementToLeader / 100, 1) // Normalize to 0-1

    // 2. Hashtag similarity (simplified - would need actual hashtag data per user)
    const hashtagSimilarity = 0.5 // Placeholder

    // 3. Reciprocity within community (SUPPORT graph)
    let reciprocalConnections = 0
    let totalConnections = 0
    const neighbors = graph.get(userId)
    if (neighbors) {
        for (const [neighborId, weight] of neighbors.entries()) {
            if (community.includes(neighborId)) {
                totalConnections++
                const reverseWeight = graph.get(neighborId)?.get(userId) || 0
                if (reverseWeight > 0) {
                    reciprocalConnections++
                }
            }
        }
    }
    const reciprocity = totalConnections > 0 ? reciprocalConnections / totalConnections : 0

    // 4. Cluster cohesion (clustering coefficient in SUPPORT graph)
    const neighbors_list = Array.from(graph.get(userId)?.keys() || [])
        .filter(n => community.includes(n))

    let triangles = 0
    for (let i = 0; i < neighbors_list.length; i++) {
        for (let j = i + 1; j < neighbors_list.length; j++) {
            if (graph.get(neighbors_list[i])?.has(neighbors_list[j])) {
                triangles++
            }
        }
    }
    const possibleTriangles = (neighbors_list.length * (neighbors_list.length - 1)) / 2
    const clusterCohesion = possibleTriangles > 0 ? triangles / possibleTriangles : 0

    // Calculate weighted support score
    const supportScore = (
        engagementToLeader * ANALYSIS_CONFIG.FANBASE.SUPPORT_SCORE_WEIGHTS.ENGAGEMENT_TO_LEADER +
        hashtagSimilarity * ANALYSIS_CONFIG.FANBASE.SUPPORT_SCORE_WEIGHTS.HASHTAG_SIMILARITY +
        reciprocity * ANALYSIS_CONFIG.FANBASE.SUPPORT_SCORE_WEIGHTS.RECIPROCITY +
        clusterCohesion * ANALYSIS_CONFIG.FANBASE.SUPPORT_SCORE_WEIGHTS.CLUSTER_COHESION
    )

    return supportScore
}

/**
 * Determine if community is organic based on metrics
 */
function isOrganicCommunity(metrics) {
    const ranges = ANALYSIS_CONFIG.FANBASE.ORGANIC_RANGES

    return (
        metrics.density >= ranges.DENSITY.min && metrics.density <= ranges.DENSITY.max &&
        metrics.reciprocity >= ranges.RECIPROCITY.min && metrics.reciprocity <= ranges.RECIPROCITY.max &&
        metrics.clusteringCoefficient >= ranges.CLUSTERING.min && metrics.clusteringCoefficient <= ranges.CLUSTERING.max &&
        metrics.avgEdgeWeight >= ranges.AVG_EDGE_WEIGHT.min && metrics.avgEdgeWeight <= ranges.AVG_EDGE_WEIGHT.max
    )
}

/**
 * Calculate organicity score (0-100)
 */
function calculateOrganicityScore(metrics) {
    const ranges = ANALYSIS_CONFIG.FANBASE.ORGANIC_RANGES

    // Calculate how well metrics fit organic ranges (0-1 for each)
    const densityScore = isInRange(metrics.density, ranges.DENSITY.min, ranges.DENSITY.max) ? 1 : 0
    const reciprocityScore = isInRange(metrics.reciprocity, ranges.RECIPROCITY.min, ranges.RECIPROCITY.max) ? 1 : 0
    const clusteringScore = isInRange(metrics.clusteringCoefficient, ranges.CLUSTERING.min, ranges.CLUSTERING.max) ? 1 : 0
    const weightScore = isInRange(metrics.avgEdgeWeight, ranges.AVG_EDGE_WEIGHT.min, ranges.AVG_EDGE_WEIGHT.max) ? 1 : 0

    return Math.round((densityScore + reciprocityScore + clusteringScore + weightScore) / 4 * 100)
}

function isInRange(value, min, max) {
    return value >= min && value <= max
}

/**
 * Get top hashtags for a community
 */
async function getTopHashtags(community) {
    try {
        const hashtags = await prismaTwitter.$queryRaw`
            SELECT 
                unnest(hashtags) as hashtag,
                COUNT(*) as count
            FROM comments
            WHERE author_postid = ANY(${community.map(id => parseInt(id))}::bigint[])
                AND hashtags IS NOT NULL
            GROUP BY hashtag
            ORDER BY count DESC
            LIMIT 10
        `
        return hashtags.map(h => ({ tag: h.hashtag, count: Number(h.count) }))
    } catch (error) {
        console.error('Error fetching hashtags:', error)
        return []
    }
}

/**
 * Save fanbase clustering run to database
 * Creates a new run and saves all communities and memberships
 */
async function saveFanbaseRunToDatabase(communityResults, metadata) {
    console.log('[Fanbase] Saving run to database...')

    // Step 1: Unmark previous current runs
    await prismaTwitter.fanbase_runs.updateMany({
        where: { is_current: true },
        data: { is_current: false }
    })

    // Step 2: Create new run
    const run = await prismaTwitter.fanbase_runs.create({
        data: {
            source: 'twitter',
            node_count: metadata.nodeCount,
            edge_count: metadata.edgeCount,
            method: metadata.method,
            params: metadata.params,
            is_current: true,
            completed_at: new Date()
        }
    })

    console.log(`[Fanbase] Created run #${run.id}`)

    // Step 3: Save communities and memberships
    for (let i = 0; i < communityResults.length; i++) {
        const communityData = communityResults[i]

        // Create community
        const community = await prismaTwitter.fanbase_communities.create({
            data: {
                run_id: run.id,
                label: `Community #${i + 1}`,
                member_count: communityData.size,
                leader_count: communityData.leaders.length,
                density: parseFloat(communityData.metrics.density) / 100,
                reciprocity: parseFloat(communityData.metrics.reciprocity) / 100,
                clustering: parseFloat(communityData.metrics.clusteringCoefficient),
                avg_weight: parseFloat(communityData.metrics.avgEdgeWeight),
                leader_username: communityData.leaders[0]?.username || null,
                top_hashtags: communityData.topHashtags,
                metrics: {
                    totalWeight: communityData.metrics.totalWeight,
                    organicityScore: communityData.organicityScore,
                    isOrganic: communityData.isOrganic
                }
            }
        })

        console.log(`[Fanbase] Created community #${community.id} (${communityData.size} members)`)

        // Prepare memberships data
        const memberships = []

        // Add leaders
        for (const leader of communityData.leaders) {
            const botCache = await prismaTwitter.bot_analysis_cache.findUnique({
                where: { profile_id: leader.id }
            })

            memberships.push({
                run_id: run.id,
                community_id: community.id,
                profile_id: leader.id,
                role: 'leader',
                leadership_score: leader.leadershipScore,
                support_score: null,
                local_activity: leader.supportIn,
                share_in_cluster: parseFloat(leader.shareInCluster) / 100,
                bot_score: botCache?.bot_score || null,
                bot_risk_level: botCache?.risk_level || null,
                is_suspicious: botCache ? botCache.bot_score > 50 : null,
                features: {
                    globalSupport: leader.globalSupport,
                    uniqueSupporters: leader.uniqueSupporters,
                    totalIn: leader.totalIn
                }
            })
        }

        // Add core supporters
        for (const supporter of communityData.coreSupporters) {
            const botCache = await prismaTwitter.bot_analysis_cache.findUnique({
                where: { profile_id: supporter.id }
            })

            memberships.push({
                run_id: run.id,
                community_id: community.id,
                profile_id: supporter.id,
                role: 'core_supporter',
                leadership_score: null,
                support_score: null,
                local_activity: supporter.supportIn,
                share_in_cluster: parseFloat(supporter.shareInCluster) / 100,
                bot_score: botCache?.bot_score || null,
                bot_risk_level: botCache?.risk_level || null,
                is_suspicious: botCache ? botCache.bot_score > 50 : null,
                features: null
            })
        }

        // Add all regular members
        const regularMembers = communityData.members
            .filter(m => !m.isLeader)

        for (const member of regularMembers) {
            const botCache = await prismaTwitter.bot_analysis_cache.findUnique({
                where: { profile_id: member.id }
            })

            memberships.push({
                run_id: run.id,
                community_id: community.id,
                profile_id: member.id,
                role: 'member',
                leadership_score: null,
                support_score: parseFloat(member.supportScore),
                local_activity: member.supportIn || 0,
                share_in_cluster: parseFloat(member.shareInCluster) / 100,
                bot_score: botCache?.bot_score || null,
                bot_risk_level: botCache?.risk_level || null,
                is_suspicious: botCache ? botCache.bot_score > 50 : null,
                features: null
            })
        }

        // Batch insert memberships
        if (memberships.length > 0) {
            await prismaTwitter.fanbase_memberships.createMany({
                data: memberships,
                skipDuplicates: true
            })
            console.log(`[Fanbase] Saved ${memberships.length} memberships for community #${community.id}`)
        }
    }

    console.log(`[Fanbase] Successfully saved run #${run.id} with ${communityResults.length} communities`)
    return run
}
