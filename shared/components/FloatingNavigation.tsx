'use client'

import React from "react";
import { FloatingDock } from "@/shared/components/ui/floating-dock";
import { usePathname } from 'next/navigation';
import {
  IconApps,
  IconCode,
  IconBrandX,
  IconBrandGithub,
  IconUniverse,
  IconScript,
  IconHome,
  IconTool
} from "@tabler/icons-react";

export default function FloatingNavigation() {
  const pathname = usePathname();

  const links = [
    {
      title: "Home",
      icon: (isActive: boolean) => (
        <IconHome className={isActive ? "h-full w-full text-black dark:text-black" : "h-full w-full text-neutral-500 dark:text-neutral-300"} />
      ),
      href: "/",
    },
    {
      title: "Aggniverse",
      icon: (isActive: boolean) => (
        <IconUniverse className={isActive ? "h-full w-full text-black dark:text-black" : "h-full w-full text-neutral-500 dark:text-neutral-300"} />
      ),
      href: "/aggniverse",
    },
    {
      title: "Examples",
      icon: (isActive: boolean) => (
        <IconApps className={isActive ? "h-full w-full text-black dark:text-black" : "h-full w-full text-neutral-500 dark:text-neutral-300"} />
      ),
      href: "/examples",
    },
    {
      title: "Tools",
      icon: (isActive: boolean) => (
        <IconTool className={isActive ? "h-full w-full text-black dark:text-black" : "h-full w-full text-neutral-500 dark:text-neutral-300"} />
      ),
      href: "/tools",
    },
    { type: 'divider' as const },
    {
      title: "Twitter",
      icon: () => (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/Agglayer",
      target: "_blank" as const,
    },
    {
      title: "GitHub",
      icon: () => (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/agglayer",
      target: "_blank" as const,
    },
    {
      title: "Docs",
      icon: () => (
        <IconScript className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://docs.agglayer.dev/",
      target: "_blank" as const,
    }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock
        items={links}
        activePath={pathname}
        desktopClassName="bg-[var(--bg-sidebar)] border border-[var(--border-card)] shadow-[var(--shadow-card)]"
        mobileClassName="bg-[var(--bg-sidebar)] border border-[var(--border-card)] shadow-[var(--shadow-card)]"
      />
    </div>
  );
} 