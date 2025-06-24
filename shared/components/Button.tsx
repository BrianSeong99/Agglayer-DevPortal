import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { parseLink } from '@/shared/utils/linkParser';

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
    const { Component, props: linkProps } = parseLink({
      href,
      className: baseClasses,
      style,
      children
    });

    return Component === 'Link' ? (
      <Link {...linkProps} />
    ) : (
      <a {...linkProps} />
    );
  }

  return (
    <button className={baseClasses} style={style} {...props}>
      {children}
    </button>
  );
}
