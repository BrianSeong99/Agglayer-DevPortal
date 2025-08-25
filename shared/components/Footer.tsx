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
    <div style={{ paddingBottom: '48px' }}>
      <motion.footer 
        initial={motionTokens.section.initial}
        whileInView={motionTokens.section.whileInView}
        transition={motionTokens.section.transition}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        style={{ 
          backgroundColor: '#FBFAFA',
          borderRadius: '20px',
          padding: '48px',
          width: '940px',
          overflow: 'hidden',
          margin: '0 auto'
        }}
      >
      <div 
        className="flex items-start justify-between"
        style={{ width: '100%' }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo 
            width={99.448} 
            height={22} 
            showBackground={false}
            color="black"
          />
        </div>

        {/* Right side sections */}
        <div 
          className="flex items-start"
          style={{ gap: spacing[6], width: '647px', justifyContent: 'flex-end' }}
        >
          {/* Explore Links */}
          <div style={{ width: '110px', height: '120px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.label.fontFamily,
                fontSize: typography.textStyles.label.fontSize,
                fontWeight: typography.fontWeight.extrabold,
                lineHeight: typography.textStyles.label.lineHeight,
                color: colors.text.primary,
                marginBottom: 0,
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
                      fontWeight: typography.textStyles.bodySmall.fontWeight,
                      lineHeight: typography.textStyles.label.lineHeight,
                      color: colors.text.tertiary,
                      textDecoration: 'underline',
                      textUnderlinePosition: 'from-font',
                      textDecorationSkipInk: 'none',
                      textDecorationStyle: 'solid',
                      display: 'block',
                      cursor: 'pointer',
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
                fontFamily: typography.textStyles.label.fontFamily,
                fontSize: typography.textStyles.label.fontSize,
                fontWeight: typography.textStyles.label.fontWeight,
                lineHeight: typography.textStyles.label.lineHeight,
                color: colors.text.primary,
                marginBottom: spacing[2.5],
                height: '23.98px',
              }}
            >
              Stay updated
            </h4>
            <div 
              style={{
                backgroundColor: '#ffffff',
                border: '0.75px solid rgba(0,0,0,0.2)',
                borderRadius: '40.289px',
                height: '28.476px',
                width: '195px',
                paddingLeft: '18.75px',
                paddingRight: '18.75px',
                display: 'flex',
                alignItems: 'center',
                gap: '11.25px',
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
                  fontWeight: typography.textStyles.bodySmall.fontWeight,
                  color: colors.text.quaternary,
                  lineHeight: typography.textStyles.bodySmall.lineHeight,
                }}
                className="placeholder:text-[rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          {/* Follow */}
          <div style={{ width: '133px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.label.fontFamily,
                fontSize: typography.textStyles.label.fontSize,
                fontWeight: typography.textStyles.label.fontWeight,
                lineHeight: typography.textStyles.label.lineHeight,
                color: colors.text.primary,
                marginBottom: spacing[2.5],
                height: '23.98px',
              }}
            >
              Follow our journey
            </h4>
            <div style={{ height: '28.476px', width: '30.986px' }}>
              <a
                href="https://twitter.com/agglayer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                style={{ color: 'rgba(0,0,0,0.6)' }}
              >
                <IconBrandX style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
    </div>
  );
}