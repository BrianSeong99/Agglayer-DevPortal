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
    setSidebarOffset: (isOpen: boolean) => void
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
    const cameraOffset = useRef(new Vector3())
    const [focusedObject, setFocusedObject] = useState<FocusedObject | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
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
            
            // Calculate offset target for sidebar positioning
            let lookAtTarget = cameraTarget.current.clone()
            
            if (sidebarOpen) {
                const sidebarWidth = 400
                const windowWidth = window.innerWidth
                
                // Calculate where we want the planet to appear (center of remaining space)
                const targetPixelX = (windowWidth - sidebarWidth) / 2 + sidebarWidth
                const currentCenterX = windowWidth / 2
                const offsetPixelX = targetPixelX - currentCenterX
                
                // Convert screen offset to world offset
                const distance = camera.position.distanceTo(cameraTarget.current)
                const fov = camera.fov * (Math.PI / 180)
                const aspect = windowWidth / window.innerHeight
                const viewWidth = 2 * Math.tan(fov / 2) * distance * aspect
                const worldOffsetX = (offsetPixelX / windowWidth) * viewWidth
                
                // Create offset target - move target right to make planet appear right  
                lookAtTarget.x += worldOffsetX
                
                // Zoom in by moving camera closer to planet
                const zoomFactor = 0.001
                const direction = camera.position.clone().sub(cameraTarget.current).normalize()
                const zoomedDistance = distance * zoomFactor
                const idealCameraPos = cameraTarget.current.clone().add(direction.multiplyScalar(zoomedDistance))
                
                camera.position.lerp(idealCameraPos, smoothness)
            }
            
            camera.lookAt(lookAtTarget)

            if (orbitControls) {
                orbitControls.target.copy(lookAtTarget)
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

    // Handle sidebar offset
    const setSidebarOffset = (isOpen: boolean) => {
        setSidebarOpen(isOpen)
    }

    return <CameraContext.Provider value={{ focusedObject, handleFocus, setSidebarOffset }}>{children}</CameraContext.Provider>
} 