'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

interface TutorialsHeaderProps {
  title: string;
  subtitle?: string;
  showIcon?: boolean;
}

export default function TutorialsHeader({ title, subtitle, showIcon = true }: TutorialsHeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-12">
        {/* Background decoration */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-[#0071F7]/20 to-[#FF8E08]/20 rounded-full filter blur-3xl" />
        
        <div className="relative z-10">
          {/* Icon and title row */}
          <div className="flex items-center gap-4 mb-4">
            {showIcon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative"
              >
                <div className="p-4 bg-gradient-to-br from-[#0071F7] to-[#FF8E08] rounded-2xl shadow-2xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-[#FF8E08]" />
              </motion.div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#D9D9D9] to-white bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>
          </div>
          
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-[#D9D9D9]/80 max-w-4xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 h-1 w-32 bg-gradient-to-r from-[#0071F7] to-[#FF8E08] rounded-full"
          />
        </div>
      </div>
    </motion.header>
  );
}