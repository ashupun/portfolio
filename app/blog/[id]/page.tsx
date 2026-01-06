'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Dock } from '../../components/dock';
import { ChevronLeft } from '../../components/icons';
import { blogs } from '../../data/blogs';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen pb-24">
        <Dock />
        <main className="max-w-3xl mx-auto px-4 md:px-8 pt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--pink)] transition-colors mb-6">
            <ChevronLeft /> Back to Blog
          </Link>
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Blog post not found</h1>
            <p className="text-[var(--muted)]">The blog post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <Dock />
      <main className="max-w-3xl mx-auto px-4 md:px-8 pt-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--pink)] transition-colors mb-6">
          <ChevronLeft /> Back to Blog
        </Link>
        <article className="card !animate-none hover:!animate-none hover:!shadow-none hover:!border-[var(--border)]">
          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-6 bg-[var(--border)]">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
          <div className="mb-4">
            <span className="text-sm text-[var(--muted)]">{formatDate(blog.date)}</span>
            <h1 className="text-3xl md:text-2xl font-bold mt-1">{blog.title}</h1>
          </div>
          <div className="prose prose-sm max-w-none">
            {blog.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 text-[var(--muted)] mb-4">
                    {items.map((item, j) => {
                      const content = item.replace('- ', '');
                      const boldMatch = content.match(/^\*\*(.+?)\*\*(.*)$/);
                      if (boldMatch) {
                        return (
                          <li key={j}>
                            <strong className="text-[var(--fg)]">{boldMatch[1]}</strong>
                            {boldMatch[2]}
                          </li>
                        );
                      }
                      return <li key={j}>{content}</li>;
                    })}
                  </ul>
                );
              }
              return <p key={i} className="text-[var(--muted)] mb-4 leading-relaxed">{paragraph}</p>;
            })}
          </div>
        </article>
      </main>
    </div>
  );
}
