import { FaBook, FaHammer, FaCrown, FaRegFileAlt, FaStar, FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa'
import DashboardLayout from '@/app/dashboard/components/DashboardLayout'
import DashboardHeader from '@/app/dashboard/components/DashboardHeader'

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardHeader 
        title="AggShell"
        subtitle="Tools to help you build, launch, and grow your app on Agglayer."
      />
      {/* <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Tile
            href="https://docs.agglayer.dev/"
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
        </div> */}
        {/* <div className="flex justify-center gap-6 mt-8">
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
      </div> */}
    </DashboardLayout>
  )
}
