'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-10 mb-10"
    >
      <h1 className="text-5xl font-bold text-white mb-3">{title}</h1>
      {subtitle && (
        <p className="text-[#D9D9D9]">{subtitle}</p>
      )}
    </motion.div>
  );
}
