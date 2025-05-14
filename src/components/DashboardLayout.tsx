import { ReactNode } from 'react'

export default function DashboardLayout({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div
      className={`rounded-2xl p-8 h-full w-full flex flex-col shadow-2xl ${className}`}
      style={{ background: 'var(--bg-dashboard)', color: 'var(--text-main)', boxShadow: 'var(--shadow-card)' }}
    >
      {children}
    </div>
  )
} 