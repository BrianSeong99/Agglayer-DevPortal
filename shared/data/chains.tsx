export type Chain = {
  name: string;
  description: string;
  category: string;
  chainStatus: 'Live' | 'In Testnet' | 'In development';
  agglayerStatus: 'Mainnet Connected' | 'Testnet Connected' | 'Pending Connection';
  logo: string;
  exploreUrl?: string;
  buildUrl?: string;
  network_id: number;
  txVolume: number;
  blockSpeed: number;
  tvl: number;
  color: string;
};

// Dummy data for chains/planets
const dummyChains: Chain[] = [
  {
    name: "Forknet",
    description: "An onchain order book DEX for spot and perpetuals, built on CDK OP Stack and natively integrated with Agglayer for unified liquidity. Backed by NeurochainAI's 500K+ users.",
    category: "DeFi",
    chainStatus: "In Testnet",
    agglayerStatus: "Testnet Connected",
    logo: "",
    exploreUrl: "https://www.forknet.io/",
    buildUrl: "https://www.forknet.io/",
    network_id: 1,
    txVolume: 58234,
    blockSpeed: 2.7,
    tvl: 3200000,
    color: "#ffc107"
  },
  {
    name: "IoTeX",
    description: "A modular infrastructure layer transforming millions of idle DePIN devices into communal economies.",
    category: "DePIN",
    chainStatus: "Live",
    agglayerStatus: "Pending Connection",
    logo: "",
    exploreUrl: "https://iotex.io/",
    buildUrl: "https://docs.iotex.io/",
    network_id: 2,
    txVolume: 91234,
    blockSpeed: 1.2,
    tvl: 7800000,
    color: "#2ac841"
  },
  {
    name: "Katana",
    description: "A DeFi-native blockchain designed to bring deep liquidity, real yield and a unified user experience across the Agglayer ecosystem.",
    category: "DeFi",
    chainStatus: "In Testnet",
    agglayerStatus: "Pending Connection",
    logo: "",
    exploreUrl: "https://katana.network/",
    buildUrl: "https://docs.katana.network/",
    network_id: 3,
    txVolume: 23456,
    blockSpeed: 3.8,
    tvl: 1500000,
    color: "#ffc107"
  },
  {
    name: "Lumia",
    description: "A next-gen blockchain optimizing the full lifecycle of RWAs, from asset tokenization to seamless connectivity with millions of DeFi and Web3 traders.",
    category: "RWA",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://lumia.org/",
    buildUrl: "https://docs.lumia.org/",
    network_id: 4,
    txVolume: 75321,
    blockSpeed: 0.9,
    tvl: 9200000,
    color: "#2ac841"
  },
  {
    name: "Miden",
    description: "Miden grants applications the power to scale with public and private transactions.",
    category: "Privacy",
    chainStatus: "In Testnet",
    agglayerStatus: "Pending Connection",
    logo: "",
    exploreUrl: "https://miden.xyz/",
    buildUrl: "https://miden.xyz/developers",
    network_id: 5,
    txVolume: 18765,
    blockSpeed: 5.1,
    tvl: 2100000,
    color: "#ffc107"
  },
  {
    name: "Moonveil",
    description: "A Web3 gaming-focused Layer 2 enabling aggregation and cross-game interoperability.",
    category: "Gaming",
    chainStatus: "In Testnet",
    agglayerStatus: "Testnet Connected",
    logo: "",
    exploreUrl: "https://moonveil.gg/",
    buildUrl: "https://moonveil.gitbook.io/whitepaper",
    network_id: 6,
    txVolume: 67890,
    blockSpeed: 4.2,
    tvl: 4300000,
    color: "#ffc107"
  },
  {
    name: "Newton",
    description: "A unification network designed to seamlessly connect fragmented Web3 ecosystems with one wallet, one balance, and one chain.",
    category: "General",
    chainStatus: "Live",
    agglayerStatus: "Testnet Connected",
    logo: "",
    exploreUrl: "https://www.magicnewton.com/",
    buildUrl: "https://blog.newt.foundation/the-litepaper/",
    network_id: 7,
    txVolume: 34567,
    blockSpeed: 1.7,
    tvl: 5100000,
    color: "#2ac841"
  },
  {
    name: "Okto",
    description: "An L2 designed to streamline blockchain complexity across multiple layers, including wallet, transactions, chain, data, and liquidity.",
    category: "General",
    chainStatus: "Live",
    agglayerStatus: "Testnet Connected",
    logo: "",
    exploreUrl: "https://okto.tech/",
    buildUrl: "https://docs.okto.tech/docs",
    network_id: 8,
    txVolume: 45678,
    blockSpeed: 2.3,
    tvl: 3700000,
    color: "#2ac841"
  },
  {
    name: "Pentagon Games",
    description: "A zkEVM chain purpose-built for high-performance Web3 gaming experiences.",
    category: "Gaming",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://pentagon.games/pen-chain",
    buildUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdsAlzjQncgZvhnUeYGiICJ3JsENxhh6Wv6xGDrfoeziKPIQg/viewform",
    network_id: 9,
    txVolume: 82345,
    blockSpeed: 0.8,
    tvl: 6100000,
    color: "#2ac841"
  },
  {
    name: "Polygon PoS",
    description: "An EVM enabled sidechain with millions of daily active users and popular dApps. Build where the people are.",
    category: "General",
    chainStatus: "Live",
    agglayerStatus: "Pending Connection",
    logo: "",
    exploreUrl: "https://polygon.technology/polygon-pos",
    buildUrl: "https://docs.polygon.technology/pos/",
    network_id: 10,
    txVolume: 99999,
    blockSpeed: 1.1,
    tvl: 10000000,
    color: "#2ac841"
  },
  {
    name: "Polygon zkEVM",
    description: "An EVM-equivalent rollup that will allow for secure, robust DeFi applications",
    category: "DeFi",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://polygon.technology/polygon-zkevm",
    buildUrl: "https://docs.polygon.technology/zkEVM/",
    network_id: 11,
    txVolume: 54321,
    blockSpeed: 2.9,
    tvl: 8900000,
    color: "#2ac841"
  },
  {
    name: "Sentient",
    description: "A decentralized AI protocol built for open-source AGI, integrating with Agglayer to advance community-driven intelligence.",
    category: "AI",
    chainStatus: "In development",
    agglayerStatus: "Pending Connection",
    logo: "",
    exploreUrl: "https://sentient.foundation/",
    buildUrl: "https://docs.sentient.xyz/",
    network_id: 12,
    txVolume: 12345,
    blockSpeed: 6.7,
    tvl: 1200000,
    color: "#c1c1c1"
  },
  {
    name: "Silicon",
    description: "An L2 bringing a social network for hyper-personalization to Agglayer",
    category: "Social",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://silicon.network/",
    buildUrl: "https://docs.silicon.network/",
    network_id: 13,
    txVolume: 67812,
    blockSpeed: 1.4,
    tvl: 5400000,
    color: "#2ac841"
  },
  {
    name: "Ternoa",
    description: "A fast, secure and cost-efficient PayFi network designed to onboard billions of retail customers into crypto.",
    category: "PayFi",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://www.ternoa.network/",
    buildUrl: "https://docs.ternoa.network/",
    network_id: 14,
    txVolume: 23456,
    blockSpeed: 2.1,
    tvl: 4100000,
    color: "#2ac841"
  },
  {
    name: "Wilder World",
    description: "A hyper-scalable Layer 2 bringing an immersive open-world metaverse to the Agglayer",
    category: "Gaming",
    chainStatus: "In Testnet",
    agglayerStatus: "Testnet Connected",
    logo: "",
    exploreUrl: "https://www.wilderworld.com/",
    buildUrl: "https://wiki.wilderworld.com/",
    network_id: 15,
    txVolume: 34512,
    blockSpeed: 4.9,
    tvl: 2900000,
    color: "#ffc107"
  },
  {
    name: "Wirex Pay",
    description: "A decentralized payment network merging traditional and decentralized finance",
    category: "DeFi",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://www.wirexpaychain.com/",
    buildUrl: "https://www.wirexpaychain.com/developer",
    network_id: 16,
    txVolume: 87654,
    blockSpeed: 0.7,
    tvl: 6700000,
    color: "#2ac841"
  },
  {
    name: "Witness Chain",
    description: "An EigenLayer AVS building the DePIN Coordination Layer (DCL) to unify DePIN economies on Ethereum",
    category: "DePIN",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://www.witnesschain.com/",
    buildUrl: "https://docs.witnesschain.com/",
    network_id: 17,
    txVolume: 45678,
    blockSpeed: 3.3,
    tvl: 3800000,
    color: "#2ac841"
  },
  {
    name: "X Layer",
    description: "A ZK-powered Layer 2 network that connects OKX and Ethereum communities, allowing anyone to participate in a truly global on-chain ecosystem.",
    category: "General",
    chainStatus: "Live",
    agglayerStatus: "Mainnet Connected",
    logo: "",
    exploreUrl: "https://www.okx.com/xlayer",
    buildUrl: "https://www.okx.com/xlayer/docs/users/welcome/about-x-layer",
    network_id: 18,
    txVolume: 78901,
    blockSpeed: 2.5,
    tvl: 8600000,
    color: "#2ac841"
  },
  {
    name: "zkSom",
    description: "An L2 chain for enterprise-focused Layer Owned Liquidity solution",
    category: "RWA",
    chainStatus: "Live",
    agglayerStatus: "Testnet Connected",
    logo: "",
    exploreUrl: "https://x.com/zk_som",
    buildUrl: "https://t.co/q9eqZ7t3c0",
    network_id: 19,
    txVolume: 23456,
    blockSpeed: 1.9,
    tvl: 3300000,
    color: "#2ac841"
  }
];

// Function to fetch chains data - can be replaced with API call later
export const fetchChains = async (): Promise<Chain[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // For now, return dummy data
  // Later this can be replaced with:
  // const response = await fetch('/api/chains');
  // return response.json();
  
  return dummyChains;
};

// Helper functions for scaling
export const getScalingData = (chains: Chain[]) => {
  const minTx = Math.min(...chains.map(c => c.txVolume));
  const maxTx = Math.max(...chains.map(c => c.txVolume));
  const minSpeed = Math.min(...chains.map(c => c.blockSpeed));
  const maxSpeed = Math.max(...chains.map(c => c.blockSpeed));
  
  return { minTx, maxTx, minSpeed, maxSpeed };
};

export const scale = (val: number, min: number, max: number, outMin: number, outMax: number) => {
  return ((val - min) / (max - min)) * (outMax - outMin) + outMin;
}; 