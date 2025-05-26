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
            <h1 className="agg-title">AggSwap</h1>
            <p className="agg-subtitle">
            Uniswap, rebuilt for trustless interop
            </p>
          </div>

          <div className={`swap-card ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Suspense fallback={<div className="p-4 text-center text-gray-400">Loading cross-chain interface...</div>}>
              <CrossChainSwapForm />
            </Suspense>
          </div>

          <div className="info-text mt-6">
            <p>Bridge between Sepolia and Cardona testnet networks using Agglayer's unified bridge.</p>
          </div>
        </div>

        {/* Logo in bottom left corner */}
        <a 
          href="https://www.agglayer.dev/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bottom-logo" 
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.1)',
            padding: '16px 20px',
            borderRadius: '24px',
            width: '140px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          <img 
            src="/dapps/pics/aggswap/logo.png" 
            alt="AggSwap Logo - Visit Agglayer.dev" 
            className="logo-image"
            style={{
              width: '88px',
              height: '88px',
              objectFit: 'contain',
              borderRadius: '18px'
            }}
            onLoad={() => console.log('Logo loaded successfully')}
            onError={(e) => {
              console.log('Logo failed to load, trying SVG fallback');
              e.currentTarget.src = "/dapps/pics/aggswap/logo.svg";
            }}
          />
        </a>
      </div>
    </WalletProvider>
  );
}