import React from 'react';

export default function StackingSquares() {
  return (
    <svg 
      width="64" 
      height="64" 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simple light blue square with dark blue outline */}
      <rect 
        x="8" 
        y="8" 
        width="48" 
        height="48" 
        rx="4" 
        fill="#E6F1FF" 
        stroke="#0071F7" 
        strokeWidth="1"
      />
    </svg>
  );
} 