"use client";

import { useState } from "react";
import { GitHub, Globe } from "../components/icons";

function getScreenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

const projects = [
  {
    title: "ashupun.com",
    description:
      "My personal portfolio website showcasing my projects and blog.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/ashupun/portfolio",
    live: "https://ashupun.com",
  },
  {
    title: "sweethe.art",
    description: "Link Aggregator: simple and elegant link in bio page.",
    tech: ["Next.js", "CSS"],
    github: "https://github.com/ashupun/sweetheart",
    live: "https://sweethe.art",
  },
  {
    title: "lovehe.art",
    description:
      "A cryptocurrency converter that let's you convert stable coins with minimal transaction fees.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/ashupun/loveheart",
    live: "https://lovehe.art",
  },
  {
    title: "sugarblooms.co.uk",
    description: "Website for a bespoke cake business based in the UK.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/ashupun/sugarblooms",
    live: "https://sugarblooms.co.uk",
  },
  {
    title: "cryba.by",
    description:
      "A quiet digital space for emotional release and gentle support.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/ashupun/crybaby",
    live: "https://cryba.by",
  },
  {
    title: "loving.gg",
    description: "Send love notes to your family, friends or partner.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/ashupun/loving",
  },
  {
    title: "bunnyrabb.it",
    description:
      "Coming Soon: A cute bunny-themed drag-and-drop task management for staying organized.",
    tech: ["Next.js", "Tailwind CSS"],
    github: "https://github.com/ashupun/bunnyrabbit",
    live: "https://bunnyrabb.it",
  },
  {
    title: "Weather App",
    description: "Minimal weather app with location-based forecasts.",
    tech: ["React", "OpenWeather API", "CSS"],
    github: "https://github.com/ashupun/weather-app",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [imageError, setImageError] = useState(false);
  const screenshotUrl = project.live ? getScreenshotUrl(project.live) : null;

  return (
    <div className="card flex flex-col group">
      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-[var(--border)] flex-shrink-0 relative">
        {!screenshotUrl || imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--pink)]/20 to-[var(--pink)]/5">
            <span className="text-sm font-medium text-[var(--muted)]">
              Coming Soon
            </span>
          </div>
        ) : (
          <img
            src={screenshotUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {project.live && (
            <img
              src={
                project.live === "https://ashupun.com"
                  ? "/favicon.ico"
                  : project.live === "https://sweethe.art"
                  ? "/sweethearticon.png"
                  : project.live === "https://cryba.by"
                  ? "/crybabyicon.png"
                  : `https://www.google.com/s2/favicons?domain=${
                      new URL(project.live).hostname
                    }&sz=32`
              }
              alt=""
              className="w-4 h-4 flex-shrink-0"
            />
          )}
          <h3 className="text-lg md:text-base font-semibold line-clamp-1">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors"
            >
              <GitHub className="w-5 h-5" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      <p className="text-base md:text-sm text-[var(--muted)] mb-3 flex-1 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs md:text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--pink-light)] text-[var(--pink)] border border-[var(--pink-border)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="min-h-screen pb-28">
      <main className="max-w-[1800px] mx-auto px-4 md:px-8 pt-8 lg:pt-6">
        <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-2xl font-bold">Projects</h1>
          <p className="hidden md:block text-sm text-[var(--muted)]">
            A collection of things I've built and worked on.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
