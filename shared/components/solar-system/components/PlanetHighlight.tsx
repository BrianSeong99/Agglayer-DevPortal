import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'
import { Group, Vector3 } from 'three'
import { useSidebar } from '../context/Sidebar'
import { useCamera } from '../context/Camera'

interface CelestialHighlightProps {
  chains?: any[]
}

const CelestialHighlight: React.FC<CelestialHighlightProps> = ({ chains = [] }) => {
  const groupRef = useRef<Group>(null)
  const { selectedBody, isOpen } = useSidebar()
  const { focusedObject } = useCamera()
  
  // Get color scheme based on environment - matching screenshot colors
  const getColorScheme = () => {
    if (selectedBody?.type === 'sun') {
      // Core environment - orange themes
      return {
        outer: '#ffa500',     // Orange
        inner: '#ffb347',     // Light orange  
        spinning: '#ff8c00'   // Dark orange
      }
    } else if (selectedBody?.type === 'planet' && selectedBody?.data) {
      const environment = selectedBody.data.environment
      switch (environment) {
        case 'mainnet':
          return {
            outer: '#00d4aa',   // Teal (matching screenshot)
            inner: '#ffffff',   // White
            spinning: '#00b894' // Darker teal
          }
        case 'cardona':
          return {
            outer: '#ff8c42',   // Orange (matching screenshot)
            inner: '#ffffff',   // White
            spinning: '#e17055' // Darker orange
          }
        case 'bali':
          return {
            outer: '#8b5cf6',   // Purple (matching screenshot)
            inner: '#ffffff',   // White
            spinning: '#7c3aed' // Darker purple
          }
        default:
          // Fallback to mainnet colors
          return {
            outer: '#00d4aa',
            inner: '#ffffff', 
            spinning: '#00b894'
          }
      }
    }
    
    // Default fallback
    return {
      outer: '#00d4aa',
      inner: '#ffffff',
      spinning: '#00b894'
    }
  }

  useFrame((state) => {
    if (groupRef.current && isOpen && focusedObject) {
      let targetPosition: Vector3 | null = null
      let ringSize = 12 // Default size for planets

      if (selectedBody?.type === 'planet' && focusedObject.instanceId !== undefined) {
        // Get position from focused object (planet)
        if (focusedObject.object && 'translation' in focusedObject.object && typeof (focusedObject.object as any).translation === 'function') {
          const planetPosition = (focusedObject.object as any).translation()
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
            const [radius] = sizes[index] || sizes[0]
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

  const colorScheme = getColorScheme()

  return (
    <group ref={groupRef} visible={false}>
      {/* Outer glowing ring */}
      <Torus args={[12, 0.5, 8, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color={colorScheme.outer}
          transparent={true}
          opacity={0.6}
        />
      </Torus>
      
      {/* Inner ring */}
      <Torus args={[10, 0.3, 8, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color={colorScheme.inner}
          transparent={true}
          opacity={0.8}
        />
      </Torus>
      
      {/* Spinning outer effect */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[14, 0.2, 6, 24]} rotation={[0, 0, 0]}>
          <meshBasicMaterial 
            color={colorScheme.spinning}
            transparent={true}
            opacity={0.3}
          />
        </Torus>
      </group>
    </group>
  )
}

export default CelestialHighlight