'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
}

export default function DashboardHeader({ 
  title, 
  subtitle, 
  theme = 'dark' 
}: DashboardHeaderProps) {
  const titleColor = theme === 'light' ? colors.text.primary : colors.background.primary;
  const subtitleColor = theme === 'light' ? colors.text.primary : '#D9D9D9';

  return (
    <motion.div
      initial={motionTokens.section.initial}
      whileInView={motionTokens.section.whileInView}
      transition={motionTokens.section.transition}
      style={{
        marginTop: spacing[20],
        marginBottom: spacing[10]
      }}
    >
      <h1 
        style={{
          fontFamily: typography.textStyles.h1.fontFamily,
          fontSize: typography.textStyles.h1.fontSize,
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.textStyles.h1.lineHeight,
          color: titleColor,
          marginBottom: spacing[3]
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p 
          style={{
            fontFamily: typography.textStyles.body.fontFamily,
            fontSize: typography.textStyles.body.fontSize,
            fontWeight: typography.fontWeight.regular,
            lineHeight: typography.textStyles.body.lineHeight,
            color: subtitleColor
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
