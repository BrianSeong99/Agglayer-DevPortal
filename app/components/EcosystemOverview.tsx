'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, ArrowUpRight, ExternalLink } from 'lucide-react';

const EcosystemOverview = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pessimistic Proofs",
      description: "Security without trust assumptions. Each chain is isolated, preventing cross-chain vulnerabilities.",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "State Transition Verification",
      description: "Cross-chain integrity through validity proofs and atomic transaction guarantees.",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Unified Bridge",
      description: "L1-L2, L2-L1, and L2-L2 transactions with bridge-and-call functionality.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    }
  ];

  const ecosystemStats = [
    { label: "Mainnet Chains", value: "8", environment: "mainnet", color: "text-green-400" },
    { label: "Cardona Testnet", value: "8", environment: "cardona", color: "text-orange-400" },
    { label: "Bali Testnet", value: "4", environment: "bali", color: "text-purple-400" },
  ];

  const officialResources = [
    { 
      name: "Interactive Visualizer", 
      url: "https://visualizer.agglayer.dev/", 
      description: "Explore how cross-chain interop works in 3D",
      isExternal: true 
    },
    { 
      name: "CDK Chain Builder", 
      url: "https://www.agglayer.dev/cdk", 
      description: "Deploy your L2 with OP Stack or Erigon",
      isExternal: true 
    },
    { 
      name: "Technical Documentation", 
      url: "https://docs.agglayer.dev/", 
      description: "Complete API references and guides",
      isExternal: true 
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            How Agglayer Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A unified cross-chain infrastructure that solves blockchain fragmentation through 
            innovative cryptographic proofs and seamless interoperability.
          </p>
        </motion.div>

        {/* Core Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${feature.borderColor} ${feature.bgColor} backdrop-blur-sm`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Ecosystem Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Live Ecosystem</h3>
            <p className="text-gray-300">Connected chains across multiple environments</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {ecosystemStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700"
              >
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Official Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Official Resources</h3>
            <p className="text-gray-300">Explore, learn, and build with official Agglayer tools</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {officialResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target={resource.isExternal ? "_blank" : undefined}
                rel={resource.isExternal ? "noopener noreferrer" : undefined}
                className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {resource.name}
                  </h4>
                  {resource.isExternal ? (
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  )}
                </div>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Developer Tools Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Start Building in 5 Minutes</h3>
            <p className="text-gray-300 text-lg">Get started with AggSandbox for local development</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-2"># Install AggSandbox</div>
            <div className="text-green-400 mb-4">git clone https://github.com/NethermindEth/agg-sandbox.git</div>
            <div className="text-green-400 mb-4">cd agg-sandbox && make install</div>
            <div className="text-gray-400 mb-2"># Start local environment</div>
            <div className="text-blue-400 mb-4">aggsandbox start --detach</div>
            <div className="text-gray-400 mb-2"># Your local cross-chain environment is ready! 🚀</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcosystemOverview;