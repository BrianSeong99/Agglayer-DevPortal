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
      {/* Main Row */}
      <div style={{
        backgroundColor: isExpanded ? '#e9f3ff' : '#f7fafe',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isExpanded ? '16px' : `0 ${spacing[4]}`,
        borderRadius: '10px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          gap: spacing[6],
          height: '47px',
          width: '100%', // Add this to match ChainTableHeader
          alignItems: 'center',
          justifyContent: 'flex-start' // Using flex-start like Figma
        }}>
          {/* Chain Name with Icon */}
          <div style={{
            width: TABLE_CONFIG.columns.name,
            display: 'flex',
            gap: spacing[3],
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            {!isExpanded && (
              <div style={{
                backgroundColor: colors.primary.DEFAULT,
                width: spacing[6],
                height: spacing[6],
                flexShrink: 0
              }} />
            )}
            <div style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: '15px',
              fontWeight: typography.fontWeight.bold,
              color: 'rgba(0,46,101,0.9)',
              lineHeight: 1.08,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center' // Center the text vertically
            }}>
              {chain.name}
            </div>
          </div>

          {/* Data columns container */}
          <div style={{
            flex: 1, // Take remaining space
            display: 'flex',
            alignItems: 'center', // Center all data columns vertically
            justifyContent: 'space-between' // This spreads the columns evenly
          }}>
            {/* Gas Token */}
            <div style={{
              width: TABLE_CONFIG.columns.gasToken,
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
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
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
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
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
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
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
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
              backgroundColor: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              borderRadius: radius.sm,
              padding: `${spacing[1]} ${spacing[2.5]}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1.5],
              flexShrink: 0
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: typography.fontWeight.medium,
                color: statusStyle.text,
                lineHeight: 1.08,
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
                  transform: isExpanded ? 'rotate(270deg)' : 'rotate(90deg)', // Match Figma rotation
                  width: '11px',
                  height: '12px'
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

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{
            display: 'flex',
            gap: spacing[3],
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: `${spacing[4]} 0`,
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
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: typography.fontWeight.regular,
                color: 'rgba(0,46,101,0.8)',
                lineHeight: 1.5,
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
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: typography.fontWeight.regular,
                color: 'rgba(0,46,101,0.8)',
                lineHeight: 1.5,
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
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: typography.fontWeight.regular,
                color: 'rgba(0,46,101,0.8)',
                lineHeight: 1.5,
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
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: typography.fontWeight.regular,
                color: 'rgba(0,46,101,0.8)',
                lineHeight: 1.5,
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