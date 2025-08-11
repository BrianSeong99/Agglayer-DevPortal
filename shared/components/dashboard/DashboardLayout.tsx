import { ReactNode } from 'react'
import { spacing, radius, colors } from '@/shared/design-system'
import Footer from '../Footer'

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

export default function DashboardLayout({ 
  children, 
  className = '', 
  theme = 'light' 
}: DashboardLayoutProps) {
  const backgroundColor = theme === 'light' ? '#ffffff' : 'var(--bg-main, #000)';
  const textColor = theme === 'light' ? colors.text.primary : 'var(--text-main, #fff)';

  return (
    <>
      {/* Main Content Container */}
      <div
        style={{ 
          backgroundColor,
          color: textColor,
          minHeight: 'calc(100vh - 323px)',
          overflow: 'clip',
          position: 'relative',
          borderRadius: radius.lg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: spacing[6],
          paddingRight: spacing[6],
          paddingTop: spacing[36],
          gap: spacing[16],
          maxWidth: '1392px',
          margin: '0 auto'
        }}
        className={`size-full ${className}`}
      >
        {children}
        
      </div>
      <Footer />
    </>
  )
} 