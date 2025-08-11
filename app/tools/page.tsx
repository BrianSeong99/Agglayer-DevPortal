'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, sizing, radius, motionTokens } from '@/shared/design-system';
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout';
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader';
import ToolCard from './components/ToolCard';
import { tools } from './data/tools';

export default function ToolsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, toolId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(toolId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const essentialTools = tools.filter((tool) => tool.category === 'essential');
  const additionalTools = tools.filter((tool) => tool.category === 'additional');

  return (
    <DashboardLayout theme="light">
      <DashboardHeader
        title="Developer Tools"
        subtitle="Everything you need to build, test, and deploy cross-chain applications"
        theme="light"
      />

      {/* Main Content */}
      <div
        className="mx-auto flex flex-col items-center"
        style={{
          maxWidth: sizing.container.lg,
          gap: spacing[16]
        }}
      >
        {/* Essential Tools Grid */}
        <div style={{ width: '940px', gap: spacing[3] }} className="flex flex-col">
          {/* First Row - 3 Cards */}
          <div 
            className="flex"
            style={{ 
              gap: spacing[3],
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {essentialTools.slice(0, 3).map((tool, index) => (
              <div 
                key={tool.id} 
                className="basis-0 grow min-h-px min-w-px"
                style={{ flexShrink: 0 }}
              >
                <ToolCard tool={tool} index={index} />
              </div>
            ))}
          </div>

          {/* Second Row - 2 Cards */}
          <div 
            className="flex"
            style={{ 
              gap: spacing[3],
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            {essentialTools.slice(3, 5).map((tool, index) => (
              <div 
                key={tool.id} 
                className="basis-0 grow min-h-px min-w-px"
                style={{ flexShrink: 0 }}
              >
                <ToolCard tool={tool} index={index + 3} />
              </div>
            ))}
            {/* Empty placeholder to maintain 3-column layout */}
            <div 
              className="basis-0 grow min-h-px min-w-px"
              style={{ flexShrink: 0, visibility: 'hidden' }}
            />
          </div>
        </div>

        {/* Ecosystem Tools & Resources */}
        <div style={{ width: '940px', gap: spacing[6] }} className="flex flex-col">
          <h2
            style={{
              fontFamily: typography.textStyles.h2.fontFamily,
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              lineHeight: '40px',
              color: '#131316'
            }}
          >
            Ecosystem Tools & Resources
          </h2>

          <div 
            style={{ 
              gap: spacing[2.5],
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {additionalTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={motionTokens.card.initial}
                whileInView={motionTokens.card.whileInView}
                transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0)',
                  borderRadius: radius.lg,
                  border: '1px solid #F7FAFE',
                  boxShadow: '0px 1px 5px -4px rgba(19,19,22,0.7)',
                  padding: spacing[6],
                  gap: spacing[6],
                  display: 'flex',
                  flexDirection: 'column',
                  flexBasis: 'calc(50% - 5px)', // 2 items per row with gap
                  maxWidth: 'calc(50% - 5px)'
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: spacing[8],
                    height: spacing[8],
                    backgroundColor: 'rgba(0,113,247,0.2)',
                    borderRadius: radius.sm,
                    flexShrink: 0
                  }}
                />

                {/* Content */}
                <div style={{ gap: spacing[3] }} className="flex flex-col">
                  <h3
                    style={{
                      fontFamily: typography.textStyles.bodySmall.fontFamily,
                      fontSize: '13.563px',
                      fontWeight: typography.fontWeight.medium,
                      lineHeight: '20px',
                      color: '#131316'
                    }}
                  >
                    {tool.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: typography.textStyles.body.fontFamily,
                      fontSize: '13.453px',
                      fontWeight: typography.fontWeight.regular,
                      lineHeight: '20px',
                      color: 'rgba(0,0,0,0.6)'
                    }}
                  >
                    {tool.description}
                  </p>
                </div>

                {/* Action */}
                <div className="flex items-center" style={{ gap: spacing[1.5] }}>
                  <a
                    href={tool.quickActions[0].url}
                    target={tool.quickActions[0].external ? '_blank' : undefined}
                    rel={tool.quickActions[0].external ? 'noopener noreferrer' : undefined}
                    style={{
                      fontFamily: typography.textStyles.bodySmall.fontFamily,
                      fontSize: '12px',
                      fontWeight: typography.fontWeight.medium,
                      lineHeight: '12px',
                      color: colors.primary.DEFAULT,
                      textDecoration: 'none'
                    }}
                  >
                    {tool.quickActions[0].label}
                  </a>
                  {tool.quickActions[0].external && (
                    <ArrowTopRightOnSquareIcon style={{ width: '12px', height: '12px', color: colors.primary.DEFAULT }} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}