'use client'

import Link from 'next/link'

export default function ServicesPage() {
    const tools = [
        {
            id: 'channel-analysis',
            title: 'Channel Analysis',
            description: 'Analyze channel growth, engagement, and audience demographics',
            icon: '📊',
            features: [
                'Growth trends',
                'Engagement metrics',
                'Audience insights',
                'Content performance'
            ],
            href: '/services/channel-suspicion'
        },
        {
            id: 'user-tracking',
            title: 'User Tracking',
            description: 'Track user activity across multiple channels and identify key influencers',
            icon: '👣',
            features: [
                'Cross-channel activity',
                'Behavior analysis',
                'Influencer identification',
                'Activity heatmaps'
            ],
            href: '/services/user-tracking'
        },
        // More tools will be added here
    ]

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Services</h1>
                <p className="text-muted">Tools for analyzing Telegram comments and user behavior</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {tools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={tool.href}
                        className="card"
                        style={{
                            padding: '1.5rem',
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = ''
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {tool.icon}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {tool.title}
                        </h3>
                        <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {tool.description}
                        </p>
                        <div style={{ marginTop: 'auto' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <strong>Features:</strong>
                            </div>
                            <ul style={{ margin: '0.5rem 0 0 0', padding: '0 0 0 1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {tool.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
