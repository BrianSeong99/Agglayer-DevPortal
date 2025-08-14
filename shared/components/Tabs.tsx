import React from 'react';
import { motion } from 'framer-motion';
import { colors, spacing, typography, motionTokens } from '@/shared/design-system';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export default function Tabs({ 
  tabs, 
  activeTab, 
  onTabChange, 
  style = {},
  containerStyle = {}
}: TabsProps) {
  return (
    <motion.div 
      initial={motionTokens.section.initial}
      whileInView={motionTokens.section.whileInView}
      transition={motionTokens.section.transition}
      viewport={{ once: true }}
      style={{
        width: '940px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        ...containerStyle
      }}
    >
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: '#E4F5FF',
        borderRadius: '40.5px',
        padding: spacing[1.5],
        display: 'flex',
        alignItems: 'center',
        height: 'auto',
        ...style
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? colors.primary.DEFAULT : 'transparent',
              color: activeTab === tab.id ? '#ffffff' : colors.primary.DEFAULT,
              border: 'none',
              borderRadius: '36px',
              padding: `${spacing[2]} ${spacing[4]}`,
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: activeTab === tab.id ? typography.fontWeight.bold : typography.fontWeight.medium,
              cursor: 'pointer',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1.2,
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
} 