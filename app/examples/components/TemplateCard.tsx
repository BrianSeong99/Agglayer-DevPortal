'use client';

import { motion } from 'framer-motion';
import { StarIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface TemplateCardProps {
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  stats: {
    stars: number;
    forks: number;
    lastUpdated: string;
  };
  features: string[];
  demoUrl?: string;
  codeUrl?: string;
  tutorialUrl?: string;
}

export default function TemplateCard({
  title,
  description,
  image,
  techStack,
  stats,
  features,
  demoUrl,
  codeUrl,
  tutorialUrl,
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#17171797] border border-white/10 rounded-lg overflow-hidden hover:border-[#0071F7]/50 transition-all"
    >
      {/* Preview Image */}
      {image && (
        <div className="aspect-video bg-gradient-to-br from-[#0071F7]/20 to-transparent p-8 flex items-center justify-center">
          <CodeBracketIcon className="w-16 h-16 text-[#0071F7]/50" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-[#D9D9D9] text-sm mb-4">{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-[#D9D9D9]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-[#D9D9D9] mb-4">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4" />
            <span>{stats.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
            </svg>
            <span>{stats.forks}</span>
          </div>
          <span className="text-xs">Updated {stats.lastUpdated}</span>
        </div>

        {/* Features */}
        <div className="space-y-1 mb-6">
          {features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <span className="text-[#0071F7] mt-1">•</span>
              <span className="text-sm text-[#D9D9D9]">{feature}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {demoUrl && (
            <Link
              href={demoUrl}
              className="flex-1 px-4 py-2 bg-[#0071F7] hover:bg-[#0071F7]/80 text-white rounded-lg text-sm font-medium text-center transition-colors"
            >
              Live Demo
            </Link>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 border border-white/20 hover:border-white/40 text-white rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-1"
            >
              View Code
              <ArrowTopRightOnSquareIcon className="w-3 h-3" />
            </a>
          )}
          {tutorialUrl && (
            <Link
              href={tutorialUrl}
              className="flex-1 px-4 py-2 border border-white/20 hover:border-white/40 text-white rounded-lg text-sm font-medium text-center transition-colors"
            >
              Tutorial
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}