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
          padding: '30px 48px 48px 48px',
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
            width={120} 
            height={50} 
            showBackground={false}
            color="black"
          />
        </div>

        {/* Right side sections */}
        <div 
          className="flex items-start"
          style={{ gap: spacing[6], width: '647px', padding: '15px 0px 20px 0px', justifyContent: 'flex-center' }}
        >
          {/* Explore Links */}
          <div style={{ width: '110px', height: '120px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.h6.fontFamily,
                fontSize: typography.textStyles.h6.fontSize,
                fontWeight: typography.fontWeight.extrabold,
                lineHeight: typography.textStyles.h6.lineHeight,
                color: colors.text.primary,
                marginBottom: 0,
              }}
            >
              Explore
            </h4>
            <ul style={{ margin: 0, paddingTop: '6px', paddingBottom: '6px', listStyle: 'none' }}>
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
                      marginBottom: '6px',
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div style={{ width: '200px' }}>
            <h4 
              style={{
                fontFamily: typography.textStyles.h6.fontFamily,
                fontSize: typography.textStyles.h6.fontSize,
                fontWeight: typography.textStyles.h6.fontWeight,
                lineHeight: typography.textStyles.h6.lineHeight,
                color: colors.text.primary,
                marginBottom: spacing[2.5],
                height: '23.98px',
              }}
            >
              Get Aggregated
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