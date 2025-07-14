import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Square, 
  Settings, 
  Monitor, 
  Code, 
  ExternalLink, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Activity,
  Globe,
  Database,
  Zap,
  Terminal,
  Download,
  Book,
  Clock,
  Users,
  MessageCircle
} from 'lucide-react';

interface EnvironmentStatus {
  name: string;
  status: 'online' | 'offline' | 'starting';
  url?: string;
  description: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
  isExternal?: boolean;
  url?: string;
}

interface NetworkConfig {
  name: string;
  environment: 'local' | 'testnet' | 'mainnet';
  chainId: string;
  rpcUrl: string;
  explorerUrl?: string;
  color: string;
}

const DevelopmentDashboard: React.FC = () => {
  const [sandboxStatus, setSandboxStatus] = useState<'stopped' | 'starting' | 'running'>('stopped');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const environments: EnvironmentStatus[] = [
    {
      name: 'AggSandbox Local',
      status: sandboxStatus === 'running' ? 'online' : sandboxStatus === 'starting' ? 'starting' : 'offline',
      url: 'http://localhost:5577',
      description: 'Local cross-chain development environment'
    },
    {
      name: 'Cardona Testnet',
      status: 'online',
      description: '8 chains for semi-production testing'
    },
    {
      name: 'Bali Testnet', 
      status: 'online',
      description: '4 chains for development testing'
    },
    {
      name: 'Mainnet',
      status: 'online',
      description: '8+ production chains'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'start-sandbox',
      title: 'Start AggSandbox',
      description: 'Launch local development environment',
      icon: <Play className="w-5 h-5" />,
      color: 'from-[#0071F7] to-[#0071F7]/80',
      action: () => {
        setSandboxStatus('starting');
        setTimeout(() => setSandboxStatus('running'), 3000);
      }
    },
    {
      id: 'stop-sandbox',
      title: 'Stop AggSandbox',
      description: 'Stop local environment',
      icon: <Square className="w-5 h-5" />,
      color: 'from-[#0071F7]/30 to-[#0071F7]/30',
      action: () => setSandboxStatus('stopped')
    }
  ];

  const networkConfigs: NetworkConfig[] = [
    {
      name: 'Local L1',
      environment: 'local',
      chainId: '1',
      rpcUrl: 'http://127.0.0.1:8545',
      color: 'text-[#D9D9D9]/80'
    },
    {
      name: 'Local L2',
      environment: 'local', 
      chainId: '1101',
      rpcUrl: 'http://127.0.0.1:8546',
      color: 'text-[#D9D9D9]/80'
    },
    {
      name: 'Cardona Testnet',
      environment: 'testnet',
      chainId: '2442',
      rpcUrl: 'https://rpc.cardona.polygon.technology',
      explorerUrl: 'https://cardona-zkevm.polygonscan.com',
      color: 'text-white'
    },
    {
      name: 'Polygon zkEVM',
      environment: 'mainnet',
      chainId: '1101',
      rpcUrl: 'https://zkevm-rpc.com',
      explorerUrl: 'https://zkevm.polygonscan.com',
      color: 'text-[#0071F7]'
    }
  ];

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-[#0071F7]" />;
      case 'starting': return <Clock className="w-4 h-4 text-white animate-spin" />;
      case 'offline': return <AlertCircle className="w-4 h-4 text-white" />;
      default: return <AlertCircle className="w-4 h-4 text-[#D9D9D9]/80" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Development Dashboard</h1>
        <p className="text-[#D9D9D9]">Interactive tools and resources for building on Agglayer</p>
      </motion.div>

      {/* Environment Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          Environment Status
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {environments.map((env, index) => (
            <div
              key={index}
              className="p-4 bg-[#000000]/50 border border-[#D9D9D9]/20 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{env.name}</span>
                {getStatusIcon(env.status)}
              </div>
              <p className="text-sm text-[#D9D9D9]/80">{env.description}</p>
              {env.url && env.status === 'online' && (
                <a
                  href={env.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0071F7] hover:text-[#0071F7]/80 transition-colors mt-2 inline-flex items-center gap-1"
                >
                  {env.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.action}
              className={`p-4 bg-gradient-to-r ${action.color} rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-2">
                {action.icon}
                <span>{action.title}</span>
                {action.isExternal && <ExternalLink className="w-4 h-4" />}
              </div>
              <p className="text-sm opacity-90 text-left">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Network Configurations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Network Configurations
        </h2>
        <div className="grid gap-4">
          {networkConfigs.map((network, index) => (
            <div
              key={index}
              className="p-4 bg-[#000000]/30 border border-[#D9D9D9]/20 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white">{network.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-md bg-[#000000]/70 ${network.color}`}>
                    {network.environment}
                  </span>
                </div>
                <span className="text-sm text-[#D9D9D9]/80">Chain ID: {network.chainId}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#D9D9D9]/80 w-16">RPC:</span>
                  <code className="flex-1 text-sm text-[#D9D9D9] bg-[#000000] px-2 py-1 rounded font-mono">
                    {network.rpcUrl}
                  </code>
                  <button
                    onClick={() => copyToClipboard(network.rpcUrl, `${network.name} RPC`)}
                    className="p-1 hover:bg-[#000000]/70 rounded transition-colors"
                  >
                    {copiedText === `${network.name} RPC` ? (
                      <CheckCircle className="w-4 h-4 text-[#0071F7]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#D9D9D9]/80" />
                    )}
                  </button>
                </div>
                
                {network.explorerUrl && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#D9D9D9]/80 w-16">Explorer:</span>
                    <a
                      href={network.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#0071F7] hover:text-[#0071F7]/80 transition-colors"
                    >
                      {network.explorerUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Development Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Development Resources
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-[#000000]/30 border border-[#D9D9D9]/20 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-[#0071F7]" />
              <h3 className="text-lg font-semibold text-white">AggSandbox CLI</h3>
            </div>
            <div className="space-y-2 text-sm">
              <code className="block bg-[#000000] p-2 rounded text-[#0071F7]">aggsandbox start --detach</code>
              <code className="block bg-[#000000] p-2 rounded text-[#0071F7]">aggsandbox logs --follow</code>
              <code className="block bg-[#000000] p-2 rounded text-[#0071F7]">aggsandbox stop</code>
            </div>
          </div>
          
          <div className="p-6 bg-[#000000]/30 border border-[#D9D9D9]/20 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-6 h-6 text-[#0071F7]" />
              <h3 className="text-lg font-semibold text-white">SDK Installation</h3>
            </div>
            <div className="space-y-2 text-sm">
              <code className="block bg-[#000000] p-2 rounded text-[#0071F7]">npm install @maticnetwork/lxlyjs</code>
              <code className="block bg-[#000000] p-2 rounded text-[#0071F7]">yarn add @maticnetwork/lxlyjs</code>
            </div>
          </div>
          
          <div className="p-6 bg-[#000000]/30 border border-[#D9D9D9]/20 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Community</h3>
            </div>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discord Community</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <Book className="w-4 h-4" />
                <span>Developer Forums</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Copy Success Toast */}
      {copiedText && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-[#0071F7] text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {copiedText} copied!
        </motion.div>
      )}
    </div>
  );
};

export default DevelopmentDashboard;