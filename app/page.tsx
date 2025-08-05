'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { 
  IconSchool, 
  IconBulb, 
  IconTools,
  IconArrowRight,
  IconExternalLink,
  IconCopy
} from '@tabler/icons-react';
import Footer from '@/shared/components/Footer';

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[500px] flex items-center bg-white">
      {/* Background pattern from Figma */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="relative max-w-narrow mx-auto px-6 py-24 z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl font-bold text-black mb-6 leading-snug">
            Start Building<br />
            <span className="font-medium text-primary">Cross-Chain Apps</span>
          </h1>
          
          <p className="text-base text-gray-600 max-w-xs mx-auto mb-12">
            Ship faster with unified liquidity across 20+ chains. One SDK. Zero complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="#quick-start"
              className="inline-flex items-center gap-1.5 bg-primary text-white px-[15px] py-2 rounded-pill text-xs font-medium transition-all duration-300 hover:shadow-primary"
            >
              <IconSchool className="w-[18px] h-[18px]" />
              Get started
            </Link>
            <a 
              href="https://docs.agglayer.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gray-150 text-gray-500 px-[15px] py-2 rounded-pill text-xs font-normal transition-all duration-300 hover:bg-gray-100"
            >
              <IconExternalLink className="w-[18px] h-[18px]" />
              Docs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Quick Navigation Section Component
function QuickNavigationSection() {
  const navigationItems = [
    {
      icon: <IconSchool className="w-24 h-24 text-primary/10" />,
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
    <section className="py-16 bg-white">
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
                className="group block bg-gray-100 rounded-md h-[305px] overflow-hidden transition-all duration-300 hover:shadow-card"
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
    </section>
  );
}

// Quick Start Section Component
function QuickStartSection() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, step: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: 'Install',
      code: `# Clone and install AggSandbox
git clone 
https://github.com/NethermindEth/agg-sandbox.git
cd agg-sandbox && make install`,
    },
    {
      title: 'Start Sandbox',
      code: `# Start local development environment
aggsandbox start --detach

# Or fork from mainnet
aggsandbox start --fork --detach`,
    },
    {
      title: 'Bridge tokens',
      code: `# Check available bridges
aggsandbox show bridges --network 1

# Monitor events
aggsandbox events --chain anvil-l1`,
    },
  ];

  return (
    <section id="quick-start" className="py-49 bg-white">
      <div className="max-w-narrow mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-6">
            Start your <span className="font-medium text-primary">Journey</span>
          </h2>
          <p className="text-base text-secondary max-w-xs mx-auto">
            Get your local development environment up and running in under 5 minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1.5 mb-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-100 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-medium text-xs text-primary tracking-button">
                  {index + 1}. {step.title}
                </h3>
                <button
                  onClick={() => copyToClipboard(step.code, index)}
                  className="p-0 hover:bg-transparent"
                >
                  {copiedStep === index ? (
                    <CheckIcon className="w-4 h-4 text-primary" />
                  ) : (
                    <IconCopy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="bg-white rounded-lg p-6 mt-3">
                <pre className="font-mono text-xs text-black leading-normal whitespace-pre-wrap break-all">
{step.code}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            href="/examples" 
            className="inline-flex items-center gap-1.5 px-[15px] py-2 rounded-pill text-xs text-gray-500"
          >
            <IconSchool className="w-4 h-4" />
            View full tutorial
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Featured Examples Section Component
function FeaturedExamplesSection() {
  const examples = [
    {
      id: 'cross-chain-dex',
      title: 'Cross-Chain DEX',
      description: 'Unified liquidity pools across all chains',
      url: '/examples',
    },
    {
      id: 'nft-marketplace',
      title: 'NFT Marketplace',
      description: 'Trade NFTs from any connected chain',
      url: '/examples',
    },
    {
      id: 'multi-chain-lending',
      title: 'Multi-Chain Lending',
      description: 'Borrow on one chain, collateral on another',
      url: '/examples',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-narrow mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-6">
            Start with<br />
            <span className="font-medium text-primary">Production-Ready Examples</span>
          </h2>
          <p className="text-base text-secondary max-w-xs mx-auto">
            Fork, customize, and deploy in minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 mb-12">
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={example.url}
                className="group block bg-gray-100 rounded-md overflow-hidden transition-all duration-300 hover:shadow-card"
              >
                <div className="h-[120px] bg-gradient-to-br from-gray-50 to-gray-100" />
                <div className="p-6">
                  <h3 className="font-heading text-base font-bold text-blue-primary leading-tight mb-3">
                    {example.title}
                  </h3>
                  <p className="font-mono text-xs text-blue-muted leading-normal mb-6">
                    {example.description}
                  </p>
                  <span className="font-mono text-xs text-link-muted font-medium inline-flex items-center gap-1">
                    View Example
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            href="/examples" 
            className="inline-flex items-center gap-1.5 px-[15px] py-2 rounded-pill text-xs text-tertiary"
          >
            <IconBulb className="w-4 h-4" />
            Explore all examples
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickNavigationSection />
      <QuickStartSection />
      <FeaturedExamplesSection />
      <Footer />
    </>
  );
}