'use client'

import { useConnect, useAccount, useDisconnect } from 'wagmi'
import Button from './Button'

export default function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, status } = useAccount()

  if (status === 'connected') {
    return (
      <div className="mt-6">
        <p className="text-sm mb-2 text-gray-600">Connected as:</p>
        <div className="font-mono text-sm">{address}</div>
        <Button onClick={() => disconnect()} className="mt-2">
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={!connector.ready || isPending}
        >
          {isPending
            ? 'Connecting...'
            : `Connect ${connector.name}`}
        </Button>
      ))}
    </div>
  )
}
