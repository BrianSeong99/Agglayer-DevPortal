import DashboardHeader from '@/app/dashboard/components/DashboardHeader'
import AggniversePlanets from './components/AggniversePlanets'
import Particles from './components/Particles'

export default function AggniversePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.03}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Foreground Content */}
      <div className="relative z-10">
        <DashboardHeader 
          title="Aggniverse Overview"
          subtitle="Each planet is a chain. Orbit and size are based on transaction amount and block speed."
        />
        <AggniversePlanets />
      </div>
    </div>
  )
}
  