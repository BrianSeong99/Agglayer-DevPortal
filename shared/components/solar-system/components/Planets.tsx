import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedRigidBodies } from '@react-three/rapier'
import { Vector3 } from 'three'

import { calculateInitialPosition, calculateInitialVelocity } from '../utils/planetCalculations'
import { useTrails } from '../context/Trails'

import Planet from './Planet'

interface PlanetData {
    key: string
    position: Vector3
    linearVelocity: [number, number, number]
    scale: number
    userData: { type: string; key: string }
}

interface PlanetsProps {
    count?: number
}

// Planets component
const Planets = ({ count = 14 }: PlanetsProps) => {
    const { addTrailPoint } = useTrails()

    const planetsRef = useRef<any>()
    const [planetCount, setPlanetCount] = useState(count)

    // Planet props
    const newPlanet = (): PlanetData => {
        const key = 'instance_' + Math.random()
        const position = calculateInitialPosition(false)
        const velocity = calculateInitialVelocity(position, false)
        const linearVelocity: [number, number, number] = [velocity.x, velocity.y, velocity.z]
        const scale = 0.5 + Math.random() * 1.5

        return { key, position, linearVelocity, scale, userData: { type: 'Planet', key } }
    }

    // Set up the initial planet data
    const planetData = useMemo(() => {
        const planets: PlanetData[] = []
        for (let i = 0; i < count; i++) {
            planets.push(newPlanet())
        }
        return planets
    }, [count])

    // Update the planet count
    useEffect(() => {
        if (planetsRef.current) {
            // Set the planet count
            setPlanetCount(planetsRef.current.length)

            // add some initial spin to the planets
            planetsRef.current.forEach((planet: any) => {
                planet.setAngvel(new Vector3(0, Math.random() - 0.5, 0))
            })
        }
    }, [planetsRef.current])

    // Add a trail point for each planet
    useFrame(() => {
        planetsRef.current?.forEach((planet: any) => {
            const position = planet.translation()
            addTrailPoint(planet.userData.key, new Vector3(position.x, position.y, position.z))
        })
    })


    return (
        <InstancedRigidBodies 
            ref={planetsRef} 
            instances={planetData} 
            colliders="ball"
            collisionGroups={0x0002} // Group 2
            solverGroups={0x0002} // Only solve with group 2 (no actual collision solving)
        >
            <Planet count={planetCount} />
        </InstancedRigidBodies>
    )
}

export default Planets 