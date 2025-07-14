import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Copy, 
  ExternalLink, 
  Globe, 
  BookOpen, 
  Zap, 
  Activity,
  Github,
  MessageCircle,
  Twitter,
  Settings,
  Code,
  Database,
  Shield
} from 'lucide-react'
import { useState, useCallback } from 'react'
import type { EnhancedChainData } from './Scene'

interface CelestialSidebarProps {
  isOpen: boolean
  onClose: () => void
  celestialBody: {
    type: 'sun' | 'planet'
    data?: EnhancedChainData
  } | null
}

// Copy to clipboard utility
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
}

// Utility to ensure chain data has required fields with fallbacks
const enrichChainData = (chainData: any) => {
  const enriched = {
    ...chainData,
    rpcUrls: chainData.rpcUrls || {
      http: [`https://rpc-${chainData.chainId}.example.com`],
    },
    nativeCurrency: chainData.nativeCurrency || {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: chainData.blockExplorerUrls || [`https://explorer-${chainData.chainId}.example.com`],
    status: chainData.status || 'active',
    brandColor: chainData.brandColor || '#6b7280'
  };
  
  return enriched;
}

const CelestialSidebar = ({ isOpen, onClose, celestialBody }: CelestialSidebarProps) => {
  const [activeTab, setActiveTab] = useState<'network' | 'resources' | 'status'>('network');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleCopy = useCallback(async (text: string, label: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(null), 2000);
    }
  }, []);

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'mainnet': return '#00d4aa';
      case 'cardona': return '#ff8c42';
      case 'bali': return '#8b5cf6';
      case 'Agglayer': return '#3b82f6';
      default: return '#00d4aa';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };


  // Enrich chain data with fallbacks
  const enrichedChainData = celestialBody?.data ? enrichChainData(celestialBody.data) : null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && celestialBody && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full h-full pointer-events-auto"
        >
          <div className="relative h-full w-full border-r border-gray-700 bg-black/40 backdrop-blur-md overflow-hidden">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute right-4 top-4 z-10 rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <div className="flex h-full flex-col overflow-hidden">
              {celestialBody.type === 'sun' ? (
                /* Agglayer Sun Content */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 overflow-y-auto p-6"
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                        style={{ backgroundColor: '#3b82f6' }}
                      >
                        ☀️
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white">Agglayer</h1>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                            v0.3
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-sm text-gray-400">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-6 text-white">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-2">Overview</h3>
                      <p className="text-gray-400 leading-relaxed">
                        The Agglayer serves as the central hub connecting all blockchain networks in the ecosystem, 
                        enabling seamless cross-chain communication and unified liquidity.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-3">Core Functions</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-gray-400">
                          <Shield className="h-4 w-4 text-blue-400" />
                          <span>Cross-chain security validation</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Database className="h-4 w-4 text-blue-400" />
                          <span>Unified state management</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Zap className="h-4 w-4 text-blue-400" />
                          <span>Instant finality coordination</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-3">Developer Resources</h3>
                      <div className="space-y-2">
                        <a 
                          href="https://docs.polygon.technology/agglayer/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>Documentation</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <a 
                          href="https://github.com/Agglayer-devs" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub Repository</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Chain/Planet Content */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: enrichedChainData?.brandColor || getEnvironmentColor(enrichedChainData?.environment || '') }}
                      >
                        {enrichedChainData?.logo ? (
                          <img src={enrichedChainData.logo} alt={enrichedChainData.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          enrichedChainData?.name?.charAt(0) || '?'
                        )}
                      </div>
                      <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white">{enrichedChainData?.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                          <span 
                            className="px-2 py-1 text-xs rounded-full capitalize"
                            style={{ 
                              backgroundColor: `${getEnvironmentColor(enrichedChainData?.environment || '')}20`,
                              color: getEnvironmentColor(enrichedChainData?.environment || '')
                            }}
                          >
                            {enrichedChainData?.environment}
                          </span>
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusColor(enrichedChainData?.status) }}
                            ></div>
                            <span className="text-sm text-gray-400">{enrichedChainData?.status || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                      {enrichedChainData?.blockExplorerUrls?.[0] && (
                        <a
                          href={enrichedChainData.blockExplorerUrls[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                        >
                          <Globe className="h-4 w-4" />
                          Explorer
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="px-6 border-b border-gray-700">
                    <div className="flex gap-1">
                      {[
                        { id: 'network', label: 'Network', icon: Settings },
                        { id: 'resources', label: 'Resources', icon: Code },
                        { id: 'status', label: 'Status', icon: Activity }
                      ].map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => setActiveTab(id as any)}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === id 
                              ? 'text-white border-blue-400' 
                              : 'text-gray-400 border-transparent hover:text-gray-300'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'network' && (
                      <NetworkTab 
                        chainData={enrichedChainData} 
                        onCopy={handleCopy} 
                        copySuccess={copySuccess}
                      />
                    )}
                    {activeTab === 'resources' && (
                      <ResourcesTab chainData={enrichedChainData} />
                    )}
                    {activeTab === 'status' && (
                      <StatusTab chainData={enrichedChainData} />
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Network Tab Component
const NetworkTab = ({ 
  chainData, 
  onCopy, 
  copySuccess 
}: { 
  chainData?: EnhancedChainData; 
  onCopy: (text: string, label: string) => void;
  copySuccess: string | null;
}) => {
  if (!chainData) return null;

  return (
    <div className="space-y-6">
      {/* RPC Endpoints */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          RPC Endpoints
        </h3>
        <div className="space-y-2">
          {chainData.rpcUrls.http.map((url, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg"
            >
              <span className="flex-1 text-gray-300 text-sm font-mono break-all">{url}</span>
              <button
                onClick={() => onCopy(url, 'RPC URL')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Copy RPC URL"
              >
                <Copy className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          ))}
          {chainData.rpcUrls.websocket?.map((url, index) => (
            <div 
              key={`ws-${index}`}
              className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg"
            >
              <span className="flex-1 text-gray-300 text-sm font-mono break-all">{url}</span>
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">WS</span>
              <button
                onClick={() => onCopy(url, 'WebSocket URL')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Copy WebSocket URL"
              >
                <Copy className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chain Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Chain Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Chain ID</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono">{chainData.chainId}</span>
              <button
                onClick={() => onCopy(chainData.chainId.toString(), 'Chain ID')}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Copy className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Currency</span>
            <div className="flex items-center gap-2">
              <span className="text-white">{chainData.nativeCurrency.symbol}</span>
              <button
                onClick={() => onCopy(chainData.nativeCurrency.symbol, 'Currency Symbol')}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Copy className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {chainData.blockExplorerUrls[0] && (
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Block Explorer</span>
              <a
                href={chainData.blockExplorerUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="text-sm">View Explorer</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Technical Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <span className="text-gray-400">Type</span>
            <span className="text-white">{chainData.rollupVerifierType}</span>
          </div>
          
          {chainData.consensusMechanism && (
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Consensus</span>
              <span className="text-white">{chainData.consensusMechanism}</span>
            </div>
          )}
          
          {chainData.blockTime && (
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Block Time</span>
              <span className="text-white">{chainData.blockTime}</span>
            </div>
          )}
          
          {chainData.finalityTime && (
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Finality</span>
              <span className="text-white">{chainData.finalityTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Copy Success Toast */}
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {copySuccess} copied!
        </div>
      )}
    </div>
  );
};

// Resources Tab Component
const ResourcesTab = ({ chainData }: { chainData?: EnhancedChainData }) => {
  if (!chainData) return null;

  return (
    <div className="space-y-6">
      {/* Documentation */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Documentation
        </h3>
        <div className="space-y-2">
          {chainData.documentation?.quickStart && (
            <a
              href={chainData.documentation.quickStart}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="flex-1 text-gray-300">Quick Start Guide</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.documentation?.api && (
            <a
              href={chainData.documentation.api}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Code className="h-4 w-4 text-green-400" />
              <span className="flex-1 text-gray-300">API Reference</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.documentation?.sdk && (
            <a
              href={chainData.documentation.sdk}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Database className="h-4 w-4 text-purple-400" />
              <span className="flex-1 text-gray-300">SDK Documentation</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.documentation?.contracts && (
            <a
              href={chainData.documentation.contracts}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Shield className="h-4 w-4 text-orange-400" />
              <span className="flex-1 text-gray-300">Smart Contracts</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
        </div>
      </div>

      {/* Infrastructure */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Infrastructure
        </h3>
        <div className="space-y-2">
          {chainData.faucet && (
            <a
              href={chainData.faucet}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="flex-1 text-gray-300">Faucet</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.bridge && (
            <a
              href={chainData.bridge}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="flex-1 text-gray-300">Bridge</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.gasStation && (
            <a
              href={chainData.gasStation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Activity className="h-4 w-4 text-green-400" />
              <span className="flex-1 text-gray-300">Gas Station</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.statusPage && (
            <a
              href={chainData.statusPage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Activity className="h-4 w-4 text-red-400" />
              <span className="flex-1 text-gray-300">Status Page</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
        </div>
      </div>

      {/* Community */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Community
        </h3>
        <div className="space-y-2">
          {chainData.social?.discord && (
            <a
              href={chainData.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-indigo-400" />
              <span className="flex-1 text-gray-300">Discord</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.social?.github && (
            <a
              href={chainData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Github className="h-4 w-4 text-gray-400" />
              <span className="flex-1 text-gray-300">GitHub</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.social?.twitter && (
            <a
              href={chainData.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              <span className="flex-1 text-gray-300">Twitter</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
          
          {chainData.social?.website && (
            <a
              href={chainData.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
            >
              <Globe className="h-4 w-4 text-green-400" />
              <span className="flex-1 text-gray-300">Website</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Status Tab Component
const StatusTab = ({ chainData }: { chainData?: EnhancedChainData }) => {
  if (!chainData) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Network Metrics
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Network Status</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getStatusColor(chainData.status) }}
                ></div>
                <span className="text-white capitalize">{chainData.status || 'Unknown'}</span>
              </div>
            </div>
          </div>
          
          {chainData.tps && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Transactions per Second</span>
                <span className="text-white font-mono">{chainData.tps}</span>
              </div>
            </div>
          )}
          
          {chainData.uptime && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-green-400 font-mono">{chainData.uptime}</span>
              </div>
            </div>
          )}
          
          {chainData.lastVerified && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Last Verified</span>
                <span className="text-white">{chainData.lastVerified}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Performance
        </h3>
        <div className="space-y-3">
          {chainData.blockTime && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Block Time</span>
                <span className="text-white">{chainData.blockTime}</span>
              </div>
            </div>
          )}
          
          {chainData.finalityTime && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Finality Time</span>
                <span className="text-white">{chainData.finalityTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CelestialSidebar