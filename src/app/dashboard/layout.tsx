import { default as DashboardLayoutWrapper } from '../../components/DashboardLayout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper>
      {/* <div className="w-full max-w-5xl mx-auto px-8"> */}
        {children}
      {/* </div> */}
    </DashboardLayoutWrapper>
  )
} 