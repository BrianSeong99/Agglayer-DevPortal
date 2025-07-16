import './globals.css'
import FloatingNavigation from '../shared/components/FloatingNavigation'
import WindowArea from '../shared/components/WindowArea'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body 
        className="min-h-screen flex flex-col relative"
        suppressHydrationWarning
      >
        <WindowArea>{children}</WindowArea>
        {/* Dock at the bottom */}
        <FloatingNavigation />
      </body>
    </html>
  )
}
