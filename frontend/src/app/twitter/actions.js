'use server'

import { PrismaClient, Prisma } from '@prisma/client'
import prismaTwitter from '@/lib/prismaTwitter'
import { analysisStore } from '@/lib/analysisStore'
import { ANALYSIS_CONFIG } from '@/config/twitter-analysis'
import * as temporalService from '@/services/twitter/temporal'
import * as contentService from '@/services/twitter/content-analysis'
import { processCommunityDetection } from '@/services/twitter/graph'
import { processFanbaseClustering } from '@/services/twitter/fanbase'
import { buildEgoGraph } from '@/services/twitter/ego-graph'
import { analyzeCommunityMembers, analyzeTwitterUser } from '@/services/twitter/bot-detection'

const prisma = new PrismaClient()

export async function getProfiles(page = 1, limit = 100) {
    try {
        const offset = (page - 1) * limit

        // Get total count of active profiles
        const totalCount = await prismaTwitter.profiles.count({
            where: {
                account_status: 'active'
            }
        })

        const profiles = await prismaTwitter.profiles.findMany({
            where: {
                account_status: 'active'
            },
            include: {
                _count: {
                    select: { comments: true }
                }
            },
            orderBy: {
                comments: {
                    _count: 'desc'
                }
            },
            skip: offset,
            take: limit
        })
        return { profiles, totalCount }
    } catch (error) {
        console.error('Error fetching profiles:', error)
        return { profiles: [], totalCount: 0 }
    }
}

export async function getProfile(profileId) {
    try {
        const profile = await prismaTwitter.profiles.findUnique({
            where: {
                id: parseInt(profileId)
            },
            include: {
                _count: {
                    select: { comments: true }
                },
                bot_analysis_cache: true
            }
        })
        return profile
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}

export async function getProfileComments(profileId, page = 1, limit = 100) {
    try {
        const id = parseInt(profileId)
        const offset = (page - 1) * limit

        // Get total count
        const totalCount = await prismaTwitter.comments.count({
            where: { author_postid: id }
        })

        // Get paginated comments with actual reply count from our database
        const comments = await prismaTwitter.$queryRaw`
            SELECT 
                c.*,
                CAST(COUNT(replies.id) AS INTEGER) as actual_reply_count
            FROM comments c
            LEFT JOIN comments replies ON replies.reply_comment_id = c.tweet_id
            WHERE c.author_postid = ${id}
            GROUP BY c.id
            ORDER BY c.publish_date DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `

        return { comments, totalCount }
    } catch (error) {
        console.error('Error fetching profile comments:', error)
        return { comments: [], totalCount: 0 }
    }
}

export async function searchProfiles(query) {
    try {
        const profiles = await prismaTwitter.profiles.findMany({
            where: {
                OR: [
                    { username: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } }
                ],
                account_status: 'active'
            },
            include: {
                _count: {
                    select: { comments: true }
                }
            },
            take: 50
        })
        return profiles
    } catch (error) {
        console.error('Error searching profiles:', error)
        return []
    }
}

export async function getTopProfiles() {
    try {
        // Get profiles with most comments
        const topProfiles = await prismaTwitter.$queryRaw`
            SELECT 
                p.id,
                p.profile_id,
                p.name,
                p.username,
                p.is_verified,
                p.followers_count,
                CAST(COUNT(c.id) AS INTEGER) as comment_count
            FROM profiles p
            JOIN comments c ON p.id = c.author_postid
            WHERE p.account_status = 'active'
            GROUP BY p.id, p.profile_id, p.name, p.username, p.is_verified, p.followers_count
            ORDER BY comment_count DESC
            LIMIT 50
        `
        return topProfiles
    } catch (error) {
        console.error('Error fetching top profiles:', error)
        return []
    }
}

export async function getProfileActivity(profileId) {
    try {
        const id = parseInt(profileId)

        // Get profile username to exclude from statistics
        const profile = await prismaTwitter.profiles.findUnique({
            where: { id },
            select: { username: true }
        })
        const profileUsername = profile?.username

        // Get hashtag usage statistics
        const hashtagStats = await prismaTwitter.$queryRaw`
            SELECT 
                unnest(hashtags) as hashtag,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE author_postid = ${id} AND hashtags IS NOT NULL AND array_length(hashtags, 1) > 0
            GROUP BY hashtag
            ORDER BY count DESC
            LIMIT 20
        `

        // Get language distribution
        const langStats = await prismaTwitter.$queryRaw`
            SELECT 
                lang,
                CAST(COUNT(*) AS INTEGER) as count
            FROM comments
            WHERE author_postid = ${id} AND lang IS NOT NULL
            GROUP BY lang
            ORDER BY count DESC
            LIMIT 10
        `

        // Get reply patterns (who they reply to most) - exclude self
        const replyStats = await prismaTwitter.$queryRaw`
            SELECT 
                c.reply_comment_username,
                CAST(COUNT(*) AS INTEGER) as count,
                MAX(p.id) as profile_id
            FROM comments c
            LEFT JOIN profiles p ON p.username = c.reply_comment_username
            WHERE c.author_postid = ${id} 
                AND c.reply_comment_username IS NOT NULL
                AND c.reply_comment_username != ${profileUsername}
            GROUP BY c.reply_comment_username
            ORDER BY count DESC
            LIMIT 50
        `

        // Get who replies to this user's tweets most (reply sources) - exclude self
        const replySourceStats = await prismaTwitter.$queryRaw`
            SELECT 
                c2.author_post_username,
                c2.author_post_name,
                CAST(COUNT(*) AS INTEGER) as count,
                MAX(p.id) as profile_id
            FROM comments c1
            JOIN comments c2 ON c2.reply_comment_id = c1.tweet_id
            LEFT JOIN profiles p ON p.profile_id = c2.author_postid
            WHERE c1.author_postid = ${id}
                AND c2.author_post_username != ${profileUsername}
            GROUP BY c2.author_post_username, c2.author_post_name
            ORDER BY count DESC
            LIMIT 50
        `

        return {
            hashtags: hashtagStats,
            languages: langStats,
            replyTargets: replyStats,
            replySources: replySourceStats
        }
    } catch (error) {
        console.error('Error fetching profile activity:', error)
        return {
            hashtags: [],
            languages: [],
            replyTargets: [],
            replySources: []
        }
    }
}

export async function getProfileCommentsFiltered(profileId, page = 1, limit = 100, filters = {}) {
    try {
        const id = parseInt(profileId)
        const offset = (page - 1) * limit

        // Build WHERE conditions
        let whereConditions = [`c.author_postid = ${id}`]

        if (filters.hashtag) {
            whereConditions.push(`${filters.hashtag} = ANY(c.hashtags)`)
        }

        if (filters.lang) {
            whereConditions.push(`c.lang = '${filters.lang}'`)
        }

        if (filters.isReply !== undefined) {
            if (filters.isReply) {
                whereConditions.push(`c.reply_comment_id IS NOT NULL`)
            } else {
                whereConditions.push(`c.reply_comment_id IS NULL`)
            }
        }

        if (filters.replyTo) {
            whereConditions.push(`c.reply_comment_username = '${filters.replyTo}'`)
        }

        const whereClause = whereConditions.join(' AND ')

        // Get total count with filters
        const countResult = await prismaTwitter.$queryRaw`
            SELECT CAST(COUNT(*) AS INTEGER) as count
            FROM comments c
            WHERE ${Prisma.raw(whereClause)}
        `
        const totalCount = countResult[0]?.count || 0

        // Get paginated comments with actual reply count
        const comments = await prismaTwitter.$queryRaw`
            SELECT 
                c.*,
                CAST(COUNT(replies.id) AS INTEGER) as actual_reply_count
            FROM comments c
            LEFT JOIN comments replies ON replies.reply_comment_id = c.tweet_id
            WHERE ${Prisma.raw(whereClause)}
            GROUP BY c.id
            ORDER BY c.publish_date DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `

        return { comments, totalCount }
    } catch (error) {
        console.error('Error fetching filtered profile comments:', error)
        return { comments: [], totalCount: 0 }
    }
}

export async function getInteractions(profileId, otherUsername) {
    try {
        const id = parseInt(profileId)

        // 1. Get posts by profile user that were replied to by other user
        const postsRepliedByOther = await prismaTwitter.$queryRaw`
            SELECT DISTINCT c.*
            FROM comments c
            JOIN comments r ON r.reply_comment_id = c.tweet_id
            WHERE c.author_postid = ${id}
            AND r.author_post_username = ${otherUsername}
            ORDER BY c.publish_date DESC
            LIMIT 50
        `

        // For each such post, get the replies from other user
        const interactionsRepliedBy = await Promise.all(postsRepliedByOther.map(async (post) => {
            const replies = await prismaTwitter.comments.findMany({
                where: {
                    reply_comment_id: post.tweet_id,
                    author_post_username: otherUsername
                },
                orderBy: {
                    publish_date: 'asc'
                }
            })
            return {
                originalPost: post,
                replies: replies
            }
        }))

        // 2. Get posts by profile user that are replies to other user
        const repliesToOther = await prismaTwitter.comments.findMany({
            where: {
                author_postid: id,
                reply_comment_username: otherUsername
            },
            orderBy: {
                publish_date: 'desc'
            },
            take: 50
        })

        return {
            repliedBy: interactionsRepliedBy, // User B replied to User A's posts
            repliedTo: repliesToOther // User A replied to User B
        }
    } catch (error) {
        console.error('Error fetching interactions:', error)
        return {
            repliedBy: [],
            repliedTo: []
        }
    }
}

export async function getTopPosts(page = 1, limit = 100, timeRange = '7d') {
    try {
        const offset = (page - 1) * limit

        // Calculate date filter based on timeRange
        let dateFilter = {}
        if (timeRange !== 'all') {
            const now = new Date()
            let daysAgo

            switch (timeRange) {
                case '24h':
                    daysAgo = 1
                    break
                case '7d':
                    daysAgo = 7
                    break
                case '30d':
                    daysAgo = 30
                    break
                default:
                    daysAgo = 7
            }

            const startDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))
            dateFilter = {
                publish_date: {
                    gte: startDate
                }
            }
        }

        const whereClause = {
            comment_count: {
                gt: 0
            },
            ...dateFilter
        }

        const totalCount = await prismaTwitter.comments.count({
            where: whereClause
        })

        const topPosts = await prismaTwitter.comments.findMany({
            where: whereClause,
            include: {
                profile: true
            },
            orderBy: {
                comment_count: 'desc'
            },
            skip: offset,
            take: limit
        })
        return { topPosts, totalCount }
    } catch (error) {
        console.error('Error fetching top posts:', error)
        return { topPosts: [], totalCount: 0 }
    }
}

export async function getTweet(tweetId) {
    try {
        const tweet = await prismaTwitter.comments.findUnique({
            where: {
                tweet_id: BigInt(tweetId)
            },
            include: {
                profile: true
            }
        })
        return tweet
    } catch (error) {
        console.error('Error fetching tweet:', error)
        return null
    }
}

export async function getTweetReplies(tweetId, page = 1, limit = 100) {
    try {
        const offset = (page - 1) * limit

        const totalCount = await prismaTwitter.comments.count({
            where: {
                reply_comment_id: BigInt(tweetId)
            }
        })

        const replies = await prismaTwitter.comments.findMany({
            where: {
                reply_comment_id: BigInt(tweetId)
            },
            include: {
                profile: true
            },
            orderBy: {
                publish_date: 'desc'
            },
            skip: offset,
            take: limit
        })
        return { replies, totalCount }
    } catch (error) {
        console.error('Error fetching tweet replies:', error)
        return { replies: [], totalCount: 0 }
    }
}

/**
 * Analyzes temporal posting patterns of active accounts to detect bot-like behavior.
 * 
 * Methodology:
 * 1. Fetches active profiles (50+ comments)
 * 2. Calculates Inter-Post Intervals (IPI) statistics
 * 3. Checks for specific bot indicators:
 *    - Low variance in posting intervals (automated posting)
 *    - High percentage of "fixed" intervals (e.g., exactly every 30 mins)
 *    - High posting frequency (>100/day)
 *    - Abnormal night activity (>30% of total)
 *    - Uniform hourly distribution (no natural sleep/wake cycle)
 *    - Round-minute posting (cron job artifacts)
 *    - Burst posting behavior
 * 
 * @returns {Promise<Object>} Analysis results including suspicious accounts and statistics
 */
export async function analyzeTemporalPatterns() {
    return await temporalService.analyzeTemporalPatterns()
}

/**
 * Analyzes a single account for suspicious temporal patterns.
 * Same logic as analyzeTemporalPatterns but for a specific target.
 * 
 * @param {string|number} identifier - Username (with or without @) or Profile ID
 * @returns {Promise<Object>} Analysis result for the specific account
 */
export async function analyzeSingleAccount(identifier) {
    return await temporalService.analyzeSingleAccount(identifier)
}

/**
 * Analyzes a user's network for Fanbase Clustering.
 * Returns profile details and interaction stats.
 */
export async function analyzeUserNetwork(identifier) {
    try {
        let profile

        // Check if identifier is ID (numeric) or username
        const isId = /^\d+$/.test(identifier)

        if (isId) {
            profile = await prismaTwitter.profiles.findUnique({
                where: { id: BigInt(identifier) }
            })
        } else {
            // Remove @ if present
            const username = identifier.toString().replace('@', '')
            profile = await prismaTwitter.profiles.findFirst({
                where: { username: { equals: username, mode: 'insensitive' } }
            })
        }

        if (!profile) {
            return { error: 'Profile not found' }
        }

        // Get activity stats (interactions)
        const activity = await getProfileActivity(profile.id)

        return {
            profile: {
                id: profile.id.toString(),
                username: profile.username,
                name: profile.name,
                followers: profile.followers_count,
                following: profile.following_count
            },
            interactions: activity
        }
    } catch (error) {
        console.error('Error analyzing user network:', error)
        return { error: error.message }
    }
}

/**
 * Analyzes the Ego-Graph of a specific user.
 * Builds a weighted network of nearest neighbors and detects communities.
 */
export async function analyzeEgoGraph(identifier) {
    return await buildEgoGraph(identifier)
}

/**
 * Starts the community detection process asynchronously.
 * Returns a job ID immediately for polling.
 */
export async function startCommunityDetection() {
    const jobId = analysisStore.createJob()

    // Start processing in background (no await)
    processCommunityDetection(jobId).catch(err => {
        console.error('Background job failed:', err)
        analysisStore.updateJob(jobId, {
            status: 'failed',
            error: err.message
        })
    })

    return { jobId }
}

/**
 * Gets the current status of an analysis job.
 */
export async function getAnalysisStatus(jobId) {
    const job = analysisStore.getJob(jobId)
    if (!job) {
        return { error: 'Job not found' }
    }
    return job
}

/**
 * Gets the current status of an analysis job.
 */

/**
 * Get engagement stats for a specific source
 */
export async function getSourceEngagement(sourceId) {
    return await contentService.getSourceEngagement(sourceId)
}

/**
 * Get bot interaction statistics for a monitored source
 */
export async function getBotInteractionStats(sourceId) {
    return await contentService.getBotInteractionStats(sourceId)
}

/**
 * Enrich a profile with twitter_input data
 */
export async function enrichProfile(profileId) {
    return await contentService.enrichProfile(profileId)
}

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
// processCommunityDetection is now imported from @/services/twitter/graph

/**
 * Starts the fanbase clustering process asynchronously.
 * Returns a job ID immediately for polling.
 */
export async function startFanbaseClustering(config = {}) {
    const jobId = analysisStore.createJob()

    // Apply custom configuration if provided
    if (config.resolution !== undefined || config.edgeThreshold !== undefined || config.hubStrategy !== undefined) {
        const originalConfig = { ...ANALYSIS_CONFIG.FANBASE.CLUSTERING }

        if (config.resolution !== undefined) {
            ANALYSIS_CONFIG.FANBASE.CLUSTERING.RESOLUTION = config.resolution
        }
        if (config.edgeThreshold !== undefined) {
            ANALYSIS_CONFIG.FANBASE.CLUSTERING.EDGE_WEIGHT_THRESHOLD = config.edgeThreshold
        }
        if (config.hubStrategy !== undefined) {
            ANALYSIS_CONFIG.FANBASE.CLUSTERING.HUB_STRATEGY = config.hubStrategy
        }

        console.log('[startFanbaseClustering] Using config:', {
            resolution: ANALYSIS_CONFIG.FANBASE.CLUSTERING.RESOLUTION,
            edgeThreshold: ANALYSIS_CONFIG.FANBASE.CLUSTERING.EDGE_WEIGHT_THRESHOLD,
            hubStrategy: ANALYSIS_CONFIG.FANBASE.CLUSTERING.HUB_STRATEGY
        })
    }

    // Start processing in background (no await)
    processFanbaseClustering(jobId).catch(err => {
        console.error('Background fanbase clustering failed:', err)
        analysisStore.updateJob(jobId, {
            status: 'failed',
            error: err.message
        })
    })

    return { jobId }
}

/**
 * Analyzes a list of profile IDs for bot characteristics.
 * Used for "Check Members" in Fanbase Clustering.
 */
export async function analyzeCommunityBots(profileIds, leaderUsername = null) {
    try {
        const result = await analyzeCommunityMembers(profileIds, leaderUsername)
        return result
    } catch (error) {
        console.error('Error in analyzeCommunityBots:', error)
        throw error
    }
}

/**
 * Analyze a single profile for bot characteristics
 * @param {number} profileId 
 * @param {boolean} forceRefresh - Force refresh even if cache is valid
 */
export async function analyzeProfileBot(profileId, forceRefresh = false) {
    'use server'
    try {
        const result = await analyzeTwitterUser(parseInt(profileId), null, forceRefresh)
        return result
    } catch (error) {
        console.error('Error in analyzeProfileBot:', error)
        throw error
    }
}

// ============================================================================
// Fanbase Clustering Run Actions
// ============================================================================

/**
 * Get all fanbase clustering runs (history)
 * @param {number} limit - Maximum number of runs to return
 */
export async function getFanbaseRuns(limit = 20) {
    'use server'
    try {
        const runs = await prismaTwitter.fanbase_runs.findMany({
            orderBy: { created_at: 'desc' },
            take: limit,
            include: {
                _count: {
                    select: {
                        communities: true,
                        memberships: true
                    }
                }
            }
        })
        return runs
    } catch (error) {
        console.error('Error fetching fanbase runs:', error)
        throw error
    }
}

/**
 * Get the current (latest) fanbase clustering run
 */
export async function getCurrentFanbaseRun() {
    'use server'
    try {
        const run = await prismaTwitter.fanbase_runs.findFirst({
            where: { is_current: true },
            include: {
                _count: {
                    select: {
                        communities: true,
                        memberships: true
                    }
                }
            }
        })
        return run
    } catch (error) {
        console.error('Error fetching current fanbase run:', error)
        throw error
    }
}

/**
 * Get communities for a specific run
 * @param {number} runId
 */
export async function getRunCommunities(runId) {
    'use server'
    try {
        const communities = await prismaTwitter.fanbase_communities.findMany({
            where: { run_id: parseInt(runId) },
            orderBy: { member_count: 'desc' },
            include: {
                _count: {
                    select: { memberships: true }
                }
            }
        })
        return communities
    } catch (error) {
        console.error('Error fetching run communities:', error)
        throw error
    }
}

/**
 * Get members of a specific community
 * @param {number} communityId
 * @param {object} filters - Optional filters (role, bot_score_min, bot_score_max)
 */
export async function getCommunityMembers(communityId, filters = {}) {
    'use server'
    try {
        const where = {
            community_id: parseInt(communityId)
        }

        // Apply filters
        if (filters.role) {
            where.role = filters.role
        }
        if (filters.bot_score_min !== undefined) {
            where.bot_score = { gte: filters.bot_score_min }
        }
        if (filters.bot_score_max !== undefined) {
            where.bot_score = { ...where.bot_score, lte: filters.bot_score_max }
        }
        if (filters.is_suspicious !== undefined) {
            where.is_suspicious = filters.is_suspicious
        }

        const members = await prismaTwitter.fanbase_memberships.findMany({
            where,
            include: {
                profile: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        followers_count: true
                    }
                }
            },
            orderBy: [
                { role: 'asc' }, // leaders first
                { bot_score: 'desc' }
            ]
        })
        return members
    } catch (error) {
        console.error('Error fetching community members:', error)
        throw error
    }
}

/**
 * Get bot analysis statistics for a community
 * @param {number} communityId
 */
export async function getCommunityBotStats(communityId) {
    'use server'
    try {
        const stats = await prismaTwitter.fanbase_memberships.groupBy({
            by: ['bot_risk_level'],
            where: {
                community_id: parseInt(communityId),
                bot_risk_level: { not: null }
            },
            _count: true
        })

        const total = await prismaTwitter.fanbase_memberships.count({
            where: { community_id: parseInt(communityId) }
        })

        const suspicious = await prismaTwitter.fanbase_memberships.count({
            where: {
                community_id: parseInt(communityId),
                is_suspicious: true
            }
        })

        return {
            total,
            suspicious,
            byRiskLevel: stats.reduce((acc, stat) => {
                acc[stat.bot_risk_level] = stat._count
                return acc
            }, {})
        }
    } catch (error) {
        console.error('Error fetching community bot stats:', error)
        throw error
    }
}

/**
 * Compare two fanbase clustering runs
 * @param {number} runId1
 * @param {number} runId2
 */
export async function compareFanbaseRuns(runId1, runId2) {
    'use server'
    try {
        const [run1, run2] = await Promise.all([
            prismaTwitter.fanbase_runs.findUnique({
                where: { id: parseInt(runId1) },
                include: {
                    communities: {
                        include: {
                            _count: { select: { memberships: true } }
                        }
                    }
                }
            }),
            prismaTwitter.fanbase_runs.findUnique({
                where: { id: parseInt(runId2) },
                include: {
                    communities: {
                        include: {
                            _count: { select: { memberships: true } }
                        }
                    }
                }
            })
        ])

        if (!run1 || !run2) {
            throw new Error('One or both runs not found')
        }

        // Get members from both runs
        const [members1, members2] = await Promise.all([
            prismaTwitter.fanbase_memberships.findMany({
                where: { run_id: parseInt(runId1) },
                select: { profile_id: true, community_id: true, role: true }
            }),
            prismaTwitter.fanbase_memberships.findMany({
                where: { run_id: parseInt(runId2) },
                select: { profile_id: true, community_id: true, role: true }
            })
        ])

        const profileIds1 = new Set(members1.map(m => m.profile_id))
        const profileIds2 = new Set(members2.map(m => m.profile_id))

        const comparison = {
            run1: {
                id: run1.id,
                created_at: run1.created_at,
                communities: run1.communities.length,
                totalMembers: members1.length
            },
            run2: {
                id: run2.id,
                created_at: run2.created_at,
                communities: run2.communities.length,
                totalMembers: members2.length
            },
            changes: {
                newProfiles: Array.from(profileIds2).filter(id => !profileIds1.has(id)).length,
                removedProfiles: Array.from(profileIds1).filter(id => !profileIds2.has(id)).length,
                commonProfiles: Array.from(profileIds1).filter(id => profileIds2.has(id)).length
            }
        }

        return comparison
    } catch (error) {
        console.error('Error comparing fanbase runs:', error)
        throw error
    }
}
