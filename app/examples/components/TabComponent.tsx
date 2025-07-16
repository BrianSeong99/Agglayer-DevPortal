'use client';

import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface TabComponentProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function TabComponent({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabComponentProps) {
  return (
    <div className={`flex items-center gap-2 p-1 bg-white/5 rounded-lg ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-[#D9D9D9] hover:text-white'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-[#0071F7] rounded-md"
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}