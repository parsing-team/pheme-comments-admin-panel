import prismaInput from '@/lib/prismaInput'
import prismaTwitter from '@/lib/prismaTwitter'
import { Prisma } from '@prisma/client'

/**
 * Get monitored sources from twitter_input
 */
export async function getMonitoredSources(query = '') {
    try {
        const hasQuery = query && query.trim().length > 0

        if (!hasQuery) {
            // Return empty array if no search query
            return []
        }

        const searchPattern = `%${query}%`

        // Search in:
        // - name: username/handle (e.g., "mich261213", "zelensky_official")
        // - profiles_id: numeric Twitter ID (e.g., "1167118193539866624")
        // - type: profile type (e.g., "politician", "media")
        const sourcesWithCounts = await prismaInput.$queryRaw`
            SELECT 
                pr.id,
                pr.name,
                pr.profiles_id,
                pr.type,
                pr.updated,
                COUNT(tp.id)::int as post_count
            FROM twitter_profiles pr
            LEFT JOIN twitter_posts tp ON tp.source_id = pr.id
            WHERE pr.active = 1
            AND (pr.name ILIKE ${searchPattern} OR pr.profiles_id ILIKE ${searchPattern} OR pr.type ILIKE ${searchPattern})
            GROUP BY pr.id, pr.name, pr.profiles_id, pr.type, pr.updated
            ORDER BY COUNT(tp.id) DESC
            LIMIT 100
        `

        const result = sourcesWithCounts.map(source => ({
            id: source.id,
            name: source.name,
            profileId: source.profiles_id,
            type: source.type,
            lastUpdated: source.updated,
            postCount: source.post_count
        }))

        return result
    } catch (error) {
        console.error('Error fetching monitored sources:', error)
        return []
    }
}

/**
 * Get engagement stats for a monitored source
 */
export async function getSourceEngagement(sourceId) {
    try {
        console.log('[getSourceEngagement] Fetching for source:', sourceId)

        // Get recent posts WITH engagement stats using JOIN
        const postsWithStats = await prismaInput.$queryRaw`
            SELECT 
                p.id,
                p.plain_content,
                p.publish_date,
                p.permalink,
                s.likes,
                s.views,
                s.reposts,
                s.comments
            FROM twitter_posts p
            JOIN twitter_action_stats s ON p.id = s.post_id
            WHERE p.source_id = ${sourceId}
            ORDER BY p.publish_date DESC
            LIMIT 50
        `

        console.log('[getSourceEngagement] Found posts with stats:', postsWithStats.length)

        if (postsWithStats.length === 0) {
            return {
                recentPosts: [],
                aggregateStats: { totalLikes: 0, totalViews: 0, totalReposts: 0, totalComments: 0 }
            }
        }

        // Calculate aggregate stats
        const aggregateStats = postsWithStats.reduce((acc, post) => {
            acc.totalLikes += parseInt(post.likes || 0)
            acc.totalViews += parseInt(post.views || 0)
            acc.totalReposts += parseInt(post.reposts || 0)
            acc.totalComments += parseInt(post.comments || 0)
            return acc
        }, { totalLikes: 0, totalViews: 0, totalReposts: 0, totalComments: 0 })

        console.log('[getSourceEngagement] Aggregate stats:', aggregateStats)

        return {
            recentPosts: postsWithStats.map(p => ({
                id: p.id,
                content: p.plain_content?.substring(0, 200),
                publishDate: p.publish_date,
                permalink: p.permalink,
                engagement: {
                    likes: p.likes || 0,
                    views: p.views || 0,
                    reposts: p.reposts || 0,
                    comments: p.comments || 0
                }
            })),
            aggregateStats
        }
    } catch (error) {
        console.error('[getSourceEngagement] Error:', error)
        return {
            recentPosts: [],
            aggregateStats: { totalLikes: 0, totalViews: 0, totalReposts: 0, totalComments: 0 }
        }
    }
}

/**
 * Enrich a twitter_network profile with twitter_input data
 */
export async function enrichProfile(profileId) {
    try {
        // Find matching profile in twitter_input
        const inputProfile = await prismaInput.twitter_relationships_reply_profiles.findFirst({
            where: { profile_id: profileId.toString() }
        })

        if (!inputProfile) return null

        return {
            followers: inputProfile.followers_count,
            following: inputProfile.following_count,
            location: inputProfile.location,
            birthdate: inputProfile.birthdate,
            description: inputProfile.description,
            joined: inputProfile.joined,
            url: inputProfile.url,
            category: inputProfile.category
        }
    } catch (error) {
        console.error('Error enriching profile:', error)
        return null
    }
}

/**
 * Get bot interaction stats for a monitored source
 * Cross-references with twitter_network bot detection
 */
export async function getBotInteractionStats(sourceId) {
    try {
        console.log('[getBotInteractionStats] Fetching for source:', sourceId)

        // Get recent posts from twitter_posts (partitioned table) using raw SQL
        const posts = await prismaInput.$queryRaw`
            SELECT permalink
            FROM twitter_posts
            WHERE source_id = ${sourceId}
            ORDER BY publish_date DESC
            LIMIT 100
        `

        console.log('[getBotInteractionStats] Found posts:', posts.length)

        const permalinks = posts.map(p => p.permalink).filter(Boolean)

        if (permalinks.length === 0) {
            return {
                totalInteractions: 0,
                uniqueAccounts: 0,
                avgPerAccount: 0
            }
        }

        // Find interactions in twitter_network
        const interactions = await prismaTwitter.comments.findMany({
            where: {
                permalink: { in: permalinks }
            },
            select: {
                author_post_username: true,
                author_postid: true
            }
        })

        console.log('[getBotInteractionStats] Found interactions:', interactions.length)

        // Count unique interacting accounts
        const uniqueAccounts = new Set(interactions.map(i => i.author_postid))

        const result = {
            totalInteractions: interactions.length,
            uniqueAccounts: uniqueAccounts.size,
            avgPerAccount: uniqueAccounts.size > 0
                ? (interactions.length / uniqueAccounts.size).toFixed(2)
                : 0
        }

        console.log('[getBotInteractionStats] Result:', result)

        return result
    } catch (error) {
        console.error('[getBotInteractionStats] Error:', error)
        return {
            totalInteractions: 0,
            uniqueAccounts: 0,
            avgPerAccount: 0
        }
    }
}
