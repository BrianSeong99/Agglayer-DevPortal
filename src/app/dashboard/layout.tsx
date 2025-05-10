export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow-2xl p-8 h-full w-full flex flex-col">
      {children}
    </div>
  )
} 