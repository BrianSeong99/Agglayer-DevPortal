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
    <aside className="m-6 rounded-2xl bg-white shadow-2xl w-64 h-[90vh] flex flex-col p-8">
      <h1 className="text-2xl font-bold mb-8 text-black">🥚 Eggshell</h1>
      <nav className="space-y-3 flex-1">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'block rounded px-4 py-2 transition font-medium',
              pathname === href
                ? 'bg-yellow-300 text-black shadow'
                : 'text-black hover:bg-yellow-200'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-8">
        <ConnectWallet />
      </div>
    </aside>
  )
}
