'use client';
import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import { usePortfolio } from '@/lib/portfolio/store';

export default function ProjectsSection() {
  const store = usePortfolio();
  const isVi = store.locale === 'vi';
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filters = [
    { value: 'all', label: store.ui.filterAll || 'All' },
    { value: 'fullstack', label: store.ui.filterFullstack || 'Full-Stack' },
    { value: 'enterprise', label: store.ui.filterEnterprise || 'Enterprise' },
    { value: 'ai', label: store.ui.filterAi || 'AI & Automation' },
    { value: 'gis', label: store.ui.filterGis || 'GIS & Maps' },
  ];

  const filtered: any[] = store.filteredProjects;
  const initialList = filtered.filter((p) => p.showInitial);
  const displayedProjects = showAll
    ? filtered
    : initialList.length > 0 && initialList.length < filtered.length
      ? initialList
      : filtered;
  const hasMoreProjects = (initialList.length > 0 && initialList.length < filtered.length) || showAll;

  function getCount(filter: string) {
    if (filter === 'all') return store.projects.length;
    return store.projects.filter((p: any) => {
      if (p.categories && Array.isArray(p.categories)) return p.categories.includes(filter);
      return p.category === filter;
    }).length;
  }

  return (
    <section id="projects" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <SectionTitle
          title={store.ui.projectsTitle || 'Featured Projects'}
          subtitle={store.ui.projectsSubtitle || 'Engineering Portfolio'}
          description={store.ui.projectsDesc || 'Architecture-driven full-stack systems, enterprise workflows, and AI solutions'}
        />

        <div className="flex flex-wrap justify-start gap-2 mb-8 fade-up">
          {filters.map((f) => (
            <button
              key={f.value}
              id={`project-filter-${f.value}`}
              className={`pf-tab ${store.projectFilter === f.value ? 'is-active' : ''}`}
              onClick={() => store.setProjectFilter(f.value)}
            >
              <span>{f.label}</span>
              <span className="text-[11px] opacity-80 px-1.5 rounded-full bg-black/10">{getCount(f.value)}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mx-auto">
          {displayedProjects.map((project) => (
            <div key={project.id} className="fade-up fade-enter">
              <ProjectCard project={project} onZoomImage={setZoomImageUrl} />
            </div>
          ))}
        </div>

        {hasMoreProjects && filtered.length > 1 && (
          <div className="mt-6 sm:mt-12 text-center fade-up">
            <button onClick={() => setShowAll(!showAll)} className="pf-btn-ghost group">
              <span>
                {showAll
                  ? isVi ? 'Thu gọn danh sách dự án' : 'Show Less Projects'
                  : isVi ? `Xem toàn bộ ${filtered.length} dự án` : `View All ${filtered.length} Projects`}
              </span>
              <span className={`pf-brand font-black transition-transform ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>↓</span>
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 pf-mute font-bold text-sm">
            <p>{isVi ? 'Không có dự án nào trong danh mục này.' : 'No projects found in this category.'}</p>
          </div>
        )}
      </div>

      {zoomImageUrl && (
        <div
          className="fade-modal fixed inset-0 z-[100] bg-navy-950/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomImageUrl(null)}
        >
          <button
            onClick={() => setZoomImageUrl(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 text-lg cursor-pointer"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomImageUrl} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none" alt="Zoomed project preview" />
        </div>
      )}
    </section>
  );
}
