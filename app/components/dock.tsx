'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from './icon';

function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );
}

export function Dock({ variant = 'horizontal' }: { variant?: 'horizontal' | 'vertical' }) {
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    setDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const items = [
    { href: '/', icon: <HomeIcon />, label: 'Home' },
    { href: '/blog', icon: <BlogIcon />, label: 'Blog' },
    { href: '/projects', icon: <ProjectsIcon />, label: 'Projects' },
  ];

  if (variant === 'vertical') {
    return (
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-2 p-2 rounded-2xl bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] shadow-lg">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`dock-icon p-3 rounded-xl transition-colors duration-200 hover:bg-[var(--pink)]/20 ${pathname === item.href ? 'bg-[var(--pink)]/20 text-[var(--pink)]' : 'text-[var(--muted)] hover:text-[var(--pink)]'}`}
            >
              {item.icon}
            </a>
          ))}
          <div className="h-px bg-[var(--border)] my-1" />
          <button
            onClick={toggle}
            className="dock-icon p-3 rounded-xl transition-colors duration-200 hover:bg-[var(--pink)]/20 text-[var(--muted)] hover:text-[var(--pink)]"
          >
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] shadow-lg">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`dock-icon p-3 rounded-xl transition-colors duration-200 hover:bg-[var(--pink)]/20 ${pathname === item.href ? 'bg-[var(--pink)]/20 text-[var(--pink)]' : 'text-[var(--muted)] hover:text-[var(--pink)]'}`}
          >
            {item.icon}
          </a>
        ))}
        <div className="w-px h-8 bg-[var(--border)] mx-1" />
        <button
          onClick={toggle}
          className="dock-icon p-3 rounded-xl transition-colors duration-200 hover:bg-[var(--pink)]/20 text-[var(--muted)] hover:text-[var(--pink)]"
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
}
