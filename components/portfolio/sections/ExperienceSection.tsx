'use client';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '@/lib/portfolio/store';

export default function ExperienceSection() {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  return (
    <section id="experience" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <SectionTitle
          title={store.ui.expTitle || 'Experience'}
          subtitle={store.ui.expSubtitle || 'Career & Work History'}
          description={store.ui.expDesc || 'Professional engineering roles, company impact, and delivered modules'}
        />

        <div className="pf-timeline relative max-w-4xl pl-5 sm:pl-10 space-y-6 sm:space-y-8">
          {store.experiences.map((exp: any, i: number) => (
            <div key={exp.id} className="relative fade-up">
              <div
                className={`absolute -left-[31px] sm:-left-[57px] top-7 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-[var(--pf-bg)] ${
                  i === 0 ? 'bg-brand-500 ring-4 ring-brand-500/25' : 'bg-brand-300'
                }`}
              />

              <div className="pf-card pf-card-hover p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-4 pb-4 border-b pf-bd">
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-black pf-title leading-snug break-words">{exp.position}</h3>
                    <p className="text-sm font-extrabold pf-brand">{exp.company}</p>
                  </div>
                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-1 shrink-0">
                    <span className="pf-pill pf-pill-sun">{exp.period}</span>
                    <span className="pf-mute text-xs font-bold">{exp.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-5 text-sm pf-soft font-semibold">
                  {exp.description.map((desc: string) => (
                    <li key={desc} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--pf-brand-soft)] pf-brand flex items-center justify-center text-[11px] font-black">✓</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t pf-bd">
                  <span className="text-xs uppercase tracking-wider pf-mute block mb-2 font-black">
                    {isVi ? 'Công nghệ ứng dụng:' : 'Technologies Used:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((tech: string) => (
                      <span key={tech} className="pf-chip">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
