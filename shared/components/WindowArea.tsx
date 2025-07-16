"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_HEIGHT = 80; // px, height for navigation bar spacing

export default function WindowArea({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages that should have window styling (none for now, but can add specific pages if needed)
  const windowStyledPages: string[] = [];
  
  // For pages without window styling, render children with minimal wrapper
  if (!windowStyledPages.includes(pathname)) {
    return (
      <main className="min-h-screen w-full" style={{ paddingTop: `${NAV_HEIGHT}px` }}>
        {children}
      </main>
    );
  }
  
  // For window-styled pages (currently none)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="window-area"
        className="relative z-10 flex justify-center items-center w-full p-4"
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px)`, marginTop: `${NAV_HEIGHT}px` }}
        initial={{ 
          opacity: 0, 
          y: 50,
          scale: 0.95
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1
        }}
        exit={{ 
          opacity: 0, 
          y: 50,
          scale: 0.95
        }}
        transition={{ 
          duration: 0.4, 
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full border border-gray-700 rounded-2xl bg-black/30 backdrop-blur-xs overflow-auto">
          <motion.main
            key={pathname}
            className="w-full h-full"
            initial={{ 
              opacity: 0, 
              x: 50,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              x: -50,
              scale: 0.95
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut"
            }}
          >
            {children}
          </motion.main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 