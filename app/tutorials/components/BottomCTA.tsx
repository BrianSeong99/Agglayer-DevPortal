"use client";
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';

export default function BottomCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0071F7]/20 via-white/10 to-[#0071F7]/20 backdrop-blur-sm border border-[#0071F7]/20"
    >
      <div className="relative z-10 p-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to Build on Agglayer?
        </h3>
        <p className="text-lg text-[#D9D9D9]/80 mb-8 max-w-2xl mx-auto">
          Access interactive development tools, live environments, and comprehensive documentation to bring your cross-chain vision to life.
        </p>
        <a
          href="/developers"
          className="inline-flex items-center gap-3 bg-[#0071F7] hover:bg-[#0071F7]/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Code className="w-6 h-6" />
          Launch Developer Dashboard
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0071F7] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
      </div>
    </motion.div>
  );
}