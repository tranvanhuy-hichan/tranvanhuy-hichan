'use client';
import { usePortfolioStore } from '@/lib/portfolio/store';

export default function LocaleSwitch() {
  const locale = usePortfolioStore((s) => s.locale);
  const setLocale = usePortfolioStore((s) => s.setLocale);
  return (
    <div className="flex items-center h-10 gap-0.5 pf-card rounded-full p-1 text-[11px] font-black" role="group" aria-label="Ngôn ngữ">
      {(['vi', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`h-full px-2.5 rounded-full transition-colors cursor-pointer ${locale === l ? 'bg-brand-600 text-white' : 'pf-mute hover:text-[var(--pf-brand-text)]'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
