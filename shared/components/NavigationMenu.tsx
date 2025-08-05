'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function ShadcnNavigationMenu() {
  const pathname = usePathname();

  const mainLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Universe", 
      href: "/aggniverse",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Tools",
      href: "/tools",
    },
    {
      title: "Social",
      href: "#",
    },
  ];

  return (
    <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-gray-50 rounded-round pl-1 pr-0 py-0 flex items-center justify-start h-[38px]">
        {/* Logo */}
        <Link href="/" className="shrink-0 h-[30px] w-[91.367px] ml-1">
          <svg width="92" height="30" viewBox="0 0 92 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="group cursor-pointer">
              {/* Icon background */}
              <rect x="10" y="6" width="18" height="18" rx="4" fill="#000000"/>
              
              {/* Letter A */}
              <text x="19" y="19" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="600" fontFamily="Inter">
                A
              </text>
              
              {/* Text */}
              <text x="36" y="19" fill="#000000" fontSize="13" fontFamily="Inter" fontWeight="500" className="group-hover:fill-primary transition-colors">
                Agglayer
              </text>
            </g>
          </svg>
        </Link>
        
        {/* Navigation Items */}
        <div className="flex items-center h-full">
          <div className="flex flex-row gap-1.5 p-1 h-full items-center">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href === '/aggniverse' && pathname === '/aggniverse');
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    inline-flex items-center justify-center h-[30px]
                    px-[15px] py-2 rounded-pill text-xs font-medium leading-tight
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-gray-50' 
                      : 'text-gray-500 hover:bg-gray-50'
                    }
                  `}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}