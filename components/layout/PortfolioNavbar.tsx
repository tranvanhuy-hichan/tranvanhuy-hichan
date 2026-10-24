'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, ExternalLink } from 'lucide-react';
import LocaleSwitch from '@/components/portfolio/layout/LocaleSwitch';
import { usePortfolioStore } from '@/lib/portfolio/store';

export const MAIN_SITE = 'https://www.tranvanhuy.io.vn';

const LINKS = [
  { id: 'about', vi: 'Giới thiệu', en: 'About' },
  { id: 'experience', vi: 'Kinh nghiệm', en: 'Experience' },
  { id: 'projects', vi: 'Dự án', en: 'Projects' },
  { id: 'skills', vi: 'Kỹ năng', en: 'Skills' },
  { id: 'education', vi: 'Học vấn', en: 'Education' },
  { id: 'contact', vi: 'Liên hệ', en: 'Contact' },
];

function ThemeButton() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);
  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    const c = document.documentElement.classList;
    c.toggle('dark', next);
    c.toggle('light', !next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
    setDark(next);
  }
  return (
    <button type="button" onClick={toggle} className="pf-icon-btn" aria-label="Đổi giao diện sáng / tối">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function PortfolioNavbar() {
  const [open, setOpen] = useState(false);
  const isVi = usePortfolioStore((s) => s.locale) === 'vi';
  const active = usePortfolioStore((s) => s.activeSection);
  return (
    <header className="pf-nav sticky top-0 z-50">
      <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between gap-3 px-3 py-2.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Trang chủ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Trần Văn Huy" className="h-9 w-9 rounded-xl shadow-sm" />
          <span className="pf-heading whitespace-nowrap text-base sm:text-xl">Trần Văn <span className="pf-brand">Huy</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {LINKS.map((l) => (
            <a key={l.id} href={`/#${l.id}`} className={`pf-nav-link ${active === l.id ? 'is-active' : ''}`}>{isVi ? l.vi : l.en}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={MAIN_SITE} className="pf-btn-ghost hidden !py-1.5 !px-3.5 !text-xs sm:inline-flex items-center gap-1.5">
            {isVi ? 'Website chính' : 'Main site'} <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <LocaleSwitch />
          <ThemeButton />
          <button type="button" className="pf-icon-btn lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-[var(--pf-line)] px-4 py-3 flex flex-col gap-1" aria-label="Menu di động">
          {LINKS.map((l) => (
            <a key={l.id} href={`/#${l.id}`} onClick={() => setOpen(false)} className="pf-nav-link">{isVi ? l.vi : l.en}</a>
          ))}
          <a href={MAIN_SITE} className="pf-nav-link">{isVi ? 'Website chính ↗' : 'Main site ↗'}</a>
        </nav>
      )}
    </header>
  );
}
