'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout';
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader';
import { tools } from './data/tools';
import {
  CubeIcon,
  BeakerIcon,
  ArrowTopRightOnSquareIcon,
  CommandLineIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const iconMap: { [key: string]: any } = {
  package: CubeIcon,
  box: BeakerIcon,
  bridge: CommandLineIcon,
  droplet: BeakerIcon,
  tool: CubeIcon,
};

export default function ToolsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, toolId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(toolId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const essentialTools = tools.filter((tool) => tool.category === 'essential');
  const additionalTools = tools.filter((tool) => tool.category === 'additional');

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Developer Tools"
        subtitle="Everything you need to build, test, and deploy cross-chain applications"
      />

      {/* Essential Tools Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {essentialTools.map((tool, index) => {
            const Icon = iconMap[tool.icon] || CubeIcon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#17171797] border border-white/10 rounded-lg p-6 hover:border-[#0071F7]/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-[#0071F7]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#0071F7]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                    <p className="text-[#D9D9D9] text-sm">{tool.description}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.quickActions.map((action) => (
                    <a
                      key={action.label}
                      href={action.url}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noopener noreferrer' : undefined}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-sm text-white transition-all flex items-center gap-1"
                    >
                      {action.label}
                      {action.external && (
                        <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                      )}
                    </a>
                  ))}
                </div>

                {/* Quick Install */}
                {tool.quickInstall && (
                  <div className="bg-black/50 border border-white/10 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-[#D9D9D9]">{tool.quickInstall}</code>
                      <button
                        onClick={() => copyToClipboard(tool.quickInstall!, tool.id)}
                        className="p-1.5 hover:bg-white/10 rounded transition-colors"
                      >
                        <DocumentDuplicateIcon
                          className={`w-4 h-4 ${
                            copiedId === tool.id ? 'text-green-400' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* System Requirements */}
                {tool.systemRequirements && (
                  <div className="space-y-1">
                    <p className="text-xs text-[#D9D9D9] font-medium mb-2">
                      System Requirements:
                    </p>
                    {tool.systemRequirements.map((req) => (
                      <p key={req} className="text-xs text-[#D9D9D9] flex items-start gap-1">
                        <span className="text-[#0071F7] mt-0.5">•</span>
                        <span>{req}</span>
                      </p>
                    ))}
                  </div>
                )}

                {/* Features */}
                {tool.features && (
                  <div className="space-y-1">
                    <p className="text-xs text-[#D9D9D9] font-medium mb-2">Features:</p>
                    {tool.features.map((feature) => (
                      <p key={feature} className="text-xs text-[#D9D9D9] flex items-start gap-1">
                        <span className="text-[#0071F7] mt-0.5">•</span>
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>
                )}

                {/* Available Networks */}
                {tool.availableNetworks && (
                  <div className="space-y-1">
                    <p className="text-xs text-[#D9D9D9] font-medium mb-2">
                      Available Networks:
                    </p>
                    {tool.availableNetworks.map((network) => (
                      <p key={network} className="text-xs text-[#D9D9D9] flex items-start gap-1">
                        <span className="text-[#0071F7] mt-0.5">•</span>
                        <span>{network}</span>
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Additional Resources */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">More Tools & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalTools.map((tool, index) => {
            const Icon = iconMap[tool.icon] || CubeIcon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#17171797] border border-white/10 rounded-lg p-6 hover:border-[#0071F7]/50 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-[#0071F7]/10 rounded-lg">
                    <Icon className="w-5 h-5 text-[#0071F7]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                </div>

                <p className="text-[#D9D9D9] text-sm mb-4">{tool.description}</p>

                {tool.quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.url}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-[#0071F7] hover:text-[#0071F7]/80 text-sm font-medium transition-colors"
                  >
                    {action.label}
                    {action.external && (
                      <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                    )}
                  </a>
                ))}
              </motion.div>
            );
          })}

          {/* Placeholder for future tool */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: additionalTools.length * 0.1 }}
            className="bg-[#17171797] border border-white/10 rounded-lg p-6 opacity-50"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <CubeIcon className="w-5 h-5 text-white/40" />
              </div>
              <h3 className="text-lg font-bold text-white/60">[Tool Placeholder]</h3>
            </div>
            <p className="text-[#D9D9D9]/60 text-sm mb-4">
              Description coming soon
              <br />
              Features in development
            </p>
            <button
              disabled
              className="text-white/40 text-sm font-medium cursor-not-allowed"
            >
              Coming Soon
            </button>
          </motion.div>
        </div>
      </section>
    </DashboardLayout>
  );
}