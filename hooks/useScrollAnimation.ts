'use client';
import { useEffect } from 'react';

/** Adds 'visible' class to .fade-up/.fade-left/.fade-right when entering viewport. */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const children = entry.target.querySelectorAll('[data-stagger]');
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );

    const observeElements = () => {
      document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach((el) => {
        if (!el.classList.contains('visible')) observer.observe(el);
      });
    };
    // Fallback: reveal anything already at/above the fold, in case the observer missed it (fast scroll, tall cards).
    let raf = 0;
    const revealInView = () => {
      raf = 0;
      document.querySelectorAll('.fade-up:not(.visible), .fade-left:not(.visible), .fade-right:not(.visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add('visible');
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(revealInView); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    observeElements();
    const mutationObserver = new MutationObserver(() => { observeElements(); onScroll(); });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/** Track active section for nav highlighting. */
export function useActiveSection(callback: (id: string) => void) {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) callback(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
