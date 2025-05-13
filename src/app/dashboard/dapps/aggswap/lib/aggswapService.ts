import { ethers } from "ethers";
import RouterABI from "../abis/UniswapV2Router02.json";
import FactoryABI from "../abis/UniswapV2Factory.json";
import { getConfig } from "./config";

// small runtime helper so that components can just call AggswapService.use()
export class AggswapService {
  static use() {
    try {
      return new AggswapService();
    } catch (error) {
      console.error('Failed to initialize AggswapService, falling back to Sepolia:', error);
      // If the specified chain fails, fall back to Sepolia
      return new AggswapService(11155111);
    }
  }

  private provider: ethers.JsonRpcProvider;
  private router: ethers.Contract;
  private factory: ethers.Contract;

  constructor(chainId = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) || 11155111) {
    try {
      // Default to Sepolia if chainId is invalid
      if (!chainId || isNaN(chainId)) {
        console.warn('Invalid chainId, defaulting to Sepolia (11155111)');
        chainId = 11155111;
      }
      
      // Hard-coded Sepolia values as fallback
      const sepoliaFallback = {
        rpcUrl: 'https://sepolia.infura.io/v3/e809949a8a6446408eaf624d373928e4',
        router: '0x11E2D3113853f7a422895E115005e3b1efAb8e1a',
        factory: '0xb1d30e9B13Dd571D3b95d022255CAFA5FEACC5D3',
        wrapper: '0x0f04f8434bac2e1db8fca8a34d3e177b6c7ccaba'
      };
      
      // Get config and use fallbacks for any missing values
      const config = getConfig(chainId);
      const cfg = {
        rpcUrl: config.rpcUrl || sepoliaFallback.rpcUrl,
        router: config.router || sepoliaFallback.router,
        factory: config.factory || sepoliaFallback.factory,
        wrapper: config.wrapper || sepoliaFallback.wrapper
      };
      
      console.log(`Initializing AggswapService with chain ${chainId}:`, cfg);
      
      this.provider = new ethers.JsonRpcProvider(cfg.rpcUrl);
      this.router = new ethers.Contract(cfg.router, RouterABI, this.provider);
      this.factory = new ethers.Contract(cfg.factory, FactoryABI, this.provider);
    } catch (error) {
      console.error(`Failed to initialize contracts for chain ${chainId}:`, error);
      throw error;
    }
  }

  /* ------------------ public write ops ------------------ */

  async swapExactTokensForTokens({ amountIn, tokenIn, tokenOut, walletClient }: { amountIn: bigint; tokenIn: string; tokenOut: string; walletClient: ethers.AbstractSigner }) {
    const path = [tokenIn, tokenOut];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 min
    const routerWithSigner = this.router.connect(walletClient);

    // make sure allowance is set (simple example – in prod handle decimals/approvals better)
    const erc20 = new ethers.Contract(tokenIn, ["function approve(address,uint256)", "function allowance(address,address)(uint256)"], walletClient);
    const allowance: bigint = await erc20.allowance(await walletClient.getAddress(), this.router.target);
    if (allowance < amountIn) {
      const txA = await erc20.approve(this.router.target, amountIn);
      await txA.wait();
    }

    return (routerWithSigner as any).swapExactTokensForTokens(amountIn, 0, path, await walletClient.getAddress(), deadline);
  }

  async addLiquidity({ tokenA, tokenB, amountADesired, amountBDesired, walletClient }: { tokenA: string; tokenB: string; amountADesired: bigint; amountBDesired: bigint; walletClient: ethers.AbstractSigner }) {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
    const routerWithSigner = this.router.connect(walletClient);
    return (routerWithSigner as any).addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, 0, 0, await walletClient.getAddress(), deadline);
  }

  /* ------
-------- readonly helpers -------------- */
  async getPairs() {
    const allPairsLength: bigint = await this.factory.allPairsLength();
    const pairs: { token0: 
    string; token1: string; address: string }[] = [];
    for (let i = 0; i < allPairsLength; i++) {
      const pairAddress: string = await this.factory.allPairs(i);
      const pair = new ethers.Contract(pairAddress, ["function token0()(address)", "function token1()(address)"], this.provider);
      pairs.push({ token0: await pair.token0(), token1: await pair.token1(), address: pairAddress });
    }
    return pairs;
  }
}