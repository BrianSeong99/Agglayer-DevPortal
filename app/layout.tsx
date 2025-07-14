import './globals.css'
import FloatingNavigation from '../shared/components/FloatingNavigation'
import AggniverseBackground from '../shared/components/AggniverseBackground'
import WindowArea from '../shared/components/WindowArea'

const DOCK_HEIGHT = 80; // px, adjust to match your dock

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body 
        className="min-h-screen flex flex-col relative"
        suppressHydrationWarning
      >
        {/* Background with particles and solar system */}
        <AggniverseBackground />
        <WindowArea>{children}</WindowArea>
        {/* Dock at the bottom */}
        <FloatingNavigation />
      </body>
    </html>
  )
}
