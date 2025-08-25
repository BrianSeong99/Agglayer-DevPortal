'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing } from '@/shared/design-system';
import { Button, Tabs, Tab } from '@/shared/components';

interface CodeBlockProps {
  code: Array<{
    language: 'typescript' | 'bash';
    label: string;
    content: string;
  }>;
  showLineNumbers?: boolean;
  className?: string;
}

// Simple bash highlighting
const BashHighlighter = ({ code }: { code: string }) => {
  const tokens = code.split(/(\s+|[^\w\s]+)/g).filter(Boolean);
  
  const bashKeywords = new Set([
    'aggsandbox', 'bridge', 'transfer', 'balance', 'check', 'events', 'listen', 
    'filter', 'message', 'send', 'defi', 'add-liquidity', 'batch', 'echo', 
    'cd', 'ls', 'cat', 'grep', 'awk', 'sed', 'sort', 'uniq', 'head', 'tail'
  ]);

  const bashOperators = new Set(['--', '-', '&&', '||', '|', '>', '>>', '<', '\\']);

  return (
    <>
      {tokens.map((token, index) => {
        // Comments (lines starting with #)
        if (token.startsWith('#')) {
          return <span key={index} style={{ color: 'rgba(0,46,101,0.5)' }}>{token}</span>;
        }

        // Commands and keywords
        if (bashKeywords.has(token)) {
          return <span key={index} style={{ color: '#7C3AED' }}>{token}</span>;
        }

        // Flags and operators
        if (bashOperators.has(token) || token.startsWith('--') || token.startsWith('-')) {
          return <span key={index} style={{ color: '#DC2626' }}>{token}</span>;
        }

        // Strings in quotes
        if ((token.startsWith('"') && token.endsWith('"')) || 
            (token.startsWith("'") && token.endsWith("'"))) {
          return <span key={index} style={{ color: '#059669' }}>{token}</span>;
        }

        // URLs and addresses (containing dots or 0x)
        if (token.includes('.') || token.startsWith('0x') || token.includes('@')) {
          return <span key={index} style={{ color: '#0891B2' }}>{token}</span>;
        }

        // Numbers
        if (/^\d+\.?\d*$/.test(token)) {
          return <span key={index} style={{ color: '#EA580C' }}>{token}</span>;
        }

        // Default
        return <span key={index} style={{ color: 'rgba(0,46,101,0.9)' }}>{token}</span>;
      })}
    </>
  );
};

// Simple syntax highlighting for TypeScript/JavaScript/Bash
const SyntaxHighlighter = ({ code, language }: { code: string; language: 'typescript' | 'bash' }) => {
  if (language === 'bash') {
    return <BashHighlighter code={code} />;
  }
  
  if (language !== 'typescript') {
    return <>{code}</>;
  }

  // Split code into tokens for highlighting
  const tokens = code.split(/(\b|\s+|[^\w\s]+)/g).filter(Boolean);
  
  const keywords = new Set([
    'const', 'let', 'var', 'function', 'async', 'await', 'return', 'if', 'else',
    'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch',
    'finally', 'throw', 'new', 'this', 'super', 'class', 'extends', 'export',
    'import', 'from', 'default', 'interface', 'type', 'enum', 'namespace', 'module',
    'declare', 'as', 'implements', 'static', 'private', 'public', 'protected',
    'readonly', 'abstract'
  ]);

  const types = new Set([
    'string', 'number', 'boolean', 'void', 'null', 'undefined', 'any', 'never',
    'unknown', 'object', 'symbol', 'bigint', 'true', 'false', 'console', 'window',
    'document', 'Math', 'Date', 'Array', 'Object', 'Promise', 'Error', 'agglayer',
    'ethers', 'utils'
  ]);

  const isInString = (index: number, tokens: string[]): boolean => {
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < index; i++) {
      const token = tokens[i];
      if (!inString && (token === '"' || token === "'" || token === '`')) {
        inString = true;
        stringChar = token;
      } else if (inString && token === stringChar) {
        inString = false;
      }
    }
    
    return inString;
  };

  const isInComment = (index: number, tokens: string[]): boolean => {
    for (let i = 0; i < index; i++) {
      if (tokens[i] === '/' && tokens[i + 1] === '/') {
        // Check if we're on the same line
        let newlineFound = false;
        for (let j = i + 2; j < index; j++) {
          if (tokens[j].includes('\n')) {
            newlineFound = true;
            break;
          }
        }
        if (!newlineFound) return true;
      }
    }
    return false;
  };

  return (
    <>
      {tokens.map((token, index) => {
        const prevToken = tokens[index - 1];
        const nextToken = tokens[index + 1];
        const inString = isInString(index, tokens);
        const inComment = isInComment(index, tokens);

        // Comments
        if (token === '/' && nextToken === '/') {
          return <span key={index} style={{ color: 'rgba(0,46,101,0.5)' }}>{token}</span>;
        }
        if (prevToken === '/' && token === '/') {
          return <span key={index} style={{ color: 'rgba(0,46,101,0.5)' }}>{token}</span>;
        }
        if (inComment) {
          return <span key={index} style={{ color: 'rgba(0,46,101,0.5)' }}>{token}</span>;
        }

        // Strings
        if (token === '"' || token === "'" || token === '`') {
          return <span key={index} style={{ color: '#059669' }}>{token}</span>;
        }
        if (inString) {
          return <span key={index} style={{ color: '#059669' }}>{token}</span>;
        }

        // Keywords
        if (keywords.has(token)) {
          return <span key={index} style={{ color: '#7C3AED' }}>{token}</span>;
        }

        // Types and built-ins
        if (types.has(token)) {
          return <span key={index} style={{ color: colors.primary.DEFAULT }}>{token}</span>;
        }

        // Numbers
        if (/^\d+\.?\d*$/.test(token)) {
          return <span key={index} style={{ color: '#EA580C' }}>{token}</span>;
        }

        // Function calls (token followed by '(')
        if (nextToken === '(' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} style={{ color: '#DC2626' }}>{token}</span>;
        }

        // Object properties (after '.')
        if (prevToken === '.' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} style={{ color: '#0891B2' }}>{token}</span>;
        }

        // Object keys (before ':')
        if (nextToken === ':' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} style={{ color: '#0891B2' }}>{token}</span>;
        }

        // Operators
        if (/^(===|!==|==|!=|<=|>=|&&|\|\||=>|\+\+|--|\.\.\.|\+|-|\*|\/|%|=|!|\?|:|<|>)$/.test(token)) {
          return <span key={index} style={{ color: '#BE185D' }}>{token}</span>;
        }

        // Default
        return <span key={index} style={{ color: 'rgba(0,46,101,0.9)' }}>{token}</span>;
      })}
    </>
  );
};

export default function CodeBlock({
  code,
  showLineNumbers = false,
  className = '',
}: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState<'typescript' | 'bash'>(code[0]?.language || 'typescript');
  const [copied, setCopied] = useState(false);

  const activeCode = code.find(c => c.language === activeTab) || code[0];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(activeCode.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeCode.content.split('\n');

  // Create tabs from the code array
  const tabs: Tab[] = code.map(c => ({
    id: c.language,
    label: c.label
  }));

  return (
    <div style={{ 
      position: 'relative',
      backgroundColor: '#F7FAFE',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgba(0,113,247,0.1)',
      ...className && { className }
    }}>
      {/* Header with tabs and copy button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing[4],
        backgroundColor: '#EAF3FD',
        borderBottom: '1px solid rgba(0,113,247,0.1)'
      }}>
        {/* Language Tabs */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '40.5px',
          padding: spacing[1.5],
          display: 'flex',
          alignItems: 'center',
          height: 'auto'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'typescript' | 'bash')}
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
        
        <Button
          variant="secondary"
          onClick={copyToClipboard}
          style={{
            width: '80px',
            minWidth: '80px',
            maxWidth: '80px',
            backgroundColor: copied ? 'rgba(34, 197, 94, 0.1)' : undefined,
            color: copied ? '#22C55E' : undefined,
            border: copied ? '1px solid rgba(34, 197, 94, 0.3)' : undefined,
            fontSize: '10px',
            padding: `${spacing[2]} ${spacing[3]}`,
            gap: spacing[1],
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: spacing[1] }}>
            {copied ? (
              <>
                <CheckIcon style={{ width: '12px', height: '12px' }} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <DocumentDuplicateIcon style={{ width: '12px', height: '12px' }} />
                <span>Copy</span>
              </>
            )}
          </span>
        </Button>
      </div>

      {/* Code content */}
      <div style={{
        padding: spacing[6],
        backgroundColor: '#FFFFFF',
        fontFamily: 'SF Mono, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        fontSize: '12px',
        lineHeight: 1.5,
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Language indicator in top-right corner */}
        <div style={{
          position: 'absolute',
          top: spacing[2],
          right: spacing[2],
          fontSize: '8px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: typography.fontWeight.medium,
          color: 'rgba(0,46,101,0.6)',
          backgroundColor: 'rgba(0,113,247,0.05)',
          border: '1px solid rgba(0,113,247,0.1)',
          borderRadius: '4px',
          padding: `${spacing[0.5]} ${spacing[1]}`,
          lineHeight: '10px',
          textTransform: 'uppercase'
        }}>
          {activeCode.language}
        </div>

        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            {showLineNumbers ? (
              lines.map((line: string, index: number) => (
                <div key={index} style={{ display: 'flex' }}>
                  <span style={{
                    color: 'rgba(0,46,101,0.4)',
                    marginRight: spacing[4],
                    userSelect: 'none',
                    width: '32px',
                    textAlign: 'right',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </span>
                  <span style={{ flex: 1 }}>
                    <SyntaxHighlighter code={line} language={activeCode.language} />
                  </span>
                </div>
              ))
            ) : (
              <SyntaxHighlighter code={activeCode.content} language={activeCode.language} />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}