import { default as DashboardLayoutWrapper } from './components/DashboardLayout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper>
      {children}
    </DashboardLayoutWrapper>
  )
} 