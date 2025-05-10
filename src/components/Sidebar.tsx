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
    <aside className="rounded-2xl bg-white shadow-2xl w-64 h-full flex flex-col p-8">
      <h1 className="text-2xl font-bold mb-8 text-black">🥚 EggShell</h1>
      <nav className="space-y-3 flex-1">
        {links.map(({ href, label }) => {
          const isActive =
            href === '/dashboard/dapps'
              ? pathname.startsWith('/dashboard/dapps')
              : pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'block rounded px-4 py-2 transition font-medium',
                isActive
                  ? 'bg-yellow-300 text-black shadow'
                  : 'text-black hover:bg-yellow-200'
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-8">
        <ConnectWallet />
      </div>
    </aside>
  )
}
