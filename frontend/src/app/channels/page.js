import Link from 'next/link'
import { getChannels } from '../actions'

export default async function ChannelsPage() {
    const channels = await getChannels()

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Channels ({channels.length})</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {channels.map((channel) => (
                    <Link href={`/channels/${channel.id}`} key={channel.id} className="card" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                {channel.name || 'Unnamed Channel'}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span className="badge">
                                    {channel.subscribers ? `${channel.subscribers} subs` : 'No subs info'}
                                </span>
                                <span className="timestamp">
                                    ID: {channel.id}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {channels.length === 0 && (
                <p className="text-muted">No channels found.</p>
            )}
        </div>
    )
}
