const dapps = [
    {
      name: 'Uniswap',
      description: 'Decentralized exchange for swapping tokens.',
      url: '/dashboard/dapps/uniswap',
    },
    {
      name: 'Stargate',
      description: 'Omnichain bridge for cross-chain liquidity.',
      url: '/dashboard/dapps/stargate',
    },
    {
      name: 'Aave',
      description: 'Decentralized lending protocol.',
      url: '/dashboard/dapps/aave',
    },
  ]
  
  export default function DappDashboardPage() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">dApps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dapps.map((dapp) => (
            <a
              key={dapp.name}
              href={dapp.url}
              className="block p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-bold mb-1">{dapp.name}</h3>
              <p className="text-sm text-gray-600">{dapp.description}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
  