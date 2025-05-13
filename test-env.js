require('dotenv').config({ path: '.env.local' });

console.log('Environment variables test:');
console.log('NEXT_PUBLIC_DEFAULT_CHAIN_ID:', process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID);
console.log('NEXT_PUBLIC_AGG_RPC_URL_11155111:', process.env.NEXT_PUBLIC_AGG_RPC_URL_11155111);
console.log('NEXT_PUBLIC_AGG_UNISWAP_ROUTER_11155111:', process.env.NEXT_PUBLIC_AGG_UNISWAP_ROUTER_11155111);
console.log('NEXT_PUBLIC_AGG_UNISWAP_FACTORY_11155111:', process.env.NEXT_PUBLIC_AGG_UNISWAP_FACTORY_11155111);
console.log('NEXT_PUBLIC_NETWORK_0_WRAPPER:', process.env.NEXT_PUBLIC_NETWORK_0_WRAPPER); 