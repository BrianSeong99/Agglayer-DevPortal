import './globals.css'
import FloatingNavigation from '../shared/components/FloatingNavigation'
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
        <div className="flex h-screen items-stretch gap-8 p-8">
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
        </div>
        <FloatingNavigation />
      </body>
    </html>
  )
}
