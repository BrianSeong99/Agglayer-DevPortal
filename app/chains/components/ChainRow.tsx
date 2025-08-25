'use client';

import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, DocumentDuplicateIcon, CheckIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, radius } from '@/shared/design-system';
import { TABLE_CONFIG } from '../config/tableConfig';
import type { Chain } from '../data/chains';

interface ChainRowProps {
  chain: Chain;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onCopyRpc: (rpcUrl: string, chainId: number) => void;
  copiedChainId: number | null;
}

export default function ChainRow({
  chain,
  isExpanded,
  onToggleExpand,
  onCopyRpc,
  copiedChainId
}: ChainRowProps) {
  // Get status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Live':
        return { 
          bg: '#e9ffe9', 
          text: '#008000', 
          border: '#008000',
          label: 'Live' // Keep the original label
        };
      case 'Testnet':
        return { 
          bg: '#fff4e0', 
          text: '#d18b0c', 
          border: '#d18b0c',
          label: 'Testnet'
        };
      default:
        return { 
          bg: '#e9ffe9', 
          text: '#008000', 
          border: '#008000',
          label: status
        };
    }
  };

  const statusStyle = getStatusStyle(chain.status);

  return (
    <div style={{
      width: '100%' // Use full width instead of fixed 940px
    }}>
      {/* Main Row - Always consistent design */}
      <div style={{
        backgroundColor: '#f7fafe', // Always same background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        padding: `0 ${spacing[4]}`, // Always same padding
        borderRadius: isExpanded ? '10px 10px 0 0' : '10px', // Round top corners when expanded
        width: '100%',
        height: '47px' // Fixed height for consistency
      }}>
        <div style={{
          display: 'flex',
          gap: spacing[6],
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          {/* Chain Name with Icon - Always show icon */}
          <div style={{
            width: TABLE_CONFIG.columns.name,
            display: 'flex',
            gap: spacing[3],
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              backgroundColor: colors.primary.DEFAULT,
              width: spacing[6],
              height: spacing[6],
              flexShrink: 0
            }} />
            <div style={{
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontWeight: typography.fontWeight.bold,
              fontSize: typography.textStyles.bodySmall.fontSize,
              color: colors.text.blue.DEFAULT,
              lineHeight: typography.textStyles.body.lineHeight,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center' // Center the text vertically
            }}>
              {chain.name}
            </div>
          </div>

          {/* All columns container - includes data, status, and expand button */}
          <div style={{
            flex: 1, // Take remaining space
            display: 'flex',
            alignItems: 'center', // Center all columns vertically
            justifyContent: 'space-between' // This spreads all columns evenly
          }}>
            {/* Gas Token */}
            <div style={{
              width: TABLE_CONFIG.columns.gasToken,
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {chain.gasToken}
            </div>

            {/* Block Time */}
            <div style={{
              width: TABLE_CONFIG.columns.blockTime,
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {chain.blockTime}
            </div>

            {/* TPS */}
            <div style={{
              width: TABLE_CONFIG.columns.tps,
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {chain.tps}
            </div>

            {/* Activity column - using TVL data */}
            <div style={{
              width: TABLE_CONFIG.columns.activity,
              fontFamily: typography.textStyles.bodySmall.fontFamily,
              fontSize: typography.fontSize.xs,
              color: colors.text.blue.muted,
              lineHeight: typography.textStyles.bodySmall.lineHeight,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {chain.tvl}
            </div>

            {/* Status Badge */}
            <div style={{
              width: TABLE_CONFIG.columns.status,
              backgroundColor: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              borderRadius: radius.sm,
              padding: `${spacing[1]} ${spacing[2.5]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
                {statusStyle.label}
              </div>
            </div>

            {/* Expand/Collapse Button */}
            <div style={{
              display: 'flex',
              height: '100%', // Take full height of the row
              alignItems: 'center',
              justifyContent: 'center',
              width: TABLE_CONFIG.columns.expandButton,
              flexShrink: 0
            }}>
              <button
                onClick={onToggleExpand}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(90deg)', // Down when expanded, right when collapsed
                  width: '11px',
                  height: '12px',
                  transition: 'transform 0.2s ease-in-out' // Smooth rotation animation
                }}
              >
                <ChevronDownIcon style={{ 
                  width: '11px', 
                  height: '12px',
                  color: 'rgba(0,46,101,0.8)' 
                }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Expanded Content */}
      <div style={{
        maxHeight: isExpanded ? '500px' : '0px', // Animate height
        overflow: 'hidden',
        backgroundColor: '#e9f3ff',
        borderRadius: isExpanded ? '0 0 10px 10px' : '0', // Round bottom corners when expanded
        opacity: isExpanded ? 1 : 0,
        transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.3s ease-in-out' // Smooth all transitions
      }}>
        {isExpanded && (
          <div style={{
            display: 'flex',
            gap: spacing[3],
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: spacing[4],
            width: '100%',
            borderTop: '1px solid #d8eaff'
          }}>
            {/* Chain ID */}
            <div style={{
              flexBasis: 0,
              flexGrow: 1,
              minHeight: '1px',
              minWidth: '1px',
              backgroundColor: '#f7fafe',
              display: 'flex',
              gap: spacing[3],
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: spacing[4],
              borderRadius: radius.sm
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.textStyles.bodySmall.fontWeight,
                color: colors.text.blue.muted,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                Chain ID
              </div>
              <div style={{
                display: 'flex',
                gap: '3px',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '129.666px'
              }}>
                <div style={{
                  fontFamily: typography.textStyles.code.fontFamily,
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.xs,
                  color: colors.primary.DEFAULT,
                  lineHeight: typography.textStyles.code.lineHeight,
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  {chain.chainId}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(chain.chainId.toString())}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <DocumentDuplicateIcon style={{ 
                    width: '12px', 
                    height: '12px',
                    color: 'rgba(0,46,101,0.8)',
                    transform: 'rotate(180deg) scaleY(-1)'
                  }} />
                </button>
              </div>
            </div>

            {/* RPC Endpoint */}
            <div style={{
              flexBasis: 0,
              flexGrow: 1,
              minHeight: '1px',
              minWidth: '1px',
              backgroundColor: '#f7fafe',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: spacing[4],
              borderRadius: radius.sm
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.textStyles.bodySmall.fontWeight,
                color: colors.text.blue.muted,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                RPC Endpoint
              </div>
              <div style={{
                display: 'flex',
                gap: '3px',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
                <div style={{
                  fontFamily: typography.textStyles.code.fontFamily,
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.xs,
                  color: colors.primary.DEFAULT,
                  lineHeight: typography.textStyles.code.lineHeight,
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  Copy
                </div>
                <button
                  onClick={() => onCopyRpc(chain.rpcUrl, chain.chainId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {copiedChainId === chain.chainId ? (
                    <CheckIcon style={{ 
                      width: '12px', 
                      height: '12px',
                      color: '#22C55E',
                      transform: 'rotate(180deg) scaleY(-1)'
                    }} />
                  ) : (
                    <DocumentDuplicateIcon style={{ 
                      width: '12px', 
                      height: '12px',
                      color: 'rgba(0,46,101,0.8)',
                      transform: 'rotate(180deg) scaleY(-1)'
                    }} />
                  )}
                </button>
              </div>
            </div>

            {/* Explorer */}
            <div style={{
              flexBasis: 0,
              flexGrow: 1,
              minHeight: '1px',
              minWidth: '1px',
              backgroundColor: '#f7fafe',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: spacing[4],
              borderRadius: radius.sm
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.textStyles.bodySmall.fontWeight,
                color: colors.text.blue.muted,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                Explorer
              </div>
              <div style={{
                display: 'flex',
                gap: spacing[3],
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '3px',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                    fontFamily: 'SF Mono, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: colors.primary.DEFAULT,
                    lineHeight: 1.5,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}>
                    View
                  </div>
                  <a
                    href={chain.blockExplorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <ArrowTopRightOnSquareIcon style={{ 
                      width: '12px', 
                      height: '12px',
                      color: 'rgba(0,46,101,0.8)'
                    }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div style={{
              flexBasis: 0,
              flexGrow: 1,
              minHeight: '1px',
              minWidth: '1px',
              backgroundColor: '#f7fafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: spacing[4],
              borderRadius: radius.sm
            }}>
              <div style={{
                fontFamily: typography.textStyles.bodySmall.fontFamily,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.textStyles.bodySmall.fontWeight,
                color: colors.text.blue.muted,
                lineHeight: typography.textStyles.bodySmall.lineHeight,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                Documentation
              </div>
              <div style={{
                display: 'flex',
                gap: spacing[3],
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '3px',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}>
                  <div style={{
                    fontFamily: 'SF Mono, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    color: colors.primary.DEFAULT,
                    lineHeight: 1.5,
                    textAlign: 'right',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}>
                    Docs
                  </div>
                  <a
                    href={`https://docs.${chain.name.toLowerCase().replace(/\s+/g, '')}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <ArrowTopRightOnSquareIcon style={{ 
                      width: '12px', 
                      height: '12px',
                      color: 'rgba(0,46,101,0.8)'
                    }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 