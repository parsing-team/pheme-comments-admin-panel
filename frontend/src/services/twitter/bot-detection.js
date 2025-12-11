import prismaTwitter from '@/lib/prismaTwitter'

/**
 * Analyze a list of user IDs for bot characteristics
 * @param {Array<string|number>} profileIds 
 * @param {string} leaderUsername 
 */
export async function analyzeCommunityMembers(profileIds, leaderUsername = null) {
    const results = []

    // Process in parallel with concurrency limit if needed, 
    // for now Promise.all for simplicity (assuming batches of ~20-50 from UI)
    // If community is large (700+), we might need batching.

    console.log(`[BotDetection] Analyzing ${profileIds.length} members...`)
    const BATCH_SIZE = 20
    for (let i = 0; i < profileIds.length; i += BATCH_SIZE) {
        const batch = profileIds.slice(i, i + BATCH_SIZE)
        const batchResults = await Promise.all(
            batch.map(id => analyzeTwitterUser(parseInt(id), leaderUsername))
        )
        results.push(...batchResults)
    }

    const finalResults = results.filter(Boolean).sort((a, b) => b.score - a.score)
    console.log(`[BotDetection] Analysis complete. Found ${finalResults.length} results.`)
    return finalResults
}

/**
 * Analyzing a single Twitter user for bot characteristics.
 * Based on the "User-Level Bot Analysis" algorithm.
 * 
 * @param {number} profileId 
 * @param {string} leaderUsername (Optional, for interaction check)
 */
export async function analyzeTwitterUser(profileId, leaderUsername = null, forceRefresh = false) {
    console.log(`[BotDetection] Analyzing user ${profileId} (type: ${typeof profileId}, forceRefresh: ${forceRefresh})`)
    try {
        const profile = await prismaTwitter.profiles.findUnique({
            where: { id: profileId },
            include: {
                bot_analysis_cache: true
            }
        })

        if (!profile) {
            console.log(`[BotDetection] Profile ${profileId} not found in database`)
            return null
        }

        console.log(`[BotDetection] Found profile: ${profile.username} (id: ${profile.id})`)

        // Fetch recent comments (tweets/replies) for analysis
        const tweets = await prismaTwitter.comments.findMany({
            where: { author_postid: profileId },
            orderBy: { publish_date: 'desc' },
            take: 101
        })

        console.log(`[BotDetection] Found ${tweets.length} tweets for user ${profileId}`)

        // Get latest tweet date
        const latestTweetDate = tweets.length > 0 && tweets[0].publish_date
            ? new Date(tweets[0].publish_date)
            : null

        // Check bot_analysis_cache table for cached results
        if (!forceRefresh && profile.bot_analysis_cache) {
            const cache = profile.bot_analysis_cache
            const cachedLastTweetDate = cache.last_tweet_date ? new Date(cache.last_tweet_date) : null

            // If no new tweets since last analysis, return cached result
            if (latestTweetDate && cachedLastTweetDate && cachedLastTweetDate.getTime() === latestTweetDate.getTime()) {
                console.log(`[BotDetection] Using cached analysis for user ${profileId} (no new tweets since ${cachedLastTweetDate.toISOString()})`)
                return {
                    ...cache.analysis_data,
                    cached: true,
                    analyzedAt: cache.analyzed_at
                }
            } else {
                console.log(`[BotDetection] Cache invalid - new tweets detected. Last cached: ${cachedLastTweetDate?.toISOString()}, Latest: ${latestTweetDate?.toISOString()}`)
            }
        }

        if (tweets.length === 0) {
            const result = {
                profileId,
                username: profile.username || `User ${profileId}`,
                score: 0,
                riskLevel: 'Low',
                riskFactors: ['No activity'],
                details: {
                    created: profile.joined,
                    followers: profile.followers_count,
                    tweetCount: 0
                },
                cached: false,
                analyzedAt: new Date()
            }

            // Save to bot_analysis_cache table
            try {
                await prismaTwitter.bot_analysis_cache.upsert({
                    where: { profile_id: profileId },
                    create: {
                        profile_id: profileId,
                        bot_score: 0,
                        risk_level: 'Low',
                        analysis_data: result,
                        last_tweet_date: latestTweetDate,
                        tweet_count: 0
                    },
                    update: {
                        bot_score: 0,
                        risk_level: 'Low',
                        analysis_data: result,
                        last_tweet_date: latestTweetDate,
                        tweet_count: 0,
                        analyzed_at: new Date()
                    }
                })
            } catch (dbError) {
                console.error(`[BotDetection] Failed to save analysis for user ${profileId}:`, dbError.message)
            }

            return result
        }

        // --- 1. Profile Analysis ---
        let profileScore = 0
        const riskFactors = []

        // Age
        // Check for null joined date
        if (profile.joined) {
            const daysSinceCreation = (new Date() - new Date(profile.joined)) / (1000 * 60 * 60 * 24)
            if (daysSinceCreation < 30) {
                profileScore += 10
                riskFactors.push('Young Account (<30 days)')
            } else if (daysSinceCreation < 90) {
                profileScore += 5
            }
        } else {
            // Missing join date is suspicious in some contexts, but data might be incomplete
        }

        // Followers/Following
        // Avoid division by zero
        const following = profile.following_count || 0
        const followers = profile.followers_count || 0
        const ratio = following > 0 ? followers / following : 0

        // Bot pattern: follows 1000, followed by 10 (ratio 0.01)
        if (following > 100 && ratio < 0.1) {
            profileScore += 10
            riskFactors.push('Mass Follower (Low Ratio)')
        } else if (following > 1000 && ratio < 0.05) {
            profileScore += 15
            riskFactors.push('Mass Follower (Very Low Ratio)')
        }

        // Bio/Location
        if (!profile.description_profile && !profile.location) {
            profileScore += 5
            riskFactors.push('Empty Profile')
        }

        // --- 2. Behavioral Analysis (Temporal) ---
        let temporalScore = 0
        const dates = tweets
            .map(t => t.publish_date ? new Date(t.publish_date) : null)
            .filter(Boolean)
            .sort((a, b) => a - b)

        if (dates.length > 5) {
            let intervals = []
            for (let i = 1; i < dates.length; i++) {
                intervals.push((dates[i] - dates[i - 1]) / 1000) // seconds
            }

            // Mean Interval
            const meanInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length

            // Std Dev (Regularity)
            const variance = intervals.reduce((a, b) => a + Math.pow(b - meanInterval, 2), 0) / intervals.length
            const stdDev = Math.sqrt(variance)

            // Coefficient of Variation (CV) < 1 means regularity, < 0.5 is very regular
            const cv = meanInterval > 0 ? stdDev / meanInterval : 0

            if (cv < 0.8) {
                temporalScore += 5
            }
            if (cv < 0.5) {
                temporalScore += 10 // Stacked
                riskFactors.push(`Robotic Regularity (CV ${cv.toFixed(2)})`)
            }

            // Night Activity (00-06 Local Time?? We assume UTC for now)
            const nightTweets = dates.filter(d => {
                const h = d.getUTCHours()
                return h >= 0 && h <= 5
            }).length
            const nightRatio = nightTweets / dates.length
            if (nightRatio > 0.5) {
                temporalScore += 5
                riskFactors.push('High Night Activity')
            }

            // High frequency (Posts per day estimate)
            // Lifespan of these tweets
            const timeSpanDays = (dates[dates.length - 1] - dates[0]) / (1000 * 3600 * 24) || 1
            const avgMsgsPerDay = dates.length / timeSpanDays

            if (avgMsgsPerDay > 50) {
                temporalScore += 10
                riskFactors.push(`High Frequency (${avgMsgsPerDay.toFixed(0)}/day)`)
            } else if (avgMsgsPerDay > 20) {
                temporalScore += 5
            }
        }

        // --- 3. Text Analysis ---
        let textScore = 0
        const contents = tweets.map(t => t.plain_content).filter(Boolean)
        if (contents.length > 5) {
            // TTR (Type-Token Ratio)
            const allText = contents.join(' ').toLowerCase()
            const words = allText.match(/\b\w+\b/g) || []
            if (words.length > 0) {
                const uniqueWords = new Set(words)
                const ttr = uniqueWords.size / words.length

                if (ttr < 0.3) {
                    textScore += 15
                    riskFactors.push(`Repetitive Text (TTR ${ttr.toFixed(2)})`)
                } else if (ttr < 0.5) {
                    textScore += 5
                }
            }
        }

        // --- 4. Interaction (Leader) ---
        let interactionScore = 0
        if (leaderUsername) {
            // Check replies to leader
            // NOTE: t.reply_comment_username is the field
            const repliesToLeader = tweets.filter(t =>
                t.reply_comment_username &&
                t.reply_comment_username.toLowerCase() === leaderUsername.toLowerCase().replace('@', '')
            ).length

            if (repliesToLeader > 0) {
                const replyRatio = repliesToLeader / tweets.length
                if (replyRatio > 0.5) {
                    interactionScore += 15
                    riskFactors.push(`Obsessive Leader Interaction (${(replyRatio * 100).toFixed(0)}%)`)
                }
            }
        }

        // Final Score
        // Max ~65 raw. Normalize to 0-100.
        let totalRaw = profileScore + temporalScore + textScore + interactionScore
        const normalizedScore = Math.min(100, Math.round((totalRaw / 60) * 100))

        let riskLevel = 'Low'
        if (normalizedScore > 75) riskLevel = 'Critical'
        else if (normalizedScore > 50) riskLevel = 'High'
        else if (normalizedScore > 25) riskLevel = 'Medium'

        const result = {
            profileId,
            username: profile.username || `User ${profileId}`,
            // We return more data for the UI
            name: profile.name,
            score: normalizedScore,
            riskLevel,
            riskFactors,
            details: {
                created: profile.joined,
                followers: profile.followers_count,
                tweetCount: tweets.length
            },
            cached: false,
            analyzedAt: new Date()
        }

        console.log(`[BotDetection] User ${profileId} analysis complete: score=${normalizedScore}, riskLevel=${riskLevel}, factors=${riskFactors.length}`)

        // Get previous score for history tracking
        const previousCache = await prismaTwitter.bot_analysis_cache.findUnique({
            where: { profile_id: profileId }
        })
        const previousScore = previousCache?.bot_score || null
        const scoreChange = previousScore !== null ? normalizedScore - previousScore : null

        // Save to bot_analysis_cache table
        try {
            await prismaTwitter.bot_analysis_cache.upsert({
                where: { profile_id: profileId },
                create: {
                    profile_id: profileId,
                    bot_score: normalizedScore,
                    risk_level: riskLevel,
                    analysis_data: result,
                    last_tweet_date: latestTweetDate,
                    tweet_count: tweets.length
                },
                update: {
                    bot_score: normalizedScore,
                    risk_level: riskLevel,
                    analysis_data: result,
                    last_tweet_date: latestTweetDate,
                    tweet_count: tweets.length,
                    analyzed_at: new Date()
                }
            })

            // Save to history table if score changed significantly
            if (scoreChange !== null && Math.abs(scoreChange) >= 5) {
                await prismaTwitter.bot_analysis_history.create({
                    data: {
                        profile_id: profileId,
                        bot_score: normalizedScore,
                        risk_level: riskLevel,
                        analysis_data: result,
                        tweet_count: tweets.length,
                        score_change: scoreChange
                    }
                })
                console.log(`[BotDetection] Score changed by ${scoreChange} - saved to history`)
            }
        } catch (dbError) {
            console.error(`[BotDetection] Failed to save analysis for user ${profileId}:`, dbError.message)
        }

        return result

    } catch (e) {
        console.error('Error analyzing user:', profileId, e)
        return null
    }
}
