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
  const [scalingData, setScalingData] = useState({ minTx: 0, maxTx: 1, minSpeed: 0, maxSpeed: 1 });

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
        setScalingData(getScalingData(chainsData));
      } catch (error) {
        console.error('Failed to fetch chains:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChains();
  }, []);

  const center = systemSize / 2;

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
        {chains.map((chain, i) => {
          const orbit = scale(chain.txVolume, scalingData.minTx, scalingData.maxTx, 0.10 * systemSize, 0.48 * systemSize);
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-yellow-100"
        style={{ width: 0.07 * systemSize, height: 0.07 * systemSize }}
      >
        <img src="/chains/agglayer-logo-mark-black-rgb.svg" alt="Agg" style={{ width: 0.045 * systemSize, height: 0.045 * systemSize }} />
      </div>
      
      {/* Planets */}
      {chains.map((chain, i) => {
        const orbit = scale(chain.txVolume, scalingData.minTx, scalingData.maxTx, 0.10 * systemSize, 0.48 * systemSize);
        const size = scale(chain.txVolume, scalingData.minTx, scalingData.maxTx, 0.04 * systemSize, 0.10 * systemSize);
        const duration = scale(chain.blockSpeed, scalingData.minSpeed, scalingData.maxSpeed, 8, 20) * 10;

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