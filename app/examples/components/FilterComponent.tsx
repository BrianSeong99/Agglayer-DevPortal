'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="h-auto py-1 px-2 text-xs"
          >
            <XMarkIcon className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {multiSelect ? (
        <ToggleGroup
          type="multiple"
          value={selectedOptions}
          onValueChange={(value: string[]) => {
            onFilterChange(value);
          }}
          className="flex flex-wrap gap-2 justify-start"
        >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.id}
            value={option.id}
            variant="outline"
            size="sm"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          value={selectedOptions[0] || ""}
          onValueChange={(value: string) => {
            onFilterChange(value ? [value] : []);
          }}
          className="flex flex-wrap gap-2 justify-start"
        >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.id}
            value={option.id}
            variant="outline"
            size="sm"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      )}

      {selectedOptions.length > 0 && (
        <p className="text-xs text-[#D9D9D9]">
          {selectedOptions.length} filter{selectedOptions.length > 1 ? 's' : ''} applied
        </p>
      )}
    </div>
  );
}