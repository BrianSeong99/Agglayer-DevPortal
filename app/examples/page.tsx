'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout';
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader';
import TabComponent from './components/TabComponent';
import FilterComponent from './components/FilterComponent';
import ExampleCard from './components/ExampleCard';
import TutorialCard from './components/TutorialCard';
import CodeBlock from '@/shared/components/CodeBlock';
import { examples } from './data/examples';
import { codeSnippets } from './data/codeSnippets';
import { tutorials } from './data/tutorials';
import { fadeInUp, staggerContainer, staggerItem } from '@/shared/config/animations';

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
    <DashboardLayout>
      <DashboardHeader
        title="Templates, Tutorials & Examples"
        subtitle="Learn by building with production-ready templates and step-by-step guides"
      />

      {/* Tab Navigation */}
      <div className="mb-8 flex justify-center">
        <TabComponent
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <motion.div
          {...fadeInUp}
        >
          {/* Filter Bar */}
          <div className="mb-8">
            <FilterComponent
              title="Filter by Category"
              options={templateCategories}
              selectedOptions={selectedCategories.length === 0 ? ['all'] : selectedCategories}
              onFilterChange={handleCategoryChange}
              multiSelect={false}
            />
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example) => (
              <ExampleCard
                key={example.id}
                title={example.title}
                description={example.description}
                techStack={example.techStack}
                stats={example.stats}
                demoUrl={example.urls.demo}
                codeUrl={example.urls.code}
                tutorialUrl={example.urls.tutorial}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <motion.div
          {...fadeInUp}
        >
          {/* Category Filter */}
          <div className="mb-8">
            <FilterComponent
              title="Filter by Category"
              options={tutorialCategories}
              selectedOptions={[selectedTutorialCategory]}
              onFilterChange={(categories) => setSelectedTutorialCategory(categories[0] || 'all')}
              multiSelect={false}
            />
          </div>

          {/* Tutorials organized by category */}
          <div className="space-y-12">
            {/* Concepts */}
            {(selectedTutorialCategory === 'all' || selectedTutorialCategory === 'concepts') && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Concepts</h3>
                <p className="text-[#D9D9D9] mb-4">
                  Understand the core architecture and components of Agglayer
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTutorials
                    .filter((t) => t.category === 'concepts')
                    .map((tutorial) => (
                      <TutorialCard
                        key={tutorial.id}
                        title={tutorial.title}
                        description={tutorial.description}
                        duration={tutorial.duration}
                        difficulty={tutorial.difficulty}
                        url={`/examples/tutorial/${tutorial.id}`}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {(selectedTutorialCategory === 'all' || selectedTutorialCategory === 'tools') && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Tools</h3>
                <p className="text-[#D9D9D9] mb-4">
                  Master the essential tools for building on Agglayer
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTutorials
                    .filter((t) => t.category === 'tools')
                    .map((tutorial) => (
                      <TutorialCard
                        key={tutorial.id}
                        title={tutorial.title}
                        description={tutorial.description}
                        duration={tutorial.duration}
                        difficulty={tutorial.difficulty}
                        url={`/examples/tutorial/${tutorial.id}`}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* App Tutorials */}
            {(selectedTutorialCategory === 'all' || selectedTutorialCategory === 'app-tutorials') && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">App Tutorials</h3>
                <p className="text-[#D9D9D9] mb-4">
                  Build real applications with increasing complexity
                </p>
                <div className="space-y-8">
                  {/* Beginner Apps */}
                  {filteredTutorials
                    .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Beginner')
                    .length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-[#D9D9D9] mb-3">Beginner</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTutorials
                          .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Beginner')
                          .map((tutorial) => (
                            <TutorialCard
                              key={tutorial.id}
                              title={tutorial.title}
                              description={tutorial.description}
                              duration={tutorial.duration}
                              difficulty={tutorial.difficulty}
                              url={`/examples/tutorial/${tutorial.id}`}
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
                      <h4 className="text-lg font-semibold text-[#D9D9D9] mb-3">Intermediate</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTutorials
                          .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Intermediate')
                          .map((tutorial) => (
                            <TutorialCard
                              key={tutorial.id}
                              title={tutorial.title}
                              description={tutorial.description}
                              duration={tutorial.duration}
                              difficulty={tutorial.difficulty}
                              url={`/examples/tutorial/${tutorial.id}`}
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
                      <h4 className="text-lg font-semibold text-[#D9D9D9] mb-3">Advanced</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTutorials
                          .filter((t) => t.category === 'app-tutorials' && t.difficulty === 'Advanced')
                          .map((tutorial) => (
                            <TutorialCard
                              key={tutorial.id}
                              title={tutorial.title}
                              description={tutorial.description}
                              duration={tutorial.duration}
                              difficulty={tutorial.difficulty}
                              url={`/examples/tutorial/${tutorial.id}`}
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
          {...fadeInUp}
        >
          {/* Category Filter */}
          <div className="mb-8">
            <FilterComponent
              title="Filter by Category"
              options={snippetCategories}
              selectedOptions={selectedSnippetCategory}
              onFilterChange={setSelectedSnippetCategory}
            />
          </div>

          {/* Snippet Cards */}
          <div className="space-y-6">
            {filteredSnippets.map((snippet) => (
              <motion.div
                key={snippet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#17171797] border border-white/10 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{snippet.title}</h3>
                <p className="text-sm text-[#D9D9D9] mb-4">{snippet.description}</p>
                <CodeBlock
                  code={snippet.code}
                  language={snippet.language}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}