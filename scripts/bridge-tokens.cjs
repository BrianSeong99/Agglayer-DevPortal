const dotenv = require('dotenv');
// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');
const erc20AbiPath = path.resolve(__dirname, '../src/app/dashboard/examples/aggswap-app/abis/ERC-20.json');
const erc20AbiJson = fs.readFileSync(erc20AbiPath, 'utf-8');
const ERC20Abi = JSON.parse(erc20AbiJson);
const axios = require("axios");

// Import a Web3Provider that works with Node.js
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");

// Import and initialize the Matic.js libraries
const { use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const { LxLyClient } = require('@maticnetwork/lxlyjs');

// Initialize the Web3ClientPlugin before using LxLyClient
use(Web3ClientPlugin);

// Function to get an initialized LxLyClient instance
async function getLxLyClient() {
  if (!process.env.USER1_PRIVATE_KEY) {
    throw new Error("USER1_PRIVATE_KEY is not set in environment variables");
  }
  
  if (!process.env.NETWORK_0_RPC || !process.env.NETWORK_1_RPC) {
    throw new Error("RPC URLs are not set in environment variables");
  }

  if (!process.env.NETWORK_0_BRIDGE) {
    throw new Error("NETWORK_0_BRIDGE address is not set in environment variables");
  }

  // Get user address from private key
  const wallet = new ethers.Wallet(process.env.USER1_PRIVATE_KEY);
  const userAddress = wallet.address;
  
  // Create separate providers for Sepolia and Cardona
  const sepoliaProvider = new HDWalletProvider(
    process.env.USER1_PRIVATE_KEY,
    process.env.NETWORK_0_RPC
  );
  
  const cardonaProvider = new HDWalletProvider(
    process.env.USER1_PRIVATE_KEY,
    process.env.NETWORK_1_RPC
  );
  
  // Create a new LxLyClient instance
  const lxly = new LxLyClient();
  
  // Initialize the client with the providers and configurations
  await lxly.init({
    network: 'testnet',
    providers: {
      0: { // Sepolia
        provider: sepoliaProvider,
        configuration: { 
          bridgeAddress: process.env.NETWORK_0_BRIDGE,
          wrapperAddress: process.env.NETWORK_0_WRAPPER
        },
        defaultConfig: { from: userAddress }
      },
      1: { // Cardona
        provider: cardonaProvider,
        configuration: { 
          bridgeAddress: process.env.NETWORK_1_BRIDGE 
        },
        defaultConfig: { from: userAddress }
      }
    }
  });
  
  return lxly;
}

// Function to bridge a token from Sepolia to Cardona
async function bridgeToken(tokenAddress, amount) {
  try {
    // Get user address from private key
    const wallet = new ethers.Wallet(process.env.USER1_PRIVATE_KEY);
    const userAddress = wallet.address;
    console.log(`User address: ${userAddress}`);
    
    // Create token contract instance on Sepolia
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_0_RPC);
    const signer = new ethers.Wallet(process.env.USER1_PRIVATE_KEY, provider);
    const token = new ethers.Contract(tokenAddress, ERC20Abi, signer);
    const tokenName = await token.name();
    const tokenSymbol = await token.symbol();
    
    console.log(`Token: ${tokenName} (${tokenSymbol})`);
    
    // Convert amount to wei
    const amountWei = ethers.parseUnits(amount, 18);
    
    // Check token balance
    const balance = await token.balanceOf(userAddress);
    console.log(`Current balance: ${ethers.formatUnits(balance, 18)} ${tokenSymbol}`);
    
    if (balance < amountWei) {
      throw new Error(`Insufficient balance. You have ${ethers.formatUnits(balance, 18)} ${tokenSymbol}, but trying to bridge ${amount} ${tokenSymbol}`);
    }
    
    // Check token approval
    const bridgeAddress = process.env.NETWORK_0_BRIDGE;
    console.log(`Bridge address: ${bridgeAddress}`);
    
    const allowance = await token.allowance(userAddress, bridgeAddress);
    console.log(`Current allowance: ${ethers.formatUnits(allowance, 18)} ${tokenSymbol}`);
    
    // Approve tokens if needed
    if (allowance < amountWei) {
      console.log(`Approving ${amount} ${tokenSymbol} for the bridge...`);
      const approveTx = await token.approve(bridgeAddress, amountWei);
      console.log(`Approval transaction submitted: ${approveTx.hash}`);
      
      await approveTx.wait();
      console.log(`Approval transaction confirmed!`);
    }
    
    // Get LxLyClient instance
    console.log(`\nInitializing LxLy client...`);
    const client = await getLxLyClient();
    
    // Bridge tokens
    console.log(`Bridging ${amount} ${tokenSymbol} from Sepolia to Cardona...`);
    
    // Source NetworkId is 0 for Sepolia
    const sourceNetworkId = 0;
    // Destination NetworkId is 1 for Cardona
    const destinationNetworkId = 1;
    
    // Get an instance of the token on Sepolia
    console.log(`Getting ERC20 token instance on Sepolia...`);
    const erc20Token = client.erc20(tokenAddress, sourceNetworkId);
    
    // Bridge the asset
    console.log(`Executing bridge transaction...`);
    const result = await erc20Token.bridgeAsset(amountWei.toString(), userAddress, destinationNetworkId);
    
    // Get the transaction hash
    const txHash = await result.getTransactionHash();
    console.log(`Bridge transaction submitted: ${txHash}`);
    
    // Wait for transaction confirmation
    console.log(`Waiting for transaction confirmation...`);
    const receipt = await result.getReceipt();
    console.log(`Bridge transaction confirmed in block ${receipt.blockNumber}!`);
    
    // Monitor the bridge transaction
    console.log(`\nMonitoring bridge transaction...`);
    console.log(`Cardona Explorer: https://explorer.cardona.zkevm.consensys.net/tx/${txHash}`);
    console.log(`Sepolia Explorer: https://sepolia.etherscan.io/tx/${txHash}`);
    
    console.log(`\n✅ SUCCESS: Bridge transaction submitted successfully!`);
    console.log(`The wrapped token on Cardona should be available shortly.`);
    
    return txHash;
  } catch (error) {
    console.error("Error bridging token:", error.message);
    if (error.stack) {
      console.error("\nStack trace:", error.stack);
    }
    throw error;
  }
}

// Main function to execute the script
async function main() {
  // Example usage
  const tokenAddress = process.argv[2]; // Token address on Sepolia
  const amount = process.argv[3] || "0.1"; // Amount to bridge
  
  if (!tokenAddress) {
    console.log(`
Usage: node scripts/bridge-tokens.cjs <token-address> [amount]
Example: node scripts/bridge-tokens.cjs 0x1234...5678 0.1
    `);
    return;
  }
  
  console.log(`
=================================================================
                BRIDGE TOKENS FROM SEPOLIA TO CARDONA
=================================================================
Token address: ${tokenAddress}
Amount: ${amount}
-----------------------------------------------------------------`);
  
  try {
    // Bridge the token
    const txHash = await bridgeToken(tokenAddress, amount);
    
    console.log(`
=================================================================
                      NEXT STEPS
=================================================================
1. Once tokens are bridged to Cardona, they will be wrapped
2. Check your wallet on Cardona network to see the wrapped tokens
3. Use the wrapped tokens to add liquidity or perform swaps
=================================================================`);
    
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
  }
}

// Run the main function
main().catch(console.error); 