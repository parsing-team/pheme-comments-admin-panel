import { PrismaClient } from '@/generated/input-client'

const globalForPrismaInput = global

const prismaInput = globalForPrismaInput.prismaInput || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrismaInput.prismaInput = prismaInput

export default prismaInput
