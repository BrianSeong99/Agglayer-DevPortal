export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'concepts' | 'tools' | 'app-tutorials';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export const tutorials: Tutorial[] = [
  // Concepts - Core understanding of Agglayer
  {
    id: 'agglayer-overview',
    title: 'Agglayer Overview',
    description: 'Complete walkthrough of Agglayer architecture and ecosystem',
    category: 'concepts',
    duration: '20 min',
  },
  {
    id: 'unified-bridge-deep-dive',
    title: 'Unified Bridge Deep Dive',
    description: 'Understanding cross-chain communication and bridge architecture',
    category: 'concepts',
    duration: '25 min',
  },
  {
    id: 'pessimistic-proofs',
    title: 'Pessimistic Proofs Explained',
    description: 'Security mechanisms and trust-minimized verification',
    category: 'concepts',
    duration: '15 min',
  },
  {
    id: 'state-transitions',
    title: 'State Transitions & Verification',
    description: 'How Agglayer ensures cross-chain integrity',
    category: 'concepts',
    duration: '20 min',
  },
  {
    id: 'zk-technology',
    title: 'ZK Technology in Agglayer',
    description: 'Zero-knowledge proofs and their role in the ecosystem',
    category: 'concepts',
    duration: '30 min',
  },

  // Tools - One tutorial per tool
  {
    id: 'lxlyjs-tutorial',
    title: 'Getting Started with lxly.js',
    description: 'Complete guide to using the JavaScript SDK',
    category: 'tools',
    duration: '25 min',
  },
  {
    id: 'aggsandbox-tutorial',
    title: 'AggSandbox Complete Guide',
    description: 'Local development, fork mode, and multi-L2 setup',
    category: 'tools',
    duration: '30 min',
  },
  {
    id: 'bridge-interface-tutorial',
    title: 'Using the Bridge Interface',
    description: 'Visual bridge testing and transaction monitoring',
    category: 'tools',
    duration: '20 min',
  },
  {
    id: 'aggvisualizer-tutorial',
    title: 'Exploring with Aggvisualizer',
    description: 'Network topology and real-time transaction visualization',
    category: 'tools',
    duration: '15 min',
  },
  {
    id: 'testnet-faucet-tutorial',
    title: 'Testnet Setup & Faucets',
    description: 'Getting test tokens and configuring testnets',
    category: 'tools',
    duration: '10 min',
  },

  // App Tutorials - Building applications with escalating difficulty
  {
    id: 'simple-transfer-app',
    title: 'Build a Simple Transfer App',
    description: 'Your first cross-chain application',
    category: 'app-tutorials',
    difficulty: 'Beginner',
    duration: '30 min',
  },
  {
    id: 'token-bridge-app',
    title: 'Create a Token Bridge UI',
    description: 'User-friendly interface for token transfers',
    category: 'app-tutorials',
    difficulty: 'Beginner',
    duration: '40 min',
  },
  {
    id: 'cross-chain-dex',
    title: 'Build a Cross-Chain DEX',
    description: 'Decentralized exchange with unified liquidity',
    category: 'app-tutorials',
    difficulty: 'Intermediate',
    duration: '60 min',
  },
  {
    id: 'nft-marketplace',
    title: 'Multi-Chain NFT Marketplace',
    description: 'Trade NFTs across all connected chains',
    category: 'app-tutorials',
    difficulty: 'Intermediate',
    duration: '50 min',
  },
  {
    id: 'lending-protocol',
    title: 'Cross-Chain Lending Protocol',
    description: 'Advanced DeFi with multi-chain collateral',
    category: 'app-tutorials',
    difficulty: 'Advanced',
    duration: '90 min',
  },
  {
    id: 'dao-governance',
    title: 'Multi-Chain DAO Implementation',
    description: 'Governance across multiple chains',
    category: 'app-tutorials',
    difficulty: 'Advanced',
    duration: '75 min',
  },
];