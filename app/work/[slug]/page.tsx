import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CaseStudy from '../../../components/CaseStudy';
import { projects } from '../../../data/content';
import { casePath, slugs } from '../../../data/routes';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: slugs[p.id] }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => slugs[p.id] === slug);
  return {
    title: p ? `${p.title} — Rohith Ganesh` : 'Project not found',
    description: p?.solution,
    alternates: { canonical: p ? casePath(p.id) : undefined },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => slugs[p.id] === slug);
  if (!p) notFound();
  return (
    <>
      <header>
        <Link href="/" className="brand">
          <span className="brand-symbol">◈</span>THE BUILDER’S DNA
        </Link>
        <Link href="/#contact" className="nav-cta">
          Discuss a project ↗
        </Link>
      </header>
      <main>
        <CaseStudy projectId={p.id} />
      </main>
      <footer>
        <Link href="/">← Back to Rohith’s portfolio</Link>
        <Link href="/#contact">Start a conversation ↗</Link>
      </footer>
    </>
  );
}
