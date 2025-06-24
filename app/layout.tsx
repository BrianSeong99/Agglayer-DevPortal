import './globals.css'
import Sidebar from './dashboard/components/Sidebar'
import Providers from '../shared/components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body 
        style={{
          background: "var(--bg-main)",
          color: "var(--text-primary)"
        }}
        className="min-h-screen"
        suppressHydrationWarning
      >
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
