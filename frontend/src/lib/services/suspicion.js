
import prisma from '@/lib/prisma'

export async function analyzeChannel(channelId) {
    try {
        const id = parseInt(channelId)
        if (isNaN(id)) throw new Error('Invalid channel ID')

        // 1. Fetch channel info to verify existence
        const channel = await prisma.channels.findUnique({
            where: { id }
        })
        if (!channel) throw new Error('Channel not found')

        // 2. Fetch all posts (current + archive)
        // We need: date, user_id, message content (for links/forwards), type
        // Efficient way: query 'channel_post' first to get source_ids

        // LIMITATION: Fetching 2 million rows is bad. We should chunk or limit.
        // For now, let's fetch last 10,000 messages for analysis or a time window (e.g., last 30 days).
        // User asked for comprehensive analysis, but memory is a constant constraint.
        // Let's try fetching ALL 'channel_post' IDs for the channel, then fetching posts in batches if needed.
        // Or better: Use database aggregation where possible.
        // BUT complexity of metrics (intervals, Gini) requires fetching at least minimal metadata (date, user_id).

        // Step 2a: Get IDs from channel_post
        const channelPosts = await prisma.channel_post.findMany({
            where: { channel_id: id },
            select: { id: true },
        })
        const sourceIds = channelPosts.map(cp => cp.id)

        if (sourceIds.length === 0) {
            return saveStats(id, 0, {})
        }

        // Step 2b: Fetch posts metadata (chunked if necessary, but starting simple)
        // We'll fetch relevant fields only.
        const posts = await prisma.posts.findMany({
            where: { source_id: { in: sourceIds } },
            select: {
                date: true,
                user_id: true,
                plain_content: true,
                // forward detection is tricky without explicit fields, assume unavailable or check plain_content
            },
            orderBy: { date: 'asc' }
        })

        const archivePosts = await prisma.posts_archive.findMany({
            where: { source_id: { in: sourceIds } },
            select: {
                date: true,
                user_id: true,
                plain_content: true,
            },
            orderBy: { date: 'asc' }
        })

        const allMessages = [...posts, ...archivePosts].sort((a, b) => new Date(a.date) - new Date(b.date))

        if (allMessages.length === 0) {
            return saveStats(id, 0, { messageCount: 0 })
        }

        // 3. Calculate Metrics

        // 3.1 Volume & Dynamics
        const messageCount = allMessages.length
        const startTime = new Date(allMessages[0].date)
        const endTime = new Date(allMessages[allMessages.length - 1].date)
        const daysActive = Math.max(1, (endTime - startTime) / (1000 * 60 * 60 * 24))
        const messagesPerDay = messageCount / daysActive

        // Active users
        const authors = new Set()
        const authorCounts = {}
        allMessages.forEach(m => {
            if (m.user_id) {
                authors.add(m.user_id)
                authorCounts[m.user_id] = (authorCounts[m.user_id] || 0) + 1
            }
        })
        const uniqueAuthors = authors.size

        // 3.2 Temporal Patterns
        let nightMessages = 0
        const hourDistribution = new Array(24).fill(0)
        const minuteDistribution = new Array(60).fill(0)
        let intervals = []
        let lastTime = null

        allMessages.forEach(m => {
            const date = new Date(m.date)
            const hour = date.getHours()
            const minute = date.getMinutes()

            hourDistribution[hour]++
            minuteDistribution[minute]++

            // Night is 00-05
            if (hour >= 0 && hour < 6) nightMessages++

            if (lastTime) {
                const diff = (date - lastTime) / 1000 // seconds
                if (diff > 0) intervals.push(diff) // Only count positive intervals
            }
            lastTime = date
        })

        const nightActivityRatio = nightMessages / messageCount

        // Intervals stats
        let meanInterval = 0
        let stdInterval = 0
        if (intervals.length > 0) {
            const sum = intervals.reduce((a, b) => a + b, 0)
            meanInterval = sum / intervals.length
            const sqSum = intervals.reduce((a, b) => a + Math.pow(b - meanInterval, 2), 0)
            stdInterval = Math.sqrt(sqSum / intervals.length)
        }

        // Round minutes ratio (00, 05, 10...)
        const roundMinutesCount = minuteDistribution.filter((_, i) => i % 5 === 0).reduce((a, b) => a + b, 0)
        const roundMinutesRatio = roundMinutesCount / messageCount

        // 3.3 Author Structure
        const authorCountsArray = Object.values(authorCounts).sort((a, b) => a - b)
        let gini = 0
        if (authorCountsArray.length > 0) {
            // Gini calculation
            const n = authorCountsArray.length
            let num = 0
            let den = 0
            for (let i = 0; i < n; i++) {
                num += (i + 1) * authorCountsArray[i]
                den += authorCountsArray[i]
            }
            // Gini formula: (2 * sum(i * xi)) / (n * sum(xi)) - (n + 1) / n
            // My loop matches numerator logic roughly? Let's use simpler formula:
            // G = (2 * sum(i * y_i) / (n * S)) - (n+1)/n
            // i is 1-indexed rank
            gini = (2 * num) / (n * den) - (n + 1) / n
        }

        // 3.4 Content Analysis (Links)
        let linkMessages = 0
        const domains = {}
        const urlRegex = /(https?:\/\/[^\s]+)/g

        allMessages.forEach(m => {
            if (m.plain_content) {
                const urls = m.plain_content.match(urlRegex)
                if (urls) {
                    linkMessages++
                    urls.forEach(url => {
                        try {
                            const domain = new URL(url).hostname
                            domains[domain] = (domains[domain] || 0) + 1
                        } catch (e) { }
                    })
                }
            }
        })

        const urlRatio = linkMessages / messageCount
        const topDomains = Object.entries(domains)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([domain, count]) => ({ domain, count }))

        // 4. Calculate Suspicion Score
        // Simple heuristic based on flags
        let score = 0

        // Flag: High frequency, low authors
        if (messagesPerDay > 50 && uniqueAuthors < 5) score += 20

        // Flag: Night activity (bots don't sleep)
        if (nightActivityRatio > 0.15) score += 10 // Normal is low, bots might be uniform -> 0.25 (6/24)
        // If night ratio is VERY close to uniform (0.25), suspicious. If 0, organic.
        // Actually, organic groups sleep. Bots might not. 
        // Let's punish High night activity.

        // Flag: Round minutes
        if (roundMinutesRatio > 0.3) score += 20 // Expected random is 12/60 = 0.2. 0.3 is high.

        // Flag: Gini (High inequality = 1-2 spammers)
        if (gini > 0.8) score += 15

        // Flag: Link farm
        if (urlRatio > 0.5) score += 20
        if (topDomains.length > 0 && (topDomains[0].count / linkMessages) > 0.7) score += 15 // Concentration

        score = Math.min(100, score)

        const metrics = {
            volume: { messageCount, messagesPerDay, daysActive },
            authors: { uniqueAuthors, gini, topAuthors: authorCountsArray.slice(-5) },
            temporal: { meanInterval, stdInterval, nightActivityRatio, roundMinutesRatio },
            content: { urlRatio, topDomains }
        }

        await saveStats(id, score, metrics)

        return { id, score, metrics }

    } catch (error) {
        console.error(`Error analyzing channel ${channelId}:`, error)
        throw error
    }
}

async function saveStats(channelId, score, metrics) {
    await prisma.channel_stats.create({
        data: {
            channel_id: channelId,
            suspicion_score: score,
            metrics: metrics
        }
    })
}
