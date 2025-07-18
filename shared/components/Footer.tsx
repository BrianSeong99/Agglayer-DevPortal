'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    developers: [
      { label: 'Documentation', href: 'https://docs.agglayer.dev', external: true },
      { label: 'GitHub', href: 'https://github.com/0xPolygon', external: true },
      { label: 'Visualizer', href: 'https://visualizer.agglayer.dev/', external: true },
      { label: 'Tools', href: '/tools' },
      { label: 'Examples', href: '/examples' },
      { label: 'AggNiverse', href: '/aggniverse' },
      { label: 'Tutorials', href: '/examples?tab=tutorials' },
    ],
    community: [
      { label: 'Discord', href: 'https://discord.gg/agglayer', external: true },
      { label: 'Twitter', href: 'https://twitter.com/agglayer', external: true },
      { label: 'Blog', href: 'https://www.agglayer.dev/blog', external: true },
      { label: 'Forum', href: 'https://forum.agglayer.dev', external: true },
    ],
    resources: [
      { label: 'Whitepaper', href: 'https://docs.agglayer.dev/whitepaper', external: true },
      { label: 'Roadmap', href: 'https://www.agglayer.dev/roadmap', external: true },
      { label: 'FAQ', href: 'https://docs.agglayer.dev/faq', external: true },
      { label: 'Support', href: 'https://support.agglayer.dev', external: true },
    ],
  };

  return (
    <footer className="bg-black/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Agglayer</h3>
            <p className="text-sm text-[#D9D9D9]/80">
              Unified cross-chain infrastructure for the future of Web3
            </p>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Developers</h4>
            <ul className="space-y-2">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#D9D9D9]/80 hover:text-[#0071F7] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[#D9D9D9]/80 hover:text-[#0071F7] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#D9D9D9]/80 hover:text-[#0071F7] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#D9D9D9]/80 hover:text-[#0071F7] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#D9D9D9]/60">
              © {currentYear} Agglayer. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://docs.agglayer.dev/privacy"
                className="text-sm text-[#D9D9D9]/60 hover:text-[#0071F7] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://docs.agglayer.dev/terms"
                className="text-sm text-[#D9D9D9]/60 hover:text-[#0071F7] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}