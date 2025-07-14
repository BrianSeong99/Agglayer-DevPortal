import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedRigidBodies } from '@react-three/rapier'
import { Vector3 } from 'three'

import { calculateInitialPosition, calculateInitialVelocity } from '../utils/planetCalculations'
import { useTrails } from '../context/Trails'
import { useCamera } from '../context/Camera'
import { useSidebar } from '../context/Sidebar'

import Planet, { Chain } from './Planet'

// Click helper component
const PlanetClickHelper = ({ index, planetsRef, onPlanetClick }: {
    index: number
    planetsRef: React.RefObject<any>
    onPlanetClick: (index: number) => void
}) => {
    const meshRef = useRef<any>()

    useFrame(() => {
        if (meshRef.current && planetsRef.current && planetsRef.current[index]) {
            const position = planetsRef.current[index].translation()
            meshRef.current.position.copy(position)
        }
    })

    return (
        <mesh
            ref={meshRef}
            onClick={(e) => {
                e.stopPropagation()
                onPlanetClick(index)
            }}
        >
            <sphereGeometry args={[3, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>
    )
}

interface PlanetData {
    key: string
    position: Vector3
    linearVelocity: [number, number, number]
    scale: number
    userData: { type: string; key: string }
}

interface PlanetsProps {
    chains: Chain[];
    onPlanetsRefReady?: (ref: React.RefObject<any>) => void;
}

// Planets component
const Planets = ({ chains, onPlanetsRefReady }: PlanetsProps) => {
    const { addTrailPoint } = useTrails()
    const { handleFocus } = useCamera()
    const { openSidebar } = useSidebar()

    const planetsRef = useRef<any>()
    const [planetCount, setPlanetCount] = useState(chains.length)

    // Set up the initial planet data based on chains
    const planetData = useMemo(() => {
        const planets: PlanetData[] = []
        chains.forEach((chain, index) => {
            const key = `chain_${chain.rollupId}_${index}`
            const position = calculateInitialPosition(false, chain.rollupId)
            const velocity = calculateInitialVelocity(position, false)
            const linearVelocity: [number, number, number] = [velocity.x, velocity.y, velocity.z]
            const scale = 0.5 // All planets same size
            
            planets.push({ 
                key, 
                position, 
                linearVelocity, 
                scale, 
                userData: { type: 'Planet', key } 
            })
        })
        return planets
    }, [chains])

    // Update the planet count and notify parent when ref is ready
    useEffect(() => {
        if (planetsRef.current) {
            setPlanetCount(planetsRef.current.length)
            
            // Add initial spin
            planetsRef.current.forEach((planet: any) => {
                planet.setAngvel(new Vector3(0, Math.random() - 0.5, 0))
            })
            
            // Notify parent that planets ref is ready
            onPlanetsRefReady?.(planetsRef)
        }
    }, [planetsRef.current, onPlanetsRefReady])

    // Add a trail point for each planet
    useFrame(() => {
        planetsRef.current?.forEach((planet: any) => {
            const position = planet.translation()
            addTrailPoint(planet.userData.key, new Vector3(position.x, position.y, position.z))
        })
    })

    return (
        <>
            <InstancedRigidBodies 
                ref={planetsRef} 
                instances={planetData} 
                colliders="ball"
                collisionGroups={0x0002}
                solverGroups={0x0002}
            >
                <Planet chains={chains} />
            </InstancedRigidBodies>
            
            {/* Click helper meshes */}
            {chains.map((chain, index) => (
                <PlanetClickHelper 
                    key={`click-${index}`}
                    index={index}
                    planetsRef={planetsRef}
                    onPlanetClick={(idx) => {
                        if (planetsRef.current && planetsRef.current[idx]) {
                            handleFocus({
                                object: planetsRef.current[idx],
                                instanceId: idx
                            })
                            openSidebar({ type: 'planet', data: chains[idx] })
                        }
                    }}
                />
            ))}
            
        </>
    )
}

export default Planets