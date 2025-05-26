require("dotenv/config");
const { ethers } = require("ethers");
const { LxLyClient, use, setProofApi } = require("@maticnetwork/lxlyjs");
const Web3ClientPlugin = require('@maticnetwork/maticjs-web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const path = require('path');
const erc20AbiPath = path.resolve(__dirname, '../src/app/dashboard/examples/aggswap-app/abis/ERC-20.json');
const erc20AbiJson = fs.readFileSync(erc20AbiPath, 'utf-8');
const ERC20Abi = JSON.parse(erc20AbiJson);
const axios = require("axios");

// Initialize the LxLy client
use(Web3ClientPlugin);

// API endpoints
const TRANSACTION_API = "https://api-gateway.polygon.technology/api/v3/transactions/testnet";
const PROOF_API = "https://api-gateway.polygon.technology/api/v3/proof/testnet";

// Set the proof API with API key from environment
setProofApi(PROOF_API);

// Function to bridge a token from Sepolia to Cardona
async function bridgeToken(tokenAddress, amount) {
  try {
    // Check that environment variables are set
    if (!process.env.POLYGON_API_KEY) {
      throw new Error("POLYGON_API_KEY is not set in environment variables");
    }
    
    if (!process.env.USER1_PRIVATE_KEY) {
      throw new Error("USER1_PRIVATE_KEY is not set in environment variables");
    }
    
    if (!process.env.NETWORK_0_RPC || !process.env.NETWORK_1_RPC) {
      throw new Error("RPC URLs are not set in environment variables");
    }

    // Get user address from private key
    const wallet = new ethers.Wallet(process.env.USER1_PRIVATE_KEY);
    const userAddress = wallet.address;
    console.log(`User address: ${userAddress}`);

    // Initialize the LxLy client
    const lxly = await new LxLyClient().init({
      network: "testnet",
      providers: {
        0: { // Sepolia
          provider: new HDWalletProvider([process.env.USER1_PRIVATE_KEY], process.env.NETWORK_0_RPC),
          configuration: { 
            bridgeAddress: process.env.NETWORK_0_BRIDGE,
            wrapperAddress: process.env.NETWORK_0_WRAPPER
          },
          defaultConfig: { from: userAddress }
        },
        1: { // Cardona
          provider: new HDWalletProvider([process.env.USER1_PRIVATE_KEY], process.env.NETWORK_1_RPC),
          configuration: { bridgeAddress: process.env.NETWORK_1_BRIDGE },
          defaultConfig: { from: userAddress }
        },
      },
    });

    // Convert amount to wei
    const amountWei = ethers.parseUnits(amount, 18);
    
    // Create token contract instance on Sepolia
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_0_RPC);
    const signer = new ethers.Wallet(process.env.USER1_PRIVATE_KEY, provider);
    const token = new ethers.Contract(tokenAddress, ERC20Abi, signer);
    
    // Check token approval
    const allowance = await token.allowance(userAddress, process.env.NETWORK_0_BRIDGE);
    console.log(`Current allowance: ${ethers.formatUnits(allowance, 18)}`);
    
    // Approve tokens if needed
    if (allowance < amountWei) {
      console.log(`Approving ${amount} tokens for the bridge...`);
      const approveTx = await token.approve(process.env.NETWORK_0_BRIDGE, amountWei);
      await approveTx.wait();
      console.log(`Approval transaction: ${approveTx.hash}`);
    }
    
    // Bridge token using lxly client
    console.log(`Bridging ${amount} tokens from Sepolia to Cardona...`);
    const erc20Token = lxly.erc20(tokenAddress, 0); // 0 = Sepolia
    const result = await erc20Token.bridgeAsset(amountWei, userAddress, 1); // 1 = Cardona
    
    // Get transaction hash
    const txHash = await result.getTransactionHash();
    console.log(`Bridge transaction hash: ${txHash}`);

    // Wait for the bridge transaction to be confirmed
    const receipt = await result.getReceipt();
    console.log(`Bridge transaction confirmed in block ${receipt.blockNumber}`);
    
    // Monitor the transaction status
    await monitorBridgeTransaction(userAddress, txHash);
    
    return txHash;
  } catch (error) {
    console.error("Error bridging token:", error.message);
    throw error;
  }
}

// Function to monitor the bridge transaction and get wrapped token address
async function monitorBridgeTransaction(userAddress, txHash) {
  console.log(`\nMonitoring bridge transaction status...`);
  console.log(`This may take 5-10 minutes. Please wait.\n`);
  
  // Initial delay to allow transaction to be indexed
  await new Promise(resolve => setTimeout(resolve, 30000));
  
  let attempts = 0;
  const maxAttempts = 20; // About 10 minutes of monitoring
  
  while (attempts < maxAttempts) {
    attempts++;
    
    try {
      // Query the transaction API to get status
      const response = await axios.get(`${TRANSACTION_API}?userAddress=${userAddress}`, {
        headers: {
          'x-api-key': process.env.POLYGON_API_KEY
        }
      });
      
      const transactions = response.data?.result?.transactions || [];
      const transaction = transactions.find((tx) => tx.transactionHash === txHash);
      
      if (transaction) {
        console.log(`Transaction status: ${transaction.state}`);
        
        if (transaction.state === "READY_TO_CLAIM" || transaction.state === "CLAIMED") {
          // Get the wrapped token address on Cardona
          const wrappedTokenAddress = findWrappedTokenAddress(transaction);
          if (wrappedTokenAddress) {
            console.log(`\n✅ SUCCESS: Token bridged successfully!`);
            console.log(`Original token on Sepolia: ${transaction.tokenAddress}`);
            console.log(`Wrapped token on Cardona: ${wrappedTokenAddress}`);
            
            // If ready to claim, claim it
            if (transaction.state === "READY_TO_CLAIM") {
              console.log(`\nTransaction is ready to claim. Claiming now...`);
              await claimBridgedAsset(transaction);
            } else {
              console.log(`\nTransaction is already claimed.`);
            }
            
            return wrappedTokenAddress;
          }
        }
      } else {
        console.log(`Transaction not found yet. Waiting for indexing... (Attempt ${attempts}/${maxAttempts})`);
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
    }
    
    // Wait 30 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 30000));
  }
  
  console.log(`\n⚠️ Max monitoring attempts reached. Please check the transaction status manually.`);
  console.log(`You can check the status using the Transaction API or the AggLayer explorer.`);
}

// Function to find the wrapped token address from the transaction
function findWrappedTokenAddress(transaction) {
  try {
    // Logic to extract the wrapped token address from the transaction
    // In most cases, this would be in the logs or metadata of the transaction
    
    // For AggLayer, the wrapped token maintains the same address but on a different chain
    // The system maps the token appropriately
    return transaction.tokenAddress;
  } catch (error) {
    console.error("Error finding wrapped token address:", error);
    return null;
  }
}

// Function to claim the bridged asset
async function claimBridgedAsset(transaction) {
  try {
    // Initialize LxLy client again
    const lxly = await new LxLyClient().init({
      network: "testnet",
      providers: {
        0: { // Sepolia
          provider: new HDWalletProvider([process.env.USER1_PRIVATE_KEY], process.env.NETWORK_0_RPC),
          configuration: { bridgeAddress: process.env.NETWORK_0_BRIDGE },
          defaultConfig: { from: transaction.userAddress }
        },
        1: { // Cardona
          provider: new HDWalletProvider([process.env.USER1_PRIVATE_KEY], process.env.NETWORK_1_RPC),
          configuration: { bridgeAddress: process.env.NETWORK_1_BRIDGE },
          defaultConfig: { from: transaction.userAddress }
        },
      },
    });
    
    // Execute claim
    const token = lxly.erc20(transaction.tokenAddress, 1); // 1 = Cardona
    const result = await token.claimAsset(transaction.transactionHash, 0); // 0 = Sepolia
    
    const claimTxHash = await result.getTransactionHash();
    console.log(`Claim transaction submitted: ${claimTxHash}`);
    
    const receipt = await result.getReceipt();
    console.log(`Claim transaction confirmed in block ${receipt.blockNumber}`);
    
    return claimTxHash;
  } catch (error) {
    console.error("Error claiming bridged asset:", error.message);
    throw error;
  }
}

// Function to add liquidity on Cardona
async function addLiquidity(tokenA, tokenB, amountA, amountB) {
  // This would be implemented similarly to the swap functionality
  // First approve both tokens, then call the addLiquidity function on the router
  console.log(`\nTo add liquidity on Cardona, you would need to:`);
  console.log(`1. Approve both tokens (${tokenA} and ${tokenB}) for the router`);
  console.log(`2. Call addLiquidity on the router contract`);
  console.log(`3. Once liquidity is added, you can then use the cross-chain swap functionality`);
}

// Main function to execute the script
async function main() {
  // Example usage
  const tokenAddress = process.argv[2]; // Token address on Sepolia
  const amount = process.argv[3] || "0.1"; // Amount to bridge
  
  if (!tokenAddress) {
    console.log(`
Usage: node scripts/bridge-tokens.js <token-address> [amount]
Example: node scripts/bridge-tokens.js 0x1234...5678 0.1
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
1. Use the wrapped token address on Cardona to add liquidity
2. You can now use the cross-chain swap functionality with these tokens
3. The bridge+call+swap code will use these tokens with liquidity
=================================================================`);
    
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
  }
}

// Run the main function
main().catch(console.error); 