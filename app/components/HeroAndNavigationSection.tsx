'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  IconApps,
  IconBulb, 
  IconTools,
  IconBook2
} from '@tabler/icons-react';
import DecorativeSVGCircles from './svg/DecorativeSVGCircles';

export default function HeroAndNavigationSection() {
  const navigationItems = [
    {
      icon: <IconApps />,
      title: 'Learn',
      description: 'Step-by-step tutorials and guides',
      href: '/examples?tab=tutorials',
    },
    {
      icon: <IconBulb className="w-24 h-24 text-primary/10" />,
      title: 'Examples',
      description: 'Production-ready templates and code samples',
      href: '/examples',
    },
    {
      icon: <IconTools className="w-24 h-24 text-primary/10" />,
      title: 'Tools',
      description: 'Essential developer tools and SDKs',
      href: '/developers',
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
      <div className="relative max-w-narrow mx-auto px-6 pt-44 pb-6 z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 self-stretch"
        >
          <h1 className="font-heading text-5xl font-bold text-black leading-[120%]">
            Start Building<br />
            <span className="font-medium text-primary">Cross-Chain Apps</span>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="group block bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md h-[305px] overflow-hidden transition-all duration-300 hover:shadow-card hover:bg-white"
              >
                <div className="h-[193px] flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="p-6 flex items-end h-[112px]">
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-bold text-blue-primary leading-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-blue-light leading-normal">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-mono text-lg text-primary ml-3">→</span>
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