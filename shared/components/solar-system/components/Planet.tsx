import React, { useRef, useMemo } from 'react'
import { Color } from 'three'
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

    // Generate colors for each instance based on chain data if available
    const colors = useMemo(() => {
        if (!chains) {
            // Fallback to random colors if no chains provided
            return Array.from({ length: count }, () => new Color(Math.random(), Math.random(), Math.random()))
        }
        
        return chains.map((chain: Chain) => {
            // Hash the chain name to a hue
            let hash = 0;
            for (let i = 0; i < chain.name.length; i++) {
                hash = chain.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const hue = 200 + (hash % 100); // 200-300 range
            return new Color(`hsl(${hue}, 60%, 60%)`);
        })
    }, [count, chains]);

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} onClick={handleFocus} castShadow receiveShadow>
            <sphereGeometry args={[5, 32, 32]} />
            <meshStandardMaterial color="orange" metalness={0.1} roughness={0.5} />
        </instancedMesh>
    )
}

export default Planet 