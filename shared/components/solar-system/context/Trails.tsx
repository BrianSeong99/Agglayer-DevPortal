import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react'
import { Vector3 } from 'three'
import { Line } from '@react-three/drei'

interface TrailsState {
    [key: string]: Vector3[]
}

interface TrailContextType {
    addTrailPoint: (key: string, position: Vector3) => void
    clearTrail: (key: string) => void
}

const TrailContext = createContext<TrailContextType | undefined>(undefined)

export const useTrails = () => {
    const context = useContext(TrailContext)
    if (!context) {
        throw new Error('useTrails must be used within a TrailProvider')
    }
    return context
}

interface TrailProviderProps {
    children: ReactNode
}

export const TrailProvider = ({ children }: TrailProviderProps) => {
    const [trails, setTrails] = useState<TrailsState>({})

    const addTrailPoint = useCallback((key: string, position: Vector3) => {
        setTrails((prevTrails) => {
            const trail = prevTrails[key] || []
            const newTrail = trail.length >= 300 ? trail.slice(1) : trail
            const lastPoint = newTrail[newTrail.length - 1]
            if (!lastPoint || lastPoint.distanceToSquared(position) > 1) {
                return { ...prevTrails, [key]: [...newTrail, position.clone()] }
            }
            return prevTrails
        })
    }, [])

    const clearTrail = useCallback((key: string) => {
        setTrails((prevTrails) => {
            const { [key]: _, ...rest } = prevTrails // Destructuring to omit the key
            return rest
        })
    }, [])

    return (
        <TrailContext.Provider value={{ addTrailPoint, clearTrail }}>
            {children}
            {Object.entries(trails).map(([key, positions]) => (
                <Line key={key} points={positions} color='rgba(30,30,30)' />
            ))}
        </TrailContext.Provider>
    )
} 