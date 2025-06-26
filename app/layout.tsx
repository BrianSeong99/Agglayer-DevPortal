import './globals.css'
import FloatingNavigation from '../shared/components/FloatingNavigation'
import AggniverseBackground from '../shared/components/AggniverseBackground'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body 
        className="min-h-screen relative"
        suppressHydrationWarning
      >
        {/* Background with particles and solar system */}
        <AggniverseBackground />
        
        {/* Main content */}
        <div className="relative z-10 flex h-screen items-stretch gap-8 p-8">
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
        </div>
        <FloatingNavigation />
      </body>
    </html>
  )
}
