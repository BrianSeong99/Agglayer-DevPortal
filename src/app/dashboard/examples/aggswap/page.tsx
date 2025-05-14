"use client";
import { Suspense, useState, useEffect } from "react";
import { WalletProvider } from "./wallet/Provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SwapForm } from "./components/SwapForm";
import { LiquidityForm } from "./components/LiquidityForm";
import { CrossChainSwapForm } from "./components/CrossChainSwapForm";
import "./styles.css";

export default function AggswapPage() {
  const [activeTab, setActiveTab] = useState('swap');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChangingTab, setIsChangingTab] = useState(false);
  
  // Delayed loading for smoother animations
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  // Handle tab changes with animation
  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;
    
    setIsChangingTab(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsChangingTab(false);
    }, 200);
  };
  
  const tabs = [
    { 
      id: 'swap', 
      label: 'Swap', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="tab-button-icon">
          <path d="M7 10L3 14L7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 14L21 10L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 14H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Exchange tokens' 
    },
    { 
      id: 'liquidity', 
      label: 'Liquidity', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="tab-button-icon">
          <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 19C19.3137 19 22 16.3137 22 13C22 9.68629 19.3137 7 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 7C4.68629 7 2 9.68629 2 13C2 16.3137 4.68629 19 8 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 21V19M8 21V17M12 21V19M16 21V17M20 21V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Provide liquidity to earn fees' 
    },
    { 
      id: 'bridge', 
      label: 'Cross-Chain', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="tab-button-icon">
          <path d="M8 12H16M8 12L10.5 9.5M8 12L10.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      description: 'Move assets between blockchains' 
    }
  ];
  
  // Get the current tab info
  const currentTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <WalletProvider>
      <style jsx global>{`
        html, body {
          overflow: hidden;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        #aggswap-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .aggswap-content {
          flex: 1;
          overflow: auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      
      <div id="aggswap-root">
        <div className="aggswap-content">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 mb-3 gap-2">
            <div>
              <h1 className="text-2xl font-bold">Aggswap</h1>
              <p className="text-sm text-gray-600">Swaps powered by AggLayer Unified Bridge</p>
            </div>
            <ConnectButton accountStatus="address" showBalance={false} />
          </div>
          
          <div className="flex gap-1 mb-3 bg-gray-50 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center py-1.5 px-3 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className={`bg-white border border-gray-100 rounded-lg shadow-sm flex-1 mb-4 transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isChangingTab ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <div className="p-3 border-b border-gray-50">
              <h2 className="text-lg font-semibold">{currentTab.label}</h2>
              <p className="text-xs text-gray-500">{currentTab.description}</p>
            </div>
            <div className="p-3">
              {activeTab === 'swap' && (
                <Suspense fallback={<div className="p-2 text-center text-gray-500 text-sm">Loading swap interface...</div>}>
                  <SwapForm />
                </Suspense>
              )}
              {activeTab === 'liquidity' && (
                <Suspense fallback={<div className="p-2 text-center text-gray-500 text-sm">Loading liquidity interface...</div>}>
                  <LiquidityForm />
                </Suspense>
              )}
              {activeTab === 'bridge' && (
                <Suspense fallback={<div className="p-2 text-center text-gray-500 text-sm">Loading cross-chain interface...</div>}>
                  <CrossChainSwapForm />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}