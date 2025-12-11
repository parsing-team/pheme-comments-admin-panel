'use client'

import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useState, memo } from 'react'

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']

function TopProfiles({ data, metric = 'likes' }) {
    const [sortBy, setSortBy] = useState(metric)

    if (!data || data.length === 0) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">No profile data available</p>
            </div>
        )
    }

    const sortedData = [...data].sort((a, b) => {
        return (b.stats[sortBy] || 0) - (a.stats[sortBy] || 0)
    }).slice(0, 10)

    const chartData = sortedData.map(profile => ({
        name: profile.username || profile.name || 'Unknown',
        value: profile.stats[sortBy] || 0,
        id: profile.id,
        fullName: profile.name,
        isVerified: profile.isVerified
    }))

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toString()
    }

    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                    Top Profiles
                </h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--card-bg)',
                        color: 'var(--text-color)',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                    }}
                >
                    <option value="likes">By Likes</option>
                    <option value="retweets">By Retweets</option>
                    <option value="replies">By Replies</option>
                    <option value="views">By Views</option>
                    <option value="comments">By Comments</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        type="number"
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                        tickFormatter={formatNumber}
                    />
                    <YAxis
                        type="category"
                        dataKey="name"
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                        width={110}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            fontSize: '0.875rem'
                        }}
                        formatter={(value) => formatNumber(value)}
                    />
                    <Bar dataKey="value">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Profile list */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sortedData.slice(0, 5).map((profile, index) => (
                    <Link
                        key={profile.id}
                        href={`/twitter/profiles/${profile.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className="card"
                            style={{
                                padding: '0.75rem 1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{
                                    fontWeight: '600',
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)',
                                    minWidth: '20px'
                                }}>
                                    #{index + 1}
                                </span>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                                            {profile.name || 'Unknown'}
                                        </span>
                                        {profile.isVerified && (
                                            <span style={{ color: 'var(--primary)' }}>✓</span>
                                        )}
                                    </div>
                                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                                        @{profile.username || 'unknown'}
                                    </span>
                                </div>
                            </div>
                            <span className="badge">
                                {formatNumber(profile.stats[sortBy])} {sortBy}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default memo(TopProfiles)
