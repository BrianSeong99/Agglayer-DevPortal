'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterComponentProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onFilterChange: (selectedIds: string[]) => void;
  multiSelect?: boolean;
}

export default function FilterComponent({
  title,
  options,
  selectedOptions,
  onFilterChange,
  multiSelect = true,
}: FilterComponentProps) {
  const handleOptionClick = (optionId: string) => {
    if (multiSelect) {
      if (selectedOptions.includes(optionId)) {
        onFilterChange(selectedOptions.filter((id) => id !== optionId));
      } else {
        onFilterChange([...selectedOptions, optionId]);
      }
    } else {
      onFilterChange([optionId]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        {selectedOptions.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#D9D9D9] hover:text-white flex items-center gap-1"
          >
            <XMarkIcon className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-[#0071F7] border-[#0071F7] text-white'
                  : 'bg-transparent border-white/20 text-[#D9D9D9] hover:border-white/40 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {selectedOptions.length > 0 && (
        <p className="text-xs text-[#D9D9D9]">
          {selectedOptions.length} filter{selectedOptions.length > 1 ? 's' : ''} applied
        </p>
      )}
    </div>
  );
}