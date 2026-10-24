'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/lib/portfolio/store';
import { getTechLogo } from '@/lib/portfolio/techLogos';
import { IconGithub, IconExternal } from '../icons/Icons';
import SimpleHeader from '../layout/SimpleHeader';

const card = 'pf-card p-5 sm:p-7';
const side = 'pf-card p-5 sm:p-6';
const sideTitle = 'text-xs uppercase tracking-wider pf-mute font-black';
const linkBtn = 'pf-btn-ghost w-full !text-xs';
const h2 = 'text-lg sm:text-xl font-black pf-title flex items-center gap-2.5';
const num = 'w-8 h-8 rounded-xl bg-[var(--pf-brand-soft)] pf-brand text-sm font-black flex items-center justify-center shrink-0';

export default function ProjectDetail({ slug }: { slug: string }) {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  const projects: any[] = store.projects;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = currentIndex >= 0 ? projects[currentIndex] : undefined;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const [zoomImage, setZoomImage] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const galleryImages: string[] = project?.images?.length ? project.images : project?.image ? [project.image] : [];
  const currentImage = galleryImages[activeImage] || project?.image || '';
  const stepImage = (delta: number) => {
    const n = galleryImages.length;
    if (n > 1) setActiveImage((activeImage + delta + n) % n);
  };

  useEffect(() => {
    setActiveImage(0);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  return (
    <div className="relative">
      <SimpleHeader>
        {project?.demo && project.demo !== '#' && (
          <a href={project.demo} target="_blank" rel="noopener" className="pf-btn hidden sm:inline-flex !py-2 !px-4 !text-xs">
            <span>Live Demo</span>
            <IconExternal className="w-3.5 h-3.5" />
          </a>
        )}
      </SimpleHeader>

      {project ? (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="pf-pill pf-pill-sky uppercase -rotate-2">{project.category}</span>
              {project.time && <span className="pf-pill pf-pill-mint rotate-1">{project.time}</span>}
              {project.rankingBadge && <span className="pf-pill pf-pill-sun -rotate-1">{project.rankingBadge}</span>}
            </div>
            <h1 className="pf-heading text-3xl sm:text-5xl mb-4">{project.title}</h1>
            <p className="text-base sm:text-lg pf-soft font-semibold leading-relaxed max-w-3xl">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
              {project.image && (
                <div className="pf-card overflow-hidden group cursor-zoom-in relative" onClick={() => setZoomImage(true)}>
                  <div className="relative bg-brand-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentImage} alt={project.title} className="w-full h-auto object-cover max-h-[440px]" />
                    <span className="absolute top-3 right-3 pf-pill bg-white/90 text-ink shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      {isVi ? 'Phóng to ảnh' : 'Zoom image'}
                    </span>
                    {galleryImages.length > 1 && (
                      <>
                        <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-ink text-xl font-black flex items-center justify-center shadow-md cursor-pointer" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); stepImage(-1); }}>‹</button>
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-ink text-xl font-black flex items-center justify-center shadow-md cursor-pointer" aria-label="Next image" onClick={(e) => { e.stopPropagation(); stepImage(1); }}>›</button>
                        <span className="absolute bottom-3 right-3 pf-pill bg-navy-900/80 text-white">
                          {activeImage + 1} / {galleryImages.length}
                        </span>
                      </>
                    )}
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
                      {galleryImages.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === activeImage ? 'border-brand-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                          aria-label={`Image ${i + 1}`}
                          onClick={() => setActiveImage(i)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className={card}>
                <h2 className={`${h2} mb-4`}>
                  <span className={num}>01</span>
                  <span>{isVi ? 'Tổng quan & Giải pháp' : 'Project Solution & Overview'}</span>
                </h2>
                <p className="text-sm sm:text-base pf-soft font-semibold leading-relaxed whitespace-pre-line">{project.longDesc || project.description}</p>
              </div>

              <div className={card}>
                <h2 className={`${h2} mb-4`}>
                  <span className={num}>02</span>
                  <span>{store.ui.myContributionLabel || (isVi ? 'Đóng góp & Trách nhiệm của tôi' : 'My Contribution & Scope')}</span>
                </h2>
                {project.role && (
                  <div className="mb-4 pb-4 border-b pf-bd">
                    <span className="pf-pill pf-pill-mint mb-1.5">{isVi ? 'Vai trò đảm nhiệm' : 'Assigned Role'}</span>
                    <p className="text-sm sm:text-base font-extrabold pf-title">{project.role}</p>
                  </div>
                )}
                <ul className="space-y-2.5">
                  {(project.contributions || project.responsibilities || []).map((item: string) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm pf-soft font-semibold leading-relaxed">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--pf-brand-soft)] pf-brand flex items-center justify-center text-[11px] font-black">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.engineeringDecisions?.length > 0 && (
                <div className={`${card} space-y-4`}>
                  <h2 className={h2}>
                    <span className={num}>03</span>
                    <span>{store.ui.decisionsLabel || (isVi ? 'Quyết định Kỹ thuật Then chốt' : 'Key Engineering Decisions')}</span>
                  </h2>
                  <div className="grid gap-3 sm:gap-4">
                    {project.engineeringDecisions.map((d: any) => (
                      <div key={d.decision} className="pf-inset p-4 space-y-1.5">
                        <div className="text-sm font-black pf-brand flex items-center gap-2">
                          <span>▸</span>
                          <span>{d.decision}</span>
                        </div>
                        <p className="text-sm pf-soft font-semibold leading-relaxed pl-4">{d.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.challengesAndSolutions?.length > 0 && (
                <div className={`${card} space-y-4`}>
                  <h2 className={h2}>
                    <span className={num}>04</span>
                    <span>{store.ui.challengesLabel || (isVi ? 'Thách thức Kỹ thuật & Giải pháp' : 'Technical Challenges & Solutions')}</span>
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {project.challengesAndSolutions.map((item: any) => (
                      <div key={item.challenge} className="pf-inset p-4 space-y-3">
                        <div className="text-sm font-extrabold pf-title flex items-start gap-2.5">
                          <span className="pf-pill pf-pill-pink shrink-0">Problem</span>
                          <span className="pt-0.5">{item.challenge}</span>
                        </div>
                        <div className="text-sm pf-soft font-semibold flex items-start gap-2.5 pt-3 border-t pf-bd">
                          <span className="pf-pill pf-pill-mint shrink-0">Solution</span>
                          <span className="pt-0.5">{item.solution}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.internal && (
                <div className="pf-inset p-4 pf-soft text-sm font-bold flex items-center gap-3">
                  <svg className="w-5 h-5 pf-mute shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>
                    {isVi
                      ? 'Dự án nội bộ tại Digital Twin Group (MakeAI) — Mã nguồn & cơ sở dữ liệu được bảo mật theo chính sách công ty.'
                      : 'Enterprise internal project at Digital Twin Group (MakeAI) — Source code is private.'}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
              <div className={side}>
                <h3 className={`${sideTitle} mb-3`}>{isVi ? 'Liên kết trực tiếp' : 'Project Links'}</h3>
                <div className="space-y-2.5">
                  {project.demo && project.demo !== '#' && (
                    <a href={project.demo} target="_blank" rel="noopener" className="pf-btn w-full !text-xs">
                      <span>Live Demo</span>
                      <IconExternal className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className={linkBtn}>
                      <IconGithub className="w-4 h-4" />
                      <span>{project.githubBackend ? 'Frontend Code' : 'Source Code'}</span>
                    </a>
                  )}
                  {project.githubBackend && (
                    <a href={project.githubBackend} target="_blank" rel="noopener" className={linkBtn}>
                      <IconGithub className="w-4 h-4" />
                      <span>Backend Code</span>
                    </a>
                  )}
                  {project.video && (
                    <a href={project.video} target="_blank" rel="noopener" className={linkBtn}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Watch Video Demo</span>
                    </a>
                  )}
                  {!project.github && !project.demo && !project.video && (
                    <div className="text-sm pf-mute font-bold italic text-center py-1">
                      {isVi ? 'Dự án doanh nghiệp bảo mật mã nguồn.' : 'Private enterprise project.'}
                    </div>
                  )}
                </div>
              </div>

              <div className={side}>
                <h3 className={`${sideTitle} mb-3`}>{isVi ? 'Công nghệ sử dụng' : 'Tech Stack'}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, i: number) => (
                    <span key={tag} className={`pf-pill ${['pf-pill-sky', 'pf-pill-mint', 'pf-pill-sun', 'pf-pill-pink'][i % 4]}`}>
                      {getTechLogo(tag) && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getTechLogo(tag)!} alt="" className="w-3.5 h-3.5 object-contain shrink-0 rounded-sm bg-white p-px" loading="lazy" />
                      )}
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${side} space-y-3 text-sm`}>
                <h3 className={`${sideTitle} mb-2`}>{isVi ? 'Thông tin tóm tắt' : 'Quick Details'}</h3>
                <div className="flex items-center justify-between pb-2.5 border-b pf-bd">
                  <span className="pf-mute font-bold">{isVi ? 'Thể loại' : 'Category'}</span>
                  <span className="font-black pf-title uppercase">{project.category}</span>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b pf-bd">
                  <span className="pf-mute font-bold">{isVi ? 'Thời gian' : 'Timeline'}</span>
                  <span className="font-black pf-title">{project.time || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="pf-mute font-bold">{isVi ? 'Trạng thái' : 'Status'}</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{isVi ? 'Hoàn thành' : 'Completed'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t pf-bd flex items-center justify-between gap-4">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="flex min-w-0 items-center gap-3 group">
                <span className="pf-icon-btn shrink-0 group-hover:!bg-brand-500 group-hover:!text-white">←</span>
                <div className="text-left min-w-0">
                  <span className="text-[11px] font-black pf-mute block uppercase">{isVi ? 'Dự án trước' : 'Previous'}</span>
                  <span className="font-black pf-title group-hover:text-[var(--pf-brand-text)] truncate max-w-[140px] sm:max-w-[220px] block">{prevProject.title}</span>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="flex min-w-0 items-center gap-3 group text-right">
                <div className="text-right min-w-0">
                  <span className="text-[11px] font-black pf-mute block uppercase">{isVi ? 'Dự án tiếp theo' : 'Next'}</span>
                  <span className="font-black pf-title group-hover:text-[var(--pf-brand-text)] truncate max-w-[140px] sm:max-w-[220px] block">{nextProject.title}</span>
                </div>
                <span className="pf-icon-btn shrink-0 group-hover:!bg-brand-500 group-hover:!text-white">→</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </main>
      ) : (
        <div className="max-w-md mx-auto text-center py-28 px-4">
          <div className="text-5xl mb-3">🔍</div>
          <h2 className="text-2xl font-black pf-title mb-2">{isVi ? 'Không tìm thấy thông tin dự án' : 'Project Not Found'}</h2>
          <p className="pf-soft font-semibold text-sm mb-6">{isVi ? 'Vui lòng chọn một dự án khác từ trang chủ.' : 'Please pick another project from the home page.'}</p>
          <Link href="/" className="pf-btn">← {isVi ? 'Về Portfolio' : 'Back to Portfolio'}</Link>
        </div>
      )}

      {zoomImage && project?.image && (
        <div className="fade-modal fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setZoomImage(false)}>
          <button onClick={() => setZoomImage(false)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center text-sm font-black cursor-pointer hover:bg-brand-100" aria-label="Close">✕</button>
          {galleryImages.length > 1 && (
            <button type="button" className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-ink text-xl font-black flex items-center justify-center cursor-pointer hover:bg-brand-100" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); stepImage(-1); }}>‹</button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentImage} alt={project.title} className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl border-4 border-white" />
          {galleryImages.length > 1 && (
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-ink text-xl font-black flex items-center justify-center cursor-pointer hover:bg-brand-100" aria-label="Next image" onClick={(e) => { e.stopPropagation(); stepImage(1); }}>›</button>
          )}
        </div>
      )}
    </div>
  );
}
