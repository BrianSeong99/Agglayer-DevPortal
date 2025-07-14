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
    clearFocus: () => void
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
            } else if (focusedObject.object.translation) {
                // For physics bodies (RigidBody objects)
                const position = focusedObject.object.translation()
                target = new Vector3(position.x, position.y, position.z)
            } else if (focusedObject.object.position) {
                // For regular meshes
                target = focusedObject.object.position.clone()
            } else {
                // Fallback to origin if no position available
                target = new Vector3(0, 0, 0)
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

    // Clear focus manually
    const clearFocus = () => {
        setFocusedObject(null)
    }

    return <CameraContext.Provider value={{ focusedObject, handleFocus, clearFocus }}>{children}</CameraContext.Provider>
} 