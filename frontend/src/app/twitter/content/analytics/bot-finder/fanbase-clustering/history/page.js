import Link from 'next/link'
import { getFanbaseRuns } from '@/app/twitter/actions'
import { formatDateTime } from '@/lib/formatDate'

// Force dynamic rendering - this page requires database access
export const dynamic = 'force-dynamic';

export default async function FanbaseClusteringHistoryPage() {
    const runs = await getFanbaseRuns(50)

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter/content/analytics/bot-finder/fanbase-clustering" className="btn" style={{ marginRight: '1rem' }}>
                    ← Back to Clustering
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                    Fanbase Clustering History
                </h1>
                <p className="text-muted">
                    View and compare past clustering runs
                </p>
            </div>

            {runs.length === 0 ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p className="text-muted">No clustering runs found. Run an analysis first.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {runs.map(run => (
                        <Link
                            key={run.id}
                            href={`/twitter/content/analytics/bot-finder/fanbase-clustering/runs/${run.id}`}
                            className="card"
                            style={{
                                padding: '1.5rem',
                                display: 'block',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                            Run #{run.id}
                                        </h3>
                                        {run.is_current && (
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                backgroundColor: '#44ff4420',
                                                color: '#44ff44',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                CURRENT
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        {formatDateTime(run.created_at)}
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Communities</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                {run._count.communities}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Members</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                {run._count.memberships.toLocaleString()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Profiles</div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                {run.node_count?.toLocaleString() || 'N/A'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Method</div>
                                            <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                                                {run.method || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginLeft: '1rem' }}>
                                    <span className="btn" style={{ fontSize: '0.9rem' }}>
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
