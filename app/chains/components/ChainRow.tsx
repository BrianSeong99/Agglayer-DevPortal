import { motion } from 'framer-motion';
import { typography, colors, spacing } from '@/shared/design-system';
import { type Chain } from '../data/chains';

interface ChainRowProps {
  chain: Chain;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onCopyRpc: (rpcUrl: string, chainId: number) => void;
  copiedChainId: number | null;
}

export default function ChainRow({ 
  chain, 
  isExpanded, 
  onToggleExpand, 
  onCopyRpc, 
  copiedChainId 
}: ChainRowProps) {
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Live': 
        return { 
          bg: '#E9FFE9', 
          text: '#008000', 
          border: '#008000' 
        };
      case 'Testnet': 
        return { 
          bg: '#FFF4E0', 
          text: '#D18B0C', 
          border: '#D18B0C' 
        };
      default: 
        return { 
          bg: 'rgba(0,113,247,0.05)', 
          text: colors.primary.DEFAULT, 
          border: 'rgba(0,113,247,0.14)' 
        };
    }
  };

  const statusStyle = getStatusStyle(chain.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: isExpanded ? '#E9F3FF' : '#F7FAFE',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: spacing[3]
      }}
    >
      {/* Main Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: isExpanded ? spacing[4] : `0 ${spacing[4]}`,
        height: '47px',
        cursor: 'pointer'
      }}
      onClick={onToggleExpand}
      >
        {/* Chain Info */}
        <div style={{
          width: '200px',
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3]
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: colors.primary.DEFAULT,
            borderRadius: '0px'
          }} />
          
          <div style={{
            fontSize: '15px',
            fontWeight: typography.fontWeight.bold,
            color: 'rgba(0,46,101,0.9)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: '1.08'
          }}>
            {chain.name}
          </div>
        </div>

        {/* Chain Data */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          width: '555px'
        }}>
          <div style={{
            width: '67px',
            fontSize: '12px',
            fontFamily: 'SF Mono, monospace',
            color: 'rgba(0,46,101,0.8)',
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            {chain.gasToken}
          </div>

          <div style={{
            width: '75px',
            fontSize: '12px',
            fontFamily: 'SF Mono, monospace',
            color: 'rgba(0,46,101,0.8)',
            textAlign: 'right',
            lineHeight: '1.5'
          }}>
            {chain.blockTime}
          </div>

          <div style={{
            width: '100px',
            fontSize: '12px',
            fontFamily: 'SF Mono, monospace',
            color: 'rgba(0,46,101,0.8)',
            textAlign: 'right',
            lineHeight: '1.5'
          }}>
            {chain.tps}
          </div>
        </div>

        {/* Status Badge */}
        <div style={{
          backgroundColor: statusStyle.bg,
          color: statusStyle.text,
          border: `1px solid ${statusStyle.border}`,
          borderRadius: '6px',
          padding: `${spacing[1]} ${spacing[2.5]}`,
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: typography.fontWeight.medium,
          lineHeight: '1.08'
        }}>
          {chain.status}
        </div>

        {/* Expand Arrow */}
        <div style={{
          marginLeft: spacing[4],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '12px',
          height: '12px'
        }}>
          <svg 
            width="11" 
            height="12" 
            viewBox="0 0 11 12" 
            fill="none"
            style={{
              transform: isExpanded ? 'rotate(270deg)' : 'rotate(90deg)',
              transition: 'transform 0.2s ease'
            }}
          >
            <path 
              d="M3 4L5.5 6.5L8 4" 
              stroke="rgba(0,46,101,0.8)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            borderTop: '1px solid #D8EAFF',
            padding: spacing[4],
            display: 'flex',
            gap: spacing[3]
          }}
        >
          {/* Chain ID */}
          <div style={{
            flex: 1,
            backgroundColor: '#F7FAFE',
            borderRadius: '6px',
            padding: spacing[4],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: '1.5'
            }}>
              Chain ID
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1]
            }}>
              <div style={{
                fontSize: '12px',
                fontFamily: 'SF Mono, monospace',
                fontWeight: typography.fontWeight.semibold,
                color: colors.primary.DEFAULT,
                lineHeight: '1.5'
              }}>
                {chain.chainId}
              </div>
              
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path 
                  d="M8 8V9C8 9.55 7.55 10 7 10H3C2.45 10 2 9.55 2 9V5C2 4.45 2.45 4 3 4H4M6 2H9C9.55 2 10 2.45 10 3V6C10 6.55 9.55 7 9 7H6C5.45 7 5 6.55 5 6V3C5 2.45 5.45 2 6 2Z" 
                  stroke={colors.primary.DEFAULT} 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* RPC Endpoint */}
          <div style={{
            flex: 1,
            backgroundColor: '#F7FAFE',
            borderRadius: '6px',
            padding: spacing[4],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: '1.5'
            }}>
              RPC Endpoint
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopyRpc(chain.rpcUrl, chain.chainId);
              }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: spacing[1]
              }}
            >
              <div style={{
                fontSize: '12px',
                fontFamily: 'SF Mono, monospace',
                fontWeight: typography.fontWeight.semibold,
                color: colors.primary.DEFAULT,
                lineHeight: '1.5'
              }}>
                {copiedChainId === chain.chainId ? 'Copied!' : 'Copy'}
              </div>
              
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path 
                  d="M8 8V9C8 9.55 7.55 10 7 10H3C2.45 10 2 9.55 2 9V5C2 4.45 2.45 4 3 4H4M6 2H9C9.55 2 10 2.45 10 3V6C10 6.55 9.55 7 9 7H6C5.45 7 5 6.55 5 6V3C5 2.45 5.45 2 6 2Z" 
                  stroke={colors.primary.DEFAULT} 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Explorer */}
          <div style={{
            flex: 1,
            backgroundColor: '#F7FAFE',
            borderRadius: '6px',
            padding: spacing[4],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: '1.5'
            }}>
              Explorer
            </div>
            
            <a
              href={chain.blockExplorer}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: spacing[1]
              }}
            >
              <div style={{
                fontSize: '12px',
                fontFamily: 'SF Mono, monospace',
                fontWeight: typography.fontWeight.semibold,
                color: colors.primary.DEFAULT,
                lineHeight: '1.5'
              }}>
                View
              </div>
              
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path 
                  d="M9 3L3 9M9 3H5M9 3V7" 
                  stroke={colors.primary.DEFAULT} 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Documentation */}
          <div style={{
            flex: 1,
            backgroundColor: '#F7FAFE',
            borderRadius: '6px',
            padding: spacing[4],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(0,46,101,0.8)',
              lineHeight: '1.5'
            }}>
              Documentation
            </div>
            
            <a
              href="https://docs.agglayer.dev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: spacing[1]
              }}
            >
              <div style={{
                fontSize: '12px',
                fontFamily: 'SF Mono, monospace',
                fontWeight: typography.fontWeight.semibold,
                color: colors.primary.DEFAULT,
                lineHeight: '1.5'
              }}>
                Docs
              </div>
              
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path 
                  d="M9 3L3 9M9 3H5M9 3V7" 
                  stroke={colors.primary.DEFAULT} 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 