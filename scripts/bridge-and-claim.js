// First create a utils file
const dotenv = require('dotenv');
// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const { use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const { LxLyClient } = require('@maticnetwork/lxlyjs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');

// Initialize Web3ClientPlugin for LxLyClient
use(Web3ClientPlugin);

// Import the utility functions
const { getLxLyClient, from, to } = require('./utils_lxly');

// Load ERC20 ABI (for token approvals)
const erc20AbiPath = path.resolve(__dirname, '../src/app/dashboard/dapps/aggswap/abis/ERC-20.json');
const erc20AbiJson = fs.readFileSync(erc20AbiPath, 'utf-8');
const ERC20Abi = JSON.parse(erc20AbiJson);

/**
 * Get user address from private key
 */
function getUserAddress() {
  if (!process.env.USER1_PRIVATE_KEY) {
    throw new Error('USER1_PRIVATE_KEY is not set in .env.local');
  }
  const wallet = new ethers.Wallet(process.env.USER1_PRIVATE_KEY);
  return wallet.address;
}

/**
 * Initialize LxLyClient
 */
async function getLxLyClient() {
  const userAddress = getUserAddress();
  console.log(`Setting up LxLyClient for user: ${userAddress}`);
  
  const lxly = new LxLyClient();
  
  await lxly.init({
    network: 'testnet',
    providers: {
      0: { // Sepolia
        provider: new HDWalletProvider(
          process.env.USER1_PRIVATE_KEY,
          process.env.NETWORK_0_RPC
        ),
        configuration: { 
          bridgeAddress: process.env.NETWORK_0_BRIDGE,
          wrapperAddress: process.env.NETWORK_0_WRAPPER
        },
        defaultConfig: { from: userAddress }
      },
      1: { // Cardona
        provider: new HDWalletProvider(
          process.env.USER1_PRIVATE_KEY,
          process.env.NETWORK_1_RPC
        ),
        configuration: { 
          bridgeAddress: process.env.NETWORK_1_BRIDGE 
        },
        defaultConfig: { from: userAddress }
      }
    }
  });
  
  return lxly;
}

/**
 * Bridge a token from Sepolia to Cardona
 */
async function bridgeToken(tokenAddress, amount) {
  console.log(`
=================================================================
                BRIDGE TOKENS FROM SEPOLIA TO CARDONA
=================================================================
Token Address: ${tokenAddress}
Amount: ${amount}
=================================================================`);

  try {
    // Get user address
    const userAddress = getUserAddress();
    console.log(`User address: ${userAddress}`);
    
    // Check for token approval first
    console.log(`Checking token approval...`);
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_0_RPC);
    const signer = new ethers.Wallet(process.env.USER1_PRIVATE_KEY, provider);
    const tokenContract = new ethers.Contract(tokenAddress, ERC20Abi, signer);
    
    // Get token info
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    const tokenDecimals = await tokenContract.decimals();
    console.log(`Token: ${tokenName} (${tokenSymbol})`);
    
    // Check token balance
    const balance = await tokenContract.balanceOf(userAddress);
    console.log(`Balance: ${ethers.formatUnits(balance, tokenDecimals)} ${tokenSymbol}`);
    
    // Check approval
    const bridgeAddress = process.env.NETWORK_0_BRIDGE;
    const allowance = await tokenContract.allowance(userAddress, bridgeAddress);
    const amountWei = amount; // Amount should already be in wei
    
    if (allowance < amountWei) {
      console.log(`Approving token for bridge...`);
      const approveTx = await tokenContract.approve(bridgeAddress, amountWei);
      console.log(`Approval tx submitted: ${approveTx.hash}`);
      await approveTx.wait();
      console.log(`Approval confirmed!`);
    } else {
      console.log(`Token already approved for bridge`);
    }
    
    // Instantiate a lxlyclient
    console.log(`Initializing LxLy client...`);
    const client = await getLxLyClient();
    
    // Source NetworkId is 0 (Sepolia)
    const sourceNetworkId = 0;
    
    // Get an api instance of token on sepolia
    console.log(`Getting token instance on Sepolia...`);
    const token = client.erc20(tokenAddress, sourceNetworkId);
    
    // Set Destination Network as Cardona
    const destinationNetworkId = 1;
    
    // Call the bridgeAsset API
    console.log(`Bridging ${amount} tokens to Cardona...`);
    const result = await token.bridgeAsset(amount, userAddress, destinationNetworkId);
    
    // Getting the transaction hash
    const txHash = await result.getTransactionHash();
    console.log(`Bridge transaction submitted: ${txHash}`);
    
    // Getting the transaction receipt
    const receipt = await result.getReceipt();
    console.log(`Bridge transaction confirmed!`);
    console.log(`Receipt:`, receipt);
    
    // Save the tx hash to a file for later claiming if needed
    const txData = {
      tokenAddress,
      amount,
      txHash,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.resolve(__dirname, 'last-bridge-tx.json'),
      JSON.stringify(txData, null, 2)
    );
    
    console.log(`\nTransaction data saved to scripts/last-bridge-tx.json for future reference`);
    console.log(`\nSepolia Explorer: https://sepolia.etherscan.io/tx/${txHash}`);

    return { txHash, receipt };
  } catch (error) {
    console.error(`\n❌ ERROR bridging token: ${error.message}`);
    if (error.stack) {
      console.error(`Stack trace: ${error.stack}`);
    }
    throw error;
  }
}

/**
 * Claim a bridged asset on Cardona
 */
async function claimAsset(bridgeTransactionHash) {
  console.log(`
=================================================================
                CLAIM BRIDGED ASSET ON CARDONA
=================================================================
Bridge Transaction Hash: ${bridgeTransactionHash}
=================================================================`);

  try {
    // Instantiate a lxlyclient
    console.log(`Initializing LxLy client...`);
    const client = await getLxLyClient();
    
    // The source networkId
    const sourceNetworkId = 0;
    // The destination networkId
    const destinationNetworkId = 1;
    
    // Read the token address from last-bridge-tx.json if it exists
    let tokenAddress;
    try {
      const txData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'last-bridge-tx.json'), 'utf-8'));
      tokenAddress = txData.tokenAddress;
      console.log(`Using token address from last bridge: ${tokenAddress}`);
    } catch (error) {
      console.log(`No bridged token information found. Using default address.`);
      tokenAddress = "0x0000000000000000000000000000000000000000";
    }
    
    // Get an api instance of token on cardona
    const token = client.erc20(tokenAddress, destinationNetworkId);
    
    // Call the claimAsset API
    console.log(`Claiming asset from transaction ${bridgeTransactionHash}...`);
    const result = await token.claimAsset(bridgeTransactionHash, sourceNetworkId, {returnTransaction: false});
    
    // Getting the transaction hash
    const txHash = await result.getTransactionHash();
    console.log(`Claim transaction submitted: ${txHash}`);
    
    // Getting the transaction receipt
    const receipt = await result.getReceipt();
    console.log(`Claim transaction confirmed!`);
    console.log(`Receipt:`, receipt);
    
    console.log(`\nCardona Explorer: https://explorer.cardona.zkevm.consensys.net/tx/${txHash}`);
    
    return { txHash, receipt };
  } catch (error) {
    console.error(`\n❌ ERROR claiming asset: ${error.message}`);
    if (error.stack) {
      console.error(`Stack trace: ${error.stack}`);
    }
    throw error;
  }
}

/**
 * Display usage instructions
 */
function showUsage() {
  console.log(`
Usage:
  node scripts/bridge-and-claim.js bridge <tokenAddress> <amount>
  node scripts/bridge-and-claim.js claim <transactionHash>
  
Examples:
  node scripts/bridge-and-claim.js bridge 0x794203e2982EDA39b4cfC3e1F802D6ab635FcDcB 1000000000000000000
  node scripts/bridge-and-claim.js claim 0x1fc6858b20c75189a9fa8f3ae60c2a255cc3c41a058781f33daa57fc0f80b81a
  `);
}

/**
 * Main function to execute the script
 */
async function main() {
  const command = process.argv[2];
  
  if (!command) {
    showUsage();
    return;
  }
  
  try {
    switch (command.toLowerCase()) {
      case 'bridge':
        const tokenAddress = process.argv[3];
        const amount = process.argv[4];
        
        if (!tokenAddress || !amount) {
          console.error("Error: Token address and amount are required for bridging");
          showUsage();
          return;
        }
        
        await bridgeToken(tokenAddress, amount);
        break;
        
      case 'claim':
        const txHash = process.argv[3];
        
        if (!txHash) {
          console.error("Error: Transaction hash is required for claiming");
          showUsage();
          return;
        }
        
        await claimAsset(txHash);
        break;
        
      default:
        console.error(`Error: Unknown command '${command}'`);
        showUsage();
    }
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error).finally(() => {
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}); 