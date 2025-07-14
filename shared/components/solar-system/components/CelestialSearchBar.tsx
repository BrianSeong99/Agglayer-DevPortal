import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { Search } from "lucide-react";

// Celestial body data for search suggestions - complete list
const celestialBodies = [
  { name: "Agglayer Sun", type: "sun", environment: "core" },
  
  // Mainnet chains
  { name: "X Layer", type: "planet", environment: "mainnet" },
  { name: "katana", type: "planet", environment: "mainnet" },
  { name: "Pentagon Games", type: "planet", environment: "mainnet" },
  { name: "pay-chain", type: "planet", environment: "mainnet" },
  { name: "polygon zkEVM", type: "planet", environment: "mainnet" },
  { name: "prism", type: "planet", environment: "mainnet" },
  { name: "silicon-zk", type: "planet", environment: "mainnet" },
  { name: "Ternoa", type: "planet", environment: "mainnet" },

  // Cardona testnet chains
  { name: "Lumia Beam Testnet", type: "planet", environment: "cardona" },
  { name: "ppxlayer-testnet", type: "planet", environment: "cardona" },
  { name: "bokuto", type: "planet", environment: "cardona" },
  { name: "zkevm-testnet", type: "planet", environment: "cardona" },
  { name: "moonveil-testnet", type: "planet", environment: "cardona" },
  { name: "stavanger", type: "planet", environment: "cardona" },
  { name: "Zephyr", type: "planet", environment: "cardona" },
  { name: "tac-turin-testnet", type: "planet", environment: "cardona" },

  // Bali testnet chains
  { name: "zkevm-internal", type: "planet", environment: "bali" },
  { name: "bali-35-op", type: "planet", environment: "bali" },
  { name: "bolt", type: "planet", environment: "bali" },
  { name: "bali-39", type: "planet", environment: "bali" },
];

interface CelestialSearchBarProps {
  isVisible: boolean;
  onSuggestionSelect?: (suggestion: { name: string; type: string; environment: string }) => void;
}

export const CelestialSearchBar = ({ isVisible, onSuggestionSelect }: CelestialSearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [maxDropdownHeight, setMaxDropdownHeight] = useState(400);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic dropdown height based on window size
  useEffect(() => {
    const calculateMaxHeight = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom - 20; // 20px padding from bottom
        const maxHeight = Math.max(200, Math.min(spaceBelow, 500)); // Min 200px, max 500px
        setMaxDropdownHeight(maxHeight);
      }
    };

    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, [isVisible]);

  // Filter celestial bodies based on search input
  const filteredSuggestions = useMemo(() => {
    if (!searchValue.trim()) return celestialBodies; // Show all when no search input
    return celestialBodies.filter(body =>
      body.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // Keep dropdown open as long as input is focused
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: { name: string; type: string; environment: string }) => {
    setSearchValue(suggestion.name);
    setIsDropdownOpen(false);
    onSuggestionSelect?.(suggestion);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-auto flex items-center gap-3"
        >
          {/* Main search bar */}
          <div ref={searchBarRef} className="relative w-80">
            <div className="relative h-12 bg-black backdrop-blur-xs rounded-full shadow-lg border border-gray-700">
              <div className="flex items-center h-full px-4">
                <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                  className="flex-1 h-full bg-transparent text-white placeholder-gray-500 text-sm border-none outline-none focus:ring-0 leading-none"
                  placeholder="Search planets and chains..."
                />
                {searchValue && (
                  <button
                    onClick={() => {
                      setSearchValue("");
                      setIsDropdownOpen(false);
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Dropdown suggestions */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black backdrop-blur-md rounded-2xl shadow-xl border border-gray-700 overflow-y-auto z-[10000]"
                  style={{ maxHeight: `${maxDropdownHeight}px` }}
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={`${suggestion.name}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-gray-700 last:border-b-0"
                    >
                      <span className="text-lg">
                        {suggestion.type === "sun" ? "☀️" : "🪐"}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{suggestion.name}</div>
                        <div className="text-xs text-gray-400 capitalize">
                          {suggestion.environment}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter bubbles */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xs rounded-full shadow-md border border-gray-700 hover:bg-white/10 transition-colors text-sm text-white">
              <span>🌉</span>
              <span>ALGateway</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xs rounded-full shadow-md border border-gray-700 hover:bg-white/10 transition-colors text-sm text-white">
              <span>🛡️</span>
              <span>Validium</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-xs rounded-full shadow-md border border-gray-700 hover:bg-white/10 transition-colors text-sm text-white">
              <span>⚡</span>
              <span>zkEVM</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};