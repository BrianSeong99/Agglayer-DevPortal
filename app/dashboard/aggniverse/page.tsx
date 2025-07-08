import DashboardHeader from '@/app/dashboard/components/DashboardHeader'
// import AggniversePlanets from '@/shared/components/AggniversePlanets'

export default function AggniversePage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Foreground Content */}
      <div className="relative z-20">
        <DashboardHeader 
          title="Aggniverse Overview"
          subtitle="Each planet is a chain. Orbit and size are based on transaction amount and block speed."
        />
        {/* Full-size solar system for this page
        <div className="flex items-center justify-center w-full h-[600px]">
          <AggniversePlanets />
        </div> */}
      </div>
    </div>
  )
}
  