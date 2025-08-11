'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowRight, IconTelescope } from '@tabler/icons-react';
import { typography, colors, spacing, sizing, radius } from '@/shared/design-system';
import StackingSquares from './svg/StackingSquares';

export default function FeaturedExamplesSection() {
  const examples = [
    {
      id: 'cross-chain-dex',
      title: 'Cross-Chain DEX',
      description: 'Unified liquidity pools across all Agglayer connected chains',
      url: '/examples',
    },
    {
      id: 'nft-marketplace',
      title: 'NFT Marketplace',
      description: 'Trade NFTs from any Agglayer connected chain',
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
    <section className="bg-white" style={{ paddingTop: spacing[24] }}>
      <div className="mx-auto" style={{ maxWidth: sizing.container.lg, paddingLeft: spacing[6], paddingRight: spacing[6] }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: spacing[16] }}
        >
          <h2 
            className="font-heading font-bold"
            style={{
              fontFamily: typography.textStyles.h2.fontFamily,
              fontSize: typography.textStyles.h2.fontSize,
              fontWeight: typography.textStyles.h2.fontWeight,
              lineHeight: typography.textStyles.h2.lineHeight,
              marginBottom: spacing[6],
            }}
          >
            Start with<br />
            <span style={{ color: colors.primary.DEFAULT }}>Production-Ready Examples</span>
          </h2>
          <p 
            className="mx-auto"
            style={{
              fontFamily: typography.textStyles.body.fontFamily,
              fontSize: typography.textStyles.body.fontSize,
              fontWeight: typography.textStyles.body.fontWeight,
              lineHeight: typography.textStyles.body.lineHeight,
              color: colors.text.primary,
              maxWidth: sizing.container.xs,
            }}
          >
            Fork, customize, and deploy in minutes
          </p>
        </motion.div>

        <div 
          className="flex flex-col md:flex-row mb-6"
          style={{ gap: spacing[6] }}
        >
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-1"
            >
              <Link
                href={example.url}
                className="group block w-full overflow-hidden transition-all duration-300 bg-[#F7FAFE]"
                style={{
                  backgroundColor: colors.background.secondary,
                  borderRadius: radius.md,
                  minHeight: '220px',
                }}
              >
                <div 
                  className="flex items-center justify-start"
                  style={{ paddingTop: spacing[6], paddingLeft: spacing[6], paddingRight: spacing[6] }}
                >
                  <div 
                    className="flex items-center justify-center"
                    style={{ width: sizing.icon['3xl'], height: sizing.icon['3xl'] }}
                  >
                    <StackingSquares />
                  </div>
                </div>
                <div 
                  className="flex flex-col flex-1"
                  style={{ padding: spacing.component.cardPadding, gap: spacing[6] }}
                >
                  <div 
                    className="flex flex-col flex-1"
                    style={{ gap: spacing[3] }}
                  >
                    <h3 
                      className="font-bold"
                      style={{
                        fontFamily: typography.textStyles.h6.fontFamily,
                        fontSize: typography.textStyles.h6.fontSize,
                        fontWeight: typography.textStyles.h6.fontWeight,
                        lineHeight: typography.textStyles.h6.lineHeight,
                        color: colors.text.blue.DEFAULT,
                      }}
                    >
                      {example.title}
                    </h3>
                    <p 
                      className="leading-normal"
                      style={{
                        fontFamily: typography.textStyles.bodySmall.fontFamily,
                        fontSize: typography.textStyles.bodySmall.fontSize,
                        fontWeight: typography.textStyles.bodySmall.fontWeight,
                        lineHeight: typography.textStyles.bodySmall.lineHeight,
                        color: colors.text.blue.muted,
                      }}
                    >
                      {example.description}
                    </p>
                  </div>
                  <div 
                    className="flex items-center"
                    style={{ gap: spacing.component.microGap }}
                  >
                    <span 
                      className="font-medium inline-flex items-center gap-1"
                      style={{
                        fontFamily: typography.textStyles.bodySmall.fontFamily,
                        fontSize: typography.textStyles.bodySmall.fontSize,
                        fontWeight: typography.fontWeight.medium,
                        lineHeight: typography.textStyles.bodySmall.lineHeight,
                        color: colors.primary.DEFAULT,
                        opacity: 0.8,
                      }}
                    >
                      View Example
                      <IconArrowRight 
                        style={{ 
                          width: sizing.icon.sm, 
                          height: sizing.icon.sm,
                          color: colors.primary.DEFAULT,
                          opacity: 0.8,
                        }} 
                      />
                    </span>
                  </div>
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
            className="inline-flex items-center"
            style={{
              gap: spacing.component.microGap,
              paddingLeft: spacing.component.buttonPaddingX,
              paddingRight: spacing.component.buttonPaddingX,
              paddingTop: spacing.component.buttonPaddingY,
              paddingBottom: spacing.component.buttonPaddingY,
              borderRadius: radius.pill,
              color: colors.text.quaternary,
            }}
          >
            <IconTelescope style={{ width: sizing.icon.sm, height: sizing.icon.sm }}/>
            <span 
              style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.textStyles.bodySmall.fontSize,
                fontWeight: typography.textStyles.bodySmall.fontWeight,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                color: colors.neutral.gray[500],
              }}
            >
              Explore all examples
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}