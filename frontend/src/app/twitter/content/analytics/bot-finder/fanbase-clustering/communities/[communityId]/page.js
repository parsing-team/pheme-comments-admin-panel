'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCommunityMembers, getCommunityBotStats, getRunCommunities } from '@/app/twitter/actions'

export default function CommunityDetailsPage({ params }) {
    const [communityId, setCommunityId] = useState(null)
    const [community, setCommunity] = useState(null)
    const [members, setMembers] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        role: '',
        bot_score_min: '',
        bot_score_max: '',
        is_suspicious: ''
    })

    useEffect(() => {
        params.then(p => setCommunityId(p.communityId))
    }, [params])

    useEffect(() => {
        if (!communityId) return

        async function loadData() {
            setLoading(true)
            try {
                const [membersData, statsData] = await Promise.all([
                    getCommunityMembers(communityId, {
                        role: filters.role || undefined,
                        bot_score_min: filters.bot_score_min ? parseInt(filters.bot_score_min) : undefined,
                        bot_score_max: filters.bot_score_max ? parseInt(filters.bot_score_max) : undefined,
                        is_suspicious: filters.is_suspicious === 'true' ? true : filters.is_suspicious === 'false' ? false : undefined
                    }),
                    getCommunityBotStats(communityId)
                ])

                setMembers(membersData)
                setStats(statsData)

                // Get community info from first member
                if (membersData.length > 0) {
                    const allCommunities = await getRunCommunities(membersData[0].run_id)
                    const comm = allCommunities.find(c => c.id === parseInt(communityId))
                    setCommunity(comm)
                }
            } catch (error) {
                console.error('Error loading community data:', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [communityId, filters])

    const getRiskColor = (riskLevel) => {
        switch (riskLevel) {
            case 'Critical': return '#ff4444'
            case 'High': return '#ffbb33'
            case 'Medium': return '#ff9933'
            case 'Low': return '#44ff44'
            default: return 'var(--text-muted)'
        }
    }

    if (loading || !communityId) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                {community && (
                    <Link href={`/twitter/content/analytics/bot-finder/fanbase-clustering/runs/${community.run_id}`} className="btn" style={{ marginRight: '1rem' }}>
                        ← Back to Run
                    </Link>
                )}
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>
                    {community?.label || `Community #${communityId}`}
                </h1>
                {community?.leader_username && (
                    <p className="text-muted">Leader: @{community.leader_username}</p>
                )}
            </div>

            {/* Bot Stats */}
            {stats && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Bot Analysis</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div className="card" style={{ padding: '1rem' }}>
                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Total Members</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.total}</div>
                        </div>
                        <div className="card" style={{ padding: '1rem' }}>
                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>Suspicious</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4444' }}>{stats.suspicious}</div>
                        </div>
                        {Object.entries(stats.byRiskLevel).map(([level, count]) => (
                            <div key={level} className="card" style={{ padding: '1rem' }}>
                                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{level}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getRiskColor(level) }}>{count}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Filters</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Role</label>
                        <select
                            value={filters.role}
                            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }}
                        >
                            <option value="">All</option>
                            <option value="leader">Leader</option>
                            <option value="core_supporter">Core Supporter</option>
                            <option value="member">Member</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Min Bot Score</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={filters.bot_score_min}
                            onChange={(e) => setFilters({ ...filters, bot_score_min: e.target.value })}
                            placeholder="0"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Max Bot Score</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={filters.bot_score_max}
                            onChange={(e) => setFilters({ ...filters, bot_score_max: e.target.value })}
                            placeholder="100"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Suspicious Only</label>
                        <select
                            value={filters.is_suspicious}
                            onChange={(e) => setFilters({ ...filters, is_suspicious: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)' }}
                        >
                            <option value="">All</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Members Table */}
            <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Members ({members.length})
                </h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border)' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Username</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Role</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Bot Score</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Risk Level</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Leadership</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Support</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={`${member.profile_id}`} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '0.75rem' }}>
                                        <Link href={`/twitter/profiles/${member.profile_id}`} style={{ color: 'var(--link-color)' }}>
                                            @{member.profile.username || 'N/A'}
                                        </Link>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>{member.profile.name || 'N/A'}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: member.role === 'leader' ? '#44ff4420' : member.role === 'core_supporter' ? '#ffbb3320' : 'var(--bg-secondary)',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.85rem'
                                        }}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>
                                        {member.bot_score !== null ? member.bot_score : 'N/A'}
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        {member.bot_risk_level && (
                                            <span style={{ color: getRiskColor(member.bot_risk_level), fontWeight: '600' }}>
                                                {member.bot_risk_level}
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                        {member.leadership_score !== null ? member.leadership_score.toFixed(3) : '-'}
                                    </td>
                                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                        {member.support_score !== null ? member.support_score.toFixed(3) : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
