"use client";
import CosmicBackground from './CosmicBackground';
import Particles from './Particles';
import AggniversePlanets from './AggniversePlanets';

export default function AggniverseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Cosmic background at the very back */}
      <CosmicBackground />
      {/* Particles above cosmic background */}
      <div className="absolute inset-0">
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
      
      {/* Planets above everything else */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="scale-75 opacity-30">
          <AggniversePlanets />
        </div>
      </div>
    </div>
  );
} 