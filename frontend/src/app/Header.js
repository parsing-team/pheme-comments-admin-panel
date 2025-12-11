'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()
    const isTwitter = pathname.startsWith('/twitter')

    // Determine title
    let title = 'TG Comments'
    if (isTwitter) {
        title = 'Twitter (X) Comments'
    }

    return (
        <header className="header">
            <div className="container header-content">
                <h1 className="header-title">
                    {title}
                </h1>
            </div>
            <div className="container">
                <nav className="nav-links">
                    {!isTwitter ? (
                        <>
                            <Link href="/channels" className="nav-link">
                                <span className="nav-icon">📺</span>
                                Channels
                            </Link>
                            <Link href="/top-users" className="nav-link">
                                <span className="nav-icon">⭐</span>
                                Top Users
                            </Link>
                            <Link href="/users" className="nav-link">
                                <span className="nav-icon">🔍</span>
                                Search Users
                            </Link>
                            <Link href="/services" className="nav-link">
                                <span className="nav-icon">🤖</span>
                                Services
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/twitter" className="nav-link">
                                <span className="nav-icon">👤</span>
                                Profiles
                            </Link>
                            <Link href="/twitter/top-posts" className="nav-link">
                                <span className="nav-icon">🔥</span>
                                Top Posts
                            </Link>
                            <Link href="/twitter/users" className="nav-link">
                                <span className="nav-icon">🔍</span>
                                Search Users
                            </Link>
                            <Link href="/twitter/content/analytics/bot-finder" className="nav-link">
                                <span className="nav-icon">🤖</span>
                                Services
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
