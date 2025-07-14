'use client'

import { cn } from "@/shared/utils/cn";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from 'next/link';

import { useRef, useState } from "react";

type DockItem = 
  | { title: string; icon: (isActive: boolean) => React.ReactNode; href: string; type?: 'link'; target?: '_blank' | '_self' }
  | { type: 'divider' | 'external'; icon?: React.ReactNode; title?: string; href?: string; target?: '_blank' | '_self' };

export const FloatingDock = ({
  items,
  activePath,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  activePath?: string;
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} activePath={activePath} className={desktopClassName} />
      <FloatingDockMobile items={items} activePath={activePath} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  activePath,
  className,
}: {
  items: DockItem[];
  activePath?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block sm:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              if (item.type === 'divider') {
                return (
                  <motion.div
                    key={`divider-${idx}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="h-px bg-gray-300 dark:bg-neutral-700 mx-2"
                  />
                );
              }
              
              const isExternal = item.target === '_blank' || (item.href && item.href.startsWith('http'));
              const isActive = activePath === item.href;
              
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  {isExternal ? (
                    <a
                      href={item.href}
                      target={item.target || '_self'}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                        isActive 
                          ? "bg-white dark:bg-white" 
                          : "bg-gray-50 dark:bg-neutral-900"
                      )}
                    >
                      <div className="h-4 w-4">
                        {typeof item.icon === 'function' ? item.icon(isActive) : item.icon}
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                        isActive 
                          ? "bg-white dark:bg-white" 
                          : "bg-gray-50 dark:bg-neutral-900"
                      )}
                    >
                      <div className="h-4 w-4">
                        {typeof item.icon === 'function' ? item.icon(isActive) : item.icon}
                      </div>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  activePath,
  className,
}: {
  items: DockItem[];
  activePath?: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 sm:flex dark:bg-neutral-900",
        className,
      )}
    >
      {items.map((item, idx) => {
        if (item.type === 'divider') {
          return (
            <motion.div
              key={`divider-${idx}`}
              className="h-8 w-px bg-gray-300 dark:bg-neutral-700"
            />
          );
        }
        if ('title' in item && 'href' in item && item.title && item.href) {
          const { title, icon, href, target } = item;
          return (
            <IconContainer 
              mouseX={mouseX} 
              key={title} 
              title={title}
              icon={icon}
              href={href}
              target={target}
              isActive={activePath === href}
            />
          );
        }
        return null;
      })}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  target,
  isActive,
}: {
  mouseX: MotionValue;
  title: string;
  icon: ((isActive: boolean) => React.ReactNode) | React.ReactNode;
  href: string;
  target?: '_blank' | '_self';
  isActive?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const isExternal = target === '_blank' || href.startsWith('http');

  return (
    <>
      {isExternal ? (
        <a 
          href={href}
          target={target || '_self'}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-full cursor-pointer transition-colors",
              isActive 
                ? "bg-white dark:bg-white" 
                : "bg-gray-200 dark:bg-neutral-800"
            )}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17 
            }}
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
                >
                  {title}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {typeof icon === 'function' ? icon(!!isActive) : icon}
            </motion.div>
          </motion.div>
        </a>
      ) : (
        <Link href={href}>
          <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-full cursor-pointer transition-colors",
              isActive 
                ? "bg-white dark:bg-white" 
                : "bg-gray-200 dark:bg-neutral-800"
            )}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17 
            }}
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
                >
                  {title}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {typeof icon === 'function' ? icon(!!isActive) : icon}
            </motion.div>
          </motion.div>
        </Link>
      )}
    </>
  );
} 