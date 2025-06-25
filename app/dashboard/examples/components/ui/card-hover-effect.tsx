"use client";

import { cn } from "@/shared/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "./minimal-card";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Get the bounding rect of the hovered card
  const getHighlightStyle = () => {
    if (
      hoveredIndex === null ||
      !cardRefs.current[hoveredIndex]
    ) {
      return { opacity: 0, pointerEvents: 'none' as const };
    }
    const rect = cardRefs.current[hoveredIndex]!.getBoundingClientRect();
    const parentRect = cardRefs.current[hoveredIndex]!.parentElement!.getBoundingClientRect();
    return {
      position: "absolute" as const,
      top: rect.top - parentRect.top,
      left: rect.left - parentRect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: "24px",
      zIndex: 0,
      opacity: 1,
      pointerEvents: 'none' as const,
    };
  };

  return (
    <div
      className={cn(
        "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-[1100px]",
        className
      )}
      style={{ position: "relative" }}
    >
      {/* Shared hover highlight */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.span
            key="hover-bg"
            className="bg-neutral-800/80 dark:bg-neutral-900/80 block absolute"
            style={getHighlightStyle()}
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      {items.map((item, idx) => (
        <a
          ref={el => { cardRefs.current[idx] = el || null; }}
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative z-10">
            <MinimalCard className="w-[340px] h-[280px] flex flex-col">
              {item.image && (
                <MinimalCardImage src={item.image} alt={item.title} className="h-[160px]" />
              )}
              <MinimalCardTitle>{item.title}</MinimalCardTitle>
              <MinimalCardDescription>
                {item.description}
              </MinimalCardDescription>
            </MinimalCard>
          </div>
        </a>
      ))}
    </div>
  );
}; 