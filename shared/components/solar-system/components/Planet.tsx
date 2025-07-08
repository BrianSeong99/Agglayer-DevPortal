import React, { useRef, memo } from 'react'
import { useTexture } from '@react-three/drei'

export interface Chain {
  name: string;
  rollupId: number;
  chainId: number;
  forkId: number;
  rollupTypeId: number;
  rollupVerifierType: string;
  lastVerified: string;
  sequencerUrl: string;
  networkLiveness: string;
}

interface PlanetProps {
    chains: Chain[];
}

const Planet = ({ chains }: PlanetProps) => {
    const mesh = useRef<any>()
    const count = chains.length

    // Load the katana texture with horizontal repeat
    const katanaTexture = useTexture('/chains/katana.png', (texture) => {
        texture.repeat.set(2, 1) // Repeat twice horizontally, once vertically
        texture.wrapS = texture.wrapT = 1000 // RepeatWrapping
        texture.needsUpdate = true
    })

    return (
        <instancedMesh 
            ref={mesh} 
            args={[undefined, undefined, count]}
            castShadow 
            receiveShadow
            frustumCulled={false}
        >
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial 
                map={katanaTexture}
                metalness={0.1} 
                roughness={0.5}
            />
        </instancedMesh>
    )
}

export default memo(Planet)