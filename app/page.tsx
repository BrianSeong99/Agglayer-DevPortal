'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { DocumentDuplicateIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import Footer from '@/shared/components/Footer';

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient with more color */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F1B2E] to-[#0A0A0A]" />
        
        {/* Multiple animated gradient orbs for more vibrancy */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#0071F7]/50 rounded-full filter blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#00D4AA]/40 rounded-full filter blur-[150px] animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#8B5CF6]/30 to-[#FF8C42]/30 rounded-full filter blur-[200px] animate-pulse animation-delay-4000" />
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0071F7]/20 via-transparent to-[#00D4AA]/20 animate-gradient-shift" />
        </div>
        
        {/* Grid overlay with glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0,113,247,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,212,170,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Particle effect overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-2 h-2 bg-[#0071F7] rounded-full animate-float" />
          <div className="absolute top-40 right-40 w-3 h-3 bg-[#00D4AA] rounded-full animate-float animation-delay-2000" />
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-[#8B5CF6] rounded-full animate-float animation-delay-4000" />
          <div className="absolute bottom-20 right-1/4 w-4 h-4 bg-[#FF8C42] rounded-full animate-float" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Small badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#D9D9D9] mb-8"
          >
            <span className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse" />
            20+ chains connected
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Build Cross-Chain Apps<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071F7] to-[#00D4AA]">
              on Agglayer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#D9D9D9]/80 max-w-3xl mx-auto mb-12">
            Ship faster with unified liquidity across 20+ chains.
            One SDK. Zero complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-6 bg-[#0071F7] hover:bg-[#0071F7]/90 text-white"
            >
              <Link href="#quick-start">
                Get Started
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 text-white border-white/20 hover:bg-white/10"
            >
              <a href="https://docs.agglayer.dev" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: 'Connected Chains', value: '20+' },
              { label: 'Total Value Locked', value: '$1B+' },
              { label: 'Daily Transactions', value: '500K+' },
              { label: 'Avg. Finality', value: '<2s' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-[#D9D9D9]/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </section>
  );
}

// Quick Navigation Section Component
function QuickNavigationSection() {
  const navigationItems = [
    {
      icon: '🌐',
      title: 'Explore Chains',
      description: 'Discover 20+ connected chains in the Agglayer ecosystem',
      subtext: 'Visual explorer with real-time network status',
      href: '/aggniverse',
      color: 'from-[#0071F7] to-[#00D4AA]',
    },
    {
      icon: '📚',
      title: 'Learn Fundamentals',
      description: 'Understand core concepts and architecture',
      subtext: 'Step-by-step tutorials and guides',
      href: '/examples?tab=tutorials',
      color: 'from-[#8B5CF6] to-[#0071F7]',
    },
    {
      icon: '💡',
      title: 'Explore Examples',
      description: 'Production-ready templates and code samples',
      subtext: 'Build faster with proven patterns',
      href: '/examples',
      color: 'from-[#FF8C42] to-[#8B5CF6]',
    },
    {
      icon: '🛠️',
      title: 'Developer Tools',
      description: 'Essential developer tools and SDKs',
      subtext: 'Everything you need to build on Agglayer',
      href: '/tools',
      color: 'from-[#00D4AA] to-[#0071F7]',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Vibrant background with animated gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0F2E] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0071F7]/10 via-transparent to-[#8B5CF6]/10" />
        
        {/* Floating gradient spheres */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#0071F7]/30 to-[#00D4AA]/20 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#8B5CF6]/25 to-[#FF8C42]/20 rounded-full filter blur-[120px] animate-float animation-delay-2000" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your Journey
          </h2>
          <p className="text-xl text-[#D9D9D9]/80">
            Choose your path to building on Agglayer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {navigationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="block relative overflow-hidden bg-[#17171797] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all group"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#0071F7] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#D9D9D9] mb-2">{item.description}</p>
                  <p className="text-sm text-[#D9D9D9]/60">{item.subtext}</p>
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
git clone https://github.com/NethermindEth/agg-sandbox.git
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
      title: 'Bridge Tokens',
      code: `# Check available bridges
aggsandbox show bridges --network 1

# Monitor events
aggsandbox events --chain anvil-l1`,
    },
  ];

  return (
    <section id="quick-start" className="relative py-32 overflow-hidden">
      {/* Vibrant background with code-like pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A1F1A] to-[#0A0A0A]" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#00D4AA]/15 via-transparent to-[#0071F7]/15" />
        
        {/* Glowing orbs */}
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-[#00D4AA]/25 rounded-full filter blur-[150px] animate-pulse" />
        <div className="absolute -bottom-20 left-0 w-[700px] h-[700px] bg-[#0071F7]/20 rounded-full filter blur-[150px] animate-pulse animation-delay-2000" />
        
        {/* Enhanced code pattern */}
        <div className="absolute inset-0 opacity-10">
          <pre className="text-[#00D4AA] text-xs leading-none font-mono">
{`const agglayer = new Agglayer();
await agglayer.connect();
const chains = await agglayer.getChains();
const bridge = await agglayer.bridge({
  from: 'polygon',
  to: 'arbitrum',
  token: 'USDC',
  amount: '1000'
});`.repeat(50)}
          </pre>
        </div>
        
        {/* Animated lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D4AA] to-transparent animate-slide-right" />
          <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0071F7] to-transparent animate-slide-right animation-delay-2000" />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent animate-slide-right animation-delay-4000" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Building in Under 5 Minutes
          </h2>
          <p className="text-xl text-[#D9D9D9]/80">
            Get your local development environment up and running
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-[#0A0F1A] border border-[#00D4AA]/20 rounded-xl p-6 hover:border-[#00D4AA]/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  <span className="text-[#00D4AA] mr-2">{index + 1}.</span>
                  {step.title}
                </h3>
                <Button
                  onClick={() => copyToClipboard(step.code, index)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white/10"
                >
                  {copiedStep === index ? (
                    <CheckIcon className="w-4 h-4 text-[#00D4AA]" />
                  ) : (
                    <DocumentDuplicateIcon className="w-4 h-4 text-[#D9D9D9]/60" />
                  )}
                </Button>
              </div>
              <pre className="bg-black/50 border border-white/5 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-[#D9D9D9]/90 font-mono">{step.code}</code>
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
          <Button asChild variant="link" className="text-[#00D4AA] hover:text-[#00D4AA]/80">
            <Link href="/examples" className="inline-flex items-center gap-2">
              View Full Tutorial
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </Button>
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
      icon: '↔️',
      description: 'Unified liquidity pools across all chains',
      tags: ['DeFi', 'Smart Contracts', 'React'],
      gradient: 'from-[#0071F7] to-[#00D4AA]',
      url: '/examples/template/dex',
    },
    {
      id: 'nft-marketplace',
      title: 'NFT Marketplace',
      icon: '🎨',
      description: 'Trade NFTs from any connected chain',
      tags: ['NFT', 'Marketplace', 'Next.js'],
      gradient: 'from-[#8B5CF6] to-[#0071F7]',
      url: '/examples/template/nft-marketplace',
    },
    {
      id: 'multi-chain-lending',
      title: 'Multi-Chain Lending',
      icon: '🏦',
      description: 'Borrow on one chain, collateral on another',
      tags: ['DeFi', 'Lending', 'TypeScript'],
      gradient: 'from-[#FF8C42] to-[#8B5CF6]',
      url: '/examples/template/lending',
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Vibrant background with multiple gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0A2E] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8C42]/10 via-transparent to-[#8B5CF6]/10" />
        
        {/* Multiple animated orbs */}
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#FF8C42]/30 to-[#8B5CF6]/20 rounded-full filter blur-[130px] animate-float" />
        <div className="absolute bottom-1/3 -right-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#8B5CF6]/30 to-[#0071F7]/20 rounded-full filter blur-[130px] animate-float animation-delay-2000" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-t from-[#00D4AA]/20 to-[#0071F7]/20 rounded-full filter blur-[150px] animate-pulse animation-delay-4000" />
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-[#8B5CF6] rotate-45 animate-spin-slow" />
          <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-[#FF8C42] rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-[#00D4AA] animate-bounce" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start with Production-Ready Examples
          </h2>
          <p className="text-xl text-[#D9D9D9]/80">
            Fork, customize, and deploy in minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-[#17171797] border border-white/10 rounded-2xl hover:border-white/20 transition-all"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10 p-8">
                <div className="text-5xl mb-6">{example.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">{example.title}</h3>
                <p className="text-[#D9D9D9]/80 mb-6">{example.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {example.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#D9D9D9]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button asChild variant="link" className="p-0 text-white hover:text-[#0071F7]">
                  <Link href={example.url} className="inline-flex items-center gap-2">
                    View Example
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Button 
            asChild 
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white"
          >
            <Link href="/examples" className="inline-flex items-center gap-2">
              Browse All Examples
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <QuickNavigationSection />
      <QuickStartSection />
      <FeaturedExamplesSection />
      <Footer />
    </main>
  );
}