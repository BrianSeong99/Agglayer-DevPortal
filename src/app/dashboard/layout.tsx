export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-8 h-full w-full flex flex-col shadow-2xl"
      style={{ background: 'var(--card-bg)', color: 'var(--text-main)', boxShadow: 'var(--card-shadow)' }}
    >
      <div className="w-full max-w-5xl mx-auto px-8">
        {children}
      </div>
    </div>
  )
} 