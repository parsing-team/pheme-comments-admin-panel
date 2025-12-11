import Link from 'next/link'
import { searchUsers } from '../actions'
import SearchInput from './SearchInput'

export default async function UsersPage({ searchParams }) {
    const query = (await searchParams)?.q || ''
    const users = await searchUsers(query)

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Search Users</h1>

            <SearchInput />

            <div className="grid">
                {users.map((user) => (
                    <Link href={`/users/${user.id}`} key={user.id} className="card">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-muted" style={{ marginBottom: '0.5rem' }}>
                            Telegram ID: {user.telegram_id?.toString() || 'Unknown'}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="badge">
                                ID: {user.id}
                            </span>
                            {user.phone && <span className="timestamp">{user.phone}</span>}
                        </div>
                    </Link>
                ))}
            </div>

            {query && users.length === 0 && (
                <p className="text-muted">No users found matching "{query}".</p>
            )}
            {!query && (
                <p className="text-muted">Type to search for users.</p>
            )}
        </div>
    )
}
