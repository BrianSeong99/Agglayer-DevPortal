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
    <aside className="w-64 bg-white border-r shadow-md h-screen sticky top-0 p-6">
      <h1 className="text-2xl font-bold mb-6">🥚 Eggshell</h1>
      <nav className="space-y-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'block rounded px-4 py-2 hover:bg-blue-100 transition',
              pathname === href ? 'bg-blue-500 text-white' : 'text-gray-700'
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
