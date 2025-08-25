'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { typography, colors, spacing, radius, motionTokens } from '@/shared/design-system'
import { Button } from '@/shared/components'

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
  quickInstall?: string
}

interface ToolCardProps {
  tool: Tool
  index: number
}

export default function ToolCard({ tool, index }: ToolCardProps) {

  return (
    <motion.div
      initial={motionTokens.card.initial}
      whileInView={motionTokens.card.whileInView}
      transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
      style={{
        width: '100%',
        height: '230px',
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
        {tool.icon !== 'tool' ? (
          <div
            style={{
              width: spacing[8],
              height: spacing[8],
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              src={tool.icon}
              alt={`${tool.name} icon`}
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ) : null}
        
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
            width: '220px',
            minHeight: spacing[20]
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
                fontFamily: typography.textStyles.h6.fontFamily,
                fontWeight: typography.textStyles.h6.fontWeight,
                fontSize: typography.textStyles.h6.fontSize,
                lineHeight: typography.textStyles.h6.lineHeight,
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
                WebkitLineClamp: 4, // Limit to 3 lines
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
          {/* Quick Actions Row - Only show if there are quick actions */}
          {tool.quickActions && tool.quickActions.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: spacing[1.5],
                padding: 0,
                position: 'relative',
                flexShrink: 0,
                width: '100%'
              }}
            >
              <Button
                key={tool.quickActions[0].label}
                variant="primary"
                href={tool.quickActions[0].url}
              >
                {tool.quickActions[0].label}
              </Button>
              {tool.quickActions[1] ? (
                <Button
                  key={tool.quickActions[1].label}
                  variant="secondary"
                  href={tool.quickActions[1].url}
                >
                  {tool.quickActions[1].label}
                </Button>
              ) : (
                <div style={{ flex: 1 }} />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
