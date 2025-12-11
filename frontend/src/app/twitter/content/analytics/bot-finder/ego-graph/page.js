'use client'

import { useState } from 'react'
import Link from 'next/link'
import { analyzeEgoGraph } from '@/app/twitter/actions'

export default function EgoGraphPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        setIsAnalyzing(true)
        setError(null)
        setResult(null)

        try {
            const data = await analyzeEgoGraph(searchQuery)
            if (data.error) {
                setError(data.error)
            } else {
                setResult(data)
            }
        } catch (err) {
            setError('Failed to analyze ego graph')
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter/content/analytics/bot-finder" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Bot Finder
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    🕸️ Ego-Graph Analysis
                </h1>
                <p className="text-muted">
                    Analyze a specific user's personal network, identify their community, role, and key influencers.
                </p>
            </div>

            {/* Search Block */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter username (e.g. @elonmusk) or ID"
                        className="input"
                        style={{ flex: 1, maxWidth: '500px', fontSize: '1.1rem', padding: '0.75rem' }}
                    />
                    <button
                        type="submit"
                        className="btn"
                        disabled={isAnalyzing || !searchQuery.trim()}
                        style={{ fontSize: '1.1rem', padding: '0 2rem' }}
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Network'}
                    </button>
                </form>
                {error && (
                    <div style={{ color: '#ff4444', marginTop: '1rem', fontWeight: '500' }}>
                        Error: {error}
                    </div>
                )}
            </div>

            {/* Results */}
            {result && (
                <div>
                    {/* Header Info */}
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                {result.target.name}
                            </h2>
                            <Link href={`/twitter/profiles/${result.target.id}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '1.1rem' }}>
                                @{result.target.username}
                            </Link>
                            <div className="text-muted" style={{ marginTop: '0.5rem' }}>
                                Role: <span className="badge" style={{ marginLeft: '0.5rem' }}>{result.target.role}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                {result.stats.totalNodes}
                            </div>
                            <div className="text-muted">Nodes in Graph</div>
                            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                {result.stats.communityCount} Communities Detected
                            </div>
                        </div>
                    </div>

                    {/* Clusters */}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Detected Communities</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        {result.clusters.map((cluster, idx) => (
                            <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h4 style={{ fontWeight: 'bold', color: idx === 0 ? 'var(--primary)' : 'inherit' }}>
                                        Cluster #{idx + 1}
                                        {result.target.communityId === cluster.id && (
                                            <span className="badge" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>USER'S GROUP</span>
                                        )}
                                    </h4>
                                    <span className="text-muted">{cluster.members.length} members</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {cluster.members.slice(0, 10).map((member) => (
                                        <Link
                                            key={member.id}
                                            href={`/twitter/profiles/${member.id}`}
                                            className="badge"
                                            style={{
                                                textDecoration: 'none',
                                                backgroundColor: member.id === result.target.id ? 'var(--primary)' : 'var(--bg-secondary)',
                                                color: member.id === result.target.id ? 'white' : 'inherit',
                                                border: member.role === 'Influencer' ? '1px solid var(--primary)' : 'none'
                                            }}
                                            title={member.role}
                                        >
                                            @{member.username}
                                        </Link>
                                    ))}
                                    {cluster.members.length > 10 && (
                                        <span className="text-muted" style={{ fontSize: '0.8rem', alignSelf: 'center' }}>
                                            +{cluster.members.length - 10} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Lists */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Support Core */}
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                                Support Core (Top Supporters)
                            </h3>
                            <div className="card" style={{ padding: '0' }}>
                                {result.lists.supportCore.slice(0, 10).map((user, idx) => (
                                    <div key={idx} style={{
                                        padding: '1rem',
                                        borderBottom: '1px solid var(--border)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <Link href={`/twitter/profiles/${user.id}`} style={{ fontWeight: '600', textDecoration: 'none', color: 'inherit' }}>
                                                @{user.username}
                                            </Link>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                {user.role} • Cluster #{result.clusters.findIndex(c => c.id === user.communityId) + 1}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                                                {user.metrics.outWeight.toFixed(1)}
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Activity</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Influencers (in Graph) */}
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                                Key Influencers in Network
                            </h3>
                            <div className="card" style={{ padding: '0' }}>
                                {result.clusters.flatMap(c => c.members)
                                    .filter(m => m.role === 'Influencer' && m.id !== result.target.id)
                                    .sort((a, b) => b.metrics.inWeight - a.metrics.inWeight)
                                    .slice(0, 10)
                                    .map((user, idx) => (
                                        <div key={idx} style={{
                                            padding: '1rem',
                                            borderBottom: '1px solid var(--border)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <Link href={`/twitter/profiles/${user.id}`} style={{ fontWeight: '600', textDecoration: 'none', color: 'inherit' }}>
                                                    @{user.username}
                                                </Link>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    Cluster #{result.clusters.findIndex(c => c.id === user.communityId) + 1}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                                                    {user.metrics.inWeight.toFixed(1)}
                                                </div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Influence</div>
                                            </div>
                                        </div>
                                    ))}
                                {result.clusters.flatMap(c => c.members).filter(m => m.role === 'Influencer').length === 0 && (
                                    <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                        No clear influencers detected in this ego network.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
