import { getChannelsWithStats } from './actions'
import ChannelList from './ChannelList'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function SuspicionPage() {
    const channels = await getChannelsWithStats()

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link href="/services" style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                    ← Back to Services
                </Link>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Channel Suspicion Analysis</h1>
                <p className="text-muted">Detect suspicious behavior across channels</p>
            </div>

            <ChannelList initialChannels={channels} />
        </div>
    )
}
