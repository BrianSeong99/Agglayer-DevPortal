'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { typography, colors, spacing, radius, motionTokens } from '@/shared/design-system'

interface QuickAction {
  label: string
  url: string
  external?: boolean
}

interface Tool {
  id: string
  name: string
  icon: string
  description: string
  quickActions: QuickAction[]
}

interface EcosystemToolCardProps {
  tool: Tool
  index: number
}

export default function EcosystemToolCard({ tool, index }: EcosystemToolCardProps) {
  return (
    <motion.div
      initial={motionTokens.card.initial}
      whileInView={motionTokens.card.whileInView}
      transition={{
        ...motionTokens.card.transition,
        delay: index * 0.1
      }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      style={{
        backgroundColor: 'rgba(255,255,255,0)',
        borderRadius: radius.lg,
        border: `1px solid ${colors.neutral.gray[100]}`, // #f7fafe
        boxShadow: '0px 1px 5px -4px rgba(19,19,22,0.7)',
        padding: spacing[6], // 24px
        gap: spacing[6], // 24px
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: spacing[8], // 32px
          height: spacing[8], // 32px
          position: 'relative',
          flexShrink: 0,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30.667px',
            height: '30.667px'
          }}
        >
          {tool.icon.startsWith('/img/') ? (
            <img 
              src={tool.icon} 
              alt={tool.name} 
              width={30} 
              height={30}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: '-1.63%',
                backgroundColor: `rgba(${colors.primary.rgb}, 0.2)`,
                borderRadius: radius.sm
              }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3], // 12px
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 0,
          position: 'relative',
          flexShrink: 0,
          width: '100%'
        }}
      >
        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
            position: 'relative',
            flexShrink: 0,
            width: '100%'
          }}
        >
          <h3
            style={{
              fontFamily: typography.textStyles.h6.fontFamily,
              fontSize: typography.textStyles.h6.fontSize,
              fontWeight: typography.textStyles.h6.fontWeight,
              lineHeight: typography.textStyles.h6.lineHeight,
              color: colors.text.primary,
              margin: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
              textAlign: 'left'
            }}
          >
            {tool.name}
          </h3>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: typography.textStyles.bodySmall.fontFamily,
            fontSize: typography.textStyles.bodySmall.fontSize,
            fontWeight: typography.textStyles.bodySmall.fontWeight,
            lineHeight: typography.textStyles.bodySmall.lineHeight,
            color: colors.text.tertiary,
            margin: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
            textAlign: 'left'
          }}
        >
          {tool.description}
        </p>
      </div>

      {/* Action Link */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: spacing[1.5], // 6px
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 0,
          position: 'relative',
          flexShrink: 0
        }}
      >
        <a
          href={tool.quickActions[0].url}
          target={tool.quickActions[0].external ? '_blank' : undefined}
          rel={tool.quickActions[0].external ? 'noopener noreferrer' : undefined}
          style={{
            fontFamily: typography.fontFamily.body.join(', '), // Inter
            fontSize: typography.fontSize.xs, // 12px
            fontWeight: typography.fontWeight.medium, // 500
            lineHeight: '12px',
            color: colors.primary.DEFAULT, // #0071f7
            textDecoration: 'none',
            whiteSpace: 'pre',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0
          }}
        >
          {tool.quickActions[0].label}
        </a>
        
        {tool.quickActions[0].external && (
          <div
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '12px',
              height: '12px'
            }}
          >
            <ArrowTopRightOnSquareIcon 
              style={{ 
                width: '100%', 
                height: '100%',
                color: colors.primary.DEFAULT
              }} 
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
