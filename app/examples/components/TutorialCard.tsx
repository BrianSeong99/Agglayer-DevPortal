'use client';

import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
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
    >
      <Card className="bg-[#17171797] border-white/10 hover:border-[#0071F7]/50 transition-all h-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <CardTitle className="text-lg text-white">{title}</CardTitle>
          {difficulty && (
            <Badge
              variant="outline"
              className={difficultyColors[difficulty]}
            >
              {difficulty}
            </Badge>
          )}
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-[#D9D9D9]">{description}</CardDescription>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-[#D9D9D9]">
            <ClockIcon className="w-4 h-4" />
            <span>{duration}</span>
          </div>

          <Button asChild size="sm">
            <Link href={url}>
              Start Tutorial
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}