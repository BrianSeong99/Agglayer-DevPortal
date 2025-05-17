"use client";
import { useState, useEffect } from "react";
import { useWalletClient, useAccount } from "wagmi";
import axios from "axios";

// Token selection enum matching backend
enum TokenSelection {
  TOKEN_A_TO_B = "TOKEN_A_TO_B",
  TOKEN_B_TO_A = "TOKEN_B_TO_A"
}

// Token option interface
interface TokenOption {
  value: TokenSelection;
  label: string;
  sourceToken: {
    address: string;
    name: string;
  };
  destinationToken: {
    address: string;
    name: string;
  };
}

export function CrossChainSwapForm() {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [amountIn, setAmountIn] = useState("");
  const [selectedOption, setSelectedOption] = useState<TokenSelection | "">("");
  const [tokenOptions, setTokenOptions] = useState<TokenOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [txHash, setTxHash] = useState("");
  const [txState, setTxState] = useState<"idle" | "bridging" | "ready_to_claim" | "claimed">("idle");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Fetch token options when component mounts
  useEffect(() => {
    async function fetchTokenOptions() {
      try {
        setLoadingOptions(true);
        const response = await axios.get("/api/token-options");
        setTokenOptions(response.data.options);
      } catch (error) {
        console.error("Error fetching token options:", error);
        setStatus("error");
        setErrorMessage("Failed to load token options");
      } finally {
        setLoadingOptions(false);
      }
    }

    fetchTokenOptions();
  }, []);

  const clearForm = () => {
    setAmountIn("");
    setSelectedOption("");
  };

  // Get current selected token info
  const getSelectedTokenInfo = () => {
    if (!selectedOption) return null;
    return tokenOptions.find(option => option.value === selectedOption);
  };

  // Effect to check transaction status periodically
  useEffect(() => {
    if (txHash && address && txState === "bridging") {
      const checkStatus = async () => {
        try {
          // Call an API endpoint that checks transaction status
          const response = await axios.get(`/api/check-transaction-status?txHash=${txHash}&address=${address}`);
          
          if (response.data.state === "READY_TO_CLAIM") {
            setTxState("ready_to_claim");
          } else if (response.data.state === "CLAIMED") {
            setTxState("claimed");
            setStatus("success");
            if (pollingInterval) {
              clearInterval(pollingInterval);
              setPollingInterval(null);
            }
          }
        } catch (error) {
          console.error("Error checking transaction status:", error);
        }
      };

      // Check every 30 seconds
      const interval = setInterval(checkStatus, 30000);
      setPollingInterval(interval);

      // Initial check
      checkStatus();

      // Cleanup interval on unmount
      return () => {
        clearInterval(interval);
        setPollingInterval(null);
      };
    }

    // Cleanup if txHash is cleared
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    };
  }, [txHash, address, txState]);

  async function handleCrossSwap(e: React.FormEvent) {
    e.preventDefault();
    if (!walletClient || !address) return;
    
    // Reset state
    setStatus("idle");
    setTxHash("");
    setErrorMessage("");
    setTxState("idle");
    
    // Validate inputs
    if (!selectedOption) {
      setStatus("error");
      setErrorMessage("Please select a token pair");
      return;
    }
    
    if (!amountIn || parseFloat(amountIn) <= 0) {
      setStatus("error");
      setErrorMessage("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Sending request with:", {
        tokenSelection: selectedOption,
        amount: amountIn,
        userAddress: address,
      });
      
      const response = await axios.post("/api/cross-chain-swap", {
        tokenSelection: selectedOption,
        amount: amountIn,
        userAddress: address,
      });
      
      console.log("Response:", response.data);
      
      // Get transaction hash from the response
      const hash = response.data.hash || response.data.txHash;
      
      if (hash) {
        setTxHash(hash);
        setTxState("bridging");
        clearForm();
      } else {
        throw new Error("No transaction hash in response");
      }
    } catch (err: any) {
      console.error("Cross-chain swap error:", err);
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message || 
        err.message || 
        "Failed to execute cross-chain swap"
      );
    } finally {
      setLoading(false);
    }
  }

  function getStatusMessage() {
    switch (txState) {
      case "bridging":
        return "Transaction is being bridged from Sepolia to Cardona. This process typically takes 5-10 minutes.";
      case "ready_to_claim":
        return "Transaction is ready to be claimed on Cardona. The backend will automatically claim it shortly.";
      case "claimed":
        return "Transaction has been successfully claimed on Cardona. Your tokens have arrived!";
      default:
        return "";
    }
  }

  // Get current token pair details for display
  const selectedTokenInfo = getSelectedTokenInfo();

  return (
    <form onSubmit={handleCrossSwap} className="space-y-2">
      <div className="mb-1">
        <h3 className="text-base font-semibold mb-0.5">Cross-chain swap (Sepolia → Cardona)</h3>
        <p className="text-xs text-gray-600">Bridge tokens from Sepolia to Cardona in one transaction</p>
      </div>
      
      {(txState === "bridging" || txState === "ready_to_claim" || txState === "claimed") && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-2 mb-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium">Transaction in progress</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {txState === "bridging" ? "Bridging" : txState === "ready_to_claim" ? "Ready to Claim" : "Claimed"}
            </span>
          </div>
          {txHash && (
            <p className="text-xs mt-0.5">
              Transaction: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="font-mono underline">{txHash.slice(0,8)}...{txHash.slice(-6)}</a>
            </p>
          )}
          <p className="text-xs mt-1">{getStatusMessage()}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ 
                width: txState === "bridging" ? "33%" : 
                       txState === "ready_to_claim" ? "66%" : 
                       "100%" 
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-blue-800">
            <span>Initiated</span>
            <span>Processing</span>
            <span>Completed</span>
          </div>
        </div>
      )}
      
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-2 mb-2">
          <p className="text-sm font-medium">Transaction failed</p>
          <p className="text-xs mt-0.5">{errorMessage}</p>
        </div>
      )}
      
      <div className="form-group mb-3">
        <label htmlFor="tokenPair" className="form-label text-sm mb-0.5">Select Token Pair</label>
        <select 
          id="tokenPair"
          className="input py-1.5 w-full" 
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value as TokenSelection)}
          disabled={loading || txState !== "idle" || loadingOptions}
        >
          <option value="">-- Select Token Pair --</option>
          {tokenOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {selectedTokenInfo && (
          <div className="mt-2 text-xs text-gray-700 bg-gray-50 p-2 rounded">
            <div className="flex items-center mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></span>
              <span className="font-medium">Source:</span>
              <span className="ml-1">{selectedTokenInfo.sourceToken.name}</span>
              <span className="ml-1 text-gray-500 font-mono">{selectedTokenInfo.sourceToken.address.slice(0,6)}...{selectedTokenInfo.sourceToken.address.slice(-4)}</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-purple-500 mr-1.5"></span>
              <span className="font-medium">Destination:</span>
              <span className="ml-1">{selectedTokenInfo.destinationToken.name}</span>
              <span className="ml-1 text-gray-500 font-mono">{selectedTokenInfo.destinationToken.address.slice(0,6)}...{selectedTokenInfo.destinationToken.address.slice(-4)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="form-group mb-3">
        <label htmlFor="amountCross" className="form-label text-sm mb-0.5">Amount to bridge and swap</label>
        <input 
          id="amountCross"
          className="input py-1.5" 
          placeholder="0.0" 
          type="number"
          min="0.000001"
          step="0.000001"
          value={amountIn} 
          onChange={(e) => setAmountIn(e.target.value)} 
          disabled={loading || txState !== "idle"}
        />
        <p className="mt-0.5 text-xs text-gray-500">Cross-chain transactions may take a few minutes to complete</p>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-accent relative overflow-hidden py-2"
        disabled={loading || txState !== "idle" || !selectedOption || !amountIn || amountIn === "0" || loadingOptions}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Bridge + Swap...
          </span>
        ) : loadingOptions ? (
          "Loading Token Options..."
        ) : txState !== "idle" ? (
          "Transaction in Progress..."
        ) : (
          "Bridge + Swap"
        )}
        
        {loading && (
          <span className="absolute bottom-0 left-0 h-1 bg-white/20 animate-progress"></span>
        )}
      </button>
      
      <div className="mt-1 text-xs text-gray-500 grid grid-cols-2 gap-1">
        <p>• Bridge between fixed token pairs</p>
        <p>• Uses AggLayer's unified bridge</p>
    </div>
    </form>
  );
}