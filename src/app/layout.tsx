import './globals.css'
import Sidebar from '../components/Sidebar'
import Providers from '../components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
