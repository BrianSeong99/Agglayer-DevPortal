"use client";
import React from "react";
import { Chain } from "../../data/chains";

interface OrbitProps {
  chain: Chain;
  index: number;
  center: number;
  orbit: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export default function Orbit({ 
  chain, 
  index, 
  center, 
  orbit, 
  isHovered, 
  onHover 
}: OrbitProps) {
  return (
    <g key={chain.name}>
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
      />
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
          console.log("hovered", index);
          onHover(index);
        }}
        onMouseLeave={() => {
          console.log("unhovered", index);
          onHover(null);
        }}
      />
    </g>
  );
}
