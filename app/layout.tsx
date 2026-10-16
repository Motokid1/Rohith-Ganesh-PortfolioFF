import type { Metadata } from 'next';
import '../styles/portfolio.css';
export const metadata: Metadata = {
  metadataBase: new URL(
    'https://rohith-builders-dna-v3.bonny-fir-5255.chatgpt.site',
  ),
  title: 'Rohith Ganesh | The Builder’s DNA V4',
  description:
    'AI systems, MCP integrations, secure RAG, cloud engineering and full-stack products. Explore the engineering work of Rohith Ganesh.',
  openGraph: {
    title: 'The Builder’s DNA — Rohith Ganesh',
    description: 'Engineering Intelligence Into Reality.',
    images: ['/social.png'],
  },
  robots: { index: true, follow: true },
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
