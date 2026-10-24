import type { MetadataRoute } from 'next';
import { PORTFOLIO_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${PORTFOLIO_URL}/sitemap.xml` };
}
