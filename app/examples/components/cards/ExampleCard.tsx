'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';
import { Button } from '@/shared/components';

interface ExampleCardProps {
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  demoUrl?: string;
  codeUrl?: string;
  tutorialUrl?: string;
  index?: number; // Add index prop for stagger animation
}

export default function ExampleCard({
  title,
  description,
  image,
  techStack,
  demoUrl,
  codeUrl,
  tutorialUrl,
  index = 0,
}: ExampleCardProps) {
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
        width: '100%'
      }}
    >
      {/* Preview Image */}
      <div style={{
        backgroundColor: '#EAF3FD',
        height: '207px',
        borderRadius: '5px',
        margin: spacing[6],
        marginBottom: spacing[2.5],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        
      }}>
        {image ? (
          <Image src={image} alt={title} width={120} height={120} style={{ objectFit: 'contain' }} />
        ) : (
          <div style={{ color: '#ccc', fontSize: '14px' }}>No image</div>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: `0 ${spacing[6]} ${spacing[2.5]} ${spacing[6]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[3]
      }}>
        {/* Title */}
        <h3 style={{
          fontFamily: typography.textStyles.h6.fontFamily,
          fontSize: typography.textStyles.h6.fontSize,
          fontWeight: typography.textStyles.h6.fontWeight,
          lineHeight: typography.textStyles.h6.lineHeight,
          color: colors.text.blue.DEFAULT,
          margin: 0
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: typography.textStyles.bodySmall.fontFamily,
          fontSize: typography.textStyles.bodySmall.fontSize,
          fontWeight: typography.textStyles.bodySmall.fontWeight,
          lineHeight: typography.textStyles.bodySmall.lineHeight,
          color: colors.text.blue.muted,
          margin: 0
        }}>
          {description}
        </p>

        {/* Tech Stack */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing[1.5]
        }}>
          {techStack.map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: 'rgba(0,113,247,0.05)',
                border: '1px solid rgba(0,113,247,0.14)',
                borderRadius: '100px',
                padding: `${spacing[1]} ${spacing[2]}`,
                fontSize: typography.fontSize['2xs'],
                fontFamily: typography.textStyles.button.fontFamily,
                fontWeight: typography.textStyles.button.fontWeight,
                color: colors.primary.DEFAULT,
                lineHeight: '12px'
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Actions and Stats */}
      <div style={{
        padding: `${spacing[3]} ${spacing[6]} ${spacing[3]} ${spacing[6]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[6]
      }}>
        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: spacing[1.5]
        }}>
          {/* Demo Button */}
          {demoUrl && (
            <Button
              variant="primary"
              href={demoUrl}
              style={{ flex: 1 }}
            >
              Demo
            </Button>
          )}

          {/* Source Button */}
          {codeUrl && (
            <Button
              variant="secondary"
              href={codeUrl}
              style={{
                flex: 1,
                gap: spacing[1.5]
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: spacing[1.5] }}>
                Source
                <ArrowTopRightOnSquareIcon style={{ width: '12px', height: '12px' }} />
              </span>
            </Button>
          )}

          {/* Tutorial Button */}
          {tutorialUrl && (
            <Button
              variant="secondary"
              href={tutorialUrl}
              style={{ flex: 1 }}
            >
              Tutorial
            </Button>
          )}
        </div>


      </div>
    </motion.div>
  );
}