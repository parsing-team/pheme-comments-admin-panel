import Link from 'next/link'
import { getProfile, getProfileComments, getProfileActivity, getProfileCommentsFiltered } from '../../actions'
import { formatDateTime } from '@/lib/formatDate'
import ProfileActivityStats from './ProfileActivityStats'
import BotAnalysisSection from './BotAnalysisSection'

export default async function TwitterProfilePage({ params, searchParams }) {
    const { id } = await params
    const { page, hashtag, lang, isReply, replyTo } = await searchParams
    const currentPage = parseInt(page) || 1
    const limit = 100

    const profile = await getProfile(id)
    const activity = await getProfileActivity(id)

    // Check if any filters are active
    const hasFilters = hashtag || lang || isReply !== undefined || replyTo
    const filters = {}
    if (hashtag) filters.hashtag = hashtag
    if (lang) filters.lang = lang
    if (isReply !== undefined) filters.isReply = isReply === 'true'
    if (replyTo) filters.replyTo = replyTo

    // Get comments with or without filters
    const { comments, totalCount } = hasFilters
        ? await getProfileCommentsFiltered(id, currentPage, limit, filters)
        : await getProfileComments(id, currentPage, limit)

    const totalPages = Math.ceil(totalCount / limit)

    if (!profile) {
        return <div>Profile not found</div>
    }

    // Build pagination URL with filters
    const buildUrl = (pageNum) => {
        const params = new URLSearchParams()
        if (pageNum > 1) params.set('page', pageNum.toString())
        if (hashtag) params.set('hashtag', hashtag)
        if (lang) params.set('lang', lang)
        if (isReply !== undefined) params.set('isReply', isReply)
        if (replyTo) params.set('replyTo', replyTo)
        const query = params.toString()
        return `/twitter/profiles/${id}${query ? `?${query}` : ''}`
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Profiles
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {profile.name || 'Unknown'}
                    {profile.is_verified && <span style={{ marginLeft: '0.5rem', color: 'var(--primary)' }}>✓</span>}
                </h1>
                <p className="text-muted">
                    @{profile.username || 'unknown'} • Profile ID: {profile.profile_id?.toString()}
                </p>
                {profile.description_profile && (
                    <p style={{ marginTop: '1rem' }}>{profile.description_profile}</p>
                )}
                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span>{profile.followers_count?.toLocaleString() || 0} followers</span>
                    <span>{profile.following_count?.toLocaleString() || 0} following</span>
                    {profile.location && <span>📍 {profile.location}</span>}
                    {profile.account_based && <span>Account Based: {profile.account_based}</span>}
                    {profile.connected_via && <span>Connected Via: {profile.connected_via}</span>}
                </div>
                <p className="text-muted" style={{ marginTop: '0.5rem' }}>Total Comments: {totalCount}</p>
            </div>

            <ProfileActivityStats activity={activity} profileId={id} currentUsername={profile.username} />

            <BotAnalysisSection profileId={id} initialAnalysis={profile.bot_analysis_cache?.analysis_data} />

            {/* Active Filters */}
            {hasFilters && (
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600' }}>Active filters:</span>
                            {hashtag && <span className="badge">#{hashtag}</span>}
                            {lang && <span className="badge">Language: {lang.toUpperCase()}</span>}
                            {isReply === 'true' && <span className="badge">Replies only</span>}
                            {isReply === 'false' && <span className="badge">Original tweets only</span>}
                            {replyTo && <span className="badge">Replying to @{replyTo}</span>}
                        </div>
                        <Link
                            href={`/twitter/profiles/${id}`}
                            className="btn"
                            style={{ textDecoration: 'none' }}
                        >
                            Clear Filters
                        </Link>
                    </div>
                </div>
            )}

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Comment History (Page {currentPage} of {totalPages})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.map((comment) => (
                    <div key={comment.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="badge">Tweet ID: {comment.tweet_id?.toString()}</span>
                            <span className="timestamp">
                                {formatDateTime(comment.publish_date)}
                            </span>
                        </div>
                        <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
                            {comment.plain_content || 'No content'}
                        </p>
                        {comment.hashtags && comment.hashtags.length > 0 && (
                            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {comment.hashtags.map((tag, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/twitter/profiles/${id}?hashtag=${encodeURIComponent(tag)}`}
                                        className="badge"
                                        style={{ textDecoration: 'none', fontSize: '0.75rem' }}
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {comment.like_count !== null && <span>❤️ {comment.like_count}</span>}
                            {comment.retweet_count !== null && <span>🔁 {comment.retweet_count}</span>}
                            {comment.actual_reply_count !== null && comment.actual_reply_count > 0 && (
                                <Link
                                    href={`/twitter/posts/${comment.tweet_id}`}
                                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                >
                                    💬 {comment.actual_reply_count}
                                </Link>
                            )}
                            {comment.views_tweet !== null && <span>👁 {comment.views_tweet?.toString()}</span>}
                            {comment.lang && <span>🌐 {comment.lang.toUpperCase()}</span>}
                            {comment.reply_comment_username && (
                                <span>↩️ Reply to @{comment.reply_comment_username}</span>
                            )}
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p>No comments found{hasFilters ? ' with these filters' : ' for this profile'}.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                    {currentPage > 1 && (
                        <Link
                            href={buildUrl(currentPage - 1)}
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
                            href={buildUrl(currentPage + 1)}
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
