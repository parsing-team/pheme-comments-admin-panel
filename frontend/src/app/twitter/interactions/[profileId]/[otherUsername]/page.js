import Link from 'next/link'
import { getProfile, getInteractions } from '@/app/twitter/actions'

export default async function InteractionsPage({ params }) {
    const { profileId, otherUsername } = await params
    const profile = await getProfile(profileId)
    const interactions = await getInteractions(profileId, otherUsername)

    if (!profile) {
        return <div>Profile not found</div>
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href={`/twitter/profiles/${profileId}`} style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Profile
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    Interactions with @{otherUsername}
                </h1>
                <p className="text-muted">
                    Showing interactions between @{profile.username} and @{otherUsername}
                </p>
            </div>

            {/* Section 1: Posts by Profile User replied to by Other User */}
            {interactions.repliedBy.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Posts by @{profile.username} replied to by @{otherUsername}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {interactions.repliedBy.map((thread) => (
                            <div key={thread.originalPost.id} className="card" style={{ padding: '1.5rem' }}>
                                {/* Original Post */}
                                <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: '600' }}>{thread.originalPost.author_post_name}</span>
                                        <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                            {new Date(thread.originalPost.publish_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>
                                        {thread.originalPost.plain_content}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <Link href={`/twitter/posts/${thread.originalPost.tweet_id}`} style={{ color: 'inherit' }}>
                                            💬 {thread.originalPost.actual_reply_count || thread.originalPost.comment_count} replies
                                        </Link>
                                    </div>
                                </div>

                                {/* Replies */}
                                <div style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--border)' }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                                        Replies from @{otherUsername}:
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {thread.replies.map((reply) => (
                                            <div key={reply.id} style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                    <span style={{ fontWeight: '600' }}>{reply.author_post_name}</span>
                                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                        {new Date(reply.publish_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div style={{ whiteSpace: 'pre-wrap' }}>
                                                    {reply.plain_content}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section 2: Replies by Profile User to Other User */}
            {interactions.repliedTo.length > 0 && (
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Replies by @{profile.username} to @{otherUsername}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {interactions.repliedTo.map((reply) => (
                            <div key={reply.id} className="card" style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '600' }}>{reply.author_post_name}</span>
                                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                        {new Date(reply.publish_date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    Replying to @{reply.reply_comment_username}
                                </div>
                                <div style={{ whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>
                                    {reply.plain_content}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <Link href={`/twitter/posts/${reply.tweet_id}`} style={{ color: 'inherit' }}>
                                        View Tweet
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {interactions.repliedBy.length === 0 && interactions.repliedTo.length === 0 && (
                <div className="text-muted" style={{ textAlign: 'center', padding: '3rem' }}>
                    No interactions found between these users.
                </div>
            )}
        </div>
    )
}
