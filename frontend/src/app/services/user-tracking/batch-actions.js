'use server'

import prisma from '@/lib/prisma'

export async function getAnalysisBatch(limit = 20) {
    try {
        // Find users who have NO stats record
        // This 'none' filter works with Prisma's relations
        const users = await prisma.users.findMany({
            where: {
                stats: {
                    none: {}
                }
            },
            select: { id: true },
            take: limit
        })

        // Also get a rough count of remaining (optional, expensive so maybe just aggregate count?)
        const remainingCount = await prisma.users.count({
            where: {
                stats: {
                    none: {}
                }
            }
        })

        return {
            userIds: users.map(u => u.id),
            remaining: remainingCount
        }
    } catch (error) {
        console.error('Error fetching analysis batch:', error)
        return { userIds: [], remaining: 0 }
    }
}
