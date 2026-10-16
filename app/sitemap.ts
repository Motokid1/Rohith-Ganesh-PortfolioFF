import type { MetadataRoute } from 'next';
import { projects } from '../data/content';
import { casePath } from '../data/routes';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = 'https://rohith-builders-dna-v3.bonny-fir-5255.chatgpt.site';
  return [
    { url: origin, changeFrequency: 'monthly', priority: 1 },
    { url: origin + '/studio/', changeFrequency: 'monthly', priority: 0.7 },
    ...projects.map((p) => ({
      url: origin + casePath(p.id),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
