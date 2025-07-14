import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Ring, Torus } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import { useSidebar } from '../context/Sidebar'
import { useCamera } from '../context/Camera'

interface CelestialHighlightProps {
  planetsRef?: React.RefObject<any>
  sunRef?: React.RefObject<any>
  chains?: any[]
}

const CelestialHighlight: React.FC<CelestialHighlightProps> = ({ planetsRef, sunRef, chains = [] }) => {
  const groupRef = useRef<Group>(null)
  const { selectedBody, isOpen } = useSidebar()
  const { focusedObject } = useCamera()

  useFrame((state) => {
    if (groupRef.current && isOpen && focusedObject) {
      let targetPosition: Vector3 | null = null
      let ringSize = 12 // Default size for planets

      if (selectedBody?.type === 'planet' && focusedObject.instanceId !== undefined) {
        // Get position from focused object (planet)
        if (focusedObject.object && typeof focusedObject.object.translation === 'function') {
          const planetPosition = focusedObject.object.translation()
          targetPosition = new Vector3(planetPosition.x, planetPosition.y, planetPosition.z)
          ringSize = 12 // Planet ring size
        }
      } else if (selectedBody?.type === 'sun') {
        // Get sun position (at origin for most cases)
        targetPosition = new Vector3(0, 0, 0)
        ringSize = 20 // Larger ring for sun
      }

      if (targetPosition) {
        groupRef.current.position.copy(targetPosition)
        
        // Add pulsing animation
        const time = state.clock.elapsedTime
        const scale = 1 + Math.sin(time * 3) * 0.1 // Pulsing effect
        groupRef.current.scale.setScalar(scale)
        
        // Set ring sizes based on celestial body type
        const baseSize = selectedBody?.type === 'sun' ? 20 : 12
        
        // Update geometry if needed (simplified approach)
        groupRef.current.children.forEach((child: any, index) => {
          if (child.geometry && child.geometry.type === 'TorusGeometry') {
            const sizes = [
              [baseSize, 0.5], // Outer ring
              [baseSize - 2, 0.3], // Inner ring
              [baseSize + 2, 0.2] // Spinning ring
            ]
            const [radius, tube] = sizes[index] || sizes[0]
            child.scale.setScalar(radius / 12) // Scale relative to default size
          }
        })
        
        // Make it visible
        groupRef.current.visible = true
      } else {
        groupRef.current.visible = false
      }
    } else {
      // Hide when nothing is selected
      if (groupRef.current) {
        groupRef.current.visible = false
      }
    }
  })

  return (
    <group ref={groupRef} visible={false}>
      {/* Outer glowing ring */}
      <Torus args={[12, 0.5, 8, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color="#00ffff" 
          transparent={true}
          opacity={0.6}
        />
      </Torus>
      
      {/* Inner ring */}
      <Torus args={[10, 0.3, 8, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true}
          opacity={0.8}
        />
      </Torus>
      
      {/* Spinning outer effect */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[14, 0.2, 6, 24]} rotation={[0, 0, 0]}>
          <meshBasicMaterial 
            color="#00aaff" 
            transparent={true}
            opacity={0.3}
          />
        </Torus>
      </group>
    </group>
  )
}

export default CelestialHighlight