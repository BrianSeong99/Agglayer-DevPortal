'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { typography, colors, spacing, radius } from '@/shared/design-system';
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
          return <span key={index} style={{ color: colors.text.tertiary }}>{token}</span>;
        }

        // Commands and keywords
        if (bashKeywords.has(token)) {
          return <span key={index} style={{ color: colors.environment.bali }}>{token}</span>;
        }

        // Flags and operators
        if (bashOperators.has(token) || token.startsWith('--') || token.startsWith('-')) {
          return <span key={index} style={{ color: colors.semantic.error }}>{token}</span>;
        }

        // Strings in quotes
        if ((token.startsWith('"') && token.endsWith('"')) || 
            (token.startsWith("'") && token.endsWith("'"))) {
          return <span key={index} style={{ color: colors.semantic.success }}>{token}</span>;
        }

        // URLs and addresses (containing dots or 0x)
        if (token.includes('.') || token.startsWith('0x') || token.includes('@')) {
          return <span key={index} style={{ color: colors.environment.agglayer }}>{token}</span>;
        }

        // Numbers
        if (/^\d+\.?\d*$/.test(token)) {
          return <span key={index} style={{ color: colors.semantic.warning }}>{token}</span>;
        }

        // Default
        return <span key={index} style={{ color: colors.text.blue.DEFAULT }}>{token}</span>;
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
          return <span key={index} style={{ color: colors.text.tertiary }}>{token}</span>;
        }
        if (prevToken === '/' && token === '/') {
          return <span key={index} style={{ color: colors.text.tertiary }}>{token}</span>;
        }
        if (inComment) {
          return <span key={index} style={{ color: colors.text.tertiary }}>{token}</span>;
        }

        // Strings
        if (token === '"' || token === "'" || token === '`') {
          return <span key={index} style={{ color: colors.semantic.success }}>{token}</span>;
        }
        if (inString) {
          return <span key={index} style={{ color: colors.semantic.success }}>{token}</span>;
        }

        // Keywords
        if (keywords.has(token)) {
          return <span key={index} style={{ color: colors.environment.bali }}>{token}</span>;
        }

        // Types and built-ins
        if (types.has(token)) {
          return <span key={index} style={{ color: colors.primary.DEFAULT }}>{token}</span>;
        }

        // Numbers
        if (/^\d+\.?\d*$/.test(token)) {
          return <span key={index} style={{ color: colors.semantic.warning }}>{token}</span>;
        }

        // Function calls (token followed by '(')
        if (nextToken === '(' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} style={{ color: colors.semantic.error }}>{token}</span>;
        }

        // Object properties (after '.')
        if (prevToken === '.' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} style={{ color: colors.environment.agglayer }}>{token}</span>;
        }

        // Object keys (before ':')
        if (nextToken === ':' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} style={{ color: colors.environment.agglayer }}>{token}</span>;
        }

        // Operators
        if (/^(===|!==|==|!=|<=|>=|&&|\|\||=>|\+\+|--|\.\.\.|\+|-|\*|\/|%|=|!|\?|:|<|>)$/.test(token)) {
          return <span key={index} style={{ color: colors.environment.cardona }}>{token}</span>;
        }

        // Default
        return <span key={index} style={{ color: colors.text.blue.DEFAULT }}>{token}</span>;
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
      backgroundColor: colors.background.secondary,
      borderRadius: radius.lg,
      overflow: 'hidden',
      border: `1px solid ${colors.border.light}`,
      ...className && { className }
    }}>
      {/* Header with tabs and copy button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing[4],
        backgroundColor: colors.background.secondary,
        borderBottom: `1px solid ${colors.border.light}`
      }}>
        {/* Language Tabs */}
        <div style={{
          backgroundColor: colors.background.primary,
          borderRadius: radius.round,
          padding: `${spacing[1.5]}`,
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          gap: spacing[2.5]
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'typescript' | 'bash')}
              className="transition-all duration-300"
              style={{
                backgroundColor: activeTab === tab.id ? colors.primary.DEFAULT : 'transparent',
                border: 'none',
                borderRadius: radius.round,
                padding: `${spacing[1.5]} ${spacing[3]}`,
                fontSize: typography.fontSize.xs,
                fontFamily: typography.textStyles.button.fontFamily,
                fontWeight: activeTab === tab.id ? typography.fontWeight.bold : typography.fontWeight.medium,
                color: activeTab === tab.id ? colors.background.primary : colors.primary.DEFAULT,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                lineHeight: typography.textStyles.button.lineHeight,
                height: '30px',
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
            backgroundColor: copied ? colors.background.tertiary : undefined,
            color: copied ? colors.semantic.success : undefined,
            border: copied ? `1px solid ${colors.semantic.info}` : undefined,
            fontSize: typography.fontSize.xs,
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
        backgroundColor: colors.background.primary,
        fontFamily: typography.textStyles.code.fontFamily,
        fontSize: typography.fontSize.xs,
        lineHeight: typography.textStyles.code.lineHeight,
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Language indicator in top-right corner */}
        <div style={{
          position: 'absolute',
          top: spacing[2],
          right: spacing[2],
          fontSize: typography.fontSize['3xs'],
          fontFamily: typography.textStyles.bodySmall.fontFamily,
          fontWeight: typography.fontWeight.medium,
          color: colors.text.tertiary,
          backgroundColor: colors.background.secondary,
          border: `1px solid ${colors.border.light}`,
          borderRadius: radius.sm,
          padding: `${spacing[0.5]} ${spacing[1]}`,
          lineHeight: typography.textStyles.bodySmall.lineHeight,
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
                    color: colors.text.quaternary,
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