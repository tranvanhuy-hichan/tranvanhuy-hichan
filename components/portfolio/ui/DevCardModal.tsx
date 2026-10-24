'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toCanvas } from 'html-to-image';
import { usePortfolioStore } from '@/lib/portfolio/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { logoDataUri } from '@/lib/portfolio/logoDataUri';
import { PORTFOLIO_URL, PORTFOLIO_HOST } from '@/lib/site';

export default function DevCardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const locale = usePortfolioStore((s) => s.locale);
  const sound = useSoundEffects();
  const isVi = locale === 'vi';
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (isOpen) sound.playModalOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  // Direct DOM capture with html-to-image (2.5x Retina, 620px wide)
  async function downloadCardPng() {
    sound.playClick();
    setIsGenerating(true);
    const node = document.getElementById('dev-card-element');
    try {
      if (!node) throw new Error('Card element not found');
      // Wait for web fonts so the capture doesn't fall back to another font.
      if ((document as any).fonts?.ready) await (document as any).fonts.ready;

      // Capture from a clone appended to body so it lays out at a true 620px on every device.
      // Keep it inside the viewport (offscreen clones rasterize blank on some mobile browsers)
      // and do not use opacity/visibility (html-to-image bakes the style into the output).
      const clone = node.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.width = '620px';
      clone.style.minWidth = '620px';
      clone.style.maxWidth = '620px';
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.zIndex = '-1';
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const pixelRatio = 2.5;

      // The logo <img> does not survive html-to-image on some mobile browsers, so capture the
      // card without it and draw it onto the canvas with the Canvas 2D API.
      const cloneLogoImg = clone.querySelector('img') as HTMLImageElement | null;
      let logoRect: any = null;
      if (cloneLogoImg) {
        const cloneRect = clone.getBoundingClientRect();
        const imgRect = cloneLogoImg.getBoundingClientRect();
        logoRect = {
          x: imgRect.left - cloneRect.left,
          y: imgRect.top - cloneRect.top,
          width: imgRect.width,
          height: imgRect.height,
          radius: parseFloat(getComputedStyle(cloneLogoImg.parentElement || cloneLogoImg).borderRadius) || 0,
        };
        cloneLogoImg.style.visibility = 'hidden';
      }

      let canvas: HTMLCanvasElement;
      try {
        const actualHeight = clone.offsetHeight;
        canvas = await toCanvas(clone, {
          pixelRatio,
          quality: 1.0,
          cacheBust: false,
          backgroundColor: '#ffffff',
          width: 620,
          height: actualHeight,
        });
      } finally {
        document.body.removeChild(clone);
      }

      if (logoRect) {
        const logoImgEl = new Image();
        await new Promise((resolve, reject) => {
          logoImgEl.onload = resolve;
          logoImgEl.onerror = reject;
          logoImgEl.src = logoDataUri;
        });
        const ctx = canvas.getContext('2d')!;
        const x = logoRect.x * pixelRatio;
        const y = logoRect.y * pixelRatio;
        const w = logoRect.width * pixelRatio;
        const h = logoRect.height * pixelRatio;
        const r = logoRect.radius * pixelRatio;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(logoImgEl, x, y, w, h);
        ctx.restore();
      }

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      if (!dataUrl || dataUrl.length < 100) {
        throw new Error(`Export produced an empty image (dataUrl length: ${dataUrl?.length ?? 0})`);
      }
      const link = document.createElement('a');
      link.download = 'tranvanhuy-dev-card.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      sound.playSuccess();
    } catch (err: any) {
      console.error('Error generating card image', err);
      alert(isVi ? `Xuất ảnh thất bại: ${err?.message || err}` : `Export failed: ${err?.message || err}`);
    } finally {
      setIsGenerating(false);
    }
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fade-modal fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-[672px] pf-card p-4 sm:p-6 !shadow-2xl text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 pf-icon-btn !w-9 !h-9 z-10"
          title={isVi ? 'Đóng' : 'Close'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-3 sm:mb-4 pr-10">
          <div className="pf-pill pf-pill-sky mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            <span>{isVi ? 'DANH THIẾP DEV CARD' : 'DEVELOPER PASS'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black pf-title">
            {isVi ? 'Thẻ Danh Thiếp Kỹ Sư Phần Mềm' : 'Digital Developer Business Card'}
          </h3>
        </div>

        <div className="overflow-x-auto pb-1 scrollbar-thin">
<div
              id="dev-card-element"
              className="relative rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-[#d8f7ea] text-slate-900 border border-brand-200 shadow-sm overflow-hidden flex flex-col"
              style={{width:'620px',minWidth:'620px',height:'354px',minHeight:'354px',fontFamily:"'Nunito', system-ui, -apple-system, sans-serif"}}
            >
              {/* Card Main Body */}
              <div className="p-6 pb-4 flex-1 flex flex-col justify-between">
                {/* 1. Top Section: Header & Pure QR on Right */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Official System Logo, Name & Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl shadow-sm shrink-0 overflow-hidden">
                      <img src={logoDataUri} alt="System Logo" className="w-full h-full object-cover" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap leading-tight">
                        Trần Văn Huy
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 whitespace-nowrap">
                        Software Developer • Full-Stack &amp; AI Solutions
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium italic mt-1 whitespace-nowrap">
                        &quot;Turning data into scalable, intelligent software systems.&quot;
                      </p>
                    </div>
                  </div>

                  {/* Top-Right: Pure QR Code Tile */}
                  <div className="p-1 rounded-xl bg-slate-50 border border-slate-200 shrink-0 shadow-2xs" title={PORTFOLIO_URL}>
                    <QRCodeSVG value={PORTFOLIO_URL} size={56} level="M" className="block shrink-0" />
                  </div>
                </div>

                {/* 2. Middle Section: Unified Connected Panel (Education & Experience) */}
                <div className="rounded-xl bg-white/80 border border-brand-200 grid grid-cols-2 divide-x divide-brand-200 shadow-2xs overflow-hidden">
                  {/* Education Column */}
                  <div className="p-3.5 flex flex-col justify-between h-[80px]">
                    <div className="flex items-center justify-between gap-1 leading-none">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-semibold">Education</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 border border-brand-200 font-semibold font-bold text-[10px] whitespace-nowrap">
                        GPA 3.5
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 whitespace-nowrap leading-snug">University of Science and Technology - UDN</p>
                      <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap mt-0.5">Data Science &amp; Artificial Intelligence</p>
                    </div>
                  </div>

                  {/* Experience Column */}
                  <div className="p-3.5 flex flex-col justify-between h-[80px]">
                    <div className="flex items-center justify-between gap-1 leading-none">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-semibold">Experience</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#c8f5e5] text-[#0b6b4f] border border-[#9fe8cf] font-semibold font-semibold text-[10px] whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>MakeAI</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 whitespace-nowrap leading-snug">Software Developer Intern</p>
                      <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap mt-0.5">
                        Web Apps &amp; AI Systems Development
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Core Expertise: Unified Strip */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-semibold">Core Expertise</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="px-2.5 py-3 rounded-lg bg-white/80 border border-brand-200 flex items-center justify-center text-center">
                      <p className="text-[10px] font-bold text-slate-800 leading-snug whitespace-nowrap">Full-Stack Web Apps</p>
                    </div>
                    <div className="px-2.5 py-3 rounded-lg bg-white/80 border border-brand-200 flex items-center justify-center text-center">
                      <p className="text-[10px] font-bold text-slate-800 leading-snug whitespace-nowrap">Data &amp; AI Systems</p>
                    </div>
                    <div className="px-2.5 py-3 rounded-lg bg-white/80 border border-brand-200 flex items-center justify-center text-center">
                      <p className="text-[10px] font-bold text-slate-800 leading-snug whitespace-nowrap">GIS &amp; Digital Transform.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Bottom Footer Strip: Grounded Solid Base */}
              <div className="mt-auto px-5 py-2.5 bg-white/60 border-t border-brand-200 flex items-center justify-between gap-3 text-[10.5px] text-slate-600 font-semibold shrink-0">
                <div className="flex items-center gap-3 whitespace-nowrap min-w-0 overflow-hidden">
                  {/* Email */}
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>tranvanhuy064206@gmail.com</span>
                  </span>
                  {/* Location */}
                  <span className="flex items-center gap-1.5 text-slate-500 shrink-0">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>Da Nang, Vietnam</span>
                  </span>
                </div>

                {/* GitHub */}
                <a
                  href="https://github.com/tranvanhuy-hichan"
                  target="_blank" rel="noopener"
                  className="text-brand-700 hover:text-brand-500 font-semibold shrink-0 flex items-center gap-1.5 whitespace-nowrap transition-colors"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>github.com/tranvanhuy-hichan</span>
                </a>
              </div>
            </div>
        </div>

        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs pf-soft font-semibold">
            {isVi ? 'Lưu thẻ hồ sơ để đính kèm email hoặc gửi nhanh cho nhà tuyển dụng.' : 'Save this profile card to attach to emails or share with recruiters.'}
          </p>
          <button
            onClick={downloadCardPng}
            disabled={isGenerating}
            className="pf-btn w-full sm:w-auto"
          >
            {!isGenerating && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
            {isGenerating && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
            <span>{isGenerating ? (isVi ? 'Đang xuất thẻ...' : 'Exporting...') : isVi ? 'Tải Thẻ Profile' : 'Download Card'}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
