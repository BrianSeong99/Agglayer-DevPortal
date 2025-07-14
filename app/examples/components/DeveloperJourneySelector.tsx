import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Smartphone, 
  Building, 
  Zap, 
  CheckCircle,
  Clock,
  Users,
  Code
} from 'lucide-react';

interface Journey {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  audience: string;
  timeToComplete: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
}

const journeys: Journey[] = [
  {
    id: 'beginner',
    title: 'Blockchain Newcomer',
    description: 'Learn cross-chain development fundamentals and Agglayer architecture',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    audience: 'New to blockchain development',
    timeToComplete: '1-2 weeks',
    difficulty: 'Beginner',
    topics: ['Cross-chain basics', 'Visualizer exploration', 'AggSandbox setup', 'First transaction']
  },
  {
    id: 'dapp-developer',
    title: 'dApp Developer',
    description: 'Build applications using existing chains with lxly.js SDK integration',
    icon: <Smartphone className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    audience: 'Experienced Web3 developers',
    timeToComplete: '2-3 days',
    difficulty: 'Intermediate',
    topics: ['lxly.js integration', 'Cross-chain dApps', 'Bridge patterns', 'Production deployment']
  },
  {
    id: 'chain-builder',
    title: 'Chain Builder',
    description: 'Deploy custom L2 chains connected to Agglayer using CDK',
    icon: <Building className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    audience: 'Infrastructure developers',
    timeToComplete: '4-8 weeks',
    difficulty: 'Advanced',
    topics: ['CDK deployment', 'OP Stack vs Erigon', 'Custom configurations', 'Mainnet launch']
  },
  {
    id: 'zk-developer',
    title: 'ZK Developer',
    description: 'Deep dive into Plonky3, pessimistic proofs, and custom ZK circuits',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    audience: 'Advanced cryptography enthusiasts',
    timeToComplete: '3-6 weeks',
    difficulty: 'Advanced',
    topics: ['Plonky3 circuits', 'Pessimistic proofs', 'State transitions', 'ZK benchmarking']
  }
];

interface DeveloperJourneySelectorProps {
  onJourneySelect: (journeyId: string) => void;
  selectedJourney: string | null;
}

const DeveloperJourneySelector: React.FC<DeveloperJourneySelectorProps> = ({
  onJourneySelect,
  selectedJourney
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Choose Your Developer Journey
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Select the path that best matches your experience and goals. 
            Each journey provides tailored content and progressive learning.
          </p>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {journeys.map((journey, index) => (
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedJourney === journey.id 
                  ? 'scale-105 ring-2 ring-blue-500/50' 
                  : 'hover:scale-102'
              }`}
              onClick={() => onJourneySelect(journey.id)}
            >
              <div className={`p-6 rounded-2xl border ${journey.borderColor} ${
                selectedJourney === journey.id 
                  ? journey.bgColor + ' border-opacity-60' 
                  : journey.bgColor + ' hover:border-opacity-50'
              } backdrop-blur-sm h-full`}>
                {/* Icon and Title */}
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${journey.color} text-white mb-3`}>
                    {journey.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{journey.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{journey.description}</p>
                </div>

                {/* Metadata */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{journey.audience}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{journey.timeToComplete}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(journey.difficulty)}`}>
                      {journey.difficulty}
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    You'll Learn
                  </h4>
                  <ul className="space-y-1">
                    {journey.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection indicator */}
                {selectedJourney === journey.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Journey Info */}
        {selectedJourney && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold text-white">
                {journeys.find(j => j.id === selectedJourney)?.title} Journey Selected
              </span>
            </div>
            <p className="text-gray-300">
              Perfect! The content below is now filtered to show tutorials and examples 
              relevant to your chosen path. You can change your selection anytime.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        {!selectedJourney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
              <Code className="w-4 h-4" />
              <span>Select a journey above to see personalized content</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeveloperJourneySelector;