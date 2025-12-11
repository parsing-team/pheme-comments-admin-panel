import prismaTwitter from '@/lib/prismaTwitter'
import { ANALYSIS_CONFIG } from '@/config/twitter-analysis'

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
    try {
        // Get all profiles with sufficient activity (at least 50 comments)
        const activeProfiles = await prismaTwitter.$queryRaw`
            SELECT 
                p.id,
                p.username,
                p.name,
                p.profile_id,
                CAST(COUNT(c.id) AS INTEGER) as comment_count
            FROM profiles p
            JOIN comments c ON c.author_postid = p.id
            GROUP BY p.id, p.username, p.name, p.profile_id
            HAVING COUNT(c.id) >= ${ANALYSIS_CONFIG.LIMITS.MIN_COMMENTS_FOR_TEMPORAL}
            ORDER BY COUNT(c.id) DESC
        `

        const suspiciousAccounts = []

        for (const profile of activeProfiles) {
            // Get all comments for this profile ordered by time
            const comments = await prismaTwitter.comments.findMany({
                where: {
                    author_postid: profile.id
                },
                orderBy: {
                    publish_date: 'asc'
                },
                select: {
                    publish_date: true,
                    reply_comment_id: true
                }
            })

            if (comments.length < ANALYSIS_CONFIG.LIMITS.MIN_COMMENTS_FOR_TEMPORAL) continue

            // Calculate Inter-Post Intervals (IPI)
            const intervals = []
            for (let i = 1; i < comments.length; i++) {
                const interval = (new Date(comments[i].publish_date) - new Date(comments[i - 1].publish_date)) / 1000 // seconds
                if (interval > 0 && interval < ANALYSIS_CONFIG.TEMPORAL.MAX_INTERVAL_SECONDS) { // Ignore intervals > 24 hours
                    intervals.push(interval)
                }
            }

            if (intervals.length < ANALYSIS_CONFIG.TEMPORAL.MIN_INTERVALS) continue

            // Calculate statistics
            const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length
            const variance = intervals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intervals.length
            const std = Math.sqrt(variance)

            // Count fixed intervals (within ±5 seconds)
            const fixedIntervals = intervals.filter(interval => {
                return intervals.filter(i => Math.abs(i - interval) <= ANALYSIS_CONFIG.TEMPORAL.FIXED_INTERVAL_TOLERANCE).length >= 3
            }).length
            const fixedIntervalRatio = fixedIntervals / intervals.length

            // Analyze hourly distribution
            const hourCounts = new Array(24).fill(0)
            comments.forEach(comment => {
                const hour = new Date(comment.publish_date).getHours()
                hourCounts[hour]++
            })

            // Night activity (2-6 AM)
            const nightActivity = hourCounts.slice(2, 6).reduce((a, b) => a + b, 0)
            const dayActivity = hourCounts.slice(6, 22).reduce((a, b) => a + b, 0)
            const nightRatio = dayActivity > 0 ? nightActivity / dayActivity : 0

            // Hour distribution standard deviation
            const hourMean = comments.length / 24
            const hourVariance = hourCounts.reduce((sum, count) => sum + Math.pow(count - hourMean, 2), 0) / 24
            const hourStd = Math.sqrt(hourVariance) / comments.length

            // Round-minute posting (00, 05, 10, 15, etc.)
            const roundMinutes = comments.filter(comment => {
                const minute = new Date(comment.publish_date).getMinutes()
                return minute % 5 === 0
            }).length
            const roundMinuteRatio = roundMinutes / comments.length

            // Burst detection (3+ tweets in 60 seconds)
            let burstCount = 0
            for (let i = 0; i < comments.length - 2; i++) {
                const timeWindow = (new Date(comments[i + 2].publish_date) - new Date(comments[i].publish_date)) / 1000
                if (timeWindow <= ANALYSIS_CONFIG.TEMPORAL.BURST_WINDOW) {
                    burstCount++
                }
            }
            const burstRatio = burstCount / Math.max(comments.length - 2, 1)

            // Calculate suspicion score
            let score = 0
            const flags = []

            // STD(IPI) < 0.2 × mean(IPI)
            if (std < ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.LOW_VARIANCE_RATIO * mean) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.LOW_VARIANCE
                flags.push(`Low interval variance (${std.toFixed(0)}s < ${(ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.LOW_VARIANCE_RATIO * mean).toFixed(0)}s)`)
            }

            // 40% intervals are fixed
            if (fixedIntervalRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.FIXED_INTERVAL_RATIO) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.FIXED_INTERVALS
                flags.push(`${(fixedIntervalRatio * 100).toFixed(0)}% fixed intervals`)
            }

            // High posting volume
            const postsPerDay = comments.length / 30 // Assuming ~30 days of data
            if (postsPerDay > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.POSTS_PER_DAY) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.HIGH_VOLUME
                flags.push(`${postsPerDay.toFixed(0)} posts/day`)
            }

            // Night activity > 30% of day
            if (nightRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.NIGHT_RATIO) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.NIGHT_ACTIVITY
                flags.push(`Night activity ${(nightRatio * 100).toFixed(0)}% of day`)
            }

            // Low hour distribution variance
            if (hourStd < ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.HOUR_STD) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.UNIFORM_HOURLY
                flags.push(`Uniform hour distribution (std: ${hourStd.toFixed(3)})`)
            }

            // 40% posts at round minutes
            if (roundMinuteRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.ROUND_MINUTE_RATIO) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.ROUND_MINUTES
                flags.push(`${(roundMinuteRatio * 100).toFixed(0)}% at round minutes`)
            }

            // 20% burst posting
            if (burstRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.BURST_RATIO) {
                score += ANALYSIS_CONFIG.TEMPORAL.SCORES.BURST_POSTING
                flags.push(`${(burstRatio * 100).toFixed(0)}% burst posts`)
            }

            // If score is high enough, add to suspicious list
            if (score >= ANALYSIS_CONFIG.TEMPORAL.SCORES.SUSPICIOUS_THRESHOLD) {
                suspiciousAccounts.push({
                    id: profile.id,
                    username: profile.username,
                    name: profile.name,
                    profile_id: profile.profile_id?.toString(),
                    comment_count: profile.comment_count,
                    score,
                    flags,
                    metrics: {
                        meanInterval: mean.toFixed(0),
                        stdInterval: std.toFixed(0),
                        fixedIntervalRatio: (fixedIntervalRatio * 100).toFixed(0),
                        nightRatio: (nightRatio * 100).toFixed(0),
                        roundMinuteRatio: (roundMinuteRatio * 100).toFixed(0),
                        burstRatio: (burstRatio * 100).toFixed(0),
                        postsPerDay: postsPerDay.toFixed(0)
                    }
                })
            }
        }

        // Sort by score descending
        suspiciousAccounts.sort((a, b) => b.score - a.score)

        return {
            totalAnalyzed: activeProfiles.length,
            suspiciousCount: suspiciousAccounts.length,
            accounts: suspiciousAccounts.slice(0, 100) // Return top 100
        }
    } catch (error) {
        console.error('Error analyzing temporal patterns:', error)
        return {
            totalAnalyzed: 0,
            suspiciousCount: 0,
            accounts: []
        }
    }
}

/**
 * Analyzes a single account for suspicious temporal patterns.
 * Same logic as analyzeTemporalPatterns but for a specific target.
 * 
 * @param {string|number} identifier - Username (with or without @) or Profile ID
 * @returns {Promise<Object>} Analysis result for the specific account
 */
export async function analyzeSingleAccount(identifier) {
    try {
        // Find profile by username or ID
        let profile

        // Check if identifier is a number (ID) or string (username)
        if (!isNaN(identifier)) {
            profile = await prismaTwitter.profiles.findUnique({
                where: { id: parseInt(identifier) }
            })
        } else {
            // Remove @ if present
            const username = identifier.startsWith('@') ? identifier.slice(1) : identifier
            profile = await prismaTwitter.profiles.findFirst({
                where: { username: username }
            })
        }

        if (!profile) {
            return {
                error: 'Profile not found',
                account: null
            }
        }

        // Get all comments for this profile
        const comments = await prismaTwitter.comments.findMany({
            where: {
                author_postid: profile.id
            },
            orderBy: {
                publish_date: 'asc'
            },
            select: {
                publish_date: true,
                reply_comment_id: true
            }
        })

        if (comments.length < 10) {
            return {
                error: `Insufficient data: only ${comments.length} comments found (minimum 10 required)`,
                account: null
            }
        }

        // Calculate Inter-Post Intervals (IPI)
        const intervals = []
        for (let i = 1; i < comments.length; i++) {
            const interval = (new Date(comments[i].publish_date) - new Date(comments[i - 1].publish_date)) / 1000
            if (interval > 0 && interval < ANALYSIS_CONFIG.TEMPORAL.MAX_INTERVAL_SECONDS) {
                intervals.push(interval)
            }
        }

        if (intervals.length < 5) {
            return {
                error: 'Insufficient interval data for analysis',
                account: null
            }
        }

        // Calculate statistics
        const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length
        const variance = intervals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intervals.length
        const std = Math.sqrt(variance)

        // Count fixed intervals
        const fixedIntervals = intervals.filter(interval => {
            return intervals.filter(i => Math.abs(i - interval) <= ANALYSIS_CONFIG.TEMPORAL.FIXED_INTERVAL_TOLERANCE).length >= 3
        }).length
        const fixedIntervalRatio = fixedIntervals / intervals.length

        // Analyze hourly distribution
        const hourCounts = new Array(24).fill(0)
        comments.forEach(comment => {
            const hour = new Date(comment.publish_date).getHours()
            hourCounts[hour]++
        })

        // Night activity (2-6 AM)
        const nightActivity = hourCounts.slice(2, 6).reduce((a, b) => a + b, 0)
        const dayActivity = hourCounts.slice(6, 22).reduce((a, b) => a + b, 0)
        const nightRatio = dayActivity > 0 ? nightActivity / dayActivity : 0

        // Hour distribution standard deviation
        const hourMean = comments.length / 24
        const hourVariance = hourCounts.reduce((sum, count) => sum + Math.pow(count - hourMean, 2), 0) / 24
        const hourStd = Math.sqrt(hourVariance) / comments.length

        // Round-minute posting
        const roundMinutes = comments.filter(comment => {
            const minute = new Date(comment.publish_date).getMinutes()
            return minute % 5 === 0
        }).length
        const roundMinuteRatio = roundMinutes / comments.length

        // Burst detection
        let burstCount = 0
        for (let i = 0; i < comments.length - 2; i++) {
            const timeWindow = (new Date(comments[i + 2].publish_date) - new Date(comments[i].publish_date)) / 1000
            if (timeWindow <= ANALYSIS_CONFIG.TEMPORAL.BURST_WINDOW) {
                burstCount++
            }
        }
        const burstRatio = burstCount / Math.max(comments.length - 2, 1)

        // Calculate suspicion score
        let score = 0
        const flags = []

        if (std < ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.LOW_VARIANCE_RATIO * mean) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.LOW_VARIANCE
            flags.push(`Low interval variance (${std.toFixed(0)}s < ${(ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.LOW_VARIANCE_RATIO * mean).toFixed(0)}s)`)
        }

        if (fixedIntervalRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.FIXED_INTERVAL_RATIO) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.FIXED_INTERVALS
            flags.push(`${(fixedIntervalRatio * 100).toFixed(0)}% fixed intervals`)
        }

        const postsPerDay = comments.length / 30
        if (postsPerDay > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.POSTS_PER_DAY) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.HIGH_VOLUME
            flags.push(`${postsPerDay.toFixed(0)} posts/day`)
        }

        if (nightRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.NIGHT_RATIO) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.NIGHT_ACTIVITY
            flags.push(`Night activity ${(nightRatio * 100).toFixed(0)}% of day`)
        }

        if (hourStd < ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.HOUR_STD) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.UNIFORM_HOURLY
            flags.push(`Uniform hour distribution (std: ${hourStd.toFixed(3)})`)
        }

        if (roundMinuteRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.ROUND_MINUTE_RATIO) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.ROUND_MINUTES
            flags.push(`${(roundMinuteRatio * 100).toFixed(0)}% at round minutes`)
        }

        if (burstRatio > ANALYSIS_CONFIG.TEMPORAL.THRESHOLDS.BURST_RATIO) {
            score += ANALYSIS_CONFIG.TEMPORAL.SCORES.BURST_POSTING
            flags.push(`${(burstRatio * 100).toFixed(0)}% burst posts`)
        }

        return {
            error: null,
            account: {
                id: profile.id,
                username: profile.username,
                name: profile.name,
                profile_id: profile.profile_id?.toString(),
                comment_count: comments.length,
                score,
                flags,
                metrics: {
                    meanInterval: mean.toFixed(0),
                    stdInterval: std.toFixed(0),
                    fixedIntervalRatio: (fixedIntervalRatio * 100).toFixed(0),
                    nightRatio: (nightRatio * 100).toFixed(0),
                    roundMinuteRatio: (roundMinuteRatio * 100).toFixed(0),
                    burstRatio: (burstRatio * 100).toFixed(0),
                    postsPerDay: postsPerDay.toFixed(0)
                }
            }
        }
    } catch (error) {
        console.error('Error analyzing single account:', error)
        return {
            error: 'Analysis failed',
            account: null
        }
    }
}
