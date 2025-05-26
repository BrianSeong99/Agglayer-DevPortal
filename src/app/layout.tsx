import './globals.css'
import Sidebar from '../components/Sidebar'
import Providers from '../components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }} className="min-h-screen">
        <Providers>
          <div className="flex h-screen items-stretch gap-8 p-8">
            <Sidebar />
            <main className="flex-1 flex items-center justify-center">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
