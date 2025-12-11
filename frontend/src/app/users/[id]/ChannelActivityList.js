'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ChannelActivityList({ channels, userId }) {
    const [showAll, setShowAll] = useState(false)
    const displayedChannels = showAll ? channels : channels.slice(0, 12)

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {displayedChannels.map((channel) => (
                    <Link
                        href={`/users/${userId}?channelId=${channel.channelId}`}
                        key={channel.channelId || channel.channelName}
                        className="card"
                        style={{ padding: '1rem' }}
                    >
                        <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{channel.channelName}</div>
                        <div className="badge">{channel.count} comment{channel.count !== 1 ? 's' : ''}</div>
                    </Link>
                ))}
                {channels.length === 0 && <p>No channel activity found.</p>}
            </div>

            {channels.length > 12 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="btn"
                    style={{ marginBottom: '2rem' }}
                >
                    {showAll ? 'Show Less' : `Show More (${channels.length - 12} more)`}
                </button>
            )}
        </>
    )
}
