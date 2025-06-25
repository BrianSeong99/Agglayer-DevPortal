"use client";
import React from "react";
import { motion } from "framer-motion";

// Dummy data for chains/planets
const chains = [
  {
    name: "Mercury",
    txAmount: 1000,
    blockSpeed: 2,
    color: "#b1b1b1",
  },
  {
    name: "Venus",
    txAmount: 3000,
    blockSpeed: 1.5,
    color: "#e6c200",
  },
  {
    name: "Earth",
    txAmount: 8000,
    blockSpeed: 1,
    color: "#2e8b57",
  },
  {
    name: "Mars",
    txAmount: 2000,
    blockSpeed: 2.5,
    color: "#c1440e",
  },
  {
    name: "Jupiter",
    txAmount: 20000,
    blockSpeed: 0.5,
    color: "#e3a857",
  },
];

// Helper to scale orbit and size
const minTx = Math.min(...chains.map(c => c.txAmount));
const maxTx = Math.max(...chains.map(c => c.txAmount));
const minSpeed = Math.min(...chains.map(c => c.blockSpeed));
const maxSpeed = Math.max(...chains.map(c => c.blockSpeed));

function scale(val: number, min: number, max: number, outMin: number, outMax: number) {
  return ((val - min) / (max - min)) * (outMax - outMin) + outMin;
}

export default function AggniversePlanets() {
  const center = 300; // px
  const systemSize = 600; // px

  return (
    <div className="relative flex items-center justify-center w-full h-[600px] bg-transparent overflow-visible">
      {/* Orbit rings */}
      <svg
        width={systemSize}
        height={systemSize}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {chains.map((chain, i) => {
          const orbit = scale(chain.txAmount, minTx, maxTx, 80, 250);
          return (
            <circle
              key={chain.name}
              cx={center}
              cy={center}
              r={orbit}
              fill="none"
              stroke="#444"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
      </svg>
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-300 rounded-full shadow-lg flex items-center justify-center z-10 border-4 border-yellow-100">
        <span className="text-lg font-bold text-yellow-900">Agg</span>
      </div>
      {/* Planets */}
      {chains.map((chain, i) => {
        const orbit = scale(chain.txAmount, minTx, maxTx, 80, 250);
        const size = scale(chain.txAmount, minTx, maxTx, 24, 60);
        const duration = scale(chain.blockSpeed, minSpeed, maxSpeed, 8, 20);
        // Spread planets evenly around the orbit
        const initialAngle = (i / chains.length) * 2 * Math.PI;

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
              rotate: 360,
            }}
            initial={{
              rotate: (initialAngle * 180) / Math.PI,
            }}
            transition={{
              repeat: Infinity,
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
              }}
              title={`${chain.name}\nTx: ${chain.txAmount}\nBlock Speed: ${chain.blockSpeed}s`}
            >
              {chain.name[0]}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 