import { useState } from 'react';
import { motion } from 'framer-motion';
import { typography, colors, spacing, sizing, radius } from '@/shared/design-system';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const filterOptions = [
  { id: 'EVM', label: 'EVM Compatible' },
  { id: 'CDK-Erigon', label: 'CDK-Erigon' },
  { id: 'CDK-OPGeth', label: 'CDK-OPGeth' },
];

export default function SearchAndFilters({ 
  searchQuery, 
  onSearchChange, 
  selectedFilters, 
  onFiltersChange 
}: SearchAndFiltersProps) {
  
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFiltersChange(selectedFilters.filter(f => f !== filterId));
    } else {
      onFiltersChange([...selectedFilters, filterId]);
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: spacing[3],
      alignItems: 'center',
      width: sizing.container.full
    }}>
      {/* Search Bar */}
      <div style={{
        flex: 1,
        position: 'relative',
        maxWidth: '408px'
      }}>
        <div style={{
          position: 'relative',
          backgroundColor: colors.background.primary,
          border: `1px solid ${colors.primary.DEFAULT}`,
          borderRadius: '40.5px',
          height: '31px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: spacing[2],
          paddingRight: spacing[1.5]
        }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.body.join(', '),
              color: 'rgba(0,0,0,0.5)',
              lineHeight: typography.lineHeight.snug
            }}
          />
          
          <div style={{
            backgroundColor: colors.primary.DEFAULT,
            borderRadius: radius.pill,
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing[1.5]
          }}>
            <MagnifyingGlassIcon style={{
              width: '11.25px',
              height: '11.25px',
              color: colors.text.inverse
            }} />
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div style={{
        backgroundColor: '#E4F5FF',
        borderRadius: radius.full,
        padding: `${spacing[1.5]} ${spacing[3]}`,
        display: 'flex',
        gap: spacing[1.5],
        alignItems: 'center'
      }}>
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: radius.pill,
              padding: `${spacing[1.5]} ${spacing[2]}`,
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.body.join(', '),
              fontWeight: typography.fontWeight.medium,
              color: colors.primary.DEFAULT,
              cursor: 'pointer',
              lineHeight: typography.lineHeight.snug,
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              opacity: selectedFilters.includes(filter.id) ? 1 : 0.7,
              textDecoration: selectedFilters.includes(filter.id) ? 'underline' : 'none'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
} 