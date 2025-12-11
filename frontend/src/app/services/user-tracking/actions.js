'use server'

import prisma from '@/lib/prisma'
import { analyzeUser } from '@/lib/services/user-tracking'

export async function getUsersWithStats(query = '') {
    try {
        const where = {}

        if (query && query.length >= 3) {
            const isNumeric = /^\d+$/.test(query)
            if (isNumeric) {
                where.telegram_id = BigInt(query)
            } else {
                where.OR = [
                    { first_name: { contains: query, mode: 'insensitive' } },
                    { last_name: { contains: query, mode: 'insensitive' } },
                    { username: { contains: query, mode: 'insensitive' } },
                ]
            }
        }

        const users = await prisma.users.findMany({
            where,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                stats: {
                    orderBy: { analyzed_at: 'desc' },
                    take: 1
                }
            },
            take: 100
        })

        return users.map(u => ({
            id: u.id,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username || `User ${u.id}`,
            username: u.username,
            latestStats: u.stats[0] || null
        }))
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}

export async function runUserAnalysis(userId) {
    try {
        const result = await analyzeUser(userId)
        return { success: true, data: result }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function getUserDetails(userId) {
    try {
        const id = parseInt(userId)
        const user = await prisma.users.findUnique({
            where: { id },
            include: {
                stats: {
                    orderBy: { analyzed_at: 'desc' },
                    take: 1
                }
            }
        })
        return user
    } catch (error) {
        return null
    }
}
