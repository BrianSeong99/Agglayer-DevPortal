'use client'

import { TutorialCard } from '../cards'
import { type Tutorial } from '../../data/tutorials'

interface ToolsTutorialsProps {
  tutorials: Tutorial[]
}

export function ToolsTutorials({ tutorials }: ToolsTutorialsProps) {
  const toolsTutorials = tutorials.filter(t => t.category === 'tools')
  
  if (toolsTutorials.length === 0) return null

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-2">Tools</h3>
      <p className="text-[rgba(0,0,0,0.6)] mb-4">
        Master the essential tools for building on Agglayer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsTutorials.map((tutorial, index) => (
          <TutorialCard
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            duration={tutorial.duration}
            difficulty={tutorial.difficulty}
            url={`/examples/tutorial/${tutorial.id}`}
            index={index}
          />
        ))}
      </div>
    </div>
  )
} 