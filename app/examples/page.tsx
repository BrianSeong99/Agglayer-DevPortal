// "use client";
import { dapps } from '@/app/examples/data/dapps'
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader'
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout'
import { HoverEffect } from "./components/ui/card-hover-effect"

export default function ExamplesListPage() {
  // Convert dapps object to array for HoverEffect
  const items = Object.entries(dapps).map(([slug, dapp]) => ({
    title: dapp.name,
    description: dapp.tagline,
    link: `/examples/${slug}`,
    image: dapp.logo,
  }));

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Examples"
        subtitle="Explore example dApps built for Agglayer. Click a tile to view more details and code walkthroughs."
      />
      <div className="min-h-[500px] p-4 rounded-lg">
        <HoverEffect items={items} />
      </div>
    </DashboardLayout>
  )
}