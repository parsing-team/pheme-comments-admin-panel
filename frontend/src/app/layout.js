import './globals.css'
import Header from './Header'
import Sidebar from './Sidebar'

export const metadata = {
  title: 'Comments Viewer',
  description: 'View Telegram and Twitter comments',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <Header />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
