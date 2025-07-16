'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout';
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader';
import TabComponent from './components/TabComponent';
import FilterComponent from './components/FilterComponent';
import TemplateCard from './components/TemplateCard';
import TutorialCard from './components/TutorialCard';
import CodeBlock from '@/shared/components/CodeBlock';
import { templates } from './data/templates';
import { codeSnippets } from './data/codeSnippets';
import { tutorials } from './data/tutorials';

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedSnippetCategory, setSelectedSnippetCategory] = useState<string[]>([]);

  const tabs = [
    { id: 'templates', label: 'Templates' },
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

  const difficultyLevels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
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

  const handleDifficultyChange = (difficulties: string[]) => {
    if (difficulties.includes('all') || difficulties.length === 0) {
      setSelectedDifficulty([]);
    } else {
      setSelectedDifficulty(difficulties);
    }
  };

  const filteredTemplates = templates.filter((template) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(template.category);
  });

  const filteredTutorials = tutorials.filter((tutorial) => {
    if (selectedDifficulty.length === 0) return true;
    return selectedDifficulty.includes(tutorial.difficulty.toLowerCase());
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

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                title={template.title}
                description={template.description}
                techStack={template.techStack}
                stats={template.stats}
                features={template.features}
                demoUrl={template.urls.demo}
                codeUrl={template.urls.code}
                tutorialUrl={template.urls.tutorial}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Difficulty Filter */}
          <div className="mb-8">
            <FilterComponent
              title="Filter by Difficulty"
              options={difficultyLevels}
              selectedOptions={selectedDifficulty.length === 0 ? ['all'] : selectedDifficulty}
              onFilterChange={handleDifficultyChange}
              multiSelect={false}
            />
          </div>

          {/* Tutorial List by Category */}
          <div className="space-y-12">
            {/* Getting Started */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Getting Started (Beginner)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTutorials
                  .filter((t) => t.difficulty === 'Beginner')
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

            {/* Building dApps */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Building dApps (Intermediate)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTutorials
                  .filter((t) => t.difficulty === 'Intermediate')
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

            {/* Production Ready */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Production Ready (Advanced)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTutorials
                  .filter((t) => t.difficulty === 'Advanced')
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
          </div>
        </motion.div>
      )}

      {/* Code Snippets Tab */}
      {activeTab === 'snippets' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                <h3 className="text-lg font-bold text-white mb-4">{snippet.title}</h3>
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