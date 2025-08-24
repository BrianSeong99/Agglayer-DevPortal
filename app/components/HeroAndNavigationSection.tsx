'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  IconApps,
  IconBook2
} from '@tabler/icons-react';
import DecorativeSVGCircles from './svg/DecorativeSVGCircles';
import StackingCubes from './svg/StackingSquares';
import { typography, motionTokens } from '@/shared/design-system';

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
      {/* Background pattern from Figma */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        {/* Decorative SVG circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <DecorativeSVGCircles />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative max-w-narrow mx-auto px-6 pt-44 pb-12 z-10 w-full text-center">
        <motion.div
          {...motionTokens.hero}
          className="flex flex-col items-center gap-6 self-stretch"
        >
          <h1 className="font-heading text-5xl font-bold text-black leading-[120%]">
            Start Building<br />
            <span className="font-medium text-primary">Crosschain Apps</span>
          </h1>
          
          <p className="text-base text-black max-w-xs mx-auto">
            Ship faster with unified liquidity across 20+ chains. One SDK. Zero complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="#quick-start"
              className="inline-flex items-center gap-1.5 bg-[#0071F7] text-white px-[15px] py-2 rounded-[45px] text-xs font-medium leading-none transition-all duration-300 hover:bg-[#0071F7]/90 hover:shadow-lg"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.08,
              }}
            >
              <IconApps className="w-[18px] h-[18px] shrink-0" />
              <span className="whitespace-nowrap">Get started</span>
            </Link>
            <a 
              href="https://docs.agglayer.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gray-150 text-gray-500 px-[15px] py-2 rounded-[45px] text-xs font-normal leading-none transition-all duration-300 hover:bg-gray-100"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.08,
              }}
            >
              <IconBook2 className="w-[18px] h-[18px] shrink-0" />
              <span className="whitespace-nowrap">Docs</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Navigation Cards - positioned above the SVG */}
      <div className="relative z-20 py-16">
        <div className="max-w-narrow mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-3">
          {navigationItems.map((item, index) => (
            <motion.div
              key={index}
              {...motionTokens.card}
              transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="group block bg-[#F7FAFE] rounded-[10px] h-[305px] overflow-hidden transition-all duration-300 hover:shadow-card hover:border-[#0071F7]/30"
              >
                <div className="h-[193px] flex items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6 flex h-[112px]">
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
                      className="text-[rgba(0,46,101,0.6)] h-9 line-clamp-2"
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
