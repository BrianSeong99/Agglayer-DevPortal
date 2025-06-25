"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Chain = {
  name: string;
  logo: string;
  network_id: number;
  txVolume: number;
  blockSpeed: number;
  tvl: number;
  color: string;
}

// Dummy data for chains/planets
const chains: Chain[] = [
  {
    name: "Mercury",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 1,
    txVolume: 500,
    blockSpeed: 2,
    tvl: 1000,
    color: "#b1b1b1",
  },
  {
    name: "Venus",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 2,
    txVolume: 1000,
    blockSpeed: 1.5,
    tvl: 1000,
    color: "#e6c200",
  },
  {
    name: "Earth",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 3,
    txVolume: 2000,
    blockSpeed: 1,
    tvl: 1000,
    color: "#2e8b57",
  },
  {
    name: "Mars",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 4,
    txVolume: 2500,
    blockSpeed: 5,
    tvl: 1000,
    color: "#c1440e",
  },
  {
    name: "Jupiter",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 5,
    txVolume: 4000,
    blockSpeed: 3.5,
    tvl: 1000,
    color: "#e3a857",
  },
];

// Helper to scale orbit and size
const minTx = Math.min(...chains.map(c => c.txVolume));
const maxTx = Math.max(...chains.map(c => c.txVolume));
const minSpeed = Math.min(...chains.map(c => c.blockSpeed));
const maxSpeed = Math.max(...chains.map(c => c.blockSpeed));

function scale(val: number, min: number, max: number, outMin: number, outMax: number) {
  return ((val - min) / (max - min)) * (outMax - outMin) + outMin;
}

export default function AggniversePlanets() {
  const center = 300; // px
  const systemSize = 600; // px
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);

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
          const orbit = scale(chain.txVolume, minTx, maxTx, 80, 250);
          const isHovered = hoveredRing === i;
          console.log(`Ring ${i}: isHovered=${isHovered}, hoveredRing=${hoveredRing}`);
          return (
            <g key={chain.name}>
              {/* Invisible hover area */}
              <circle
                cx={center}
                cy={center}
                r={orbit}
                fill="none"
                stroke="transparent"
                strokeWidth="30"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => {
                  console.log("hovered", i)
                  setHoveredRing(i)
                }}
                onMouseLeave={() => {
                  console.log("unhovered", i)
                  setHoveredRing(null)
                }}
              />
              {/* Visible orbit ring */}
              <circle
                cx={center}
                cy={center}
                r={orbit}
                fill="none"
                stroke={isHovered ? chain.color : "#444"}
                strokeWidth={isHovered ? 3 : 1}
                opacity={isHovered ? 0.7 : 0.3}
                style={{ cursor: 'pointer', transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s' }}
                // onMouseEnter={() => {
                //   console.log("hovered", i)
                //   setHoveredRing(i)
                // }}
                // onMouseLeave={() => setHoveredRing(null)}
              />
            </g>
          );
        })}
      </svg>
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-yellow-100">
        <img src="/chains/agglayer-logo-mark-black-rgb.svg" alt="Agg" className="w-10 h-10" />
      </div>
      {/* Planets */}
      {chains.map((chain, i) => {
        const orbit = scale(chain.txVolume, minTx, maxTx, 80, 250);
        const size = scale(chain.txVolume, minTx, maxTx, 24, 60);
        const duration = scale(chain.blockSpeed, minSpeed, maxSpeed, 8, 20);
        // Spread planets evenly around the orbit
        const initialAngle = (i / chains.length) * 2 * Math.PI;
        const initialAngleDeg = (initialAngle * 180) / Math.PI;

        return (
          <motion.div
            key={chain.name}
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
              zIndex: 2,
            }}
            animate={{
              rotate: [initialAngleDeg, initialAngleDeg + 360],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: orbit - size / 2,
                top: -size / 2,
                width: size,
                height: size,
                background: chain.color,
                borderRadius: "50%",
                boxShadow: "0 0 12px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#fff",
                fontSize: 16,
                border: "2px solid #fff",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                pointerEvents: "none", // Make planets non-interactive so they don't block orbit hover
              }}
              title={`${chain.name}\nTx: ${chain.txVolume}\nBlock Speed: ${chain.blockSpeed}s`}
            >
              <img src={chain.logo} alt={chain.name} className="w-10 h-10" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 