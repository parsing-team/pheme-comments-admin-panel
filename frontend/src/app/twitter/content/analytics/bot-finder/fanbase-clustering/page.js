'use client'

import { useState } from 'react'
import Link from 'next/link'
import { startFanbaseClustering, getAnalysisStatus, analyzeCommunityBots } from '@/app/twitter/actions'

export default function FanbaseClusteringPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analyzingBots, setAnalyzingBots] = useState(null) // Community index being analyzed
    const [botResults, setBotResults] = useState({}) // Map of communityIdx -> Analysis Results
    const [progress, setProgress] = useState(0)
    const [statusMessage, setStatusMessage] = useState('')
    const [results, setResults] = useState(null)
    const [error, setError] = useState(null)

    // Clustering configuration
    const [resolution, setResolution] = useState(1.8)
    const [edgeThreshold, setEdgeThreshold] = useState(3)
    const [hubStrategy, setHubStrategy] = useState('dampen')



    const runAnalysis = async () => {
        setIsAnalyzing(true)
        setProgress(0)
        setStatusMessage('Starting analysis...')
        setResults(null)
        setError(null)

        try {
            const { jobId } = await startFanbaseClustering({
                resolution,
                edgeThreshold,
                hubStrategy
            })

            const pollInterval = setInterval(async () => {
                const status = await getAnalysisStatus(jobId)

                setProgress(status.progress || 0)
                setStatusMessage(status.message || 'Processing...')

                if (status.status === 'completed') {
                    clearInterval(pollInterval)
                    setResults(status.result)
                    setIsAnalyzing(false)
                } else if (status.status === 'failed') {
                    clearInterval(pollInterval)
                    setError(status.error || 'Analysis failed')
                    setIsAnalyzing(false)
                }
            }, 1000)
        } catch (error) {
            console.error('Error starting analysis:', error)
            setError(error.message)
            setIsAnalyzing(false)
        }
    }

    const handleCheckMembers = async (community, index) => {
        if (!community.members || community.members.length === 0) return

        setAnalyzingBots(index)
        try {
            // Get leader if exists for interaction check
            const leader = community.leaders && community.leaders.length > 0 ? community.leaders[0].username : null
            const memberIds = community.members.map(m => m.id)

            const analysis = await analyzeCommunityBots(memberIds, leader)
            setBotResults(prev => ({
                ...prev,
                [index]: analysis
            }))
        } catch (error) {
            console.error('Bot check failed:', error)
            alert('Failed to analyze members')
        } finally {
            setAnalyzingBots(null)
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter/content/analytics/bot-finder" className="btn" style={{ marginRight: '1rem' }}>
                    ← Back to Bot Finder
                </Link>
                <Link href="/twitter/content/analytics/bot-finder/fanbase-clustering/history" className="btn">
                    📊 View History
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                    Fanbase Clustering
                </h1>
                <p className="text-muted">
                    Identify organic support communities and fan groups through multi-graph analysis
                </p>
            </div>

            {/* Configuration Panel */}
            {!isAnalyzing && !results && (
                <>
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                            ⚙️ Clustering Configuration
                        </h2>

                        {/* Resolution Slider */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Resolution: {resolution.toFixed(1)}
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                                    (higher = more communities)
                                </span>
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="3.0"
                                step="0.1"
                                value={resolution}
                                onChange={(e) => setResolution(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                <span>0.5 (fewer, larger)</span>
                                <span>3.0 (more, smaller)</span>
                            </div>
                        </div>

                        {/* Edge Threshold Slider */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Edge Weight Threshold: {edgeThreshold}
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                                    (minimum retweets)
                                </span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={edgeThreshold}
                                onChange={(e) => setEdgeThreshold(parseInt(e.target.value))}
                                style={{ width: '100%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                <span>1 (include all)</span>
                                <span>10 (core only)</span>
                            </div>
                        </div>

                        {/* Hub Strategy Dropdown */}
                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Hub Strategy
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                                    (for mega-accounts)
                                </span>
                            </label>
                            <select
                                value={hubStrategy}
                                onChange={(e) => setHubStrategy(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text)'
                                }}
                            >
                                <option value="none">None - Include all accounts equally</option>
                                <option value="dampen">Dampen - Reduce hub influence (recommended)</option>
                                <option value="remove">Remove - Exclude hubs from clustering</option>
                            </select>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Ready to Discover Communities
                        </h2>
                        <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                            This tool will analyze active accounts to identify organic support communities and fan groups
                        </p>
                        <button
                            onClick={runAnalysis}
                            className="btn"
                            style={{
                                fontSize: '1.25rem',
                                padding: '1rem 3rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            🔍 Start Analysis
                        </button>
                    </div>
                </>
            )}





            {/* Progress Bar */}
            {
                isAnalyzing && (
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
                            {statusMessage}
                        </h3>
                        <div style={{
                            width: '100%',
                            height: '30px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                backgroundColor: 'var(--primary)',
                                transition: 'width 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '600'
                            }}>
                                {progress}%
                            </div>
                        </div>
                        <p className="text-muted" style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                            Building multi-layer graphs and detecting communities...
                        </p>
                    </div>
                )
            }

            {/* Error */}
            {
                error && (
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: '#ff444420', border: '1px solid #ff4444' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ff4444' }}>
                            Analysis Failed
                        </h3>
                        <p style={{ color: '#ff4444' }}>{error}</p>
                    </div>
                )
            }

            {/* Results */}
            {
                results && (
                    <div style={{ marginBottom: '2rem' }}>
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                                Analysis Results
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>Profiles Analyzed</div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600' }}>{results.totalProfiles}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>Communities Found</div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--primary)' }}>{results.totalCommunities}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>Organic Communities</div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600', color: '#44ff44' }}>{results.organicCommunities}</div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>Support Edges</div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600', color: '#44ff44' }}>
                                        {results.graphStats.supportEdges}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>Opposition Edges</div>
                                    <div style={{ fontSize: '2rem', fontWeight: '600', color: '#ff4444' }}>
                                        {results.graphStats.oppositionEdges}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Communities List */}
                        {results.communities.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                                    Detected Communities
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {results.communities.map((community, idx) => (
                                        <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                                <div style={{ flex: 1 }}>
                                                    <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                        Community #{idx + 1}
                                                    </h4>
                                                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                        {community.size} members • {community.leaders.length} leaders
                                                    </div>
                                                </div>
                                                <div style={{
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: community.isOrganic ? '#44ff44' : '#ff4444',
                                                    color: 'white',
                                                    borderRadius: '0.5rem',
                                                    fontWeight: '600',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {community.isOrganic ? '✓ Organic' : '⚠ Suspicious'} ({community.organicityScore}%)
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleCheckMembers(community, idx)}
                                                disabled={analyzingBots === idx}
                                                style={{
                                                    marginBottom: '1rem',
                                                    padding: '0.5rem 1rem',
                                                    fontSize: '0.9rem',
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: '0.5rem',
                                                    cursor: analyzingBots === idx ? 'wait' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    width: 'fit-content',
                                                    color: 'inherit'
                                                }}
                                            >
                                                <span>🤖</span>
                                                <span>{analyzingBots === idx ? 'Running Check...' : 'Check Members (Bot Detection)'}</span>
                                            </button>



                                            {/* Metrics */}
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                                gap: '1rem',
                                                padding: '1rem',
                                                backgroundColor: 'var(--bg-secondary)',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.85rem',
                                                marginBottom: '1rem'
                                            }}>
                                                <div>
                                                    <div className="text-muted">Density</div>
                                                    <div style={{ fontWeight: '600' }}>{community.metrics.density}%</div>
                                                </div>
                                                <div>
                                                    <div className="text-muted">Reciprocity</div>
                                                    <div style={{ fontWeight: '600' }}>{community.metrics.reciprocity}%</div>
                                                </div>
                                                <div>
                                                    <div className="text-muted">Clustering</div>
                                                    <div style={{ fontWeight: '600' }}>{community.metrics.clusteringCoefficient}</div>
                                                </div>
                                                <div>
                                                    <div className="text-muted">Avg Weight</div>
                                                    <div style={{ fontWeight: '600' }}>{community.metrics.avgEdgeWeight}</div>
                                                </div>
                                            </div>

                                            {/* Leaders */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    Leaders (by LeadershipScore):
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {community.leaders.map((leader, lidx) => (
                                                        <div
                                                            key={lidx}
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                padding: '0.75rem',
                                                                backgroundColor: 'var(--bg-secondary)',
                                                                borderRadius: '0.5rem',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            <Link
                                                                href={`/twitter/profile/${leader.id}`}
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: 'inherit',
                                                                    fontWeight: '600'
                                                                }}
                                                            >
                                                                @{leader.username || `user_${leader.id}`}
                                                            </Link>
                                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                                                                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>
                                                                    Leadership: {(leader.leadershipScore * 100).toFixed(0)}
                                                                </span>
                                                                <span className="text-muted">Local: {leader.supportIn}</span>
                                                                <span className="text-muted">Global: {leader.globalSupport}</span>
                                                                <span className="text-muted">Reach: {leader.uniqueSupporters}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Core Supporters */}
                                            {community.coreSupporters && community.coreSupporters.length > 0 && (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                        Core Supporters (High Local Activity):
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem',
                                                        maxHeight: '300px',
                                                        overflowY: 'auto',
                                                        paddingRight: '0.5rem'
                                                    }}>
                                                        {community.coreSupporters.map((supporter, sidx) => (
                                                            <div
                                                                key={sidx}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    padding: '0.75rem',
                                                                    backgroundColor: 'var(--bg-secondary)',
                                                                    borderRadius: '0.5rem',
                                                                    fontSize: '0.9rem',
                                                                    borderLeft: '3px solid var(--primary)'
                                                                }}
                                                            >
                                                                <Link
                                                                    href={`/twitter/profiles/${supporter.id}`}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                        fontWeight: '600'
                                                                    }}
                                                                >
                                                                    @{supporter.username || `user_${supporter.id}`}
                                                                </Link>
                                                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                                                                    <span className="text-muted">Local: {supporter.supportIn}</span>
                                                                    <span className="text-muted">Share: {supporter.shareInCluster}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Opponents */}
                                            {community.opponents && community.opponents.length > 0 && (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                        Key Opponents (High Opposition, Low Support):
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                        {community.opponents.map((opponent, oidx) => (
                                                            <div
                                                                key={oidx}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    padding: '0.75rem',
                                                                    backgroundColor: '#ff444420',
                                                                    borderRadius: '0.5rem',
                                                                    fontSize: '0.9rem',
                                                                    border: '1px solid #ff444440'
                                                                }}
                                                            >
                                                                <Link
                                                                    href={`/twitter/profiles/${opponent.id}`}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                        fontWeight: '600'
                                                                    }}
                                                                >
                                                                    @{opponent.username || `user_${opponent.id}`}
                                                                </Link>
                                                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                                                                    <span style={{ color: '#ff4444' }}>Opposition: {opponent.oppositionIn}</span>
                                                                    <span className="text-muted">Support: {opponent.supportIn}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Top Hashtags */}
                                            {community.topHashtags && community.topHashtags.length > 0 && (
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                        Top Hashtags:
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        {community.topHashtags.slice(0, 10).map((tag, tidx) => (
                                                            <span
                                                                key={tidx}
                                                                className="badge"
                                                                style={{ backgroundColor: 'var(--bg-secondary)' }}
                                                            >
                                                                #{tag.tag} ({tag.count})
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Bot Analysis Results */}
                                            {botResults[idx] && (
                                                <div style={{
                                                    marginBottom: '1rem',
                                                    padding: '1rem',
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    borderRadius: '0.5rem',
                                                    border: '1px solid var(--border)'
                                                }}>
                                                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Bot Analysis Results</h4>
                                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                                                        <div>Critical: <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>{botResults[idx].filter(r => r.riskLevel === 'Critical').length}</span></div>
                                                        <div>High: <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>{botResults[idx].filter(r => r.riskLevel === 'High').length}</span></div>
                                                        <div>Medium: <span>{botResults[idx].filter(r => r.riskLevel === 'Medium').length}</span></div>
                                                        <div>Low: <span style={{ opacity: 0.7 }}>{botResults[idx].filter(r => r.riskLevel === 'Low').length}</span></div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Community Members */}
                                            {community.members && community.members.length > 0 && (
                                                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                                    <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                        Community Members ({community.members.length}):
                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem',
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        paddingRight: '0.5rem'
                                                    }}>
                                                        {community.members.map((member, midx) => {
                                                            const botResult = botResults[idx]?.find(r => r.profileId == member.id)

                                                            return (
                                                                <div
                                                                    key={midx}
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                        padding: '0.5rem',
                                                                        backgroundColor: botResult?.score > 50 ? '#ff444410' : member.isLeader ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--bg-secondary)',
                                                                        borderRadius: '0.25rem',
                                                                        fontSize: '0.85rem',
                                                                        borderLeft: botResult?.score > 50 ? '3px solid #ff4444' : member.isLeader ? '3px solid var(--primary)' : 'none'
                                                                    }}
                                                                >
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                            <Link
                                                                                href={`/twitter/profiles/${member.id}`}
                                                                                style={{
                                                                                    textDecoration: 'none',
                                                                                    color: 'inherit',
                                                                                    fontWeight: member.isLeader ? '600' : '400'
                                                                                }}
                                                                            >
                                                                                @{member.username || `user_${member.id}`}
                                                                            </Link>
                                                                            {member.isLeader && (
                                                                                <span className="badge" style={{ fontSize: '0.7rem', padding: '0.1rem 0.3rem' }}>Leader</span>
                                                                            )}
                                                                            {botResult && (
                                                                                <span style={{
                                                                                    fontSize: '0.7rem',
                                                                                    padding: '0.1rem 0.3rem',
                                                                                    borderRadius: '4px',
                                                                                    backgroundColor: botResult.riskLevel === 'Critical' ? '#ff4444' : botResult.riskLevel === 'High' ? '#ffbb33' : '#44ff44',
                                                                                    color: botResult.riskLevel === 'Low' ? '#000' : '#fff',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                                    Score: {botResult.score}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {botResult && botResult.riskFactors.length > 0 && (
                                                                            <div style={{ fontSize: '0.7rem', color: 'var(--error)', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                                                                {botResult.riskFactors.map((factor, fidx) => (
                                                                                    <span key={fidx} style={{
                                                                                        backgroundColor: '#ff444410',
                                                                                        padding: '0 4px',
                                                                                        borderRadius: '2px',
                                                                                        border: '1px solid #ff444430'
                                                                                    }}>
                                                                                        {factor}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                                                        <span>Support: {member.supportScore}</span>
                                                                        <span>Local: {member.supportIn}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.communities.length === 0 && (
                            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Communities Found</h3>
                                <p className="text-muted">
                                    No significant communities were detected in the analyzed profiles.
                                </p>
                            </div>
                        )}
                    </div>
                )
            }

            {/* Analysis Categories */}
            <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
                {/* Support vs Opposition */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        1. Support vs Opposition Detection
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Separates support from opposition to correctly identify leaders:
                    </p>
                    <ul style={{ marginLeft: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#44ff44' }}>Support Graph:</strong> Retweets only (indicates agreement/support)
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong style={{ color: '#ff4444' }}>Opposition Graph:</strong> Replies (often critical/opposing)
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Hashtag Co-Usage:</strong> Thematic alignment (for Support Score)
                        </li>
                    </ul>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Organic Community Ranges:
                        </h3>
                        <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li>Density: 10-40%</li>
                            <li>Reciprocity: 10-30%</li>
                            <li>Clustering: 0.2-0.6</li>
                            <li>Avg Edge Weight: 10-150</li>
                        </ul>
                    </div>
                </div>

                {/* Support Score */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        2. Support Score Calculation
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Measures how strongly a user supports community leaders:
                    </p>
                    <ul style={{ marginLeft: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Engagement to Leader (40%):</strong> Retweets, quotes, replies to leaders
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Hashtag Similarity (20%):</strong> Shared hashtag usage with leaders
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Reciprocity (20%):</strong> Mutual interactions within community
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Cluster Cohesion (20%):</strong> Connection density in user's network
                        </li>
                    </ul>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            LeadershipScore Formula:
                        </h3>
                        <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li>30% Local Support (retweets from cluster members)</li>
                            <li>40% Global Support (total retweets from all profiles)</li>
                            <li>20% Structural Centrality (unique supporters / reach)</li>
                            <li>10% Cluster Specificity (share of activity from cluster)</li>
                        </ul>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            This ensures global leaders like @pevchikh are identified, not just local activists.
                        </div>
                    </div>
                </div>

                {/* Organic vs Bot Detection */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        3. Organic vs Bot Detection
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Distinguishes genuine communities from coordinated bot networks:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: '#44ff4420', borderRadius: '0.5rem', border: '1px solid #44ff44' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#44ff44' }}>
                                ✓ Organic Communities
                            </h4>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <li>Clear leaders exist</li>
                                <li>Natural interaction patterns</li>
                                <li>Diverse posting times</li>
                                <li>Moderate edge weights (10-150)</li>
                                <li>Similar but not identical hashtags</li>
                            </ul>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: '#ff444420', borderRadius: '0.5rem', border: '1px solid #ff4444' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ff4444' }}>
                                ⚠ Bot Networks
                            </h4>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <li>No clear leader</li>
                                <li>Synchronized posting (0-5s)</li>
                                <li>24/7 activity</li>
                                <li>Very high edge weights (&gt;200)</li>
                                <li>Identical content/hashtags</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
