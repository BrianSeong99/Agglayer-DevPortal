"use client";
import { usePathname } from 'next/navigation';
import AggniversePlanets from './aggniverse/AggniversePlanets';

export default function AggniverseBackground() {
  const pathname = usePathname();
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Always render the 3D scene to keep it running in the background */}
      <AggniversePlanets isInteractive={pathname === "/aggniverse"} />
    </div>
  );
} 