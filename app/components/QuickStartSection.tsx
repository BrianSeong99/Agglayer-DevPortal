'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { IconSchool, IconCopy } from '@tabler/icons-react';

export default function QuickStartSection() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, step: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: 'Install',
      code: `# Clone and install AggSandbox
git clone 
https://github.com/NethermindEth/agg-sandbox.git
cd agg-sandbox && make install`,
    },
    {
      title: 'Start Sandbox',
      code: `# Start local development environment
aggsandbox start --detach

# Or fork from mainnet
aggsandbox start --fork --detach`,
    },
    {
      title: 'Bridge tokens',
      code: `# Check available bridges
aggsandbox show bridges --network 1

# Monitor events
aggsandbox events --chain anvil-l1`,
    },
  ];

  return (
    <section id="quick-start" className="py-49 bg-white">
      <div className="max-w-narrow mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-6">
            Start your <span className="font-medium text-primary">Journey</span>
          </h2>
          <p className="text-base text-secondary max-w-xs mx-auto">
            Get your local development environment up and running in under 5 minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-1.5 mb-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-100 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-medium text-xs text-primary tracking-button">
                  {index + 1}. {step.title}
                </h3>
                <button
                  onClick={() => copyToClipboard(step.code, index)}
                  className="p-0 hover:bg-transparent"
                >
                  {copiedStep === index ? (
                    <CheckIcon className="w-4 h-4 text-primary" />
                  ) : (
                    <IconCopy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="bg-white rounded-lg p-6 mt-3">
                <pre className="font-mono text-xs text-black leading-normal whitespace-pre-wrap break-all">
{step.code}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            href="/examples" 
            className="inline-flex items-center gap-1.5 px-[15px] py-2 rounded-pill text-xs text-gray-500"
          >
            <IconSchool className="w-4 h-4" />
            View full tutorial
          </Link>
        </motion.div>
      </div>
    </section>
  );
}