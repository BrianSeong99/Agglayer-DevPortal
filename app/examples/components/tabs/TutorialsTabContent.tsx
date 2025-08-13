'use client'

import { motion } from 'framer-motion'
import { ConceptsTutorials, ToolsTutorials, AppTutorialsList } from '../sections'
import { type Tutorial } from '../../data/tutorials'
import { motionTokens } from '@/shared/design-system'

interface TutorialsTabContentProps {
  tutorials: Tutorial[]
  isActive: boolean
}

export function TutorialsTabContent({ tutorials, isActive }: TutorialsTabContentProps) {
  if (!isActive) return null

  return (
    <motion.div
      initial={motionTokens.section.initial}
      whileInView={motionTokens.section.whileInView}
      transition={motionTokens.section.transition}
      viewport={{ once: true }}
    >
      {/* Tutorials organized by category */}
      <div className="space-y-12">
        <ConceptsTutorials tutorials={tutorials} />
        <ToolsTutorials tutorials={tutorials} />
        <AppTutorialsList tutorials={tutorials} />
      </div>
    </motion.div>
  )
} 