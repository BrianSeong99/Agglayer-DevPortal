'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

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
          return <span key={index} className="text-gray-500">{token}</span>;
        }
        if (prevToken === '/' && token === '/') {
          return <span key={index} className="text-gray-500">{token}</span>;
        }
        if (inComment) {
          return <span key={index} className="text-gray-500">{token}</span>;
        }

        // Strings
        if (token === '"' || token === "'" || token === '`') {
          return <span key={index} className="text-green-400">{token}</span>;
        }
        if (inString) {
          return <span key={index} className="text-green-400">{token}</span>;
        }

        // Keywords
        if (keywords.has(token)) {
          return <span key={index} className="text-purple-400">{token}</span>;
        }

        // Types and built-ins
        if (types.has(token)) {
          return <span key={index} className="text-cyan-400">{token}</span>;
        }

        // Numbers
        if (/^\d+\.?\d*$/.test(token)) {
          return <span key={index} className="text-orange-400">{token}</span>;
        }

        // Function calls (token followed by '(')
        if (nextToken === '(' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} className="text-yellow-300">{token}</span>;
        }

        // Object properties (after '.')
        if (prevToken === '.' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} className="text-blue-300">{token}</span>;
        }

        // Object keys (before ':')
        if (nextToken === ':' && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
          return <span key={index} className="text-blue-300">{token}</span>;
        }

        // Operators
        if (/^(===|!==|==|!=|<=|>=|&&|\|\||=>|\+\+|--|\.\.\.|\+|-|\*|\/|%|=|!|\?|:|<|>)$/.test(token)) {
          return <span key={index} className="text-pink-400">{token}</span>;
        }

        // Default
        return <span key={index} className="text-gray-200">{token}</span>;
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
    <div className={`relative group ${className}`}>
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {language && (
          <span className="text-xs text-gray-400 px-2 py-1 bg-black/50 rounded">
            {language}
          </span>
        )}
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-black/50 hover:bg-black/70"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-400" />
          ) : (
            <DocumentDuplicateIcon className="w-4 h-4 text-gray-400" />
          )}
        </Button>
      </div>

      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 mr-4 select-none w-8 text-right">
                    {index + 1}
                  </span>
                  <span className="flex-1">
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