import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = clsx(
    'block rounded-full px-6 py-3 font-semibold text-lg shadow theme-btn whitespace-nowrap transition',
    className
  );
  const style = { background: 'var(--button-bg)', color: 'var(--button-text)' };

  if (href) {
    // Internal links use next/link, external use <a>
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={baseClasses} style={style}>
          {children}
        </Link>
      );
    } else {
      return (
        <a href={href} className={baseClasses} style={style} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
  }
  return (
    <button className={baseClasses} style={style} {...props}>
      {children}
    </button>
  );
}
