const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const userId = 581594 // DB ID for telegram_id 403756438

    // Total comments
    const totalComments = await prisma.posts.count({
        where: { user_id: userId }
    })
    console.log('Total comments:', totalComments)

    // Comments with channel_post link
    const commentsWithChannelPost = await prisma.posts.count({
        where: {
            user_id: userId,
            source_id: { not: null },
            channel_post: { isNot: null }
        }
    })
    console.log('Comments with channel_post:', commentsWithChannelPost)

    // Comments without channel_post
    const commentsWithoutChannelPost = await prisma.posts.count({
        where: {
            user_id: userId,
            OR: [
                { source_id: null },
                { channel_post: null }
            ]
        }
    })
    console.log('Comments without channel_post:', commentsWithoutChannelPost)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
