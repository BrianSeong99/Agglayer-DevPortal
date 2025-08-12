export interface Chain {
  id: number;
  name: string;
  chainId: number;
  type: string;
  status: 'Live' | 'Testnet' | 'Coming Soon';
  rpcUrl: string;
  blockExplorer: string;
  tvl: string;
  tps: string;
  gasPrice: string;
  gasToken: string;
  blockTime: string;
}

export const chains: Chain[] = [
  {
    id: 1,
    name: 'Polygon zkEVM',
    chainId: 1101,
    type: 'zkEVM',
    status: 'Live',
    rpcUrl: 'https://zkevm-rpc.com',
    blockExplorer: 'https://zkevm.polygonscan.com',
    tvl: '$125M',
    tps: '2000+',
    gasPrice: '0.25 gwei',
    gasToken: 'ETH',
    blockTime: '2 seconds'
  },
  {
    id: 2,
    name: 'Polygon PoS',
    chainId: 137,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    tvl: '$950M',
    tps: '65',
    gasPrice: '30 gwei',
    gasToken: 'MATIC',
    blockTime: '2 seconds'
  },
  {
    id: 3,
    name: 'Ethereum',
    chainId: 1,
    type: 'Mainnet',
    status: 'Live',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    tvl: '$28.5B',
    tps: '15',
    gasPrice: '25 gwei',
    gasToken: 'ETH',
    blockTime: '12 seconds'
  },
  {
    id: 4,
    name: 'Arbitrum One',
    chainId: 42161,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    tvl: '$2.1B',
    tps: '40',
    gasPrice: '0.1 gwei',
    gasToken: 'ETH',
    blockTime: '1 second'
  },
  {
    id: 5,
    name: 'Optimism',
    chainId: 10,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    tvl: '$1.8B',
    tps: '35',
    gasPrice: '0.001 gwei',
    gasToken: 'ETH',
    blockTime: '2 seconds'
  },
  {
    id: 6,
    name: 'Base',
    chainId: 8453,
    type: 'L2',
    status: 'Live',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    tvl: '$1.2B',
    tps: '50',
    gasPrice: '0.001 gwei',
    gasToken: 'ETH',
    blockTime: '2 seconds'
  },
  {
    id: 7,
    name: 'Polygon Cardona',
    chainId: 2442,
    type: 'zkEVM',
    status: 'Testnet',
    rpcUrl: 'https://rpc.cardona.zkevm-rpc.com',
    blockExplorer: 'https://cardona-zkevm.polygonscan.com',
    tvl: '$0',
    tps: '2000+',
    gasPrice: '0.25 gwei',
    gasToken: 'ETH',
    blockTime: '2 seconds'
  },
  {
    id: 8,
    name: 'Polygon Mumbai',
    chainId: 80001,
    type: 'L2',
    status: 'Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com',
    tvl: '$0',
    tps: '65',
    gasPrice: '1 gwei',
    gasToken: 'MATIC',
    blockTime: '2 seconds'
  }
]; 