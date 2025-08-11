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
    description: 'JavaScript library for cross-chain interactions on Agglayer with Unified Bridge support',
    category: 'essential',
    quickActions: [
      { label: 'GitHub', url: 'https://github.com/0xPolygon/lxly.js', external: true },
      { label: 'npm', url: 'https://www.npmjs.com/package/@0xpolygon/lxly.js', external: true },
      { label: 'Documentation', url: 'https://github.com/0xPolygon/lxly.js#readme', external: true },
    ],
    quickInstall: 'npm install @0xpolygon/lxly.js',
    features: [
      'Unified Bridge integration',
      'Cross-chain transfers',
      'TypeScript support',
      'Event monitoring',
    ],
  },
  {
    id: 'aggsandbox',
    name: 'AggSandbox',
    icon: 'box',
    description: 'Local development environment with fork mode support, multi-L2 testing, and rich CLI tooling',
    category: 'essential',
    quickActions: [
      { label: 'GitHub', url: 'https://github.com/0xPolygon/lxly.js', external: true },
      { label: 'npm', url: 'https://www.npmjs.com/package/@0xpolygon/lxly.js', external: true },
      { label: 'Documentation', url: 'https://github.com/0xPolygon/lxly.js#readme', external: true },
    ],
    quickInstall: 'git clone https://github.com/NethermindEth/agg-sandbox.git && cd agg-sandbox && make install',
    features: [
      'Local & Fork modes',
      'Multi-L2 support',
      'Event monitoring',
      'Bridge querying',
    ],
  },
  {
    id: 'bridge-interface',
    name: 'Bridge Interface',
    icon: 'bridge',
    description: 'Visual tool for testing cross-chain transfers during development',
    category: 'essential',
    quickActions: [
      { label: 'GitHub', url: 'https://github.com/0xPolygon/lxly.js', external: true },
      { label: 'npm', url: 'https://www.npmjs.com/package/@0xpolygon/lxly.js', external: true },
      { label: 'Documentation', url: 'https://github.com/0xPolygon/lxly.js#readme', external: true },
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
    id: 'aggvisualizer',
    name: 'Aggvisualizer',
    icon: 'tool',
    description: 'Interactive visualization of Agglayer network topology and cross-chain transactions',
    category: 'essential',
    quickActions: [
      { label: 'Open Visualizer', url: 'https://visualizer.agglayer.dev/', external: true },
      { label: 'Documentation', url: 'https://docs.agglayer.dev/visualizer', external: true },
    ],
    features: [
      'Real-time transaction flow',
      'Network topology view',
      'Performance metrics',
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