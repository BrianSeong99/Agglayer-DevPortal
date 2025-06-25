import DashboardHeader from '@/app/dashboard/components/DashboardHeader'
import AggniversePlanets from './components/AggniversePlanets'

export default function AggniversePage() {
    return (
      <div>
        <DashboardHeader 
          title="Aggniverse Overview"
          subtitle="Each planet is a chain. Orbit and size are based on transaction amount and block speed."
        />
        <AggniversePlanets />
      </div>
    )
  }
  