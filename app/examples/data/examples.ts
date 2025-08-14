export interface Example {
  id: string;
  title: string;
  description: string;
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
    title: 'Cross Chain Swap',
    description: 'Seamlessly bridge assets and swap them for another token in a single transaction using Agglayer\'s unified bridge and call functionality.',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-swap-template',
    },
  },
  {
    id: 'cross-chain-name-service',
    title: 'Cross Chain Name Service',
    description: 'Secure a unique username on one chain and automatically own it across all Agglayer-connected chains through bridge messaging.',
    category: 'infrastructure',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-name-service-template',
    },
  },
  {
    id: 'cross-chain-position-transfer',
    title: 'Cross Chain Position Transfer',
    description: 'Seamlessly migrate liquidity positions between different protocols and chains while preserving exact parameters and unlocking enhanced yield opportunities.',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-position-transfer-template',
    },
  },
  {
    id: 'cross-chain-lending',
    title: 'Cross Chain Lending',
    description: 'Collateralize assets from one chain to borrow tokens on another, maximizing capital efficiency across networks through Agglayer\'s Unified Bridge.',
    category: 'defi',
    techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'lxly.js', 'Node.js'],
    urls: {
      code: 'https://github.com/agglayer/cross-chain-lending-template',
    },
  },
];