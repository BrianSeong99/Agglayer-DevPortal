import useGravity from '../hooks/useGravity'
import { CameraProvider, useCamera } from '../context/Camera'
import { TrailProvider } from '../context/Trails'
import { useSidebar } from '../context/Sidebar'
import { useState, useCallback, useEffect, useRef } from 'react'

import Sun from './Sun'
import Stars from './Stars'
import Planets from './Planets'
import CelestialHighlight from './PlanetHighlight'

// Component to handle empty space clicks (inside CameraProvider)
const EmptySpaceHandler = ({ closeSearchDropdowns }: { closeSearchDropdowns?: (() => void) | null }) => {
  const { closeSidebar } = useSidebar();
  const { clearFocus } = useCamera();

  return (
    <mesh
      position={[0, 0, -1000]} // Far behind everything
      onClick={(e) => {
        e.stopPropagation();
        closeSidebar();
        clearFocus();
        closeSearchDropdowns?.();
      }}
      visible={false} // Invisible but still clickable
    >
      <planeGeometry args={[10000, 10000]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

// Enhanced chain interface for developer information
export interface EnhancedChainData {
  // Basic Info
  name: string;
  chainId: number;
  rollupId: number;
  environment: string;
  rollupVerifierType: string;
  lastVerified?: string;
  networkLiveness?: string;
  
  // Visual Branding
  logo?: string;
  brandColor?: string;
  
  // Network Configuration
  rpcUrls?: {
    http: string[];
    websocket?: string[];
  };
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls?: string[];
  
  // Technical Specs
  blockTime?: string;
  finalityTime?: string;
  consensusMechanism?: string;
  tps?: string;
  
  // Developer Resources
  documentation?: {
    quickStart?: string;
    api?: string;
    sdk?: string;
    contracts?: string;
  };
  
  // Infrastructure
  faucet?: string;
  bridge?: string;
  gasStation?: string;
  statusPage?: string;
  
  // Community
  social?: {
    discord?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  
  // Status
  status?: 'active' | 'warning' | 'down';
  uptime?: string;
}

export const chains: EnhancedChainData[] = [
  // Mainnet chains
  {
    name: "X Layer",
    environment: "mainnet",
    rollupId: 3,
    chainId: 196,
    rollupVerifierType: "Validium",
    lastVerified: "2 minutes ago",
    networkLiveness: "Active",
    status: "active",
    brandColor: "#00d4aa",
    rpcUrls: {
      http: ["https://rpc.xlayer.tech", "https://xlayerrpc.okx.com"],
      websocket: ["wss://ws.xlayer.tech"]
    },
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH", 
      decimals: 18
    },
    blockExplorerUrls: ["https://www.oklink.com/xlayer"],
    blockTime: "2 seconds",
    finalityTime: "10 minutes",
    consensusMechanism: "Proof of Validity",
    tps: "2000+",
    documentation: {
      quickStart: "https://www.okx.com/xlayer/docs",
      api: "https://www.okx.com/xlayer/docs/developer/json-rpc-api"
    },
    bridge: "https://www.okx.com/xlayer/bridge",
    social: {
      website: "https://www.okx.com/xlayer",
      twitter: "https://twitter.com/XLayerOfficial"
    },
    uptime: "99.9%"
  },
  {
    name: "katana",
    environment: "mainnet", 
    rollupId: 20,
    chainId: 747474,
    rollupVerifierType: "ALGateway",
    lastVerified: "an hour ago",
    networkLiveness: "Active",
    status: "active",
    brandColor: "#00d4aa",
    rpcUrls: {
      http: ["https://rpc.katana.so"]
    },
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://explorer.katana.so"],
    blockTime: "2 seconds",
    tps: "1500+",
    uptime: "99.8%"
  },
  {
    name: "Pentagon Games",
    environment: "mainnet",
    rollupId: 16,
    chainId: 3344,
    rollupVerifierType: "Validium",
    lastVerified: "2 hours ago",
    networkLiveness: "Active",
    status: "active",
    brandColor: "#00d4aa",
    rpcUrls: {
      http: ["https://rpc.pentagon.games"]
    },
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://explorer.pentagon.games"],
    blockTime: "2 seconds",
    uptime: "99.7%"
  },
  {
    name: "pay-chain",
    environment: "mainnet",
    rollupId: 8,
    chainId: 31415,
    rollupVerifierType: "Validium",
    lastVerified: "36 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "polygon zkEVM",
    environment: "mainnet",
    rollupId: 1,
    chainId: 1101,
    rollupVerifierType: "zkEVM",
    lastVerified: "23 minutes ago",
    networkLiveness: "Active",
    status: "active",
    brandColor: "#8b5cf6",
    rpcUrls: {
      http: ["https://zkevm-rpc.com", "https://rpc.polygon-zkevm.gateway.fm"],
      websocket: ["wss://zkevm-rpc.com"]
    },
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://zkevm.polygonscan.com"],
    blockTime: "2 seconds",
    finalityTime: "10 minutes",
    consensusMechanism: "Proof of Validity",
    tps: "2000+",
    documentation: {
      quickStart: "https://wiki.polygon.technology/docs/zkevm/",
      api: "https://wiki.polygon.technology/docs/zkevm/api/",
      sdk: "https://wiki.polygon.technology/docs/zkevm/develop/"
    },
    bridge: "https://bridge.polygon.technology/",
    social: {
      website: "https://polygon.technology/polygon-zkevm",
      twitter: "https://twitter.com/0xPolygon",
      github: "https://github.com/0xPolygonHermez"
    },
    uptime: "99.95%"
  },
  {
    name: "prism",
    environment: "mainnet",
    rollupId: 7,
    chainId: 994873017,
    rollupVerifierType: "Validium",
    lastVerified: "an hour ago",
    networkLiveness: "Active"
  },
  {
    name: "silicon-zk",
    environment: "mainnet",
    rollupId: 10,
    chainId: 2355,
    rollupVerifierType: "Validium",
    lastVerified: "35 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "Ternoa",
    environment: "mainnet",
    rollupId: 13,
    chainId: 752025,
    rollupVerifierType: "Validium",
    lastVerified: "2 hours ago",
    networkLiveness: "Active"
  },

  // Cardona testnet chains
  {
    name: "Lumia Beam Testnet",
    environment: "cardona",
    rollupId: 100,
    chainId: 1000,
    rollupVerifierType: "Validium",
    lastVerified: "2 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "ppxlayer-testnet",
    environment: "cardona",
    rollupId: 101,
    chainId: 1001,
    rollupVerifierType: "Validium",
    lastVerified: "16 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "bokuto",
    environment: "cardona",
    rollupId: 102,
    chainId: 1002,
    rollupVerifierType: "ALGateway",
    lastVerified: "31 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "zkevm-testnet",
    environment: "cardona",
    rollupId: 103,
    chainId: 1003,
    rollupVerifierType: "zkEVM",
    lastVerified: "20 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "moonveil-testnet",
    environment: "cardona",
    rollupId: 104,
    chainId: 1004,
    rollupVerifierType: "Validium",
    lastVerified: "38 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "stavanger",
    environment: "cardona",
    rollupId: 105,
    chainId: 1005,
    rollupVerifierType: "Validium",
    lastVerified: "16 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "Zephyr",
    environment: "cardona",
    rollupId: 106,
    chainId: 1006,
    rollupVerifierType: "PPv0.3.3",
    lastVerified: "7 days ago",
    networkLiveness: "Active"
  },
  {
    name: "tac-turin-testnet",
    environment: "cardona",
    rollupId: 107,
    chainId: 1007,
    rollupVerifierType: "PPv0.3.3",
    lastVerified: "3 days ago",
    networkLiveness: "Active"
  },

  // Bali testnet chains
  {
    name: "zkevm-internal",
    environment: "bali",
    rollupId: 200,
    chainId: 2000,
    rollupVerifierType: "zkEVM",
    lastVerified: "20 minutes ago",
    networkLiveness: "Active"
  },
  {
    name: "bali-35-op",
    environment: "bali",
    rollupId: 201,
    chainId: 2001,
    rollupVerifierType: "PPv0.3.3",
    lastVerified: "3 days ago",
    networkLiveness: "Active"
  },
  {
    name: "bolt",
    environment: "bali",
    rollupId: 202,
    chainId: 2002,
    rollupVerifierType: "ALGateway",
    lastVerified: "3 days ago",
    networkLiveness: "Active"
  },
  {
    name: "bali-39",
    environment: "bali",
    rollupId: 203,
    chainId: 2003,
    rollupVerifierType: "PPv0.3.3",
    lastVerified: "2 days ago",
    networkLiveness: "Active"
  }
];

// Scene component
interface SceneProps {
    onPlanetSelectionReady?: (selectPlanet: (name: string) => void, selectSun: () => void) => void;
    closeSearchDropdowns?: (() => void) | null;
}

// Inner scene content that has access to providers
const SceneContent = ({ onPlanetSelectionReady, closeSearchDropdowns }: { onPlanetSelectionReady?: (selectPlanet: (name: string) => void, selectSun: () => void) => void, closeSearchDropdowns?: (() => void) | null }) => {
    const [planetsRef, setPlanetsRef] = useState<React.RefObject<any> | null>(null);
    const sunRef = useRef<any>();
    const { handleFocus } = useCamera();
    const { openSidebar } = useSidebar();
    
    // Planet selection functions
    const selectPlanetByName = useCallback((name: string) => {
        if (!planetsRef?.current) {
            console.warn('Planets ref not available');
            return;
        }

        const chainIndex = chains.findIndex(chain => chain.name === name);
        if (chainIndex === -1) {
            console.warn(`Planet with name "${name}" not found`);
            return;
        }

        const planetObject = planetsRef.current[chainIndex];
        if (planetObject) {
            handleFocus({
                object: planetObject,
                instanceId: chainIndex
            });
            
            openSidebar({ 
                type: 'planet', 
                data: chains[chainIndex] 
            });
        }
    }, [planetsRef, handleFocus, openSidebar]);

    const selectSun = useCallback(() => {
        if (sunRef.current) {
            handleFocus({
                object: sunRef.current
            });
        }
        openSidebar({ 
            type: 'sun', 
            data: { name: 'Agglayer' } 
        });
    }, [handleFocus, openSidebar]);
    
    // Notify parent when planet selection functions are ready
    useEffect(() => {
        onPlanetSelectionReady?.(selectPlanetByName, selectSun);
    }, [selectPlanetByName, selectSun, onPlanetSelectionReady]);
    
    const handlePlanetsRefReady = useCallback((ref: React.RefObject<any>) => {
        setPlanetsRef(ref);
    }, []);

    return (
        <>
            <EmptySpaceHandler closeSearchDropdowns={closeSearchDropdowns} />
            <Sun ref={sunRef} />

            <TrailProvider>
                <Planets chains={chains} onPlanetsRefReady={handlePlanetsRefReady} />
            </TrailProvider>

            <Stars />
            
            {/* Global highlight for any selected celestial body */}
            <CelestialHighlight />
        </>
    );
};

const Scene = ({ onPlanetSelectionReady, closeSearchDropdowns }: SceneProps = {}) => {
    // Custom hook for gravity logic
    useGravity()

    return (
        <CameraProvider>
            <SceneContent onPlanetSelectionReady={onPlanetSelectionReady} closeSearchDropdowns={closeSearchDropdowns} />
        </CameraProvider>
    )
}

export default Scene