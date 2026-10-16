import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Solution Studio — Rohith Ganesh',
  description:
    'Explore AI, MCP, AWS and full-stack development services, project planning and engineering process.',
};
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
