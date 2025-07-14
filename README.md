# 🌌 Agglayer Developer Portal

**Agglayer Developer Portal** is the official developer portal for [Agglayer](https://github.com/agglayer), providing a comprehensive interface for developers to explore, learn, and build on Agglayer's unified cross-chain infrastructure. It features an interactive chain explorer, technical tutorials, and development tools to help developers navigate the multichain ecosystem.

## 🚀 What is Agglayer Developer Portal?

The Agglayer Developer Portal is your gateway to the Agglayer multichain universe, offering:

- **Interactive Chain Explorer**: Visualize and explore 20+ chains connected to Agglayer
- **Technical Tutorials**: Learn cross-chain development with hands-on examples
- **Development Tools**: Access resources for building on Agglayer
- **Real-time Network Status**: Monitor chain health and metrics

## 📄 Page Architecture

### 🏠 Homepage (`/`) - Information & Navigation Hub
**Purpose**: Guide users to appropriate destinations based on their needs
- Explains what Agglayer is and why it matters
- Provides ecosystem overview and navigation guidance
- Directs users to AggNiverse, Examples, or Developers pages

### 🌌 AggNiverse (`/aggniverse`) - Chain Explorer & Discovery
**Purpose**: Visual exploration of all chains connected to Agglayer
- 3D solar system interface for chain discovery
- Detailed chain information with developer resources
- Real-time network status and metrics
- 20+ chains across mainnet, cardona, and bali environments

### 💡 Examples (`/examples`) - Learning Hub with Technical Tutorials
**Purpose**: Educational content and hands-on learning resources
- Technical tutorials explaining Agglayer architecture
- Developer journey categorization (Beginner, dApp, Chain Builder, ZK)
- Real implementations and case studies
- Progressive learning paths

### 🛠️ Developers (`/developers`) - Active Development Portal
**Purpose**: Interactive environment for active Agglayer development
- Live development tools and resources
- Interactive testing interfaces
- Stage-specific resources (Local → Testnet → Mainnet)
- Real-time monitoring and debugging tools

## 🔧 Technical Stack

- **Frontend**: Next.js 14, React, TypeScript
- **3D Graphics**: React Three Fiber, Three.js
- **Physics**: Rapier physics engine
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **UI Components**: Custom design system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/agglayer/agglayer-developer-portal.git
cd agglayer-developer-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

## 📚 Key Agglayer Resources

### Core Repositories
- **[Unified Bridge](https://github.com/BrianSeong99/Agglayer_UnifiedBridge)**: Cross-chain communication infrastructure
- **[Pessimistic Proof](https://github.com/BrianSeong99/Agglayer_PessimisticProof_Benchmark)**: Security boundary mechanism
- **[State Transition Proof](https://github.com/BrianSeong99/Agglayer_StateTransitionProof)**: Cross-chain integrity verification
- **[lxly.js SDK](https://github.com/0xPolygon/lxly.js)**: JavaScript library for cross-chain interactions

### Developer Tools
- **[AggSandbox](https://github.com/NethermindEth/agg-sandbox)**: Local development environment
- **[Visualizer](https://visualizer.agglayer.dev/)**: Network visualization tool
- **[Documentation](https://docs.agglayer.dev/)**: Official Agglayer documentation
- **[CDK](https://www.agglayer.dev/cdk)**: Chain Development Kit

## 🌐 Network Information

### Connected Chains (20+)
- **Mainnet Environment**: 8 production chains
- **Cardona Testnet**: 8 semi-production testing chains
- **Bali Testnet**: 4 development testing chains

### Environment Color Coding
- **Mainnet**: Green (#00d4aa)
- **Cardona**: Orange (#ff8c42)
- **Bali**: Purple (#8b5cf6)
- **Agglayer**: Blue (#3b82f6)

## 📁 Project Structure

```
/app                 # Next.js app directory
  /page.tsx         # Homepage (Information Hub)
  /aggniverse       # Chain explorer
  /examples         # Learning tutorials
  /developers       # Development portal
/shared             # Shared components and utilities
  /components       # Reusable UI components
  /data            # Static data and configurations
```

## 🤝 Contributing

We welcome contributions! When working on this project:

1. Follow the established component structure
2. Use the existing design system and color schemes
3. Maintain consistency across the four main pages
4. Test all interactive elements and 3D components
5. Ensure responsive design works across devices

Feel free to open an issue or submit a PR, especially for:
- New tutorial content
- UI/UX improvements
- Additional chain integrations
- Documentation enhancements

## 📣 Questions?

- Visit [Agglayer Documentation](https://docs.agglayer.dev/)
- Reach out to [Brian Seong](https://x.com/BrianSeong99) or [Akshat Gada](https://x.com/gada_akshat)

**Made with 💜 by Polygon DevRel**