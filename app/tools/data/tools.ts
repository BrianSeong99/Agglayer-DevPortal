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
    icon: '/img/dev-tools/lxlyjs.svg',
    description: 'JavaScript library for cross-chain interactions on Agglayer with Unified Bridge support',
    category: 'essential',
    quickActions: [
      { label: 'GitHub', url: 'https://github.com/0xPolygon/lxly.js', external: true },
      { label: 'Doc', url: 'https://github.com/0xPolygon/lxly.js#readme', external: true },
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
    icon: '/img/dev-tools/aggsandbox.svg',
    description: 'Local development environment with fork mode support, multi-L2 testing, and rich CLI tooling',
    category: 'essential',
    quickActions: [
      { label: 'GitHub', url: 'https://github.com/agglayer/aggsandbox.git', external: true },
      { label: 'Doc', url: 'https://docs.agglayer.dev/agglayer/aggsandbox/', external: true },
    ],
    quickInstall: 'git clone https://github.com/agglayer/aggsandbox.git && cd aggsandbox && make install',
    features: [
      'Local & Fork modes',
      'Multi-L2 support',
      'Event monitoring',
      'Bridge querying',
    ],
  },
  {
    id: 'aggvisualizer',
    name: 'AggVisualizer',
    icon: '/img/dev-tools/aggvisualizer.svg',
    description: 'Interactive visualization of Agglayer network topology and cross-chain transactions',
    category: 'essential',
    quickActions: [
      { label: 'Open', url: 'https://visualizer.agglayer.dev/', external: true },
      // { label: 'Doc', url: 'https://docs.agglayer.dev/visualizer', external: true },
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
    icon: '/img/special-k-icon.svg',
    description: 'Katana\'s local development tool for fast chain deployment',
    category: 'additional',
    quickActions: [
      { label: 'View Repo', url: 'https://github.com/katana-network/specialk', external: true },
    ],
  },
  // {
  //   id: 'polygon-pos-kit',
  //   name: 'Polygon PoS Development Kit',
  //   icon: '/img/pos-dev-kit-icon.svg',
  //   description: 'Tools for Polygon PoS integration and contract deployment',
  //   category: 'additional',
  //   quickActions: [
  //     { label: 'Learn More', url: 'https://polygon.technology/developers', external: true },
  //   ],
  // },
];