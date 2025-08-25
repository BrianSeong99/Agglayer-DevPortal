'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import { Tabs, Tab } from '@/shared/components';
import { 
  ExamplesTabContent, 
  TutorialsTabContent, 
  CodeSnippetsTabContent 
} from './components';
import { examples } from './data/examples';
import { codeSnippets } from './data/codeSnippets';
import { tutorials } from './data/tutorials';
import { typography, colors, spacing, motionTokens, sizing } from '@/shared/design-system';

function ExamplesContent() {
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

  const tabs: Tab[] = [
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
                fontFamily: typography.textStyles.h2.fontFamily,
                fontWeight: typography.textStyles.h2.fontWeight,
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

      {/* Tab Navigation */}
      <Tabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content Area */}
      <div style={{ width: '940px', marginBottom: spacing[24], marginTop: `-${spacing[8]}` }}>
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

export default function ExamplesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExamplesContent />
    </Suspense>
  );
}