import React, { useRef, useMemo } from 'react'
import { Color } from 'three'
import { useCamera } from '../context/Camera'

interface PlanetProps {
    count: number
}

const Planet = ({ count }: PlanetProps) => {
    const mesh = useRef<any>()
    const { handleFocus } = useCamera()

    // Create a random color for each instance
    const instanceColors = useMemo(() => {
        const colors = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            // Random natural looking planet hue
            const hue = 250 + Math.random() * 50

            // Random saturation and lightness
            const saturation = 40 + Math.random() * 60
            const lightness = 60

            const hslColor = new Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
            hslColor.toArray(colors, i * 3)
        }
        return colors
    }, [count])

    return (
        <instancedMesh ref={mesh} args={[null, null, count]} onClick={handleFocus} castShadow receiveShadow>
            <sphereGeometry args={[2, 32, 32]}>
                <instancedBufferAttribute attach='attributes-color' args={[instanceColors, 3]} />
            </sphereGeometry>
            <meshStandardMaterial vertexColors />
        </instancedMesh>
    )
}

export default Planet 