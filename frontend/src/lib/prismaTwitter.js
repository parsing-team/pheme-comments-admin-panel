import { PrismaClient } from '.prisma/twitter-client'

const globalForPrismaTwitter = global

const prismaTwitter = globalForPrismaTwitter.prismaTwitter || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrismaTwitter.prismaTwitter = prismaTwitter

export default prismaTwitter
