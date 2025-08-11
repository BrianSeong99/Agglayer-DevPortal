'use client';

import { motion } from 'framer-motion';
import { StarIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

interface ExampleCardProps {
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  stats: {
    stars: number;
    forks: number;
    lastUpdated: string;
  };
  demoUrl?: string;
  codeUrl?: string;
  tutorialUrl?: string;
}

export default function ExampleCard({
  title,
  description,
  image,
  techStack,
  stats,
  demoUrl,
  codeUrl,
  tutorialUrl,
}: ExampleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-[#17171797] border-white/10 hover:border-[#0071F7]/50 transition-all h-full">
        {/* Preview Image */}
        {image && (
          <div className="aspect-video bg-gradient-to-br from-[#0071F7]/20 to-transparent p-8 flex items-center justify-center">
            <CodeBracketIcon className="w-16 h-16 text-[#0071F7]/50" />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl text-white">{title}</CardTitle>
          <CardDescription className="text-[#D9D9D9]">{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-white/5 border-white/10 text-[#D9D9D9]"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-[#D9D9D9]">
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

        </CardContent>

        <CardFooter className="flex gap-2">
          {demoUrl && (
            <Button asChild className="flex-1">
              <Link href={demoUrl}>
                Live Demo
              </Link>
            </Button>
          )}
          {codeUrl && (
            <Button asChild variant="outline" className="flex-1">
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1"
              >
                View Code
                <ArrowTopRightOnSquareIcon className="w-3 h-3" />
              </a>
            </Button>
          )}
          {tutorialUrl && (
            <Button asChild variant="outline" className="flex-1">
              <Link href={tutorialUrl}>
                Tutorial
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}