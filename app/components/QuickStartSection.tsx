'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { IconSchool, IconCopy } from '@tabler/icons-react';
import { typography, colors, spacing, sizing, radius, motionTokens } from '@/shared/design-system';

export default function QuickStartSection() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, step: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: 'Install',
      code: `# Clone and install AggSandbox\ngit clone https://github.com/NethermindEth/agg-sandbox.git\ncd agg-sandbox && make install`,
    },
    {
      title: 'Start Sandbox',
      code: `# Start local development environment\naggsandbox start --detach\n\n# Or fork from mainnet\naggsandbox start --fork --detach`,
    },
    {
      title: 'Interact with the sandbox',
      code: `# Check available bridges\naggsandbox show bridges --network 0\n\n# Monitor events\naggsandbox events --chain anvil-l1`,
    },
  ];

  return (
    <section id="quick-start" className="bg-white" style={{ paddingTop: spacing[36], paddingBottom: spacing[12] }}>
      <div className="mx-auto" style={{ maxWidth: sizing.container.lg, paddingLeft: spacing[6], paddingRight: spacing[6] }}>
        <motion.div
          {...motionTokens.section}
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
            Start your <span style={{ color: colors.primary.DEFAULT }}>Journey</span>
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
            Get your local development environment up and running in under 5 minutes
          </p>
        </motion.div>

        <div 
          className="flex flex-col md:flex-row mb-6"
          style={{ gap: spacing.component.microGap }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              {...motionTokens.card}
              transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
              className="flex-1 rounded-3xl"
              style={{
                backgroundColor: colors.background.secondary,
                borderRadius: radius['2xl'],
                padding: spacing.component.cardPadding,
              }}
            >
              <div 
                className="flex flex-col w-full"
                style={{ gap: spacing.component.microGap }}
              >
                <div 
                  className="flex items-center justify-between w-full"
                  style={{ paddingTop: spacing[0.5], paddingBottom: spacing[3] }}
                >
                  <ol 
                    className="list-decimal"
                    start={index + 1}
                    style={{
                      fontFamily: typography.textStyles.button.fontFamily,
                      fontSize: typography.textStyles.button.fontSize,
                      fontWeight: typography.textStyles.button.fontWeight,
                      lineHeight: typography.textStyles.button.lineHeight,
                      letterSpacing: typography.letterSpacing.button,
                      color: colors.primary.DEFAULT,
                      marginLeft: '18px',
                    }}
                  >
                    <li>{step.title}</li>
                  </ol>
                  <button
                    onClick={() => copyToClipboard(step.code, index)}
                    className="p-0 hover:bg-transparent"
                    style={{ width: sizing.icon.sm, height: sizing.icon.sm }}
                  >
                    {copiedStep === index ? (
                      <CheckIcon className="w-4 h-4 text-primary" />
                    ) : (
                      <IconCopy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <div 
                  className="rounded-lg w-full"
                  style={{
                    backgroundColor: colors.background.primary,
                    borderRadius: radius.lg,
                    padding: spacing.component.cardPadding,
                    maxHeight: sizing.component.codeBlockMaxHeight,
                    overflow: 'clip',
                    gap: spacing[4],
                  }}
                >
                <pre 
                  className="whitespace-pre-wrap break-all text-left w-full"
                  style={{
                    fontFamily: `'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace`,
                    fontSize: typography.textStyles.code.fontSize,
                    fontWeight: typography.textStyles.code.fontWeight,
                    lineHeight: typography.textStyles.code.lineHeight,
                    letterSpacing: typography.textStyles.code.letterSpacing,
                    color: colors.text.primary,
                  }}
                >
                  {step.code}
                </pre>
              </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...motionTokens.section}
          transition={{ ...motionTokens.section.transition, delay: 0.3 }}
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
              color: colors.neutral.gray[500],
            }}
          >
            <IconSchool style={{ width: sizing.icon.sm, height: sizing.icon.sm }} />
            <span 
              style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.textStyles.bodySmall.fontSize,
                fontWeight: typography.textStyles.bodySmall.fontWeight,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                color: colors.neutral.gray[500],
              }}
            >
              View full tutorial
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}