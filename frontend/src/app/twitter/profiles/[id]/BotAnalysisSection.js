'use client'

import { useState } from 'react'
import { analyzeProfileBot } from '../../actions'
import { formatDateTime } from '@/lib/formatDate'

export default function BotAnalysisSection({ profileId, initialAnalysis }) {
    // Safely parse initialAnalysis if it's a JSON string
    const parsedInitialAnalysis = typeof initialAnalysis === 'string'
        ? JSON.parse(initialAnalysis)
        : initialAnalysis

    const [analysis, setAnalysis] = useState(parsedInitialAnalysis)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [error, setError] = useState(null)

    const runAnalysis = async (forceRefresh = false) => {
        setIsAnalyzing(true)
        setError(null)
        try {
            const result = await analyzeProfileBot(profileId, forceRefresh)
            setAnalysis(result)
        } catch (err) {
            console.error('Bot analysis failed:', err)
            setError('Failed to analyze profile. Please try again.')
        } finally {
            setIsAnalyzing(false)
        }
    }

    if (!analysis && !isAnalyzing) {
        return (
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Bot Analysis
                </h2>
                <p className="text-muted" style={{ marginBottom: '1rem' }}>
                    This profile has not been analyzed yet.
                </p>
                <button
                    onClick={() => runAnalysis(false)}
                    className="btn"
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? 'Analyzing...' : '🤖 Run Bot Analysis'}
                </button>
            </div>
        )
    }

    if (!analysis) return null

    const getRiskColor = (riskLevel) => {
        switch (riskLevel) {
            case 'Critical': return '#ff4444'
            case 'High': return '#ffbb33'
            case 'Medium': return '#ff9933'
            case 'Low': return '#44ff44'
            default: return 'var(--text-muted)'
        }
    }

    const getRiskBgColor = (riskLevel) => {
        switch (riskLevel) {
            case 'Critical': return '#ff444420'
            case 'High': return '#ffbb3320'
            case 'Medium': return '#ff993320'
            case 'Low': return '#44ff4410'
            default: return 'var(--bg-secondary)'
        }
    }

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Bot Analysis
                    </h2>
                    {analysis.analyzedAt && (
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                            {analysis.cached ? '📋 Cached result from' : '✨ Analyzed on'} {formatDateTime(analysis.analyzedAt)}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => runAnalysis(true)}
                    className="btn"
                    disabled={isAnalyzing}
                    style={{ fontSize: '0.9rem' }}
                >
                    {isAnalyzing ? 'Analyzing...' : '🔄 Refresh Analysis'}
                </button>
            </div>

            {error && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#ff444420',
                    border: '1px solid #ff4444',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    color: '#ff4444'
                }}>
                    {error}
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {/* Bot Score */}
                <div style={{
                    padding: '1rem',
                    backgroundColor: getRiskBgColor(analysis.riskLevel),
                    borderRadius: '0.5rem',
                    border: `2px solid ${getRiskColor(analysis.riskLevel)}`
                }}>
                    <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Bot Score</div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: getRiskColor(analysis.riskLevel)
                    }}>
                        {analysis.score}/100
                    </div>
                </div>

                {/* Risk Level */}
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '0.5rem'
                }}>
                    <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Risk Level</div>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: getRiskColor(analysis.riskLevel)
                    }}>
                        {analysis.riskLevel}
                    </div>
                </div>

                {/* Tweet Count */}
                {analysis.details?.tweetCount !== undefined && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: '0.5rem'
                    }}>
                        <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Tweets Analyzed</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {analysis.details.tweetCount}
                        </div>
                    </div>
                )}
            </div>

            {/* Risk Factors */}
            {analysis.riskFactors && analysis.riskFactors.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                        Risk Factors ({analysis.riskFactors.length})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {analysis.riskFactors.map((factor, idx) => (
                            <span
                                key={idx}
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    backgroundColor: '#ff444420',
                                    border: '1px solid #ff444440',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.85rem',
                                    color: '#ff4444'
                                }}
                            >
                                ⚠️ {factor}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {analysis.riskFactors && analysis.riskFactors.length === 0 && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#44ff4410',
                    border: '1px solid #44ff4440',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    color: '#44ff44'
                }}>
                    ✓ No suspicious behavior detected
                </div>
            )}
        </div>
    )
}
