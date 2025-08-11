'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, sizing, radius, motionTokens } from '@/shared/design-system';
import NavigationMenu from '@/shared/components/NavigationMenu';
import Footer from '@/shared/components/Footer';
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
    <>
      <NavigationMenu />
      
      {/* Main Content */}
      <div
        className="mx-auto flex flex-col items-center"
        style={{
          maxWidth: sizing.container.lg,
          paddingTop: spacing[24],
          gap: spacing[16]
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={motionTokens.section.initial}
          whileInView={motionTokens.section.whileInView}
          transition={motionTokens.section.transition}
          className="text-center"
          style={{ 
            width: '940px',
            gap: spacing[6]
          }}
        >
          <h1
            style={{
              fontFamily: typography.textStyles.h1.fontFamily,
              fontSize: '36px',
              fontWeight: typography.fontWeight.bold,
              lineHeight: 1.2,
              color: colors.text.primary,
              marginBottom: spacing[6]
            }}
          >
            Developer{' '}
            <span style={{ color: colors.primary.DEFAULT }}>Tools</span>
          </h1>
          <p
            style={{
              fontFamily: typography.textStyles.body.fontFamily,
              fontSize: '15px',
              fontWeight: typography.fontWeight.regular,
              lineHeight: 1.2,
              color: colors.text.primary,
            }}
          >
            Everything you need to build, test, and deploy cross-chain applications
          </p>
        </motion.div>

        {/* Essential Tools Grid */}
        <div style={{ width: '940px', gap: spacing[3] }} className="flex flex-col">
          {/* First Row - 3 Cards */}
          <div className="flex" style={{ gap: spacing[3] }}>
            {essentialTools.slice(0, 3).map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={motionTokens.card.initial}
                whileInView={motionTokens.card.whileInView}
                transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
                className="flex-1"
                style={{
                  backgroundColor: '#F7FAFE',
                  borderRadius: radius.lg,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                {/* Header */}
                <div 
                  className="flex"
                  style={{
                    gap: spacing[2.5],
                    paddingTop: spacing[6],
                    paddingLeft: spacing[6],
                    paddingRight: spacing[6],
                    paddingBottom: 0
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(0,113,247,0.2)',
                      borderRadius: radius.sm,
                      width: spacing[8],
                      height: spacing[8],
                      flexShrink: 0
                    }}
                  />
                  <div style={{ width: '189px', gap: spacing[3] }} className="flex flex-col">
                    <div style={{ gap: spacing[3] }} className="flex flex-col">
                      <h3
                        style={{
                          fontFamily: typography.textStyles.h6.fontFamily,
                          fontSize: '15px',
                          fontWeight: typography.fontWeight.bold,
                          lineHeight: 1.08,
                          color: 'rgba(0,46,101,0.9)'
                        }}
                      >
                        {tool.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'SF Mono, monospace',
                          fontSize: '12px',
                          fontWeight: typography.fontWeight.regular,
                          lineHeight: 1.5,
                          color: 'rgba(0,46,101,0.8)'
                        }}
                      >
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div 
                  style={{
                    padding: spacing[6],
                    gap: spacing[6]
                  }}
                  className="flex flex-col"
                >
                  <div style={{ gap: spacing[3] }} className="flex flex-col">
                    {/* Quick Actions */}
                    <div className="flex items-center justify-between">
                      {tool.quickActions.slice(0, 3).map((action) => (
                        <a
                          key={action.label}
                          href={action.url}
                          target={action.external ? '_blank' : undefined}
                          rel={action.external ? 'noopener noreferrer' : undefined}
                          style={{
                            backgroundColor: 'rgba(0,113,247,0.05)',
                            border: '1px solid rgba(0,113,247,0.14)',
                            borderRadius: radius.sm,
                            padding: `${spacing[1]} ${spacing[2]}`,
                            gap: spacing[1.5],
                            textDecoration: 'none'
                          }}
                          className="flex items-center"
                        >
                          <span
                            style={{
                              fontFamily: typography.textStyles.bodySmall.fontFamily,
                              fontSize: '10px',
                              fontWeight: typography.fontWeight.medium,
                              lineHeight: '12px',
                              color: colors.primary.DEFAULT
                            }}
                          >
                            {action.label}
                          </span>
                          {action.external && (
                            <ArrowTopRightOnSquareIcon style={{ width: '12px', height: '12px' }} />
                          )}
                        </a>
                      ))}
                    </div>

                    {/* Install Command */}
                    {tool.quickInstall && (
                      <div
                        style={{
                          backgroundColor: colors.background.primary,
                          border: '1px solid rgba(0,113,247,0.14)',
                          borderRadius: radius.sm,
                          padding: spacing[4],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <code
                          style={{
                            fontFamily: 'SF Mono, monospace',
                            fontSize: '10px',
                            fontWeight: typography.fontWeight.medium,
                            lineHeight: '12px',
                            color: colors.primary.DEFAULT
                          }}
                        >
                          {tool.quickInstall}
                        </code>
                        <button
                          onClick={() => copyToClipboard(tool.quickInstall!, tool.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          <DocumentDuplicateIcon
                            style={{
                              width: '12px',
                              height: '12px',
                              color: copiedId === tool.id ? '#22c55e' : colors.neutral.gray[400]
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 2 Cards */}
          <div className="flex" style={{ gap: spacing[3] }}>
            {essentialTools.slice(3, 5).map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={motionTokens.card.initial}
                whileInView={motionTokens.card.whileInView}
                transition={{ ...motionTokens.card.transition, delay: (index + 3) * 0.1 }}
                style={{
                  backgroundColor: '#F7FAFE',
                  borderRadius: radius.lg,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  width: '305.333px'
                }}
              >
                {/* Header */}
                <div 
                  className="flex"
                  style={{
                    gap: spacing[2.5],
                    paddingTop: spacing[6],
                    paddingLeft: spacing[6],
                    paddingRight: spacing[6],
                    paddingBottom: 0
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(0,113,247,0.2)',
                      borderRadius: radius.sm,
                      width: spacing[8],
                      height: spacing[8],
                      flexShrink: 0
                    }}
                  />
                  <div style={{ width: '189px', gap: spacing[3] }} className="flex flex-col">
                    <div style={{ gap: spacing[3] }} className="flex flex-col">
                      <h3
                        style={{
                          fontFamily: typography.textStyles.h6.fontFamily,
                          fontSize: '15px',
                          fontWeight: typography.fontWeight.bold,
                          lineHeight: 1.08,
                          color: 'rgba(0,46,101,0.9)'
                        }}
                      >
                        {tool.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'SF Mono, monospace',
                          fontSize: '12px',
                          fontWeight: typography.fontWeight.regular,
                          lineHeight: 1.5,
                          color: 'rgba(0,46,101,0.8)'
                        }}
                      >
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div 
                  style={{
                    padding: spacing[6],
                    gap: spacing[6]
                  }}
                  className="flex flex-col"
                >
                  <div style={{ gap: spacing[3] }} className="flex flex-col">
                    {/* Quick Actions */}
                    <div className="flex items-center justify-between">
                      {tool.quickActions.slice(0, 3).map((action) => (
                        <a
                          key={action.label}
                          href={action.url}
                          target={action.external ? '_blank' : undefined}
                          rel={action.external ? 'noopener noreferrer' : undefined}
                          style={{
                            backgroundColor: 'rgba(0,113,247,0.05)',
                            border: '1px solid rgba(0,113,247,0.14)',
                            borderRadius: radius.sm,
                            padding: `${spacing[1]} ${spacing[2]}`,
                            gap: spacing[1.5],
                            textDecoration: 'none'
                          }}
                          className="flex items-center"
                        >
                          <span
                            style={{
                              fontFamily: typography.textStyles.bodySmall.fontFamily,
                              fontSize: '10px',
                              fontWeight: typography.fontWeight.medium,
                              lineHeight: '12px',
                              color: colors.primary.DEFAULT
                            }}
                          >
                            {action.label}
                          </span>
                          {action.external && (
                            <ArrowTopRightOnSquareIcon style={{ width: '12px', height: '12px' }} />
                          )}
                        </a>
                      ))}
                    </div>

                    {/* Install Command */}
                    {tool.quickInstall && (
                      <div
                        style={{
                          backgroundColor: colors.background.primary,
                          border: '1px solid rgba(0,113,247,0.14)',
                          borderRadius: radius.sm,
                          padding: spacing[4],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <code
                          style={{
                            fontFamily: 'SF Mono, monospace',
                            fontSize: '10px',
                            fontWeight: typography.fontWeight.medium,
                            lineHeight: '12px',
                            color: colors.primary.DEFAULT
                          }}
                        >
                          {tool.quickInstall}
                        </code>
                        <button
                          onClick={() => copyToClipboard(tool.quickInstall!, tool.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          <DocumentDuplicateIcon
                            style={{
                              width: '12px',
                              height: '12px',
                              color: copiedId === tool.id ? '#22c55e' : colors.neutral.gray[400]
                            }}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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

          <div className="flex" style={{ gap: spacing[2.5] }}>
            {additionalTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={motionTokens.card.initial}
                whileInView={motionTokens.card.whileInView}
                transition={{ ...motionTokens.card.transition, delay: index * 0.1 }}
                className="flex-1"
                style={{
                  backgroundColor: 'rgba(255,255,255,0)',
                  borderRadius: radius.lg,
                  border: '1px solid #F7FAFE',
                  boxShadow: '0px 1px 5px -4px rgba(19,19,22,0.7)',
                  padding: spacing[6],
                  gap: spacing[6],
                  display: 'flex',
                  flexDirection: 'column'
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

      <Footer />
    </>
  );
}