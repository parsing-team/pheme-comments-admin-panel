import Link from 'next/link'
import { getUser, getUserComments, getUserChannelActivity } from '../../actions'
import ChannelActivityList from './ChannelActivityList'
import UserAnalysisReport from '@/components/UserAnalysisReport'
import AnalyzeProfileButton from './AnalyzeProfileButton'
import { formatDateTime } from '@/lib/formatDate'

export default async function UserPage({ params, searchParams }) {
    const { id } = await params
    const { page, channelId } = await searchParams
    const currentPage = parseInt(page) || 1
    const limit = 100

    const user = await getUser(id)
    const { comments, totalCount } = await getUserComments(id, currentPage, limit, channelId)
    const channelActivity = await getUserChannelActivity(id)
    const totalPages = Math.ceil(totalCount / limit)

    // Find the filtered channel name if filtering
    const filteredChannel = channelId
        ? channelActivity.find(ch => ch.channelId === parseInt(channelId))
        : null

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/users" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    &larr; Back to Search
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{user.first_name} {user.last_name}</h1>
                <p className="text-muted">
                    Telegram ID: {user.telegram_id?.toString() || 'Unknown'} • DB ID: {user.id}
                </p>
                {user.phone && <p className="text-muted">Phone: {user.phone}</p>}
                <p className="text-muted">Total Comments: {totalCount}</p>
            </div>

            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Suspicion Analysis</h2>
                    <AnalyzeProfileButton userId={id} />
                </div>

                {user.stats && user.stats[0] ? (
                    <UserAnalysisReport stats={user.stats[0]} />
                ) : (
                    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>No analysis performed yet. Click the button to check for suspicious activity.</p>
                )}
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Channel Activity</h2>

            <ChannelActivityList channels={channelActivity} userId={id} />

            {filteredChannel && (
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>
                            Showing comments from: <strong>{filteredChannel.channelName}</strong>
                        </span>
                        <Link
                            href={`/users/${id}${page ? `?page=${page}` : ''}`}
                            className="btn"
                            style={{ textDecoration: 'none' }}
                        >
                            Clear Filter
                        </Link>
                    </div>
                </div>
            )}

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Comment History (Page {currentPage} of {totalPages})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.map((comment) => (
                    <div key={`${comment._source}-${comment.id}`} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <Link
                                href={comment.channel_post?.id ? `/channels/${comment.channel_post.channel_id}/posts/${comment.channel_post.id}` : '#'}
                                className="badge"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                {comment.channel_post?.channel?.name || 'Unknown Channel'}
                                {comment.channel_post?.id ? ` - ${comment.channel_post.id}` : ''}
                            </Link>
                            <span className="timestamp">
                                {formatDateTime(comment.publish_date)}
                            </span>
                        </div>
                        <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            {comment.plain_content || 'No content'}
                        </p>

                    </div>
                ))}
                {comments.length === 0 && (
                    <p>No comments found for this user.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                    {currentPage > 1 && (
                        <Link
                            href={`/users/${id}?page=${currentPage - 1}`}
                            className="button"
                            style={{ textDecoration: 'none' }}
                        >
                            &larr; Previous
                        </Link>
                    )}
                    <span style={{ alignSelf: 'center' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <Link
                            href={`/users/${id}?page=${currentPage + 1}`}
                            className="button"
                            style={{ textDecoration: 'none' }}
                        >
                            Next &rarr;
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
