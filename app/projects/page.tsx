'use client';

import { useState } from 'react';
import { Dock } from '../components/dock';
import { About } from '../components/widget';
import { GitHub, Globe } from '../components/icon';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js and Tailwind CSS featuring a bento grid layout.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/ashupun/portfolio',
    live: 'https://ashu.dev',
    cover: '/projects/portfolio.png',
  },
  {
    title: 'Weather App',
    description: 'A minimal weather application with location-based forecasts and beautiful UI.',
    tech: ['React', 'OpenWeather API', 'CSS'],
    github: 'https://github.com/ashupun/weather-app',
    cover: '/projects/weather.png',
  },
  {
    title: 'Task Manager',
    description: 'Full-stack task management app with drag-and-drop functionality.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/ashupun/task-manager',
    live: 'https://tasks.ashu.dev',
    cover: '/projects/taskmanager.png',
  },
  {
    title: 'Chat Application',
    description: 'Real-time chat application with rooms and direct messaging.',
    tech: ['React', 'Socket.io', 'Node.js'],
    github: 'https://github.com/ashupun/chat-app',
    cover: '/projects/chat.png',
  },
  {
    title: 'E-commerce Store',
    description: 'Modern e-commerce platform with cart, checkout, and payment integration.',
    tech: ['Next.js', 'Stripe', 'Sanity'],
    github: 'https://github.com/ashupun/ecommerce',
    live: 'https://shop.ashu.dev',
    cover: '/projects/ecommerce.png',
  },
  {
    title: 'Blog Platform',
    description: 'Markdown-based blog with syntax highlighting and dark mode support.',
    tech: ['Next.js', 'MDX', 'Tailwind CSS'],
    github: 'https://github.com/ashupun/blog',
    cover: '/projects/blog.png',
  },
  {
    title: 'AI Image Generator',
    description: 'Web app that generates images from text prompts using Stable Diffusion API.',
    tech: ['Python', 'FastAPI', 'React'],
    github: 'https://github.com/ashupun/ai-image-gen',
    live: 'https://imagine.ashu.dev',
    cover: '/projects/aiimage.png',
  },
  {
    title: 'Spotify Stats',
    description: 'Dashboard to visualize your Spotify listening habits and top tracks.',
    tech: ['Next.js', 'Spotify API', 'Chart.js'],
    github: 'https://github.com/ashupun/spotify-stats',
    cover: '/projects/spotify.png',
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="card flex flex-col">
      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-[var(--border)]">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold">{project.title}</h3>
        <div className="flex gap-2">
          {project.github && (
            <a href={project.github} className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors">
              <GitHub />
            </a>
          )}
          {project.live && (
            <a href={project.live} className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors">
              <Globe />
            </a>
          )}
        </div>
      </div>
      <p className="text-xs text-[var(--muted)] mb-3 flex-1 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--pink-light)] text-[var(--pink)] border border-[var(--pink-border)]">
            {t}
          </span>
        ))}
      </div>
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

export default function Projects() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

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
              <h1 className="text-2xl font-bold mb-1">Projects</h1>
              <p className="text-sm text-[var(--muted)]">A collection of things I've built and worked on.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 content-start" style={{ gridAutoRows: 'minmax(320px, auto)', minHeight: '680px' }}>
              {currentProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
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
