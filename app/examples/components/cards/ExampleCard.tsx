'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';

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
      {/* Preview Image Placeholder */}
      <div style={{
        backgroundColor: '#EAF3FD',
        height: '207px',
        borderRadius: '5px',
        margin: spacing[6],
        marginBottom: spacing[2.5],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Placeholder for image */}
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
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: '15px',
          fontWeight: typography.fontWeight.bold,
          lineHeight: 1.08,
          color: 'rgba(0,46,101,0.9)',
          margin: 0
        }}>
          {title}
        </h3>

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
                borderRadius: '3px',
                padding: `${spacing[1]} ${spacing[2]}`,
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: typography.fontWeight.medium,
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
        padding: spacing[6],
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
            <button style={{
              flex: 1,
              backgroundColor: colors.primary.DEFAULT,
              color: '#ffffff',
              border: 'none',
              borderRadius: '3px',
              padding: `${spacing[2]} ${spacing[4]}`,
              fontSize: '10px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: typography.fontWeight.bold,
              cursor: 'pointer',
              lineHeight: '12px'
            }}>
              Demo
            </button>
          )}

          {/* Source Button */}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                color: colors.primary.DEFAULT,
                border: '1px solid rgba(0,113,247,0.14)',
                borderRadius: '3px',
                padding: `${spacing[2]} ${spacing[4]}`,
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing[1.5],
                lineHeight: '12px'
              }}
            >
              Source
              <ArrowTopRightOnSquareIcon style={{ width: '12px', height: '12px' }} />
            </a>
          )}

          {/* Tutorial Button */}
          {tutorialUrl && (
            <Link
              href={tutorialUrl}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                color: colors.primary.DEFAULT,
                border: '1px solid rgba(0,113,247,0.14)',
                borderRadius: '3px',
                padding: `${spacing[2]} ${spacing[4]}`,
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '12px'
              }}
            >
              Tutorial
            </Link>
          )}
        </div>


      </div>
    </motion.div>
  );
}