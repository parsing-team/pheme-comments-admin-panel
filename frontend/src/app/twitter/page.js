import Link from 'next/link'
import { getProfiles } from './actions'

export default async function TwitterHomePage({ searchParams }) {
    const { page } = await searchParams
    const currentPage = parseInt(page) || 1
    const limit = 100
    const { profiles, totalCount } = await getProfiles(currentPage, limit)
    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                Twitter Profiles
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {profiles.map((profile) => (
                    <Link
                        href={`/twitter/profiles/${profile.id}`}
                        key={profile.id}
                        className="card"
                        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}
                    >
                        <div style={{ flex: 1, minWidth: 0, marginRight: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: '600', fontSize: '1.1rem', marginRight: '0.5rem' }}>
                                    {profile.name || 'Unknown'}
                                </span>
                                {profile.is_verified && <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>}
                                <span className="text-muted">
                                    @{profile.username || 'unknown'}
                                </span>
                            </div>

                            {profile.description_profile && (
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--text-muted)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {profile.description_profile}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                            <span>{profile.followers_count?.toLocaleString() || 0} followers</span>
                            <span className="badge">{profile._count?.comments || 0} comments</span>
                        </div>
                    </Link>
                ))}
                {profiles.length === 0 && (
                    <p>No profiles found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                    {currentPage > 1 && (
                        <Link
                            href={`/twitter?page=${currentPage - 1}`}
                            className="button"
                            style={{ textDecoration: 'none' }}
                        >
                            ← Previous
                        </Link>
                    )}
                    <span style={{ alignSelf: 'center' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <Link
                            href={`/twitter?page=${currentPage + 1}`}
                            className="button"
                            style={{ textDecoration: 'none' }}
                        >
                            Next →
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
