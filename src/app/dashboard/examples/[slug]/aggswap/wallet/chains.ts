import { Chain } from "viem";

export const sepolia: Chain = {
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_AGG_RPC_URL_11155111!] },
    public: { http: [process.env.NEXT_PUBLIC_AGG_RPC_URL_11155111!] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
  },
  testnet: true,
};

export const cardona: Chain = {
  id: 2442,
  name: "Cardona zkEVM",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_AGG_RPC_URL_2442!] },
    public: { http: [process.env.NEXT_PUBLIC_AGG_RPC_URL_2442!] },
  },
  blockExplorers: {
    default: { name: "Polygonscan", url: "https://cardona-zkevm.polygonscan.com" },
  },
  testnet: true,
};