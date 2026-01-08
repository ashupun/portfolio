import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from '../../components/icons';
import { blogs, getExcerpt } from '../../data/blogs';

const baseUrl = 'https://ashupun.com';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const excerpt = getExcerpt(blog.content);

  return {
    title: blog.title,
    description: excerpt,
    openGraph: {
      title: blog.title,
      description: excerpt,
      type: 'article',
      publishedTime: blog.date,
      authors: ['Ashu Pun'],
      url: `${baseUrl}/blog/${blog.id}`,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: excerpt,
      images: [blog.image],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${blog.id}`,
    },
  };
}

export function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id,
  }));
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params;
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    image: `${baseUrl}${blog.image}`,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Person',
      name: 'Ashu Pun',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Ashu Pun',
      url: baseUrl,
    },
    description: getExcerpt(blog.content),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${blog.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="min-h-screen pb-28">
        <main className="max-w-3xl mx-auto px-4 md:px-8 pt-8 lg:pt-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--pink)] transition-colors mb-6">
            <ChevronLeft /> Back to Blog
          </Link>
          <article className="card !animate-none hover:!animate-none hover:!shadow-none hover:!border-[var(--border)]">
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-6 bg-[var(--border)] relative">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
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
    </>
  );
}
