'use client'

import { TutorialCard } from '../cards'
import { type Tutorial } from '../../data/tutorials'

interface AppTutorialsListProps {
  tutorials: Tutorial[]
}

export function AppTutorialsList({ tutorials }: AppTutorialsListProps) {
  const appTutorials = tutorials.filter(t => t.category === 'app-tutorials')
  
  if (appTutorials.length === 0) return null

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-2">App Tutorials</h3>
      <p className="text-[rgba(0,0,0,0.6)] mb-4">
        Build real applications with increasing complexity
      </p>
      <div className="space-y-8">
        {difficulties.map((difficulty) => {
          const difficultyTutorials = appTutorials.filter(t => t.difficulty === difficulty)
          
          if (difficultyTutorials.length === 0) return null

          return (
            <div key={difficulty}>
              <h4 className="text-lg font-semibold text-[rgba(0,0,0,0.6)] mb-3">{difficulty}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {difficultyTutorials.map((tutorial, index) => (
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
        })}
      </div>
    </div>
  )
} 