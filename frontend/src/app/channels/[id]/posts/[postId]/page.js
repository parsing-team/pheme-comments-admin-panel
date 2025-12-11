import Link from 'next/link'
import { formatDateTime } from '@/lib/formatDate'

export default async function PostCommentsPage({ params }) {
    const { id, postId } = await params
    const prisma = (await import('@/lib/prisma')).default

    // Fetch the specific post directly
    const post = await prisma.channel_post.findUnique({
        where: {
            id: parseInt(postId)
        }
    })

    if (!post) {
        return <div>Post not found</div>
    }

    // Fetch comments for this post from both tables
    const [currentComments, archivedComments] = await Promise.all([
        prisma.posts.findMany({
            where: { source_id: post.id },
            include: { user: true },
            orderBy: { publish_date: 'desc' }
        }),
        prisma.posts_archive.findMany({
            where: { source_id: post.id },
            include: { user: true },
            orderBy: { publish_date: 'desc' }
        })
    ])

    const comments = [...currentComments, ...archivedComments].sort((a, b) => {
        return new Date(b.publish_date) - new Date(a.publish_date)
    })

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href={`/channels/${id}`} style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    &larr; Back to Channel
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Post #{post.id}</h1>
                <p className="text-muted">
                    {formatDateTime(post.publish_date)}
                </p>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Comments ({comments.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.map((comment) => (
                    <div key={comment.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <Link href={`/users/${comment.user_id}`} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                                {comment.user?.first_name} {comment.user?.last_name} (TG: {comment.user?.telegram_id?.toString() || 'unknown'})
                            </Link>
                            <span className="timestamp">
                                {formatDateTime(comment.publish_date)}
                            </span>
                        </div>
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                            {comment.plain_content || 'No content'}
                        </p>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p>No comments found for this post.</p>
                )}
            </div>
        </div>
    )
}
