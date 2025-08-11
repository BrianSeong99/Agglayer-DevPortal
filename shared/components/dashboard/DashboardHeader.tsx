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
  theme = 'light' 
}: DashboardHeaderProps) {
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
        width: '940px'
      }}
    >
      <h1 
        style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: '36px',
          fontWeight: typography.fontWeight.bold,
          lineHeight: 1.2,
          color: titleColor,
          margin: 0,
          minWidth: '100%',
          textAlign: 'left'
        }}
      >
        <span>Developer</span>
        <span> </span>
        <span style={{ 
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: typography.fontWeight.medium,
          color: colors.primary.DEFAULT 
        }}>
          Tools
        </span>
      </h1>
      {subtitle && (
        <p 
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            fontWeight: typography.fontWeight.regular,
            lineHeight: 1.2,
            color: subtitleColor,
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
