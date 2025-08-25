'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  IconApps,
  IconBook2
} from '@tabler/icons-react';
import { typography, colors, spacing, radius, motionTokens } from '@/shared/design-system';

export default function HeroAndNavigationSection() {
  const navigationItems = [
    {
      icon: <Image src="/img/learn-icon.svg" alt="Learn" fill/>,
      title: 'Learn',
      description: 'Step-by-step tutorials and guides',
      href: '/examples?tab=tutorials',
    },
    {
      icon: <Image src="/img/examples-icon.svg" alt="Examples" fill style={{ objectFit: 'contain' }}/>,
      title: 'Examples',
      description: 'Production-ready templates and code samples',
      href: '/examples',
    },
    {
      icon: <Image src="/img/tools-icon.svg" alt="Tools" fill style={{ objectFit: 'contain' }}/>,
      title: 'Tools',
      description: 'Essential developer tools and SDKs',
      href: '/tools',
    },
  ];

  return (
    <section className="relative overflow-visible bg-white">

      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: '50%',
          marginLeft: '-650px', // Half of the image width (1400px / 2 = 700px)
          width: '1300px',
          height: '700px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          {...motionTokens.section}
          transition={{ ...motionTokens.section.transition, delay: 0 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Image
            src="/img/banner.svg"
            alt="Agglayer Banner"
            width={1400}
            height={700}
            style={{
              width: '1400px',
              height: '700px',
              borderRadius: '20px',
              objectFit: 'cover',
            }}
            priority
          />
        </motion.div>
      </div>

      {/* Hero content */}
      <div className="relative max-w-narrow mx-auto px-6 pt-48 pb-12 z-10 w-full text-center">
        <motion.div
          {...motionTokens.hero}
          transition={{ ...motionTokens.hero.transition, delay: 0.3 }}
          className="flex flex-col items-center gap-6 self-stretch"
        >
          <h1 
            className="font-heading font-bold text-black"
            style={{
              fontFamily: typography.textStyles.h1.fontFamily,
              fontSize: typography.textStyles.h1.fontSize,
              fontWeight: typography.textStyles.h1.fontWeight,
              lineHeight: typography.textStyles.h1.lineHeight,
            }}
          >
            Start Building<br />
            <span className="font-medium text-primary">Crosschain Apps</span>
          </h1>
          
          <p 
            className="text-black max-w-xs mx-auto"
            style={{
              fontFamily: typography.textStyles.body.fontFamily,
              fontSize: typography.textStyles.body.fontSize,
              fontWeight: typography.textStyles.body.fontWeight,
              lineHeight: typography.textStyles.body.lineHeight,
            }}
          >
            Ship faster with unified liquidity across 20+ chains. One SDK. Zero complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="#quick-start"
              className="inline-flex items-center gap-1.5 text-white transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary.DEFAULT,
                paddingLeft: spacing[4],
                paddingRight: spacing[4],
                paddingTop: spacing[2],
                paddingBottom: spacing[2],
                borderRadius: radius.pill,
                fontFamily: typography.textStyles.button.fontFamily,
                fontSize: typography.textStyles.button.fontSize,
                fontWeight: typography.textStyles.button.fontWeight,
                lineHeight: typography.textStyles.button.lineHeight,
              }}
            >
              <IconApps className="w-[18px] h-[18px] shrink-0" />
              <span className="whitespace-nowrap">Get started</span>
            </Link>
            <a 
              href="https://docs.agglayer.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-all duration-300 hover:bg-gray-100"
              style={{
                backgroundColor: colors.background.tertiary,
                color: colors.text.tertiary,
                paddingLeft: spacing[4],
                paddingRight: spacing[4],
                paddingTop: spacing[2],
                paddingBottom: spacing[2],
                borderRadius: radius.pill,
                fontFamily: typography.textStyles.button.fontFamily,
                fontSize: typography.textStyles.button.fontSize,
                fontWeight: typography.fontWeight.regular,
                lineHeight: typography.textStyles.button.lineHeight,
              }}
            >
              <IconBook2 className="w-[18px] h-[18px] shrink-0" />
              <span className="whitespace-nowrap">Docs</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Navigation Cards - positioned above the SVG */}
      <div className="relative z-20" style={{ paddingTop: '384px' }}>
        <div className="max-w-narrow mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-3">
          {navigationItems.map((item, index) => (
            <motion.div
              key={index}
              {...motionTokens.card}
              transition={{ ...motionTokens.card.transition, delay: 0.6 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className="group block bg-[#F7FAFE] rounded-[10px] h-[305px] overflow-hidden transition-all duration-300 hover:shadow-card hover:border-[#0071F7]/30"
              >
                <div className="h-[173px] flex items-center justify-center pt-6">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6 flex h-[130px]">
                  <div className="flex-1 flex flex-col gap-3">
                    <h3 
                      className="text-[rgba(0,46,101,0.9)] h-4"
                      style={{
                        fontFamily: typography.textStyles.h6.fontFamily,
                        fontSize: typography.textStyles.h6.fontSize,
                        fontWeight: typography.textStyles.h6.fontWeight,
                        lineHeight: typography.textStyles.h6.lineHeight,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-[rgba(0,46,101,0.6)] h-12 line-clamp-2"
                      style={{
                        fontFamily: typography.textStyles.bodySmall.fontFamily,
                        fontSize: typography.textStyles.bodySmall.fontSize,
                        fontWeight: typography.textStyles.bodySmall.fontWeight,
                        lineHeight: typography.textStyles.bodySmall.lineHeight,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span 
                    className="text-[#0071F7] ml-3 self-end"
                    style={{
                      fontFamily: typography.fontFamily.mono.join(', '),
                      fontSize: typography.fontSize.lg,
                      fontWeight: typography.fontWeight.regular,
                      lineHeight: typography.lineHeight.normal,
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
