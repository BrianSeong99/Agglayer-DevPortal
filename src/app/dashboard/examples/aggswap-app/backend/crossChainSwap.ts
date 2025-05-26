// import { NextApiRequest, NextApiResponse } from "next";
// import "dotenv/config";
// import { ethers, Interface, BrowserProvider } from "ethers";
// import RouterAbi from "../abis/UniswapV2Router02.json";
// import { getConfig } from "../lib/config";
// import { LxLyClient, use, setProofApi } from "@maticnetwork/lxlyjs";
// import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
// import HDWalletProvider from "@truffle/hdwallet-provider";
// import axios from "axios";

// use(Web3ClientPlugin);

// // Transaction API endpoint
// const TRANSACTION_API = "https://api-gateway.polygon.technology/api/v3/transactions/testnet";
// const PROOF_API = "https://api-gateway.polygon.technology/api/v3/proof/testnet";

// // Set the proof API with API key from environment
// setProofApi(PROOF_API);

// // Transaction states based on AggLayer documentation
// enum TxState {
//   BRIDGED = "BRIDGED",
//   READY_TO_CLAIM = "READY_TO_CLAIM",
//   CLAIMED = "CLAIMED"
// }

// export async function crossChainSwapHandler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
//   try {
//     // Check if API key is available
//     const apiKey = process.env.POLYGON_API_KEY;
//     if (!apiKey) {
//       throw new Error("POLYGON_API_KEY is not set in environment variables");
//     }

//     const { amountIn, tokenIn, tokenOut, address } = req.body;

//     if (!amountIn || !tokenIn || !tokenOut || !address) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }

//     const cfgSepolia = getConfig(11155111); // chainId Sepolia
//     const cfgCardona = getConfig(2442);    // chainId Cardona

//     if (!process.env.USER1_PRIVATE_KEY) {
//       throw new Error("USER1_PRIVATE_KEY is not set in environment variables");
//     }
//     if (!process.env.NETWORK_0_BRIDGE || !process.env.NETWORK_0_WRAPPER || !process.env.NETWORK_1_BRIDGE) {
//       throw new Error("Bridge or Wrapper addresses are not set in environment variables");
//     }
    
//     // Instantiate Sepolia HDWalletProvider once
//     const sepoliaHDProvider = new HDWalletProvider(
//         [process.env.USER1_PRIVATE_KEY!], 
//         cfgSepolia.rpcUrl
//     );

//     const cardonaHDProvider = new HDWalletProvider(
//         [process.env.USER1_PRIVATE_KEY!],
//         cfgCardona.rpcUrl
//     );

//     const iface = new Interface(RouterAbi as any);
//     const deadline = Math.floor(Date.now() / 1000) + 600;
//     const calldata = iface.encodeFunctionData("swapExactTokensForTokens", [
//       ethers.parseUnits(amountIn, 18), // Assuming 18 decimals for amountIn
//       0, // amountOutMin
//       [tokenIn, tokenOut], // path
//       address, // to
//       deadline,
//     ]);

//     const lxly = await new LxLyClient().init({
//       network: "testnet",
//       providers: {
//         0: { // Sepolia
//           provider: sepoliaHDProvider,
//           configuration: { 
//             bridgeAddress: process.env.NETWORK_0_BRIDGE,
//             wrapperAddress: process.env.NETWORK_0_WRAPPER
//           },
//           defaultConfig: { from: address },
//         },
//         1: { // Cardona
//           provider: cardonaHDProvider,
//           configuration: { 
//             bridgeAddress: process.env.NETWORK_1_BRIDGE 
//           },
//           defaultConfig: { from: address },
//         },
//       },
//     });

//     // approve wrapper on Sepolia
//     const ethersSepoliaProvider = new BrowserProvider(sepoliaHDProvider as any); // Cast to any for Eip1193Provider compatibility
//     const sepoliaSigner = await ethersSepoliaProvider.getSigner();
    
//     const erc20 = new ethers.Contract(
//         tokenIn, 
//         [
//           "function approve(address spender, uint256 amount) returns (bool)", 
//           "function allowance(address owner, address spender) view returns (uint256)"
//         ], 
//         sepoliaSigner
//     );
    
//     const amountBN = ethers.parseUnits(amountIn, 18); // Assuming 18 decimals
//     const currentAllowance = await erc20.allowance(address, process.env.NETWORK_0_WRAPPER); // Approve the wrapper
    
//     if (currentAllowance < amountBN) {
//       console.log(`Current allowance for wrapper: ${ethers.formatUnits(currentAllowance, 18)}, required: ${amountIn}. Approving...`);
//       const approveTx = await erc20.approve(process.env.NETWORK_0_WRAPPER, amountBN); // Approve the wrapper
//       console.log(`Approval transaction submitted: ${approveTx.hash}. Waiting for confirmation...`);
//       await approveTx.wait();
//       console.log("Approval for wrapper confirmed.");
//     } else {
//       console.log(`Wrapper allowance sufficient: ${ethers.formatUnits(currentAllowance, 18)}`);
//     }

//     // Execute the bridge and call operation
//     console.log("Executing bridgeAndCall...");
//     const bridgeResult = await (lxly as any).bridgeAndCall({ // Cast lxly to any if bridgeAndCall method is not in type defs
//       amount: amountBN,
//       tokenAddress: tokenIn,
//       srcChainId: 0, // Sepolia index
//       destChainId: 1, // Cardona index
//       destContract: cfgCardona.router,
//       callData: calldata,
//       receiverAddress: address,
//     });
//     console.log("bridgeAndCall submitted.");

//     const txHash = await bridgeResult.getTransactionHash();

//     // Start monitoring the transaction status
//     monitorTransactionStatus(address, txHash, apiKey);

//     res.json({ 
//       ok: true, 
//       hash: txHash,
//       message: "Transaction submitted. It will be processed in two steps: bridging (about 5-10 minutes) and then automatic claiming once ready."
//     });
//   } catch (error: any) {
//     console.error("Cross-chain swap error:", error);
//     res.status(500).json({ 
//       error: "Failed to execute cross-chain swap", 
//       message: error.message || "Unknown error"
//     });
//   }
// }

// // Function to monitor transaction status and claim when ready
// async function monitorTransactionStatus(userAddress: string, txHash: string, apiKey: string) {
//   try {
//     // Initial delay to allow transaction to be indexed
//     await new Promise(resolve => setTimeout(resolve, 30000));
    
//     let claimed = false;
//     let attempts = 0;
//     const maxAttempts = 20; // About 10 minutes of monitoring
    
//     while (!claimed && attempts < maxAttempts) {
//       attempts++;
      
//       try {
//         // Check transaction status using Transaction API
//         const response = await axios.get(`${TRANSACTION_API}?userAddress=${userAddress}`, {
//           headers: {
//             'x-api-key': apiKey
//           }
//         });
        
//         const transactions = response.data?.result?.transactions || [];
//         const transaction = transactions.find((tx: any) => tx.transactionHash === txHash);
        
//         if (transaction) {
//           console.log(`Transaction ${txHash} status: ${transaction.state}`);
          
//           if (transaction.state === TxState.READY_TO_CLAIM) {
//             // Transaction is ready to claim
//             console.log("Transaction is ready to claim. Attempting to claim...");
//             await claimTransaction(transaction, apiKey);
//             claimed = true;
//             break;
//           } else if (transaction.state === TxState.CLAIMED) {
//             // Transaction is already claimed
//             console.log("Transaction is already claimed");
//             claimed = true;
//             break;
//           }
//         } else {
//           console.log(`Transaction ${txHash} not found yet. Will check again...`);
//         }
//       } catch (error) {
//         console.error("Error checking transaction status:", error);
//       }
      
//       // Wait 30 seconds before checking again
//       await new Promise(resolve => setTimeout(resolve, 30000));
//     }
    
//     if (!claimed && attempts >= maxAttempts) {
//       console.log(`Exceeded maximum monitoring attempts for transaction ${txHash}. Please check status manually.`);
//     }
//   } catch (error) {
//     console.error("Error in transaction monitoring:", error);
//   }
// }

// // Function to claim a ready transaction
// async function claimTransaction(transaction: any, apiKey: string) {
//   try {
//     const { depositCount, sourceNetworkId, destinationNetworkId, userAddress: txUserAddress, tokenAddress: txTokenAddress, transactionHash: bridgeTxHash } = transaction;
    
//     // Get the configuration
//     const cfgSepolia = getConfig(11155111);
//     const cfgCardona = getConfig(2442);
    
//     // Initialize lxly client again
//     const lxly = await new LxLyClient().init({
//       network: "testnet",
//       providers: {
//         0: {
//           provider: new HDWalletProvider([process.env.USER1_PRIVATE_KEY!], cfgSepolia.rpcUrl),
//           configuration: { 
//             bridgeAddress: process.env.NETWORK_0_BRIDGE,
//             wrapperAddress: process.env.NETWORK_0_WRAPPER 
//           },
//           defaultConfig: { from: txUserAddress },
//         },
//         1: {
//           provider: new HDWalletProvider([process.env.USER1_PRIVATE_KEY!], cfgCardona.rpcUrl),
//           configuration: { 
//             bridgeAddress: process.env.NETWORK_1_BRIDGE 
//           },
//           defaultConfig: { from: txUserAddress },
//         },
//       },
//     });
    
//     // Execute claim
//     const token = lxly.erc20(txTokenAddress, destinationNetworkId);
//     const result = await token.claimAsset(bridgeTxHash, sourceNetworkId, { returnTransaction: false });
    
//     const claimTxHash = await result.getTransactionHash();
//     console.log("Asset claimed successfully. Claim transaction hash:", claimTxHash);
    
//     return claimTxHash;
//   } catch (error) {
//     console.error("Error claiming transaction:", error);
//     throw error;
//   }
// }