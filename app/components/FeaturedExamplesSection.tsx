'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconBulb, IconArrowRight } from '@tabler/icons-react';

export default function FeaturedExamplesSection() {
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