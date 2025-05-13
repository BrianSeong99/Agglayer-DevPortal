import { LxLyClient, use, setProofApi } from '@maticnetwork/lxlyjs';
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import BN from 'bn.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

use(Web3ClientPlugin);

// Configure proof API endpoint
const PROOF_API = 'https://api-gateway.polygon.technology/api/v3/proof/testnet';
setProofApi(PROOF_API);

export const SCALING_FACTOR = new BN(10).pow(new BN(18));

interface NetworkConfiguration {
  rpc: string;
  bridgeAddress: string;
  bridgeExtensionAddress?: string;
  wrapperAddress?: string;
  isEIP1559Supported?: boolean;
}

interface NetworkConfigurations {
  [key: number]: NetworkConfiguration;
}

const networkConfigurations: NetworkConfigurations = {
  0: { // Sepolia
    rpc: process.env.NETWORK_0_RPC || '',
    bridgeAddress: process.env.NETWORK_0_BRIDGE || '',
    bridgeExtensionAddress: process.env.NETWORK_0_BRIDGE_EXTENSION || '',
    wrapperAddress: process.env.NETWORK_0_WRAPPER || '',
    isEIP1559Supported: true
  },
  1: { // Cardona
    rpc: process.env.NETWORK_1_RPC || '',
    bridgeAddress: process.env.NETWORK_1_BRIDGE || '',
    bridgeExtensionAddress: process.env.NETWORK_1_BRIDGE_EXTENSION || '',
    isEIP1559Supported: false
  }
};

if (!process.env.USER1_PRIVATE_KEY) {
  throw new Error('USER1_PRIVATE_KEY is not set in .env.local');
}
if (!process.env.NETWORK_0_RPC || !process.env.NETWORK_1_RPC) {
  throw new Error('Network RPC URLs are not set in .env.local');
}
if (!process.env.NETWORK_0_BRIDGE || !process.env.NETWORK_1_BRIDGE) {
  throw new Error('Bridge addresses are not set in .env.local');
}
if (!process.env.NETWORK_0_BRIDGE_EXTENSION || !process.env.NETWORK_1_BRIDGE_EXTENSION) {
  throw new Error('Bridge extension addresses are not set in .env.local');
}

const privateKey = process.env.USER1_PRIVATE_KEY;
const tempProvider = new HDWalletProvider(privateKey, 'https://rpc.ankr.com/eth'); 
const userAddress = tempProvider.getAddress(0);
tempProvider.engine.stop(); // Clean up the provider


export const getLxLyClient = async (network = 'testnet'): Promise<LxLyClient> => {
  if (!privateKey) {
    throw new Error('Private key is not set');
  }

  const lxLyClient = new LxLyClient();
  return await lxLyClient.init({
    log: true,
    network: network,
    providers: {
      0: { // Sepolia
        provider: new HDWalletProvider(
          [privateKey], 
          networkConfigurations[0].rpc
        ),
        configuration: {
          bridgeAddress: networkConfigurations[0].bridgeAddress,
          bridgeExtensionAddress: networkConfigurations[0].bridgeExtensionAddress,
          wrapperAddress: networkConfigurations[0].wrapperAddress,
          isEIP1559Supported: networkConfigurations[0].isEIP1559Supported
        } as any, // Type assertion to bypass TypeScript error
        defaultConfig: {
          from: userAddress
        }
      },
      1: { // Cardona
        provider: new HDWalletProvider(
          [privateKey], 
          networkConfigurations[1].rpc
        ),
        configuration: {
          bridgeAddress: networkConfigurations[1].bridgeAddress,
          bridgeExtensionAddress: networkConfigurations[1].bridgeExtensionAddress,
          isEIP1559Supported: networkConfigurations[1].isEIP1559Supported
        } as any, // Type assertion to bypass TypeScript error
        defaultConfig: {
          from: userAddress
        }
      }
    }
  });
};

export const tokens = {
  0: { // Sepolia
    ether: "0x0000000000000000000000000000000000000000" 
  },
  1: { // Cardona
    ether: "0x0000000000000000000000000000000000000000" 
  }
};

export const configuration = networkConfigurations;
export const from = userAddress;
export const to = userAddress;
export { privateKey };
