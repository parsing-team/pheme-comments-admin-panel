import Link from 'next/link'
import { getTopPosts } from '../actions'
import { formatDateTime } from '@/lib/formatDate'

export default async function TwitterTopPostsPage({ searchParams }) {
    const params = await searchParams
    const currentPage = parseInt(params.page) || 1
    const timeRange = params.timeRange || '7d'
    const limit = 100
    const { topPosts, totalCount } = await getTopPosts(currentPage, limit, timeRange)
    const totalPages = Math.ceil(totalCount / limit)

    const timeRanges = [
        { value: '24h', label: '24 Hours' },
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: 'all', label: 'All Time' }
    ]

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Top Posts by Replies
            </h1>

            {/* Time Range Filter */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {timeRanges.map(range => (
                    <Link
                        key={range.value}
                        href={`/twitter/top-posts?timeRange=${range.value}`}
                        className="btn"
                        style={{
                            textDecoration: 'none',
                            backgroundColor: timeRange === range.value ? 'var(--primary)' : 'transparent',
                            color: timeRange === range.value ? 'white' : 'inherit',
                            border: timeRange === range.value ? 'none' : '1px solid var(--border)'
                        }}
                    >
                        {range.label}
                    </Link>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {topPosts.map((post, index) => (
                    <div key={post.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#{((currentPage - 1) * limit) + index + 1}</span>
                                <Link
                                    href={`/twitter/profiles/${post.author_postid}`}
                                    style={{ fontWeight: '600', textDecoration: 'none', color: 'inherit' }}
                                >
                                    {post.profile?.name || post.author_post_name || 'Unknown'}
                                </Link>
                                <span className="text-muted">
                                    @{post.profile?.username || post.author_post_username || 'unknown'}
                                </span>
                            </div>
                            <span className="timestamp">
                                {formatDateTime(post.publish_date || post.date)}
                            </span>
                        </div>

                        <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
                            {post.plain_content || 'No content'}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Link
                                href={`/twitter/posts/${post.tweet_id}`}
                                className="badge"
                                style={{ fontSize: '1rem', textDecoration: 'none', cursor: 'pointer' }}
                            >
                                💬 {post.comment_count} replies
                            </Link>
                            {post.like_count !== null && <span>❤️ {post.like_count}</span>}
                            {post.retweet_count !== null && <span>🔁 {post.retweet_count}</span>}
                            {post.views_tweet !== null && <span>👁 {post.views_tweet?.toString()}</span>}
                        </div>
                    </div>
                ))}
                {topPosts.length === 0 && (
                    <p>No posts found for this time range.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                    {currentPage > 1 && (
                        <Link
                            href={`/twitter/top-posts?timeRange=${timeRange}&page=${currentPage - 1}`}
                            className="button"
                            style={{ textDecoration: 'none' }}
                        >
                            ← Previous
                        </Link>
                    )}
                    <span style={{ alignSelf: 'center' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <Link
                            href={`/twitter/top-posts?timeRange=${timeRange}&page=${currentPage + 1}`}
                            className="button"
                            style={{ textDecoration: 'none' }}
                        >
                            Next →
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
