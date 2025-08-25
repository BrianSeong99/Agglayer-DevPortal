'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, sizing, radius, motionTokens } from '@/shared/design-system';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import ToolCard from './components/ToolCard';
import EcosystemToolCard from './components/EcosystemToolCard';
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
    <PageLayout theme="light">
      {/* Header Section with Title */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: sizing.container.lg
      }}>
        <PageHeader
          title={
            <>
              Developer{' '}
              <span style={{ color: colors.primary.DEFAULT }}>Tools</span>
            </>
          }
          subtitle="Everything you need to build, test, and deploy cross-chain applications"
          theme="light"
        />
      </div>

              {/* Main Content */}
        <div
          style={{
            maxWidth: sizing.container.lg,
            gap: spacing[16],
            marginBottom: spacing[24],
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        {/* Essential Tools Grid */}
        <div style={{ 
          width: sizing.container.lg, 
          gap: spacing[3],
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* First Row - 3 Cards */}
          <div 
            style={{ 
              gap: spacing[3],
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            {essentialTools.slice(0, 3).map((tool, index) => (
              <div 
                key={tool.id} 
                style={{ 
                  flexBasis: 0,
                  flexGrow: 1,
                  minHeight: '1px',
                  minWidth: '1px',
                  flexShrink: 0 
                }}
              >
                <ToolCard tool={tool} index={index} />
              </div>
            ))}
          </div>

          {/* Second Row - 2 Cards */}
          <div 
            style={{ 
              gap: spacing[3],
              alignItems: 'center',
              justifyContent: 'flex-start',
              display: 'flex'
            }}
          >
            {essentialTools.slice(3, 5).map((tool, index) => (
              <div 
                key={tool.id} 
                style={{ 
                  flexBasis: 0,
                  flexGrow: 1,
                  minHeight: '1px',
                  minWidth: '1px',
                  flexShrink: 0 
                }}
              >
                <ToolCard tool={tool} index={index + 3} />
              </div>
            ))}
            {/* Empty placeholder to maintain 3-column layout */}
            <div 
              style={{ 
                flexBasis: 0,
                flexGrow: 1,
                minHeight: '1px',
                minWidth: '1px',
                flexShrink: 0, 
                visibility: 'hidden' 
              }}
            />
          </div>
        </div>

        {/* Ecosystem Tools & Resources */}
        <div style={{ 
          width: sizing.container.lg, 
          gap: spacing[6],
          display: 'flex',
          flexDirection: 'column'
        }}>
          <motion.h2
            initial={motionTokens.section.initial}
            whileInView={motionTokens.section.whileInView}
            transition={motionTokens.section.transition}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            style={{
              fontFamily: typography.textStyles.h3.fontFamily,
              fontSize: typography.textStyles.h3.fontSize,
              fontWeight: typography.textStyles.h3.fontWeight,
              lineHeight: typography.textStyles.h3.lineHeight,
              color: colors.text.primary
            }}
          >
            Ecosystem Tools & Resources
          </motion.h2>

          <div 
            style={{ 
              gap: spacing[2.5],
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {additionalTools.map((tool, index) => (
              <div
                key={tool.id}
                style={{
                  flexBasis: `calc(50% - ${spacing[1.5]})`, // 2 items per row with gap
                  maxWidth: `calc(50% - ${spacing[1.5]})`
                }}
              >
                <EcosystemToolCard tool={tool} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}