import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Vector3 } from 'three'
import Explosion from '../components/Explosion'

interface ExplosionData {
    position: Vector3
    lookAt: Vector3
    id: number
}

interface ExplosionContextType {
    triggerExplosion: (position: Vector3, lookAt: Vector3) => void
}

const ExplosionContext = createContext<ExplosionContextType | undefined>(undefined)

export const useExplosion = () => {
    const context = useContext(ExplosionContext)
    if (!context) {
        throw new Error('useExplosion must be used within an ExplosionProvider')
    }
    return context
}

interface ExplosionProviderProps {
    children: ReactNode
}

export const ExplosionProvider = ({ children }: ExplosionProviderProps) => {
    const [explosions, setExplosions] = useState<ExplosionData[]>([])

    const triggerExplosion = (position: Vector3, lookAt: Vector3) => {
        setExplosions((prev) => [...prev, { position, lookAt, id: Math.random() }])
    }

    const handleExplosionComplete = (id: number) => {
        setExplosions((prev) => prev.filter((explosion) => explosion.id !== id))
    }

    return (
        <ExplosionContext.Provider value={{ triggerExplosion }}>
            {children}
            {explosions.map(({ id, position, lookAt }) => (
                <Explosion key={id} id={id} position={position} lookAt={lookAt} onComplete={() => handleExplosionComplete(id)} />
            ))}
        </ExplosionContext.Provider>
    )
} 