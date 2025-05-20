export type DappData = {
  logo: string
  name: string
  tagline: string
  screenshots: string[]
  description: string
  bullets: string[]
  repoUrl: string
  walkthrough: string
}

export const dapps: Record<string, DappData> = {
  zkhyperliquid: {
    logo: 'https://placehold.co/80x80?text=ZK',
    name: 'zkHyperLiquid',
    tagline: 'High-performance ZK trading with cross-chain interoperability',
    screenshots: ["/dapps/pics/zkhl-app.png", "/dapps/pics/zkhl-app.png", "/dapps/pics/zkhl-app.png", "/dapps/pics/zkhl-app.png", "/dapps/pics/zkhl-app.png"],
    description: 'zkHyperLiquid is a trading platform combining high-performance matching with ZK security. It uses SP1 to verifiably match orders and settle cross-chain using AggLayer.',
    bullets: [
      'Verifiable order matching via SP1',
      '10k+ TPS via off-chain execution',
      'Cross-chain settlement via AggLayer Bridge-and-Call',
    ],
    repoUrl: 'https://github.com/BrianSeong99/zkHyperliquid',
    walkthrough: '/dapps/docs/zkHyperliquid.md',
  },
  uniswap: {
    logo: 'https://placehold.co/80x80?text=UNI',
    name: 'Uniswap',
    tagline: 'Decentralized token exchange with millions in daily volume',
    screenshots: [],
    description: 'Uniswap is a permissionless AMM that allows users to swap tokens and provide liquidity.',
    bullets: [
      'AMM-based token swaps',
      'Deep liquidity pools',
      'Permissionless listings',
    ],
    repoUrl: 'https://github.com/Uniswap/v3-core',
    walkthrough: "/dapps/docs/uniswap.md",
  },
  uniswap1: {
    logo: 'https://placehold.co/80x80?text=UNI',
    name: 'Uniswap',
    tagline: 'Decentralized token exchange with millions in daily volume',
    screenshots: [],
    description: 'Uniswap is a permissionless AMM that allows users to swap tokens and provide liquidity.',
    bullets: [
      'AMM-based token swaps',
      'Deep liquidity pools',
      'Permissionless listings',
    ],
    repoUrl: 'https://github.com/Uniswap/v3-core',
    walkthrough: "/dapps/docs/uniswap.md",
  },
  uniswap2: {
    logo: 'https://placehold.co/80x80?text=UNI',
    name: 'Uniswap',
    tagline: 'Decentralized token exchange with millions in daily volume',
    screenshots: [],
    description: 'Uniswap is a permissionless AMM that allows users to swap tokens and provide liquidity.',
    bullets: [
      'AMM-based token swaps',
      'Deep liquidity pools',
      'Permissionless listings',
    ],
    repoUrl: 'https://github.com/Uniswap/v3-core',
    walkthrough: "/dapps/docs/uniswap.md",
  },
  uniswap3: {
    logo: 'https://placehold.co/80x80?text=UNI',
    name: 'Uniswap',
    tagline: 'Decentralized token exchange with millions in daily volume',
    screenshots: [],
    description: 'Uniswap is a permissionless AMM that allows users to swap tokens and provide liquidity.',
    bullets: [
      'AMM-based token swaps',
      'Deep liquidity pools',
      'Permissionless listings',
    ],
    repoUrl: 'https://github.com/Uniswap/v3-core',
    walkthrough: "/dapps/docs/uniswap.md",
  },
  uniswap4: {
    logo: 'https://placehold.co/80x80?text=UNI',
    name: 'Uniswap',
    tagline: 'Decentralized token exchange with millions in daily volume',
    screenshots: [],
    description: 'Uniswap is a permissionless AMM that allows users to swap tokens and provide liquidity.',
    bullets: [
      'AMM-based token swaps',
      'Deep liquidity pools',
      'Permissionless listings',
    ],
    repoUrl: 'https://github.com/Uniswap/v3-core',
    walkthrough: "/dapps/docs/uniswap.md",
  },
  // Add more dApps here
}
