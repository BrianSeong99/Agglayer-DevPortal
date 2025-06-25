import { dapps } from '@/app/dashboard/examples/data/dapps'
import DashboardHeader from '@/app/dashboard/components/DashboardHeader'
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "./components/ui/minimal-card"

export default function ExamplesListPage() {
  return (
    <div>
      <DashboardHeader 
        title="Examples"
        subtitle="Explore example dApps built for Agglayer. Click a tile to view more details and code walkthroughs."
      />
      <div className="min-h-[500px] p-4 rounded-lg">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-[1100px]">
          {Object.entries(dapps).map(([slug, dapp]) => (
            <a key={slug} href={`/dashboard/examples/${slug}`} className="block">
              <MinimalCard className="w-[340px] h-[280px] flex flex-col">
                <MinimalCardImage src={dapp.logo} alt={dapp.name} className="h-[160px]" />
                <MinimalCardTitle>{dapp.name}</MinimalCardTitle>
                <MinimalCardDescription>
                  {dapp.tagline}
                </MinimalCardDescription>
              </MinimalCard>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}