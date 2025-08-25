'use client'

import { motion } from 'framer-motion'
import { CodeBlock } from '../shared'
import { type CodeSnippet } from '../../data/codeSnippets'
import { motionTokens, typography, colors, spacing, radius } from '@/shared/design-system'

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
        {snippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: colors.background.secondary,
              borderRadius: radius.lg,
              padding: spacing[6]
            }}
          >
            <h3 style={{
              fontFamily: typography.textStyles.h5.fontFamily,
              fontSize: typography.textStyles.h5.fontSize,
              fontWeight: typography.textStyles.h5.fontWeight,
              lineHeight: typography.textStyles.h5.lineHeight,
              color: colors.text.primary,
              margin: 0,
              marginBottom: spacing[2]
            }}>
              {snippet.title}
            </h3>
            <p style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.textStyles.bodySmall.fontSize,
              fontWeight: typography.textStyles.bodySmall.fontWeight,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              color: colors.text.tertiary,
              margin: 0,
              marginBottom: spacing[4]
            }}>
              {snippet.description}
            </p>
            <CodeBlock code={snippet.code} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 