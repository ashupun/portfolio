import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, updates, and random musings from Ashu Pun. Read about web development, design, and tech.',
  openGraph: {
    title: 'Blog | Ashu Pun',
    description: 'Thoughts, updates, and random musings from Ashu Pun.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ashu Pun',
    description: 'Thoughts, updates, and random musings from Ashu Pun.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
