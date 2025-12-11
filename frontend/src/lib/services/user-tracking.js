
import prisma from '@/lib/prisma'

export async function analyzeUser(userId) {
    try {
        const id = parseInt(userId)
        if (isNaN(id)) throw new Error('Invalid user ID')

        // 1. Verify user existence
        const user = await prisma.users.findUnique({
            where: { id }
        })
        if (!user) throw new Error('User not found')

        // 2. Fetch all messages (posts + archive)
        // We'll search by user_id. 
        // This is potentially very heavy if user has huge number of posts, but usually users have < 10k messages.
        // Limit to reasonable number per table?
        const limit = 5000

        const posts = await prisma.posts.findMany({
            where: { user_id: id },
            select: {
                date: true,
                publish_date: true,
                plain_content: true,
                source_id: true,
                type: true
            },
            take: limit,
            orderBy: { publish_date: 'desc' }
        })

        const archivePosts = await prisma.posts_archive.findMany({
            where: { user_id: id },
            select: {
                date: true,
                publish_date: true,
                plain_content: true,
                source_id: true
            },
            take: limit,
            orderBy: { publish_date: 'desc' }
        })

        const allMessages = [...posts, ...archivePosts].sort((a, b) => {
            const dateA = new Date(a.publish_date || a.date)
            const dateB = new Date(b.publish_date || b.date)
            return dateA - dateB
        })

        if (allMessages.length === 0) {
            await saveUserStats(id, 0, { messageCount: 0 })
            return { id, score: 0, metrics: { messageCount: 0 } }
        }

        // 3. Calculate Metrics

        // 3.1 Volume & Channels
        const messageCount = allMessages.length

        // Calculate true global days active (querying full DB, not just the 5000 sample)
        const [postsRange, archiveRange] = await Promise.all([
            prisma.posts.aggregate({
                where: { user_id: id },
                _min: { publish_date: true },
                _max: { publish_date: true }
            }),
            prisma.posts_archive.aggregate({
                where: { user_id: id },
                _min: { publish_date: true },
                _max: { publish_date: true }
            })
        ])

        const minDates = [postsRange._min.publish_date, archiveRange._min.publish_date].filter(Boolean).map(d => new Date(d))
        const maxDates = [postsRange._max.publish_date, archiveRange._max.publish_date].filter(Boolean).map(d => new Date(d))

        let daysActive = 0
        if (minDates.length > 0 && maxDates.length > 0) {
            const firstDate = new Date(Math.min(...minDates))
            const lastDate = new Date(Math.max(...maxDates))
            daysActive = Math.max(1, (lastDate - firstDate) / (1000 * 60 * 60 * 24))
        } else if (allMessages.length > 0) {
            const firstMsg = allMessages[0]
            const lastMsg = allMessages[allMessages.length - 1]
            const startTime = new Date(firstMsg.publish_date || firstMsg.date)
            const endTime = new Date(lastMsg.publish_date || lastMsg.date)
            daysActive = Math.max(1, (endTime - startTime) / (1000 * 60 * 60 * 24))
        }

        const messagesPerDay = messageCount / daysActive // Note: this is messages / "total lifespan" which might dilute bursty bots.
        // Correction: User Suspicion usually cares about "Intensity during active periods" or "Average volume".
        // If a user posted 100 msgs in 2020 and 100 msgs in 2025, daysActive is 5 years. Avg is ~0.
        // But for "Days Active" display, the user expects 'lifespan'. 
        // For scoring, we might want 'active days' (days with at least 1 message).
        // But for now, let's stick to the user's observation: "Days Active" should match the date range.

        // Chat spread
        // We need channel_id. 'posts' has source_id (channel_post_id).
        // To get channel_id, we'd need to join channel_post.
        // This is expensive (N+1 or massive join).
        // Let's approximate or fetch unique source_ids then map to channel_ids

        const uniqueSourceIds = [...new Set(allMessages.map(m => m.source_id).filter(Boolean))]
        // Resolving unique channels could be expensive if many sources.
        // For efficiency, maybe just use unique source_ids as proxy for "threads/channels"?
        // No, multiple posts in same channel have different source_ids (if source_id refers to channel_post).
        // Wait, posts.source_id refers to channel_post.id. 
        // We need channel_post.channel_id.
        // We can fetch channel_ids for these source_ids.

        const channelIds = new Set()
        if (uniqueSourceIds.length > 0) {
            // Batch fetch channel_post info
            // Limit to prevent query explosion
            const batchSize = 1000
            for (let i = 0; i < uniqueSourceIds.length; i += batchSize) {
                const batch = uniqueSourceIds.slice(i, i + batchSize)
                const cps = await prisma.channel_post.findMany({
                    where: { id: { in: batch } },
                    select: { channel_id: true }
                })
                cps.forEach(cp => { if (cp.channel_id) channelIds.add(cp.channel_id) })
            }
        }
        const activeChannelsCount = channelIds.size

        // 3.2 Temporal (A)
        let nightMessages = 0
        const hourDistribution = new Array(24).fill(0)
        const minuteDistribution = new Array(60).fill(0)
        let intervals = []
        let lastTime = null

        // Fixed intervals check: count deltas rounded to nearest minute
        const intervalCounts = {}

        allMessages.forEach(m => {
            const date = new Date(m.publish_date || m.date)
            const hour = date.getHours()
            const minute = date.getMinutes()

            hourDistribution[hour]++
            minuteDistribution[minute]++
            if (hour >= 0 && hour < 6) nightMessages++

            if (lastTime) {
                const diff = (date - lastTime) / 1000 // seconds
                if (diff > 0 && diff < 86400) { // skip huge gaps
                    intervals.push(diff)

                    // Fixed intervals (approximate to nearest 10s)
                    const approxDiff = Math.round(diff / 10) * 10
                    if (diff > 5) { // ignore fast replies
                        intervalCounts[approxDiff] = (intervalCounts[approxDiff] || 0) + 1
                    }
                }
            }
            lastTime = date
        })

        const nightActivityRatio = nightMessages / messageCount

        // Stats
        let meanInterval = 0
        let stdInterval = 0
        let fixedIntervalRatio = 0

        if (intervals.length > 0) {
            meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
            const sqSum = intervals.reduce((a, b) => a + Math.pow(b - meanInterval, 2), 0)
            stdInterval = Math.sqrt(sqSum / intervals.length)

            // Max repeating interval
            const maxRepeating = Math.max(...Object.values(intervalCounts), 0)
            fixedIntervalRatio = maxRepeating / intervals.length
        }

        const roundMinutesCount = minuteDistribution.filter((_, i) => i % 5 === 0).reduce((a, b) => a + b, 0)
        const roundMinutesRatio = roundMinutesCount / messageCount

        // 3.3 Text & Content (C)
        let linkMessages = 0
        const urlRegex = /(https?:\/\/[^\s]+)/g
        const textContent = []

        allMessages.forEach(m => {
            if (m.plain_content) {
                textContent.push(m.plain_content)
                if (urlRegex.test(m.plain_content)) linkMessages++
            }
        })

        const urlRatio = linkMessages / messageCount

        // Text Diversity (TTR) - Simple approximation
        // Join all text, split tokens, unique / total
        let ttr = 1.0
        if (textContent.length > 0) {
            // Limit text amount for TTR to avoid OOM
            const sampleText = textContent.slice(0, 500).join(' ').toLowerCase()
            const tokens = sampleText.split(/\s+/).filter(t => t.length > 2)
            if (tokens.length > 0) {
                const uniqueTokens = new Set(tokens)
                ttr = uniqueTokens.size / tokens.length
            }
        }

        // 4. Scoring
        let score = 0
        const flags = []

        // Bot behavior (High volume, many channels) - 'The Spreader'
        if (messagesPerDay > 100) score += 20
        if (activeChannelsCount > 20) score += 20 // Active in > 20 channels

        // Temporal bot
        if (nightActivityRatio > 0.4) score += 15 // Doesn't sleep
        if (meanInterval < 60 && stdInterval < 30) score += 20 // Fast & regular
        if (fixedIntervalRatio > 0.3) score += 15 // Clockwork
        if (roundMinutesRatio > 0.25) score += 10

        // Content
        if (ttr < 0.3) score += 15 // Repetitive
        if (urlRatio > 0.6) score += 15 // Link spammer

        score = Math.min(100, score)

        const metrics = {
            volume: { messageCount, messagesPerDay, daysActive, activeChannelsCount },
            temporal: { meanInterval, stdInterval, nightActivityRatio, roundMinutesRatio, fixedIntervalRatio },
            content: { urlRatio, ttr }
        }

        await saveUserStats(id, score, metrics)

        return { id, score, metrics }

    } catch (error) {
        console.error(`Error analyzing user ${userId}:`, error)
        throw error
    }
}

async function saveUserStats(userId, score, metrics) {
    await prisma.user_stats.create({
        data: {
            user_id: userId,
            suspicion_score: score,
            metrics: metrics
        }
    })
}
