'use client';
import { GraduationCap, Award } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '@/lib/portfolio/store';

export default function EducationSection() {
  const store = usePortfolio();
  const af = store.academicFocus;
  return (
    <section id="education" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <SectionTitle
          title={store.ui.eduTitle || 'Education'}
          subtitle={store.ui.eduSubtitle || 'Academic Background'}
          description={store.ui.eduDesc || 'University education, qualifications, and certifications'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {store.education.map((edu: any) => (
            <div key={edu.id} className="lg:col-span-8 pf-card pf-card-hover p-5 sm:p-7 fade-up flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex sm:flex-col items-center sm:items-start justify-between w-full sm:w-auto sm:min-w-[150px] gap-3 shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 overflow-hidden bg-white border border-black/5">
                  {edu.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain p-1.5" />
                  ) : edu.type === 'degree' ? (
                    <GraduationCap className="w-7 h-7 text-indigo-600" />
                  ) : (
                    <Award className="w-7 h-7 text-amber-600" />
                  )}
                </div>
                <div className="text-right sm:text-left space-y-1">
                  <span className="text-xs font-extrabold pf-mute block">{edu.period}</span>
                  {edu.gpa ? (
                    <span className="pf-pill pf-pill-sun">GPA {edu.gpa}</span>
                  ) : (
                    <span className="pf-pill pf-pill-mint">✓ Completed</span>
                  )}
                </div>
              </div>

              <div className="flex-grow w-full">
                <p className="text-xs font-black uppercase tracking-wider pf-brand mb-1.5">{edu.school}</p>
                <h3 className="pf-title font-black text-lg sm:text-xl mb-2 leading-snug">{edu.degree}</h3>
                <p className="pf-soft text-sm font-semibold leading-relaxed mb-3">{edu.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="pf-pill pf-pill-sky">Data Science</span>
                  <span className="pf-pill pf-pill-mint">Artificial Intelligence</span>
                  <span className="pf-pill pf-pill-pink">Software Engineering</span>
                </div>
              </div>
            </div>
          ))}

          {af && (
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 text-white p-6 shadow-xl shadow-brand-600/25 flex flex-col justify-between rotate-1 fade-up">
              <div>
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-3">{af.tag}</span>
                <h4 className="text-lg font-black mb-3 leading-snug">{af.title}</h4>
                <ul className="space-y-2 mb-4">
                  {(af.points || []).map((point: string) => (
                    <li key={point} className="flex items-start gap-2 text-sm font-semibold leading-relaxed">
                      <span className="font-black shrink-0">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-white/25 flex items-center gap-2 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>{af.subtitle}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
