'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { typography, colors, spacing, radius, motionTokens } from '@/shared/design-system';

interface SubHeaderProps {
  title: string;
  badgeText?: string;
  actionText?: string;
  onActionClick?: () => void;
  theme?: 'light' | 'dark';
}

export default function SubHeader({ 
  title, 
  badgeText,
  actionText,
  onActionClick,
  theme = 'light' 
}: SubHeaderProps) {
  const titleColor = theme === 'light' ? '#131316' : colors.background.primary;
  const actionColor = theme === 'light' ? colors.primary.DEFAULT : colors.primary.DEFAULT;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3]
      }}>
        <motion.h2
          initial={motionTokens.section.initial}
          whileInView={motionTokens.section.whileInView}
          transition={motionTokens.section.transition}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          style={{
            fontFamily: 'Inter Tight, sans-serif',
            fontSize: '24px',
            fontWeight: typography.fontWeight.bold,
            lineHeight: '40px',
            color: titleColor,
            margin: 0
          }}
        >
          {title}
        </motion.h2>
        
        {badgeText && (
          <div style={{
            backgroundColor: 'transparent',
            border: `1px solid ${colors.primary.DEFAULT}`,
            borderRadius: radius.sm,
            padding: `${spacing[1]} ${spacing[2.5]}`,
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: typography.fontWeight.medium,
            color: colors.primary.DEFAULT,
            lineHeight: 1.08
          }}>
            {badgeText}
          </div>
        )}
      </div>
      
      {actionText && onActionClick && (
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: typography.fontWeight.medium,
          color: actionColor,
          cursor: 'pointer',
          lineHeight: '12px'
        }}
        onClick={onActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
} 