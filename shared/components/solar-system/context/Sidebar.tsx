import { createContext, useContext, useState, ReactNode } from 'react'

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