'use client';
import { useEffect, useState } from 'react';
import { usePortfolio } from '@/lib/portfolio/store';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { IconGithub, IconLinkedin, IconFacebook, IconMail, IconDownload, IconId, IconFolder } from '../icons/Icons';
import HeroIllustration from '../ui/HeroIllustration';
import DevCardModal from '../ui/DevCardModal';

const DEFAULT_TAGLINES = [
  'Software Developer',
  'Full-Stack & Backend Engineer',
  'Data Science & AI Solutions',
  'Java Spring Boot & Next.js',
];

export default function HeroSection() {
  const store = usePortfolio();
  const sound = useSoundEffects();
  const isVi = store.locale === 'vi';
  const [showDevCard, setShowDevCard] = useState(false);
  const [currentTagline, setCurrentTagline] = useState('Software Developer & Full-Stack Engineer');
  const personal = store.personal;
  const taglines: string[] = personal.taglines || DEFAULT_TAGLINES;
  const taglinesKey = taglines.join('|');

  // Typewriter with clean loop (restarts when locale/taglines change)
  useEffect(() => {
    let timer: any;
    let tagIndex = 0;
    let charIndex = taglines[0]?.length || 0;
    let isDeleting = false;
    setCurrentTagline(taglines[0] || '');

    function tick() {
      if (!taglines.length) return;
      const fullText = taglines[tagIndex % taglines.length];
      if (isDeleting) {
        setCurrentTagline(fullText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentTagline(fullText.substring(0, charIndex + 1));
        charIndex++;
      }
      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === fullText.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        tagIndex++;
        speed = 400;
      }
      timer = setTimeout(tick, speed);
    }

    if (taglines.length > 0) {
      timer = setTimeout(() => {
        isDeleting = true;
        tick();
      }, 2000);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taglinesKey]);

  function scrollTo(selector: string) {
    sound.playClick();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const statement =
    personal.statement ||
    (isVi
      ? 'Sinh viên CNTT ĐH Bách Khoa (GPA 3.5) & Full-Stack Developer tại Digital Twin Group (MakeAI), chuyên phát triển các hệ thống Spring Boot, Next.js và giải pháp tự động hóa với AI.'
      : 'IT Student at Bach Khoa Da Nang (GPA 3.5) & Full-Stack Developer at Digital Twin Group (MakeAI), specializing in Spring Boot, Next.js, and practical AI automation.');

  const roleWord = isVi ? 'Lập trình viên' : 'Developer';
  const social = 'pf-icon-btn';

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center pt-12 sm:pt-16 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none pf-dots opacity-60" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-200/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-300/30 blur-3xl pointer-events-none" />


      <div className="relative z-10 w-full max-w-[var(--page-max)] mx-auto min-w-0">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-w-0 w-full">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left fade-left min-w-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5">
              <span className="pf-pill pf-pill-mint -rotate-3 text-sm px-4 py-1.5">Software Developer</span>
              <span className="pf-pill pf-pill-sun rotate-2 text-sm px-4 py-1.5">Nhận dự án</span>
              <span className="pf-pill pf-pill-sky -rotate-1 text-xs px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="whitespace-normal text-left">{personal.statusTag || personal.availability}</span>
              </span>
            </div>

            <h1 className="pf-heading text-4xl sm:text-6xl lg:text-7xl break-words">
              {isVi ? 'Hi, Mình là 1' : "Hi, I'm a"}
              <br />
              <span className="text-brand-500">{roleWord}</span>
            </h1>
            <p className="mt-3 text-xl sm:text-2xl font-black pf-title">{personal.name}</p>

            <div className="mt-4 inline-flex items-center gap-2 pf-card rounded-full px-4 py-1.5 text-sm font-extrabold pf-brand max-w-full">
              <span className="pf-mute select-none">&gt;</span>
              <span className="truncate">{currentTagline}</span>
              <span className="w-0.5 h-4 bg-brand-500 animate-pulse inline-block shrink-0" />
            </div>

            <p className="mt-5 pf-soft text-base sm:text-lg font-semibold leading-relaxed max-w-xl break-words">{statement}</p>

            <div className="btn-row mt-7 justify-center lg:justify-start max-w-sm sm:max-w-none">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}
                className="pf-btn"
                id="hero-view-projects"
              >
                <IconFolder className="w-4 h-4 shrink-0" />
                <span>{store.ui.viewProjects || 'Xem dự án'}</span>
              </a>
              <a href={personal.cv} download className="pf-btn-ghost" id="hero-download-cv">
                <IconDownload className="w-4 h-4 shrink-0" />
                <span className="truncate">{store.ui.downloadCv || 'Tải CV'}</span>
              </a>
              <button type="button" onClick={() => setShowDevCard(true)} className="pf-btn-ghost">
                <IconId className="w-4 h-4 shrink-0" />
                <span className="truncate">{isVi ? 'Thẻ Dev Card' : 'Dev Card'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2.5 w-full mt-6">
              {Object.entries(personal.socials || {}).map(([platform, url]) => (
                <a key={platform} href={url as string} target="_blank" rel="noopener" className={social} aria-label={platform}>
                  {platform === 'github' && <IconGithub className="w-4 h-4 fill-current" />}
                  {platform === 'linkedin' && <IconLinkedin className="w-4 h-4 fill-current" />}
                  {platform === 'facebook' && <IconFacebook className="w-4 h-4 fill-current" />}
                </a>
              ))}
              <a href={`mailto:${personal.email}`} className={social} aria-label="Email">
                <IconMail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 fade-right w-full min-w-0 flex justify-center lg:justify-end">
            {personal.avatar ? (
              <div className="relative max-w-xs sm:max-w-sm w-full -rotate-2">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-brand-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={personal.avatar} alt={personal.name} className="relative w-full h-auto object-cover aspect-square rounded-[2rem] border-4 border-white shadow-xl" />
              </div>
            ) : (
              <HeroIllustration className="w-full max-w-sm sm:max-w-md lg:max-w-none h-auto" />
            )}
          </div>
        </div>
      </div>

      <DevCardModal isOpen={showDevCard} onClose={() => setShowDevCard(false)} />
    </section>
  );
}
