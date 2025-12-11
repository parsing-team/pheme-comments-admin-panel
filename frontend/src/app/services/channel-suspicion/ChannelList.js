'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { runAnalysis } from './actions'

export default function ChannelList({ initialChannels }) {
    const router = useRouter()
    const [channels, setChannels] = useState(initialChannels)
    const [analyzing, setAnalyzing] = useState(null)

    const handleAnalyze = async (channelId) => {
        setAnalyzing(channelId)
        try {
            const res = await runAnalysis(channelId)
            if (res.success) {
                router.refresh()
                // Update local state is tricky with simple refresh, but router.refresh should update the server prop if we were just receiving it. 
                // But we are in useState. 
                // Better to just let router.refresh trigger a re-render of the parent which updates the prop?
                // Actually, if we use prop key key={Math.random()}... no.
                // Simple hack: reload page or use useTransition.
                // For MVP: router.refresh() usually works if the parent passes new props.
                // But we initialized state. We should use `useEffect` to update state when prop changes, or just read from props directly?
                // Lets Read from props directly in render if possible, but we want optimistic UI.
                // Actually, let's just use router.refresh() and assume the parent Re-renders us with new props.
                // To support that, we need to sync state with props.
            } else {
                alert('Analysis failed: ' + res.error)
            }
        } catch (e) {
            alert('Error: ' + e.message)
        } finally {
            setAnalyzing(null)
        }
    }

    // Sort: Suspicious High -> Low, then Analyzed Recent -> Old
    const sortedChannels = [...initialChannels].sort((a, b) => {
        const scoreA = a.latestStats?.suspicion_score || -1
        const scoreB = b.latestStats?.suspicion_score || -1
        return scoreB - scoreA
    })

    return (
        <div className="card-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedChannels.map(channel => {
                const stats = channel.latestStats
                const score = stats?.suspicion_score
                const isAnalyzed = !!stats

                let scoreColor = 'var(--text-muted)'
                if (isAnalyzed) {
                    if (score < 30) scoreColor = 'var(--success)'
                    else if (score < 70) scoreColor = 'var(--warning)'
                    else scoreColor = 'var(--error)'
                }

                return (
                    <div key={channel.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>{channel.name || 'Unnamed Channel'}</h3>
                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                ID: {channel.id}
                                {isAnalyzed && (
                                    <span style={{ marginLeft: '1rem' }}>
                                        Analyzed: {new Date(stats.analyzed_at).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            {isAnalyzed ? (
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: scoreColor }}>
                                        {score?.toFixed(0)}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: scoreColor }}>Suspicion Score</div>
                                </div>
                            ) : (
                                <div className="text-muted">Not analyzed</div>
                            )}

                            <div>
                                {analyzing === channel.id ? (
                                    <span className="badge">Analyzing...</span>
                                ) : (
                                    <button
                                        className="btn btn-primary" // Assuming utility class or basic style exists, otherwise standard button
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--background)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleAnalyze(channel.id)}
                                    >
                                        {isAnalyzed ? 'Re-Analyze' : 'Analyze'}
                                    </button>
                                )}
                                {isAnalyzed && (
                                    <Link
                                        href={`/services/channel-suspicion/${channel.id}`}
                                        style={{ marginLeft: '1rem', textDecoration: 'none', color: 'var(--primary)' }}
                                    >
                                        Details →
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
