'use client'

import Link from 'next/link'

export default function BotFinderPage() {
    const tools = [
        {
            id: 'temporal-patterns',
            title: 'Temporal Patterns',
            description: 'Analyze activity rhythm and timing patterns to detect automated behavior',
            icon: '⏰',
            features: [
                'Activity rhythm analysis',
                'Round-hour posting detection',
                'Night activity monitoring',
                'Event reaction timing'
            ],
            href: '/twitter/content/analytics/bot-finder/temporal-patterns'
        },
        {
            id: 'community-detection',
            title: 'Community Detection',
            description: 'Identify coordinated bot networks through graph analysis and clustering',
            icon: '🕸️',
            features: [
                'Retweet network graphs',
                'Synchronized posting detection',
                'Content similarity analysis',
                'Hashtag/URL overlap detection'
            ],
            href: '/twitter/content/analytics/bot-finder/community-detection'
        },
        {
            id: 'fanbase-clustering',
            title: 'Fanbase Clustering',
            description: 'Identify organic support communities and fan groups through multi-graph analysis',
            icon: '🧩',
            features: [
                'Multi-graph analysis (4 layers)',
                'Leader identification',
                'Support Score calculation',
                'Organic vs Bot detection'
            ],
            href: '/twitter/content/analytics/bot-finder/fanbase-clustering'
        },
        {
            id: 'ego-graph',
            title: 'Ego-Graph Analysis',
            description: 'Analyze a user\'s personal network, community role, and key influencers',
            icon: '🕸️',
            features: [
                'Personal network mapping',
                'Community detection (LPA)',
                'Role identification',
                'Support/Opposition analysis'
            ],
            href: '/twitter/content/analytics/bot-finder/ego-graph'
        },
        // More tools will be added here
    ]

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/twitter" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Dashboard
                </Link>

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
