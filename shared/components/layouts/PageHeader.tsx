'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';

interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  theme?: 'light' | 'dark';
}

export default function PageHeader({ 
  title, 
  subtitle, 
  theme = 'light' 
}: PageHeaderProps) {
  const titleColor = theme === 'light' ? colors.text.primary : colors.background.primary;
  const subtitleColor = theme === 'light' ? colors.text.primary : '#D9D9D9';

  return (
    <motion.div
      initial={motionTokens.section.initial}
      whileInView={motionTokens.section.whileInView}
      transition={motionTokens.section.transition}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[6],
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 0,
        position: 'relative',
        flex: 1
      }}
    >
      <h1 
        style={{
          fontFamily: typography.textStyles.h2.fontFamily,
          fontSize: typography.textStyles.h2.fontSize,
          fontWeight: typography.textStyles.h2.fontWeight,
          lineHeight: typography.textStyles.h2.lineHeight,
          color: titleColor,
          margin: 0,
          textAlign: 'left',
          width: 'min-content',
          minWidth: '100%'
        }}
      >
        {typeof title === 'string' ? title : title}
      </h1>
      {subtitle && (
        <p 
          style={{
            fontFamily: typography.textStyles.body.fontFamily,
            fontSize: typography.textStyles.body.fontSize,
            fontWeight: typography.textStyles.body.fontWeight,
            lineHeight: typography.textStyles.body.lineHeight,
            color: subtitleColor,
            margin: 0,
            textAlign: 'left'
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 