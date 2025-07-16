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
          <code className="text-sm">
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 mr-4 select-none w-8 text-right">
                    {index + 1}
                  </span>
                  <span className="text-gray-200">{line}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-200">{code}</span>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}