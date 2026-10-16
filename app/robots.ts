import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap:
      'https://rohith-builders-dna-v3.bonny-fir-5255.chatgpt.site/sitemap.xml',
  };
}
