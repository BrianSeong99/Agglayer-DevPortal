export interface CodeSnippet {
  id: string;
  title: string;
  category: 'token-transfers' | 'message-passing' | 'liquidity' | 'error-handling' | 'gas-optimization';
  code: string;
  language: string;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'basic-token-transfer',
    title: 'Basic Token Transfer',
    category: 'token-transfers',
    language: 'typescript',
    code: `// Transfer tokens between chains
const transfer = await agglayer.bridge({
  from: 'polygon',
  to: 'arbitrum',
  token: 'USDC',
  amount: '1000',
  recipient: '0x123...'
});

console.log('Transfer ID:', transfer.id);`,
  },
  {
    id: 'check-multi-chain-balance',
    title: 'Check Multi-Chain Balance',
    category: 'token-transfers',
    language: 'typescript',
    code: `// Get balances across all chains
const balances = await agglayer.getBalances({
  address: '0x123...',
  token: 'USDC'
});

balances.forEach(balance => {
  console.log(\`\${balance.chain}: \${balance.amount}\`);
});`,
  },
  {
    id: 'listen-cross-chain-events',
    title: 'Listen for Cross-Chain Events',
    category: 'message-passing',
    language: 'typescript',
    code: `// Subscribe to cross-chain events
agglayer.on('transfer', (event) => {
  console.log('Transfer received:', {
    from: event.fromChain,
    to: event.toChain,
    amount: event.amount
  });
});`,
  },
  {
    id: 'batch-transfers',
    title: 'Batch Token Transfers',
    category: 'token-transfers',
    language: 'typescript',
    code: `// Execute multiple transfers in one transaction
const transfers = await agglayer.batchBridge([
  {
    from: 'polygon',
    to: 'arbitrum',
    token: 'USDC',
    amount: '1000',
    recipient: '0x123...'
  },
  {
    from: 'polygon',
    to: 'optimism',
    token: 'DAI',
    amount: '500',
    recipient: '0x456...'
  }
]);

console.log('Batch transfer IDs:', transfers.map(t => t.id));`,
  },
  {
    id: 'custom-token-bridge',
    title: 'Bridge Custom Token',
    category: 'token-transfers',
    language: 'typescript',
    code: `// Bridge a custom ERC20 token
const customTransfer = await agglayer.bridge({
  from: 'polygon',
  to: 'arbitrum',
  tokenAddress: '0xYourTokenAddress...',
  amount: '1000000', // in wei
  recipient: '0x123...',
  customData: {
    decimals: 18,
    symbol: 'CUSTOM'
  }
});`,
  },
  {
    id: 'cross-chain-message',
    title: 'Send Cross-Chain Message',
    category: 'message-passing',
    language: 'typescript',
    code: `// Send a message to another chain
const message = await agglayer.sendMessage({
  toChain: 'arbitrum',
  toContract: '0xTargetContract...',
  data: ethers.utils.defaultAbiCoder.encode(
    ['string', 'uint256'],
    ['Hello from Polygon!', 12345]
  ),
  gasLimit: 200000
});

console.log('Message sent:', message.id);`,
  },
  {
    id: 'liquidity-pool-interaction',
    title: 'Add Liquidity Cross-Chain',
    category: 'liquidity',
    language: 'typescript',
    code: `// Add liquidity to a pool on another chain
const liquidity = await agglayer.addLiquidity({
  fromChain: 'polygon',
  toChain: 'arbitrum',
  pool: '0xPoolAddress...',
  tokenA: 'USDC',
  tokenB: 'ETH',
  amountA: '1000',
  amountB: '0.5',
  slippage: 0.5 // 0.5%
});`,
  },
  {
    id: 'error-handling',
    title: 'Comprehensive Error Handling',
    category: 'error-handling',
    language: 'typescript',
    code: `// Handle various error scenarios
try {
  const transfer = await agglayer.bridge({
    from: 'polygon',
    to: 'arbitrum',
    token: 'USDC',
    amount: '1000',
    recipient: '0x123...'
  });
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    console.error('Not enough tokens');
  } else if (error.code === 'CHAIN_UNAVAILABLE') {
    console.error('Target chain is not available');
  } else if (error.code === 'GAS_ESTIMATION_FAILED') {
    console.error('Cannot estimate gas cost');
  } else {
    console.error('Unknown error:', error);
  }
}`,
  },
  {
    id: 'gas-optimization',
    title: 'Gas Optimization Strategies',
    category: 'gas-optimization',
    language: 'typescript',
    code: `// Optimize gas for cross-chain operations
const optimizedTransfer = await agglayer.bridge({
  from: 'polygon',
  to: 'arbitrum',
  token: 'USDC',
  amount: '1000',
  recipient: '0x123...',
  options: {
    gasPrice: 'auto', // Auto-select best gas price
    priority: 'low', // low, medium, high
    deadline: Date.now() + 3600000, // 1 hour deadline
    batchWithOthers: true // Batch with other transfers
  }
});`,
  },
  {
    id: 'event-filtering',
    title: 'Filter Cross-Chain Events',
    category: 'message-passing',
    language: 'typescript',
    code: `// Filter events by criteria
agglayer.on('transfer', {
  fromChain: 'polygon',
  toChain: ['arbitrum', 'optimism'],
  token: 'USDC',
  minAmount: '100'
}, (event) => {
  console.log('Large USDC transfer detected:', event);
});`,
  },
];