'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Code, Layers } from 'lucide-react';

const DevPortalHero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      {/* Background gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0071F7]/20 via-[#FF8E08]/10 to-transparent" /> */}
      
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0071F7] via-[#FF8E08] to-[#0071F7] bg-clip-text text-transparent">
            The Unified Layer for Web3
          </h1>
          <p className="text-xl md:text-2xl text-[#D9D9D9] max-w-4xl mx-auto leading-relaxed">
            Agglayer connects all blockchain networks with unified liquidity, shared state, and seamless cross-chain experiences. 
            <span className="text-[#0071F7] font-medium"> Make cross-chain feel like the Internet.</span>
          </p>
        </motion.div>

        {/* Key value propositions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full bg-[#0071F7]/20 flex items-center justify-center">
                <Layers className="w-6 h-6 text-[#0071F7]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Unified Bridge</h3>
                <p className="text-[#D9D9D9]/80 text-sm">L1-L2, L2-L1, L2-L2 transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full bg-[#FF8E08]/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#FF8E08]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">20+ Chains</h3>
                <p className="text-[#D9D9D9]/80 text-sm">Mainnet, testnet environments</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-full bg-[#0071F7]/15 flex items-center justify-center">
                <Code className="w-6 h-6 text-[#0071F7]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Zero Trust</h3>
                <p className="text-[#D9D9D9]/80 text-sm">Pessimistic proofs & ZK security</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            href="/aggniverse"
            className="group bg-gradient-to-r from-[#0071F7] to-[#FF8E08] hover:from-[#0071F7]/90 hover:to-[#FF8E08]/90 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Chains
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/tutorials"
            className="group bg-[#000000]/80 hover:bg-[#000000]/90 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 border border-[#D9D9D9]/30 hover:border-[#D9D9D9]/50"
          >
            Learn & Tutorial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/developers"
            className="group bg-transparent hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 border border-[#D9D9D9]/40 hover:border-[#FFFFFF]/60"
          >
            Start Developing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[#D9D9D9]/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0071F7]">20+</div>
              <div className="text-sm text-[#D9D9D9]/80">Connected Chains</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF8E08]">Live</div>
              <div className="text-sm text-[#D9D9D9]/80">Cross-chain Bridge</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0071F7]">ZK</div>
              <div className="text-sm text-[#D9D9D9]/80">Security Proofs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF8E08]">5min</div>
              <div className="text-sm text-[#D9D9D9]/80">Setup Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevPortalHero;