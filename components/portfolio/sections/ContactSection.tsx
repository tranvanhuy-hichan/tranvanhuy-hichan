'use client';
import { useEffect, useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import QrCodeModal from '../ui/QrCodeModal';
import { IconGithub, IconLinkedin, IconFacebook, IconMail, IconQrCode, IconDownload } from '../icons/Icons';
import { usePortfolio } from '@/lib/portfolio/store';
import { useContactForm } from '@/hooks/useContactForm';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function ContactSection() {
  const store = usePortfolio();
  const sound = useSoundEffects();
  const isVi = store.locale === 'vi';
  const { form, setField, errors, isSubmitting, submitStatus, errorMessage, submit: originalSubmit } = useContactForm();
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const p = store.personal;

  function copyEmail() {
    sound.playSuccess();
    navigator.clipboard.writeText(p.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => {
    if (submitStatus === 'success') sound.playSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStatus]);

  const socialCard =
    'pf-card pf-card-hover !rounded-3xl p-4 flex flex-col items-center justify-center gap-2 text-center text-sm font-black pf-title';
  const infoLabel = 'text-[11px] uppercase tracking-wider font-black pf-mute';

  return (
    <section id="contact" className="relative py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-[var(--page-max)] mx-auto relative z-10">
        <SectionTitle
          title={store.ui.contactTitle || "Let's Build Something"}
          subtitle={store.ui.contactSubtitle || 'Get In Touch'}
          description={store.ui.contactDesc || 'I am currently open to Software Engineer and Full-Stack Developer opportunities (Intern / Junior / Full-time).'}
        />

        {/* Social cards */}
        <div className="mb-8 sm:mb-10 fade-up">
          <h3 className="text-xl sm:text-2xl font-black pf-title mb-4">
            {isVi ? 'Kết nối với mình qua' : 'Connect with me via'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {p.socials?.linkedin && (
              <a href={p.socials.linkedin} target="_blank" rel="noopener" className={socialCard}>
                <span className="w-12 h-12 rounded-2xl bg-[#d9f1ff] text-[#0a66c2] flex items-center justify-center"><IconLinkedin className="w-6 h-6" /></span>
                LinkedIn
              </a>
            )}
            {p.socials?.github && (
              <a href={p.socials.github} target="_blank" rel="noopener" className={socialCard}>
                <span className="w-12 h-12 rounded-2xl bg-[#e8ecf4] text-[#14213d] flex items-center justify-center"><IconGithub className="w-6 h-6" /></span>
                GitHub
              </a>
            )}
            {p.socials?.facebook && (
              <a href={p.socials.facebook} target="_blank" rel="noopener" className={socialCard}>
                <span className="w-12 h-12 rounded-2xl bg-[#d9f1ff] text-[#1877f2] flex items-center justify-center"><IconFacebook className="w-6 h-6" /></span>
                Facebook
              </a>
            )}
            <a href={`mailto:${p.email}`} className={socialCard}>
              <span className="w-12 h-12 rounded-2xl bg-[#ffd6e2] text-[#9f1d48] flex items-center justify-center"><IconMail className="w-6 h-6" /></span>
              Email
            </a>
            <button type="button" onClick={() => setShowQrModal(true)} className={`${socialCard} cursor-pointer`} title={isVi ? 'Quét mã QR Portfolio' : 'Scan QR Portfolio'}>
              <span className="w-12 h-12 rounded-2xl bg-[#c8f5e5] text-[#0b6b4f] flex items-center justify-center"><IconQrCode className="w-6 h-6" /></span>
              {isVi ? 'Mã QR Portfolio' : 'QR Portfolio'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left column */}
          <div className="lg:col-span-5 flex flex-col justify-between pf-card p-6 sm:p-8 fade-left">
            <div>
              <span className="pf-pill pf-pill-mint -rotate-2 mb-3">{isVi ? 'Kết nối chuyên môn' : 'Tech Networking'}</span>
              <h3 className="text-xl sm:text-2xl font-black pf-title leading-snug">
                {isVi ? 'Liên hệ & Trao đổi Công nghệ' : "Let's Connect & Collaborate"}
              </h3>
              <p className="text-sm pf-soft font-semibold leading-relaxed mt-2 mb-5">
                {isVi
                  ? 'Tôi luôn cởi mở kết nối với các lập trình viên, chia sẻ chuyên môn kỹ thuật hoặc trao đổi về các dự án phần mềm & giải pháp AI.'
                  : 'Always open to connecting with fellow engineers, sharing technical insights, or discussing impactful software and AI solutions.'}
              </p>

              <div className="space-y-3 mb-5">
                <div className="pf-inset p-3.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className={infoLabel}>Email</p>
                    <a href={`mailto:${p.email}`} className="text-sm font-extrabold pf-title hover:text-[var(--pf-brand-text)] truncate block">
                      {p.email}
                    </a>
                  </div>
                  <button onClick={copyEmail} className="pf-chip hover:border-[#0ea5e9] shrink-0 cursor-pointer" title="Copy email">
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {p.phone && (
                  <div className="pf-inset p-3.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className={infoLabel}>{isVi ? 'Điện thoại / Zalo' : 'Phone / Zalo'}</p>
                      <a href={`tel:${p.phone}`} className="text-sm font-extrabold pf-title hover:text-[var(--pf-brand-text)] truncate block">{p.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</a>
                    </div>
                    {p.zalo && <a href={p.zalo} target="_blank" rel="noopener" className="pf-chip hover:border-[#0068ff] shrink-0">Zalo</a>}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="pf-inset p-3.5">
                    <p className={infoLabel}>{isVi ? 'Địa điểm' : 'Location'}</p>
                    <span className="text-sm font-extrabold pf-title block truncate mt-0.5">{p.location}</span>
                  </div>
                  <div className="pf-inset p-3.5">
                    <p className={infoLabel}>{isVi ? 'Trạng thái' : 'Status'}</p>
                    <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-1.5 mt-0.5 truncate" title="Digital Twin Group (MakeAI)">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                      <span className="truncate">{isVi ? 'Làm việc tại DTG' : 'Working @ DTG'}</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="w-full text-left pf-inset p-3.5 hover:border-[#0ea5e9] transition-colors cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-2xl bg-[var(--pf-brand-soft)] pf-brand flex items-center justify-center shrink-0">
                      <IconQrCode className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className={`${infoLabel} block`}>{isVi ? 'Quét QR xem trên điện thoại' : 'Scan QR for Mobile View'}</span>
                      <span className="text-sm font-extrabold pf-title truncate block">portfolio.tranvanhuy.io.vn</span>
                    </span>
                  </div>
                  <span className="pf-pill pf-pill-sky shrink-0">{isVi ? 'Quét mã' : 'Scan QR'}</span>
                </button>
              </div>
            </div>

            <a href={p.cv} download className="pf-btn-ghost w-full">
              <IconDownload className="w-4 h-4 shrink-0" />
              <span>{store.ui.downloadCv || 'Tải CV'}</span>
            </a>
          </div>

          {/* Right column: form */}
          <div className="lg:col-span-7 pf-card p-6 sm:p-8 fade-right flex flex-col h-full">
            <div className="mb-5">
              <h3 className="text-xl sm:text-2xl font-black pf-title">{store.ui.sendMessageTitle || 'Send a Direct Message'}</h3>
              <p className="text-sm pf-soft font-semibold mt-1">
                {isVi ? 'Điền thông tin bên dưới để gửi tin nhắn trực tiếp đến email của tôi.' : 'Fill in the details below to deliver a message straight to my inbox.'}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sound.playClick();
                originalSubmit();
              }}
              className="space-y-4 flex flex-col flex-1 justify-between"
            >
              <div className="space-y-4 flex flex-col flex-1">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-black pf-soft">{store.ui.formName || 'Full Name'}</label>
                    <input
                      value={form.name}
                      onChange={(e) => setField('name', e.target.value)}
                      type="text"
                      id="name"
                      placeholder="Recruiter Name / Company"
                      className={`pf-input ${errors.name ? 'has-error' : ''}`}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-black pf-soft">{store.ui.formEmail || 'Email Address'}</label>
                    <input
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      type="email"
                      id="email"
                      placeholder="email@company.com"
                      className={`pf-input ${errors.email ? 'has-error' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-black pf-soft">{store.ui.formSubject || 'Subject'}</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setField('subject', e.target.value)}
                    id="subject"
                    className={`pf-input cursor-pointer ${errors.subject ? 'has-error' : ''}`}
                  >
                    <option value="" disabled>
                      {isVi ? '-- Chọn tiêu đề phù hợp --' : '-- Select a subject topic --'}
                    </option>
                    {store.presetSubjects.map((s: string) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 font-bold">{errors.subject}</p>}
                </div>

                <div className="space-y-1.5 flex flex-col flex-1 min-h-[140px]">
                  <label htmlFor="message" className="text-xs font-black pf-soft">{store.ui.formMessage || 'Message Content'}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                    id="message"
                    placeholder="Hi Huy, we are impressed with your profile and would like to discuss..."
                    className={`pf-input flex-1 min-h-[130px] resize-none ${errors.message ? 'has-error' : ''}`}
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message}</p>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-sm font-bold w-full sm:w-auto">
                  {submitStatus === 'success' && (
                    <span className="text-emerald-600 flex items-center gap-1.5">{store.ui.formSuccess || '✓ Message sent successfully! Thank you.'}</span>
                  )}
                  {submitStatus === 'error' && (
                    <div className="text-red-500 flex flex-col gap-0.5">
                      <span>{store.ui.formError || '✗ Something went wrong. Please try again later.'}</span>
                      {errorMessage && <span className="text-xs opacity-80 break-words">({errorMessage})</span>}
                    </div>
                  )}
                </div>

                <button type="submit" className="pf-btn w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                  <span>{isSubmitting ? store.ui.formSending || 'Sending...' : store.ui.formSend || 'Send Message'}</span>
                  {!isSubmitting && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <QrCodeModal isOpen={showQrModal} url="https://portfolio.tranvanhuy.io.vn" onClose={() => setShowQrModal(false)} />
    </section>
  );
}
