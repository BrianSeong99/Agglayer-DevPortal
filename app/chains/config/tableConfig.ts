// Shared table configuration for chains page
export const TABLE_CONFIG = {
  columns: {
    name: '150px',
    gasToken: '67px',
    blockTime: '50px',
    tps: '50px',
    activity: '50px',
    expandButton: '11.984px'
  },
  spacing: {
    gap: '24px', // spacing[6] equivalent
    padding: '16px' // spacing[4] equivalent
  }
} as const; 