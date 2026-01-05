'use client';

import { useState } from 'react';
import { Dock } from '../components/dock';
import { About } from '../components/widget';
import { Arrow } from '../components/icon';

const blogs = [
  {
    id: 1,
    title: 'New Website Launch',
    content: 'After months of work, I finally launched my new portfolio website! Built with Next.js and Tailwind CSS, featuring a bento grid layout that everyone seems to love. The dark mode uses warm amber tones while light mode goes full pink aesthetic.',
    image: '/blog/website.png',
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'My Setup Tour 2024',
    content: 'Finally got around to documenting my workspace setup. MacBook Pro M4, custom mechanical keyboard, and way too many monitors. Plus my cat keeps stealing my chair.',
    image: '/blog/setup.png',
    date: '2024-01-10',
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function BlogCard({ blog }: { blog: typeof blogs[0] }) {
  return (
    <div className="card flex flex-col">
      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-[var(--border)]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold">{blog.title}</h3>
        <span className="text-xs text-[var(--muted)] flex-shrink-0 ml-2">{formatDate(blog.date)}</span>
      </div>
      <p className="text-xs text-[var(--muted)] mb-3 flex-1 line-clamp-2">{blog.content}</p>
      <button className="text-[var(--pink)] text-xs font-medium hover:underline flex items-center gap-1 self-start">
        Read more <Arrow />
      </button>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Blog() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const currentBlogs = blogs.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="min-h-screen pb-24 page-transition">
      <Dock />
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[360px] flex-shrink-0 space-y-4 self-start">
            <About typing={false} />
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-1">Blog</h1>
              <p className="text-sm text-[var(--muted)]">Thoughts, updates, and random musings.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 content-start" style={{ gridAutoRows: 'minmax(320px, auto)', minHeight: '680px' }}>
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--pink)] hover:border-[var(--pink-border)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </button>
              <span className="text-sm text-[var(--muted)]">{page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--pink)] hover:border-[var(--pink-border)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
