export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  type: string;
}

export const tutorials: Tutorial[] = [
  // Beginner tutorials
  {
    id: 'agglayer-fundamentals',
    title: 'Agglayer Fundamentals',
    description: 'Learn core concepts',
    difficulty: 'Beginner',
    duration: '15 min',
    type: 'beginner',
  },
  {
    id: 'first-transaction',
    title: 'Your First Cross-Chain Transaction',
    description: 'Hands-on introduction',
    difficulty: 'Beginner',
    duration: '20 min',
    type: 'beginner',
  },
  {
    id: 'setup-environment',
    title: 'Setting Up Your Development Environment',
    description: 'Tools and setup',
    difficulty: 'Beginner',
    duration: '10 min',
    type: 'beginner',
  },

  // Intermediate tutorials
  {
    id: 'build-dex',
    title: 'Build a Cross-Chain DEX',
    description: 'Step-by-step guide',
    difficulty: 'Intermediate',
    duration: '45 min',
    type: 'dapp',
  },
  {
    id: 'nft-bridge',
    title: 'Create an NFT Bridge',
    description: 'NFT cross-chain transfers',
    difficulty: 'Intermediate',
    duration: '30 min',
    type: 'dapp',
  },
  {
    id: 'cross-chain-messaging',
    title: 'Implement Cross-Chain Messaging',
    description: 'Advanced patterns',
    difficulty: 'Intermediate',
    duration: '35 min',
    type: 'dapp',
  },

  // Advanced tutorials
  {
    id: 'security-best-practices',
    title: 'Security Best Practices',
    description: 'Audit checklist',
    difficulty: 'Advanced',
    duration: '25 min',
    type: 'advanced',
  },
  {
    id: 'gas-optimization',
    title: 'Gas Optimization Strategies',
    description: 'Cost reduction tips',
    difficulty: 'Advanced',
    duration: '20 min',
    type: 'advanced',
  },
  {
    id: 'deployment-monitoring',
    title: 'Deployment & Monitoring',
    description: 'Production checklist',
    difficulty: 'Advanced',
    duration: '30 min',
    type: 'advanced',
  },
];