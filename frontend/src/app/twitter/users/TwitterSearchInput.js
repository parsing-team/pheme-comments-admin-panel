'use client'

import { useState } from 'react'
import Link from 'next/link'
import { searchProfiles } from '../actions'

export default function TwitterSearchInput() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery)

        if (searchQuery.trim().length < 2) {
            setResults([])
            return
        }

        setIsSearching(true)
        const profiles = await searchProfiles(searchQuery)
        setResults(profiles)
        setIsSearching(false)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search by username or name..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    marginBottom: '2rem',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text)'
                }}
            />

            {isSearching && <p>Searching...</p>}

            {results.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {results.map((profile) => (
                        <Link
                            href={`/twitter/profiles/${profile.id}`}
                            key={profile.id}
                            className="card"
                            style={{ textDecoration: 'none' }}
                        >
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                                {profile.name || 'Unknown'}
                                {profile.is_verified && <span style={{ marginLeft: '0.5rem', color: 'var(--primary)' }}>✓</span>}
                            </div>
                            <div className="text-muted" style={{ marginBottom: '0.5rem' }}>
                                @{profile.username || 'unknown'}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                <span>{profile.followers_count?.toLocaleString() || 0} followers</span>
                                <span style={{ marginLeft: '1rem' }} className="badge">
                                    {profile._count?.comments || 0} comments
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {query.trim().length >= 2 && !isSearching && results.length === 0 && (
                <p>No profiles found.</p>
            )}
        </div>
    )
}
