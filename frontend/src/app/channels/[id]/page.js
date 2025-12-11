import Link from 'next/link'
import { getChannel, getChannelPosts, getChannelTopUsers } from '../../actions'
import { formatDateTime } from '@/lib/formatDate'

export default async function ChannelPage({ params }) {
    const { id } = await params
    const channel = await getChannel(id)
    const posts = await getChannelPosts(id)
    const topUsers = await getChannelTopUsers(id)

    if (!channel) {
        return <div>Channel not found</div>
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    &larr; Back to Channels
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{channel.name || 'Unnamed Channel'}</h1>
                <p className="text-muted">
                    {channel.subscribers} subscribers • ID: {channel.id}
                </p>
            </div>

            {topUsers.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Top Active Users</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {topUsers.map((user) => (
                            <Link
                                href={`/users/${user.id}`}
                                key={user.id}
                                className="card"
                                style={{ padding: '1rem' }}
                            >
                                <div style={{ fontWeight: '600', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {user.first_name} {user.last_name}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    ID: {user.telegram_id?.toString() || user.id}
                                </div>
                                <div className="badge">
                                    {user.commentCount} comments
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Posts</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {posts.map((post) => (
                    <Link href={`/channels/${id}/posts/${post.id}`} key={post.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="badge">Post ID: {post.id}</span>
                            <span className="timestamp">
                                {formatDateTime(post.date || post.publish_date)}
                            </span>
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Comments:</strong> {post._count?.comments || 0}
                        </div>
                        {/* We could link to comments here if we had a view for post comments, 
                but the requirement is to see user comments. 
                Maybe we can list comments under the post if we fetch them? 
                For now, just listing posts as requested. 
            */}
                    </Link>
                ))}
                {posts.length === 0 && (
                    <p>No posts found for this channel.</p>
                )}
            </div>
        </div>
    )
}
