export default function SectionTitle({
  title,
  subtitle = '',
  description = '',
  align = 'left',
}: {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`mb-8 sm:mb-10 fade-up ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${align === 'center' ? '' : ''}`}>
      {subtitle && <span className="pf-pill pf-pill-sky mb-3 -rotate-2">{subtitle}</span>}
      <h2 className="pf-heading text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="pf-soft mt-3 text-sm sm:text-base font-semibold leading-relaxed">{description}</p>}
    </div>
  );
}
