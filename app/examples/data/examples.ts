export interface Example {
  id: string;
  title: string;
  description: string;
  category: 'defi' | 'nft' | 'gaming' | 'social' | 'infrastructure';
  techStack: string[];
  stats: {
    stars: number;
    forks: number;
    lastUpdated: string;
  };
  urls: {
    demo?: string;
    code?: string;
    tutorial?: string;
  };
}

export const examples: Example[] = [
  {
    id: 'cross-chain-dex',
    title: 'Cross-Chain DEX',
    description: 'Full-featured decentralized exchange with unified liquidity pools across all Agglayer chains',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js'],
    stats: {
      stars: 234,
      forks: 89,
      lastUpdated: '3 days ago',
    },
    urls: {
      demo: '/demos/dex',
      code: 'https://github.com/agglayer/dex-template',
      tutorial: '/examples?tab=tutorials&id=build-dex',
    },
  },
  {
    id: 'nft-marketplace',
    title: 'Multi-Chain NFT Marketplace',
    description: 'Buy, sell, and trade NFTs from any connected chain in one unified marketplace',
    category: 'nft',
    techStack: ['Solidity', 'Next.js', 'IPFS', 'TypeScript'],
    stats: {
      stars: 156,
      forks: 67,
      lastUpdated: '1 week ago',
    },
    urls: {
      demo: '/demos/nft',
      code: 'https://github.com/agglayer/nft-marketplace-template',
      tutorial: '/examples?tab=tutorials&id=nft-bridge',
    },
  },
  {
    id: 'lending-protocol',
    title: 'Cross-Chain Lending Protocol',
    description: 'Deposit collateral on one chain and borrow assets on another with unified risk management',
    category: 'defi',
    techStack: ['Solidity', 'React', 'Chainlink', 'TypeScript'],
    stats: {
      stars: 198,
      forks: 54,
      lastUpdated: '5 days ago',
    },
    urls: {
      demo: '/demos/lending',
      code: 'https://github.com/agglayer/lending-template',
      tutorial: '/examples?tab=tutorials&id=lending-protocol',
    },
  },
  {
    id: 'payment-streaming',
    title: 'Payment Streaming',
    description: 'Stream payments in real-time across chains with programmable money flows',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Hardhat'],
    stats: {
      stars: 112,
      forks: 43,
      lastUpdated: '2 weeks ago',
    },
    urls: {
      code: 'https://github.com/agglayer/payment-streaming-template',
    },
  },
  {
    id: 'dao-governance',
    title: 'DAO Governance',
    description: 'Multi-chain DAO governance with unified voting across all connected chains',
    category: 'infrastructure',
    techStack: ['Solidity', 'React', 'TypeScript', 'TheGraph'],
    stats: {
      stars: 167,
      forks: 71,
      lastUpdated: '1 week ago',
    },
    urls: {
      code: 'https://github.com/agglayer/dao-template',
    },
  },
  {
    id: 'gaming-assets-bridge',
    title: 'Gaming Assets Bridge',
    description: 'Bridge gaming assets and currencies between chains with batch transfers',
    category: 'gaming',
    techStack: ['Solidity', 'Unity', 'C#', 'TypeScript'],
    stats: {
      stars: 89,
      forks: 34,
      lastUpdated: '4 days ago',
    },
    urls: {
      code: 'https://github.com/agglayer/gaming-bridge-template',
    },
  },
  {
    id: 'social-token-platform',
    title: 'Social Token Platform',
    description: 'Create and manage social tokens that work across all Agglayer chains',
    category: 'social',
    techStack: ['Solidity', 'Next.js', 'TypeScript', 'Lens Protocol'],
    stats: {
      stars: 134,
      forks: 52,
      lastUpdated: '6 days ago',
    },
    urls: {
      code: 'https://github.com/agglayer/social-token-template',
    },
  },
  {
    id: 'prediction-market',
    title: 'Prediction Market',
    description: 'Create and trade prediction markets with liquidity from all chains',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Oracle'],
    stats: {
      stars: 145,
      forks: 61,
      lastUpdated: '1 week ago',
    },
    urls: {
      code: 'https://github.com/agglayer/prediction-market-template',
    },
  },
  {
    id: 'insurance-protocol',
    title: 'Insurance Protocol',
    description: 'Decentralized insurance with risk pools spanning multiple chains',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Chainlink'],
    stats: {
      stars: 103,
      forks: 39,
      lastUpdated: '2 weeks ago',
    },
    urls: {
      code: 'https://github.com/agglayer/insurance-template',
    },
  },
];