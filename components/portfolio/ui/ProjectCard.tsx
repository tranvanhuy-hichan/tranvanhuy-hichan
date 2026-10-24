'use client';
import Link from 'next/link';
import { usePortfolio } from '@/lib/portfolio/store';
import { IconGithub, IconExternal } from '../icons/Icons';
import { getTechLogo } from '@/lib/portfolio/techLogos';

const PILLS = ['pf-pill-sky', 'pf-pill-mint', 'pf-pill-sun', 'pf-pill-pink'];
const ghBtn = 'pf-btn-ghost !px-3 !py-1.5 !text-xs !border !rounded-full whitespace-nowrap shrink-0';

export default function ProjectCard({ project, onZoomImage }: { project: any; onZoomImage?: (src: string) => void }) {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  const href = `/projects/${project.slug}`;
  const hasLinks = Boolean(project.github || project.githubBackend || (project.demo && project.demo !== '#') || project.video);
  const contribs: string[] = project.contributions || project.responsibilities || [];

  return (
    <div className="pf-card pf-card-hover overflow-hidden flex flex-col h-full group">
      <Link href={href} className="project-img-wrapper aspect-video relative overflow-hidden block bg-brand-100 cursor-pointer">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-black text-4xl text-white bg-gradient-to-br from-brand-400 to-brand-600">
            &lt;/&gt;
          </div>
        )}

        {project.image && (
          <button
            type="button"
            className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/90 text-ink text-xs font-black flex items-center gap-1.5 shadow-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity cursor-zoom-in"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onZoomImage?.(project.image);
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Zoom
          </button>
        )}

        {(project.rankingBadge || project.featured) && (
          <span className="absolute top-3 right-3 pf-pill pf-pill-sun rotate-2 shadow-md z-10 !bg-[#ffe9a8] !text-[#6b4700]">
            {project.rankingBadge || (isVi ? 'Dự án Nổi bật' : 'Featured Project')}
          </span>
        )}
      </Link>

      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="pf-pill pf-pill-sky uppercase tracking-wide">{project.category}</span>
            {project.time && <span className="pf-mute text-xs font-bold">{project.time}</span>}
          </div>

          <h3 className="text-lg sm:text-xl font-black pf-title mb-2 leading-snug">
            <Link href={href} className="hover:text-[var(--pf-brand-text)] transition-colors">{project.title}</Link>
          </h3>

          <p className="pf-soft text-sm font-semibold leading-relaxed mb-4 line-clamp-3">{project.description || project.longDesc}</p>

          {contribs.length > 0 && (
            <div className="pf-inset p-3.5 mb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="pf-pill pf-pill-mint shrink-0">{store.ui.myContributionLabel || (isVi ? 'Đóng góp của tôi' : 'My Contribution')}</span>
                <span className="text-[11px] pf-mute truncate font-bold">{project.role}</span>
              </div>
              <ul className="space-y-1.5 text-xs pf-soft font-semibold">
                {contribs.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-snug">
                    <span className="pf-brand shrink-0 font-black">✓</span>
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag: string, i: number) => (
              <span key={tag} className={`pf-pill ${PILLS[i % PILLS.length]}`}>
                {getTechLogo(tag) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={getTechLogo(tag)!} alt="" className="w-3.5 h-3.5 object-contain shrink-0 rounded-sm bg-white p-px" loading="lazy" />
                )}
                <span>{tag}</span>
              </span>
            ))}
            {project.tags.length > 4 && <span className="pf-chip">+{project.tags.length - 4}</span>}
          </div>

          <div className="flex items-center justify-between pt-4 border-t pf-bd">
            {hasLinks ? (
              <div className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar flex-nowrap py-1">
                {project.githubBackend ? (
                  <>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener" className={ghBtn}>
                        <IconGithub className="w-3.5 h-3.5 shrink-0" />
                        <span>FE Code</span>
                      </a>
                    )}
                    <a href={project.githubBackend} target="_blank" rel="noopener" className={ghBtn}>
                      <IconGithub className="w-3.5 h-3.5 shrink-0" />
                      <span>BE Code</span>
                    </a>
                  </>
                ) : (
                  project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className={ghBtn}>
                      <IconGithub className="w-3.5 h-3.5 shrink-0" />
                      <span>GitHub</span>
                    </a>
                  )
                )}

                {project.demo && project.demo !== '#' && (
                  <a href={project.demo} target="_blank" rel="noopener" className="pf-btn !px-3.5 !py-1.5 !text-xs whitespace-nowrap shrink-0">
                    <span>Live Demo</span>
                    <IconExternal className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}

                {project.video && (
                  <a href={project.video} target="_blank" rel="noopener" className={ghBtn}>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Video</span>
                  </a>
                )}

                <Link href={href} className="ml-auto text-sm font-black pf-brand hover:underline shrink-0 whitespace-nowrap px-1">
                  {isVi ? 'Chi tiết' : 'Details'} →
                </Link>
              </div>
            ) : project.internal ? (
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-1.5 text-xs pf-mute font-bold">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>{isVi ? 'Dự án Digital Twin Group (MakeAI) — Bảo mật' : 'Digital Twin Group (MakeAI) Project — Private'}</span>
                </div>
                <Link href={href} className="text-sm font-black pf-brand hover:underline shrink-0">
                  {isVi ? 'Xem chi tiết' : 'Details'} →
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
