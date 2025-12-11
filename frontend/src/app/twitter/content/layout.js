'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TwitterContentLayout({ children }) {
    const pathname = usePathname()
    const isAnalytics = pathname.startsWith('/twitter/content/analytics')

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    📊 Twitter (X) Analytics
                </h1>
            </div>

            {/* Page Content */}
            {children}
        </div>
    )
}
