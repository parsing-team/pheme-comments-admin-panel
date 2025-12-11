'use server'

import prismaInput from '@/lib/prismaInput'

/**
 * Test connection to twitter_input database
 */
export async function testInputConnection() {
    try {
        // Test 1: Count monitored profiles
        const profileCount = await prismaInput.twitter_profiles.count()

        // Test 2: Get sample profile
        const sampleProfile = await prismaInput.twitter_profiles.findFirst({
            where: { active: 1 },
            select: {
                id: true,
                name: true,
                profiles_id: true,
                type: true
            }
        })

        // Test 3: Count posts
        const postCount = await prismaInput.twitter_posts.count()

        // Test 4: Get recent post
        const recentPost = await prismaInput.twitter_posts.findFirst({
            orderBy: { date: 'desc' },
            select: {
                id: true,
                plain_content: true,
                publish_date: true,
                source_id: true
            }
        })

        return {
            success: true,
            stats: {
                monitoredProfiles: profileCount,
                totalPosts: postCount
            },
            samples: {
                profile: sampleProfile,
                post: recentPost
            }
        }
    } catch (error) {
        console.error('twitter_input connection test failed:', error)
        return {
            success: false,
            error: error.message
        }
    }
}
