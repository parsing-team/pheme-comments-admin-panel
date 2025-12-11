import Link from 'next/link'
import { getTweet, getTweetReplies } from '../../actions'
import { formatDateTime } from '@/lib/formatDate'

export default async function TweetPage({ params, searchParams = {} }) {
    const { tweetId } = await params
    const resolvedSearchParams = await searchParams
    const { page } = resolvedSearchParams || {}
    const currentPage = parseInt(page) || 1
    const limit = 100

    const tweet = await getTweet(tweetId)
    const { replies, totalCount } = await getTweetReplies(tweetId, currentPage, limit)
    const totalPages = Math.ceil(totalCount / limit)

    if (!tweet) {
        return <div>Tweet not found</div>
    }

    return (
        <div>
            <Link href="/twitter/top-posts" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                ← Back to Top Posts
            </Link>

            {/* Main Tweet */}
            <div className="card" style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link
                            href={`/twitter/profiles/${tweet.author_postid}`}
                            style={{ fontWeight: '600', textDecoration: 'none', color: 'inherit', fontSize: '1.2rem' }}
                        >
                            {tweet.profile?.name || tweet.author_post_name || 'Unknown'}
                        </Link>
                        <span className="text-muted">
                            @{tweet.profile?.username || tweet.author_post_username || 'unknown'}
                        </span>
                    </div>
                    <span className="timestamp">
                        {formatDateTime(tweet.publish_date || tweet.date)}
                    </span>
                </div>

                <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap', fontSize: '1.25rem' }}>
                    {tweet.plain_content || 'No content'}
                </p>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '1rem', color: 'var(--text-muted)' }}>
                    <span>💬 {tweet.comment_count} replies</span>
                    {tweet.like_count !== null && <span>❤️ {tweet.like_count}</span>}
                    {tweet.retweet_count !== null && <span>🔁 {tweet.retweet_count}</span>}
                    {tweet.views_tweet !== null && <span>👁 {tweet.views_tweet?.toString()}</span>}
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Replies ({totalCount})
            </h2>

            {/* Replies List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {replies.map((reply) => (
                    <div key={reply.id} className="card" style={{ marginLeft: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Link
                                    href={`/twitter/profiles/${reply.author_postid}`}
                                    style={{ fontWeight: '600', textDecoration: 'none', color: 'inherit' }}
                                >
                                    {reply.profile?.name || reply.author_post_name || 'Unknown'}
                                </Link>
                                <span className="text-muted">
                                    @{reply.profile?.username || reply.author_post_username || 'unknown'}
                                </span>
                            </div>
                            <span className="timestamp">
                                {formatDateTime(reply.publish_date || reply.date)}
                            </span>
                        </div>

                        <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            {reply.plain_content || 'No content'}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {reply.like_count !== null && <span>❤️ {reply.like_count}</span>}
                            {reply.retweet_count !== null && <span>🔁 {reply.retweet_count}</span>}
                            {reply.views_tweet !== null && <span>👁 {reply.views_tweet?.toString()}</span>}
                        </div>
                    </div>
                ))}
                {replies.length === 0 && (
                    <p>No replies found in database.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                    {currentPage > 1 && (
                        <Link
                            href={`/twitter/posts/${tweetId}?page=${currentPage - 1}`}
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
                            href={`/twitter/posts/${tweetId}?page=${currentPage + 1}`}
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
