'use client'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

export default function ActivityHeatmap({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">No activity data available</p>
            </div>
        )
    }

    // Create a map for quick lookup
    const activityMap = new Map()
    data.forEach(item => {
        const key = `${item.dayOfWeek}-${item.hour}`
        activityMap.set(key, item.count)
    })

    // Find max value for color scaling
    const maxCount = Math.max(...data.map(item => item.count))

    const getColor = (count) => {
        if (!count) return 'var(--card-bg)'
        const intensity = count / maxCount
        // Use blue color scale
        const r = Math.round(52 + (255 - 52) * (1 - intensity))
        const g = Math.round(152 + (255 - 152) * (1 - intensity))
        const b = Math.round(219 + (255 - 219) * (1 - intensity))
        return `rgb(${r}, ${g}, ${b})`
    }

    return (
        <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                Activity Heatmap
            </h3>
            <div style={{ overflowX: 'auto' }}>
                <div style={{ minWidth: '600px' }}>
                    {/* Header row with hours */}
                    <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
                        <div style={{ width: '50px' }}></div>
                        {HOURS.map(hour => (
                            <div
                                key={hour}
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {hour}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap rows */}
                    {DAYS.map((day, dayIndex) => (
                        <div key={day} style={{ display: 'flex', marginBottom: '4px' }}>
                            <div
                                style={{
                                    width: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: 'var(--text-color)'
                                }}
                            >
                                {day}
                            </div>
                            {HOURS.map(hour => {
                                const count = activityMap.get(`${dayIndex}-${hour}`) || 0
                                return (
                                    <div
                                        key={`${dayIndex}-${hour}`}
                                        style={{
                                            flex: 1,
                                            height: '30px',
                                            backgroundColor: getColor(count),
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '2px',
                                            margin: '0 1px',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                            position: 'relative'
                                        }}
                                        title={`${day} ${hour}:00 - ${count.toLocaleString()} posts`}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.1)'
                                            e.currentTarget.style.zIndex = '10'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)'
                                            e.currentTarget.style.zIndex = '1'
                                        }}
                                    />
                                )
                            })}
                        </div>
                    ))}

                    {/* Legend */}
                    <div style={{
                        marginTop: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)'
                    }}>
                        <span>Less</span>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: getColor(maxCount * intensity),
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '2px'
                                    }}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
