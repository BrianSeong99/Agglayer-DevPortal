import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface CelestialBody {
  type: 'sun' | 'planet'
  data?: any
}

interface SidebarContextType {
  isOpen: boolean
  selectedBody: CelestialBody | null
  isSearchVisible: boolean
  openSidebar: (body: CelestialBody) => void
  closeSidebar: () => void
  showSearch: () => void
  hideSearch: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [savedState, setSavedState] = useState<{ 
    isOpen: boolean; 
    selectedBody: CelestialBody | null;
    isSearchVisible: boolean;
  }>({ isOpen: false, selectedBody: null, isSearchVisible: false })
  const pathname = usePathname()

  // Save state when leaving aggniverse and restore when returning
  useEffect(() => {
    if (pathname === '/aggniverse') {
      // Returning to aggniverse - restore saved state (or show search by default)
      setIsOpen(savedState.isOpen)
      setSelectedBody(savedState.selectedBody)
      setIsSearchVisible(savedState.isSearchVisible || true) // Show search by default
    } else {
      // Leaving aggniverse - save current state and hide sidebar/search
      if (isOpen || selectedBody || isSearchVisible) {
        setSavedState({ isOpen, selectedBody, isSearchVisible })
      }
      setIsOpen(false)
      setSelectedBody(null)
      setIsSearchVisible(false)
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

  const showSearch = () => {
    setIsSearchVisible(true)
  }

  const hideSearch = () => {
    setIsSearchVisible(false)
  }

  return (
    <SidebarContext.Provider value={{ 
      isOpen, 
      selectedBody, 
      isSearchVisible,
      openSidebar, 
      closeSidebar,
      showSearch,
      hideSearch
    }}>
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