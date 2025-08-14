'use client'

import { TutorialCard } from '../cards'
import { type Tutorial } from '../../data/tutorials'

interface ConceptsTutorialsProps {
  tutorials: Tutorial[]
}

export function ConceptsTutorials({ tutorials }: ConceptsTutorialsProps) {
  const conceptTutorials = tutorials.filter(t => t.category === 'concepts')
  
  if (conceptTutorials.length === 0) return null

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-2">Concepts</h3>
      <p className="text-[rgba(0,0,0,0.6)] mb-4">
        Understand the core architecture and components of Agglayer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conceptTutorials.map((tutorial, index) => (
          <TutorialCard
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            duration={tutorial.duration}
            difficulty={tutorial.difficulty}
            url={tutorial.url}
            index={index}
          />
        ))}
      </div>
    </div>
  )
} 