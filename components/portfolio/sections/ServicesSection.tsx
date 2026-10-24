'use client';
import Link from 'next/link';
import { HeartHandshake, Globe, Wrench } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolioStore } from '@/lib/portfolio/store';

export const SERVICE_LINKS = [
  {
    href: 'https://www.tranvanhuy.io.vn/thiep-cuoi',
    Icon: HeartHandshake,
    iconColor: 'text-rose-500',
    vi: { label: 'Thiệp cưới', desc: 'Thiệp cưới online đẹp mắt, chia sẻ qua link, kèm RSVP và lời chúc.' },
    en: { label: 'Wedding Invitations', desc: 'Beautiful online wedding invitations with RSVP and guest wishes, shared via a link.' },
  },
  {
    href: 'https://www.tranvanhuy.io.vn/landing',
    Icon: Globe,
    iconColor: 'text-indigo-600',
    vi: { label: 'Landing page', desc: 'Trang giới thiệu sản phẩm, dịch vụ chuyên nghiệp, tối ưu chuyển đổi.' },
    en: { label: 'Landing Pages', desc: 'Professional product and service landing pages optimized for conversion.' },
  },
  {
    href: 'https://www.tranvanhuy.io.vn/tien-ich',
    Icon: Wrench,
    iconColor: 'text-amber-600',
    vi: { label: 'Tiện ích', desc: 'Bộ công cụ nhỏ gọn hữu ích: mã QR, danh thiếp số và nhiều hơn nữa.' },
    en: { label: 'Utilities', desc: 'Handy tools: QR codes, digital business cards and more.' },
  },
];

const SERVICE_TINTS = ['bg-[#d9f1ff]', 'bg-[#d8f7ea]', 'bg-[#fff1c4]'];
const SERVICE_ROT = ['-rotate-2', 'rotate-1', '-rotate-1'];

export default function ServicesSection() {
  const locale = usePortfolioStore((s) => s.locale);
  const isVi = locale === 'vi';
  return (
    <section id="services" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto">
        <SectionTitle
          title={isVi ? 'Dịch vụ' : 'Services'}
          subtitle={isVi ? 'Sản phẩm số' : 'Digital Products'}
          description={
            isVi
              ? 'Các dịch vụ thiết kế và phát triển sản phẩm số tôi cung cấp: thiệp cưới online, landing page và tiện ích web.'
              : 'Digital products I design and build: online wedding invitations, landing pages and web utilities.'
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICE_LINKS.map((s, index) => {
            const t = isVi ? s.vi : s.en;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`pf-sticker ${SERVICE_ROT[index % 3]} ${SERVICE_TINTS[index % 3]} rounded-3xl p-6 border-2 border-white/70 shadow-xl flex flex-col justify-between group fade-up`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-4">
                    <s.Icon className={`w-7 h-7 ${s.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-black text-ink mb-2">{t.label}</h4>
                  <p className="text-sm font-semibold text-ink-soft leading-relaxed mb-5">{t.desc}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-black text-brand-700">
                  <span>{isVi ? 'Xem chi tiết' : 'Explore'}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
