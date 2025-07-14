import { Vector3 } from 'three'
import { SUN_RADIUS, SUN_MASS, SPAWN_RADIUS, GRAVITATIONAL_CONSTANT } from '../config/constants'

// Get position based on rollupId or random if not provided
export const calculateInitialPosition = (isEntry = false, rollupId?: number): Vector3 => {
    let theta: number
    let radius: number
    let y: number
    
    if (rollupId !== undefined) {
        // Use rollupId to create deterministic position with much better spacing
        theta = (rollupId * 1.618) % (Math.PI * 2) // Golden ratio for better distribution
        // Create multiple orbital rings based on rollupId ranges
        let ringRadius = SUN_RADIUS * 5 // Better distance from sun
        if (rollupId >= 100) ringRadius = SUN_RADIUS * 7 // Cardona ring
        if (rollupId >= 200) ringRadius = SUN_RADIUS * 9 // Bali ring
        
        radius = isEntry ? SPAWN_RADIUS * 2 : ringRadius + (rollupId % 50) / 50 * SUN_RADIUS * 2
        y = (rollupId % 40) - 20 // Y position between -20 and 20 for more vertical spread
    } else {
        // Fallback to random
        theta = Math.random() * Math.PI * 2
        radius = isEntry ? SPAWN_RADIUS * 1.5 : Math.random() * SPAWN_RADIUS + SUN_RADIUS * 3
        y = Math.random() * 10
    }
    
    const x = Math.cos(theta) * radius
    const z = Math.sin(theta) * radius
    return new Vector3(x, y, z)
}

// Calculate the initial velocity of the planet
export const calculateInitialVelocity = (position: Vector3, respawn: boolean): Vector3 => {
    const radialVector = new Vector3().copy(position)
    const distance = radialVector.length()
    const orbitalSpeed = Math.sqrt((GRAVITATIONAL_CONSTANT * SUN_MASS) / distance)
    const upVector = new Vector3(0, 1, 0)
    const velocity = new Vector3().crossVectors(radialVector, upVector).normalize().multiplyScalar(orbitalSpeed).multiplyScalar(20000)

    if (respawn) {
        velocity.multiplyScalar(0.75)
    }

    return velocity
} 