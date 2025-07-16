'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  id: string;
  label: string;
}

interface TabComponentProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function TabComponent({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabComponentProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={className}>
      <TabsList className="bg-white/5 border border-white/10">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-[#0071F7] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-white/60 transition-all"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}