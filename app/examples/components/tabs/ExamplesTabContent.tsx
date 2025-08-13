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
            techStack={example.techStack}
            stats={example.stats}
            demoUrl={example.urls.demo}
            codeUrl={example.urls.code}
            tutorialUrl={example.urls.tutorial}
            index={index}
          />
        ))}
      </div>

      {/* Explore All Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing[6] }}>
        <button style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: spacing[1.5],
          padding: `${spacing[2]} ${spacing[4]}`,
          borderRadius: '45px',
          cursor: 'pointer',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: typography.fontWeight.regular,
          color: 'rgba(17,17,17,0.6)',
          lineHeight: 1.08
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L14 8L8 14M14 8H2" stroke="rgba(17,17,17,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Explore all
        </button>
      </div>
    </motion.div>
  )
} 