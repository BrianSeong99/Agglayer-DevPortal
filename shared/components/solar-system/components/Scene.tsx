import useGravity from '../hooks/useGravity'
import { CameraProvider } from '../context/Camera'
import { TrailProvider } from '../context/Trails'

import Sun from './Sun'
import Stars from './Stars'
import Planets from './Planets'

const chains = [
  {
    name: "katana",
    rollupId: 20,
    chainId: 747474,
    forkId: 0,
    rollupTypeId: 12,
    rollupVerifierType: "ALGateway",
    lastVerified: "40min ago",
    batch: 233,
    sequencerUrl: "https://rpc.katanarpc.com",
    networkLiveness: "Active"
  },
  {
    name: "Pentagon Games",
    rollupId: 16,
    chainId: 3344,
    forkId: 12,
    rollupTypeId: 7,
    rollupVerifierType: "zkEVM",
    lastVerified: "2h ago",
    batch: 2902,
    sequencerUrl: "https://rpc.pentagon.games",
    networkLiveness: "Active"
  },
  {
    name: "Ternoa",
    rollupId: 13,
    chainId: 752025,
    forkId: 12,
    rollupTypeId: 7,
    rollupVerifierType: "zkEVM",
    lastVerified: "7min ago",
    batch: 10344,
    sequencerUrl: "https://rpc-mainnet.zkevm.ternoa.network",
    networkLiveness: "Active"
  },
  {
    name: "silicon-zk",
    rollupId: 10,
    chainId: 2355,
    forkId: 12,
    rollupTypeId: 7,
    rollupVerifierType: "zkEVM",
    lastVerified: "1h ago",
    batch: 43115,
    sequencerUrl: "https://rpc.silicon.network",
    networkLiveness: "Active"
  },
  {
    name: "pay-chain",
    rollupId: 8,
    chainId: 31415,
    forkId: 9,
    rollupTypeId: 4,
    rollupVerifierType: "zkEVM",
    lastVerified: "26min ago",
    batch: 24896,
    sequencerUrl: "https://rpc.wirexpaychain.com",
    networkLiveness: "Active"
  },
  {
    name: "prism",
    rollupId: 7,
    chainId: 994873017,
    forkId: 12,
    rollupTypeId: 7,
    rollupVerifierType: "zkEVM",
    lastVerified: "1h ago",
    batch: 71324,
    sequencerUrl: "https://prism-sequencer.eu-north-2.gateway.fm/",
    networkLiveness: "Active"
  },
  {
    name: "X Layer",
    rollupId: 3,
    chainId: 196,
    forkId: 13,
    rollupTypeId: 8,
    rollupVerifierType: "zkEVM",
    lastVerified: "25min ago",
    batch: 230962,
    sequencerUrl: "https://rpc.xlayer.tech",
    networkLiveness: "Active"
  }
];

// Scene component
const Scene = () => {
    // Custom hook for gravity logic
    useGravity()

    return (
        <CameraProvider>
            <Sun />

            <TrailProvider>
                <Planets chains={chains} />
            </TrailProvider>

            <Stars />
        </CameraProvider>
    )
}

export default Scene 