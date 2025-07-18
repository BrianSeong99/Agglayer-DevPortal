'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  IconApps,
  IconBrandX,
  IconBrandGithub,
  IconUniverse,
  IconScript,
  IconHome,
  IconTool
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ShadcnNavigationMenu() {
  const pathname = usePathname();

  const mainLinks = [
    {
      title: "Home",
      icon: IconHome,
      href: "/",
      description: "Welcome to Agglayer Developer Portal"
    },
    {
      title: "Aggniverse",
      icon: IconUniverse,
      href: "/aggniverse",
      description: "Explore 20+ connected chains"
    },
    {
      title: "Examples",
      icon: IconApps,
      href: "/examples",
      description: "Templates, tutorials & code examples"
    },
    {
      title: "Tools",
      icon: IconTool,
      href: "/tools",
      description: "Developer tools and resources"
    },
  ];

  const externalLinks = [
    {
      title: "Twitter",
      icon: IconBrandX,
      href: "https://x.com/Agglayer",
    },
    {
      title: "GitHub",
      icon: IconBrandGithub,
      href: "https://github.com/agglayer",
    },
    {
      title: "Docs",
      icon: IconScript,
      href: "https://docs.agglayer.dev/",
    }
  ];

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Button
              key={link.href}
              asChild
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full gap-2 transition-all duration-200",
                isActive ? "bg-[#0071F7] text-white shadow-sm" : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <Link href={link.href}>
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{link.title}</span>
              </Link>
            </Button>
          );
        })}
        
        <Separator orientation="vertical" className="h-6 mx-1 bg-white/20" />
        
        {externalLinks.map((link) => {
          const Icon = link.icon;
          
          return (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full gap-2 text-white/60 hover:text-white hover:bg-white/10"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{link.title}</span>
              </a>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}