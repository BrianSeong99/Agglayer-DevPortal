import React from 'react';

export default function StackingSquares() {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 110 110" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottom cube */}
      <rect 
        x="5" 
        y="10" 
        width="90" 
        height="90" 
        rx="4" 
        fill="#ffffff" 
        stroke="#0071F7" 
        strokeWidth="1"
      />
      
      {/* Top cube */}
      <rect 
        x="10" 
        y="5" 
        width="90" 
        height="90" 
        rx="4" 
        fill="#E6F1FF" 
        stroke="#0071F7" 
        strokeWidth="1"
      />
    </svg>
  );
} 