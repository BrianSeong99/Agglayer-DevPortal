'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, radius, motionTokens } from '@/shared/design-system';
import type { Chain } from '../data/chains';
import { Button } from '@/shared/components';

interface ChainGridCardProps {
  chain: Chain;
  index: number;
  copiedChainId: number | null;
  onCopyRpc: (rpcUrl: string, chainId: number) => void;
}

export default function ChainGridCard({
  chain,
  index,
  copiedChainId,
  onCopyRpc
}: ChainGridCardProps) {
  // Get status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Live':
      case 'Mainnet':
        return { 
          bg: '#e9ffe9', 
          text: '#008000', 
          border: '#008000' 
        };
      case 'Testnet':
        return { 
          bg: '#fff4e0', 
          text: '#d18b0c', 
          border: '#d18b0c' 
        };
      case 'Coming Soon':
        return { 
          bg: 'rgba(156, 163, 175, 0.1)', 
          text: '#9CA3AF', 
          border: 'rgba(156, 163, 175, 0.3)' 
        };
      default:
        return { 
          bg: 'rgba(0,113,247,0.05)', 
          text: colors.primary.DEFAULT, 
          border: 'rgba(0,113,247,0.14)' 
        };
    }
  };

  const statusStyle = getStatusStyle(chain.status);

  return (
    <motion.div
      initial={motionTokens.card.initial}
      whileInView={motionTokens.card.whileInView}
      transition={{
        ...motionTokens.card.transition,
        delay: index * 0.1
      }}
      viewport={{ once: true }}
      style={{
        backgroundColor: '#f7fafe',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flexBasis: 0,
        flexGrow: 1,
        minHeight: '1px',
        minWidth: '1px',
        flexShrink: 0
      }}
    >
      {/* Chain Info Section */}
      <div style={{
        padding: `${spacing[6]} ${spacing[6]} 0 ${spacing[6]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[6],
        flexGrow: 1
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1.5]
          }}>
            {/* Chain Icon */}
            <div style={{
              backgroundColor: colors.primary.DEFAULT,
              width: spacing[6],
              height: spacing[6],
              flexShrink: 0
            }} />
            
            {/* Chain Name */}
            <div style={{
              fontFamily: typography.textStyles.h6.fontFamily,
              fontSize: typography.textStyles.h6.fontSize,
              fontWeight: typography.textStyles.h6.fontWeight,
              color: colors.text.blue.DEFAULT,
              lineHeight: typography.textStyles.h6.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}>
              {chain.name}
            </div>
          </div>

          {/* Status Badge */}
          <div style={{
            backgroundColor: statusStyle.bg,
            border: `1px solid ${statusStyle.border}`,
            borderRadius: radius.sm,
            padding: `${spacing[1]} ${spacing[2.5]}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1.5]
          }}>
            <div style={{
              fontFamily: typography.textStyles.button.fontFamily,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.textStyles.button.fontWeight,
              color: statusStyle.text,
              lineHeight: typography.textStyles.button.lineHeight,
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              {chain.status}
            </div>
          </div>
        </div>

        {/* Chain Details */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[1.5]
        }}>
          {/* Chain ID */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.textStyles.bodySmall.fontWeight,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}>
              Chain ID
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              width: '129.666px',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                color: colors.text.blue.DEFAULT,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                fontWeight: typography.fontWeight.regular,
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>
                {chain.chainId}
              </div>
              <DocumentDuplicateIcon 
                style={{ 
                  width: '12px', 
                  height: '12px',
                  color: 'rgba(0,46,101,0.8)',
                  cursor: 'pointer',
                  transform: 'rotate(180deg) scaleY(-1)'
                }}
                onClick={() => navigator.clipboard.writeText(chain.chainId.toString())}
              />
            </div>
          </div>

          {/* RPC Endpoint */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.textStyles.bodySmall.fontWeight,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}>
              RPC Endpoint
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              width: '129.666px',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                color: colors.text.blue.DEFAULT,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                fontWeight: typography.fontWeight.medium,
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>
                RPC
              </div>
              <DocumentDuplicateIcon 
                style={{ 
                  width: '12px', 
                  height: '12px',
                  color: 'rgba(0,46,101,0.8)',
                  cursor: 'pointer',
                  transform: 'rotate(180deg) scaleY(-1)'
                }}
                onClick={() => onCopyRpc(chain.rpcUrl, chain.chainId)}
              />
            </div>
          </div>

          {/* Gas Token */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.textStyles.bodySmall.fontWeight,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}>
              Gas token
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              width: '129.666px',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                color: colors.text.blue.DEFAULT,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                fontWeight: typography.fontWeight.medium,
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>
                ETH
              </div>
            </div>
          </div>

          {/* Block Time */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.textStyles.bodySmall.fontWeight,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}>
              Block time
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              width: '129.666px',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                color: colors.text.blue.DEFAULT,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                fontWeight: typography.fontWeight.medium,
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>
                2 seconds
              </div>
            </div>
          </div>

          {/* TPS */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.textStyles.bodySmall.fontWeight,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}>
              TPS
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              width: '129.666px',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                color: colors.text.blue.DEFAULT,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                fontWeight: typography.fontWeight.medium,
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>
                {chain.tps}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: spacing[6],
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[6]
      }}>
        <div style={{
          display: 'flex',
          gap: spacing[1.5]
        }}>
          <Button
            variant="primary"
            href={chain.blockExplorer}
          >
            Explorer
          </Button>

          <Button
            variant="secondary"
            href={`https://docs.agglayer.dev/chains/${chain.name.toLowerCase()}`}
          >
            Docs
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 