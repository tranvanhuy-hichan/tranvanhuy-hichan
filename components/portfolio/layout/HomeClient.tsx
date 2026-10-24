'use client';
import { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SolutionsSection from '../sections/SolutionsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import EducationSection from '../sections/EducationSection';
import ServicesSection from '../sections/ServicesSection';
import ContactSection from '../sections/ContactSection';
import { useScrollAnimation, useActiveSection } from '@/hooks/useScrollAnimation';
import { usePortfolioStore } from '@/lib/portfolio/store';

export default function HomeClient() {
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);

  useScrollAnimation();
  useActiveSection(setActiveSection);

  // Smooth scroll to hash on load (e.g. /#contact from the 404 page)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 700);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden w-full">
      <main className="overflow-x-hidden w-full min-w-0">
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
}
