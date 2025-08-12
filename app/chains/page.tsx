'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import SubHeader from '@/shared/components/layouts/SubHeader';
import ViewToggle from './components/ViewToggle';
import SearchAndFilters from './components/SearchAndFilters';
import ChainTableHeader from './components/ChainTableHeader';
import ChainRow from './components/ChainRow';
import ChainGridCard from './components/ChainGridCard';
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
      <div style={{ 
        width: sizing.container.lg,
        marginBottom: '96px'
      }}>
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
              <SubHeader
                title="Mainnet Network"
                badgeText={`${mainnetChains.length} chains`}
                actionText="Explore all"
                onActionClick={() => console.log('Explore all mainnet chains')}
                theme="light"
              />

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
                <SubHeader
                  title="Testnet Network"
                  badgeText={`${testnetChains.length} chains`}
                  theme="light"
                />

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
              <SubHeader
                title="Mainnet Network"
                badgeText={`${mainnetChains.length} chains`}
                actionText="Explore all"
                onActionClick={() => console.log('Explore all mainnet chains')}
                theme="light"
              />

              {/* Grid Layout - 3 columns per row */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[3],
                borderRadius: '60px',
                width: '940px'
              }}>
                {/* First Row - 3 Cards */}
                <div style={{
                  display: 'flex',
                  gap: spacing[3],
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {mainnetChains.slice(0, 3).map((chain, index) => (
                    <ChainGridCard
                      key={chain.id}
                      chain={chain}
                      index={index}
                      copiedChainId={copiedChainId}
                      onCopyRpc={copyToClipboard}
                    />
                  ))}
                </div>

                {/* Second Row - 3 Cards */}
                {mainnetChains.length > 3 && (
                  <div style={{
                    display: 'flex',
                    gap: spacing[3],
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {mainnetChains.slice(3, 6).map((chain, index) => (
                      <ChainGridCard
                        key={chain.id}
                        chain={chain}
                        index={index + 3}
                        copiedChainId={copiedChainId}
                        onCopyRpc={copyToClipboard}
                      />
                    ))}
                  </div>
                )}

                {/* Third Row - 3 Cards */}
                {mainnetChains.length > 6 && (
                  <div style={{
                    display: 'flex',
                    gap: spacing[3],
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {mainnetChains.slice(6, 9).map((chain, index) => (
                      <ChainGridCard
                        key={chain.id}
                        chain={chain}
                        index={index + 6}
                        copiedChainId={copiedChainId}
                        onCopyRpc={copyToClipboard}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Testnet Section (if any) */}
            {testnetChains.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing[3]
              }}>
                <SubHeader
                  title="Testnet Network"
                  badgeText={`${testnetChains.length} chains`}
                  theme="light"
                />

                {/* Testnet Grid */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing[3],
                  borderRadius: '60px',
                  width: '940px'
                }}>
                  {/* Testnet Row */}
                  <div style={{
                    display: 'flex',
                    gap: spacing[3],
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {testnetChains.slice(0, 3).map((chain, index) => (
                      <ChainGridCard
                        key={chain.id}
                        chain={chain}
                        index={index}
                        copiedChainId={copiedChainId}
                        onCopyRpc={copyToClipboard}
                      />
                    ))}
                    {/* Empty placeholder to maintain 3-column layout */}
                    {testnetChains.length < 3 && (
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
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}