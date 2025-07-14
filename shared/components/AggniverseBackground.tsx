"use client";
import Particles from './Particles';
import AggniversePlanets from './AggniversePlanets';

export default function AggniverseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <AggniversePlanets />
    </div>
  );
} 