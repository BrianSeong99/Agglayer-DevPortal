const dotenv = require('dotenv');
// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const { ethers } = require('ethers');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { use } = require('@maticnetwork/maticjs');
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3');
const { LxLyClient } = require('@maticnetwork/lxlyjs');

// Initialize Web3ClientPlugin for LxLyClient
use(Web3ClientPlugin);

// Load ERC20 ABI (for token approvals)
const fs = require('fs');
const path = require('path');
const erc20AbiPath = path.resolve(__dirname, '../src/app/dashboard/dapps/aggswap/abis/ERC-20.json');
const erc20AbiJson = fs.readFileSync(erc20AbiPath, 'utf-8');
const ERC20Abi = JSON.parse(erc20AbiJson);

/**
 * Get an initialized LxLyClient
 * @returns {Promise<LxLyClient>} The initialized client
 */
async function getLxLyClient() {
  // Check environment variables
  if (!process.env.USER1_PRIVATE_KEY) {
    throw new Error('USER1_PRIVATE_KEY is not set in .env.local');
  }
  
  if (!process.env.NETWORK_0_RPC || !process.env.NETWORK_1_RPC) {
    throw new Error('NETWORK_0_RPC or NETWORK_1_RPC is not set in .env.local');
  }

  if (!process.env.NETWORK_0_BRIDGE || !process.env.NETWORK_0_WRAPPER) {
    throw new Error('NETWORK_0_BRIDGE or NETWORK_0_WRAPPER is not set in .env.local');
  }

  if (!process.env.NETWORK_1_BRIDGE) {
    throw new Error('NETWORK_1_BRIDGE is not set in .env.local');
  }

  // Get user address from private key
  const wallet = new ethers.Wallet(process.env.USER1_PRIVATE_KEY);
  const userAddress = wallet.address;
  
  console.log(`Setting up LxLyClient for user: ${userAddress}`);
  
  // Create a new LxLyClient instance
  const lxly = new LxLyClient();
  
  // Initialize the client with the providers and configurations
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
 * @param {string} tokenAddress - The address of the token to bridge
 * @param {string} amount - The amount to bridge as a string (e.g. "1.0")
 * @returns {Promise<{txHash: string, receipt: object}>} The transaction hash and receipt
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
    // Get user address from private key
    const wallet = new ethers.Wallet(process.env.USER1_PRIVATE_KEY);
    const userAddress = wallet.address;
    console.log(`User address: ${userAddress}`);
    
    // Create token contract instance to check approvals
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_0_RPC);
    const signer = new ethers.Wallet(process.env.USER1_PRIVATE_KEY, provider);
    const token = new ethers.Contract(tokenAddress, ERC20Abi, signer);
    
    // Get token information
    const tokenName = await token.name();
    const tokenSymbol = await token.symbol();
    const tokenDecimals = await token.decimals();
    console.log(`Token: ${tokenName} (${tokenSymbol}) with ${tokenDecimals} decimals`);
    
    // Convert amount to wei
    const amountWei = ethers.parseUnits(amount, tokenDecimals);
    
    // Check token balance
    const balance = await token.balanceOf(userAddress);
    console.log(`Current balance: ${ethers.formatUnits(balance, tokenDecimals)} ${tokenSymbol}`);
    
    if (balance < amountWei) {
      throw new Error(`Insufficient balance. You have ${ethers.formatUnits(balance, tokenDecimals)} ${tokenSymbol}, but trying to bridge ${amount} ${tokenSymbol}`);
    }
    
    // Check token approval
    const bridgeAddress = process.env.NETWORK_0_BRIDGE;
    console.log(`Bridge address: ${bridgeAddress}`);
    
    const allowance = await token.allowance(userAddress, bridgeAddress);
    console.log(`Current allowance: ${ethers.formatUnits(allowance, tokenDecimals)} ${tokenSymbol}`);
    
    // Approve tokens if needed
    if (allowance < amountWei) {
      console.log(`Approving ${amount} ${tokenSymbol} for the bridge...`);
      const approveTx = await token.approve(bridgeAddress, amountWei);
      console.log(`Approval transaction submitted: ${approveTx.hash}`);
      
      await approveTx.wait();
      console.log(`Approval transaction confirmed!`);
    }
    
    // Initialize the LxLy client
    console.log(`Initializing LxLy client...`);
    const client = await getLxLyClient();
    
    // Bridge parameters
    const sourceNetworkId = 0; // Sepolia
    const destinationNetworkId = 1; // Cardona
    
    console.log(`Getting token instance on Sepolia...`);
    const erc20Token = client.erc20(tokenAddress, sourceNetworkId);
    
    console.log(`Bridging ${amount} ${tokenSymbol} to Cardona...`);
    const result = await erc20Token.bridgeAsset(amountWei.toString(), userAddress, destinationNetworkId);
    
    // Get transaction hash
    const txHash = await result.getTransactionHash();
    console.log(`Bridge transaction submitted: ${txHash}`);
    
    // Wait for transaction confirmation
    console.log(`Waiting for transaction confirmation...`);
    const receipt = await result.getReceipt();
    console.log(`Bridge transaction confirmed in block ${receipt.blockNumber}!`);
    
    console.log(`\n✅ SUCCESS: Bridge transaction has been submitted and confirmed!`);
    console.log(`Cardona Explorer: https://explorer.cardona.zkevm.consensys.net/tx/${txHash}`);
    console.log(`Sepolia Explorer: https://sepolia.etherscan.io/tx/${txHash}`);
    
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
 * @param {string} bridgeTransactionHash - The hash of the bridge transaction
 * @returns {Promise<{txHash: string, receipt: object}>} The transaction hash and receipt
 */
async function claimAsset(bridgeTransactionHash) {
  console.log(`
=================================================================
                CLAIM BRIDGED ASSET ON CARDONA
=================================================================
Bridge Transaction Hash: ${bridgeTransactionHash}
=================================================================`);

  try {
    // Initialize the LxLy client
    console.log(`Initializing LxLy client...`);
    const client = await getLxLyClient();
    
    // Parameters
    const sourceNetworkId = 0; // Sepolia
    const destinationNetworkId = 1; // Cardona
    
    // We need to get the wrapped token address on Cardona
    // For simplicity, we'll use the same token address
    // In a real implementation, you would look up the wrapped token address
    console.log(`Getting token instance on Cardona...`);
    
    // Read the token address from last-bridge-tx.json if it exists
    let tokenAddress;
    try {
      const txData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'last-bridge-tx.json'), 'utf-8'));
      tokenAddress = txData.tokenAddress;
      console.log(`Using token address from last bridge: ${tokenAddress}`);
    } catch (error) {
      // If we can't read the file, just use a placeholder - the client will still work
      tokenAddress = "0x0000000000000000000000000000000000000000";
      console.log(`Using placeholder token address: ${tokenAddress}`);
    }
    
    const erc20Token = client.erc20(tokenAddress, destinationNetworkId);
    
    console.log(`Claiming asset from transaction ${bridgeTransactionHash}...`);
    const result = await erc20Token.claimAsset(bridgeTransactionHash, sourceNetworkId, {returnTransaction: false});
    
    // Get transaction hash
    const txHash = await result.getTransactionHash();
    console.log(`Claim transaction submitted: ${txHash}`);
    
    // Wait for transaction confirmation
    console.log(`Waiting for transaction confirmation...`);
    const receipt = await result.getReceipt();
    console.log(`Claim transaction confirmed in block ${receipt.blockNumber}!`);
    
    console.log(`\n✅ SUCCESS: Asset has been claimed on Cardona!`);
    console.log(`Cardona Explorer: https://explorer.cardona.zkevm.consensys.net/tx/${txHash}`);
    
    return { txHash, receipt };
  } catch (error) {
    console.error(`\n❌ ERROR claiming asset: ${error.message}`);
    if (error.stack) {
      console.error(`Stack trace: ${error.stack}`);
    }
    
    // Check for specific error messages
    if (error.message.includes("already claimed") || error.message.includes("already exists")) {
      console.log(`\nℹ️ NOTE: The asset may have already been claimed automatically.`);
      console.log(`Check your balance on Cardona before trying again.`);
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
  node scripts/bridge-and-claim.js bridge 0x794203e2982EDA39b4cfC3e1F802D6ab635FcDcB 0.1
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
        const amount = process.argv[4] || "0.1";
        
        if (!tokenAddress) {
          console.error("Error: Token address is required for bridging");
          showUsage();
          return;
        }
        
        await bridgeToken(tokenAddress, amount);
        
        console.log(`
=================================================================
                      NEXT STEPS
=================================================================
1. The token is now being bridged to Cardona
2. This may take a few minutes to an hour to complete
3. Most tokens are automatically claimed, but you can claim manually:
   node scripts/bridge-and-claim.js claim <txHash>
4. After bridging, add liquidity or swap on Cardona!
=================================================================`);
        break;
        
      case 'claim':
        const txHash = process.argv[3];
        
        if (!txHash) {
          console.error("Error: Transaction hash is required for claiming");
          
          // Check if we have a last bridge tx saved
          try {
            const txData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'last-bridge-tx.json'), 'utf-8'));
            console.log(`\nℹ️ Found last bridge transaction: ${txData.txHash}`);
            console.log(`To claim it, run: node scripts/bridge-and-claim.js claim ${txData.txHash}`);
          } catch (error) {
            // No last bridge tx saved
          }
          
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
  // Cleanup any providers or connections
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}); 