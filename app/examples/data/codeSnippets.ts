export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  category: 'token-transfers' | 'message-passing' | 'liquidity' | 'error-handling' | 'gas-optimization';
  code: Array<{
    language: 'typescript' | 'bash';
    label: string;
    content: string;
  }>;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'basic-token-transfer',
    title: 'Basic Token Transfer',
    description: 'Simple example of transferring tokens from one chain to another using the Agglayer bridge. This demonstrates the core bridge functionality with minimal configuration.',
    category: 'token-transfers',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Transfer tokens between chains using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

const transfer = await client.bridgeAsset({
  originNetwork: 0, // Polygon
  destinationNetwork: 1, // Arbitrum
  token: '0xUSDC...',
  amount: ethers.utils.parseUnits('1000', 6),
  recipient: '0x123...',
  forceUpdateGlobalExitRoot: true
});

console.log('Transfer ID:', transfer.transactionHash);`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Transfer tokens using aggsandbox CLI
aggsandbox bridge transfer \\
  --from-chain polygon \\
  --to-chain arbitrum \\
  --token USDC \\
  --amount 1000 \\
  --recipient 0x123... \\
  --network testnet`
      }
    ]
  },
  {
    id: 'check-multi-chain-balance',
    title: 'Check Multi-Chain Balance',
    description: 'Query token balances across all connected chains in the Agglayer network. Useful for displaying unified balance views in your dApp.',
    category: 'token-transfers',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Get balances across all chains using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Get balance on origin network
const balance = await client.getBalance({
  userAddress: '0x123...',
  token: '0xUSDC...',
  network: 0 // Polygon
});

console.log(\`Balance: \${ethers.utils.formatUnits(balance, 6)} USDC\`);`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Check multi-chain balance using aggsandbox CLI
aggsandbox balance check \\
  --address 0x123... \\
  --token USDC \\
  --all-chains \\
  --network testnet`
      }
    ]
  },
  {
    id: 'listen-cross-chain-events',
    title: 'Listen for Crosschain Events',
    description: 'Subscribe to real-time cross-chain events to track transfers and messages. Essential for building reactive interfaces that update when transfers complete.',
    category: 'message-passing',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Subscribe to cross-chain events using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Listen for bridge events
client.on('bridgeEvent', (event) => {
  console.log('Bridge event received:', {
    from: event.originNetwork,
    to: event.destinationNetwork,
    amount: ethers.utils.formatUnits(event.amount, event.decimals),
    token: event.tokenAddress
  });
});`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Listen for cross-chain events using aggsandbox CLI
aggsandbox events listen \\
  --event-type bridge \\
  --from-chain polygon \\
  --to-chain arbitrum \\
  --follow \\
  --network testnet`
      }
    ]
  },
  {
    id: 'batch-transfers',
    title: 'Batch Token Transfers',
    description: 'Execute multiple token transfers in a single transaction to save gas and improve efficiency. Ideal for applications that need to distribute tokens to multiple recipients.',
    category: 'token-transfers',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Execute multiple transfers using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Batch multiple bridge operations
const transfers = await Promise.all([
  client.bridgeAsset({
    originNetwork: 0,
    destinationNetwork: 1,
    token: '0xUSDC...',
    amount: ethers.utils.parseUnits('1000', 6),
    recipient: '0x123...'
  }),
  client.bridgeAsset({
    originNetwork: 0,
    destinationNetwork: 2,
    token: '0xDAI...',
    amount: ethers.utils.parseUnits('500', 18),
    recipient: '0x456...'
  })
]);

console.log('Transfer IDs:', transfers.map(t => t.transactionHash));`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Execute batch transfers using aggsandbox CLI
aggsandbox bridge batch \\
  --transfers '[
    {"from":"polygon","to":"arbitrum","token":"USDC","amount":"1000","recipient":"0x123..."},
    {"from":"polygon","to":"optimism","token":"DAI","amount":"500","recipient":"0x456..."}
  ]' \\
  --network testnet`
      }
    ]
  },
  {
    id: 'custom-token-bridge',
    title: 'Bridge Custom Token',
    description: 'Bridge custom ERC20 tokens that aren\'t pre-configured in the system. Shows how to specify token details and handle non-standard tokens.',
    category: 'token-transfers',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Bridge a custom ERC20 token using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Bridge custom token with metadata
const customTransfer = await client.bridgeAsset({
  originNetwork: 0,
  destinationNetwork: 1,
  token: '0xYourTokenAddress...',
  amount: ethers.utils.parseUnits('1000', 18), // Custom decimals
  recipient: '0x123...',
  permitData: null, // No permit for custom tokens
  forceUpdateGlobalExitRoot: true
});

console.log('Custom token bridge ID:', customTransfer.transactionHash);`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Bridge custom token using aggsandbox CLI
aggsandbox bridge transfer \\
  --from-chain polygon \\
  --to-chain arbitrum \\
  --token-address 0xYourTokenAddress... \\
  --amount 1000000000000000000000 \\
  --decimals 18 \\
  --symbol CUSTOM \\
  --recipient 0x123... \\
  --network testnet`
      }
    ]
  },
  {
    id: 'cross-chain-message',
    title: 'Send Crosschain Message',
    description: 'Send arbitrary data between smart contracts on different chains. Enables cross-chain contract interactions beyond simple token transfers.',
    category: 'message-passing',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Send a message to another chain using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Prepare message data
const messageData = ethers.utils.defaultAbiCoder.encode(
  ['string', 'uint256'],
  ['Hello from Polygon!', 12345]
);

// Send cross-chain message
const message = await client.bridgeMessage({
  destinationNetwork: 1, // Arbitrum
  destinationAddress: '0xTargetContract...',
  metadata: messageData,
  forceUpdateGlobalExitRoot: true
});

console.log('Message sent:', message.transactionHash);`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Send cross-chain message using aggsandbox CLI
aggsandbox message send \\
  --to-chain arbitrum \\
  --to-contract 0xTargetContract... \\
  --data "Hello from Polygon!" \\
  --gas-limit 200000 \\
  --network testnet`
      }
    ]
  },
  {
    id: 'liquidity-pool-interaction',
    title: 'Add Liquidity Crosschain',
    description: 'Add liquidity to pools on other chains without leaving your current chain. Demonstrates cross-chain DeFi interactions with slippage protection.',
    category: 'liquidity',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Add liquidity to a pool on another chain using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Bridge tokens and add liquidity in one transaction
const liquidityTx = await client.bridgeAsset({
  originNetwork: 0, // Polygon
  destinationNetwork: 1, // Arbitrum
  token: '0xUSDC...',
  amount: ethers.utils.parseUnits('1000', 6),
  recipient: '0xPoolContract...', // DEX pool contract
  metadata: ethers.utils.defaultAbiCoder.encode(
    ['uint256', 'uint256'],
    [ethers.utils.parseUnits('1000', 6), ethers.utils.parseEther('0.5')] // USDC + ETH amounts
  )
});

console.log('Liquidity bridge TX:', liquidityTx.transactionHash);`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Add cross-chain liquidity using aggsandbox CLI
aggsandbox defi add-liquidity \\
  --from-chain polygon \\
  --to-chain arbitrum \\
  --pool 0xPoolAddress... \\
  --token-a USDC \\
  --token-b ETH \\
  --amount-a 1000 \\
  --amount-b 0.5 \\
  --slippage 0.5 \\
  --network testnet`
      }
    ]
  },
  {
    id: 'error-handling',
    title: 'Comprehensive Error Handling',
    description: 'Properly handle various error scenarios in cross-chain operations. Shows best practices for user-friendly error messages and recovery strategies.',
    category: 'error-handling',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Handle various error scenarios with LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

try {
  const transfer = await client.bridgeAsset({
    originNetwork: 0,
    destinationNetwork: 1,
    token: '0xUSDC...',
    amount: ethers.utils.parseUnits('1000', 6),
    recipient: '0x123...'
  });
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    console.error('Not enough tokens for bridge');
  } else if (error.code === 'NETWORK_NOT_SUPPORTED') {
    console.error('Destination network not supported');
  } else if (error.code === 'GAS_ESTIMATION_FAILED') {
    console.error('Cannot estimate gas cost');
  } else if (error.message.includes('User denied')) {
    console.error('Transaction rejected by user');
  } else {
    console.error('Unknown bridge error:', error);
  }
}`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Handle errors with aggsandbox CLI
aggsandbox bridge transfer \\
  --from-chain polygon \\
  --to-chain arbitrum \\
  --token USDC \\
  --amount 1000 \\
  --recipient 0x123... \\
  --network testnet \\
  --retry 3 \\
  --timeout 300 \\
  --verbose`
      }
    ]
  },
  {
    id: 'gas-optimization',
    title: 'Gas Optimization Strategies',
    description: 'Optimize gas costs for cross-chain operations using batching, deadline settings, and priority levels. Essential for production applications.',
    category: 'gas-optimization',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Optimize gas for cross-chain operations with LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Optimize bridge transaction
const optimizedTransfer = await client.bridgeAsset({
  originNetwork: 0,
  destinationNetwork: 1,
  token: '0xUSDC...',
  amount: ethers.utils.parseUnits('1000', 6),
  recipient: '0x123...',
  forceUpdateGlobalExitRoot: false, // Save gas by not forcing update
  gasPrice: ethers.utils.parseUnits('20', 'gwei'), // Custom gas price
  gasLimit: 150000 // Optimized gas limit
});

console.log('Optimized transfer:', optimizedTransfer.transactionHash);`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Optimize gas costs using aggsandbox CLI
aggsandbox bridge transfer \\
  --from-chain polygon \\
  --to-chain arbitrum \\
  --token USDC \\
  --amount 1000 \\
  --recipient 0x123... \\
  --gas-price auto \\
  --priority low \\
  --batch-with-others \\
  --network testnet`
      }
    ]
  },
  {
    id: 'event-filtering',
    title: 'Filter Crosschain Events',
    description: 'Filter cross-chain events by specific criteria like chain, token, or amount. Useful for monitoring specific types of transfers or building analytics.',
    category: 'message-passing',
    code: [
      {
        language: 'typescript',
        label: 'LXLY.js',
        content: `// Filter events by criteria using LXLY.js
import { LxLyClient } from '@0xpolygonhermez/lxly-client';

const client = new LxLyClient({
  network: 'testnet',
  environment: 'browser'
});

// Filter bridge events with specific criteria
client.on('bridgeEvent', (event) => {
  // Filter for large USDC transfers from Polygon to Arbitrum
  if (event.originNetwork === 0 && 
      event.destinationNetwork === 1 && 
      event.tokenAddress.toLowerCase() === '0xusdc...' &&
      ethers.utils.formatUnits(event.amount, 6) >= '100') {
    
    console.log('Large USDC transfer detected:', {
      amount: ethers.utils.formatUnits(event.amount, 6),
      from: 'Polygon',
      to: 'Arbitrum',
      txHash: event.transactionHash
    });
  }
});`
      },
      {
        language: 'bash',
        label: 'AggSandbox',
        content: `# Filter cross-chain events using aggsandbox CLI
aggsandbox events filter \\
  --from-chain polygon \\
  --to-chain arbitrum,optimism \\
  --token USDC \\
  --min-amount 100 \\
  --event-type bridge \\
  --output json \\
  --network testnet`
      }
    ]
  }
];