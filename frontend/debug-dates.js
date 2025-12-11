
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const userId = 581594
    console.log(`Checking user ${userId}...`)

    // 1. Standard FindMany (Sample)
    const postsSample = await prisma.posts.findMany({ where: { user_id: userId }, take: 1, orderBy: { date: 'asc' } })
    const archiveSample = await prisma.posts_archive.findMany({ where: { user_id: userId }, take: 1, orderBy: { date: 'asc' } })

    console.log('Oldest Post (Sample):', postsSample[0]?.date)
    console.log('Oldest Archive (Sample):', archiveSample[0]?.date)

    // 2. Aggregate
    const postsAgg = await prisma.posts.aggregate({
        where: { user_id: userId },
        _min: { date: true },
        _max: { date: true },
        _count: true
    })
    const archiveAgg = await prisma.posts_archive.aggregate({
        where: { user_id: userId },
        _min: { date: true },
        _max: { date: true },
        _count: true
    })

    console.log('Posts Agg:', postsAgg)
    console.log('Archive Agg:', archiveAgg)

    // 3. Raw Query
    const rawMin = await prisma.$queryRaw`
        SELECT MIN(date) as min_date, MAX(date) as max_date, COUNT(*) as count 
        FROM posts_archive 
        WHERE user_id = ${userId}
    `
    console.log('Raw Archive Agg:', rawMin)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
