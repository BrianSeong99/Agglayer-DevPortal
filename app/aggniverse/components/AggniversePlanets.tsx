"use client";
import React, { useState, useEffect } from "react";
import { Chain, fetchChains, getScalingData, scale } from "../data/chains";
import Orbit from "./ui/orbit";
import Planet from "./ui/planet";

export default function AggniversePlanets() {
  const center = 300; // px
  const systemSize = 600; // px
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const [chains, setChains] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(true);
  const [scalingData, setScalingData] = useState({ minTx: 0, maxTx: 1, minSpeed: 0, maxSpeed: 1 });

  useEffect(() => {
    const loadChains = async () => {
      try {
        setLoading(true);
        const chainsData = await fetchChains();
        setChains(chainsData);
        setScalingData(getScalingData(chainsData));
      } catch (error) {
        console.error('Failed to fetch chains:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChains();
  }, []);

  if (loading) {
    return (
      <div className="relative flex items-center justify-center w-full h-[600px] bg-transparent">
        <div className="text-white">Loading solar system...</div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] bg-transparent overflow-visible">
      {/* Orbit rings */}
      <svg
        width={systemSize}
        height={systemSize}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 3, pointerEvents: 'auto' }}
      >
        {chains.map((chain, i) => {
          const orbit = scale(chain.txVolume, scalingData.minTx, scalingData.maxTx, 80, 250);
          const isHovered = hoveredRing === i;
          
          return (
            <Orbit
              key={chain.name}
              chain={chain}
              index={i}
              center={center}
              orbit={orbit}
              isHovered={isHovered}
              onHover={setHoveredRing}
            />
          );
        })}
      </svg>
      
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-yellow-100">
        <img src="/chains/agglayer-logo-mark-black-rgb.svg" alt="Agg" className="w-10 h-10" />
      </div>
      
      {/* Planets */}
      {chains.map((chain, i) => {
        const orbit = scale(chain.txVolume, scalingData.minTx, scalingData.maxTx, 80, 250);
        const size = scale(chain.txVolume, scalingData.minTx, scalingData.maxTx, 24, 60);
        const duration = scale(chain.blockSpeed, scalingData.minSpeed, scalingData.maxSpeed, 8, 20);

        return (
          <Planet
            key={chain.name}
            chain={chain}
            index={i}
            orbit={orbit}
            size={size}
            duration={duration}
            totalPlanets={chains.length}
          />
        );
      })}
    </div>
  );
} 