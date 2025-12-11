import Link from 'next/link'
import { getTopUsers } from './actions'

export default async function TopUsersPage() {
    const users = await getTopUsers()

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Top 50 Users by Comments</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {users.map((user, index) => (
                    <Link href={`/users/${user.id}`} key={user.id} className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: 'var(--text-muted)',
                                    minWidth: '3rem'
                                }}>
                                    #{index + 1}
                                </span>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                                        Telegram ID: {user.telegram_id?.toString() || 'Unknown'}
                                    </div>
                                </div>
                            </div>
                            <div className="badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                                {user.number_message} comments
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {users.length === 0 && (
                <p className="text-muted">No users found.</p>
            )}
        </div>
    )
}
