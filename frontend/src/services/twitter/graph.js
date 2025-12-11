import prismaTwitter from '@/lib/prismaTwitter'
import { analysisStore } from '@/lib/analysisStore'
import { ANALYSIS_CONFIG } from '@/config/twitter-analysis'

/**
 * Internal function to process community detection with progress updates.
 * 
 * Methodology:
 * 1. Builds a multi-layer graph from top 1000 active profiles:
 *    - Retweet Layer: Weighted by number of retweets (x3)
 *    - Sync Layer: Posts within 5s of each other (x5) - Strongest indicator
 *    - Hashtag Layer: Shared hashtag usage (x2)
 * 
 * 2. Detects communities using DFS (Connected Components) on the weighted graph.
 *    - Filters for strong connections (min edge weight 10)
 * 
 * 3. Calculates network metrics for each community:
 *    - Density: How connected the group is
 *    - Reciprocity: Mutual interactions (bot cycles)
 *    - Clustering Coefficient: Triadic closures
 */
export async function processCommunityDetection(jobId) {
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
                error: 'Insufficient data for community detection',
                progress: 100
            })
            return
        }

        const profileIds = activeProfiles.map(p => p.id.toString())
        const profileMap = new Map(activeProfiles.map(p => [p.id.toString(), p]))

        // Get total comments count for context
        const totalComments = activeProfiles.reduce((acc, p) => acc + p.comment_count, 0)

        analysisStore.updateJob(jobId, {
            progress: 20,
            message: `Building Retweet Graph (${totalComments.toLocaleString()} comments)...`
        })

        // Step 2: Build Retweet Graph
        // Get all retweet relationships between active profiles
        const retweets = await prismaTwitter.$queryRaw`
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
            HAVING COUNT(*) >= 3
        `

        analysisStore.updateJob(jobId, {
            progress: 40,
            message: `Analyzing Synchronized Posts (last 30 days)...`
        })

        // Step 3: Build Synchronized Posting Graph
        // Find accounts that post within 5 seconds of each other
        // OPTIMIZED: Only analyze last 30 days to prevent timeout
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const syncPosts = await prismaTwitter.$queryRaw`
            SELECT 
                c1.author_postid as source_id,
                c2.author_postid as target_id,
                CAST(COUNT(*) AS INTEGER) as weight
            FROM comments c1
            JOIN comments c2 ON 
                c2.author_postid != c1.author_postid
                AND c2.author_postid = ANY(${profileIds}::bigint[])
                AND c2.publish_date >= c1.publish_date - interval '5 seconds'
                AND c2.publish_date <= c1.publish_date + interval '5 seconds'
            WHERE c1.author_postid = ANY(${profileIds}::bigint[])
                AND c1.publish_date >= ${thirtyDaysAgo}
                AND c2.publish_date >= ${thirtyDaysAgo}
            GROUP BY c1.author_postid, c2.author_postid
            HAVING COUNT(*) >= 5
        `

        analysisStore.updateJob(jobId, {
            progress: 60,
            message: `Checking Hashtag Overlap in ${totalComments.toLocaleString()} comments...`
        })

        // Step 4: Build Hashtag Overlap Graph
        const hashtagOverlap = await prismaTwitter.$queryRaw`
            WITH user_hashtags AS (
                SELECT 
                    author_postid,
                    unnest(hashtags) as hashtag
                FROM comments
                WHERE author_postid = ANY(${profileIds}::bigint[])
                    AND hashtags IS NOT NULL
                    AND array_length(hashtags, 1) > 0
            )
            SELECT 
                uh1.author_postid as source_id,
                uh2.author_postid as target_id,
                CAST(COUNT(DISTINCT uh1.hashtag) AS INTEGER) as weight
            FROM user_hashtags uh1
            JOIN user_hashtags uh2 ON 
                uh1.hashtag = uh2.hashtag
                AND uh1.author_postid < uh2.author_postid
            GROUP BY uh1.author_postid, uh2.author_postid
            HAVING COUNT(DISTINCT uh1.hashtag) >= 5
        `

        analysisStore.updateJob(jobId, { progress: 75, message: 'Combining Graphs & Detecting Communities...' })

        // Step 5: Build combined graph (adjacency list)
        const graph = new Map()
        profileIds.forEach(id => graph.set(id.toString(), new Map()))

        // Add retweet edges
        retweets.forEach(edge => {
            const sourceId = edge.source_id.toString()
            const targetId = edge.target_id.toString()
            const weight = edge.weight * ANALYSIS_CONFIG.GRAPH.WEIGHTS.RETWEET
            if (!graph.get(sourceId).has(targetId)) {
                graph.get(sourceId).set(targetId, 0)
            }
            graph.get(sourceId).set(
                targetId,
                graph.get(sourceId).get(targetId) + weight
            )
        })

        // Add sync post edges
        syncPosts.forEach(edge => {
            const sourceId = edge.source_id.toString()
            const targetId = edge.target_id.toString()
            const weight = edge.weight * ANALYSIS_CONFIG.GRAPH.WEIGHTS.SYNC_POST
            if (!graph.get(sourceId).has(targetId)) {
                graph.get(sourceId).set(targetId, 0)
            }
            graph.get(sourceId).set(
                targetId,
                graph.get(sourceId).get(targetId) + weight
            )
        })

        // Add hashtag overlap edges (bidirectional)
        hashtagOverlap.forEach(edge => {
            const sourceId = edge.source_id.toString()
            const targetId = edge.target_id.toString()
            const weight = edge.weight * ANALYSIS_CONFIG.GRAPH.WEIGHTS.HASHTAG
            // Add both directions
            if (!graph.get(sourceId).has(targetId)) {
                graph.get(sourceId).set(targetId, 0)
            }
            if (!graph.get(targetId).has(sourceId)) {
                graph.get(targetId).set(sourceId, 0)
            }
            graph.get(sourceId).set(
                targetId,
                graph.get(sourceId).get(targetId) + weight
            )
            graph.get(targetId).set(
                sourceId,
                graph.get(targetId).get(sourceId) + weight
            )
        })

        // Step 6: Simple community detection using connected components with high edge weights
        const visited = new Set()
        const communities = []

        function dfs(nodeId, community, minWeight = ANALYSIS_CONFIG.GRAPH.MIN_EDGE_WEIGHT) {
            if (visited.has(nodeId)) return
            visited.add(nodeId)
            community.push(nodeId)

            const neighbors = graph.get(nodeId)
            if (neighbors) {
                for (const [neighborId, weight] of neighbors.entries()) {
                    if (weight >= minWeight && !visited.has(neighborId)) {
                        dfs(neighborId, community, minWeight)
                    }
                }
            }
        }

        // Find communities
        for (const nodeId of profileIds) {
            if (!visited.has(nodeId)) {
                const community = []
                dfs(nodeId, community)
                if (community.length >= ANALYSIS_CONFIG.GRAPH.MIN_COMMUNITY_SIZE) {
                    communities.push(community)
                }
            }
        }

        analysisStore.updateJob(jobId, { progress: 90, message: 'Calculating Network Metrics...' })

        // Step 7: Calculate metrics for each community
        const communityMetrics = communities.map(community => {
            const size = community.length

            // Calculate edge density
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
                            // Check if edge is mutual
                            const reverseWeight = graph.get(neighborId)?.get(nodeId) || 0
                            if (reverseWeight > 0) {
                                mutualEdges++
                            }
                        }
                    }
                }
            }

            const maxPossibleEdges = size * (size - 1)
            const density = maxPossibleEdges > 0 ? actualEdges / maxPossibleEdges : 0
            const reciprocity = actualEdges > 0 ? (mutualEdges / 2) / actualEdges : 0

            // Calculate clustering coefficient (simplified)
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

            // Calculate suspicion score
            let score = 0
            const flags = []

            if (density > ANALYSIS_CONFIG.GRAPH.THRESHOLDS.DENSITY_VERY_HIGH) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.VERY_HIGH_DENSITY
                flags.push(`Very high density: ${(density * 100).toFixed(1)}%`)
            } else if (density > ANALYSIS_CONFIG.GRAPH.THRESHOLDS.DENSITY_HIGH) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.HIGH_DENSITY
                flags.push(`High density: ${(density * 100).toFixed(1)}%`)
            }

            if (reciprocity > ANALYSIS_CONFIG.GRAPH.THRESHOLDS.RECIPROCITY_BOT) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.BOT_RECIPROCITY
                flags.push(`Bot-like reciprocity: ${(reciprocity * 100).toFixed(0)}%`)
            } else if (reciprocity > ANALYSIS_CONFIG.GRAPH.THRESHOLDS.RECIPROCITY_HIGH) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.HIGH_RECIPROCITY
                flags.push(`High reciprocity: ${(reciprocity * 100).toFixed(0)}%`)
            }

            if (clusteringCoefficient > ANALYSIS_CONFIG.GRAPH.THRESHOLDS.CLUSTERING_EXTREME) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.EXTREME_CLUSTERING
                flags.push(`Extreme clustering: ${clusteringCoefficient.toFixed(2)}`)
            } else if (clusteringCoefficient > ANALYSIS_CONFIG.GRAPH.THRESHOLDS.CLUSTERING_HIGH) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.HIGH_CLUSTERING
                flags.push(`High clustering: ${clusteringCoefficient.toFixed(2)}`)
            }

            if (size >= ANALYSIS_CONFIG.GRAPH.THRESHOLDS.SIZE_MIN && size <= ANALYSIS_CONFIG.GRAPH.THRESHOLDS.SIZE_MAX) {
                score += ANALYSIS_CONFIG.GRAPH.SCORES.TYPICAL_BOT_SIZE
                flags.push(`Typical bot network size: ${size} accounts`)
            }

            // Get member details
            const members = community.map(id => {
                const profile = profileMap.get(id)
                return {
                    id: profile.id,
                    username: profile.username,
                    name: profile.name,
                    comment_count: profile.comment_count
                }
            }).sort((a, b) => b.comment_count - a.comment_count)

            return {
                size,
                members,
                score,
                flags,
                metrics: {
                    density: (density * 100).toFixed(2),
                    reciprocity: (reciprocity * 100).toFixed(0),
                    clusteringCoefficient: clusteringCoefficient.toFixed(3),
                    totalWeight,
                    avgWeight: (totalWeight / Math.max(actualEdges, 1)).toFixed(1)
                }
            }
        })

        // Sort by score descending
        communityMetrics.sort((a, b) => b.score - a.score)

        // Only return suspicious communities (score >= 30)
        const suspiciousCommunities = communityMetrics.filter(c => c.score >= ANALYSIS_CONFIG.GRAPH.SCORES.SUSPICIOUS_THRESHOLD)

        const result = {
            totalProfiles: activeProfiles.length,
            totalCommunities: communities.length,
            suspiciousCommunities: suspiciousCommunities.length,
            communities: suspiciousCommunities.slice(0, 50), // Return top 50
            graphStats: {
                retweetEdges: retweets.length,
                syncEdges: syncPosts.length,
                hashtagEdges: hashtagOverlap.length
            }
        }

        analysisStore.updateJob(jobId, {
            status: 'completed',
            progress: 100,
            message: 'Analysis Complete',
            result
        })

    } catch (error) {
        console.error('Error detecting communities:', error)
        analysisStore.updateJob(jobId, {
            status: 'failed',
            error: `Community detection failed: ${error.message}`,
            progress: 100
        })
    }
}
