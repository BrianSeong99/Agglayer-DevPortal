'use client'

import Link from 'next/link'
import ConnectWallet from './ConnectWallet'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

const links = [
  { href: '/dashboard/wallet', label: 'Wallet' },
  { href: '/dashboard/dapps', label: 'dApps' },
  { href: '/dashboard/chains', label: 'Chains' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <aside
      className="rounded-2xl shadow-2xl w-64 h-full flex flex-col p-8"
      style={{ background: 'var(--sidebar-bg)', color: 'var(--sidebar-text)' }}
    >
      <div className="flex items-center mb-8">
        <img src="/AggShell.png" alt="AggShell Logo" className="w-8 h-8 mr-2" />
        <span className="text-2xl font-bold" style={{ color: 'var(--sidebar-text)' }}>AggShell</span>
      </div>
      <nav className="space-y-3 flex-1">
        {links.map(({ href, label }) => {
          const isActive =
            href === '/dashboard/dapps'
              ? pathname && pathname.startsWith('/dashboard/dapps')
              : pathname === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                background: isActive ? 'var(--link-active-bg)' : 'transparent',
                color: isActive ? 'var(--link-active-text)' : 'var(--sidebar-text)'
              }}
              className={clsx(
                'block rounded-full px-6 py-3 font-semibold text-lg transition text-left',
                isActive
                  ? 'bg-[var(--link-active-bg)]'
                  : 'hover:bg-[var(--link-hover-bg)]'
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-8">
        <button
          onClick={() => setIsDark((d) => !d)}
          style={{ background: 'var(--button-bg)', color: 'var(--button-text)' }}
          className="mb-6 w-10 h-10 rounded-full font-medium shadow hover:bg-[var(--button-hover-bg)] transition flex items-center justify-center mx-auto"
          aria-label={isDark ? 'Switch to daylight mode' : 'Switch to night mode'}
        >
          {isDark ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5"/>}
        </button>
        <ConnectWallet />
      </div>
    </aside>
  )
}
