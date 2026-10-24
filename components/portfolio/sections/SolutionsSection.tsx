'use client';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '@/lib/portfolio/store';

// Tilted "sticker" cards in rotating accent colours
const STICKERS = [
  { bg: 'bg-brand-100', rot: '-rotate-2', pill: 'pf-pill-sky' },
  { bg: 'bg-[#d8f7ea]', rot: 'rotate-1', pill: 'pf-pill-mint' },
  { bg: 'bg-[#fff1c4]', rot: '-rotate-1', pill: 'pf-pill-sun' },
  { bg: 'bg-[#ffe1ea]', rot: 'rotate-2', pill: 'pf-pill-pink' },
];

export default function SolutionsSection() {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  return (
    <section id="solutions" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <SectionTitle
          title={store.ui.solutionsTitle || (isVi ? 'Lĩnh vực chuyên môn' : 'Core Solutions')}
          subtitle={store.ui.solutionsSubtitle || (isVi ? 'Giải pháp phần mềm' : 'What I Build')}
          description={
            store.ui.solutionsDesc ||
            (isVi
              ? 'Các mảng sản phẩm và giải pháp công nghệ tôi trực tiếp xây dựng và bàn giao'
              : 'Key software systems, architectures, and practical engineering solutions I build and deliver')
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {store.whatIBuild.map((item: any, index: number) => {
            const st = STICKERS[index % STICKERS.length];
            return (
              <div
                key={item.title}
                className={`pf-sticker ${st.rot} ${st.bg} rounded-3xl p-6 border-2 border-white/70 shadow-xl flex flex-col justify-between fade-up`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white text-brand-700 flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                      0{index + 1}
                    </div>
                    <h4 className="text-lg font-black text-ink leading-snug">{item.title}</h4>
                  </div>
                  <p className="text-sm font-semibold text-ink-soft leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 text-[11px] font-extrabold rounded-full bg-white/80 text-ink border border-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
