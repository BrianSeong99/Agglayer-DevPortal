'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import { 
  ExamplesTabContent, 
  TutorialsTabContent, 
  CodeSnippetsTabContent 
} from './components';
import { examples } from './data/examples';
import { codeSnippets } from './data/codeSnippets';
import { tutorials } from './data/tutorials';
import { typography, colors, spacing, motionTokens, sizing } from '@/shared/design-system';

export default function ExamplesPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('examples');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Handle URL parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['examples', 'tutorials', 'snippets'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'examples', label: 'Examples' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'snippets', label: 'Code Snippets' },
  ];

  const templateCategories = [
    { id: 'all', label: 'All' },
    { id: 'defi', label: 'DeFi' },
    { id: 'nft', label: 'NFT' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'social', label: 'Social' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  const snippetCategories = [
    { id: 'token-transfers', label: 'Token Transfers' },
    { id: 'message-passing', label: 'Message Passing' },
    { id: 'liquidity', label: 'Liquidity Management' },
    { id: 'error-handling', label: 'Error Handling' },
    { id: 'gas-optimization', label: 'Gas Optimization' },
  ];

  const handleCategoryChange = (categories: string[]) => {
    if (categories.includes('all') || categories.length === 0) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories);
    }
  };

  const filteredExamples = examples.filter((example) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(example.category);
  });

  const filteredSnippets = codeSnippets;

  return (
    <PageLayout theme="light">
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: sizing.container.lg
      }}>
        <PageHeader
          title={
            <>
              Templates, Tutorials{' '}
              <span style={{ 
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
                color: colors.primary.DEFAULT 
              }}>
                & Examples
              </span>
            </>
          }
          subtitle="Learn by building with production-ready templates and step-by-step guides"
          theme="light"
        />
      </div>

      {/* Tab Navigation and Filter Row */}
      <motion.div 
        initial={motionTokens.section.initial}
        whileInView={motionTokens.section.whileInView}
        transition={motionTokens.section.transition}
        viewport={{ once: true }}
        style={{ width: '940px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {/* Tab Navigation */}
        <div style={{
          backgroundColor: '#E4F5FF',
          borderRadius: '40.5px',
          padding: spacing[1.5],
          display: 'flex',
          alignItems: 'center',
          height: '31px'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? colors.primary.DEFAULT : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : colors.primary.DEFAULT,
                border: 'none',
                borderRadius: '36px',
                padding: `${spacing[1.5]} ${spacing[2]}`,
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeTab === tab.id ? typography.fontWeight.bold : typography.fontWeight.medium,
                cursor: 'pointer',
                height: '22px',
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
      </motion.div>

      {/* Content Area */}
      <div style={{ width: '940px', marginBottom: spacing[24] }}>
        {/* Examples Tab */}
        <ExamplesTabContent 
          examples={filteredExamples} 
          isActive={activeTab === 'examples'} 
        />

        {/* Tutorials Tab */}
        <TutorialsTabContent 
          tutorials={tutorials} 
          isActive={activeTab === 'tutorials'} 
        />

        {/* Code Snippets Tab */}
        <CodeSnippetsTabContent 
          snippets={filteredSnippets} 
          isActive={activeTab === 'snippets'} 
        />
      </div>
    </PageLayout>
  );
}