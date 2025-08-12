'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import { Input } from '@/shared/components/ui/input';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';
import {
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

// Chain data - simplified version
const chains = [
  {
    id: 1,
    name: 'Ethereum',
    chainId: 1,
    type: 'Mainnet',
    status: 'Live',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    tvl: '$28.5B',
    tps: '15',
    gasPrice: '25 gwei'
  },
  {
    id: 2,
    name: 'Polygon PoS',
    chainId: 137,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    tvl: '$950M',
    tps: '65',
    gasPrice: '30 gwei'
  },
  {
    id: 3,
    name: 'Polygon zkEVM',
    chainId: 1101,
    type: 'zkEVM',
    status: 'Live',
    rpcUrl: 'https://zkevm-rpc.com',
    blockExplorer: 'https://zkevm.polygonscan.com',
    tvl: '$125M',
    tps: '2000',
    gasPrice: '0.25 gwei'
  },
  {
    id: 4,
    name: 'Arbitrum One',
    chainId: 42161,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    tvl: '$2.1B',
    tps: '40',
    gasPrice: '0.1 gwei'
  },
  {
    id: 5,
    name: 'Optimism',
    chainId: 10,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    tvl: '$1.8B',
    tps: '35',
    gasPrice: '0.001 gwei'
  },
  {
    id: 6,
    name: 'Base',
    chainId: 8453,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    tvl: '$1.2B',
    tps: '50',
    gasPrice: '0.001 gwei'
  }
];

export default function ChainsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedChainId, setCopiedChainId] = useState<number | null>(null);

  // Copy to clipboard function
  const copyToClipboard = async (text: string, chainId: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedChainId(chainId);
    setTimeout(() => setCopiedChainId(null), 2000);
  };

  // Filter chains based on search
  const filteredChains = chains.filter(chain =>
    chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chain.chainId.toString().includes(searchQuery) ||
    chain.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' };
      case 'Testnet': return { bg: 'rgba(251, 191, 36, 0.1)', text: '#FBBF24', border: 'rgba(251, 191, 36, 0.3)' };
      case 'Coming Soon': return { bg: 'rgba(156, 163, 175, 0.1)', text: '#9CA3AF', border: 'rgba(156, 163, 175, 0.3)' };
      default: return { bg: 'rgba(0,113,247,0.05)', text: colors.primary.DEFAULT, border: 'rgba(0,113,247,0.14)' };
    }
  };

  return (
    <PageLayout theme="light">
      <PageHeader
        title="Agglayer Chains"
        subtitle="Explore and connect to chains in the Agglayer ecosystem"
        theme="light"
      />

      {/* Search and Stats */}
      <div style={{ 
        width: '940px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: spacing[6],
        marginBottom: spacing[8]
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <MagnifyingGlassIcon style={{
            position: 'absolute',
            left: spacing[3],
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: 'rgba(0,46,101,0.5)'
          }} />
          <Input
            type="text"
            placeholder="Search by chain name, ID, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: spacing[10],
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0,113,247,0.14)',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(0,46,101,0.9)'
            }}
          />
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: spacing[4]
        }}>
          <div style={{
            backgroundColor: '#F7FAFE',
            padding: spacing[4],
            borderRadius: '8px',
            border: '1px solid rgba(0,113,247,0.1)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'rgba(0,46,101,0.9)',
              fontFamily: 'Inter Tight, sans-serif'
            }}>
              {chains.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(0,46,101,0.6)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Total Chains
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#F7FAFE',
            padding: spacing[4],
            borderRadius: '8px',
            border: '1px solid rgba(0,113,247,0.1)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'rgba(0,46,101,0.9)',
              fontFamily: 'Inter Tight, sans-serif'
            }}>
              $34.7B
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(0,46,101,0.6)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Total TVL
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#F7FAFE',
            padding: spacing[4],
            borderRadius: '8px',
            border: '1px solid rgba(0,113,247,0.1)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'rgba(0,46,101,0.9)',
              fontFamily: 'Inter Tight, sans-serif'
            }}>
              2,240
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(0,46,101,0.6)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Avg TPS
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#F7FAFE',
            padding: spacing[4],
            borderRadius: '8px',
            border: '1px solid rgba(0,113,247,0.1)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: typography.fontWeight.bold,
              color: 'rgba(0,46,101,0.9)',
              fontFamily: 'Inter Tight, sans-serif'
            }}>
              {chains.filter(c => c.status === 'Live').length}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(0,46,101,0.6)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Live Networks
            </div>
          </div>
        </div>
      </div>

      {/* Chains Grid */}
      <div style={{ width: '940px', marginBottom: spacing[24] }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: spacing[4]
        }}>
          {filteredChains.map((chain, index) => {
            const statusStyle = getStatusColor(chain.status);
            
            return (
              <motion.div
                key={chain.id}
                initial={motionTokens.card.initial}
                whileInView={motionTokens.card.whileInView}
                transition={{
                  ...motionTokens.card.transition,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: '#F7FAFE',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,113,247,0.1)',
                  overflow: 'hidden'
                }}
              >
                {/* Header */}
                <div style={{
                  padding: spacing[6],
                  borderBottom: '1px solid rgba(0,113,247,0.1)',
                  backgroundColor: '#EAF3FD'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: typography.fontWeight.bold,
                        color: 'rgba(0,46,101,0.9)',
                        fontFamily: 'Inter Tight, sans-serif',
                        margin: 0,
                        marginBottom: spacing[1]
                      }}>
                        {chain.name}
                      </h3>
                      <div style={{
                        fontSize: '12px',
                        color: 'rgba(0,46,101,0.6)',
                        fontFamily: 'SF Mono, monospace'
                      }}>
                        Chain ID: {chain.chainId}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
                      <div style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                        border: `1px solid ${statusStyle.border}`,
                        borderRadius: '3px',
                        padding: `${spacing[1]} ${spacing[2]}`,
                        fontSize: '10px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: typography.fontWeight.medium,
                        lineHeight: '12px'
                      }}>
                        {chain.status}
                      </div>
                      
                      <div style={{
                        backgroundColor: 'rgba(0,113,247,0.05)',
                        color: colors.primary.DEFAULT,
                        border: '1px solid rgba(0,113,247,0.14)',
                        borderRadius: '3px',
                        padding: `${spacing[1]} ${spacing[2]}`,
                        fontSize: '10px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: typography.fontWeight.medium,
                        lineHeight: '12px'
                      }}>
                        {chain.type}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ padding: spacing[6] }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: spacing[4],
                    marginBottom: spacing[6]
                  }}>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: typography.fontWeight.bold,
                        color: 'rgba(0,46,101,0.9)',
                        fontFamily: 'Inter Tight, sans-serif'
                      }}>
                        {chain.tvl}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'rgba(0,46,101,0.5)',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        TVL
                      </div>
                    </div>
                    
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: typography.fontWeight.bold,
                        color: 'rgba(0,46,101,0.9)',
                        fontFamily: 'Inter Tight, sans-serif'
                      }}>
                        {chain.tps}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'rgba(0,46,101,0.5)',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        TPS
                      </div>
                    </div>
                    
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: typography.fontWeight.bold,
                        color: 'rgba(0,46,101,0.9)',
                        fontFamily: 'Inter Tight, sans-serif'
                      }}>
                        {chain.gasPrice}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'rgba(0,46,101,0.5)',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        Gas Price
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: spacing[2] }}>
                    <button
                      onClick={() => copyToClipboard(chain.rpcUrl, chain.chainId)}
                      style={{
                        flex: 1,
                        backgroundColor: copiedChainId === chain.chainId ? 'rgba(34, 197, 94, 0.1)' : '#ffffff',
                        color: copiedChainId === chain.chainId ? '#22C55E' : colors.primary.DEFAULT,
                        border: `1px solid ${copiedChainId === chain.chainId ? 'rgba(34, 197, 94, 0.3)' : 'rgba(0,113,247,0.14)'}`,
                        borderRadius: '3px',
                        padding: `${spacing[2]} ${spacing[3]}`,
                        fontSize: '10px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: typography.fontWeight.medium,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: spacing[1],
                        lineHeight: '12px'
                      }}
                    >
                      {copiedChainId === chain.chainId ? (
                        <>
                          <CheckIcon style={{ width: '12px', height: '12px' }} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <DocumentDuplicateIcon style={{ width: '12px', height: '12px' }} />
                          <span>Copy RPC</span>
                        </>
                      )}
                    </button>
                    
                    <a
                      href={chain.blockExplorer}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        backgroundColor: colors.primary.DEFAULT,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '3px',
                        padding: `${spacing[2]} ${spacing[3]}`,
                        fontSize: '10px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: typography.fontWeight.bold,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: spacing[1],
                        lineHeight: '12px'
                      }}
                    >
                      <ArrowTopRightOnSquareIcon style={{ width: '12px', height: '12px' }} />
                      <span>Explorer</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}