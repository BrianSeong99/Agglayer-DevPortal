"use client";
import React, { useRef } from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'

import Scene from './solar-system/components/Scene'
import { SidebarProvider, useSidebar } from './solar-system/context/Sidebar'
import CelestialSidebar from './solar-system/components/CelestialSidebar'
import { CelestialSearchBar } from './solar-system/components/CelestialSearchBar'

// Inner component that uses the sidebar
const AggniverseContent = () => {
  const { isOpen, selectedBody, isSearchVisible, closeSidebar } = useSidebar();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: isOpen ? 'none' : 'none' }}
      >
        {/* <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-white">Loading...</div>}> */}
          <Canvas 
          className={isOpen ? "pointer-events-none" : "pointer-events-auto"}
          camera={{ position: [0, 50, 150], far: 200000 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl, scene }) => {
            console.log('Canvas created successfully');
            gl.setClearColor('#000000');
            console.log('Scene children:', scene.children.length);
          }}
        >
          <color attach='background' args={['black']} />
          <ambientLight intensity={0.25} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <OrbitControls maxDistance={450} minDistance={50} makeDefault />

          {/* Debug: Simple box to test if rendering works */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="orange" />
          </mesh>

          <Physics gravity={[0, 0, 0]}>
            <Scene />
          </Physics>
          
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          </EffectComposer>
          </Canvas>
        {/* </Suspense> */}
      </div>
      
      {/* Sidebar positioned at top-left */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          width: '25%',
          height: 'calc(100vh - 80px - 16px)',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        <CelestialSidebar 
          isOpen={isOpen}
          onClose={closeSidebar}
          celestialBody={selectedBody}
        />
      </div>
    </>
  );
}

// AggniversePlanets component
const AggniversePlanets = () => {
  return (
    <SidebarProvider>
      <AggniverseContent />
    </SidebarProvider>
  );
}

export default AggniversePlanets 