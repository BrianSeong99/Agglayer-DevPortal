'use client'

import { motion } from 'framer-motion'
import { CodeBlock } from '../shared'
import { type CodeSnippet } from '../../data/codeSnippets'
import { motionTokens } from '@/shared/design-system'

interface CodeSnippetsTabContentProps {
  snippets: CodeSnippet[]
  isActive: boolean
}

export function CodeSnippetsTabContent({ snippets, isActive }: CodeSnippetsTabContentProps) {
  if (!isActive) return null

  return (
    <motion.div
      initial={motionTokens.section.initial}
      whileInView={motionTokens.section.whileInView}
      transition={motionTokens.section.transition}
      viewport={{ once: true }}
    >
      {/* Snippet Cards */}
      <div className="space-y-6">
        {snippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F7FAFE] rounded-lg p-6"
          >
            <h3 className="text-lg font-bold text-black mb-2">{snippet.title}</h3>
            <p className="text-sm text-[rgba(0,0,0,0.6)] mb-4">{snippet.description}</p>
            <CodeBlock
              code={snippet.code}
              language={snippet.language}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 