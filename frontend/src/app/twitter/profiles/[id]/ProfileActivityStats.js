'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProfileActivityStats({ activity, profileId, currentUsername }) {
    const [showAllReplies, setShowAllReplies] = useState(false)
    const [showAllSources, setShowAllSources] = useState(false)

    const displayedReplies = showAllReplies ? activity.replyTargets : activity.replyTargets.slice(0, 10)
    const displayedSources = showAllSources ? activity.replySources : activity.replySources.slice(0, 10)

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Activity Statistics</h2>

            {/* Reply Targets */}
            {activity.replyTargets.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem' }}>Most Replied To</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        {displayedReplies.map((item) => (
                            <Link
                                key={item.reply_comment_username}
                                href={`/twitter/interactions/${profileId}/${item.reply_comment_username}`}
                                className="card"
                                style={{ padding: '0.75rem', textDecoration: 'none', color: 'inherit', cursor: 'pointer', display: 'block' }}
                            >
                                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>@{item.reply_comment_username}</div>
                                <div className="badge">{item.count} replies</div>
                            </Link>
                        ))}
                    </div>
                    {activity.replyTargets.length > 10 && (
                        <button
                            onClick={() => setShowAllReplies(!showAllReplies)}
                            className="btn"
                        >
                            {showAllReplies ? 'Show Less' : `Show More (${activity.replyTargets.length - 10} more)`}
                        </button>
                    )}
                </div>
            )}

            {/* Reply Sources */}
            {activity.replySources?.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.75rem' }}>Most Replied From</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                        {displayedSources.map((item) => (
                            <Link
                                key={item.author_post_username}
                                href={`/twitter/interactions/${profileId}/${item.author_post_username}`}
                                className="card"
                                style={{ padding: '0.75rem', textDecoration: 'none', color: 'inherit', cursor: 'pointer', display: 'block' }}
                            >
                                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                                    {item.author_post_name || 'Unknown'}
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                    @{item.author_post_username || 'unknown'}
                                </div>
                                <div className="badge">{item.count} replies</div>
                            </Link>
                        ))}
                    </div>
                    {activity.replySources.length > 10 && (
                        <button
                            onClick={() => setShowAllSources(!showAllSources)}
                            className="btn"
                        >
                            {showAllSources ? 'Show Less' : `Show More (${activity.replySources.length - 10} more)`}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
