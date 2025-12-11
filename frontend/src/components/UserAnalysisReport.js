'use client'

import React from 'react'

export default function UserAnalysisReport({ stats }) {
    if (!stats) return null

    const { metrics, suspicion_score } = stats

    let scoreColor = 'var(--text-muted)'
    if (suspicion_score < 30) scoreColor = 'var(--success)'
    else if (suspicion_score < 70) scoreColor = 'var(--warning)'
    else scoreColor = 'var(--error)'

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Suspicion Analysis
                <span style={{
                    fontSize: '1rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    background: 'var(--card-bg)',
                    border: `1px solid ${scoreColor}`,
                    color: scoreColor,
                    fontWeight: 'bold'
                }}>
                    Score: {suspicion_score.toFixed(1)} / 100
                </span>
            </h2>

            <div className="grid">
                {/* Volume & Social */}
                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Activity & Reach</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>⏰ Temporal Patterns</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                    </div>
                </div>

                {/* Content */}
                <div className="card">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📝 Content Analysis</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

            <div style={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                textAlign: 'right'
            }}>
                Analyzed: {new Date(stats.analyzed_at).toLocaleDateString('en-GB')} {new Date(stats.analyzed_at).toLocaleTimeString('en-GB')}
            </div>
        </div>
    )
}
