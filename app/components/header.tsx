import ThemeToggle from './theme';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-[var(--pink)] to-amber-400 bg-clip-text text-transparent">
          MY PORTFOLIO
        </div>
        <nav className="flex items-center gap-3 md:gap-6">
          <a href="/" className="text-xs md:text-sm font-medium hover:text-[var(--pink)] transition-colors">Home</a>
          <a href="/blog" className="text-xs md:text-sm font-medium hover:text-[var(--pink)] transition-colors">Blog</a>
          <a href="/projects" className="text-xs md:text-sm font-medium hover:text-[var(--pink)] transition-colors">Projects</a>
        </nav>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
