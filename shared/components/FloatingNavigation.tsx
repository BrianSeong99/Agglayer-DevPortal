'use client'

import React from "react";
import { FloatingDock } from "@/shared/components/ui/floating-dock";
import { usePathname } from 'next/navigation';
import {
  IconHome,
  IconLink,
  IconApps,
  IconCode,
  IconBrandGithub,
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
      title: "Chains",
      icon: (
        <IconLink className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard/chains",
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