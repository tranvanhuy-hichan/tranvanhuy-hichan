'use client';
import { create } from 'zustand';
import { loadPortfolioData } from './dataLoader';

const initialData = loadPortfolioData();

export type Locale = 'en' | 'vi';

interface PortfolioState {
  locale: Locale;
  activeSection: string;
  projectFilter: string;
  activeSkillCategory: string;
  hydrate: () => void;
  setLocale: (loc: Locale) => void;
  setProjectFilter: (f: string) => void;
  setActiveSkillCategory: (id: string) => void;
  setActiveSection: (s: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  locale: 'vi',
  activeSection: 'hero',
  projectFilter: 'all',
  activeSkillCategory: 'languages',

  // Read persisted prefs on the client after mount (avoids hydration mismatch)
  hydrate: () => {
    try {
      const saved = localStorage.getItem('locale');
      if (saved === 'en' || saved === 'vi') set({ locale: saved });
    } catch {}
  },
  setLocale: (loc) => {
    set({ locale: loc });
    try { localStorage.setItem('locale', loc); } catch {}
  },
  setProjectFilter: (f) => set({ projectFilter: f }),
  setActiveSkillCategory: (id) => set({ activeSkillCategory: id }),
  setActiveSection: (s) => set({ activeSection: s }),
}));


/** Derived localized data (replacement for Pinia getters). */
export function usePortfolio() {
  const s = usePortfolioStore();
  const data = initialData;
  const d = (data as any)[s.locale];
  const skillCategories = (data as any).skillCategoriesList.map((cat: any) => ({
    id: cat.id,
    label: cat.labels[s.locale] || cat.labels.en,
    icon: cat.icon,
    skills: cat.skills,
  }));
  const projects = d.projects;
  const filteredProjects = s.projectFilter === 'all' ? projects : projects.filter((p: any) => p.category === s.projectFilter);
  const activeCat = skillCategories.find((c: any) => c.id === s.activeSkillCategory);
  return {
    ...s,
    personal: d.personal,
    stats: d.stats,
    whatIBuild: d.whatIBuild || [],
    projects,
    experiences: d.experiences,
    education: d.education,
    academicFocus: d.academicFocus,
    ui: d.ui,
    presetSubjects: d.ui.presetSubjects || [],
    skillCategories,
    filteredProjects,
    activeSkills: activeCat ? activeCat.skills : [],
  };
}
