'use client'

import { ReactNode } from 'react'
import { typography, colors, spacing } from '@/shared/design-system'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Button({
  children,
  variant = 'primary',
  size = 'sm',
  onClick,
  href,
  disabled = false,
  className = '',
  style = {}
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    flexBasis: 0,
    flexGrow: 1,
    minHeight: '1px',
    minWidth: '1px',
    borderRadius: '100px',
    padding: `${spacing[2]} ${spacing[4]}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    border: '1px solid rgba(0,113,247,0.24)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    lineHeight: 1.2,
    textAlign: 'center' as const,
    whiteSpace: 'nowrap' as const,
    ...style
  }

  const variantStyles: React.CSSProperties = {
    ...(variant === 'primary' && {
      backgroundColor: colors.primary.DEFAULT,
      color: '#ffffff',
      fontWeight: typography.fontWeight.bold,
    }),
    ...(variant === 'secondary' && {
      backgroundColor: '#ffffff',
      color: colors.primary.DEFAULT,
      fontWeight: typography.fontWeight.medium,
    }),
  }

  const sizeStyles: React.CSSProperties = {
    ...(size === 'sm' && {
      fontSize: '10px',
      padding: `${spacing[2]} ${spacing[4]}`,
    }),
    ...(size === 'md' && {
      fontSize: '12px',
      padding: `${spacing[2.5]} ${spacing[5]}`,
    }),
    ...(size === 'lg' && {
      fontSize: '14px',
      padding: `${spacing[3]} ${spacing[6]}`,
    }),
  }

  const finalStyles = {
    ...baseStyles,
    ...variantStyles,
    ...sizeStyles,
    ...(disabled && {
      opacity: 0.5,
      cursor: 'not-allowed'
    })
  }

  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center' as const
    }}>
      {children}
    </div>
  )

  if (href && !disabled) {
    return (
      <a
        href={href}
        style={finalStyles}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={finalStyles}
      className={className}
    >
      {content}
    </button>
  )
} 