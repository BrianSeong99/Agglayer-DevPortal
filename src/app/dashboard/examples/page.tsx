import { dapps } from '@/data/dapps'
import Tile from '@/components/Tile'
import DashboardHeader from '@/components/DashboardHeader'

export default function ExamplesListPage() {
  return (
    <div>
      <DashboardHeader 
        title="Examples"
        subtitle="Explore example dApps built for Agglayer. Click a tile to view more details and code walkthroughs."
      />
      <div className="px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(dapps).map(([slug, dapp]) => (
            <Tile
              key={slug}
              href={`/dashboard/examples/${slug}`}
              icon={<img src={dapp.logo} alt={dapp.name} className="w-10 h-10 rounded" />}
              title={dapp.name}
              description={dapp.tagline}
              variant="secondary"
            />
          ))}
        </div>
      </div>
    </div>
  )
}