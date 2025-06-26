import './globals.css'
import FloatingNavigation from '../shared/components/FloatingNavigation'
import AggniverseBackground from '../shared/components/AggniverseBackground'

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
        
        {/* Window area, always above the dock */}
        <div
          className="relative z-10 flex justify-center items-center w-full p-[5px]"
          style={{ height: `calc(100vh - ${DOCK_HEIGHT}px)` }}
        >
          <div className="w-full h-full border border-gray-700 rounded-2xl bg-black/30 backdrop-blur-xs flex items-center justify-center">
            <main className="w-full h-full flex items-center justify-center">
              {children}
            </main>
          </div>
        </div>
        {/* Dock at the bottom */}
        <div
          className="relative z-10 w-full flex justify-center"
          style={{ height: `${DOCK_HEIGHT}px` }}
        >
          <FloatingNavigation />
        </div>
      </body>
    </html>
  )
}
