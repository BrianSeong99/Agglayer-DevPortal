'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AggniversePlanets from './components/AggniversePlanets';
import { Button } from '@/shared/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/ui/toggle-group';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { fadeInUp, scaleIn, animationConfig, staggerContainer, staggerItem } from '@/shared/config/animations';
import { chains } from './components/solar-system/components/Scene';

// Ethereum types
declare global {
  interface Window {
    ethereum?: any;
  }
}

import {
  GlobeAltIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  CommandLineIcon,
  CubeIcon,
  ChartBarIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function AggNiversePage() {
  const [viewMode, setViewMode] = useState<'visual' | 'developer'>('developer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [copiedChainId, setCopiedChainId] = useState<number | null>(null);
  const [compareChains, setCompareChains] = useState<string[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Copy to clipboard function
  const copyToClipboard = async (text: string, chainId: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedChainId(chainId);
    setTimeout(() => setCopiedChainId(null), 2000);
  };

  // Filter chains based on search and filters
  const filteredChains = chains.filter((chain) => {
    const matchesSearch = chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chain.chainId.toString().includes(searchQuery);
    const matchesNetwork = selectedNetwork === 'all' || chain.environment === selectedNetwork;
    const matchesFeatures = selectedFeatures.length === 0 || 
      (selectedFeatures.includes('evm') && chain.rollupVerifierType !== 'ALGateway') ||
      (selectedFeatures.includes('high-throughput') && chain.tps && parseInt(chain.tps) > 1000) ||
      (selectedFeatures.includes('low-gas') && chain.environment !== 'mainnet') ||
      (selectedFeatures.includes('smart-contracts') && chain.rollupVerifierType !== 'ALGateway');
    
    return matchesSearch && matchesNetwork && matchesFeatures;
  });

  // Group chains by environment
  const groupedChains = filteredChains.reduce((acc, chain) => {
    if (!acc[chain.environment]) {
      acc[chain.environment] = [];
    }
    acc[chain.environment].push(chain);
    return acc;
  }, {} as Record<string, typeof chains>);

  // Get environment color
  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'mainnet': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'cardona': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'bali': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  // Toggle chain comparison
  const toggleCompareChain = (chainName: string) => {
    if (compareChains.includes(chainName)) {
      setCompareChains(compareChains.filter(name => name !== chainName));
    } else if (compareChains.length < 3) {
      setCompareChains([...compareChains, chainName]);
    }
  };

  return (
    <>
      {/* Visual Mode - 3D Background */}
      {viewMode === 'visual' && (
        <div className="fixed inset-0 z-0">
          <AggniversePlanets isInteractive={true} />
        </div>
      )}
      
      {/* Page content */}
      <div className={`relative min-h-screen flex flex-col ${viewMode === 'developer' ? 'bg-black z-10' : 'pointer-events-none'}`}>
        {/* Header with View Toggle */}
        <div className={`p-6 ${viewMode === 'visual' && isHeaderVisible ? 'flex-1 flex flex-col justify-center' : ''} ${viewMode === 'visual' ? 'pointer-events-none' : ''}`}>
          <div className="max-w-7xl mx-auto w-full">
            {isHeaderVisible ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative pointer-events-auto"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-20 mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white">Agglayer Network Explorer</h1>
                    <p className="text-[#D9D9D9] mt-2">
                      {viewMode === 'visual' 
                        ? 'Explore 20+ connected chains in the Agglayer ecosystem'
                        : 'Technical details and developer resources for all chains'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ToggleGroup
                      type="single"
                      value={viewMode}
                      onValueChange={(value) => value && setViewMode(value as 'visual' | 'developer')}
                      className="bg-[#17171797] border border-white/10"
                    >
                      <ToggleGroupItem value="visual" className="gap-2">
                        <GlobeAltIcon className="w-4 h-4" />
                        Visual View
                      </ToggleGroupItem>
                      <ToggleGroupItem value="developer" className="gap-2">
                        <ListBulletIcon className="w-4 h-4" />
                        Developer View
                      </ToggleGroupItem>
                    </ToggleGroup>
                    
                    {/* Close button - only in visual view */}
                    {viewMode === 'visual' && (
                      <Button
                        onClick={() => setIsHeaderVisible(false)}
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/10"
                      >
                        <XMarkIcon className="w-5 h-5 text-white" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Show button when header is hidden */
              <div className="fixed top-6 right-6 z-20 pointer-events-auto">
                <Button
                  onClick={() => setIsHeaderVisible(true)}
                  variant="outline"
                  size="sm"
                  className="bg-black/60 backdrop-blur-xl border-white/10 hover:bg-white/10 text-white"
                >
                  Show Controls
                </Button>
              </div>
            )}

            {/* Developer View Content */}
            {viewMode === 'developer' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D9D9D9]" />
                    <Input
                      type="text"
                      placeholder="Search by chain name or chain ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#17171797] border-white/10 text-white placeholder:text-[#D9D9D9]/50"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-4">
                    {/* Network Filter */}
                    <div className="flex items-center gap-2">
                      <FunnelIcon className="w-4 h-4 text-[#D9D9D9]" />
                      <span className="text-sm text-[#D9D9D9]">Network:</span>
                      <ToggleGroup
                        type="single"
                        value={selectedNetwork}
                        onValueChange={(value) => value && setSelectedNetwork(value)}
                        className="bg-[#17171797] border border-white/10"
                      >
                        <ToggleGroupItem value="all" className="text-xs">All</ToggleGroupItem>
                        <ToggleGroupItem value="mainnet" className="text-xs">Mainnet</ToggleGroupItem>
                        <ToggleGroupItem value="cardona" className="text-xs">Cardona</ToggleGroupItem>
                        <ToggleGroupItem value="bali" className="text-xs">Bali</ToggleGroupItem>
                      </ToggleGroup>
                    </div>

                    {/* Feature Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#D9D9D9]">Features:</span>
                      <ToggleGroup
                        type="multiple"
                        value={selectedFeatures}
                        onValueChange={setSelectedFeatures}
                        className="bg-[#17171797] border border-white/10"
                      >
                        <ToggleGroupItem value="evm" className="text-xs">EVM Compatible</ToggleGroupItem>
                        <ToggleGroupItem value="high-throughput" className="text-xs">High Throughput</ToggleGroupItem>
                        <ToggleGroupItem value="low-gas" className="text-xs">Low Gas Fees</ToggleGroupItem>
                        <ToggleGroupItem value="smart-contracts" className="text-xs">Smart Contracts</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>

                  {/* Results Count */}
                  <p className="text-sm text-[#D9D9D9]/80">
                    Showing {filteredChains.length} of {chains.length} chains
                  </p>
                </div>

                {/* Compare Chains Button */}
                {compareChains.length > 0 && (
                  <div className="mb-4">
                    <Button
                      onClick={() => {
                        // This would open a comparison modal/view
                        console.log('Compare chains:', compareChains);
                      }}
                      className="bg-[#0071F7] hover:bg-[#0071F7]/80"
                    >
                      Compare {compareChains.length} Chains
                    </Button>
                    <Button
                      onClick={() => setCompareChains([])}
                      variant="ghost"
                      className="ml-2"
                    >
                      Clear Selection
                    </Button>
                  </div>
                )}

                {/* Chain Cards Grid */}
                {Object.entries(groupedChains).map(([environment, envChains]) => (
                  <div key={environment} className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 capitalize flex items-center gap-3">
                      {environment} Network
                      <Badge className={getEnvironmentColor(environment)}>
                        {envChains.length} chains
                      </Badge>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {envChains.map((chain) => (
                        <Card 
                          key={chain.chainId}
                          className={`bg-[#17171797] border-white/10 hover:border-[#0071F7]/50 transition-all ${
                            compareChains.includes(chain.name) ? 'ring-2 ring-[#0071F7]' : ''
                          }`}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-white">{chain.name}</CardTitle>
                                <CardDescription className="text-[#D9D9D9]">
                                  <Badge className={`${getEnvironmentColor(environment)} mt-2`}>
                                    {chain.status === 'active' ? '● Active' : '○ Inactive'}
                                  </Badge>
                                </CardDescription>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleCompareChain(chain.name)}
                                className={compareChains.includes(chain.name) ? 'text-[#0071F7]' : ''}
                              >
                                {compareChains.includes(chain.name) ? 'Selected' : 'Compare'}
                              </Button>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            {/* Technical Details */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-[#D9D9D9]/80">Chain ID:</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-mono text-white">{chain.chainId}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => copyToClipboard(chain.chainId.toString(), chain.chainId)}
                                  >
                                    {copiedChainId === chain.chainId ? (
                                      <CheckIcon className="w-3 h-3 text-green-400" />
                                    ) : (
                                      <DocumentDuplicateIcon className="w-3 h-3" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-[#D9D9D9]/80">RPC Endpoint:</span>
                                {chain.rpcUrls?.http[0] ? (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto py-1 px-2"
                                    onClick={() => copyToClipboard(chain.rpcUrls!.http[0], chain.chainId)}
                                  >
                                    <CommandLineIcon className="w-3 h-3 mr-1" />
                                    Copy RPC
                                  </Button>
                                ) : (
                                  <span className="text-sm text-[#D9D9D9]/50">Not available</span>
                                )}
                              </div>
                              
                              {chain.blockExplorerUrls && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-[#D9D9D9]/80">Explorer:</span>
                                  <a
                                    href={chain.blockExplorerUrls[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#0071F7] hover:text-[#0071F7]/80 flex items-center gap-1"
                                  >
                                    View
                                    <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                                  </a>
                                </div>
                              )}
                              
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-[#D9D9D9]/80">Gas Token:</span>
                                <span className="text-sm text-white">{chain.nativeCurrency?.symbol || 'ETH'}</span>
                              </div>
                              
                              {chain.blockTime && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-[#D9D9D9]/80">Block Time:</span>
                                  <span className="text-sm text-white">{chain.blockTime}</span>
                                </div>
                              )}
                              
                              {chain.tps && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-[#D9D9D9]/80">TPS:</span>
                                  <span className="text-sm text-white">{chain.tps}</span>
                                </div>
                              )}
                            </div>

                            {/* Developer Resources */}
                            <div className="pt-4 border-t border-white/10 space-y-2">
                              {/* Primary Actions */}
                              <div className="flex flex-wrap gap-2">
                                {chain.blockExplorerUrls && chain.blockExplorerUrls[0] && (
                                  <Button variant="outline" size="sm" asChild className="flex-1">
                                    <a 
                                      href={chain.blockExplorerUrls[0]} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      <MagnifyingGlassIcon className="w-3 h-3" />
                                      Explorer
                                    </a>
                                  </Button>
                                )}
                                {chain.faucet && (
                                  <Button variant="outline" size="sm" asChild className="flex-1">
                                    <a 
                                      href={chain.faucet} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      💧
                                      Faucet
                                    </a>
                                  </Button>
                                )}
                              </div>
                              
                              {/* Secondary Actions */}
                              <div className="flex flex-wrap gap-2">
                                {chain.documentation?.quickStart && (
                                  <Button variant="outline" size="sm" asChild className="flex-1">
                                    <a 
                                      href={chain.documentation.quickStart} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      📚
                                      Docs
                                    </a>
                                  </Button>
                                )}
                                {chain.social?.discord && (
                                  <Button variant="outline" size="sm" asChild className="flex-1">
                                    <a 
                                      href={chain.social.discord} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      💬
                                      Discord
                                    </a>
                                  </Button>
                                )}
                              </div>
                              
                              {/* RPC URL Copy Button */}
                              {chain.rpcUrls?.http && chain.rpcUrls.http[0] && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full justify-between"
                                  onClick={() => copyToClipboard(chain.rpcUrls?.http[0] || '', chain.chainId)}
                                >
                                  <span className="flex items-center gap-2">
                                    <CommandLineIcon className="w-3 h-3" />
                                    RPC URL
                                  </span>
                                  {copiedChainId === chain.chainId ? (
                                    <CheckIcon className="w-3 h-3 text-green-400" />
                                  ) : (
                                    <DocumentDuplicateIcon className="w-3 h-3" />
                                  )}
                                </Button>
                              )}
                              
                            </div>

                            {/* Quick Actions */}
                            <div className="pt-4 space-y-2">
                              <Button 
                                className="w-full bg-[#0071F7]/10 hover:bg-[#0071F7]/20 text-[#0071F7] border border-[#0071F7]/30"
                                onClick={async () => {
                                  try {
                                    if (typeof window.ethereum !== 'undefined') {
                                      await window.ethereum.request({
                                        method: 'wallet_addEthereumChain',
                                        params: [{
                                          chainId: `0x${chain.chainId.toString(16)}`,
                                          chainName: chain.name,
                                          rpcUrls: chain.rpcUrls?.http || [],
                                          nativeCurrency: chain.nativeCurrency || {
                                            name: 'ETH',
                                            symbol: 'ETH',
                                            decimals: 18
                                          },
                                          blockExplorerUrls: chain.blockExplorerUrls || []
                                        }]
                                      });
                                    } else {
                                      alert('MetaMask is not installed!');
                                    }
                                  } catch (error) {
                                    console.error('Error adding chain to MetaMask:', error);
                                  }
                                }}
                              >
                                <CubeIcon className="w-4 h-4 mr-2" />
                                Add to MetaMask
                              </Button>
                              
                              {/* Compare Chain Button */}
                              <Button 
                                variant={compareChains.includes(chain.name) ? "default" : "outline"}
                                size="sm"
                                className="w-full"
                                onClick={() => toggleCompareChain(chain.name)}
                                disabled={!compareChains.includes(chain.name) && compareChains.length >= 3}
                              >
                                <ChartBarIcon className="w-4 h-4 mr-2" />
                                {compareChains.includes(chain.name) ? 'Remove from Compare' : 'Compare Chain'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Developer Quick Actions Panel */}
                <div className="fixed bottom-6 right-6 space-y-2">
                  <Button
                    onClick={() => window.open('/tools/faucet', '_blank')}
                    className="bg-[#0071F7] hover:bg-[#0071F7]/80 shadow-lg"
                  >
                    Get Test Tokens
                  </Button>
                  <Button
                    onClick={() => window.open('https://docs.agglayer.dev', '_blank')}
                    variant="outline"
                    className="shadow-lg w-full"
                  >
                    Integration Guide
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Visual View Instructions */}
            {viewMode === 'visual' && isHeaderVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#17171797] border border-white/10 rounded-lg p-8 backdrop-blur-sm max-w-2xl mx-auto pointer-events-auto"
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Explore the Agglayer Network</h2>
                <div className="space-y-3 text-[#D9D9D9] mb-8">
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#0071F7]/20 flex items-center justify-center text-[#0071F7] text-sm">•</span>
                    Click and drag to rotate the view
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#00D4AA]/20 flex items-center justify-center text-[#00D4AA] text-sm">•</span>
                    Scroll to zoom in and out
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] text-sm">•</span>
                    Click on any planet to see chain details
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF8C42] text-sm">•</span>
                    Use the search bar to find specific chains
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setViewMode('developer')}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Switch to Developer View
                  </Button>
                  <Button
                    onClick={() => window.open('https://docs.agglayer.dev', '_blank')}
                    className="bg-[#0071F7] hover:bg-[#0071F7]/80 w-full sm:w-auto"
                    size="lg"
                  >
                    View Documentation
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}