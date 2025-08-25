export interface Example {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'defi' | 'nft' | 'gaming' | 'social' | 'infrastructure';
  techStack: string[];
  urls: {
    demo?: string;
    code?: string;
    tutorial?: string;
  };
}

export const examples: Example[] = [
  {
    id: 'cross-chain-swap',
    title: 'Crosschain Swap',
    description: 'Seamlessly bridge assets and swap them for another token in a single transaction using Agglayer\'s unified bridge and call functionality.',
    icon: '/img/crosschain-swap.svg',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-swap-template',
    },
  },
  {
    id: 'cross-chain-name-service',
    title: 'Crosschain Name Service',
    description: 'Secure a unique username on one chain and automatically own it across all Agglayer-connected chains through bridge messaging.',
    icon: '/img/crosschain-name.svg',
    category: 'infrastructure',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-name-service-template',
    },
  },
  {
    id: 'cross-chain-lending',
    title: 'Cross Chain Lending',
    description: 'Collateralize assets from one chain to borrow tokens on another, maximizing capital efficiency through Agglayer\'s Unified Bridge.',
    icon: '/img/crosschain-lending.svg',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-lending-template',
    },
  },
  {
    id: 'cross-chain-position-transfer',
    title: 'Crosschain Position Transfer',
    description: 'Seamlessly migrate liquidity positions between different protocols and chains while preserving exact parameters and unlocking enhanced yield opportunities.',
    icon: '/img/crosschain-position.svg',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-position-transfer-template',
    },
  },
];