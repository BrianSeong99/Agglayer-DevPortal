export type Chain = {
  name: string;
  logo: string;
  network_id: number;
  txVolume: number;
  blockSpeed: number;
  tvl: number;
  color: string;
}

// Dummy data for chains/planets
const dummyChains: Chain[] = [
  {
    name: "Mercury",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 1,
    txVolume: 500,
    blockSpeed: 2,
    tvl: 1000,
    color: "#b1b1b1",
  },
  {
    name: "Venus",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 2,
    txVolume: 1000,
    blockSpeed: 1.5,
    tvl: 1000,
    color: "#e6c200",
  },
  {
    name: "Earth",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 3,
    txVolume: 2000,
    blockSpeed: 1,
    tvl: 1000,
    color: "#2e8b57",
  },
  {
    name: "Mars",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 4,
    txVolume: 2500,
    blockSpeed: 5,
    tvl: 1000,
    color: "#c1440e",
  },
  {
    name: "Jupiter",
    logo: "/chains/agglayer-logo-mark-black-rgb.svg",
    network_id: 5,
    txVolume: 4000,
    blockSpeed: 3.5,
    tvl: 1000,
    color: "#e3a857",
  },
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