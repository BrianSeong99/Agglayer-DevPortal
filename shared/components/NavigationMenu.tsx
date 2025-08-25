'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { typography, colors, spacing, radius } from '@/shared/design-system';

export default function ShadcnNavigationMenu() {
  const pathname = usePathname();

  const mainLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Chains", 
      href: "/chains",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Tools",
      href: "/tools",
    },
    {
      title: "Social",
      href: "#",
    },
  ];

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 z-50" style={{ top: spacing[12] }}>
      {/* Gaussian Blur Background Effect */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          borderRadius: radius.round,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          zIndex: -1,
        }}
      />
      <nav 
        className="flex items-center justify-start relative"
        style={{
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: radius.round,
          paddingLeft: spacing[1],
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          height: '40px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0" style={{ marginLeft: spacing[1] }}>
          <div 
            className="flex justify-center items-center"
            style={{
              height: '30px',
              paddingLeft: spacing[4],
              paddingRight: spacing[4],
              gap: '15px',
              borderRadius: radius.pill,
              backgroundColor: 'rgba(0,0,0,0.9)'
            }}
          >
            <img
              src="/img/agglayer-logo.svg"
              alt="AggLayer Logo"
              width={80}
              height={30}
              style={{ display: 'block' }}
            />
          </div>
        </Link>
        
        {/* Navigation Items */}
        <div className="flex items-center h-full">
          <div 
            className="flex flex-row h-full items-center"
            style={{
              gap: spacing[1.5],
              padding: spacing[1]
            }}
          >
            {mainLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href === '/aggniverse' && pathname === '/aggniverse');
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center justify-center transition-all duration-300"
                  style={{
                    height: '30px',
                    paddingLeft: spacing[4],
                    paddingRight: spacing[4],
                    paddingTop: spacing[2],
                    paddingBottom: spacing[2],
                    borderRadius: radius.pill,
                    fontFamily: typography.textStyles.button.fontFamily,
                    fontSize: typography.textStyles.button.fontSize,
                    fontWeight: typography.textStyles.button.fontWeight,
                    lineHeight: typography.textStyles.button.lineHeight,
                    backgroundColor: isActive ? colors.primary.DEFAULT : 'transparent',
                    color: isActive ? '#ffffff' : colors.text.tertiary
                  }}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}