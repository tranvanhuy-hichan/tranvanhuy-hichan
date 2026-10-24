'use client';
import Link from 'next/link';
import React from 'react';
import { usePortfolioStore } from '@/lib/portfolio/store';

/** Sub-bar for portfolio detail pages (under the shared site navbar). */
export default function SimpleHeader({ children }: { children?: React.ReactNode; flexCol?: boolean }) {
  const locale = usePortfolioStore((s) => s.locale);
  const isVi = locale === 'vi';
  return (
    <div className="px-4 sm:px-8 pt-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold pf-soft hover:text-[var(--pf-brand-text)] transition-colors">
          <span className="pf-icon-btn !w-9 !h-9">←</span>
          <span className="hidden sm:inline">{isVi ? 'Về trang chủ' : 'Back to home'}</span>
        </Link>
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
