import { ReactNode } from 'react'
import Link from 'next/link'
import { parseLink } from '@/shared/utils/linkParser'

interface TileProps {
  href?: string
  icon?: ReactNode
  illustration?: ReactNode
  title?: string
  description?: string
  className?: string
  children?: ReactNode
  variant?: 'main' | 'secondary'
}

export default function Tile({ 
  href, 
  icon, 
  illustration,
  title, 
  description, 
  className = '', 
  children,
  variant = 'secondary',
}: TileProps) {
  if (variant === 'main') {
    // Big tile style
    const content = (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 md:p-12">
        {illustration && (
          <div className="mb-6">{illustration}</div>
        )}
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{title}</h2>}
        {description && <p className="text-lg text-[var(--text-secondary)] text-center mb-6">{description}</p>}
        {children}
      </div>
    )
    const baseClasses = [
      'rounded-2xl',
      'bg-[var(--bg-card)]',
      'border-[var(--border-card)]',
      'border',
      'shadow-lg',
      'hover:shadow-md',
      'hover:border-[var(--primary)]',
      'transition',
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'min-h-[260px]',
      'p-0',
      className,
    ].join(' ')
    if (href) {
      const { Component, props: linkProps } = parseLink({
        href,
        className: baseClasses,
        children: content
      });

      return Component === 'Link' ? (
        <Link {...linkProps} />
      ) : (
        <a {...linkProps} />
      );
    }
    return <div className={baseClasses}>{content}</div>
  }

  // Small tile style
  const content = (
    <div className="flex items-center gap-4">
      {icon && <div className="w-10 h-10 flex items-center justify-center text-[var(--primary)]">{icon}</div>}
      <div className="flex flex-col">
        {title && <h3 className="font-bold text-lg mb-1 text-left">{title}</h3>}
        {description && <p className="text-[var(--text-secondary)] text-sm text-left">{description}</p>}
        {children}
      </div>
    </div>
  )
  const baseClasses = [
    'rounded-2xl',
    'bg-[var(--bg-card-light)]',
    'border-[var(--border-card)]',
    'border',
    'shadow-lg',
    'hover:shadow-md',
    'hover:border-[var(--primary)]',
    'transition',
    'p-6',
    'flex',
    'items-center',
    className,
  ].join(' ')
  if (href) {
    const { Component, props: linkProps } = parseLink({
      href,
      className: baseClasses,
      children: content
    });

    return Component === 'Link' ? (
      <Link {...linkProps} />
    ) : (
      <a {...linkProps} />
    );
  }
  return <div className={baseClasses}>{content}</div>
} 