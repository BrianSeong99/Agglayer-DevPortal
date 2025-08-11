'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/shared/components/layouts/PageLayout';
import PageHeader from '@/shared/components/layouts/PageHeader';
import TabComponent from './components/TabComponent';
import ExampleCard from './components/ExampleCard';
import TutorialCard from './components/TutorialCard';
import CodeBlock from '@/shared/components/CodeBlock';
import { examples } from './data/examples';
import { codeSnippets } from './data/codeSnippets';
import { tutorials } from './data/tutorials';
import { typography, colors, spacing, motionTokens } from '@/shared/design-system';

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState('examples');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTutorialCategory, setSelectedTutorialCategory] = useState<string>('all');
  const [selectedSnippetCategory, setSelectedSnippetCategory] = useState<string[]>([]);

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

  const tutorialCategories = [
    { id: 'all', label: 'All Categories' },
    { id: 'concepts', label: 'Concepts' },
    { id: 'tools', label: 'Tools' },
    { id: 'app-tutorials', label: 'App Tutorials' },
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

  const filteredTutorials = tutorials.filter((tutorial) => {
    if (selectedTutorialCategory === 'all') return true;
    return tutorial.category === selectedTutorialCategory;
  });

  const filteredSnippets = codeSnippets.filter((snippet) => {
    if (selectedSnippetCategory.length === 0) return true;
    return selectedSnippetCategory.includes(snippet.category);
  });

  return (
    <PageLayout theme="light">
      <PageHeader
        title="Templates, Tutorials & Examples"
        subtitle="Learn by building with production-ready templates and step-by-step guides"
        theme="light"
      />

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

        {/* Category Filter */}
        <div style={{
          border: `1px solid ${colors.primary.DEFAULT}`,
          borderRadius: '37.5px',
          padding: `${spacing[1]} ${spacing[2.5]}`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[1.5],
          cursor: 'pointer'
        }}>
          <span style={{
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: typography.fontWeight.medium,
            color: colors.primary.DEFAULT,
            lineHeight: 1.08
          }}>
            Category
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke={colors.primary.DEFAULT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>

      {/* Content Area */}
      <div style={{ width: '940px', marginBottom: spacing[24] }}>
        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <motion.div
            initial={motionTokens.section.initial}
            whileInView={motionTokens.section.whileInView}
            transition={motionTokens.section.transition}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}
          >
            {/* Examples Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: spacing[3],
              width: '100%'
            }}>
              {filteredExamples.slice(0, 6).map((example, index) => (
                <ExampleCard
                  key={example.id}
                  title={example.title}
                  description={example.description}
                  techStack={example.techStack}
                  stats={example.stats}
                  demoUrl={example.urls.demo}
                  codeUrl={example.urls.code}
                  tutorialUrl={example.urls.tutorial}
                  index={index}
                />
              ))}
            </div>

            {/* Explore All Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing[6] }}>
              <button style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: spacing[1.5],
                padding: `${spacing[2]} ${spacing[4]}`,
                borderRadius: '45px',
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: typography.fontWeight.regular,
                color: 'rgba(17,17,17,0.6)',
                lineHeight: 1.08
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 8L8 14M14 8H2" stroke="rgba(17,17,17,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Explore all
              </button>
            </div>
          </motion.div>
        )}

        {/* Tutorials Tab */}
        {activeTab === 'tutorials' && (
          <motion.div
            initial={motionTokens.section.initial}
            whileInView={motionTokens.section.whileInView}
            transition={motionTokens.section.transition}
            viewport={{ once: true }}
          >
            {/* Tutorials organized by category */}
            <div className="space-y-12">
              {/* Concepts */}
              {(selectedTutorialCategory === 'all' || selectedTutorialCategory === 'concepts') && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Concepts</h3>
                  <p className="text-[rgba(0,0,0,0.6)] mb-4">
                    Understand the core architecture and components of Agglayer
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTutorials
                      .filter((t) => t.category === 'concepts')
                      .map((tutorial, index) => (
                        <TutorialCard
                          key={tutorial.id}
                          title={tutorial.title}
                          description={tutorial.description}
                          duration={tutorial.duration}
                          difficulty={tutorial.difficulty}
                          url={`/examples/tutorial/${tutorial.id}`}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {(selectedTutorialCategory === 'all' || selectedTutorialCategory === 'tools') && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Tools</h3>
                  <p className="text-[rgba(0,0,0,0.6)] mb-4">
                    Master the essential tools for building on Agglayer
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTutorials
                      .filter((t) => t.category === 'tools')
                      .map((tutorial, index) => (
                        <TutorialCard
                          key={tutorial.id}
                          title={tutorial.title}
                          description={tutorial.description}
                          duration={tutorial.duration}
                          difficulty={tutorial.difficulty}
                          url={`/examples/tutorial/${tutorial.id}`}
                          index={index}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* App Tutorials */}
              {(selectedTutorialCategory === 'all' || selectedTutorialCategory === 'app-tutorials') && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">App Tutorials</h3>
                  <p className="text-[rgba(0,0,0,0.6)] mb-4">
                    Build real applications with increasing complexity
                  </p>
                  <div className="space-y-8">
                    {/* Beginner Apps */}
                    {filteredTutorials
                      .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Beginner')
                      .length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-[rgba(0,0,0,0.6)] mb-3">Beginner</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredTutorials
                            .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Beginner')
                            .map((tutorial, index) => (
                              <TutorialCard
                                key={tutorial.id}
                                title={tutorial.title}
                                description={tutorial.description}
                                duration={tutorial.duration}
                                difficulty={tutorial.difficulty}
                                url={`/examples/tutorial/${tutorial.id}`}
                                index={index}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Intermediate Apps */}
                    {filteredTutorials
                      .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Intermediate')
                      .length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-[rgba(0,0,0,0.6)] mb-3">Intermediate</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredTutorials
                            .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Intermediate')
                            .map((tutorial, index) => (
                              <TutorialCard
                                key={tutorial.id}
                                title={tutorial.title}
                                description={tutorial.description}
                                duration={tutorial.duration}
                                difficulty={tutorial.difficulty}
                                url={`/examples/tutorial/${tutorial.id}`}
                                index={index}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Advanced Apps */}
                    {filteredTutorials
                      .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Advanced')
                      .length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-[rgba(0,0,0,0.6)] mb-3">Advanced</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredTutorials
                            .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Advanced')
                            .map((tutorial, index) => (
                              <TutorialCard
                                key={tutorial.id}
                                title={tutorial.title}
                                description={tutorial.description}
                                duration={tutorial.duration}
                                difficulty={tutorial.difficulty}
                                url={`/examples/tutorial/${tutorial.id}`}
                                index={index}
                              />
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Code Snippets Tab */}
        {activeTab === 'snippets' && (
          <motion.div
            initial={motionTokens.section.initial}
            whileInView={motionTokens.section.whileInView}
            transition={motionTokens.section.transition}
            viewport={{ once: true }}
          >
            {/* Snippet Cards */}
            <div className="space-y-6">
              {filteredSnippets.map((snippet) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#F7FAFE] border border-[rgba(0,113,247,0.1)] rounded-lg p-6"
                >
                  <h3 className="text-lg font-bold text-black mb-2">{snippet.title}</h3>
                  <p className="text-sm text-[rgba(0,0,0,0.6)] mb-4">{snippet.description}</p>
                  <CodeBlock
                    code={snippet.code}
                    language={snippet.language}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}