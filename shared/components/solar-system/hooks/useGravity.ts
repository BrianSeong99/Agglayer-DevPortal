import { useRapier, useBeforePhysicsStep } from '@react-three/rapier'
import { Vector3 } from 'three'
import { GRAVITATIONAL_CONSTANT, SCALE_FACTOR } from '../config/constants'

const useGravity = () => {
    const { world } = useRapier()

    useBeforePhysicsStep(() => {
        if (!world) return

        const impulseVector = new Vector3()

        // Find the sun body
        let sunBody: any = null
        world.bodies.forEach((body) => {
            if ((body.userData as any)?.type === 'Sun') {
                sunBody = body
            }
        })

        if (!sunBody) return

        const sunMass = sunBody.mass()
        const sunPosition = sunBody.translation()
        const sunPositionVector = new Vector3(sunPosition.x, sunPosition.y, sunPosition.z)

        // Apply gravity only between Sun and planets
        world.bodies.forEach((planetBody) => {
            if (planetBody === sunBody || planetBody.isSleeping()) return
            if ((planetBody.userData as any)?.type !== 'Planet') return

            const planetMass = planetBody.mass()
            const planetPosition = planetBody.translation()
            const planetPositionVector = new Vector3(planetPosition.x, planetPosition.y, planetPosition.z)

            const distance = planetPositionVector.distanceTo(sunPositionVector)

            if (distance === 0) return

            const force = (GRAVITATIONAL_CONSTANT * planetMass * sunMass) / Math.pow(distance * SCALE_FACTOR, 2)
            impulseVector.subVectors(sunPositionVector, planetPositionVector).normalize().multiplyScalar(force)
            planetBody.applyImpulse(impulseVector, true)
        })
    })
}

export default useGravity 