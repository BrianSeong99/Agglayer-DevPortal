import DashboardHeader from '@/shared/components/dashboard/DashboardHeader'
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout'
// import AggniversePlanets from '@/shared/components/AggniversePlanets'

export default function AggniversePage() {
  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Aggniverse Overview"
        subtitle="Each planet is a chain. Orbit and size are based on transaction amount and block speed."
      />
      {/* Full-size solar system for this page
      <div className="flex items-center justify-center w-full h-[600px]">
        <AggniversePlanets />
      </div> */}
    </DashboardLayout>
  )
}
  