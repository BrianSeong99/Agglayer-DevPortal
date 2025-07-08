// "use client";
import { dapps } from '@/app/dashboard/examples/data/dapps'
import DashboardHeader from '@/app/dashboard/components/DashboardHeader'
import { HoverEffect } from "./components/ui/card-hover-effect"

export default function ExamplesListPage() {
  // Convert dapps object to array for HoverEffect
  const items = Object.entries(dapps).map(([slug, dapp]) => ({
    title: dapp.name,
    description: dapp.tagline,
    link: `/dashboard/examples/${slug}`,
    image: dapp.logo,
  }));

  return (
    <div>
      <DashboardHeader 
        title="Examples"
        subtitle="Explore example dApps built for Agglayer. Click a tile to view more details and code walkthroughs."
      />
      <div className="min-h-[500px] p-4 rounded-lg">
        <HoverEffect items={items} />
      </div>
    </div>
  )
}