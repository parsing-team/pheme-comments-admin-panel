'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Sidebar.css'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isTwitter = pathname.startsWith('/twitter')

    const toggleSidebar = () => setIsOpen(!isOpen)
    const closeSidebar = () => setIsOpen(false)

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Platforms</h2>
                </div>

                <nav className="sidebar-nav">
                    {/* Platform Switcher */}
                    <div className="nav-section">
                        <Link
                            href="/channels"
                            className={`nav-item ${!isTwitter ? 'active' : ''}`}
                        >
                            <span className="nav-icon">💬</span>
                            TG Comments
                        </Link>
                        <Link
                            href="/twitter"
                            className={`nav-item ${pathname === '/twitter' || (pathname.startsWith('/twitter/') && !pathname.startsWith('/twitter/content')) ? 'active' : ''}`}
                        >
                            <span className="nav-icon">🐦</span>
                            Twitter (X) Comments
                        </Link>
                    </div>
                </nav>

                {/* Settings at bottom */}
                <div className="sidebar-footer">
                    <Link
                        href="/settings"
                        className="nav-item"
                    >
                        <span className="nav-icon">⚙️</span>
                        Settings
                    </Link>
                </div>
            </aside>
        </>
    )
}
