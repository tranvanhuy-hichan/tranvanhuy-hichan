import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import PortfolioShell from '@/components/portfolio/layout/PortfolioShell';
import PortfolioNavbar from '@/components/layout/PortfolioNavbar';
import PortfolioFooter from '@/components/layout/PortfolioFooter';

const SITE = 'https://portfolio.tranvanhuy.io.vn';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0ea5e9' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Trần Văn Huy | Software Developer & AI Solutions',
  description: 'Portfolio của Trần Văn Huy: kinh nghiệm, dự án, kỹ năng, học vấn và thông tin liên hệ.',
  authors: [{ name: 'Trần Văn Huy' }],
  alternates: { canonical: SITE },
  manifest: '/manifest.json',
  icons: { icon: [{ url: '/favicon.ico' }, { url: '/favicon.svg', type: 'image/svg+xml' }], apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    siteName: 'Trần Văn Huy | Portfolio',
    title: 'Trần Văn Huy | Software Developer & AI Solutions',
    description: 'Software Developer building scalable web, backend, and mobile systems with AI solutions.',
    images: [{ url: '/dev-card-og.png', width: 1550, height: 885 }],
    locale: 'vi_VN',
  },
};

// One theme mechanism: `html.dark` class, persisted in localStorage `theme`, default = system preference.
const themeScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.toggle('dark',d);c.toggle('light',!d);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PortfolioShell>
          <PortfolioNavbar />
          {children}
          <PortfolioFooter />
        </PortfolioShell>
      </body>
    </html>
  );
}
