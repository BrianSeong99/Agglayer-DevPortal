'use client'

import { motion } from 'framer-motion'
import { ExampleCard } from '../cards'
import { type Example } from '../../data/examples'
import { typography, spacing, motionTokens } from '@/shared/design-system'

interface ExamplesTabContentProps {
  examples: Example[]
  isActive: boolean
}

export function ExamplesTabContent({ examples, isActive }: ExamplesTabContentProps) {
  if (!isActive) return null

  const displayedExamples = examples.slice(0, 6)

  return (
    <motion.div
      initial={motionTokens.section.initial}
      whileInView={motionTokens.section.whileInView}
      transition={motionTokens.section.transition}
      viewport={{ once: true }}
      style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}
    >
      {/* Examples Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: spacing[3],
        width: '100%'
      }}>
        {displayedExamples.map((example, index) => (
          <ExampleCard
            key={example.id}
            title={example.title}
            description={example.description}
            image={example.icon}
            techStack={example.techStack}
            demoUrl={example.urls.demo}
            codeUrl={example.urls.code}
            tutorialUrl={example.urls.tutorial}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
} 