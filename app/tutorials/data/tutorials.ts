export interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  icon: string; // Changed from React.ReactNode to string for data file
  color: string;
  topics: string[];
  githubUrl?: string;
  visualizerUrl?: string;
  isInteractive?: boolean;
}

export const tutorials: Tutorial[] = [
  // Understanding Agglayer Architecture
  {
    id: 'unified-bridge-deepdive',
    title: 'Unified Bridge Deep Dive',
    description: 'Comprehensive walkthrough of Agglayer\'s cross-chain bridge architecture',
    duration: '45 min',
    difficulty: 'Intermediate',
    category: 'Agglayer Deep Dive',
    icon: 'Globe',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['L1-L2 transactions', 'L2-L2 bridges', 'Merkle proofs', 'Exit trees', 'Bridge-and-call'],
    githubUrl: 'https://github.com/BrianSeong99/Agglayer_UnifiedBridge',
  },
  {
    id: 'pessimistic-proofs-explained',
    title: 'Pessimistic Proofs Explained',
    description: 'Understanding Agglayer\'s security model and risk isolation mechanisms',
    duration: '30 min',
    difficulty: 'Advanced',
    category: 'Agglayer Deep Dive',
    icon: 'Shield',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['Security boundaries', 'Risk isolation', 'zkVM benchmarks', 'Trust assumptions'],
    githubUrl: 'https://github.com/BrianSeong99/Agglayer_PessimisticProof_Benchmark',
  },
  {
    id: 'state-transition-proofs',
    title: 'State Transition Verification',
    description: 'How Agglayer ensures cross-chain integrity and atomic transactions',
    duration: '25 min',
    difficulty: 'Advanced',
    category: 'Agglayer Deep Dive',
    icon: 'Activity',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['Validity proofs', 'Cross-chain verification', 'ECDSA vs Generic', 'Atomic transactions'],
    githubUrl: 'https://github.com/BrianSeong99/Agglayer_StateTransitionProof',
  },
  {
    id: 'visualizer-exploration',
    title: 'Interactive Agglayer Visualizer',
    description: 'Explore cross-chain interop in 3D with the official visualizer',
    duration: '20 min',
    difficulty: 'Beginner',
    category: 'Agglayer Deep Dive',
    icon: 'Play',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['Cross-chain transactions', 'Merkle trees', 'Exit roots', 'Data propagation'],
    visualizerUrl: 'https://visualizer.agglayer.dev/',
    isInteractive: true,
  },

  // Plonky3 ZK Development
  {
    id: 'plonky3-fibonacci',
    title: 'Plonky3 Fibonacci Tutorial',
    description: 'Learn ZK proof development with a simple Fibonacci sequence example',
    duration: '40 min',
    difficulty: 'Intermediate',
    category: 'ZK Development',
    icon: 'Cpu',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['AIR constraints', 'Execution traces', 'Proof generation', 'Verification'],
    githubUrl: 'https://github.com/BrianSeong99/Plonky3_Fibonacci',
  },
  {
    id: 'plonky3-range-check',
    title: 'ZK Range Checking with Plonky3',
    description: 'Privacy-preserving value validation using zero-knowledge range proofs',
    duration: '35 min',
    difficulty: 'Advanced',
    category: 'ZK Development',
    icon: 'Lock',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['Range constraints', 'Bit decomposition', 'Privacy proofs', 'Multiple fields'],
    githubUrl: 'https://github.com/BrianSeong99/Plonky3_RangeCheck',
  },

  // Development Tools
  {
    id: 'aggsandbox-setup',
    title: '5-Minute AggSandbox Setup',
    description: 'Get your local cross-chain development environment running',
    duration: '15 min',
    difficulty: 'Beginner',
    category: 'Development Tools',
    icon: 'Code',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['Local installation', 'Multi-L2 mode', 'Fork testing', 'CLI commands'],
    githubUrl: 'https://github.com/NethermindEth/agg-sandbox',
  },
  {
    id: 'lxlyjs-integration',
    title: 'lxly.js SDK Integration',
    description: 'Add cross-chain functionality to your dApp with the JavaScript SDK',
    duration: '30 min',
    difficulty: 'Intermediate',
    category: 'Development Tools',
    icon: 'GitBranch',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['SDK installation', 'Cross-chain transfers', 'Custom contracts', 'Error handling'],
    githubUrl: 'https://github.com/0xPolygon/lxly.js',
  },

  // Chain Development
  {
    id: 'cdk-opstack-deployment',
    title: 'CDK OP Stack Chain Deployment',
    description: 'Deploy your L2 chain using the familiar OP Stack with ZK enhancements',
    duration: '60 min',
    difficulty: 'Advanced',
    category: 'Chain Development',
    icon: 'Building',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['OP Stack setup', 'Agglayer integration', 'Testnet deployment', 'Mainnet preparation'],
  },
  {
    id: 'cdk-erigon-customization',
    title: 'CDK Erigon Advanced Configuration',
    description: 'Maximum customization with native gas tokens and flexible rollup modes',
    duration: '75 min',
    difficulty: 'Advanced',
    category: 'Chain Development',
    icon: 'Zap',
    color: 'from-[#0071F7] to-[#0071F7]/80',
    topics: ['Custom gas tokens', 'Rollup modes', 'Enterprise features', 'Performance tuning'],
  }
];