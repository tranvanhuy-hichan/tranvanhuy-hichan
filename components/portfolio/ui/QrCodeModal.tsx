'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { usePortfolioStore } from '@/lib/portfolio/store';

export default function QrCodeModal({
  isOpen,
  url = 'https://www.tranvanhuy.io.vn',
  onClose,
}: {
  isOpen: boolean;
  url?: string;
  onClose: () => void;
}) {
  const locale = usePortfolioStore((s) => s.locale);
  const isVi = locale === 'vi';
  const qrUrl = url || 'https://www.tranvanhuy.io.vn';
  const boxRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  function copyUrl() {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQr() {
    try {
      const canvas = boxRef.current?.querySelector('canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = 'tranvanhuy-portfolio-qr.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download QR code', err);
    }
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fade-modal fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-md pf-card !shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <button onClick={onClose} className="absolute top-4 right-4 pf-icon-btn !w-9 !h-9 z-10" title={isVi ? 'Đóng' : 'Close'} aria-label="Close">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative mb-5">
          <span className="pf-pill pf-pill-sky -rotate-2 mb-2">{isVi ? 'QUÉT MÃ TRUY CẬP' : 'SCAN TO VISIT'}</span>
          <h3 className="text-2xl font-black pf-title tracking-tight">{isVi ? 'Mã QR Portfolio' : 'Portfolio QR Code'}</h3>
          <p className="text-sm pf-soft font-semibold mt-1">
            {isVi
              ? 'Dùng camera điện thoại hoặc Zalo để quét và mở website trên di động'
              : 'Scan with your smartphone camera or QR scanner to view on mobile'}
          </p>
        </div>

        <div className="relative inline-block mx-auto p-4 rounded-3xl bg-white shadow-xl border-4 border-brand-200">
          <div ref={boxRef} className="relative overflow-hidden rounded-xl">
            <QRCodeCanvas value={qrUrl} size={200} level="H" className="block mx-auto" />
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-scan pointer-events-none"></div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-black text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            <span>www.tranvanhuy.io.vn</span>
          </div>
        </div>

        <div className="relative mt-5 flex items-center justify-between gap-2 p-2.5 pf-inset">
          <span className="text-xs font-bold pf-brand truncate px-1">{qrUrl}</span>
          <button onClick={copyUrl} className="pf-chip hover:border-[#0ea5e9] shrink-0 cursor-pointer">
            {copied ? (isVi ? '✓ Đã chép' : '✓ Copied') : isVi ? 'Sao chép' : 'Copy'}
          </button>
        </div>

        <div className="relative grid grid-cols-2 gap-3 mt-4">
          <button onClick={downloadQr} className="pf-btn-ghost !text-xs">
            <svg className="w-4 h-4 pf-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{isVi ? 'Tải ảnh QR' : 'Download QR'}</span>
          </button>
          <a href={qrUrl} target="_blank" rel="noopener" className="pf-btn !text-xs">
            <span>{isVi ? 'Mở trực tiếp' : 'Open Link'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
