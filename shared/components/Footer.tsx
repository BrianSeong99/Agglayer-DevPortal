'use client';

import Link from 'next/link';
import { IconBrandX, IconBrandDiscord } from '@tabler/icons-react';

export default function Footer() {
  const footerLinks = {
    explore: [
      { label: 'Docs', href: 'https://docs.agglayer.dev/', external: true },
      { label: 'Blog', href: 'https://www.agglayer.dev/blog', external: true },
      { label: 'Ecosystem', href: 'https://www.agglayer.dev/ecosystem-index', external: true },
      { label: 'Join Us', href: 'https://info.polygon.technology/agglayer-intake-form', external: true },
    ],
  };

  return (
    <footer className="bg-gray-150 mt-24">
      <div className="max-w-narrow mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <svg width="100" height="22" viewBox="0 0 100 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 0L21 6.0625V17.9375L10.5 24L0 17.9375V6.0625L10.5 0Z" fill="#0071F7"/>
                <path d="M10.5 8L16 11.0312V16.4688L10.5 19.5L5 16.4688V11.0312L10.5 8Z" fill="white"/>
              </svg>
            </Link>
          </div>

          {/* Links and Newsletter */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Explore Links */}
            <div>
              <h4 className="font-bold text-xs text-black mb-2.5">Explore</h4>
              <ul className="space-y-0">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-xs text-tertiary leading-loose hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h4 className="font-bold text-xs text-black mb-2.5">Stay updated</h4>
              <div className="bg-white border border-border-light rounded-[40.289px] h-[28.476px] w-[195px] px-[18.75px] flex items-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent outline-none font-medium text-xs text-quaternary placeholder:text-quaternary"
                />
              </div>
            </div>

            {/* Follow */}
            <div>
              <h4 className="font-bold text-xs text-black mb-2.5">Follow our journey</h4>
              <div className="flex gap-2">
                <a
                  href="https://twitter.com/agglayer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary transition-colors"
                >
                  <IconBrandX className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/agglayer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary transition-colors"
                >
                  <IconBrandDiscord className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}