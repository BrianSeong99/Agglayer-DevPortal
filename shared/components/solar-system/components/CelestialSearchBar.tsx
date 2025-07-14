import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";

interface CelestialSearchBarProps {
  isVisible: boolean;
}

export const CelestialSearchBar = ({ isVisible }: CelestialSearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

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
          <div className="relative w-80 h-12 bg-black/30 backdrop-blur-xs rounded-full shadow-lg border border-gray-700">
            <div className="flex items-center h-full px-4">
              <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 h-full bg-transparent text-white placeholder-gray-500 text-sm border-none outline-none focus:ring-0 leading-none"
                placeholder="Search planets and chains..."
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
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