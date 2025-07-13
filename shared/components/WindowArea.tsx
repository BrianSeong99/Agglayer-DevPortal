"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const DOCK_HEIGHT = 80; // px, keep in sync with layout

export default function WindowArea({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      {pathname !== "/aggniverse" && (
        <motion.div
          key="window-area"
          className="relative z-10 flex justify-center items-center w-full p-4"
          style={{ height: `calc(100vh - ${DOCK_HEIGHT}px)` }}
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
          <div className="w-full h-full border border-gray-700 rounded-2xl bg-black/30 backdrop-blur-xs flex items-center justify-center overflow-hidden">
            <motion.main
              key={pathname}
              className="w-full h-full flex items-center justify-center"
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
      )}
    </AnimatePresence>
  );
} 