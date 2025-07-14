import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Play, 
  Code, 
  BookOpen, 
  Shield, 
  Zap, 
  Globe, 
  Building,
  GitBranch,
  Cpu,
  Lock,
  Activity
} from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  icon: React.ReactNode;
  color: string;
  topics: string[];
  githubUrl?: string;
  visualizerUrl?: string;
  isInteractive?: boolean;
  journeys: string[]; // Which developer journeys this applies to
}

const tutorials: Tutorial[] = [
  // Understanding Agglayer Architecture
  {
    id: 'unified-bridge-deepdive',
    title: 'Unified Bridge Deep Dive',
    description: 'Comprehensive walkthrough of Agglayer\'s cross-chain bridge architecture',
    duration: '45 min',
    difficulty: 'Intermediate',
    category: 'Architecture',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
    topics: ['L1-L2 transactions', 'L2-L2 bridges', 'Merkle proofs', 'Exit trees', 'Bridge-and-call'],
    githubUrl: 'https://github.com/BrianSeong99/Agglayer_UnifiedBridge',
    journeys: ['beginner', 'dapp-developer', 'chain-builder']
  },
  {
    id: 'pessimistic-proofs-explained',
    title: 'Pessimistic Proofs Explained',
    description: 'Understanding Agglayer\'s security model and risk isolation mechanisms',
    duration: '30 min',
    difficulty: 'Advanced',
    category: 'Security',
    icon: <Shield className="w-5 h-5" />,
    color: 'from-red-500 to-orange-500',
    topics: ['Security boundaries', 'Risk isolation', 'zkVM benchmarks', 'Trust assumptions'],
    githubUrl: 'https://github.com/BrianSeong99/Agglayer_PessimisticProof_Benchmark',
    journeys: ['chain-builder', 'zk-developer']
  },
  {
    id: 'state-transition-proofs',
    title: 'State Transition Verification',
    description: 'How Agglayer ensures cross-chain integrity and atomic transactions',
    duration: '25 min',
    difficulty: 'Advanced',
    category: 'ZK Technology',
    icon: <Activity className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-500',
    topics: ['Validity proofs', 'Cross-chain verification', 'ECDSA vs Generic', 'Atomic transactions'],
    githubUrl: 'https://github.com/BrianSeong99/Agglayer_StateTransitionProof',
    journeys: ['zk-developer', 'chain-builder']
  },
  {
    id: 'visualizer-exploration',
    title: 'Interactive Agglayer Visualizer',
    description: 'Explore cross-chain interop in 3D with the official visualizer',
    duration: '20 min',
    difficulty: 'Beginner',
    category: 'Interactive',
    icon: <Play className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-500',
    topics: ['Cross-chain transactions', 'Merkle trees', 'Exit roots', 'Data propagation'],
    visualizerUrl: 'https://visualizer.agglayer.dev/',
    isInteractive: true,
    journeys: ['beginner']
  },

  // Plonky3 ZK Development
  {
    id: 'plonky3-fibonacci',
    title: 'Plonky3 Fibonacci Tutorial',
    description: 'Learn ZK proof development with a simple Fibonacci sequence example',
    duration: '40 min',
    difficulty: 'Intermediate',
    category: 'ZK Development',
    icon: <Cpu className="w-5 h-5" />,
    color: 'from-yellow-500 to-amber-500',
    topics: ['AIR constraints', 'Execution traces', 'Proof generation', 'Verification'],
    githubUrl: 'https://github.com/BrianSeong99/Plonky3_Fibonacci',
    journeys: ['zk-developer']
  },
  {
    id: 'plonky3-range-check',
    title: 'ZK Range Checking with Plonky3',
    description: 'Privacy-preserving value validation using zero-knowledge range proofs',
    duration: '35 min',
    difficulty: 'Advanced',
    category: 'ZK Development',
    icon: <Lock className="w-5 h-5" />,
    color: 'from-indigo-500 to-purple-500',
    topics: ['Range constraints', 'Bit decomposition', 'Privacy proofs', 'Multiple fields'],
    githubUrl: 'https://github.com/BrianSeong99/Plonky3_RangeCheck',
    journeys: ['zk-developer']
  },

  // Development Tools
  {
    id: 'aggsandbox-setup',
    title: '5-Minute AggSandbox Setup',
    description: 'Get your local cross-chain development environment running',
    duration: '15 min',
    difficulty: 'Beginner',
    category: 'Development Tools',
    icon: <Code className="w-5 h-5" />,
    color: 'from-green-500 to-blue-500',
    topics: ['Local installation', 'Multi-L2 mode', 'Fork testing', 'CLI commands'],
    githubUrl: 'https://github.com/NethermindEth/agg-sandbox',
    journeys: ['beginner', 'dapp-developer', 'chain-builder']
  },
  {
    id: 'lxlyjs-integration',
    title: 'lxly.js SDK Integration',
    description: 'Add cross-chain functionality to your dApp with the JavaScript SDK',
    duration: '30 min',
    difficulty: 'Intermediate',
    category: 'Development Tools',
    icon: <GitBranch className="w-5 h-5" />,
    color: 'from-blue-500 to-purple-500',
    topics: ['SDK installation', 'Cross-chain transfers', 'Custom contracts', 'Error handling'],
    githubUrl: 'https://github.com/0xPolygon/lxly.js',
    journeys: ['dapp-developer']
  },

  // Chain Development
  {
    id: 'cdk-opstack-deployment',
    title: 'CDK OP Stack Chain Deployment',
    description: 'Deploy your L2 chain using the familiar OP Stack with ZK enhancements',
    duration: '60 min',
    difficulty: 'Advanced',
    category: 'Chain Development',
    icon: <Building className="w-5 h-5" />,
    color: 'from-orange-500 to-red-500',
    topics: ['OP Stack setup', 'Agglayer integration', 'Testnet deployment', 'Mainnet preparation'],
    journeys: ['chain-builder']
  },
  {
    id: 'cdk-erigon-customization',
    title: 'CDK Erigon Advanced Configuration',
    description: 'Maximum customization with native gas tokens and flexible rollup modes',
    duration: '75 min',
    difficulty: 'Advanced',
    category: 'Chain Development',
    icon: <Zap className="w-5 h-5" />,
    color: 'from-purple-500 to-indigo-500',
    topics: ['Custom gas tokens', 'Rollup modes', 'Enterprise features', 'Performance tuning'],
    journeys: ['chain-builder']
  }
];

interface TechnicalTutorialsProps {
  selectedJourney: string | null;
}

const TechnicalTutorials: React.FC<TechnicalTutorialsProps> = ({ selectedJourney }) => {
  const filteredTutorials = selectedJourney 
    ? tutorials.filter(tutorial => tutorial.journeys.includes(selectedJourney))
    : tutorials;

  const categories = Array.from(new Set(filteredTutorials.map(t => t.category)));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  if (filteredTutorials.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No tutorials found</h3>
        <p className="text-gray-400">Select a developer journey above to see relevant content.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {categories.map((category, categoryIndex) => {
          const categoryTutorials = filteredTutorials.filter(t => t.category === category);
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>

              {/* Tutorials Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {categoryTutorials.map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="group bg-gray-800/30 border border-gray-700 rounded-xl p-6 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${tutorial.color} text-white`}>
                          {tutorial.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {tutorial.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-400">{tutorial.duration}</span>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(tutorial.difficulty)}`}>
                              {tutorial.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {tutorial.isInteractive && (
                        <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md border border-green-500/30">
                          Interactive
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{tutorial.description}</p>

                    {/* Topics */}
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Topics Covered
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {tutorial.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {tutorial.githubUrl && (
                        <a
                          href={tutorial.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <Code className="w-4 h-4" />
                          View Code
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      
                      {tutorial.visualizerUrl && (
                        <a
                          href={tutorial.visualizerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <Play className="w-4 h-4" />
                          Try Interactive
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Ready to Build?
          </h3>
          <p className="text-gray-300 mb-4">
            Head to the Developers portal for interactive tools and live development resources.
          </p>
          <a
            href="/developers"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Code className="w-5 h-5" />
            Start Developing
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default TechnicalTutorials;