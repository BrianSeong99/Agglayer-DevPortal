import React, { useRef, memo, useMemo } from 'react'
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
    count: number;
    chains?: Chain[];
}

const Planet = ({ count, chains }: PlanetProps) => {
    const mesh = useRef<any>()

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

    // Load textures with repeat settings
    const textures = useTexture(texturePaths, (textures) => {
        const textureArray = Array.isArray(textures) ? textures : [textures]
        
        textureArray.forEach(texture => {
            texture.repeat.set(2, 1)
            texture.wrapS = texture.wrapT = 1000
            texture.needsUpdate = true
        })
        
        return textureArray
    })

    const primaryTexture = Array.isArray(textures) ? textures[0] : textures

    return (
        <instancedMesh 
            ref={mesh} 
            args={[undefined, undefined, count]} 
            castShadow 
            receiveShadow
        >
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial 
                map={primaryTexture}
                metalness={0.1} 
                roughness={0.5} 
            />
        </instancedMesh>
    )
}

export default memo(Planet) 