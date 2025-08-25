export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'concepts' | 'tools' | 'app-tutorials';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  url: string;
  icon?: string;
}

export const tutorials: Tutorial[] = [
  // Concepts - Core understanding of Agglayer
  {
    id: 'agglayer-overview',
    title: 'Agglayer Overview',
    description: 'Complete walkthrough of Agglayer architecture and ecosystem',
    category: 'concepts',
    duration: '20 min',
    url: 'https://docs.agglayer.dev/agglayer/core-concepts/architecture/',
    icon: '/img/concepts/overview.svg',
  },
  {
    id: 'unified-bridge-deep-dive',
    title: 'Unified Bridge Deep Dive',
    description: 'Understanding cross-chain communication and bridge architecture',
    category: 'concepts',
    duration: '25 min',
    url: 'https://docs.agglayer.dev/agglayer/core-concepts/unified-bridge/',
    icon: '/img/concepts/unified-bridge.svg',
  },
  {
    id: 'pessimistic-proofs',
    title: 'Pessimistic Proofs Explained',
    description: 'Security mechanisms and trust-minimized verification',
    category: 'concepts',
    duration: '15 min',
    url: 'https://docs.agglayer.dev/agglayer/core-concepts/pessimistic-proof/',
    icon: '/img/concepts/pp.svg',
  },
  {
    id: 'state-transitions',
    title: 'State Transitions & Verification',
    description: 'How Agglayer ensures cross-chain integrity',
    category: 'concepts',
    duration: '20 min',
    url: 'https://docs.agglayer.dev/agglayer/core-concepts/state-transition-proof/',
    icon: '/img/concepts/state-transition.svg',
  },

  // Tools - One tutorial per tool
  {
    id: 'lxlyjs-tutorial',
    title: 'Getting Started with lxly.js',
    description: 'Complete guide to using the JavaScript SDK',
    category: 'tools',
    duration: '10 min',
    url: 'https://github.com/0xPolygon/lxly.js',
    icon: '/img/dev-tools/lxly.svg',
  },
  {
    id: 'aggsandbox-tutorial',
    title: 'AggSandbox Complete Guide',
    description: 'Local development, fork mode, and multi-L2 setup',
    category: 'tools',
    duration: '30 min',
    url: 'https://docs.agglayer.dev/agglayer/aggsandbox/',
    icon: '/img/dev-tools/aggsandbox.svg',
  }
];