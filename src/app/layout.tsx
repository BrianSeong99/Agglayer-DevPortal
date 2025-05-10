import './globals.css'
import Sidebar from '../components/Sidebar'
import Providers from '../components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-screen">
      <body className="bg-gray-50 text-gray-900 h-screen">
        <Providers>
          <div className="flex h-screen items-stretch gap-8 p-8">
            <Sidebar />
            <main className="flex-1 flex items-stretch justify-center">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
