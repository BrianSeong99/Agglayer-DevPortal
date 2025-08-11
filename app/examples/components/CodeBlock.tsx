'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing } from '@/shared/design-system';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

// Simple syntax highlighting for TypeScript/JavaScript
const SyntaxHighlighter = ({ code, language }: { code: string; language: string }) => {
  if (language !== 'typescript' && language !== 'javascript') {
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
  language = 'typescript',
  showLineNumbers = false,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div style={{ 
      position: 'relative',
      backgroundColor: '#F7FAFE',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgba(0,113,247,0.1)',
      ...className && { className }
    }}>
      {/* Header with language and copy button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing[4],
        backgroundColor: '#EAF3FD',
        borderBottom: '1px solid rgba(0,113,247,0.1)'
      }}>
        {language && (
          <span style={{
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: typography.fontWeight.medium,
            color: colors.primary.DEFAULT,
            backgroundColor: 'rgba(0,113,247,0.05)',
            border: '1px solid rgba(0,113,247,0.14)',
            borderRadius: '3px',
            padding: `${spacing[1]} ${spacing[2]}`,
            lineHeight: '12px'
          }}>
            {language.toUpperCase()}
          </span>
        )}
        
        <button
          onClick={copyToClipboard}
          style={{
            backgroundColor: copied ? 'rgba(34, 197, 94, 0.1)' : '#ffffff',
            color: copied ? '#22C55E' : colors.primary.DEFAULT,
            border: `1px solid ${copied ? 'rgba(34, 197, 94, 0.3)' : 'rgba(0,113,247,0.14)'}`,
            borderRadius: '3px',
            padding: `${spacing[2]} ${spacing[3]}`,
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: typography.fontWeight.medium,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1],
            lineHeight: '12px',
            transition: 'all 0.2s ease'
          }}
        >
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
        </button>
      </div>

      {/* Code content */}
      <div style={{
        padding: spacing[6],
        backgroundColor: '#FFFFFF',
        fontFamily: 'SF Mono, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        fontSize: '12px',
        lineHeight: 1.5,
        overflow: 'auto'
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            {showLineNumbers ? (
              lines.map((line, index) => (
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
                    <SyntaxHighlighter code={line} language={language} />
                  </span>
                </div>
              ))
            ) : (
              <SyntaxHighlighter code={code} language={language} />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}