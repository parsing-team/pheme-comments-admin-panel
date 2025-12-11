'use server'

import prismaTwitter from '@/lib/prismaTwitter'
import { Prisma } from '@prisma/client'

/**
 * Safely convert a date to ISO string
 */
function safeDateToISO(date) {
    if (!date) return null
    try {
        const d = date instanceof Date ? date : new Date(date)
        if (isNaN(d.getTime())) return null
        return d.toISOString()
    } catch (e) {
        return null
    }
}

/**
 * Get overall platform statistics
 */
export async function getOverallStats() {
    try {
        const [
            totalProfiles,
            totalComments,
            activeProfiles,
            dateRange,
            avgEngagement
        ] = await Promise.all([
            // Total profiles
            prismaTwitter.profiles.count(),

            // Total comments
            prismaTwitter.comments.count(),

            // Active profiles (with account_status = 'active')
            prismaTwitter.profiles.count({
                where: { account_status: 'active' }
            }),

            // Date range
            prismaTwitter.comments.aggregate({
                _min: { publish_date: true },
                _max: { publish_date: true }
            }),

            // Average engagement metrics
            prismaTwitter.comments.aggregate({
                _avg: {
                    like_count: true,
                    retweet_count: true,
                    comment_count: true,
                    views_tweet: true
                }
            })
        ])


        return {
            totalProfiles,
            totalComments,
            activeProfiles,
            dateRange: {
                earliest: safeDateToISO(dateRange._min.publish_date),
                latest: safeDateToISO(dateRange._max.publish_date)
            },
            avgEngagement: {
                likes: Math.round(avgEngagement._avg.like_count || 0),
                retweets: Math.round(avgEngagement._avg.retweet_count || 0),
                comments: Math.round(avgEngagement._avg.comment_count || 0),
                views: Math.round(Number(avgEngagement._avg.views_tweet || 0))
            }
        }
    } catch (error) {
        console.error('Error fetching overall stats:', error)
        return {
            totalProfiles: 0,
            totalComments: 0,
            activeProfiles: 0,
            dateRange: { earliest: null, latest: null },
            avgEngagement: { likes: 0, retweets: 0, comments: 0, views: 0 }
        }
    }
}

/**
 * Get engagement timeline data
 * @param {string} period - 'day' or 'hour'
 * @param {number} days - Number of days to look back (default 30)
 */
export async function getEngagementTimeline(period = 'day', days = 90) {
    try {
        const dateThreshold = new Date()
        dateThreshold.setDate(dateThreshold.getDate() - days)

        // Use TO_CHAR to format dates as strings for grouping
        const timeline = await prismaTwitter.$queryRaw`
            SELECT 
                DATE(publish_date) as period_date,
                CAST(COUNT(*) AS INTEGER) as comment_count,
                CAST(SUM(COALESCE(like_count, 0)) AS INTEGER) as total_likes,
                CAST(SUM(COALESCE(retweet_count, 0)) AS INTEGER) as total_retweets,
                CAST(SUM(COALESCE(comment_count, 0)) AS INTEGER) as total_comments,
                CAST(SUM(COALESCE(views_tweet, 0)) AS BIGINT) as total_views
            FROM comments
            WHERE publish_date >= ${dateThreshold}
                AND publish_date IS NOT NULL
            GROUP BY DATE(publish_date)
            ORDER BY DATE(publish_date) ASC
        `


        const result = timeline.map(row => ({
            period: safeDateToISO(row.period_date),
            comments: row.comment_count,
            likes: row.total_likes,
            retweets: row.total_retweets,
            replies: row.total_comments,
            views: Number(row.total_views)
        }))


        return result

    } catch (error) {
        console.error('Error fetching engagement timeline:', error)
        return []
    }
}

/**
 * Get top profiles by engagement
 * @param {number} limit - Number of profiles to return
 * @param {string} metric - Metric to sort by: 'likes', 'retweets', 'comments', 'views'
 */
export async function getTopProfilesByEngagement(limit = 20, metric = 'likes') {
    try {
        const metricColumn = {
            'likes': 'like_count',
            'retweets': 'retweet_count',
            'comments': 'comment_count',
            'views': 'views_tweet'
        }[metric] || 'like_count'

        const topProfiles = await prismaTwitter.$queryRaw`
            SELECT 
                p.id,
                p.profile_id,
                p.name,
                p.username,
                p.is_verified,
                p.followers_count,
                CAST(COUNT(c.id) AS INTEGER) as comment_count,
                CAST(SUM(COALESCE(c.like_count, 0)) AS INTEGER) as total_likes,
                CAST(SUM(COALESCE(c.retweet_count, 0)) AS INTEGER) as total_retweets,
                CAST(SUM(COALESCE(c.comment_count, 0)) AS INTEGER) as total_comments,
                CAST(SUM(COALESCE(c.views_tweet, 0)) AS BIGINT) as total_views
            FROM profiles p
            JOIN comments c ON p.id = c.author_postid
            WHERE p.account_status = 'active'
            GROUP BY p.id, p.profile_id, p.name, p.username, p.is_verified, p.followers_count
            ORDER BY ${Prisma.raw(`SUM(COALESCE(c.${metricColumn}, 0))`)} DESC
            LIMIT ${limit}
        `

        return topProfiles.map(profile => ({
            id: profile.id,
            profileId: profile.profile_id?.toString(),
            name: profile.name,
            username: profile.username,
            isVerified: profile.is_verified,
            followers: profile.followers_count,
            stats: {
                comments: profile.comment_count,
                likes: profile.total_likes,
                retweets: profile.total_retweets,
                replies: profile.total_comments,
                views: Number(profile.total_views)
            }
        }))
    } catch (error) {
        console.error('Error fetching top profiles:', error)
        return []
    }
}

/**
 * Get hashtag trends
 * @param {number} limit - Number of hashtags to return
 * @param {number} days - Number of days to look back
 */
export async function getHashtagTrends(limit = 20, days = 30) {
    try {
        const dateThreshold = new Date()
        dateThreshold.setDate(dateThreshold.getDate() - days)

        const hashtags = await prismaTwitter.$queryRaw`
            SELECT 
                unnest(hashtags) as hashtag,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE hashtags IS NOT NULL 
                AND array_length(hashtags, 1) > 0
                AND publish_date >= ${dateThreshold}
            GROUP BY hashtag
            ORDER BY count DESC
            LIMIT ${limit}
        `

        return hashtags
    } catch (error) {
        console.error('Error fetching hashtag trends:', error)
        return []
    }
}

/**
 * Get language distribution
 */
export async function getLanguageDistribution() {
    try {
        const languages = await prismaTwitter.$queryRaw`
            SELECT 
                lang,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE lang IS NOT NULL
            GROUP BY lang
            ORDER BY count DESC
            LIMIT 15
        `

        return languages
    } catch (error) {
        console.error('Error fetching language distribution:', error)
        return []
    }
}

/**
 * Get temporal activity patterns (hourly and daily)
 */
export async function getTemporalActivity() {
    try {
        // Hourly activity
        const hourlyActivity = await prismaTwitter.$queryRaw`
            SELECT 
                EXTRACT(HOUR FROM publish_date) as hour,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE publish_date IS NOT NULL
            GROUP BY hour
            ORDER BY hour
        `

        // Daily activity (day of week)
        const dailyActivity = await prismaTwitter.$queryRaw`
            SELECT 
                EXTRACT(DOW FROM publish_date) as day_of_week,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE publish_date IS NOT NULL
            GROUP BY day_of_week
            ORDER BY day_of_week
        `

        // Heatmap data (hour x day of week)
        const heatmapData = await prismaTwitter.$queryRaw`
            SELECT 
                EXTRACT(HOUR FROM publish_date) as hour,
                EXTRACT(DOW FROM publish_date) as day_of_week,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE publish_date IS NOT NULL
            GROUP BY hour, day_of_week
            ORDER BY day_of_week, hour
        `

        return {
            hourly: hourlyActivity.map(row => ({
                hour: Number(row.hour),
                count: row.count
            })),
            daily: dailyActivity.map(row => ({
                dayOfWeek: Number(row.day_of_week),
                count: row.count
            })),
            heatmap: heatmapData.map(row => ({
                hour: Number(row.hour),
                dayOfWeek: Number(row.day_of_week),
                count: row.count
            }))
        }
    } catch (error) {
        console.error('Error fetching temporal activity:', error)
        return {
            hourly: [],
            daily: [],
            heatmap: []
        }
    }
}

/**
 * Get reply network statistics
 */
export async function getReplyNetworkStats() {
    try {
        const stats = await prismaTwitter.$queryRaw`
            SELECT 
                CAST(COUNT(DISTINCT CASE WHEN reply_comment_id IS NOT NULL THEN id END) AS INTEGER) as total_replies,
                CAST(COUNT(DISTINCT CASE WHEN reply_comment_id IS NULL THEN id END) AS INTEGER) as total_root_posts,
                CAST(COUNT(DISTINCT author_postid) AS INTEGER) as unique_authors,
                CAST(COUNT(DISTINCT reply_comment_username) AS INTEGER) as unique_reply_targets
            FROM comments
        `

        const reciprocityStats = await prismaTwitter.$queryRaw`
            SELECT 
                CAST(COUNT(*) AS INTEGER) as reciprocal_pairs
            FROM (
                SELECT DISTINCT 
                    LEAST(c1.author_post_username, c1.reply_comment_username) as user1,
                    GREATEST(c1.author_post_username, c1.reply_comment_username) as user2
                FROM comments c1
                WHERE c1.reply_comment_username IS NOT NULL
                    AND EXISTS (
                        SELECT 1 FROM comments c2
                        WHERE c2.author_post_username = c1.reply_comment_username
                            AND c2.reply_comment_username = c1.author_post_username
                    )
            ) as reciprocal
        `

        return {
            totalReplies: stats[0]?.total_replies || 0,
            totalRootPosts: stats[0]?.total_root_posts || 0,
            uniqueAuthors: stats[0]?.unique_authors || 0,
            uniqueReplyTargets: stats[0]?.unique_reply_targets || 0,
            reciprocalPairs: reciprocityStats[0]?.reciprocal_pairs || 0,
            replyRate: stats[0]?.total_replies && stats[0]?.total_root_posts
                ? (stats[0].total_replies / (stats[0].total_replies + stats[0].total_root_posts) * 100).toFixed(2)
                : 0
        }
    } catch (error) {
        console.error('Error fetching reply network stats:', error)
        return {
            totalReplies: 0,
            totalRootPosts: 0,
            uniqueAuthors: 0,
            uniqueReplyTargets: 0,
            reciprocalPairs: 0,
            replyRate: 0
        }
    }
}
