import { getChannelDetails } from '../actions'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ChannelDetailsPage({ params }) {
    const { id } = await params
    const channel = await getChannelDetails(id)

    if (!channel) {
        return (
            <div>
                <h1>Channel Not Found</h1>
                <Link href="/services/channel-suspicion">Back to Dashboard</Link>
            </div>
        )
    }

    const stats = channel.stats[0]
    if (!stats) {
        return (
            <div>
                <h1>No Analysis Data</h1>
                <p>This channel has not been analyzed yet.</p>
                <Link href="/services/channel-suspicion">Back to Dashboard</Link>
            </div>
        )
    }

    const { metrics, suspicion_score } = stats
    // Metrics structure: volume, authors, temporal, content

    let scoreColor = 'var(--text-muted)'
    if (suspicion_score < 30) scoreColor = 'var(--success)'
    else if (suspicion_score < 70) scoreColor = 'var(--warning)'
    else scoreColor = 'var(--error)'

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/services/channel-suspicion" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Dashboard
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {channel.name || 'Unnamed Channel'}
                    <span className="text-muted" style={{ fontSize: '1rem', marginLeft: '1rem', fontWeight: 'normal' }}>ID: {channel.id}</span>
                </h1>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', borderRadius: '8px', background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Suspicion Score</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: scoreColor }}>
                            {suspicion_score.toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
                        </div>
                    </div>
                    <div className="text-muted">
                        Analyzed on {new Date(stats.analyzed_at).toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="grid">
                {/* Volume & Dynamics */}
                <div className="card">
                    <h3>📊 Volume & Dynamics</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">Messages</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.volume.messageCount}</div>
                        </div>
                        <div>
                            <div className="text-muted">Messages / Day</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.volume.messagesPerDay.toFixed(1)}</div>
                        </div>
                        <div>
                            <div className="text-muted">Days Active</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.volume.daysActive.toFixed(0)}</div>
                        </div>
                    </div>
                </div>

                {/* Authors */}
                <div className="card">
                    <h3>👥 Author Structure</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">Unique Authors</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.authors.uniqueAuthors}</div>
                        </div>
                        <div>
                            <div className="text-muted">Gini Coefficient</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {metrics.authors.gini.toFixed(3)}
                                {metrics.authors.gini > 0.8 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ High</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Temporal Patterns */}
                <div className="card">
                    <h3>⏰ Temporal Patterns</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">Night Activity</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {(metrics.temporal.nightActivityRatio * 100).toFixed(1)}%
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Round Minutes (00/05...)</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>
                                {(metrics.temporal.roundMinutesRatio * 100).toFixed(1)}%
                                {metrics.temporal.roundMinutesRatio > 0.3 && <span style={{ color: 'var(--error)', fontSize: '0.8rem', marginLeft: '5px' }}>⚠ High</span>}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted">Mean Interval</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.temporal.meanInterval.toFixed(0)}s</div>
                        </div>
                        <div>
                            <div className="text-muted">Std Interval</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{metrics.temporal.stdInterval.toFixed(0)}s</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="card">
                    <h3>🔗 Content & Links</h3>
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <div className="text-muted">URL Ratio</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: ' bold' }}>{(metrics.content.urlRatio * 100).toFixed(1)}%</div>
                        </div>
                    </div>
                    {metrics.content.topDomains.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                            <div className="text-muted">Top Domains</div>
                            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                                {metrics.content.topDomains.map((d, i) => (
                                    <li key={i}>{d.domain} ({d.count})</li>
                                ))}
                            </ul>
                        </div>
                    )}
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
