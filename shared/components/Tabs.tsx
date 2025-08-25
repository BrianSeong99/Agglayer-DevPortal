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
        borderRadius: '28px',
        padding: `${spacing[1.5]}`,
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        gap: '10px',
        ...style
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="transition-all duration-300"
            style={{
              backgroundColor: activeTab === tab.id ? colors.primary.DEFAULT : 'transparent',
              border: 'none',
              borderRadius: '28px',
              padding: `${spacing[1.5]} ${spacing[3]}`,
              fontSize: typography.fontSize.sm,
              fontFamily: typography.textStyles.button.fontFamily,
              fontWeight: activeTab === tab.id ? typography.fontWeight.bold : typography.fontWeight.medium,
              color: activeTab === tab.id ? '#FFFFFF' : colors.primary.DEFAULT,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              lineHeight: typography.textStyles.button.lineHeight,
              height: '30px',
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