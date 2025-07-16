'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { DocumentDuplicateIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

// Hero Section Component
function HeroSection() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, step: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const stats = [
    { label: '20+ Connected Chains', value: '20+' },
    { label: 'Total Value Locked', value: '$1B+' },
    { label: 'Daily Transactions', value: '500K+' },
    { label: 'Finality', value: '<2s' },
  ];

  return (
    <section className="relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Build Cross-Chain dApps on Agglayer
          </h1>
          <p className="text-xl md:text-2xl text-[#D9D9D9] max-w-3xl mx-auto mb-8">
            Ship faster with unified liquidity across 20+ chains. One SDK, instant finality, no bridges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/examples">
                Start Building
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/tools">
                Explore Tools
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#17171797] border border-white/10 rounded-lg p-6 text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-[#D9D9D9]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
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
      code: 'npm install @agglayer/lxly.js',
    },
    {
      title: 'Initialize',
      code: `import { Agglayer } from '@agglayer/lxly.js';

const agglayer = new Agglayer({
  network: 'mainnet',
  apiKey: 'your-api-key'
});`,
    },
    {
      title: 'First Transaction',
      code: `const tx = await agglayer.bridge({
  from: 'polygon',
  to: 'ethereum',
  token: 'USDC',
  amount: '100'
});`,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-[#000000]/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Building in Under 5 Minutes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#17171797] border border-white/10 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Step {index + 1}: {step.title}
                </h3>
                <Button
                  onClick={() => copyToClipboard(step.code, index)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  {copiedStep === index ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <DocumentDuplicateIcon className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
              <pre className="bg-black/50 border border-white/10 rounded p-4 overflow-x-auto">
                <code className="text-sm text-[#D9D9D9]">{step.code}</code>
              </pre>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Button asChild variant="link" className="p-0">
            <Link
              href="/examples"
              className="inline-flex items-center gap-2"
            >
              View Full Tutorial
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Why Agglayer Section Component
function WhyAgglayerSection() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Instant Finality',
      description: 'Sub-2 second confirmations',
      subtext: 'No waiting for bridge delays',
    },
    {
      icon: '💧',
      title: 'Unified Liquidity',
      description: 'Access all chains\' liquidity',
      subtext: 'No fragmentation',
    },
    {
      icon: '🔧',
      title: 'Simple Integration',
      description: 'One SDK for all chains',
      subtext: 'Familiar Ethereum APIs',
    },
    {
      icon: '🛡️',
      title: 'Battle-Tested Security',
      description: 'ZK-proof verification',
      subtext: '$1B+ secured',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Developers Choose Agglayer
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#17171797] border border-white/10 rounded-lg p-6 hover:border-[#0071F7]/50 transition-all"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-[#D9D9D9] mb-2">{benefit.description}</p>
              <p className="text-sm text-[#D9D9D9]/80">{benefit.subtext}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Templates Section Component
function FeaturedTemplatesSection() {
  const templates = [
    {
      id: 'cross-chain-dex',
      title: 'Cross-Chain DEX',
      icon: '↔️',
      description: 'Unified liquidity pools across all chains',
      tags: ['DeFi', 'Smart Contracts', 'React'],
      url: '/examples/template/dex',
    },
    {
      id: 'nft-marketplace',
      title: 'NFT Marketplace',
      icon: '🎨',
      description: 'Trade NFTs from any connected chain',
      tags: ['NFT', 'Marketplace', 'Next.js'],
      url: '/examples/template/nft-marketplace',
    },
    {
      id: 'multi-chain-lending',
      title: 'Multi-Chain Lending',
      icon: '🏦',
      description: 'Borrow on one chain, collateral on another',
      tags: ['DeFi', 'Lending', 'TypeScript'],
      url: '/examples/template/lending',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#000000]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Start with Production-Ready Templates
          </h2>
          <p className="text-xl text-[#D9D9D9]">
            Fork, customize, and deploy in minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#17171797] border border-white/10 rounded-lg p-6 hover:border-[#0071F7]/50 transition-all"
            >
              <div className="text-4xl mb-4">{template.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{template.title}</h3>
              <p className="text-[#D9D9D9] mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-[#D9D9D9]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button asChild variant="link" className="p-0">
                <Link
                  href={template.url}
                  className="inline-flex items-center gap-2"
                >
                  View Template
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Button asChild variant="link" className="p-0">
            <Link
              href="/examples"
              className="inline-flex items-center gap-2"
            >
              Browse All Templates →
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#17171797] border border-white/10 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Starting Fresh?</h3>
            <p className="text-[#D9D9D9] mb-6">
              Learn the fundamentals and build your first cross-chain dApp
            </p>
            <Button asChild>
              <Link href="/examples?tab=tutorials">
                Start Tutorial
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#17171797] border border-white/10 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Have an Existing dApp?</h3>
            <p className="text-[#D9D9D9] mb-6">
              Migrate to Agglayer in hours with our migration guide
            </p>
            <Button asChild>
              <a
                href="https://docs.agglayer.dev/migration"
                target="_blank"
                rel="noopener noreferrer"
              >
                Migration Guide
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Import the existing NavigationGuidance component
import NavigationGuidance from './components/NavigationGuidance';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <QuickStartSection />
      <WhyAgglayerSection />
      <FeaturedTemplatesSection />
      <CTASection />
      <NavigationGuidance />
    </main>
  );
}