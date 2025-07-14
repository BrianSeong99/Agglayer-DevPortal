'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function TutorialsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black relative">
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}