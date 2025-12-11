'use server'

import prisma from '@/lib/prisma'
import { analyzeChannel } from '@/lib/services/suspicion'

export async function getChannelsWithStats() {
    try {
        const channels = await prisma.channels.findMany({
            select: {
                id: true,
                name: true,
                stats: {
                    orderBy: { analyzed_at: 'desc' },
                    take: 1
                }
            },
            take: 100 // Limit for performance, handle pagination later if needed
        })

        return channels.map(c => ({
            id: c.id,
            name: c.name,
            latestStats: c.stats[0] || null
        }))
    } catch (error) {
        console.error('Error fetching channels:', error)
        return []
    }
}

export async function runAnalysis(channelId) {
    try {
        const result = await analyzeChannel(channelId)
        return { success: true, data: result }
    } catch (error) {
        console.error('Analysis failed:', error)
        return { success: false, error: error.message }
    }
}

export async function getChannelDetails(channelId) {
    try {
        const id = parseInt(channelId)
        const channel = await prisma.channels.findUnique({
            where: { id },
            include: {
                stats: {
                    orderBy: { analyzed_at: 'desc' },
                    take: 1
                }
            }
        })
        return channel
    } catch (error) {
        return null
    }
}
