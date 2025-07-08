"use client";
import React, { useState, useEffect } from "react";
import { Chain, fetchChains, getScalingData, scale } from "../data/chains";
import Orbit from "./ui/orbit";
import Planet from "./ui/planet";

export default function AggniversePlanets() {
  const [systemSize, setSystemSize] = useState(600); // px
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function updateSize() {
      setSystemSize(0.8 * Math.min(window.innerWidth, window.innerHeight));
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const loadChains = async () => {
      try {
        setLoading(true);
        const chainsData = await fetchChains();
        setChains(chainsData);
      } catch (error) {
        console.error('Failed to fetch chains:', error);
      } finally {
        setLoading(false);
      }
    };
    loadChains();
  }, []);

  const center = systemSize / 2;
  const minOrbit = 0.13 * systemSize;
  const orbitStep = 0.13 * systemSize;
  const planetSize = 0.07 * systemSize;
  const planetDuration = 40; // seconds, same for all

  // Grouping logic: [4, 6, 10, 14, ...]
  const groupSizes = [4, 6, 10, 14, 18, 22, 26];
  let planetGroups: {orbit: number, planets: {chain: Chain, globalIndex: number, indexInGroup: number, groupSize: number}[]}[] = [];
  let chainIdx = 0;
  let orbitIdx = 0;
  while (chainIdx < chains.length) {
    const groupSize = groupSizes[orbitIdx] || (chains.length - chainIdx);
    const group: {chain: Chain, globalIndex: number, indexInGroup: number, groupSize: number}[] = [];
    for (let i = 0; i < groupSize && chainIdx < chains.length; ++i, ++chainIdx) {
      group.push({
        chain: chains[chainIdx],
        globalIndex: chainIdx,
        indexInGroup: i,
        groupSize: groupSize
      });
    }
    planetGroups.push({
      orbit: minOrbit + orbitStep * orbitIdx,
      planets: group
    });
    orbitIdx++;
  }

  if (loading) {
    return (
      <div className="relative flex items-center justify-center w-full" style={{ height: systemSize, minHeight: 300 }}>
        <div className="text-white">Loading solar system...</div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full overflow-visible" style={{ height: systemSize, minHeight: 300 }}>
      {/* Orbit rings */}
      <svg
        width={systemSize}
        height={systemSize}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 3, pointerEvents: 'auto' }}
      >
        {planetGroups.map((group, groupIdx) => (
          <Orbit
            key={groupIdx}
            chain={group.planets[0]?.chain}
            index={groupIdx}
            center={center}
            orbit={group.orbit}
            isHovered={hoveredRing === groupIdx}
            onHover={setHoveredRing}
          />
        ))}
      </svg>
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-yellow-100"
        style={{ width: 0.07 * systemSize, height: 0.07 * systemSize }}
      >
        <img src="/chains/agglayer-logo-mark-black-rgb.svg" alt="Agg" style={{ width: 0.045 * systemSize, height: 0.045 * systemSize }} />
      </div>
      {/* Planets */}
      {planetGroups.map((group, groupIdx) =>
        group.planets.map(({chain, globalIndex, indexInGroup, groupSize}) => (
          <Planet
            key={chain.name}
            chain={chain}
            index={indexInGroup}
            orbit={group.orbit}
            size={planetSize}
            duration={planetDuration}
            totalPlanets={groupSize}
          />
        ))
      )}
    </div>
  );
} 