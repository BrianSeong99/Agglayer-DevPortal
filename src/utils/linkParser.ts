import { ComponentProps } from 'react';

interface LinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function parseLink({ href, className, style, children }: LinkProps) {
  const isInternal = href.startsWith('/');
  
  if (isInternal) {
    return {
      Component: 'Link',
      props: {
        href,
        className,
        style,
        children
      }
    };
  }

  return {
    Component: 'a',
    props: {
      href,
      className,
      style,
      target: '_blank',
      rel: 'noopener noreferrer',
      children
    }
  };
}
