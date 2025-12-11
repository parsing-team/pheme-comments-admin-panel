'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { runUserAnalysis } from './actions'

export default function UserList({ initialUsers }) {
    const router = useRouter()
    const [analyzing, setAnalyzing] = useState(null)

    const handleAnalyze = async (userId) => {
        setAnalyzing(userId)
        try {
            const res = await runUserAnalysis(userId)
            if (res.success) {
                router.refresh()
            } else {
                alert('Analysis failed: ' + res.error)
            }
        } catch (e) {
            alert('Error: ' + e.message)
        } finally {
            setAnalyzing(null)
        }
    }

    const sortedUsers = [...initialUsers].sort((a, b) => {
        const scoreA = a.latestStats?.suspicion_score || -1
        const scoreB = b.latestStats?.suspicion_score || -1
        return scoreB - scoreA
    })

    return (
        <div className="card-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedUsers.map(user => {
                const stats = user.latestStats
                const score = stats?.suspicion_score
                const isAnalyzed = !!stats

                let scoreColor = 'var(--text-muted)'
                if (isAnalyzed) {
                    if (score < 30) scoreColor = 'var(--success)'
                    else if (score < 70) scoreColor = 'var(--warning)'
                    else scoreColor = 'var(--error)'
                }

                return (
                    <div key={user.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>
                                {user.name}
                                {user.username && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>@{user.username}</span>}
                            </h3>
                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                ID: {user.id}
                                {isAnalyzed && (
                                    <span style={{ marginLeft: '1rem' }}>
                                        Analyzed: {new Date(stats.analyzed_at).toLocaleDateString('en-GB')}
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
                                {analyzing === user.id ? (
                                    <span className="badge">Analyzing...</span>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--background)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleAnalyze(user.id)}
                                    >
                                        {isAnalyzed ? 'Re-Analyze' : 'Analyze'}
                                    </button>
                                )}
                                {isAnalyzed && (
                                    <Link
                                        href={`/services/user-tracking/${user.id}`}
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
