
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const userId = 581594
    console.log(`Checking user ${userId} PUBLISH dates...`)

    const postsAgg = await prisma.posts.aggregate({
        where: { user_id: userId },
        _min: { publish_date: true },
        _max: { publish_date: true }
    })

    // Note: posts_archive might not support aggregate on publish_date if it's not indexed nicely?
    // But let's try.
    const archiveAgg = await prisma.posts_archive.aggregate({
        where: { user_id: userId },
        _min: { publish_date: true },
        _max: { publish_date: true }
    })

    console.log('Posts Publish Range:', postsAgg)
    console.log('Archive Publish Range:', archiveAgg)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
