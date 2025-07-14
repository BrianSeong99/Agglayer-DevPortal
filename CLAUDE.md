# AggShell - Agglayer Developer Portal

## Project Overview
AggShell is the official developer portal for Agglayer, providing a comprehensive interface for developers to explore, learn, and build on Agglayer's unified cross-chain infrastructure.

## Page Architecture

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

## Development Pipeline
**Local → Testnet → Mainnet**
1. **Local Development**: AggSandbox environment for rapid prototyping
2. **Testnet Testing**: Cardona/Bali environments for semi-production testing
3. **Mainnet Deployment**: Production deployment across 8+ mainnet chains

## Agglayer Technical Resources

### Core Repositories:
- **Unified Bridge**: https://github.com/BrianSeong99/Agglayer_UnifiedBridge
  - Cross-chain communication (L1-L2, L2-L1, L2-L2)
  - Bridge contracts, Merkle proofs, exit trees
  - Bridge-and-call functionality

- **Pessimistic Proof Benchmark**: https://github.com/BrianSeong99/Agglayer_PessimisticProof_Benchmark
  - Security boundary mechanism
  - zkVM performance comparison (SP1, RiscZero, Pico)
  - Risk isolation and damage limitation

- **State Transition Proof**: https://github.com/BrianSeong99/Agglayer_StateTransitionProof
  - Cross-chain integrity verification
  - ECDSA and Generic proof methods
  - Atomic transaction guarantees

- **Plonky3 Tutorials**:
  - Fibonacci: https://github.com/BrianSeong99/Plonky3_Fibonacci
  - Range Check: https://github.com/BrianSeong99/Plonky3_RangeCheck
  - ZK circuit development, AIR constraints, privacy proofs

### Official Resources:
- **Visualizer**: https://visualizer.agglayer.dev/
- **Documentation**: https://docs.agglayer.dev/
- **CDK Information**: https://www.agglayer.dev/cdk
- **lxly.js SDK**: https://github.com/0xPolygon/lxly.js
- **AggSandbox**: https://github.com/NethermindEth/agg-sandbox

### Developer Tools:
- **AggSandbox**: Local development environment with fork mode support
- **lxly.js**: JavaScript library for cross-chain interactions
- **CDK**: Chain Development Kit with OP Stack and Erigon options
- **Bridge APIs**: REST endpoints for proof generation and verification

## Key Agglayer Concepts:

### Unified Bridge Architecture:
- **Local Exit Trees**: Per-chain withdrawal activity snapshots
- **Global Exit Root**: Ethereum-based reference for all connected chains
- **Merkle Proofs**: Transaction validation and verification
- **Bridge-and-Call**: Cross-chain function execution

### Pessimistic Proof System:
- **Security Boundary**: Prevents cross-chain financial vulnerabilities
- **Risk Isolation**: Limits damage to individual chain deposits
- **Trust-Free**: No security assumptions between chains
- **zkVM Support**: Multiple proof systems (SP1, RiscZero, Pico)

### State Transition Verification:
- **Validity Proofs**: Internal chain state transition verification
- **Cross-Chain Verification**: Inter-network transaction validation
- **Atomic Transactions**: Guaranteed cross-chain operation integrity
- **Multiple Methods**: ECDSA and Generic proof support

### ZK Technology Stack:
- **Plonky3 Framework**: Modular ZK proof system
- **AIR (Algebraic Intermediate Representation)**: Constraint definition
- **Range Checking**: Privacy-preserving value validation
- **Custom Circuits**: Flexible proof system design

### CDK (Chain Development Kit):
- **Multistack Approach**: OP Stack and Erigon options
- **Native Agglayer Integration**: Built-in cross-chain connectivity
- **Sovereign yet Connected**: Independent chains with unified liquidity
- **Implementation Partners**: Professional deployment support

## Network Information:

### Connected Chains (20+):
- **Mainnet Environment (8 chains)**: Production deployments
- **Cardona Testnet (8 chains)**: Semi-production testing
- **Bali Testnet (4 chains)**: Development testing

### Environment Color Coding:
- **Mainnet**: Green (#00d4aa)
- **Cardona**: Orange (#ff8c42)
- **Bali**: Purple (#8b5cf6)
- **Agglayer**: Blue (#3b82f6)

## Technical Stack:
- **Frontend**: Next.js 14, React, TypeScript
- **3D Graphics**: React Three Fiber, Three.js
- **Physics**: Rapier physics engine
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **UI Components**: Custom design system

## Development Commands:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

## Project Structure:
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

## Contributing:
When working on this project:
1. Follow the established component structure
2. Use the existing design system and color schemes
3. Maintain consistency across the four main pages
4. Test all interactive elements and 3D components
5. Ensure responsive design works across devices