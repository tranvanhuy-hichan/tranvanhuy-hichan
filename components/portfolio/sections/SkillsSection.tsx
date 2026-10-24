'use client';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '@/lib/portfolio/store';

export default function SkillsSection() {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  return (
    <section id="skills" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <SectionTitle
          title={store.ui.skillsTitle || 'Tech Stack'}
          subtitle={store.ui.skillsSubtitle || 'Technologies & Tools'}
          description={store.ui.skillsDesc || 'Production-tested technologies, frameworks, databases, and infrastructure I work with'}
        />

        <div className="flex flex-wrap gap-2 mb-8 fade-up">
          {store.skillCategories.map((cat: any) => (
            <button
              key={cat.id}
              id={`skill-tab-${cat.id}`}
              className={`pf-tab ${store.activeSkillCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => store.setActiveSkillCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {store.activeSkills.map((skill: any, i: number) => (
            <div
              key={skill.name}
              className="pf-card pf-card-hover !rounded-2xl p-3 sm:p-4 flex items-center gap-3 fade-up group"
              style={{ transitionDelay: `${(i % 8) * 35}ms` }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-1.5 flex items-center justify-center bg-white border border-black/5 group-hover:scale-110 transition-transform shrink-0">
                {skill.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-sm font-black text-brand-600">•</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block font-black pf-title text-sm truncate">{skill.name}</span>
                <span className="block text-[11px] font-bold pf-brand truncate mt-0.5">{skill.focus}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-3xl bg-[#fff1c4] text-ink max-w-3xl rotate-1 shadow-lg border-2 border-white/70 fade-up">
          <span className="pf-pill bg-white text-ink mb-2">{isVi ? 'Kinh nghiệm Triển khai Thực tế' : 'Deployment & Production Experience'}</span>
          <p className="text-sm font-bold text-ink-soft leading-relaxed">
            {isVi
              ? 'Từng đóng gói và triển khai ứng dụng thực tế trên Linux Server (Ubuntu VPS), cấu hình Nginx Reverse Proxy, SSL, Docker Compose và phát hành ứng dụng lên Vercel / Cloudflare DNS.'
              : 'Hands-on experience deploying full-stack apps to Linux cloud servers (Ubuntu VPS), configuring Nginx Reverse Proxy, SSL certificates, Docker Compose, and Vercel edge deployment.'}
          </p>
        </div>
      </div>
    </section>
  );
}
