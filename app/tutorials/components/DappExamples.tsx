"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import { dapps } from '@/app/tutorials/data/dapps';

export default function DappExamples() {
  // Convert dapps object to array for rendering
  const dappItems = Object.entries(dapps).map(([slug, dapp]) => ({
    slug,
    ...dapp,
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Example dApps</h2>
          <p className="text-[#D9D9D9]/80">Production-ready applications built on Agglayer</p>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#D9D9D9]/20 to-transparent ml-8" />
      </div>

      {/* dApps Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {dappItems.map((dapp, index) => (
          <motion.a
            key={dapp.slug}
            href={`/tutorials/${dapp.slug}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#0071F7]/50 transition-all duration-300 cursor-pointer"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                {dapp.logo && (
                  <img 
                    src={dapp.logo} 
                    alt={dapp.name} 
                    className="w-16 h-16 rounded-xl shadow-lg" 
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#0071F7] transition-colors">
                    {dapp.name}
                  </h3>
                  <p className="text-[#D9D9D9]/70 leading-relaxed">
                    {dapp.tagline}
                  </p>
                </div>
              </div>

              {/* Bullets */}
              {dapp.bullets && dapp.bullets.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {dapp.bullets.slice(0, 4).map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0071F7]" />
                      <span className="text-sm text-[#D9D9D9]/60">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2 text-[#0071F7] font-medium">
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                {dapp.repoUrl && (
                  <div className="flex items-center gap-2 text-sm text-[#D9D9D9]/50">
                    <Code className="w-4 h-4" />
                    <span>Open Source</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0071F7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}