export interface ChainConfig {
    rpcUrl: string;
    router: string;
    factory: string;
    wrapper?: string;
  }
  
  /**
   * Fetch chain-specific configuration from environment variables.
   */
  export function getConfig(chainId: number): ChainConfig {
    // Direct access to environment variables, fallback to empty strings for type safety
    const rpcUrl = process.env[`NEXT_PUBLIC_AGG_RPC_URL_${chainId}`] || '';
    const router = process.env[`NEXT_PUBLIC_AGG_UNISWAP_ROUTER_${chainId}`] || '';
    const factory = process.env[`NEXT_PUBLIC_AGG_UNISWAP_FACTORY_${chainId}`] || '';
    const wrapper = process.env[`NEXT_PUBLIC_NETWORK_0_WRAPPER`] || '';
    
    return { rpcUrl, router, factory, wrapper };
  }