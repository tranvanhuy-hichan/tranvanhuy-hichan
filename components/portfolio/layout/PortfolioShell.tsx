'use client';
import React, { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/portfolio/store';

/** Wraps every page: hydrates persisted prefs (locale). */
export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  const hydrate = usePortfolioStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return <div className="portfolio-root pf-page w-full min-w-0">{children}</div>;
}
