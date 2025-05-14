import { FaBook, FaHammer, FaCrown, FaRegFileAlt, FaStar, FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa'
import Tile from '@/components/Tile'
import DashboardLayout from '../components/DashboardLayout'

// Example ecosystem icons (replace with actual SVGs or images as needed)
const ecosystem: { name: string; color: string; icon: React.ReactNode }[] = [
  { name: 'Eco 1', color: 'text-green-500', icon: <div className="w-full h-24 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-t-2xl flex items-center justify-center"><FaBook className="text-[var(--primary)] text-4xl" /></div> },
  { name: 'Eco 2', color: 'text-blue-500', icon: <div className="w-full h-24 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-t-2xl flex items-center justify-center"><FaHammer className="text-[var(--primary)] text-4xl" /></div> },
  { name: 'Eco 3', color: 'text-purple-500', icon: <div className="w-full h-24 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-t-2xl flex items-center justify-center"><FaCrown className="text-[var(--primary)] text-4xl" /></div> },
  { name: 'Eco 4', color: 'text-red-500', icon: <div className="w-full h-24 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-t-2xl flex items-center justify-center"><FaRegFileAlt className="text-[var(--primary)] text-4xl" /></div> },
  { name: 'Eco 5', color: 'text-orange-500', icon: <div className="w-full h-24 bg-gradient-to-r from-[var(--accent-light)] to-[var(--accent)] rounded-t-2xl flex items-center justify-center"><FaStar className="text-[var(--accent)] text-4xl" /></div> },
]

export default function Home() {
  return (
    <DashboardLayout>
      <header className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-6 md:pt-12 md:pb-8">
        <h1 className="text-4xl font-bold tracking-tight font-sans mb-2 text-left">AggShell</h1>
        <p className="text-lg text-[var(--text-secondary)] font-sans mb-8 text-left">Tools to help you build, launch, and grow your app on Agglayer.</p>
      </header>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Tile
            href="https://docs.agglayer.com/"
            illustration={<div className="w-full h-24 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-t-2xl flex items-center justify-center"><FaBook className="text-[var(--primary)] text-4xl" /></div>}
            title="Learn About Agglayer"
            description="Read the docs and understand how Agglayer works."
            variant="main"
            className="overflow-hidden"
          />
          <Tile
            href="https://github.com/Polygon-Edge/Agglayer"
            illustration={<div className="w-full h-24 bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] rounded-t-2xl flex items-center justify-center"><FaHammer className="text-[var(--primary)] text-4xl" /></div>}
            title="Build Agglayer apps"
            description="Start building cross-chain apps with Agglayer."
            variant="main"
            className="overflow-hidden"
          />
          <Tile
            icon={<FaCrown />}
            title="Aggchain"
            description="Explore the Aggchain network and its capabilities."
            variant="secondary"
          />
          <Tile
            icon={<FaRegFileAlt />}
            title="Agglayer Sandbox"
            description="Experiment and test in the Agglayer Sandbox environment."
            variant="secondary"
          />
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <a href="https://twitter.com/0xPolygon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="w-7 h-7 text-[var(--primary)] hover:text-[var(--primary-dark)] transition" />
          </a>
          <a href="https://github.com/Polygon-Edge/Agglayer" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="w-7 h-7 text-[var(--primary)] hover:text-[var(--primary-dark)] transition" />
          </a>
          <a href="https://discord.gg/polygon" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <FaDiscord className="w-7 h-7 text-[var(--primary)] hover:text-[var(--primary-dark)] transition" />
          </a>
        </div>
        {/* <div className="mt-12">
          <h3 className="font-semibold text-base mb-3 text-left">Explore Agglayer ecosystem</h3>
          <div className="flex flex-wrap gap-4 items-center">
            {ecosystem.map((eco) => (
              <div key={eco.name} className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                <span className={eco.color}>{eco.icon}</span>
                <span className="text-xs font-medium text-gray-700">{eco.name}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </DashboardLayout>
  )
}
