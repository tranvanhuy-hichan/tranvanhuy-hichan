'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import LocaleSwitch from '@/components/portfolio/layout/LocaleSwitch';
import { usePortfolioStore } from '@/lib/portfolio/store';
import { STORE_URL, BRAND, ROOT_DOMAIN } from '@/lib/site';

export const MAIN_SITE = STORE_URL;

const LINKS = [
  { id: 'about', vi: 'Giới thiệu', en: 'About' },
  { id: 'experience', vi: 'Kinh nghiệm', en: 'Experience' },
  { id: 'projects', vi: 'Dự án', en: 'Projects' },
  { id: 'skills', vi: 'Kỹ năng', en: 'Skills' },
  { id: 'education', vi: 'Học vấn', en: 'Education' },
  { id: 'contact', vi: 'Liên hệ', en: 'Contact' },
];

const STORE_LINKS = [
  { href: `${STORE_URL}/dich-vu`, vi: 'Dịch vụ', en: 'Services' },
  { href: `${STORE_URL}/cua-hang`, vi: 'Cửa hàng', en: 'Store' },
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
    // Shared with the store: same cookie on the root domain.
    if (location.hostname === ROOT_DOMAIN || location.hostname.endsWith('.' + ROOT_DOMAIN)) {
      document.cookie = `ht_theme=${next ? 'dark' : 'light'}; path=/; max-age=31536000; domain=.${ROOT_DOMAIN}; samesite=lax`;
    }
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
          <span className="flex flex-col leading-none">
            <span className="pf-heading whitespace-nowrap text-base sm:text-xl">Trần Văn <span className="pf-brand">Huy</span></span>
            <span className="pf-mute mt-0.5 hidden whitespace-nowrap text-[10px] font-bold tracking-wide min-[360px]:block sm:text-[11px]">{BRAND.role}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {LINKS.map((l) => (
            <a key={l.id} href={`/#${l.id}`} className={`pf-nav-link ${active === l.id ? 'is-active' : ''}`}>{isVi ? l.vi : l.en}</a>
          ))}
          <span aria-hidden className="mx-1 h-4 w-px bg-[var(--pf-line)]" />
          {STORE_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="pf-nav-link">{isVi ? l.vi : l.en}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`${MAIN_SITE}/dich-vu`} className="pf-btn !py-1.5 !px-3.5 !text-xs hidden sm:inline-flex items-center gap-1.5">
            {isVi ? `Thuê ${BRAND.name}` : `Hire ${BRAND.name}`} <ArrowUpRight className="h-3.5 w-3.5" />
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
          {STORE_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="pf-nav-link">{isVi ? l.vi : l.en} ↗</a>
          ))}
        </nav>
      )}
    </header>
  );
}
