import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        Select Platform
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        {/* TG Comments Card */}
        <Link
          href="/channels"
          className="card"
          style={{
            padding: '3rem 2rem',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div style={{ fontSize: '4rem' }}>💬</div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              TG Comments
            </h2>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              Telegram channels analysis
            </p>
          </div>
        </Link>

        {/* Twitter Comments Card */}
        <Link
          href="/twitter"
          className="card"
          style={{
            padding: '3rem 2rem',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div style={{ fontSize: '4rem' }}>🐦</div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Twitter (X) Comments
            </h2>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              Twitter profiles & analytics
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
