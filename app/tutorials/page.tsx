"use client";
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout';
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader';
import TutorialsList from './components/TutorialsList';
import DappExamples from './components/DappExamples';
import BottomCTA from './components/BottomCTA';

export default function TutorialsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Tutorials"
        subtitle="Explore tutorials, guides, and example applications to accelerate your Agglayer development journey"
      />
      <TutorialsList />
      <DappExamples />
      <BottomCTA />
    </DashboardLayout>
  );
}