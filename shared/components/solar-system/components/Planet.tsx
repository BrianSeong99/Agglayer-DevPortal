import React, { useRef, useMemo } from 'react'
import { Color, Texture } from 'three'
import { useTexture } from '@react-three/drei'
import { useCamera } from '../context/Camera'

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
    count: number;
    chains?: Chain[];
}

const Planet = ({ count, chains }: PlanetProps) => {
    const mesh = useRef<any>()
    const { handleFocus } = useCamera()

    // Helper function to convert chain name to filename
    const getTextureFileName = (chainName: string): string => {
        return chainName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }

    // Create texture paths for all chains
    const texturePaths = useMemo(() => {
        if (!chains) return ['/textures/planets/default.jpg']
        
        return chains.map(chain => {
            const fileName = getTextureFileName(chain.name)
            return `/chains/${fileName}.png`
        })
    }, [chains])

    // Load textures (with fallback)
    const textures = useTexture(texturePaths, (textures) => {
        // Handle successful load
        const textureArray = Array.isArray(textures) ? textures : [textures]
        
        // Set repeat for each texture to reduce stretching
        textureArray.forEach(texture => {
            texture.repeat.set(2, 1)
            texture.wrapS = texture.wrapT = 1000 // RepeatWrapping
            texture.needsUpdate = true
        })
        
        return textureArray
    })

    // Use first texture as default for instanced material
    const primaryTexture = Array.isArray(textures) ? textures[0] : textures

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} onClick={handleFocus} castShadow receiveShadow>
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial 
                map={primaryTexture} 
                metalness={0.1} 
                roughness={0.5} 
            />
        </instancedMesh>
    )
}

export default Planet 