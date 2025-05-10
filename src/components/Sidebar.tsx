'use client'

import Link from 'next/link'
import ConnectWallet from './ConnectWallet'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/dashboard/wallet', label: 'Wallet' },
  { href: '/dashboard/dapps', label: 'dApps' },
  { href: '/dashboard/chains', label: 'Chains' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-red-500 border-r border-black shadow-lg h-screen sticky top-0 p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">🥚 Eggshell</h1>
      <nav className="space-y-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'block rounded px-4 py-2 border border-transparent transition font-medium',
              pathname === href
                ? 'bg-yellow-300 text-black border-black shadow'
                : 'text-black hover:bg-yellow-200 hover:border-black'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <ConnectWallet />
    </aside>
  )
}
