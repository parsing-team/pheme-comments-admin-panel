import { getUsersWithStats } from './actions'
import UserList from './UserList'
import SearchInput from './SearchInput'
import AnalyzeAllButton from './AnalyzeAllButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function UserTrackingPage({ searchParams }) {
    const query = (await searchParams)?.q || ''
    const users = await getUsersWithStats(query)

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/services" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Services
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>User Suspicion Tracking</h1>
                <p className="text-muted">Identify potential bots and coordinated user networks</p>
            </div>

            <SearchInput />

            <AnalyzeAllButton />

            <UserList initialUsers={users} />
        </div>
    )
}
