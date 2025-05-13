const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const HDWalletProvider = require('@truffle/hdwallet-provider');
const { use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const { LxLyClient } = require('@maticnetwork/lxlyjs');

// Initialize the Web3ClientPlugin
use(Web3ClientPlugin);

// Configuration
const configuration = {
  0: { // Sepolia
    rpc: process.env.NETWORK_0_RPC,
    bridgeAddress: process.env.NETWORK_0_BRIDGE,
    wrapperAddress: process.env.NETWORK_0_WRAPPER
  },
  1: { // Cardona
    rpc: process.env.NETWORK_1_RPC,
    bridgeAddress: process.env.NETWORK_1_BRIDGE
  }
};

// Token configuration (can be updated as needed)
const tokens = {
  0: { // Sepolia
    ether: "0x0000000000000000000000000000000000000000" // Placeholder, will be replaced by actual token
  },
  1: { // Cardona
    ether: "0x0000000000000000000000000000000000000000" // Placeholder, will be replaced by actual token
  }
};

// Get the sender address (from)
const from = function() {
  if (!process.env.USER1_PRIVATE_KEY) {
    throw new Error('USER1_PRIVATE_KEY is not set in .env.local');
  }
  
  const provider = new HDWalletProvider(
    process.env.USER1_PRIVATE_KEY,
    process.env.NETWORK_0_RPC
  );
  
  return provider.getAddress(0);
};

// Recipient is the same as sender
const to = from();

// Get a fully initialized LxLyClient
async function getLxLyClient() {
  // Create client instance
  const lxly = new LxLyClient();
  
  // Get the sender address
  const userAddress = from();
  console.log(`Setting up LxLyClient for user: ${userAddress}`);
  
  // Init the client
  await lxly.init({
    network: 'testnet',
    providers: {
      0: { // Sepolia
        provider: new HDWalletProvider(
          process.env.USER1_PRIVATE_KEY,
          configuration[0].rpc
        ),
        configuration: { 
          bridgeAddress: configuration[0].bridgeAddress,
          wrapperAddress: configuration[0].wrapperAddress
        },
        defaultConfig: { from: userAddress }
      },
      1: { // Cardona
        provider: new HDWalletProvider(
          process.env.USER1_PRIVATE_KEY,
          configuration[1].rpc
        ),
        configuration: { 
          bridgeAddress: configuration[1].bridgeAddress
        },
        defaultConfig: { from: userAddress }
      }
    }
  });
  
  return lxly;
}

module.exports = {
  getLxLyClient,
  tokens,
  configuration,
  from: from(),
  to
}; 