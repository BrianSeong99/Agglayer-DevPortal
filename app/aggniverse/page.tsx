'use client';

import AggniversePlanets from './components/AggniversePlanets';

export default function AggNiversePage() {
  return (
    <>
      {/* Aggniverse 3D Background - only on this page */}
      <div className="fixed inset-0 z-0">
        <AggniversePlanets isInteractive={true} />
      </div>
      
      {/* Page content would go here with proper z-index */}
      <div className="relative z-10">
        {/* Future content */}
      </div>
    </>
  );
}