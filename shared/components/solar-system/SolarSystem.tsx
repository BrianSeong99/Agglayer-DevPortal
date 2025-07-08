"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'

import Scene from './components/Scene'

interface SolarSystemProps {
  className?: string
}

const SolarSystem = ({ className = "" }: SolarSystemProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the component is fully mounted before initializing Three.js
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return (
      <div ref={containerRef} className={`w-full h-full bg-black flex items-center justify-center text-white ${className}`}>
        Loading 3D Scene...
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-white">Loading...</div>}>
        <Canvas 
          camera={{ position: [0, 50, 150], far: 200000 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000');
          }}
        >
          <color attach='background' args={['black']} />
          <ambientLight intensity={0.25} />

          <OrbitControls 
            maxDistance={450} 
            minDistance={50} 
            makeDefault 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
          />

          <Physics gravity={[0, 0, 0]}>
            <Scene />
          </Physics>

          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default SolarSystem 