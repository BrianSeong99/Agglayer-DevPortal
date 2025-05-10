'use client'

import { useConnect, useAccount, useDisconnect } from 'wagmi'

export default function ConnectWallet() {
  const { connect, connectors, isPending, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, status } = useAccount()

  if (status === 'connected') {
    return (
      <div className="mt-6">
        <p className="text-sm mb-2 text-gray-600">Connected as:</p>
        <div className="font-mono text-sm">{address}</div>
        <button
          onClick={() => disconnect()}
          className="mt-2 text-sm bg-red-100 text-red-600 px-4 py-1 rounded hover:bg-red-200"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          disabled={!connector.ready || isPending}
        >
          {isPending && pendingConnector?.uid === connector.uid
            ? 'Connecting...'
            : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  )
}
