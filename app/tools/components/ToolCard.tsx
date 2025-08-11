'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { typography, colors, spacing, radius, motionTokens } from '@/shared/design-system'

interface QuickAction {
  label: string
  url: string
  external?: boolean
}

interface Tool {
  id: string
  name: string
  description: string
  quickActions: QuickAction[]
  quickInstall?: string
}

interface ToolCardProps {
  tool: Tool
  index: number
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <motion.div
      initial={motionTokens.card.initial}
      whileInView={motionTokens.card.whileInView}
      transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
      style={{
        width: '100%',
        height: '180px',
        backgroundColor: colors.background.secondary,
        borderRadius: radius.md,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      {/* Header Section */}
      <div 
        style={{
          display: 'flex',
          gap: spacing[2.5],
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          paddingBottom: 0,
          paddingTop: spacing[6],
          paddingLeft: spacing[6],
          paddingRight: spacing[6],
          width: '100%',
          flexShrink: 0
        }}
      >
        {/* Icon */}
        <div
          style={{
            backgroundColor: `rgba(${colors.primary.rgb}, 0.2)`,
            borderRadius: radius.sm,
            width: spacing[8],
            height: spacing[8],
            flexShrink: 0
          }}
        />
        
        {/* Title and Description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[3],
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
            position: 'relative',
            flexShrink: 0,
            width: '189px',
            minHeight: '80px' // Fixed height for consistency
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[3],
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 0,
              position: 'relative',
              flexShrink: 0,
              width: '100%'
            }}
          >
            {/* Title */}
            <h3
              style={{
                fontFamily: typography.fontFamily.heading.join(', '),
                fontWeight: typography.fontWeight.bold,
                fontSize: typography.fontSize.base,
                lineHeight: typography.lineHeight.tight,
                color: colors.text.blue.DEFAULT,
                margin: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {tool.name}
            </h3>
            
            {/* Description */}
            <p
              style={{
                fontFamily: typography.fontFamily.mono.join(', '),
                fontWeight: typography.fontWeight.regular,
                fontSize: typography.fontSize.xs,
                lineHeight: typography.lineHeight.normal,
                color: colors.text.blue.muted,
                margin: 0,
                width: '100%',
                display: '-webkit-box',
                WebkitLineClamp: 3, // Limit to 3 lines
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[6],
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: spacing[6],
          position: 'relative',
          flexShrink: 0,
          width: '100%',
          flex: 1 // Take remaining space
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[3],
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
            position: 'relative',
            flexShrink: 0,
            width: '100%'
          }}
        >
          {/* Quick Actions Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 0,
              position: 'relative',
              flexShrink: 0,
              width: '100%'
            }}
          >
            {tool.quickActions.slice(0, 3).map((action) => (
              <a
                key={action.label}
                href={action.url}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                style={{
                  backgroundColor: `rgba(${colors.primary.rgb}, 0.05)`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  paddingLeft: spacing[2],
                  paddingRight: spacing[2],
                  paddingTop: spacing[1],
                  paddingBottom: spacing[1],
                  position: 'relative',
                  borderRadius: radius.sm,
                  flexShrink: 0,
                  gap: spacing[1.5],
                  textDecoration: 'none',
                  boxShadow: `0px 0px 0px 0px inset ${colors.background.primary}, 0px 0px 0px 1px inset rgba(${colors.primary.rgb}, 0.14)`
                }}
              >
                <span
                  style={{
                    fontFamily: typography.fontFamily.body.join(', '),
                    fontWeight: typography.fontWeight.medium,
                    fontSize: typography.fontSize['2xs'],
                    lineHeight: typography.fontSize.xs,
                    color: colors.primary.DEFAULT,
                    whiteSpace: 'pre',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0
                  }}
                >
                  {action.label}
                </span>
                <div
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: typography.fontSize.xs,
                    height: typography.fontSize.xs
                  }}
                >
                  <ArrowTopRightOnSquareIcon style={{ width: '100%', height: '100%' }} />
                </div>
              </a>
            ))}
          </div>

          {/* Install Command */}
          {/* {tool.quickInstall && (
            <div
              style={{
                backgroundColor: colors.background.primary,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                overflow: 'hidden',
                padding: spacing[4],
                position: 'relative',
                borderRadius: radius.sm,
                flexShrink: 0,
                width: '100%',
                height: '44px', // Fixed height for consistency
                boxShadow: `0px 0px 0px 0px inset ${colors.background.primary}, 0px 0px 0px 1px inset rgba(${colors.primary.rgb}, 0.14)`
              }}
            >
              <code
                style={{
                  fontFamily: typography.fontFamily.mono.join(', '),
                  fontWeight: typography.fontWeight.medium,
                  fontSize: typography.fontSize['2xs'],
                  lineHeight: typography.fontSize.xs,
                  color: colors.primary.DEFAULT,
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  width: '240px', // Fixed width
                  marginRight: spacing[2]
                }}
              >
                {tool.quickInstall}
              </code>
              <button
                onClick={() => copyToClipboard(tool.quickInstall!, tool.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  position: 'relative',
                  flexShrink: 0,
                  width: typography.fontSize.xs,
                  height: typography.fontSize.xs
                }}
              >
                <DocumentDuplicateIcon
                  style={{
                    width: '100%',
                    height: '100%',
                    color: copiedId === tool.id ? colors.semantic.success : colors.neutral.gray[400]
                  }}
                />
              </button>
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  )
}
