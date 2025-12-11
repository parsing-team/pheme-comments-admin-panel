'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e67e22', '#34495e', '#95a5a6', '#16a085'
]

const LANGUAGE_NAMES = {
    'en': 'English',
    'ru': 'Russian',
    'uk': 'Ukrainian',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'pl': 'Polish',
    'ar': 'Arabic',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'hi': 'Hindi',
    'tr': 'Turkish'
}

export default function LanguageDistribution({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">No language data available</p>
            </div>
        )
    }

    const total = data.reduce((sum, item) => sum + item.count, 0)

    const chartData = data.map(item => ({
        name: LANGUAGE_NAMES[item.lang] || item.lang?.toUpperCase() || 'Unknown',
        value: item.count,
        percentage: ((item.count / total) * 100).toFixed(1)
    }))

    const renderLabel = (entry) => {
        return `${entry.percentage}%`
    }

    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                Language Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            fontSize: '0.875rem'
                        }}
                        formatter={(value, name, props) => [
                            `${value.toLocaleString()} (${props.payload.percentage}%)`,
                            name
                        ]}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{ fontSize: '0.875rem' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
