'use client'

import { memo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useState } from 'react'

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e']

function TopHashtags({ data, onHashtagClick }) {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    if (!data || data.length === 0) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">No hashtag data available</p>
            </div>
        )
    }

    const chartData = data.map(item => ({
        hashtag: item.hashtag.startsWith('#') ? item.hashtag : `#${item.hashtag}`,
        count: item.count
    }))

    const handleClick = (data) => {
        if (onHashtagClick && data) {
            onHashtagClick(data.hashtag)
        }
    }

    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                Top Hashtags
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ left: 100 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        type="number"
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="hashtag"
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                        width={90}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            fontSize: '0.875rem'
                        }}
                        cursor={{ fill: 'rgba(52, 152, 219, 0.1)' }}
                    />
                    <Bar
                        dataKey="count"
                        onClick={handleClick}
                        onMouseEnter={(_, index) => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{ cursor: onHashtagClick ? 'pointer' : 'default' }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(TopHashtags)
