import Link from 'next/link'
import { getRunCommunities, getFanbaseRuns } from '@/app/twitter/actions'
import { formatDateTime } from '@/lib/formatDate'

export default async function RunDetailsPage({ params }) {
    const { runId } = await params
    const communities = await getRunCommunities(runId)

    // Get run info
    const runs = await getFanbaseRuns(100)
    const run = runs.find(r => r.id === parseInt(runId))

    if (!run) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Run not found</h1>
                <Link href="/twitter/content/analytics/bot-finder/fanbase-clustering/history" className="btn">
                    ← Back to History
                </Link>
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter/content/analytics/bot-finder/fanbase-clustering/history" className="btn" style={{ marginRight: '1rem' }}>
                    ← Back to History
                </Link>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        Run #{run.id}
                    </h1>
                    {run.is_current && (
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#44ff4420',
                            color: '#44ff44',
                            borderRadius: '0.25rem',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            CURRENT
                        </span>
                    )}
                </div>
                <p className="text-muted">{formatDateTime(run.created_at)}</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Communities</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{communities.length}</div>
                </div>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Members</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{run._count.memberships.toLocaleString()}</div>
                </div>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Profiles Analyzed</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{run.node_count?.toLocaleString() || 'N/A'}</div>
                </div>
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Method</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>{run.method || 'N/A'}</div>
                </div>
            </div>

            {/* Communities List */}
            <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Communities ({communities.length})
                </h2>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {communities.map((community, index) => (
                        <Link
                            key={community.id}
                            href={`/twitter/content/analytics/bot-finder/fanbase-clustering/communities/${community.id}`}
                            className="card"
                            style={{
                                padding: '1.5rem',
                                display: 'block',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        {community.label || `Community #${index + 1}`}
                                    </h3>
                                    {community.leader_username && (
                                        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            Leader: @{community.leader_username}
                                        </p>
                                    )}

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Members</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                                {community.member_count}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Leaders</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                                {community.leader_count || 0}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Density</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                                {community.density ? (community.density * 100).toFixed(1) + '%' : 'N/A'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Reciprocity</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                                {community.reciprocity ? (community.reciprocity * 100).toFixed(0) + '%' : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginLeft: '1rem' }}>
                                    <span className="btn" style={{ fontSize: '0.9rem' }}>
                                        View Members →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
