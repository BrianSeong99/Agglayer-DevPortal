import './globals.css'
import ShadcnNavigationMenu from '../shared/components/NavigationMenu'
import WindowArea from '../shared/components/WindowArea'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body 
        className="min-h-screen flex flex-col relative"
        suppressHydrationWarning
      >
        {/* Navigation Menu at the top */}
        <ShadcnNavigationMenu />
        <WindowArea>{children}</WindowArea>
      </body>
    </html>
  )
}
