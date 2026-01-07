'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dock } from '../components/dock';
import { About } from '../components/widget';
import { Arrow } from '../components/icons';
import { blogs, getExcerpt } from '../data/blogs';

const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function BlogCard({ blog }: { blog: typeof sortedBlogs[0] }) {
  return (
    <Link href={`/blog/${blog.id}`} className="card flex flex-col group">
      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-[var(--border)] flex-shrink-0 relative">
        <Image src={blog.image} alt={blog.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
      </div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg md:text-base font-semibold line-clamp-1">{blog.title}</h3>
        <span className="text-sm md:text-xs text-[var(--muted)] flex-shrink-0 ml-2">{formatDate(blog.date)}</span>
      </div>
      <p className="text-base md:text-sm text-[var(--muted)] mb-3 flex-1 line-clamp-2">{getExcerpt(blog.content)}</p>
      <span className="text-[var(--pink)] text-sm md:text-xs font-medium group-hover:underline flex items-center gap-1 self-start">
        Read more <Arrow />
      </span>
    </Link>
  );
}

export default function Blog() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 1024 ? 2 : 6);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  const totalPages = Math.ceil(sortedBlogs.length / itemsPerPage);
  const currentBlogs = sortedBlogs.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const changePage = (newPage: number) => {
    if (newPage === page || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      setIsTransitioning(false);
    }, 150);
  };

  const prevPage = () => changePage(Math.max(0, page - 1));
  const nextPage = () => changePage(Math.min(totalPages - 1, page + 1));

  return (
    <div className="min-h-screen pb-24">
      <Dock pagination={{ page, totalPages, onPrev: prevPage, onNext: nextPage, isTransitioning }} />
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="hidden md:block w-full lg:w-[360px] flex-shrink-0">
            <About typing={false} />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-2xl font-bold md:mb-1">Blog</h1>
              <p className="hidden md:block text-sm text-[var(--muted)]">Thoughts, updates, and random musings.</p>
            </div>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 flex-1 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            >
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
