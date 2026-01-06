import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of projects and things built by Ashu Pun. Portfolio, web apps, and experiments.',
  openGraph: {
    title: 'Projects | Ashu Pun',
    description: 'A collection of projects and things built by Ashu Pun.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Ashu Pun',
    description: 'A collection of projects and things built by Ashu Pun.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
