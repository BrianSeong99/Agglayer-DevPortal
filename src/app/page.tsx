export default function Home() {
  return (
    <div
      className="rounded-2xl p-8 h-full w-full flex flex-col shadow-2xl"
      style={{ background: 'var(--card-bg)', color: 'var(--text-main)', boxShadow: 'var(--card-shadow)' }}
    >
      <div className="w-full max-w-5xl mx-auto px-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter font-sans mb-4">Welcome to 🥚 Eggshell</h1>
        <p className="text-lg text-gray-600 font-sans">Your dashboard for everything cross-chain.</p>
      </div>
    </div>
  )
}
