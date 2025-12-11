'use client'

import { useState } from 'react'
import Link from 'next/link'
import { startCommunityDetection, getAnalysisStatus } from '@/app/twitter/actions'

export default function CommunityDetectionPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [statusMessage, setStatusMessage] = useState('')
    const [results, setResults] = useState(null)

    /**
     * Triggers the community detection process asynchronously.
     * Polls the server for real progress updates.
     */
    const runAnalysis = async () => {
        setIsAnalyzing(true)
        setProgress(0)
        setStatusMessage('Initializing analysis...')
        setResults(null)

        try {
            // Start the job
            const { jobId } = await startCommunityDetection()

            // Poll for updates
            const pollInterval = setInterval(async () => {
                const status = await getAnalysisStatus(jobId)

                if (status.error) {
                    clearInterval(pollInterval)
                    console.error('Analysis error:', status.error)
                    setIsAnalyzing(false)
                    return
                }

                setProgress(status.progress)
                setStatusMessage(status.message)

                if (status.status === 'completed') {
                    clearInterval(pollInterval)
                    setResults(status.result)
                    setIsAnalyzing(false)
                } else if (status.status === 'failed') {
                    clearInterval(pollInterval)
                    console.error('Analysis failed:', status.error)
                    setIsAnalyzing(false)
                }
            }, 1000) // Check every second

        } catch (error) {
            console.error('Failed to start analysis:', error)
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
                    🕸️ Community Detection
                </h1>
                <p className="text-muted">
                    Identify coordinated bot networks through graph analysis and community clustering algorithms
                </p>
            </div>

            {/* Start Button */}
            {!isAnalyzing && !results && (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem' }}>
                        Ready to Detect Networks
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                        This tool will build interaction graphs and identify coordinated bot communities
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
                        🕸️ Start Network Analysis
                    </button>
                </div>
            )}

            {/* Progress Bar */}
            {isAnalyzing && (
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
                        Building interaction graphs and detecting communities...
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
                        {statusMessage || 'Initializing...'}
                    </p>
                </div>
            )}

            {/* Results */}
            {results && !results.error && (
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
                                <div style={{ fontSize: '2rem', fontWeight: '600' }}>{results.totalCommunities}</div>
                            </div>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>Suspicious Networks</div>
                                <div style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--primary)' }}>{results.suspiciousCommunities}</div>
                            </div>
                        </div>

                        {results.graphStats && (
                            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '0.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Graph Statistics</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', fontSize: '0.9rem' }}>
                                    <div>
                                        <span className="text-muted">Retweet edges:</span> <strong>{results.graphStats.retweetEdges}</strong>
                                    </div>
                                    <div>
                                        <span className="text-muted">Sync edges:</span> <strong>{results.graphStats.syncEdges}</strong>
                                    </div>
                                    <div>
                                        <span className="text-muted">Hashtag edges:</span> <strong>{results.graphStats.hashtagEdges}</strong>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Detected Communities */}
                    {results.communities && results.communities.length > 0 && (
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                                Detected Suspicious Networks
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {results.communities.map((community, idx) => (
                                    <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                                    Network #{idx + 1}
                                                </h4>
                                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                    {community.size} members
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: community.score >= 70 ? '#ff4444' : community.score >= 50 ? '#ff9944' : '#ffcc44',
                                                color: 'white',
                                                borderRadius: '0.5rem',
                                                fontWeight: '600'
                                            }}>
                                                Score: {community.score}
                                            </div>
                                        </div>

                                        {/* Flags */}
                                        {community.flags.length > 0 && (
                                            <div style={{ marginBottom: '1rem' }}>
                                                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                    Coordination Indicators:
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    {community.flags.map((flag, flagIdx) => (
                                                        <span
                                                            key={flagIdx}
                                                            className="badge"
                                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                                                        >
                                                            {flag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Network Metrics */}
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
                                                <div className="text-muted">Edge Density</div>
                                                <div style={{ fontWeight: '600' }}>{community.metrics.density}%</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Reciprocity</div>
                                                <div style={{ fontWeight: '600' }}>{community.metrics.reciprocity}%</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Clustering Coef.</div>
                                                <div style={{ fontWeight: '600' }}>{community.metrics.clusteringCoefficient}</div>
                                            </div>
                                            <div>
                                                <div className="text-muted">Avg Edge Weight</div>
                                                <div style={{ fontWeight: '600' }}>{community.metrics.avgWeight}</div>
                                            </div>
                                        </div>

                                        {/* Members List */}
                                        <div>
                                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                Network Members ({community.members.length}):
                                            </div>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                                gap: '0.5rem',
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                padding: '0.5rem',
                                                backgroundColor: 'var(--bg-secondary)',
                                                borderRadius: '0.5rem'
                                            }}>
                                                {community.members.map((member) => (
                                                    <Link
                                                        key={member.id}
                                                        href={`/twitter/profiles/${member.id}`}
                                                        style={{
                                                            padding: '0.5rem',
                                                            backgroundColor: 'var(--card-bg)',
                                                            borderRadius: '0.25rem',
                                                            textDecoration: 'none',
                                                            color: 'inherit',
                                                            fontSize: '0.85rem',
                                                            display: 'flex',
                                                            flexDirection: 'column'
                                                        }}
                                                    >
                                                        <div style={{ fontWeight: '600' }}>{member.name || 'Unknown'}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                            @{member.username}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.communities && results.communities.length === 0 && (
                        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Suspicious Networks Found</h3>
                            <p className="text-muted">
                                No coordinated bot communities detected in the analyzed data.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Coming Soon Notice - Only show when not analyzing and no results */}
            {!isAnalyzing && !results && (
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        🚧 Under Development
                    </h2>
                    <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                        Graph analysis algorithms are currently being implemented
                    </p>
                </div>
            )}

            {/* Methodology Overview */}
            <div style={{ display: 'grid', gap: '2rem' }}>

                {/* Graph Types */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        1. Graph Construction Methods
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Multiple graph types will be constructed to capture different aspects of coordination:
                    </p>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                📊 Retweet Network Graph
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                Node = account, Edge = A retweeted B, Weight = retweet count
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                                Best for detecting propaganda networks
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                ⚡ Synchronized Posting Graph
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                Edge created if accounts post identical/similar content within ≤5 seconds
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                                One of the strongest indicators of coordination
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                📝 Content Similarity Graph
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                Using BERT embeddings, connect accounts with cosine similarity &gt; 0.85
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                                Detects accounts sharing similar messaging
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                🏷️ Hashtag/URL Overlap Graph
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                Connect accounts using identical hashtags or URLs, Weight = overlap count
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                                Useful for detecting information amplification networks
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                🔗 Combined Multigraph
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Weighted combination: w₁×retweets + w₂×content_sim + w₃×sync + w₄×tags
                            </p>
                        </div>
                    </div>
                </div>

                {/* Algorithms */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        2. Community Detection Algorithms
                    </h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                🔵 Louvain Algorithm
                            </h3>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <li>Fast and scalable (100k+ nodes)</li>
                                <li>Good for finding large blocks</li>
                                <li>Widely used baseline</li>
                            </ul>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                🟢 Leiden Algorithm
                            </h3>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <li>Improved version of Louvain</li>
                                <li>More stable communities</li>
                                <li>Better for uneven graphs</li>
                                <li><strong>Recommended for general overview</strong></li>
                            </ul>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                🟡 Infomap Algorithm
                            </h3>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <li>Based on information flow</li>
                                <li>Excellent for small groups (3-10 accounts)</li>
                                <li><strong>Best for detecting coordinated cells</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Detection Metrics */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        3. Network Coordination Metrics
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Key metrics for identifying coordinated bot networks:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Edge Density
                            </h4>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                &gt;0.2 = likely bot network<br />
                                0.1 = dense community<br />
                                0.05 = normal
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Reciprocity
                            </h4>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                &gt;50% = bot cycles<br />
                                30% = coordination<br />
                                &lt;10% = normal
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Clustering Coefficient
                            </h4>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                0.3-0.7 = bot network<br />
                                0.05-0.15 = normal users
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Modularity (Q-score)
                            </h4>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                &gt;0.7 = likely network<br />
                                &gt;0.6 = suspicious<br />
                                &gt;0.4 = strong community
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Synchronization Index
                            </h4>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                &gt;0.30 = bot farm<br />
                                &gt;0.20 = content amplification<br />
                                &gt;0.10 = coordinated group
                            </p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Hashtag/URL Jaccard
                            </h4>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                &gt;0.5 = shared content plan<br />
                                Common in coordinated campaigns
                            </p>
                        </div>
                    </div>
                </div>

                {/* GNN Approach */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        4. Graph Neural Networks (GNN)
                    </h2>
                    <p className="text-muted" style={{ marginBottom: '1rem' }}>
                        Advanced machine learning approach for network detection:
                    </p>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Node Features
                            </h3>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <li><strong>Behavioral:</strong> Temporal patterns, posting frequency, night activity</li>
                                <li><strong>Textual:</strong> BERT embeddings, unique words, hashtag/link ratios</li>
                                <li><strong>Graph:</strong> Degree, clustering coefficient, centrality measures</li>
                            </ul>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                GNN Architectures
                            </h3>
                            <ul style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <li><strong>GraphSAGE:</strong> Best for large graphs</li>
                                <li><strong>GAT (Graph Attention):</strong> Highlights important connections</li>
                                <li><strong>GCN:</strong> Classic, simple and effective</li>
                            </ul>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Detection Process
                            </h3>
                            <ol style={{ marginLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <li>GNN learns node embeddings (128-1024 dimensions)</li>
                                <li>Coordinated accounts cluster in embedding space</li>
                                <li>Apply k-means or HDBSCAN clustering</li>
                                <li>Validate with compactness and similarity metrics</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Detection Pipeline */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                        5. Complete Detection Pipeline
                    </h2>

                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                        <ol style={{ marginLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
                            <li><strong>Build graphs:</strong> Retweets + Time-sync + Text similarity + Hashtag/URL overlap</li>
                            <li><strong>Apply algorithms:</strong> Leiden for overview, Infomap for small cells</li>
                            <li><strong>Calculate metrics:</strong> Density, reciprocity, clustering coefficient, sync index, hashtag overlap</li>
                            <li><strong>Run GNN:</strong> Generate node embeddings considering structure + features</li>
                            <li><strong>Cluster embeddings:</strong> Confirm or refute network hypothesis</li>
                            <li><strong>Identify leaders:</strong> Find central nodes (high degree centrality)</li>
                            <li><strong>Report findings:</strong> Network visualization, metrics, member list</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
