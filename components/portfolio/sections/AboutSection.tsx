'use client';
import { usePortfolio } from '@/lib/portfolio/store';

function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 70" className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <g className="pf-cloud">
        <ellipse cx="50" cy="48" rx="46" ry="20" />
        <ellipse cx="90" cy="34" rx="36" ry="26" />
        <ellipse cx="118" cy="50" rx="38" ry="18" />
      </g>
    </svg>
  );
}

export default function AboutSection() {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  const p = store.personal;
  const facts: { label: string; value: string }[] = p.quickFacts || [];
  const tints = ['bg-[#c8f5e5] text-[#0b6b4f]', 'bg-[#ffe9a8] text-[#6b4700]', 'bg-[#ffd6e2] text-[#9f1d48]', 'bg-[#d9f1ff] text-[#075985]'];
  return (
    <section id="about" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-brand-500 to-brand-700 text-white p-6 sm:p-12 shadow-2xl shadow-brand-600/30 fade-up">
          <Cloud className="w-40 sm:w-64 -top-2 -left-6" />
          <Cloud className="w-32 sm:w-52 top-1/3 -right-8" />
          <Cloud className="w-44 sm:w-72 -bottom-4 left-1/3" />

          <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7">
              <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-3 -rotate-2">
                {store.ui.aboutSubtitle || (isVi ? 'Giới thiệu' : 'About')}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
                {store.ui.aboutTitle || (isVi ? 'Về tôi' : 'About Me')}
              </h2>
              <div className="space-y-4 text-base sm:text-lg font-semibold leading-relaxed text-white/95">
                {Array.isArray(p.aboutStory) ? (
                  p.aboutStory.map((t: string, idx: number) => <p key={idx}>{t}</p>)
                ) : (
                  <p>{p.aboutStory}</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              {facts.length > 0 && (
                <div className="rounded-3xl bg-white text-ink p-5 shadow-xl rotate-1">
                  <ul className="space-y-3">
                    {facts.map((f, i) => (
                      <li key={f.label} className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`pf-pill ${tints[i % tints.length]}`}>{f.label}</span>
                        <span className="text-sm font-extrabold text-ink text-right">{f.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.objective && (
                <div className="rounded-3xl bg-navy-900 text-white p-5 shadow-xl -rotate-1">
                  <span className="pf-pill bg-[#ffe9a8] text-[#6b4700] mb-2">{store.ui.objectiveLabel || (isVi ? 'Mục tiêu nghề nghiệp' : 'Career Objective')}</span>
                  <p className="text-sm sm:text-base font-bold leading-relaxed">{p.objective}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
