"use client";
import React, { useRef } from "react";
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'
import { useEffect } from 'react'

import Scene from './solar-system/components/Scene'
import { SidebarProvider, useSidebar } from './solar-system/context/Sidebar'
import CelestialSidebar from './solar-system/components/CelestialSidebar'
import { CelestialSearchBar } from './solar-system/components/CelestialSearchBar'

// Component to adjust camera position for sidebar
const SidebarCameraAdjuster = () => {
  const { camera, controls } = useThree();
  const { isOpen } = useSidebar();

  useEffect(() => {
    if (!camera || !controls) return;

    // Calculate the offset needed to center the view in the available space
    const sidebarWidth = 400;
    const windowWidth = window.innerWidth;
    const centerX = sidebarWidth + (windowWidth - sidebarWidth) / 2;
    const screenCenter = windowWidth / 2;
    const offsetFromCenter = centerX - screenCenter;
    
    // Convert pixel offset to camera world space
    const scaleFactor = 0.8; // Adjust this to match the visual centering
    const targetOffsetX = (offsetFromCenter * scaleFactor) * (isOpen ? 1 : 0);
    
    // Smoothly adjust camera position
    const currentPos = camera.position.clone();
    const targetPos = currentPos.clone();
    targetPos.x = targetOffsetX;
    
    // Animate to target position
    const duration = 400; // Match CSS transition duration
    const startTime = Date.now();
    const startPos = currentPos.clone();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      camera.position.lerpVectors(startPos, targetPos, eased);
      controls.update();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [isOpen, camera, controls]);

  return null;
};

// Inner component that uses the sidebar
const AggniverseContent = () => {
  const { isOpen, selectedBody, isSearchVisible, closeSidebar } = useSidebar();
  const containerRef = useRef<HTMLDivElement>(null);

  // No transform - let camera system handle all positioning

  return (
    <>
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          pointerEvents: isOpen ? 'none' : 'none'
        }}
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
          <SidebarCameraAdjuster />

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
      
      {/* Search bar positioned at top-left, above sidebar */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          left: isOpen ? `${400 + 16}px` : '16px', // sidebar width + padding
          zIndex: 9999,
          pointerEvents: 'auto',
          transition: 'left 0.4s ease-in-out'
        }}
      >
        <CelestialSearchBar isVisible={isSearchVisible} />
      </div>

      {/* Sidebar positioned as full height panel */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '400px',
          height: '100vh',
          zIndex: 9998,
          pointerEvents: isOpen ? 'auto' : 'none'
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