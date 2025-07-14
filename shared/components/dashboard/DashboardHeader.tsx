import React from 'react';

export default function DashboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-6 md:pt-12 md:pb-8">
      <h1 className="text-4xl font-bold tracking-tight font-sans mb-2 text-left">{title}</h1>
      {subtitle && (
        <p className="text-lg text-[var(--text-secondary)] font-sans mb-8 text-left">{subtitle}</p>
      )}
    </header>
  );
}
