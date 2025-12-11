import { getUserDetails } from '../actions'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function UserDetailsPage({ params }) {
    const { id } = await params
    const user = await getUserDetails(id)

    if (!user) {
        return (
            <div>
                <h1>User Not Found</h1>
                <Link href="/services/user-tracking">Back to Dashboard</Link>
            </div>
        )
    }

    const displayName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || `User ${user.id}`
    const stats = user.stats[0]

    if (!stats) {
        return (
            <div>
                <h1>{displayName}</h1>
                <p>No analysis data available.</p>
                <Link href="/services/user-tracking">Back to Dashboard</Link>
            </div>
        )
    }

    const { metrics, suspicion_score } = stats
    // Metrics: volume, temporal, content

    let scoreColor = 'var(--text-muted)'
    if (suspicion_score < 30) scoreColor = 'var(--success)'
    else if (suspicion_score < 70) scoreColor = 'var(--warning)'
    else scoreColor = 'var(--error)'

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/services/user-tracking" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Dashboard
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {displayName}
                    <span className="text-muted" style={{ fontSize: '1rem', marginLeft: '1rem', fontWeight: 'normal' }}>ID: {user.id}</span>
                </h1>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '8px', background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Suspicion Score</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: scoreColor }}>
                            {suspicion_score.toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                {/* Volume & Social */}
                <div className="card">
                    <h3>📊 Activity & Reach</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">Total Posts</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.volume.messageCount}</div>
                        </div>
                        <div>
                            <div className="text-muted">Avg / Day</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {metrics.volume.messagesPerDay.toFixed(1)}
                                {metrics.volume.messagesPerDay > 100 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ High</span>}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Unique Channels</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {metrics.volume.activeChannelsCount}
                                {metrics.volume.activeChannelsCount > 20 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ High</span>}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Days Active</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.volume.daysActive.toFixed(0)}</div>
                        </div>
                    </div>
                </div>

                {/* Temporal */}
                <div className="card">
                    <h3>⏰ Temporal Patterns</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">Night Ratio (00-05)</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {(metrics.temporal.nightActivityRatio * 100).toFixed(1)}%
                                {metrics.temporal.nightActivityRatio > 0.4 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ High</span>}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Round Minutes Ratio</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {(metrics.temporal.roundMinutesRatio * 100).toFixed(1)}%
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Fixed Interval Ratio</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {(metrics.temporal.fixedIntervalRatio * 100).toFixed(1)}%
                                {metrics.temporal.fixedIntervalRatio > 0.3 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ Robot</span>}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Mean Interval</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.temporal.meanInterval.toFixed(0)}s</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="card">
                    <h3>📝 Content Analysis</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">URL Ratio</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {(metrics.content.urlRatio * 100).toFixed(1)}%
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Text Diversity (TTR)</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {metrics.content.ttr.toFixed(2)}
                                {metrics.content.ttr < 0.3 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ Low</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '1.5rem' }}>
                <h3>Raw Metrics JSON</h3>
                <pre style={{ background: 'var(--background)', padding: '1rem', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
                    {JSON.stringify(metrics, null, 2)}
                </pre>
            </div>
        </div>
    )
}
