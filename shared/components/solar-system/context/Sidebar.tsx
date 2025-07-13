import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface CelestialBody {
  type: 'sun' | 'planet'
  data?: any
}

interface SidebarContextType {
  isOpen: boolean
  selectedBody: CelestialBody | null
  openSidebar: (body: CelestialBody) => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null)
  const [savedState, setSavedState] = useState<{ isOpen: boolean; selectedBody: CelestialBody | null }>({ isOpen: false, selectedBody: null })
  const pathname = usePathname()

  // Save state when leaving aggniverse and restore when returning
  useEffect(() => {
    if (pathname === '/aggniverse') {
      // Returning to aggniverse - restore saved state
      setIsOpen(savedState.isOpen)
      setSelectedBody(savedState.selectedBody)
    } else {
      // Leaving aggniverse - save current state and hide sidebar
      if (isOpen || selectedBody) {
        setSavedState({ isOpen, selectedBody })
      }
      setIsOpen(false)
      setSelectedBody(null)
    }
  }, [pathname])

  const openSidebar = (body: CelestialBody) => {
    setSelectedBody(body)
    setIsOpen(true)
  }

  const closeSidebar = () => {
    setIsOpen(false)
    setTimeout(() => setSelectedBody(null), 400) // Clear after animation
  }

  return (
    <SidebarContext.Provider value={{ isOpen, selectedBody, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}