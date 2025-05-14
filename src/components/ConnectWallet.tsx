'use client'

import { useConnect, useAccount, useDisconnect } from 'wagmi'

export default function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, status } = useAccount()

  if (status === 'connected') {
    return (
      <div className="mt-6">
        <p className="text-sm mb-2 text-gray-600">Connected as:</p>
        <div className="font-mono text-sm">{address}</div>
        <button
          onClick={() => disconnect()}
          style={{ background: 'var(--button-bg)', color: 'var(--button-text)' }}
          className="block w-full rounded-full px-6 py-3 font-semibold text-lg shadow theme-btn mt-2 whitespace-nowrap"
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
          style={{ background: 'var(--button-bg)', color: 'var(--button-text)' }}
          className="block w-full rounded-full px-6 py-3 font-semibold text-lg shadow theme-btn whitespace-nowrap"
          disabled={!connector.ready || isPending}
        >
          {isPending
            ? 'Connecting...'
            : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  )
}
