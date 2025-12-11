'use client'

import { memo } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = {
    likes: '#e74c3c',
    retweets: '#3498db',
    replies: '#2ecc71',
    views: '#9b59b6',
    comments: '#f39c12'
}

function EngagementTimeline({ data, metric = 'all' }) {
    if (!data || data.length === 0) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">No engagement data available</p>
            </div>
        )
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return null
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return null
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toString()
    }

    // Filter out items with invalid dates
    const chartData = data
        .map(item => ({
            date: formatDate(item.period),
            rawDate: item.period,
            likes: item.likes || 0,
            retweets: item.retweets || 0,
            replies: item.replies || 0,
            views: item.views || 0,
            comments: item.comments || 0
        }))
        .filter(item => item.date !== null)

    // If no valid data after filtering, show message
    if (chartData.length === 0) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">No engagement data available for the selected period</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Try adjusting the date range or check if there are comments in the database
                </p>
            </div>
        )
    }

    const renderMetric = (metricName) => {
        if (metric !== 'all' && metric !== metricName) return null

        return (
            <Line
                key={metricName}
                type="monotone"
                dataKey={metricName}
                stroke={COLORS[metricName]}
                strokeWidth={2}
                dot={false}
                name={metricName.charAt(0).toUpperCase() + metricName.slice(1)}
            />
        )
    }

    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                Engagement Timeline
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        dataKey="date"
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                    />
                    <YAxis
                        stroke="var(--text-muted)"
                        tickFormatter={formatNumber}
                        style={{ fontSize: '0.75rem' }}
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
                    <Legend
                        wrapperStyle={{ fontSize: '0.875rem' }}
                    />
                    {renderMetric('likes')}
                    {renderMetric('retweets')}
                    {renderMetric('replies')}
                    {renderMetric('comments')}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(EngagementTimeline)
