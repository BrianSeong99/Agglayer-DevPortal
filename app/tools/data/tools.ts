export interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'essential' | 'additional';
  quickActions: {
    label: string;
    url: string;
    external?: boolean;
  }[];
  quickInstall?: string;
  systemRequirements?: string[];
  features?: string[];
  availableNetworks?: string[];
}

export const tools: Tool[] = [
  {
    id: 'lxly-sdk',
    name: 'lxly.js SDK',
    icon: 'package',
    description: 'Production-ready SDK with TypeScript support, auto gas optimization, and built-in error handling',
    category: 'essential',
    quickActions: [
      { label: 'Documentation', url: 'https://docs.agglayer.dev/sdk', external: true },
      { label: 'GitHub', url: 'https://github.com/agglayer/lxly.js', external: true },
      { label: 'npm', url: 'https://npmjs.com/package/@agglayer/lxly.js', external: true },
    ],
    quickInstall: 'npm install @agglayer/lxly.js',
  },
  {
    id: 'aggsandbox',
    name: 'AggSandbox',
    icon: 'box',
    description: 'Local development environment with pre-configured test chains and instant block times',
    category: 'essential',
    quickActions: [
      { label: 'Download', url: '/tools/sandbox/download' },
      { label: 'Setup Guide', url: 'https://docs.agglayer.dev/sandbox', external: true },
      { label: 'GitHub', url: 'https://github.com/agglayer/sandbox', external: true },
    ],
    systemRequirements: [
      'Docker Desktop',
      '8GB RAM minimum',
      '10GB free disk space',
    ],
  },
  {
    id: 'bridge-interface',
    name: 'Bridge Interface',
    icon: 'bridge',
    description: 'Visual tool for testing cross-chain transfers during development',
    category: 'essential',
    quickActions: [
      { label: 'Open Bridge', url: '/tools/bridge' },
      { label: 'Integration Guide', url: 'https://docs.agglayer.dev/bridge', external: true },
      { label: 'API Reference', url: 'https://docs.agglayer.dev/bridge-api', external: true },
    ],
    features: [
      'Test all token types',
      'Transaction history',
      'Gas estimation',
    ],
  },
  {
    id: 'testnet-faucet',
    name: 'Testnet Faucet',
    icon: 'droplet',
    description: 'Get test tokens instantly for Cardona and Bali testnets',
    category: 'essential',
    quickActions: [
      { label: 'Get Tokens', url: '/tools/faucet' },
      { label: 'Network Info', url: '/aggniverse?network=testnet' },
      { label: 'Token List', url: '/tools/faucet#tokens' },
    ],
    availableNetworks: [
      'Cardona Testnet',
      'Bali Testnet',
      '10 tokens per day limit',
    ],
  },
  {
    id: 'special-k',
    name: 'Special K',
    icon: 'tool',
    description: 'Katana\'s local development tool for fast chain deployment',
    category: 'additional',
    quickActions: [
      { label: 'View Project', url: 'https://github.com/katana-network/specialk', external: true },
    ],
  },
  {
    id: 'polygon-pos-kit',
    name: 'Polygon PoS Development Kit',
    icon: 'tool',
    description: 'Tools for Polygon PoS integration and contract deployment',
    category: 'additional',
    quickActions: [
      { label: 'Learn More', url: 'https://polygon.technology/developers', external: true },
    ],
  },
];