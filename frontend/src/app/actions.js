'use server'

import prisma from '@/lib/prisma'

export async function getChannels() {
    try {
        const channels = await prisma.channels.findMany({
            orderBy: {
                name: 'asc',
            },
        })
        return channels
    } catch (error) {
        console.error('Error fetching channels:', error)
        return []
    }
}

export async function getChannel(id) {
    try {
        const channel = await prisma.channels.findUnique({
            where: { id: parseInt(id) },
        })
        return channel
    } catch (error) {
        console.error('Error fetching channel:', error)
        return null
    }
}

export async function getChannelPosts(channelId) {
    try {
        const id = parseInt(channelId)

        // Fetch posts
        const posts = await prisma.channel_post.findMany({
            where: {
                channel_id: id,
            },
            orderBy: {
                date: 'desc',
            },
            take: 50,
        })

        // Get comment counts for each post from both tables
        const postIds = posts.map(p => p.id)

        if (postIds.length === 0) {
            return []
        }

        const commentCounts = await prisma.$queryRaw`
            SELECT 
                source_id,
                CAST(COUNT(*) AS INTEGER) as count
            FROM (
                SELECT source_id FROM posts WHERE source_id = ANY(${postIds})
                UNION ALL
                SELECT source_id FROM posts_archive WHERE source_id = ANY(${postIds})
            ) as all_comments
            GROUP BY source_id
        `

        // Create a map of post_id -> comment count
        const countMap = new Map()
        commentCounts.forEach(row => {
            countMap.set(row.source_id, row.count)
        })

        // Add comment counts to posts
        return posts.map(post => ({
            ...post,
            _count: {
                comments: countMap.get(post.id) || 0
            }
        }))
    } catch (error) {
        console.error('Error fetching channel posts:', error)
        return []
    }
}

export async function getChannelTopUsers(channelId) {
    try {
        const id = parseInt(channelId)

        // Raw query to aggregate counts from both tables
        // We join with channel_post to filter by channel_id
        // Note: We cast count to integer to avoid BigInt serialization issues
        const topUsers = await prisma.$queryRaw`
            SELECT user_id, CAST(COUNT(*) AS INTEGER) as count
            FROM (
                SELECT p.user_id 
                FROM posts p
                JOIN channel_post cp ON p.source_id = cp.id
                WHERE cp.channel_id = ${id} AND p.user_id IS NOT NULL
                
                UNION ALL
                
                SELECT pa.user_id 
                FROM posts_archive pa
                JOIN channel_post cp ON pa.source_id = cp.id
                WHERE cp.channel_id = ${id} AND pa.user_id IS NOT NULL
            ) as all_comments
            GROUP BY user_id
            ORDER BY count DESC
            LIMIT 10
        `

        if (!topUsers || topUsers.length === 0) {
            return []
        }

        // Fetch user details
        const userIds = topUsers.map(u => u.user_id)
        const users = await prisma.users.findMany({
            where: {
                id: { in: userIds }
            }
        })

        // Combine data and sort again to be sure (though SQL did it)
        return topUsers.map(stat => {
            const user = users.find(u => u.id === stat.user_id)
            if (!user) return null
            return {
                ...user,
                commentCount: stat.count
            }
        }).filter(Boolean)
    } catch (error) {
        console.error('Error fetching channel top users:', error)
        return []
    }
}

export async function searchUsers(query) {
    if (!query || query.length < 3) return []

    try {
        // Check if query is a number (telegram_id search)
        const isNumeric = /^\d+$/.test(query)

        const users = await prisma.users.findMany({
            where: isNumeric ? {
                telegram_id: BigInt(query)
            } : {
                OR: [
                    { first_name: { contains: query, mode: 'insensitive' } },
                    { last_name: { contains: query, mode: 'insensitive' } },
                    { username: { contains: query, mode: 'insensitive' } },
                ],
            },
            take: 20,
        })
        return users
    } catch (error) {
        console.error('Error searching users:', error)
        return []
    }
}

export async function getUser(id) {
    try {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(id) },
            include: {
                stats: {
                    orderBy: { analyzed_at: 'desc' },
                    take: 1
                }
            }
        })
        return user
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}

export async function getUserComments(userId, page = 1, limit = 100, channelId = null) {
    try {
        const id = parseInt(userId)
        const offset = (page - 1) * limit
        const channelFilter = channelId ? parseInt(channelId) : null

        // 1. Get total count for pagination
        const countResult = channelFilter
            ? await prisma.$queryRaw`
                SELECT CAST(COUNT(*) AS INTEGER) as count
                FROM (
                    SELECT p.id FROM posts p
                    JOIN channel_post cp ON p.source_id = cp.id
                    WHERE p.user_id = ${id} AND cp.channel_id = ${channelFilter}
                    UNION ALL
                    SELECT pa.id FROM posts_archive pa
                    JOIN channel_post cp ON pa.source_id = cp.id
                    WHERE pa.user_id = ${id} AND cp.channel_id = ${channelFilter}
                ) as all_posts
            `
            : await prisma.$queryRaw`
                SELECT CAST(COUNT(*) AS INTEGER) as count
                FROM (
                    SELECT id FROM posts WHERE user_id = ${id}
                    UNION ALL
                    SELECT id FROM posts_archive WHERE user_id = ${id}
                ) as all_posts
            `
        const totalCount = countResult[0]?.count || 0

        // 2. Get paginated IDs and source table
        const paginatedIds = channelFilter
            ? await prisma.$queryRaw`
                SELECT p.id, 'current' as source, p.publish_date 
                FROM posts p
                JOIN channel_post cp ON p.source_id = cp.id
                WHERE p.user_id = ${id} AND cp.channel_id = ${channelFilter}
                
                UNION ALL
                
                SELECT pa.id, 'archive' as source, pa.publish_date 
                FROM posts_archive pa
                JOIN channel_post cp ON pa.source_id = cp.id
                WHERE pa.user_id = ${id} AND cp.channel_id = ${channelFilter}
                
                ORDER BY publish_date DESC
                LIMIT ${limit} OFFSET ${offset}
            `
            : await prisma.$queryRaw`
                SELECT id, 'current' as source, publish_date 
                FROM posts 
                WHERE user_id = ${id}
                
                UNION ALL
                
                SELECT id, 'archive' as source, publish_date 
                FROM posts_archive 
                WHERE user_id = ${id}
                
                ORDER BY publish_date DESC
                LIMIT ${limit} OFFSET ${offset}
            `

        if (!paginatedIds || paginatedIds.length === 0) {
            return { comments: [], totalCount: 0 }
        }

        // 3. Fetch full details for the IDs found
        const currentIds = paginatedIds.filter(p => p.source === 'current').map(p => p.id)
        const archiveIds = paginatedIds.filter(p => p.source === 'archive').map(p => p.id)

        const [currentComments, archivedComments] = await Promise.all([
            currentIds.length > 0 ? prisma.posts.findMany({
                where: { id: { in: currentIds } },
                include: {
                    channel_post: { include: { channel: true } },
                    user: true,
                },
            }) : [],
            archiveIds.length > 0 ? prisma.posts_archive.findMany({
                where: { id: { in: archiveIds } },
                include: {
                    channel_post: { include: { channel: true } },
                    user: true,
                },
            }) : []
        ])

        // 4. Re-merge and sort to match the requested order (since findMany doesn't guarantee order of IN clause)
        // We can map back to the original paginatedIds order
        const commentMap = new Map()
        currentComments.forEach(c => commentMap.set(`current-${c.id}`, { ...c, _source: 'current' }))
        archivedComments.forEach(c => commentMap.set(`archive-${c.id}`, { ...c, _source: 'archive' }))

        const comments = paginatedIds
            .map(p => commentMap.get(`${p.source}-${p.id}`))
            .filter(Boolean)

        return { comments, totalCount }
    } catch (error) {
        console.error('Error fetching user comments:', error)
        return { comments: [], totalCount: 0 }
    }
}

export async function getUserChannelActivity(userId) {
    try {
        const id = parseInt(userId)

        // Aggregate channel activity across all comments using raw SQL
        const channelStats = await prisma.$queryRaw`
            SELECT 
                cp.channel_id,
                c.name as channel_name,
                CAST(COUNT(*) AS INTEGER) as comment_count
            FROM (
                SELECT source_id FROM posts WHERE user_id = ${id}
                UNION ALL
                SELECT source_id FROM posts_archive WHERE user_id = ${id}
            ) as all_comments
            JOIN channel_post cp ON all_comments.source_id = cp.id
            LEFT JOIN channels c ON cp.channel_id = c.id
            WHERE cp.channel_id IS NOT NULL
            GROUP BY cp.channel_id, c.name
            ORDER BY comment_count DESC
        `

        return channelStats.map(stat => ({
            channelId: stat.channel_id,
            channelName: stat.channel_name || 'Unknown Channel',
            count: stat.comment_count
        }))
    } catch (error) {
        console.error('Error fetching user channel activity:', error)
        return []
    }
}
