"use client";
import Particles from './Particles';
import AggniversePlanets from './AggniversePlanets';

export default function AggniverseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Particles above cosmic background */}
      <div className="absolute inset-0">
        <Particles
          particleColors={[
            '#ffcc6f', // Red/Orange (M-type)
            '#ffd2a1', // Orange (K-type)
            '#fff4ea', // Yellow/White (G-type)
            '#ffffff', // White (A/F-type)
            '#aabfff', // Blue (O/B-type)
          ]}
          particleCount={1000}
          particleSpread={10}
          speed={0.03}
          particleBaseSize={30}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      {/* Planets above everything else */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="scale-75">
          <AggniversePlanets />
        </div>
      </div>
    </div>
  );
} 