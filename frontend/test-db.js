const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Get channel 89
    const channel = await prisma.channels.findUnique({
        where: { id: 89 }
    })
    console.log('Channel:', channel)

    // Get posts for channel 89
    const posts = await prisma.channel_post.findMany({
        where: { channel_id: 89 },
        take: 3
    })
    console.log('\nPosts:', posts)

    // Check if there are comments linked to these posts
    if (posts.length > 0) {
        const comments = await prisma.posts.findMany({
            where: {
                source_id: posts[0].id
            },
            take: 5
        })
        console.log(`\nComments for post ${posts[0].id}:`, comments.length)
        if (comments.length > 0) {
            console.log('First comment:', comments[0])
        }
    }

    // Try to find comments another way - by telegram_id
    if (posts.length > 0 && posts[0].telegram_id) {
        const commentsByTelegramId = await prisma.posts.findMany({
            where: {
                telegram_id: posts[0].telegram_id
            },
            take: 5
        })
        console.log(`\nComments by telegram_id ${posts[0].telegram_id}:`, commentsByTelegramId.length)
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
