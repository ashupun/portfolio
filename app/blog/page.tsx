import Link from 'next/link';
import Image from 'next/image';
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
  return (
    <div className="min-h-screen pb-28">
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-8 lg:pt-6">
        <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-2xl font-bold">Blog</h1>
          <p className="hidden md:block text-sm text-[var(--muted)]">Thoughts, updates, and random musings.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>
    </div>
  );
}
