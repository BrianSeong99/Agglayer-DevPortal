import { typography, colors, spacing, sizing, radius } from '@/shared/design-system';

interface ChainTableHeaderProps {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const columns = [
  { id: 'name', label: 'Name', width: '200px' },
  { id: 'gasToken', label: 'GAS TOKEN', width: '81px' },
  { id: 'blockTime', label: 'BLOCK TIME', width: '85px' },
  { id: 'tps', label: 'TPS', width: '44px' },
  { id: 'activity', label: 'ACTIVITY', width: '81px' },
  { id: 'status', label: 'STATUS', width: '81px' }
];

export default function ChainTableHeader({ sortField, sortDirection, onSort }: ChainTableHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${spacing[4]}`,
      height: '47px',
      borderRadius: radius.md,
      overflow: 'hidden'
    }}>
      {/* Chain Name Column */}
      <div style={{
        width: '200px',
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3]
      }}>
        <div style={{
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.bold,
          color: colors.text.blue.DEFAULT,
          fontFamily: typography.fontFamily.heading.join(', '),
          lineHeight: typography.lineHeight.none
        }}>
          Name
        </div>
      </div>

      {/* Other Columns */}
      <div style={{
        display: 'flex',
        gap: spacing[36], // Large gap to match design spacing
        alignItems: 'center',
        flex: 1
      }}>
        {columns.slice(1).map((column) => (
          <button
            key={column.id}
            onClick={() => onSort(column.id)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1.5],
              width: column.width
            }}
          >
            <div style={{
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.mono.join(', '),
              color: colors.text.blue.muted,
              textTransform: 'uppercase',
              lineHeight: typography.lineHeight.normal,
              textAlign: 'center'
            }}>
              {column.label}
            </div>
            
            {/* Sort Arrow */}
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none">
              <path 
                d="M1 1L4 3L7 1" 
                stroke={colors.text.blue.muted}
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  transform: sortField === column.id && sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                  transformOrigin: 'center'
                }}
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
} 