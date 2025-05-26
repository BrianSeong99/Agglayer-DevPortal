"use client";
import { Suspense, useState, useEffect } from "react";
import { WalletProvider } from "./wallet/Provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CrossChainSwapForm } from "./components/CrossChainSwapForm";
import "./styles.css";

export default function AggswapPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Token icons for floating background
  const tokenColors = [
    "#8b5cf6", // Purple (primary accent)
    "#0071F7", // Vibrant blue
  ];

  return (
    <WalletProvider>
      <div id="aggswap-root">
        {/* Gradient background with transition */}
        <div className="color-transition-background"></div>

        <div className="aggswap-content">
          <div className="flex justify-end p-4">
            <ConnectButton accountStatus="address" showBalance={false} />
          </div>

          <div className="agg-header">
            <h1 className="agg-title">Aggswap</h1>
            <p className="agg-subtitle">
              Cross chain swaps made easy
            </p>
          </div>

          <div className={`swap-card ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Suspense fallback={<div className="p-4 text-center text-gray-400">Loading cross-chain interface...</div>}>
              <CrossChainSwapForm />
            </Suspense>
          </div>

          <div className="info-text mt-6">
            <p>Bridge between Sepolia and Cardona testnet networks using AggLayer's unified bridge.</p>
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}