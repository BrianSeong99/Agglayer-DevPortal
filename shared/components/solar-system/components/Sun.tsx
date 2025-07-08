import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { SUN_RADIUS, SUN_MASS } from '../config/constants'
import { useCamera } from '../context/Camera'


const Sun = () => {
    const { handleFocus } = useCamera()
    const meshRef = useRef<any>()

    // Load a texture with horizontal repeat (fallback to katana since SVG doesn't work well)
    const sunTexture = useTexture('/chains/agglayer.png', (texture) => {
        texture.repeat.set(2, 1) // Repeat more times for the larger sun
        texture.wrapS = texture.wrapT = 1000 // RepeatWrapping
        texture.needsUpdate = true
    })

    // Rotate the sun slowly
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005
        }
    })

    return (
        <RigidBody 
            colliders="ball" 
            userData={{ type: 'Sun' }} 
            type='kinematicPosition' 
            mass={SUN_MASS}
            collisionGroups={0x0001} // Group 1
            solverGroups={0x0001} // Only solve with group 1 (no collision with planets)
        >
            <mesh ref={meshRef} onClick={handleFocus}>
                <sphereGeometry args={[SUN_RADIUS, 32, 32]} />
                <meshStandardMaterial 
                    map={sunTexture}
                    emissive={'#ffffff'}
                    emissiveIntensity={0.2}
                    metalness={0.2}
                    roughness={0.4}
                />
            </mesh>

            <pointLight position={[0, 0, 0]} intensity={50000} color={'rgb(255, 255, 255)'} />
        </RigidBody>
    )
}


export default Sun 