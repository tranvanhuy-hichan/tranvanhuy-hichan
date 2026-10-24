import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/portfolio/sections/ProjectDetail';
import { getAllProjects } from '@/lib/portfolio/projects';
import { PORTFOLIO_URL } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects('en').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getAllProjects('en').find((x) => x.slug === slug);
  if (!p) return { title: 'Project Not Found | Trần Văn Huy' };
  const title = `${p.title} | Trần Văn Huy`;
  const url = `${PORTFOLIO_URL}/projects/${p.slug}/`;
  return { title, description: p.description, alternates: { canonical: url }, openGraph: { title, description: p.description, url, type: 'article', images: p.image ? [p.image] : undefined } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getAllProjects('en').some((p) => p.slug === slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
