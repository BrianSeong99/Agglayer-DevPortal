"use client";
import { motion } from 'framer-motion';
import { 
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
  Clock
} from 'lucide-react';
import { tutorials } from '@/app/tutorials/data/tutorials';

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
    case 'Intermediate': return 'text-white bg-white/10';
    case 'Advanced': return 'text-white bg-white/10';
    default: return 'text-[#D9D9D9]/80 bg-[#D9D9D9]/10';
  }
};

export default function TutorialsList() {
  const categories = Array.from(new Set(tutorials.map(t => t.category)));
  
  return (
    <>
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
    </>
  );
}