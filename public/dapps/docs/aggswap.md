# Cross-Chain Swaps with AggLayer - Quick Guide

A condensed developer reference for implementing cross-chain token bridging and swapping between Sepolia and Cardona networks using AggLayer's bridgeAndCall functionality.

## Goal

Provide seamless cross-chain token swapping with automatic execution, robust error handling, and proper permission management for bridge executor and router contracts.

## Core Architecture

**Configuration System** - Maps token addresses across networks with consistent standards.

**API Handler** - Processes requests and coordinates cross-chain operations.

**Bridge and Call Function** - Core logic using AggLayer's bridgeAndCall feature.

**Pre-approval System** - Critical permissions management for destination chain contracts.

**RPC Resilience** - Retry mechanisms with exponential backoff for network failures.

## Implementation Flow

**Configuration** - Set up token mappings for Sepolia and Cardona networks.

**Request Processing** - Extract and validate tokenSelection, amount, and userAddress.

**Pre-approval Phase** - Approve bridge executor and router contracts on destination chain. This is the most critical step.

**Calldata Generation** - Create swap instructions for Uniswap router execution.

**Bridge Execution** - Execute bridgeAndCall to lock tokens, mint on destination, and automatically execute swap.

## Critical Success Factors

**Permission Chain** - User approves bridge on source, pre-approves bridge executor on destination, executor executes swap automatically.

**Two-Phase Execution** - Asset transfer is automatic, message execution may require manual claiming.

## Common Issues

**Bridge Executor Permission** - Most common failure. Always ensure bridge executor has spending approval before bridging.

**RPC Rate Limits** - Use exponential backoff and multiple RPC endpoints.

**Manual Message Claiming** - Assets transfer but swap instructions may need manual claiming.

**Nonce Management** - Explicitly track transaction nonces to prevent conflicts.

## Conclusion

Cross-chain swaps with AggLayer require understanding bridging mechanics and permission models. The critical component is ensuring bridge executor permissions on destination chains for seamless user experiences.

---
