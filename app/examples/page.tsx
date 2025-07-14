"use client";
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Play, 
  Code, 
  Shield, 
  Zap, 
  Globe, 
  Building,
  GitBranch,
  Cpu,
  Lock,
  Activity,
  ArrowRight,
  Clock,
  BookOpen
} from 'lucide-react';
import { dapps } from '@/app/examples/data/dapps';
import { tutorials } from '@/app/examples/data/tutorials';
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader';
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout';

// Icon mapping for tutorials
const iconMap: { [key: string]: React.ReactNode } = {
  Globe: <Globe className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Play: <Play className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Building: <Building className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'text-[#0071F7] bg-[#0071F7]/10';
    case 'Intermediate': return 'text-[#FF8E08] bg-[#FF8E08]/10';
    case 'Advanced': return 'text-[#FF8E08] bg-[#FF8E08]/10';
    default: return 'text-[#D9D9D9]/80 bg-[#D9D9D9]/10';
  }
};

export default function ExamplesListPage() {
  const categories = Array.from(new Set(tutorials.map(t => t.category)));
  
  // Convert dapps object to array for rendering
  const dappItems = Object.entries(dapps).map(([slug, dapp]) => ({
    slug,
    ...dapp,
  }));

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Learn & Build"
        subtitle="Explore tutorials, guides, and example applications to accelerate your Agglayer development journey"
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-gradient-to-br from-[#0071F7]/10 to-transparent p-6 rounded-2xl border border-[#0071F7]/20">
            <div className="text-3xl font-bold text-[#0071F7] mb-1">{tutorials.length}</div>
            <div className="text-sm text-[#D9D9D9]/80">Tutorials</div>
          </div>
          <div className="bg-gradient-to-br from-[#FF8E08]/10 to-transparent p-6 rounded-2xl border border-[#FF8E08]/20">
            <div className="text-3xl font-bold text-[#FF8E08] mb-1">{dappItems.length}</div>
            <div className="text-sm text-[#D9D9D9]/80">Example dApps</div>
          </div>
          <div className="bg-gradient-to-br from-[#0071F7]/10 to-transparent p-6 rounded-2xl border border-[#0071F7]/20">
            <div className="text-3xl font-bold text-[#0071F7] mb-1">{categories.length}</div>
            <div className="text-sm text-[#D9D9D9]/80">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-[#FF8E08]/10 to-transparent p-6 rounded-2xl border border-[#FF8E08]/20">
            <div className="text-3xl font-bold text-[#FF8E08] mb-1">5 min</div>
            <div className="text-sm text-[#D9D9D9]/80">Quick Start</div>
          </div>
        </motion.div>

        {/* Tutorials Section */}
        {categories.map((category, categoryIndex) => {
          const categoryTutorials = tutorials.filter(t => t.category === category);
          
          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{category}</h2>
                  <p className="text-[#D9D9D9]/80">{categoryTutorials.length} tutorials available</p>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#D9D9D9]/20 to-transparent ml-8" />
              </div>

              {/* Tutorials Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTutorials.map((tutorial, index) => (
                  <motion.div
                    key={tutorial.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#0071F7]/50 transition-all duration-300"
                  >
                    {/* Gradient Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tutorial.color}`} />
                    
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tutorial.color} text-white shadow-lg`}>
                          {iconMap[tutorial.icon]}
                        </div>
                        {tutorial.isInteractive && (
                          <span className="px-3 py-1 bg-[#0071F7]/10 text-[#0071F7] text-xs font-medium rounded-full">
                            Interactive
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0071F7] transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-[#D9D9D9]/70 mb-4 line-clamp-2">
                        {tutorial.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1.5 text-sm text-[#D9D9D9]/60">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tutorial.topics.slice(0, 2).map((topic, idx) => (
                          <span key={idx} className="text-xs text-[#D9D9D9]/50">
                            {topic}
                          </span>
                        ))}
                        {tutorial.topics.length > 2 && (
                          <span className="text-xs text-[#D9D9D9]/40">
                            +{tutorial.topics.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {tutorial.githubUrl && (
                          <a
                            href={tutorial.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Code className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}
                        {tutorial.visualizerUrl && (
                          <a
                            href={tutorial.visualizerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0071F7] hover:bg-[#0071F7]/90 text-white text-sm font-medium rounded-xl transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Play className="w-4 h-4" />
                            <span>Try</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Example dApps Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Example dApps</h2>
              <p className="text-[#D9D9D9]/80">Production-ready applications built on Agglayer</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#D9D9D9]/20 to-transparent ml-8" />
          </div>

          {/* dApps Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {dappItems.map((dapp, index) => (
              <motion.a
                key={dapp.slug}
                href={`/examples/${dapp.slug}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#0071F7]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    {dapp.logo && (
                      <img 
                        src={dapp.logo} 
                        alt={dapp.name} 
                        className="w-16 h-16 rounded-xl shadow-lg" 
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#0071F7] transition-colors">
                        {dapp.name}
                      </h3>
                      <p className="text-[#D9D9D9]/70 leading-relaxed">
                        {dapp.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Bullets */}
                  {dapp.bullets && dapp.bullets.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {dapp.bullets.slice(0, 4).map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0071F7]" />
                          <span className="text-sm text-[#D9D9D9]/60">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-[#0071F7] font-medium">
                      <span>Explore Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {dapp.repoUrl && (
                      <div className="flex items-center gap-2 text-sm text-[#D9D9D9]/50">
                        <Code className="w-4 h-4" />
                        <span>Open Source</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0071F7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0071F7]/20 via-[#FF8E08]/10 to-[#0071F7]/20 backdrop-blur-sm border border-[#0071F7]/20"
        >
          <div className="relative z-10 p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build on Agglayer?
            </h3>
            <p className="text-lg text-[#D9D9D9]/80 mb-8 max-w-2xl mx-auto">
              Access interactive development tools, live environments, and comprehensive documentation to bring your cross-chain vision to life.
            </p>
            <a
              href="/developers"
              className="inline-flex items-center gap-3 bg-[#0071F7] hover:bg-[#0071F7]/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Code className="w-6 h-6" />
              Launch Developer Dashboard
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#0071F7] rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF8E08] rounded-full filter blur-3xl" />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}