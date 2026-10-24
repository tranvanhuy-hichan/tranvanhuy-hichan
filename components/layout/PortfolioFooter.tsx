import { STORE_URL, BRAND } from '@/lib/site';

export default function PortfolioFooter() {
  return (
    <footer className="border-t border-[var(--pf-line)] px-4 py-8 text-center text-sm font-semibold pf-mute">
      <p>© {new Date().getFullYear()} Trần Văn Huy · <a className="pf-brand hover:underline" href={STORE_URL}>{BRAND.name}</a></p>
    </footer>
  );
}
