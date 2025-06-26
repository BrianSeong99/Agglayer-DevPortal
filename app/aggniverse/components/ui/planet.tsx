"use client";
import React from "react";
import { motion } from "framer-motion";
import { Chain } from "../../data/chains";

interface PlanetProps {
  chain: Chain;
  index: number;
  orbit: number;
  size: number;
  duration: number;
  totalPlanets: number;
}

export default function Planet({ 
  chain, 
  index, 
  orbit, 
  size, 
  duration, 
  totalPlanets 
}: PlanetProps) {
  // Spread planets evenly around the orbit
  const initialAngle = (index / totalPlanets) * 2 * Math.PI;
  const initialAngleDeg = (initialAngle * 180) / Math.PI;

  return (
    <motion.div
      key={chain.name}
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
        zIndex: 3,
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
}
