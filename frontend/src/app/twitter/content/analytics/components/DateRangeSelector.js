'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const RANGES = [
    { label: '7 Days', value: '7', days: 7 },
    { label: '30 Days', value: '30', days: 30 },
    { label: '90 Days', value: '90', days: 90 },
    { label: 'All Time', value: 'all', days: null }
]

export default function DateRangeSelector({ currentRange = '90' }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleRangeChange = (value) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('range', value)
        router.push(`?${params.toString()}`)
    }

    return (
        <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        }}>
            <span style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                marginRight: '0.5rem'
            }}>
                Time Range:
            </span>
            {RANGES.map(range => (
                <button
                    key={range.value}
                    onClick={() => handleRangeChange(range.value)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: currentRange === range.value
                            ? '2px solid var(--primary)'
                            : '1px solid var(--border-color)',
                        backgroundColor: currentRange === range.value
                            ? 'var(--primary)'
                            : 'var(--card-bg)',
                        color: currentRange === range.value
                            ? 'white'
                            : 'var(--text-color)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: currentRange === range.value ? '600' : '400',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (currentRange !== range.value) {
                            e.target.style.borderColor = 'var(--primary)'
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (currentRange !== range.value) {
                            e.target.style.borderColor = 'var(--border-color)'
                        }
                    }}
                >
                    {range.label}
                </button>
            ))}
        </div>
    )
}
