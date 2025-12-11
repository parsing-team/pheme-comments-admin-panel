'use server'

import prisma from '@/lib/prisma'

export async function getTopUsers() {
    try {
        const users = await prisma.users.findMany({
            where: {
                number_message: {
                    gt: 0
                }
            },
            orderBy: {
                number_message: 'desc'
            },
            take: 50
        })
        return users
    } catch (error) {
        console.error('Error fetching top users:', error)
        return []
    }
}
