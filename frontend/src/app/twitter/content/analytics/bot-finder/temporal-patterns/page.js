'use client'

import { useState } from 'react'
import Link from 'next/link'
import { analyzeTemporalPatterns, analyzeSingleAccount } from '@/app/twitter/actions'

export default function TemporalPatternsPage() {
    // Analysis state
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [results, setResults] = useState(null)
    const [progress, setProgress] = useState(0)

    // Single account analysis state
    const [singleAccountInput, setSingleAccountInput] = useState('')
    const [isSingleAnalyzing, setIsSingleAnalyzing] = useState(false)
    const [singleAccountResult, setSingleAccountResult] = useState(null)
    const [singleAccountError, setSingleAccountError] = useState(null)

    /**
     * Handles bulk analysis of all active accounts.
     * Simulates progress bar while waiting for server action.
     */
    const runAnalysis = async () => {
        setIsAnalyzing(true)
        setProgress(0)
        setResults(null) // Clear previous results

        // More realistic progress simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) {
                    clearInterval(progressInterval)
                    return 95
                }
                // Slower, more gradual progress
                return prev + 1
            })
        }, 1200) // Update every 1.2 seconds for more realistic feel

        try {
            const data = await analyzeTemporalPatterns()
            clearInterval(progressInterval)
            setProgress(100)
            setResults(data)
        } catch (error) {
            console.error('Analysis failed:', error)
            clearInterval(progressInterval)
        } finally {
            setIsAnalyzing(false)
        }
    }

    /**
     * Handles analysis of a single account by username or ID.
     * Validates input and manages loading/error states.
     */
    const runSingleAnalysis = async () => {
        if (!singleAccountInput.trim()) {
            setSingleAccountError('Please enter a username or ID')
            return
        }

        setIsSingleAnalyzing(true)
        setSingleAccountError(null)
        setSingleAccountResult(null)

        try {
            const data = await analyzeSingleAccount(singleAccountInput.trim())
            if (data.error) {
                setSingleAccountError(data.error)
            } else {
                setSingleAccountResult(data.account)
            }
        } catch (error) {
            console.error('Single account analysis failed:', error)
            setSingleAccountError('Analysis failed')
        } finally {
            setIsSingleAnalyzing(false)
        }
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter/content/analytics/bot-finder" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Bot Finder
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    ⏰ Temporal Patterns Analysis
                </h1>
                <p className="text-muted">
                    Detect automated behavior through activity timing and rhythm patterns
                </p>
            </div>

            {/* Start Button */}
            {!isAnalyzing && !results && (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Ready to Analyze Accounts
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                        This tool will analyze all active Twitter accounts for suspicious temporal patterns
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
            )}

            {/* Single Account Analysis */}
            {!isAnalyzing && !results && (
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Analyze Single Account
                    </h3>
                    <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        Enter a username or profile ID to check a specific account
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                value={singleAccountInput}
                                onChange={(e) => setSingleAccountInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && runSingleAnalysis()}
                                placeholder="@username or profile ID"
                                disabled={isSingleAnalyzing}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--card-bg)',
                                    color: 'var(--foreground)',
                                    fontSize: '1rem'
                                }}
                            />
                            {singleAccountError && (
                                <div style={{ color: '#ff4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                    {singleAccountError}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={runSingleAnalysis}
                            disabled={isSingleAnalyzing}
                            className="btn"
                            style={{
                                padding: '0.75rem 2rem',
                                fontSize: '1rem',
                                opacity: isSingleAnalyzing ? 0.6 : 1,
                                cursor: isSingleAnalyzing ? 'wait' : 'pointer'
                            }}
                        >
                            {isSingleAnalyzing ? 'Analyzing...' : 'Analyze'}
                        </button>
                    </div>
                </div>
            )}

            {/* Single Account Result */}
            {singleAccountResult && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Analysis Result
                    </h3>
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <Link
                                    href={`/twitter/profiles/${singleAccountResult.id}`}
                                    style={{ fontSize: '1.25rem', fontWeight: '600', textDecoration: 'none', color: 'inherit' }}
                                >
                                    {singleAccountResult.name || 'Unknown'}
                                </Link>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    @{singleAccountResult.username} • {singleAccountResult.comment_count} comments
                                </div>
                            </div>
                            <div style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: singleAccountResult.score >= 70 ? '#ff4444' : singleAccountResult.score >= 50 ? '#ff9944' : singleAccountResult.score >= 40 ? '#ffcc44' : '#44ff44',
                                color: 'white',
                                borderRadius: '0.5rem',
                                fontWeight: '600'
                            }}>
                                Score: {singleAccountResult.score}
                            </div>
                        </div>

                        {singleAccountResult.flags.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    Detected Patterns:
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {singleAccountResult.flags.map((flag, idx) => (
                                        <span
                                            key={idx}
                                            className="badge"
                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                                        >
                                            {flag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1rem',
                            padding: '1rem',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '0.5rem',
                            fontSize: '0.85rem'
                        }}>
                            <div>
                                <div className="text-muted">Mean Interval</div>
                                <div style={{ fontWeight: '600' }}>{singleAccountResult.metrics.meanInterval}s</div>
                            </div>
                            <div>
                                <div className="text-muted">STD Interval</div>
                                <div style={{ fontWeight: '600' }}>{singleAccountResult.metrics.stdInterval}s</div>
                            </div>
                            <div>
                                <div className="text-muted">Fixed Intervals</div>
                                <div style={{ fontWeight: '600' }}>{singleAccountResult.metrics.fixedIntervalRatio}%</div>
                            </div>
                            <div>
                                <div className="text-muted">Night Activity</div>
                                <div style={{ fontWeight: '600' }}>{singleAccountResult.metrics.nightRatio}%</div>
                            </div>
                            <div>
                                <div className="text-muted">Round Minutes</div>
                                <div style={{ fontWeight: '600' }}>{singleAccountResult.metrics.roundMinuteRatio}%</div>
                            </div>
                            <div>
                                <div className="text-muted">Posts/Day</div>
                                <div style={{ fontWeight: '600' }}>{singleAccountResult.metrics.postsPerDay}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            {isAnalyzing && (
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
                        Analyzing accounts...
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
                        Checking posting intervals, timing patterns, and activity rhythms...
                    </p>
                </div>
            )}

            {/* Results */}
            {results && (
                <div style={{ marginBottom: '2rem' }}>
                    <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Analysis Results
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>Accounts Analyzed</div>
                                <div style={{ fontSize: '2rem', fontWeight: '600' }}>{results.totalAnalyzed}</div>
                            </div>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>Suspicious Accounts</div>
                                <div style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--primary)' }}>{results.suspiciousCount}</div>
                            </div>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>Detection Rate</div>
                                <div style={{ fontSize: '2rem', fontWeight: '600' }}>
                                    {results.totalAnalyzed > 0 ? ((results.suspiciousCount / results.totalAnalyzed) * 100).toFixed(1) : 0}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suspicious Accounts List */}
                    {results.accounts.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                                Detected Suspicious Accounts
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {results.accounts.map((account) => (
                                    <div key={account.id} className="card" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                            <div style={{ flex: 1 }}>
                                                <Link
                                                    href={`/twitter/profiles/${account.id}`}
                                                    style={{ fontSize: '1.25rem', fontWeight: '600', textDecoration: 'none', color: 'inherit' }}
                                                >
                                                    {account.name || 'Unknown'}
                                                </Link>
                                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                    @{account.username} • {account.comment_count} comments
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: account.score >= 70 ? '#ff4444' : account.score >= 50 ? '#ff9944' : '#ffcc44',
                                                color: 'white',
                                                borderRadius: '0.5rem',
                                                fontWeight: '600'
                                            }}>
                                                Score: {account.score}
                                            </div>
                                        </div>

                                        {/* Flags */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                Detected Patterns:
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {account.flags.map((flag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="badge"
                                                        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                                                    >
                                                        {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                            gap: '1rem',
                                            padding: '1rem',
                                            backgroundColor: 'var(--bg-secondary)',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.85rem'
                                        }}>
                                            <div>
                                                <div className="text-muted">Mean Interval</div>
                                                <div style={{ fontWeight: '600' }}>{account.metrics.meanInterval}s</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">STD Interval</div>
                                                <div style={{ fontWeight: '600' }}>{account.metrics.stdInterval}s</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Fixed Intervals</div>
                                                <div style={{ fontWeight: '600' }}>{account.metrics.fixedIntervalRatio}%</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Night Activity</div>
                                                <div style={{ fontWeight: '600' }}>{account.metrics.nightRatio}%</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Round Minutes</div>
                                                <div style={{ fontWeight: '600' }}>{account.metrics.roundMinuteRatio}%</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Posts/Day</div>
                                                <div style={{ fontWeight: '600' }}>{account.metrics.postsPerDay}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.accounts.length === 0 && (
                        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Suspicious Accounts Found</h3>
                            <p className="text-muted">
                                All analyzed accounts appear to have normal temporal posting patterns.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Analysis Categories */}
            <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>

                {/* Activity Rhythm */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        1. Activity Rhythm Analysis
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Real users post irregularly throughout the day. Bots typically show:
                    </p>
                    <ul style={{ marginLeft: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Equal intervals:</strong> Consistent time gaps between posts (e.g., exactly every 30 minutes)
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Round-hour posting:</strong> Posts at :00, :15, :30, :45 minutes
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>No sleep pattern:</strong> 24/7 activity without typical night breaks
                        </li>
                    </ul>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Detection Criteria:
                        </h3>
                        <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li>STD(IPI) &lt; 0.2 × mean(IPI)</li>
                            <li>40% of intervals are fixed (±5 seconds)</li>
                            <li>&gt;100 tweets per day</li>
                            <li>Night activity &gt;30% of day activity</li>
                            <li>STD(hour-distribution) &lt; 0.1</li>
                            <li>40% posts at round minutes (00, 05, 10, 15...)</li>
                            <li>20% tweets in bursts (≥3 in 60 seconds)</li>
                        </ul>
                    </div>
                </div>

                {/* Event Reaction */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        2. Event Reaction Timing
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Bots often react to trending topics or news extremely quickly:
                    </p>
                    <ul style={{ marginLeft: '1.5rem', color: 'var(--text-muted)' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Instant reactions:</strong> Retweets/posts within 1-5 seconds of original
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Coordinated timing:</strong> Multiple accounts posting at identical timestamps
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <strong>Superhuman speed:</strong> Posting faster than humanly possible to read and respond
                        </li>
                    </ul>

                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Red flags:
                        </h3>
                        <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li>10 retweets in first 3 seconds after original</li>
                            <li>5 accounts publish identical content within 5 seconds</li>
                            <li>Stable reaction delay (5±1 sec repeated 20+ times)</li>
                            <li>50% retweets made ≤30 seconds after original</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
