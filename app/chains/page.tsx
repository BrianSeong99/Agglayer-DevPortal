'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import ViewToggle from './components/ViewToggle';
import SearchAndFilters from './components/SearchAndFilters';
import ChainTableHeader from './components/ChainTableHeader';
import ChainRow from './components/ChainRow';
import { chains, type Chain } from './data/chains';
import { typography, colors, spacing, sizing, radius, motionTokens } from '@/shared/design-system';
import {
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function ChainsPage() {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [copiedChainId, setCopiedChainId] = useState<number | null>(null);
  const [expandedChain, setExpandedChain] = useState<number | null>(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Copy to clipboard function
  const copyToClipboard = async (text: string, chainId: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedChainId(chainId);
    setTimeout(() => setCopiedChainId(null), 2000);
  };

  // Filter chains based on search and filters
  const filteredChains = chains.filter(chain => {
    const matchesSearch = chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chain.chainId.toString().includes(searchQuery) ||
      chain.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.some(filter => {
      switch (filter) {
        case 'evm-compatible': return true; // All chains are EVM compatible
        case 'high-throughput': return parseInt(chain.tps.replace('+', '')) > 1000;
        case 'low-gas-fees': return chain.status === 'Testnet' || parseFloat(chain.gasPrice.split(' ')[0]) < 1;
        case 'smart-contracts': return true; // All chains support smart contracts
        default: return false;
      }
    });
    
    return matchesSearch && matchesFilters;
  });

  // Sort chains
  const sortedChains = [...filteredChains].sort((a, b) => {
    let aValue: any = a[sortField as keyof typeof a];
    let bValue: any = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Get status color for grid view
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', border: 'rgba(34, 197, 94, 0.3)' };
      case 'Testnet': return { bg: 'rgba(251, 191, 36, 0.1)', text: '#FBBF24', border: 'rgba(251, 191, 36, 0.3)' };
      case 'Coming Soon': return { bg: 'rgba(156, 163, 175, 0.1)', text: '#9CA3AF', border: 'rgba(156, 163, 175, 0.3)' };
      default: return { bg: 'rgba(0,113,247,0.05)', text: colors.primary.DEFAULT, border: 'rgba(0,113,247,0.14)' };
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleExpand = (chainId: number) => {
    setExpandedChain(expandedChain === chainId ? null : chainId);
  };

  // Group chains by network type for list view
  const mainnetChains = sortedChains.filter(chain => chain.status === 'Live');
  const testnetChains = sortedChains.filter(chain => chain.status === 'Testnet');

  return (
    <PageLayout theme="light">
      {/* Header Section with Title and Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: sizing.container.lg,
        gap: spacing[16]
      }}>
        {/* Page Header */}
        <PageHeader 
          title={
            <>
              Agglayer Network{' '}
              <span style={{ color: colors.primary.DEFAULT }}>Explorer</span>
            </>
          }
          subtitle="Technical details and developer resources for all chains"
          theme="light"
        />

        {/* View Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: spacing[2] // Slight adjustment to align with title
        }}>
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizing.container.lg
      }}>
        <SearchAndFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />
      </div>

      {/* Content Section */}
      <div style={{ width: sizing.container.lg }}>
        {view === 'list' ? (
          /* List View */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[12]
          }}>
            {/* Mainnet Network Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[3]
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[3]
                }}>
                  <h2 style={{
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.bold,
                    fontFamily: typography.fontFamily.heading.join(', '),
                    color: colors.text.primary,
                    lineHeight: spacing[10],
                    margin: 0
                  }}>
                    Mainnet Network
                  </h2>
                  <div style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${colors.primary.DEFAULT}`,
                    borderRadius: radius.sm,
                    padding: `${spacing[1]} ${spacing[2.5]}`,
                    fontSize: typography.fontSize.xs,
                    fontFamily: typography.fontFamily.body.join(', '),
                    fontWeight: typography.fontWeight.medium,
                    color: colors.primary.DEFAULT,
                    lineHeight: typography.lineHeight.none
                  }}>
                    {mainnetChains.length} chains
                  </div>
                </div>
                
                <button style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: typography.fontSize.xs,
                  fontFamily: typography.fontFamily.body.join(', '),
                  fontWeight: typography.fontWeight.medium,
                  color: colors.primary.DEFAULT,
                  cursor: 'pointer',
                  lineHeight: spacing[3]
                }}>
                  Explore all
                </button>
              </div>

              {/* Table Header */}
              <ChainTableHeader 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />

              {/* Chain Rows */}
              <div>
                {mainnetChains.map((chain) => (
                  <ChainRow 
                    key={chain.id}
                    chain={chain}
                    isExpanded={expandedChain === chain.id}
                    onToggleExpand={() => toggleExpand(chain.id)}
                    onCopyRpc={copyToClipboard}
                    copiedChainId={copiedChainId}
                  />
                ))}
              </div>
            </div>

            {/* Testnet Section (if any) */}
            {testnetChains.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[3]
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[3]
                  }}>
                    <h2 style={{
                      fontSize: typography.fontSize.xl,
                      fontWeight: typography.fontWeight.bold,
                      fontFamily: typography.fontFamily.heading.join(', '),
                      color: colors.text.primary,
                      lineHeight: spacing[10],
                      margin: 0
                    }}>
                      Testnet Network
                    </h2>
                    <div style={{
                      backgroundColor: 'transparent',
                      border: `1px solid ${colors.primary.DEFAULT}`,
                      borderRadius: radius.sm,
                      padding: `${spacing[1]} ${spacing[2.5]}`,
                      fontSize: typography.fontSize.xs,
                      fontFamily: typography.fontFamily.body.join(', '),
                      fontWeight: typography.fontWeight.medium,
                      color: colors.primary.DEFAULT,
                      lineHeight: typography.lineHeight.none
                    }}>
                      {testnetChains.length} chains
                    </div>
                  </div>
                </div>

                <div>
                  {testnetChains.map((chain) => (
                    <ChainRow 
                      key={chain.id}
                      chain={chain}
                      isExpanded={expandedChain === chain.id}
                      onToggleExpand={() => toggleExpand(chain.id)}
                      onCopyRpc={copyToClipboard}
                      copiedChainId={copiedChainId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: spacing[4]
          }}>
            {sortedChains.map((chain, index) => {
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
                    backgroundColor: colors.background.secondary,
                    borderRadius: radius.md,
                    border: `1px solid rgba(0,113,247,0.1)`,
                    overflow: 'hidden'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    padding: spacing[6],
                    borderBottom: `1px solid rgba(0,113,247,0.1)`,
                    backgroundColor: '#EAF3FD'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{
                          fontSize: typography.fontSize.lg,
                          fontWeight: typography.fontWeight.bold,
                          color: colors.text.blue.DEFAULT,
                          fontFamily: typography.fontFamily.heading.join(', '),
                          margin: 0,
                          marginBottom: spacing[1]
                        }}>
                          {chain.name}
                        </h3>
                        <div style={{
                          fontSize: typography.fontSize.xs,
                          color: colors.text.blue.light,
                          fontFamily: typography.fontFamily.mono.join(', ')
                        }}>
                          Chain ID: {chain.chainId}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
                        <div style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                          border: `1px solid ${statusStyle.border}`,
                          borderRadius: radius.sm,
                          padding: `${spacing[1]} ${spacing[2]}`,
                          fontSize: typography.fontSize['2xs'],
                          fontFamily: typography.fontFamily.body.join(', '),
                          fontWeight: typography.fontWeight.medium,
                          lineHeight: spacing[3]
                        }}>
                          {chain.status}
                        </div>
                        
                        <div style={{
                          backgroundColor: 'rgba(0,113,247,0.05)',
                          color: colors.primary.DEFAULT,
                          border: `1px solid rgba(0,113,247,0.14)`,
                          borderRadius: radius.sm,
                          padding: `${spacing[1]} ${spacing[2]}`,
                          fontSize: typography.fontSize['2xs'],
                          fontFamily: typography.fontFamily.body.join(', '),
                          fontWeight: typography.fontWeight.medium,
                          lineHeight: spacing[3]
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
                          fontSize: typography.fontSize.sm,
                          fontWeight: typography.fontWeight.bold,
                          color: colors.text.blue.DEFAULT,
                          fontFamily: typography.fontFamily.heading.join(', ')
                        }}>
                          {chain.tvl}
                        </div>
                        <div style={{
                          fontSize: typography.fontSize['2xs'],
                          color: colors.text.blue.light,
                          fontFamily: typography.fontFamily.body.join(', ')
                        }}>
                          TVL
                        </div>
                      </div>
                      
                      <div>
                        <div style={{
                          fontSize: typography.fontSize.sm,
                          fontWeight: typography.fontWeight.bold,
                          color: colors.text.blue.DEFAULT,
                          fontFamily: typography.fontFamily.heading.join(', ')
                        }}>
                          {chain.tps}
                        </div>
                        <div style={{
                          fontSize: typography.fontSize['2xs'],
                          color: colors.text.blue.light,
                          fontFamily: typography.fontFamily.body.join(', ')
                        }}>
                          TPS
                        </div>
                      </div>
                      
                      <div>
                        <div style={{
                          fontSize: typography.fontSize.sm,
                          fontWeight: typography.fontWeight.bold,
                          color: colors.text.blue.DEFAULT,
                          fontFamily: typography.fontFamily.heading.join(', ')
                        }}>
                          {chain.gasPrice}
                        </div>
                        <div style={{
                          fontSize: typography.fontSize['2xs'],
                          color: colors.text.blue.light,
                          fontFamily: typography.fontFamily.body.join(', ')
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
                          backgroundColor: copiedChainId === chain.chainId ? 'rgba(34, 197, 94, 0.1)' : colors.background.primary,
                          color: copiedChainId === chain.chainId ? '#22C55E' : colors.primary.DEFAULT,
                          border: `1px solid ${copiedChainId === chain.chainId ? 'rgba(34, 197, 94, 0.3)' : 'rgba(0,113,247,0.14)'}`,
                          borderRadius: radius.sm,
                          padding: `${spacing[2]} ${spacing[3]}`,
                          fontSize: typography.fontSize['2xs'],
                          fontFamily: typography.fontFamily.body.join(', '),
                          fontWeight: typography.fontWeight.medium,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: spacing[1],
                          lineHeight: spacing[3]
                        }}
                      >
                        {copiedChainId === chain.chainId ? (
                          <>
                            <CheckIcon style={{ width: sizing.icon.xs, height: sizing.icon.xs }} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <DocumentDuplicateIcon style={{ width: sizing.icon.xs, height: sizing.icon.xs }} />
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
                          color: colors.text.inverse,
                          border: 'none',
                          borderRadius: radius.sm,
                          padding: `${spacing[2]} ${spacing[3]}`,
                          fontSize: typography.fontSize['2xs'],
                          fontFamily: typography.fontFamily.body.join(', '),
                          fontWeight: typography.fontWeight.bold,
                          cursor: 'pointer',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: spacing[1],
                          lineHeight: spacing[3]
                        }}
                      >
                        <ArrowTopRightOnSquareIcon style={{ width: sizing.icon.xs, height: sizing.icon.xs }} />
                        <span>Explorer</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </PageLayout>
  );
}