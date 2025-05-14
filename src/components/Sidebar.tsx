'use client'

import Link from 'next/link'
import ConnectWallet from './ConnectWallet'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon, FaCode, FaThLarge, FaLink, FaHome } from 'react-icons/fa'

const links = [
  { href: '/', label: 'Home', icon: <FaHome className="w-5 h-5 mr-3" /> },
  { href: '/dashboard/chains', label: 'Chains', icon: <FaLink className="w-5 h-5 mr-3" /> },
  { href: '/dashboard/examples', label: 'Examples', icon: <FaThLarge className="w-5 h-5 mr-3" /> },
  { href: '/dashboard/developers', label: 'Developers', icon: <FaCode className="w-5 h-5 mr-3" /> },
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
      style={{ background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)' }}
    >
      <div className="flex items-center mb-8">
        <span className="relative w-8 h-8 mr-2">
          <img
            src={isDark ? "/AggShell-Night.png" : "/AggShell-Day.png"}
            alt="AggShell Logo"
            className="w-8 h-8"
          />
        </span>
        <span className="text-2xl font-bold" style={{ color: 'var(--text-sidebar)' }}>AggShell</span>
      </div>
      <nav className="space-y-3 flex-1">
        {links.map(({ href, label, icon }) => {
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
                color: isActive ? 'var(--link-active-text)' : 'var(--text-sidebar)'
              }}
              className={clsx(
                'flex items-center rounded-full px-6 py-3 font-semibold text-lg transition text-left',
                isActive
                  ? 'bg-[var(--link-active-bg)]'
                  : 'hover:bg-[var(--link-hover-bg)]'
              )}
            >
              {icon}
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
