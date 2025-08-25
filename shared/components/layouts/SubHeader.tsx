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
            fontFamily: typography.textStyles.h3.fontFamily,
            fontSize: typography.textStyles.h3.fontSize,
            fontWeight: typography.textStyles.h3.fontWeight,
            lineHeight: typography.textStyles.h3.lineHeight,
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
            fontSize: typography.fontSize['xs'],
            fontFamily: typography.textStyles.button.fontFamily,
            fontWeight: typography.textStyles.button.fontWeight,
            color: colors.primary.DEFAULT,
            lineHeight: typography.textStyles.button.lineHeight
          }}>
            {badgeText}
          </div>
        )}
      </div>
      
      {actionText && onActionClick && (
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: typography.fontSize['xs'],
          fontFamily: typography.textStyles.button.fontFamily,
          fontWeight: typography.textStyles.button.fontWeight,
          color: actionColor,
          cursor: 'pointer',
          lineHeight: typography.textStyles.button.lineHeight
        }}
        onClick={onActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  );
} 