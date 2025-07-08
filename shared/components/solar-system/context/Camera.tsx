import { createContext, useContext, useState, useRef, ReactNode } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3, Matrix4, Object3D, InstancedMesh } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

interface FocusedObject {
    object: Object3D
    instanceId?: number
}

interface CameraContextType {
    focusedObject: FocusedObject | null
    handleFocus: (event: any) => void
}

const CameraContext = createContext<CameraContextType | undefined>(undefined)

export const useCamera = () => {
    const context = useContext(CameraContext)
    if (!context) {
        throw new Error('useCamera must be used within a CameraProvider')
    }
    return context
}

interface CameraProviderProps {
    children: ReactNode
}

export const CameraProvider = ({ children }: CameraProviderProps) => {
    const { camera, controls } = useThree()
    const cameraTarget = useRef(new Vector3())
    const [focusedObject, setFocusedObject] = useState<FocusedObject | null>(null)
    const orbitControls = controls as unknown as OrbitControlsImpl | undefined

    useFrame(() => {
        if (focusedObject) {
            let target

            if (focusedObject.instanceId !== undefined && focusedObject.object instanceof InstancedMesh) {
                const instanceMatrix = new Matrix4()
                focusedObject.object.getMatrixAt(focusedObject.instanceId, instanceMatrix)
                target = new Vector3().setFromMatrixPosition(instanceMatrix)
            } else {
                target = focusedObject.object.position.clone()
            }

            const smoothness = 0.05
            cameraTarget.current.lerp(target, smoothness)
            camera.lookAt(cameraTarget.current)

            if (orbitControls) {
                orbitControls.target.copy(cameraTarget.current)
                orbitControls.update()
            }
        }
    })

    // Handle focus
    const handleFocus = (event: any) => {
        const object = event.object
        const instanceId = event.instanceId

        if (instanceId !== undefined) {
            setFocusedObject({ object, instanceId })
        } else {
            setFocusedObject({ object })
        }
    }

    return <CameraContext.Provider value={{ focusedObject, handleFocus }}>{children}</CameraContext.Provider>
} 