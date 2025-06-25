'use client'

import React from "react";
import { FloatingDock } from "@/shared/components/ui/floating-dock";
import { usePathname } from 'next/navigation';
import {
  IconHome,
  IconApps,
  IconCode,
  IconBrandX,
  IconBrandGithub,
  IconSun,
  IconUniverse,
  IconScript
} from "@tabler/icons-react";

export default function FloatingNavigation() {
  const pathname = usePathname();

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Aggniverse",
      icon: (
        <IconUniverse className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard/aggniverse",
    },
    {
      title: "Examples",
      icon: (
        <IconApps className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard/examples",
    },
    {
      title: "Developers",
      icon: (
        <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard/developers",
    },
    { type: 'divider' as const },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/Agglayer",
      target: "_blank" as const,
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/agglayer",
      target: "_blank" as const,
    },
    {
      title: "Docs",
      icon: (
        <IconScript className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://docs.agglayer.dev/",
      target: "_blank" as const,
    },
    { type: 'divider' as const },
    {
      title: "Theme",
      icon: (
        <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard/theme",
    }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock
        items={links}
        desktopClassName="bg-[var(--bg-sidebar)] border border-[var(--border-card)] shadow-[var(--shadow-card)]"
        mobileClassName="bg-[var(--bg-sidebar)] border border-[var(--border-card)] shadow-[var(--shadow-card)]"
      />
    </div>
  );
} 