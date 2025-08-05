import './globals.css'
import ShadcnNavigationMenu from '../shared/components/NavigationMenu'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body 
        className="min-h-screen bg-white"
        suppressHydrationWarning
      >
        {/* Navigation Menu at the top */}
        <ShadcnNavigationMenu />
        
        {/* Main content with padding for fixed navbar */}
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}