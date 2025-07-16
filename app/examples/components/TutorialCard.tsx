'use client';

import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
}

export default function TutorialCard({
  title,
  description,
  duration,
  difficulty,
  url,
}: TutorialCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#17171797] border border-white/10 rounded-lg p-6 hover:border-[#0071F7]/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span
          className={`px-2 py-1 text-xs rounded border ${difficultyColors[difficulty]}`}
        >
          {difficulty}
        </span>
      </div>

      <p className="text-[#D9D9D9] text-sm mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-[#D9D9D9]">
          <ClockIcon className="w-4 h-4" />
          <span>{duration}</span>
        </div>

        <Link
          href={url}
          className="px-4 py-2 bg-[#0071F7] hover:bg-[#0071F7]/80 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Start Tutorial
        </Link>
      </div>
    </motion.div>
  );
}