import { motion } from 'framer-motion';
import { typography, colors, spacing, sizing, radius } from '@/shared/design-system';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div style={{
      backgroundColor: '#E4F5FF',
      borderRadius: radius.round,
      padding: `${spacing[1.5]}`,
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      gap: '10px'
    }}>
      {/* Grid View Button */}
      <button
        onClick={() => onViewChange('grid')}
        className="transition-all duration-300"
        style={{
          backgroundColor: view === 'grid' ? colors.primary.DEFAULT : 'transparent',
          border: 'none',
          borderRadius: radius.round,
          padding: `${spacing[1.5]} ${spacing[2]}`,
          fontSize: typography.fontSize['sm'],
          fontFamily: typography.textStyles.button.fontFamily,
          fontWeight: view === 'grid' ? typography.fontWeight.bold : typography.fontWeight.medium,
          color: view === 'grid' ? '#FFFFFF' : colors.primary.DEFAULT,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          lineHeight: typography.textStyles.button.lineHeight,
          height: '30px'
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          <rect x="7" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          <rect x="1" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
          <rect x="7" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        <span>Grid view</span>
      </button>

      {/* List View Button */}
      <button
        onClick={() => onViewChange('list')}
        className="transition-all duration-300"
        style={{
          backgroundColor: view === 'list' ? colors.primary.DEFAULT : 'transparent',
          border: 'none',
          borderRadius: radius.round,
          padding: `${spacing[1.5]} ${spacing[2]}`,
          fontSize: typography.fontSize['sm'],
          fontFamily: typography.textStyles.button.fontFamily,
          fontWeight: view === 'list' ? typography.fontWeight.bold : typography.fontWeight.medium,
          color: view === 'list' ? '#FFFFFF' : colors.primary.DEFAULT,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          lineHeight: typography.textStyles.button.lineHeight,
          height: '30px'
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="2" width="10" height="1" rx="0.5" fill="currentColor"/>
          <rect x="1" y="5.5" width="10" height="1" rx="0.5" fill="currentColor"/>
          <rect x="1" y="9" width="10" height="1" rx="0.5" fill="currentColor"/>
        </svg>
        <span>List view</span>
      </button>
    </div>
  );
} 