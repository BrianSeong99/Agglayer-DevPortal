'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconBrandX, IconBrandDiscord } from '@tabler/icons-react';
import { typography, colors, spacing, sizing, radius, motionTokens } from '@/shared/design-system';
import Logo from './Logo';

export default function Footer() {
  const footerLinks = {
    explore: [
      { label: 'Docs', href: 'https://docs.agglayer.dev/', external: true },
      { label: 'Blog', href: 'https://www.agglayer.dev/blog', external: true },
      { label: 'Ecosystem', href: 'https://www.agglayer.dev/ecosystem-index', external: true },
      { label: 'Join Us', href: 'https://info.polygon.technology/agglayer-intake-form', external: true },
    ],
  };

  return (
    <motion.footer 
      {...motionTokens.section}
      style={{ 
        backgroundColor: '#FBFAFA',
        marginTop: spacing[24]
      }}
    >
      <div 
        className="mx-auto flex items-start justify-between"
        style={{
          maxWidth: sizing.container.lg,
          padding: spacing[12],
          borderRadius: radius.xl,
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo 
            width={100} 
            height={22} 
            showBackground={false}
            color="black"
          />
        </div>

        {/* Right side sections */}
        <div 
          className="flex items-start"
          style={{ gap: spacing[6] }}
        >
          {/* Explore Links */}
          <div style={{ width: '110px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.textStyles.bodySmall.fontSize,
                fontWeight: typography.fontWeight.bold,
                lineHeight: 2,
                color: colors.text.primary,
                marginBottom: spacing[2.5],
              }}
            >
              Explore
            </h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: typography.textStyles.bodySmall.fontFamily,
                      fontSize: typography.textStyles.bodySmall.fontSize,
                      fontWeight: typography.fontWeight.medium,
                      lineHeight: 2,
                      color: 'rgba(0,0,0,0.6)',
                      textDecoration: 'underline',
                      textUnderlinePosition: 'from-font',
                      display: 'block',
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div style={{ width: '220px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.textStyles.bodySmall.fontSize,
                fontWeight: typography.fontWeight.bold,
                lineHeight: 2,
                color: colors.text.primary,
                marginBottom: spacing[2.5],
              }}
            >
              Stay updated
            </h4>
            <div 
              className="flex items-center"
              style={{
                backgroundColor: colors.background.primary,
                border: '0.75px solid rgba(0,0,0,0.2)',
                borderRadius: '40.289px',
                height: '28.476px',
                width: '195px',
                paddingLeft: '18.75px',
                paddingRight: '18.75px',
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: typography.textStyles.bodySmall.fontFamily,
                  fontSize: typography.textStyles.bodySmall.fontSize,
                  fontWeight: typography.fontWeight.medium,
                  color: 'rgba(0,0,0,0.3)',
                }}
                className="placeholder:text-[rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          {/* Follow */}
          <div style={{ width: '133px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.textStyles.bodySmall.fontSize,
                fontWeight: typography.fontWeight.bold,
                lineHeight: 2,
                color: colors.text.primary,
                marginBottom: spacing[2.5],
              }}
            >
              Follow our journey
            </h4>
            <div className="flex" style={{ gap: spacing[2] }}>
              <a
                href="https://twitter.com/agglayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                style={{ color: 'rgba(0,0,0,0.6)' }}
              >
                <IconBrandX style={{ width: '20px', height: '20px' }} />
              </a>
              <a
                href="https://discord.gg/agglayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                style={{ color: 'rgba(0,0,0,0.6)' }}
              >
                <IconBrandDiscord style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}