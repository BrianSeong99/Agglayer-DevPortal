module.exports = {
    network: process.env.NETWORK || 'testnet',
  
    // LxLy network-index ⇢ on-chain settings
    configuration: {
      0: {                                               //   ↳ Sepolia
        rpc: process.env.NETWORK_0_RPC,
        bridgeAddress: process.env.NETWORK_0_BRIDGE,
        bridgeExtensionAddress: process.env.NETWORK_0_BRIDGE_EXTENSION,
        wrapperAddress: process.env.NETWORK_0_WRAPPER,
        isEIP1559Supported: true,                       // Sepolia is EIP-1559
      },
      1: {                                               //   ↳ Cardona zkEVM
        rpc: process.env.NETWORK_1_RPC,
        bridgeAddress: process.env.NETWORK_1_BRIDGE,
        bridgeExtensionAddress: process.env.NETWORK_1_BRIDGE_EXTENSION,
        isEIP1559Supported: true,                       // Cardona uses 1559 as well
      },
    },
  
    tokens: {
      0: { ether: '0x0000000000000000000000000000000000000000' },
      1: { ether: '0x0000000000000000000000000000000000000000' },
    },
  
    user1: {
      privateKey: process.env.USER1_PRIVATE_KEY,
      address: process.env.USER1_FROM,
    },
  };