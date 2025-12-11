'use client'

export default function Loading() {
    return (
        <div>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .skeleton {
                    animation: pulse 1.5s ease-in-out infinite;
                }
            `}</style>

            <div className="skeleton" style={{
                height: '2rem',
                width: '300px',
                backgroundColor: 'var(--border-color)',
                borderRadius: '8px',
                marginBottom: '2rem'
            }} />

            {/* Stats Cards Skeleton */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="card" style={{ padding: '1.5rem' }}>
                        <div className="skeleton" style={{
                            height: '1rem',
                            width: '60%',
                            backgroundColor: 'var(--border-color)',
                            borderRadius: '4px',
                            marginBottom: '0.5rem'
                        }} />
                        <div className="skeleton" style={{
                            height: '2rem',
                            width: '80%',
                            backgroundColor: 'var(--border-color)',
                            borderRadius: '4px',
                            marginBottom: '0.25rem'
                        }} />
                        <div className="skeleton" style={{
                            height: '0.75rem',
                            width: '40%',
                            backgroundColor: 'var(--border-color)',
                            borderRadius: '4px'
                        }} />
                    </div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div className="skeleton" style={{
                    height: '1.5rem',
                    width: '200px',
                    backgroundColor: 'var(--border-color)',
                    borderRadius: '4px',
                    marginBottom: '1.5rem'
                }} />
                <div className="skeleton" style={{
                    height: '300px',
                    backgroundColor: 'var(--bg-color)',
                    borderRadius: '8px'
                }} />
            </div>

            {/* Two Column Skeleton */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="card" style={{ padding: '1.5rem' }}>
                        <div className="skeleton" style={{
                            height: '1.5rem',
                            width: '150px',
                            backgroundColor: 'var(--border-color)',
                            borderRadius: '4px',
                            marginBottom: '1.5rem'
                        }} />
                        <div className="skeleton" style={{
                            height: '300px',
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px'
                        }} />
                    </div>
                ))}
            </div>
        </div>
    )
}
