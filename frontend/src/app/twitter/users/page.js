import Link from 'next/link'
import TwitterSearchInput from './TwitterSearchInput'

export default function TwitterUsersPage() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                Search Twitter Users
            </h1>

            <TwitterSearchInput />
        </div>
    )
}
