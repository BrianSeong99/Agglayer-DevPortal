import { NextApiRequest, NextApiResponse } from "next";
import RouterAbi from "../src/app/dashboard/examples/aggswap/abis/UniswapV2Router02.json";
import FactoryAbi from "../src/app/dashboard/examples/aggswap/abis/UniswapV2Factory.json";
import ERC20Abi from "../src/app/dashboard/examples/aggswap/abis/ERC-20.json";
import { ethers } from "ethers";
import { getLxLyClient, from, to, configuration, tokens, SCALING_FACTOR } from './utils_lxly';

const TOKENS = {
  // Sepolia (Network 0)
  0: {
    TOKEN_A: "0x794203e2982EDA39b4cfC3e1F802D6ab635FcDcB",
    TOKEN_B: "0x5eE2DeAd28817153F6317a3A21F1e8609da0c498"
  },
  // Cardona (Network 1)
  1: {
    TOKEN_A: "0x19956fa010ECAeA67bd8eAa91b18A0026F1c31D7",
    TOKEN_B: "0xD6395Ee1b7DFDB64ba691fdB5B71b3624F168C4C"
  }
};


const TOKEN_A_NAME = "Token A";
const TOKEN_B_NAME = "Token B";

// Token selection options
enum TokenSelection {
  TOKEN_A_TO_B = "TOKEN_A_TO_B",
  TOKEN_B_TO_A = "TOKEN_B_TO_A"
}

interface ChainSwapParams {
  tokenSelection: TokenSelection;
  amount: string;
  userAddress: string;
  slippageTolerance?: number; 
  deadline?: number; 
}


export async function chainSwapHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      tokenSelection,
      amount,
      userAddress,
      slippageTolerance = 2, 
      deadline = 30,
    } = req.body as ChainSwapParams;

    if (!tokenSelection || !amount || !userAddress) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

   
    const amountInWei = ethers.parseUnits(amount, 18).toString();
    
    console.log(`Converting ${amount} to wei: ${amountInWei}`);

    // Source network (Sepolia) is 0, destination network (Cardona) is 1
    const sourceNetworkId = 0;
    const destinationNetworkId = 1;

    let sourceTokenAddress: string;
    let destinationTokenAddress: string;

    if (tokenSelection === TokenSelection.TOKEN_A_TO_B) {
      // From Token A on Sepolia to Token B on Cardona
      sourceTokenAddress = TOKENS[sourceNetworkId].TOKEN_A;
      destinationTokenAddress = TOKENS[destinationNetworkId].TOKEN_B;
      console.log(`Selected option: ${TOKEN_A_NAME} to ${TOKEN_B_NAME}`);
    } else if (tokenSelection === TokenSelection.TOKEN_B_TO_A) {
      // From Token B on Sepolia to Token A on Cardona
      sourceTokenAddress = TOKENS[sourceNetworkId].TOKEN_B;
      destinationTokenAddress = TOKENS[destinationNetworkId].TOKEN_A;
      console.log(`Selected option: ${TOKEN_B_NAME} to ${TOKEN_A_NAME}`);
    } else {
      return res.status(400).json({ error: 'Invalid token selection' });
    }

    // Initialize the Uniswap Router interface for swap calldata
    const iface = new ethers.Interface(RouterAbi);
    
    const swapDeadline = Math.floor(Date.now() / 1000) + (deadline * 60);
    
    // IMPORTANT: For the destination swap path, we must use the token addresses from the destination network
    const sourcePair = tokenSelection === TokenSelection.TOKEN_A_TO_B 
      ? [TOKENS[destinationNetworkId].TOKEN_A, TOKENS[destinationNetworkId].TOKEN_B]
      : [TOKENS[destinationNetworkId].TOKEN_B, TOKENS[destinationNetworkId].TOKEN_A];
    
    console.log(`Creating swap calldata for Cardona with path: ${sourcePair[0]} -> ${sourcePair[1]}`);
    
    // Create calldata for the swap that will happen on Cardona using Cardona token addresses
    const calldata = iface.encodeFunctionData("swapExactTokensForTokens", [
      amountInWei, 
      0, 
      sourcePair, 
      userAddress, 
      swapDeadline, 
    ]);

    // Execute bridge and call
    const result = await bridgeAndCall({
      sourceTokenAddress,
      amount: amountInWei, 
      destinationTokenAddress,
      calldata,
      userAddress
    });

    return res.status(200).json({
      success: true,
      tokenSelection,
      sourceToken: sourceTokenAddress === TOKENS[sourceNetworkId].TOKEN_A ? TOKEN_A_NAME : TOKEN_B_NAME,
      destinationToken: destinationTokenAddress === TOKENS[destinationNetworkId].TOKEN_A ? TOKEN_A_NAME : TOKEN_B_NAME,
      hash: result.txHash, 
      txHash: result.txHash, 
      ...result
    });
  } catch (error: any) {
    console.error("Chain swap error:", error);
    return res.status(500).json({
      error: "Failed to execute chain swap",
      message: error.message
    });
  }
}


export async function getTokenOptionsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return the available token options with both Sepolia and Cardona addresses
    return res.status(200).json({
      options: [
        {
          value: TokenSelection.TOKEN_A_TO_B,
          label: `${TOKEN_A_NAME} to ${TOKEN_B_NAME}`,
          sourceToken: {
            address: TOKENS[0].TOKEN_A,
            name: TOKEN_A_NAME,
            network: "Sepolia"
          },
          destinationToken: {
            address: TOKENS[1].TOKEN_B,
            name: TOKEN_B_NAME,
            network: "Cardona"
          }
        },
        {
          value: TokenSelection.TOKEN_B_TO_A,
          label: `${TOKEN_B_NAME} to ${TOKEN_A_NAME}`,
          sourceToken: {
            address: TOKENS[0].TOKEN_B,
            name: TOKEN_B_NAME,
            network: "Sepolia"
          },
          destinationToken: {
            address: TOKENS[1].TOKEN_A,
            name: TOKEN_A_NAME,
            network: "Cardona"
          }
        }
      ]
    });
  } catch (error: any) {
    console.error("Get token options error:", error);
    return res.status(500).json({
      error: "Failed to get token options",
      message: error.message
    });
  }
}

/**
 * Bridge tokens from Sepolia to Cardona and prepare a swap call
 */
async function bridgeAndCall(params: {
  sourceTokenAddress: string;
  amount: string;
  destinationTokenAddress: string;
  calldata: string;
  userAddress: string;
}): Promise<any> {
  console.log(`
=================================================================
              BRIDGE AND CALL FROM SEPOLIA TO CARDONA
=================================================================
Source Token: ${params.sourceTokenAddress}
Amount: ${params.amount}
Destination Token: ${params.destinationTokenAddress}
User Address: ${params.userAddress}
=================================================================`);

  try {

    const client = await getLxLyClient();


    const sourceNetworkId = 0;
    

    const bridgeExtensionAddress = configuration[sourceNetworkId].bridgeExtensionAddress;
    if (!bridgeExtensionAddress) {
      throw new Error("Bridge extension address not configured");
    }
    
    console.log(`Bridge extension address: ${bridgeExtensionAddress}`);


    const provider = new ethers.JsonRpcProvider(configuration[sourceNetworkId].rpc);
    const privateKey = process.env.USER1_PRIVATE_KEY!;
    const signer = new ethers.Wallet(privateKey, provider);

    // Create token contract instance
    const tokenContract = new ethers.Contract(
      params.sourceTokenAddress,
      ERC20Abi,
      signer
    );
    
    // Get token details for logging
    let tokenSymbol = "Unknown";
    let tokenDecimals = 18;
    try {
      tokenSymbol = await tokenContract.symbol();
      tokenDecimals = await tokenContract.decimals();
      console.log(`Token: ${tokenSymbol} with ${tokenDecimals} decimals`);
    } catch (error) {
      console.warn("Could not get token details, using defaults");
    }
    
    // Check current allowance
    console.log(`Checking if bridge extension is approved to spend tokens...`);
    const allowance = await tokenContract.allowance(params.userAddress, bridgeExtensionAddress);
    console.log(`Current allowance: ${ethers.formatUnits(allowance, tokenDecimals)} ${tokenSymbol}`);
    console.log(`Required amount: ${ethers.formatUnits(params.amount, tokenDecimals)} ${tokenSymbol}`);
    
    // If allowance is insufficient, approve tokens
    // We'll approve a much larger amount to avoid frequent approvals
    if (allowance < BigInt(params.amount)) {
      console.log(`Insufficient allowance. Approving tokens for bridge extension...`);
      
      // Approve for a much larger amount (10x the requested amount)
      // This reduces the need for future approvals
      const approvalAmount = BigInt(params.amount) * BigInt(10);
      console.log(`Approving ${ethers.formatUnits(approvalAmount.toString(), tokenDecimals)} ${tokenSymbol}`);
      
      try {
        const approveTx = await tokenContract.approve(
          bridgeExtensionAddress, 
          approvalAmount,
          { gasLimit: 100000 } 
        );
        console.log(`Approval transaction submitted: ${approveTx.hash}`);
        

        console.log(`Waiting for approval transaction to be confirmed...`);
        const approveReceipt = await approveTx.wait();
        console.log(`Approval transaction confirmed in block ${approveReceipt.blockNumber}`);
        

        const newAllowance = await tokenContract.allowance(params.userAddress, bridgeExtensionAddress);
        console.log(`New allowance: ${ethers.formatUnits(newAllowance, tokenDecimals)} ${tokenSymbol}`);
        
        if (newAllowance < BigInt(params.amount)) {
          throw new Error(`Approval failed: allowance (${newAllowance}) is still less than required amount (${params.amount})`);
        }
      } catch (error: any) {
        console.error(`Approval transaction failed: ${error.message}`);
        if (error.transaction?.hash) {
          console.error(`Failed transaction hash: ${error.transaction.hash}`);
        }
        throw new Error(`Token approval failed: ${error.message}`);
      }
    } else {
      console.log(`Token already approved for bridge extension`);
    }

    // Get the router address on Cardona
    const routerAddress = process.env.NEXT_PUBLIC_AGG_UNISWAP_ROUTER_2442!;



    const destinationNetworkId = 1;

    const fallbackAddress = params.userAddress;

    const forceUpdateGlobalExitRoot = true;

    const permitData = "0x0";

    console.log(`Bridging ${ethers.formatUnits(params.amount, tokenDecimals)} ${tokenSymbol} from Sepolia to Cardona...`);
    
    const result = await (client as any).bridgeExtensions[sourceNetworkId].bridgeAndCall(
      params.sourceTokenAddress,
      params.amount,
      destinationNetworkId,
      routerAddress,
      fallbackAddress,
      params.calldata,
      forceUpdateGlobalExitRoot,
      permitData
    );


    const txHash = await result.getTransactionHash();
    console.log(`Bridge transaction submitted: ${txHash}`);


    const receipt = await result.getReceipt();
    console.log(`Bridge transaction confirmed!`);
    console.log(`Receipt:`, receipt);

    return { 
      txHash,
      receipt,
      message: "Bridge and call transaction confirmed. The token will be bridged to Cardona and swapped automatically."
    };
  } catch (error: any) {
    console.error(`Bridge and call error: ${error.message}`);
    if (error.error?.message) {
      console.error(`Transaction error details: ${error.error.message}`);
    }
    if (error.transaction?.hash) {
      console.error(`Failed transaction hash: ${error.transaction.hash}`);
    }
    throw new Error(`Failed to bridge token and call: ${error.message}`);
  }
}

/**
 * Claim a bridged token on Cardona (in case automatic claiming fails)
 */
// export async function claimTokenHandler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { bridgeTransactionHash } = req.body;

//     if (!bridgeTransactionHash) {
//       return res.status(400).json({ error: 'Missing bridge transaction hash' });
//     }

//     const result = await claimToken(bridgeTransactionHash);

//     return res.status(200).json({
//       success: true,
//       ...result
//     });
//   } catch (error: any) {
//     console.error("Claim token error:", error);
//     return res.status(500).json({
//       error: "Failed to claim token",
//       message: error.message
//     });
//   }
// }


// export async function claimToken(
//   bridgeTransactionHash: string
// ): Promise<any> {
//   try {
//     console.log(`
// =================================================================
//                  CLAIM BRIDGED ASSET ON CARDONA
// =================================================================
// Bridge Transaction Hash: ${bridgeTransactionHash}
// =================================================================`);

//     // Initialize LxLy client
//     const client = await getLxLyClient();

//     // Source Network ID (Sepolia is 0)
//     const sourceNetworkId = 0;
//     // Destination Network ID (Cardona is 1)
//     const destinationNetworkId = 1;

//     // Get token instance on destination chain - following pattern in claim_bridge_and_call.js
//     const token = client.erc20(tokens[destinationNetworkId].ether, destinationNetworkId);

//     // Call claimAsset API
//     console.log(`Claiming token asset from transaction ${bridgeTransactionHash}...`);
//     const resultToken = await token.claimAsset(bridgeTransactionHash, sourceNetworkId, { returnTransaction: false });

//     // Get transaction hash
//     const txHashToken = await resultToken.getTransactionHash();
//     console.log(`Claim token transaction submitted: ${txHashToken}`);

//     // Get transaction receipt
//     const receiptToken = await resultToken.getReceipt();
//     console.log(`Claim token transaction confirmed!`);
//     console.log(`Receipt:`, receiptToken);

//     // Build payload for claiming message - following the exact pattern in claim_bridge_and_call.js
//     console.log(`Claiming bridge message...`);
//     const resultMessage = await (client as any).bridgeUtil.buildPayloadForClaim(
//       bridgeTransactionHash, 
//       sourceNetworkId,
//       1 // bridgeIndex
//     ).then((payload: any) => {
//       console.log("Payload:", payload);
//       return (client as any).bridges[destinationNetworkId].claimMessage(
//         payload.smtProof,
//         payload.smtProofRollup,
//         BigInt(payload.globalIndex),
//         payload.mainnetExitRoot,
//         payload.rollupExitRoot,
//         payload.originNetwork,
//         payload.originTokenAddress,
//         payload.destinationNetwork,
//         payload.destinationAddress,
//         payload.amount,
//         payload.metadata
//       );
//     });

//     // Get message transaction hash
//     const txHashMessage = await resultMessage.getTransactionHash();
//     console.log(`Claim message transaction submitted: ${txHashMessage}`);

//     // Get message transaction receipt
//     const receiptMessage = await resultMessage.getReceipt();
//     console.log(`Claim message transaction confirmed!`);
//     console.log(`Receipt:`, receiptMessage);

//     return { 
//       tokenClaim: {
//         txHash: txHashToken,
//         receipt: receiptToken
//       },
//       messageClaim: {
//         txHash: txHashMessage,
//         receipt: receiptMessage
//       }
//     };
//   } catch (error: any) {
//     console.error(`Claim error: ${error.message}`);
//     throw new Error(`Failed to claim token: ${error.message}`);
//   }
// }

// /**
//  * Swap tokens on Cardona
//  */
// export async function swapTokens(
//   params: {
//     tokenIn: string;
//     tokenOut: string;
//     amountIn: string;
//     slippageTolerance: number;
//     deadline: number;
//     userAddress: string;
//   }
// ): Promise<{ txHash: string; receipt: any }> {
//   try {
//     // Initialize ethers provider for Cardona
//     const provider = new ethers.JsonRpcProvider(configuration[1].rpc);
//     const privateKey = process.env.USER1_PRIVATE_KEY!;
//     const signer = new ethers.Wallet(privateKey, provider);

//     // Get router contract
//     const routerAddress = process.env.NEXT_PUBLIC_AGG_UNISWAP_ROUTER_2442!;
//     const router = new ethers.Contract(routerAddress, RouterAbi, signer);

//     // First check if we need to approve the tokens
//     const tokenInContract = new ethers.Contract(params.tokenIn, ERC20Abi, signer);

//     // Get token info
//     const tokenSymbol = await tokenInContract.symbol();
//     const tokenDecimals = await tokenInContract.decimals();
//     console.log(`Swapping ${tokenSymbol} with ${tokenDecimals} decimals`);

//     // Check if we need to approve
//     const allowance = await tokenInContract.allowance(params.userAddress, routerAddress);
//     const amountIn = ethers.parseUnits(params.amountIn, tokenDecimals);

//     if (allowance < amountIn) {
//       console.log(`Approving ${params.amountIn} ${tokenSymbol} for router...`);
//       const approveTx = await tokenInContract.approve(routerAddress, amountIn);
//       console.log(`Approval transaction submitted: ${approveTx.hash}`);
//       await approveTx.wait();
//       console.log(`Approval confirmed!`);
//     } else {
//       console.log(`Token already approved for router`);
//     }

//     // Calculate minimum amount out with slippage
//     // For a real implementation, you would want to get the current price from Uniswap
//     // and calculate the expected output amount, then apply slippage
//     // For simplicity, we'll just apply a 2% slippage on the input amount
//     const minAmountOut = amountIn * BigInt(100 - params.slippageTolerance) / BigInt(100);

//     // Calculate deadline
//     const deadlineTimestamp = Math.floor(Date.now() / 1000) + params.deadline * 60;

//     // Execute swap
//     console.log(`Swapping ${params.amountIn} ${tokenSymbol} for minimum ${ethers.formatUnits(minAmountOut, tokenDecimals)} of output token...`);
    
//     const swapTx = await router.swapExactTokensForTokens(
//       amountIn,
//       minAmountOut,
//       [params.tokenIn, params.tokenOut],
//       params.userAddress,
//       deadlineTimestamp
//     );

//     console.log(`Swap transaction submitted: ${swapTx.hash}`);
    
//     const receipt = await swapTx.wait();
//     console.log(`Swap transaction confirmed!`);

//     return { txHash: swapTx.hash, receipt };
//   } catch (error: any) {
//     console.error(`Swap error: ${error.message}`);
//     throw new Error(`Failed to swap tokens: ${error.message}`);
//   }
// }

// /**
//  * Complete chain swap helper function
//  * This would be called after monitoring and confirming that the bridge transaction is ready to claim
//  */
// export async function completeChainSwap(
//   bridgeTransactionHash: string,
//   params: {
//     destinationTokenAddress: string;
//     claimedTokenAddress: string;
//     amount: string;
//     userAddress: string;
//     slippageTolerance?: number;
//     deadline?: number;
//   }
// ): Promise<any> {
//   try {
//     // 1. Claim the bridged token
//     const claimResult = await claimToken(bridgeTransactionHash);
    
//     // 2. Swap the claimed token for the destination token
//     const swapResult = await swapTokens({
//       tokenIn: params.claimedTokenAddress,
//       tokenOut: params.destinationTokenAddress,
//       amountIn: params.amount,
//       slippageTolerance: params.slippageTolerance || 2,
//       deadline: params.deadline || 30,
//       userAddress: params.userAddress
//     });

//     return {
//       claim: {
//         txHash: claimResult.tokenClaim.txHash,
//         receipt: claimResult.tokenClaim.receipt
//       },
//       messageClaim: {
//         txHash: claimResult.messageClaim.txHash,
//         receipt: claimResult.messageClaim.receipt
//       },
//       swap: {
//         txHash: swapResult.txHash,
//         receipt: swapResult.receipt
//       }
//     };
//   } catch (error: any) {
//     console.error(`Complete chain swap error: ${error.message}`);
//     throw new Error(`Failed to complete chain swap: ${error.message}`);
//   }
// }
