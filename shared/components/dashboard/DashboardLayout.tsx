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
  theme = 'dark' 
}: DashboardLayoutProps) {
  const backgroundColor = theme === 'light' ? colors.background.primary : 'var(--bg-main, #000)';
  const textColor = theme === 'light' ? colors.text.primary : 'var(--text-main, #fff)';
  const shadowColor = theme === 'light' ? 'rgba(0,0,0,0.1)' : 'var(--shadow-card)';

  return (
    <>
      <div
        className={`h-full w-full flex flex-col overflow-auto max-w-7xl mx-auto ${className}`}
        style={{ 
          backgroundColor,
          color: textColor,
          borderRadius: radius.xl,
          padding: spacing[8],
          paddingBottom: spacing[20],
          boxShadow: `0 25px 50px -12px ${shadowColor}`,
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  )
} 