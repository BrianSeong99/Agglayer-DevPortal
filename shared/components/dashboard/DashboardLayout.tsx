import { ReactNode } from 'react'

export default function DashboardLayout({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div
      className={`rounded-2xl p-8 h-full w-full flex flex-col shadow-2xl overflow-auto max-w-7xl mx-auto px-6 pb-20 ${className}`}
      style={{ color: 'var(--text-main)', boxShadow: 'var(--shadow-card)' }}
    >
      {children}
    </div>
  )
} 