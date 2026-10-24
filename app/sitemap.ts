import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/portfolio/projects';
import { PORTFOLIO_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${PORTFOLIO_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...getAllProjects('en').map((p) => ({ url: `${PORTFOLIO_URL}/projects/${p.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
