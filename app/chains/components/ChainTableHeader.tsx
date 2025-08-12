'use client';

import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, radius } from '@/shared/design-system';
import { TABLE_CONFIG } from '../config/tableConfig';

interface ChainTableHeaderProps {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export default function ChainTableHeader({ 
  sortField, 
  sortDirection, 
  onSort 
}: ChainTableHeaderProps) {
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronUpIcon style={{ width: '8px', height: '4px', color: 'rgba(0,46,101,0.8)' }} />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUpIcon style={{ width: '8px', height: '4px', color: 'rgba(0,46,101,0.8)' }} /> :
      <ChevronDownIcon style={{ width: '8px', height: '4px', color: 'rgba(0,46,101,0.8)' }} />;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: `0 ${spacing[4]}`,
      height: '47px',
      width: '100%',
      gap: spacing[6] // Add gap like the row
    }}>
      {/* Name Column */}
      <div style={{
        width: TABLE_CONFIG.columns.name,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}>
        <div style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: '15px',
          fontWeight: typography.fontWeight.bold,
          color: 'rgba(0,46,101,0.9)',
          lineHeight: 1.08,
          textAlign: 'left',
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          Name
        </div>
      </div>

      {/* Data columns container */}
      <div style={{
        flex: 1, // Take remaining space
        display: 'flex',
        alignItems: 'center', // Center all header columns vertically
        justifyContent: 'space-between'
      }}>
        {/* Gas Token Column */}
        <div style={{
          width: TABLE_CONFIG.columns.gasToken,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => onSort('gasToken')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1.5],
              padding: 0
            }}
          >
            <div style={{
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              Gas Token
            </div>
            {getSortIcon('gasToken')}
          </button>
        </div>

        {/* Block Time Column */}
        <div style={{
          width: TABLE_CONFIG.columns.blockTime,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => onSort('blockTime')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1.5],
              padding: 0
            }}
          >
            <div style={{
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              Block time
            </div>
            {getSortIcon('blockTime')}
          </button>
        </div>

        {/* TPS Column */}
        <div style={{
          width: TABLE_CONFIG.columns.tps,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => onSort('tps')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1.5],
              padding: 0
            }}
          >
            <div style={{
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              TPS
            </div>
            {getSortIcon('tps')}
          </button>
        </div>

        {/* Activity Column */}
        <div style={{
          width: TABLE_CONFIG.columns.activity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => onSort('activity')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1.5],
              padding: 0
            }}
          >
            <div style={{
              fontFamily: 'SF Mono, monospace',
              fontSize: '12px',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: 1.5,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              Activity
            </div>
            {getSortIcon('activity')}
          </button>
        </div>

        {/* Status Column - No sort */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <div style={{
            fontFamily: 'SF Mono, monospace',
            fontSize: '12px',
            color: 'rgba(0,46,101,0.8)',
            lineHeight: 1.5,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            Status
          </div>
        </div>

        {/* Expand Column Header */}
        <div style={{
          width: TABLE_CONFIG.columns.expandButton,
          height: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {/* Empty - just for spacing alignment */}
        </div>
      </div>

    </div>
  );
} 