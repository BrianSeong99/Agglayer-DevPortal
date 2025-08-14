'use client';

import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';
import { Button } from '@/shared/components';

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  index?: number;
}

export default function TutorialCard({
  title,
  description,
  duration,
  difficulty,
  url,
  index = 0,
}: TutorialCardProps) {
  const difficultyColors = {
    Beginner: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' },
    Intermediate: { bg: 'rgba(251, 191, 36, 0.1)', text: '#FBBF24', border: 'rgba(251, 191, 36, 0.3)' },
    Advanced: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' },
  };

  const difficultyStyle = difficulty ? difficultyColors[difficulty] : null;

  return (
    <motion.div
      initial={motionTokens.card.initial}
      whileInView={motionTokens.card.whileInView}
      transition={{
        ...motionTokens.card.transition,
        delay: index * 0.1
      }}
      viewport={{ once: true }}
      style={{
        backgroundColor: '#F7FAFE',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}
    >
      {/* Preview Image Placeholder */}
      <div style={{
        backgroundColor: '#EAF3FD',
        height: '138px',
        borderRadius: '5px',
        margin: spacing[6],
        marginBottom: spacing[2.5],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Placeholder for tutorial preview */}
      </div>

      {/* Content */}
      <div style={{
        padding: `0 ${spacing[6]} ${spacing[2.5]} ${spacing[6]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[3],
        flex: 1
      }}>
        {/* Title and Difficulty */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: spacing[3]
        }}>
          <h3 style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontSize: '15px',
            fontWeight: typography.fontWeight.bold,
            lineHeight: 1.08,
            color: 'rgba(0,46,101,0.9)',
            margin: 0,
            flex: 1
          }}>
            {title}
          </h3>
          {difficulty && difficultyStyle && (
            <div style={{
              backgroundColor: difficultyStyle.bg,
              color: difficultyStyle.text,
              border: `1px solid ${difficultyStyle.border}`,
              borderRadius: '3px',
              padding: `${spacing[1]} ${spacing[2]}`,
              fontSize: '10px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: typography.fontWeight.medium,
              lineHeight: '12px',
              whiteSpace: 'nowrap'
            }}>
              {difficulty}
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'SF Mono, monospace',
          fontSize: '12px',
          fontWeight: typography.fontWeight.regular,
          lineHeight: 1.5,
          color: 'rgba(0,46,101,0.8)',
          margin: 0
        }}>
          {description}
        </p>

        {/* Duration */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          marginTop: 'auto'
        }}>
          <ClockIcon style={{ width: '12px', height: '12px', color: '#002e65' }} />
          <span style={{
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: typography.fontWeight.medium,
            color: '#002e65',
            lineHeight: '12px'
          }}>
            {duration}
          </span>
        </div>
      </div>

              {/* Actions */}
        <div style={{
          padding: `${spacing[3]} ${spacing[6]} ${spacing[3]} ${spacing[6]}`,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3]
        }}>
        {/* Start Tutorial Button */}
        <Button
          variant="primary"
          href={url}
          style={{ flex: 1 }}
        >
          Start Tutorial
        </Button>
      </div>
    </motion.div>
  );
}