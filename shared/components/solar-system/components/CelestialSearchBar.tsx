import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";

interface CelestialSearchBarProps {
  isVisible: boolean;
}

export const CelestialSearchBar = ({ isVisible }: CelestialSearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            initial={{ width: "300px" }}
            animate={{ width: isFocused ? "350px" : "300px" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="relative border border-gray-700 rounded-2xl bg-black/30 backdrop-blur-xs p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0"
                  placeholder="Search planets and chains..."
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};