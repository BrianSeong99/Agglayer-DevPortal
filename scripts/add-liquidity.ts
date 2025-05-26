import "dotenv/config";
import { ethers } from "ethers";
import ERC20Abi from "../src/app/dashboard/examples/[slug]/aggswap/abis/ERC-20.json";
import RouterAbi from "../src/app/dashboard/examples/[slug]/aggswap/abis/UniswapV2Router02.json";
import FactoryAbi from "../src/app/dashboard/examples/[slug]/aggswap/abis/UniswapV2Factory.json";

// Function to add liquidity on Cardona
async function addLiquidity(
  tokenA: string, 
  tokenB: string, 
  amountA: string, 
  amountB: string
) {
  try {
    // Check that environment variables are set
    if (!process.env.USER1_PRIVATE_KEY) {
      throw new Error("USER1_PRIVATE_KEY is not set in environment variables");
    }
    
    if (!process.env.NETWORK_1_RPC) {
      throw new Error("NETWORK_1_RPC (Cardona RPC URL) is not set in environment variables");
    }

    const routerAddress = process.env.NEXT_PUBLIC_AGG_UNISWAP_ROUTER_2442;
    const factoryAddress = process.env.NEXT_PUBLIC_AGG_UNISWAP_FACTORY_2442;
    
    if (!routerAddress || !factoryAddress) {
      throw new Error("Router or Factory address not set in environment variables");
    }

    // Initialize provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_1_RPC);
    const signer = new ethers.Wallet(process.env.USER1_PRIVATE_KEY, provider);
    const userAddress = signer.address;
    
    console.log(`User address: ${userAddress}`);
    console.log(`Router address: ${routerAddress}`);
    console.log(`Factory address: ${factoryAddress}`);

    // Check if pair already exists
    const factory = new ethers.Contract(factoryAddress, FactoryAbi, signer);
    const pairAddress = await factory.getPair(tokenA, tokenB);
    console.log(`Pair address: ${pairAddress}`);
    
    if (pairAddress !== ethers.ZeroAddress) {
      console.log(`Pair already exists: ${pairAddress}`);
      // You could still add more liquidity here if desired
    }

    // Convert amounts to wei
    const amountAWei = ethers.parseUnits(amountA, 18);
    const amountBWei = ethers.parseUnits(amountB, 18);
    
    // Create token contract instances
    const tokenAContract = new ethers.Contract(tokenA, ERC20Abi, signer);
    const tokenBContract = new ethers.Contract(tokenB, ERC20Abi, signer);
    
    // Get token names
    const tokenAName = await tokenAContract.name();
    const tokenBName = await tokenBContract.name();
    console.log(`\nAdding liquidity for:`);
    console.log(`- ${tokenAName} (${tokenA}): ${amountA}`);
    console.log(`- ${tokenBName} (${tokenB}): ${amountB}`);
    
    // Check and approve token allowances
    const routerContract = new ethers.Contract(routerAddress, RouterAbi, signer);
    
    // Check and approve tokenA
    const allowanceA = await tokenAContract.allowance(userAddress, routerAddress);
    console.log(`\nCurrent allowance for ${tokenAName}: ${ethers.formatUnits(allowanceA, 18)}`);
    
    if (allowanceA < amountAWei) {
      console.log(`Approving ${amountA} ${tokenAName} for the router...`);
      const approveTxA = await tokenAContract.approve(routerAddress, amountAWei);
      await approveTxA.wait();
      console.log(`Approval transaction: ${approveTxA.hash}`);
    }
    
    // Check and approve tokenB
    const allowanceB = await tokenBContract.allowance(userAddress, routerAddress);
    console.log(`Current allowance for ${tokenBName}: ${ethers.formatUnits(allowanceB, 18)}`);
    
    if (allowanceB < amountBWei) {
      console.log(`Approving ${amountB} ${tokenBName} for the router...`);
      const approveTxB = await tokenBContract.approve(routerAddress, amountBWei);
      await approveTxB.wait();
      console.log(`Approval transaction: ${approveTxB.hash}`);
    }
    
    // Calculate minimum amounts (with 2% slippage tolerance)
    const amountAMin = ethers.parseUnits((parseFloat(amountA) * 0.98).toFixed(18), 18);
    const amountBMin = ethers.parseUnits((parseFloat(amountB) * 0.98).toFixed(18), 18);
    
    // Set deadline (10 minutes from now)
    const deadline = Math.floor(Date.now() / 1000) + 600;
    
    // Add liquidity
    console.log(`\nAdding liquidity...`);
    
    const addLiquidityTx = await routerContract.addLiquidity(
      tokenA,
      tokenB,
      amountAWei,
      amountBWei,
      amountAMin,
      amountBMin,
      userAddress,
      deadline
    );
    
    console.log(`Add liquidity transaction submitted: ${addLiquidityTx.hash}`);
    
    // Wait for transaction to be confirmed
    const receipt = await addLiquidityTx.wait();
    console.log(`Add liquidity transaction confirmed in block ${receipt.blockNumber}`);
    
    // Check pair again
    const newPairAddress = await factory.getPair(tokenA, tokenB);
    console.log(`\n✅ SUCCESS: Liquidity added successfully!`);
    console.log(`Pair address: ${newPairAddress}`);
    
    return {
      transactionHash: addLiquidityTx.hash,
      pairAddress: newPairAddress
    };
  } catch (error: any) {
    console.error("Error adding liquidity:", error.message);
    throw error;
  }
}

// Main function to execute the script
async function main() {
  // Example usage
  const tokenA = process.argv[2]; // First token address on Cardona (wrapped token after bridging)
  const tokenB = process.argv[3]; // Second token address on Cardona (wrapped token after bridging)
  const amountA = process.argv[4] || "0.1"; // Amount of tokenA to add
  const amountB = process.argv[5] || "0.1"; // Amount of tokenB to add
  
  if (!tokenA || !tokenB) {
    console.log(`
Usage: npx ts-node scripts/add-liquidity.ts <tokenA> <tokenB> [amountA] [amountB]
Example: npx ts-node scripts/add-liquidity.ts 0x1234...5678 0x8765...4321 0.1 0.1
    `);
    return;
  }
  
  console.log(`
=================================================================
                ADD LIQUIDITY ON CARDONA CHAIN
=================================================================
TokenA: ${tokenA}
TokenB: ${tokenB}
AmountA: ${amountA}
AmountB: ${amountB}
-----------------------------------------------------------------`);
  
  try {
    // Add liquidity
    await addLiquidity(tokenA, tokenB, amountA, amountB);
    
    console.log(`
=================================================================
                      NEXT STEPS
=================================================================
1. You now have a liquidity pool on Cardona
2. You can use the cross-chain swap functionality to swap between these tokens
3. Other users can also use this liquidity pool
=================================================================`);
    
  } catch (error: any) {
    console.error(`\n❌ ERROR: ${error.message}`);
  }
}

// Run the main function
main().catch(console.error); 