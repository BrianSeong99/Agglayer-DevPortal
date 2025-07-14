"use client";
import { usePathname } from 'next/navigation';
import AggniversePlanets from './AggniversePlanets';

export default function AggniverseBackground() {
  const pathname = usePathname();
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {pathname === "/aggniverse" && <AggniversePlanets />}
    </div>
  );
} 