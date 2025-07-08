"use client";
import React, { useRef } from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'

import Scene from './solar-system/components/Scene'

// AggniversePlanets component
const AggniversePlanets = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto">
      {/* <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-white">Loading...</div>}> */}
        <Canvas 
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
  );
}

export default AggniversePlanets 