"use client";
import { useState } from 'react';
import { dapps } from '@/app/examples/data/dapps'
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader'
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout'
import DeveloperJourneySelector from '@/app/examples/components/DeveloperJourneySelector'
import TechnicalTutorials from '@/app/examples/components/TechnicalTutorials'
import { HoverEffect } from "./components/ui/card-hover-effect"

export default function ExamplesListPage() {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  
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
        title="Learn & Tutorial Hub"
        subtitle="Comprehensive tutorials, examples, and hands-on learning resources for building on Agglayer."
      />
      
      {/* Developer Journey Selection */}
      <DeveloperJourneySelector 
        selectedJourney={selectedJourney}
        onJourneySelect={setSelectedJourney}
      />
      
      {/* Technical Tutorials */}
      <TechnicalTutorials selectedJourney={selectedJourney} />
      
      {/* Example dApps */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Example dApps</h3>
            <p className="text-gray-300">Real applications built on Agglayer for reference and learning</p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4" />
          </div>
          <div className="min-h-[400px]">
            <HoverEffect items={items} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}