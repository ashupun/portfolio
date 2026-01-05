'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Bolt, Mail, Cloud, Music, Pen, Monitor, GitHub, Twitter, LinkedIn, Arrow, Laptop, Computer, Smartphone, Tablet, Figma, Code, V0, Sparkles, Signal, Heart } from './icon';

export function About({ typing = true }: { typing?: boolean }) {
  const [isDark, setIsDark] = useState(true);
  const [displayedText, setDisplayedText] = useState(typing ? '' : "Hello! I'm Ashu nice to meet you");
  const fullText = "Hello! I'm Ashu nice to meet you";

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typing && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, typing]);

  const renderText = () => {
    const ashuStart = fullText.indexOf('Ashu');
    const ashuEnd = ashuStart + 4;

    if (displayedText.length <= ashuStart) {
      return displayedText;
    } else if (displayedText.length <= ashuEnd) {
      return (
        <>
          {displayedText.slice(0, ashuStart)}
          <span className="text-[var(--pink)]">{displayedText.slice(ashuStart)}</span>
        </>
      );
    } else {
      return (
        <>
          {displayedText.slice(0, ashuStart)}
          <span className="text-[var(--pink)]">Ashu</span>
          {displayedText.slice(ashuEnd)}
        </>
      );
    }
  };

  return (
    <div className="card overflow-hidden" style={{ height: '860px' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="label !mb-0"><User /> About Me</div>
        <div className="flex gap-3">
          <a href="https://x.com/ashubun" className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors"><Twitter /></a>
          <a href="https://www.linkedin.com/in/ashubun/" className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors"><LinkedIn /></a>
          <a href="https://github.com/ashupun" className="text-[var(--muted)] hover:text-[var(--pink)] transition-colors"><GitHub /></a>
        </div>
      </div>
      <img src="/profilepicture.jpg" alt="Ashu" className="w-full aspect-square rounded-xl object-cover mb-6" />
      <h1 className="text-lg font-semibold mb-2">
        {renderText()}<span className="inline-block w-[2px] h-[1.1em] bg-[var(--fg)] ml-0.5 align-middle cursor-blink" />
      </h1>
      <p className="text-sm text-[var(--muted)] mb-8">A designer and engineer based in London.</p>
      <div className="border-t border-[var(--border)] pt-6 mb-8">
        <div className="label"><Heart /> Fun Facts</div>
        <ul className="text-sm space-y-2">
          <li>• 23 years old</li>
          <li>• Cat lover =^..^=</li>
          <li>• Cupcake decorator</li>
          <li>• Aspiring coder</li>
        </ul>
      </div>
      <div className="border-t border-[var(--border)] pt-6">
        <div className="label"><Mail /> Contact</div>
        <p className="text-sm">
          Feel free to reach out at{' '}
          <a href="mailto:ashupun@outlook.com" className="text-[var(--pink)] hover:underline">ashupun@outlook.com</a>
        </p>
      </div>
      <div className="border-t border-[var(--border)] pt-6 mt-6">
        <p className="text-xs text-[var(--muted)]">
          Inspired by{' '}
          <a href="https://ana.sh" target="_blank" rel="noopener noreferrer" className="text-[var(--pink)] hover:underline">ana.sh</a>
        </p>
      </div>
    </div>
  );
}

interface StatusData {
  status: string;
  activity: string | null;
}

export function Status() {
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setStatus(data);
      } catch {
        setStatus({ status: 'Offline', activity: null });
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusColors: Record<string, string> = {
    'Online': '#10b981',
    'Away': '#f59e0b',
    'Do Not Disturb': '#ef4444',
    'Offline': '#6b7280',
  };

  const color = statusColors[status?.status || 'Offline'] || '#6b7280';

  return (
    <div className="card h-full flex flex-col">
      <div className="label">
        <Signal />
        Status
      </div>
      <p className="text-2xl font-semibold mt-auto flex items-center gap-2" style={{ color }}>
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 8px 2px ${color}` }} />
        {status?.status?.toUpperCase() || 'LOADING...'}
      </p>
    </div>
  );
}

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        const data = await res.json();
        setWeather(data);
      } catch {
        setWeather({ temp: 8, condition: 'Cloudy', icon: '04d' });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card h-full flex flex-col">
      <div className="label"><Cloud /> Weather</div>
      <p className="text-2xl font-semibold mt-auto">{weather?.temp ?? '--'}°C</p>
      <p className="text-xs text-[var(--muted)]">{weather?.condition ?? 'Loading...'}</p>
    </div>
  );
}

export function Location() {
  return (
    <div className="card overflow-hidden !p-0 h-full">
      <div className="h-full min-h-[200px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9931.943760975076!2d-0.1278!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1704067200000!5m2!1sen!2suk"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 right-4 bg-[var(--card)] px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5 z-10">
          London, UK
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [isDark, setIsDark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const floatingIcons = [
    { icon: '🚀', delay: 0, x: 15, y: 20 },
    { icon: '💻', delay: 0.5, x: 75, y: 15 },
    { icon: '⚡', delay: 1, x: 85, y: 70 },
    { icon: '🎨', delay: 1.5, x: 10, y: 75 },
    { icon: '✨', delay: 0.3, x: 50, y: 85 },
  ];

  return (
    <a
      href="/projects"
      className="card h-full flex flex-col cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="label">
        <Code /> Projects
        <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
      </div>
      <div
        className={`flex-1 rounded-xl flex items-center justify-center min-h-[120px] relative overflow-hidden transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-amber-800/40 via-orange-900/30 to-yellow-900/30' : 'bg-gradient-to-br from-pink-200/60 via-rose-100/50 to-orange-100/40'}`}
        style={{
          backgroundSize: isHovered ? '200% 200%' : '100% 100%',
          animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
        }}
      >
        {floatingIcons.map((item, i) => (
          <span
            key={i}
            className="absolute text-lg transition-all duration-500"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(10px)',
              transitionDelay: `${item.delay * 0.1}s`,
              animation: isHovered ? `float-bounce 2s ease-in-out ${item.delay}s infinite` : 'none',
            }}
          >
            {item.icon}
          </span>
        ))}
        <div className="text-center relative z-10">
          <p className="text-sm font-medium transition-all duration-300 group-hover:scale-105">View All</p>
          <p className="text-xs text-[var(--muted)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">8 projects</p>
        </div>
      </div>
    </a>
  );
}

export function Skills() {
  return (
    <div className="card h-full flex flex-col">
      <div className="label"><Sparkles /> Skills</div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--pink)]/20 flex items-center justify-center text-[var(--pink)] font-bold text-sm">UI</div>
          <p className="text-sm font-medium">UI/UX Design</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#e34c26]/20 flex items-center justify-center text-[#e34c26] font-bold text-xs">{`</>`}</div>
          <p className="text-sm font-medium">HTML & CSS Basics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#10b981]/20 flex items-center justify-center text-[#10b981] font-bold text-sm">Co</div>
          <p className="text-sm font-medium">Collaboration & Communication</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#000]/10 flex items-center justify-center font-bold text-sm">N</div>
          <p className="text-sm font-medium">Notion for Documentation</p>
        </div>
      </div>
    </div>
  );
}

const recentBlogs = [
  { title: 'New Website Launch', date: '2024-01-15', color: '#fef08a' },
  { title: 'My Setup Tour 2024', date: '2024-01-10', color: '#fbcfe8' },
  { title: 'Learning Rust', date: '2024-01-05', color: '#a5f3fc' },
];

export function Blog() {
  return (
    <div className="card h-full flex flex-col overflow-hidden">
      <div className="label">
        <Pen /> Blog
        <a href="/blog" className="ml-auto text-[var(--muted)] text-xs cursor-pointer hover:text-[var(--pink)]">Read More →</a>
      </div>
      <div className="flex-1 relative flex items-center justify-center">
        {recentBlogs.map((blog, i) => (
          <a
            key={blog.title}
            href="/blog"
            className="absolute w-52 h-52 p-5 rounded-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 hover:z-20 cursor-pointer flex flex-col"
            style={{
              backgroundColor: blog.color,
              transform: `rotate(${i === 0 ? -4 : i === 1 ? 2 : -1}deg)`,
              top: '50%',
              left: i === 0 ? '5%' : i === 1 ? '35%' : '65%',
              marginTop: i === 0 ? '-50px' : i === 1 ? '-30px' : '-40px',
              zIndex: i === 0 ? 3 : i === 1 ? 2 : 1,
            }}
          >
            <p className="font-bold text-lg text-gray-800 leading-tight">{blog.title}</p>
            <p className="text-xs text-gray-600 mt-1">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
  previewUrl?: string;
}

export function Playing() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data = await res.json();
        setSpotifyData(data);
      } catch {
        setSpotifyData({ isPlaying: false });
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isHovering && spotifyData?.previewUrl) {
      const audio = new Audio(spotifyData.previewUrl);
      audio.volume = 0.3;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isHovering, spotifyData?.previewUrl]);

  const handleAlbumClick = () => {
    setIsFlipped(true);
    setTimeout(() => setIsFlipped(false), 500);
    if (spotifyData?.songUrl) {
      window.open(spotifyData.songUrl, '_blank');
    }
  };

  const progress = spotifyData?.progress && spotifyData?.duration
    ? (spotifyData.progress / spotifyData.duration) * 100
    : 0;

  return (
    <div className="card h-full flex flex-col">
      <div className="label"><Music /> Favourite Songs</div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div
          className="w-28 h-28 cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={handleAlbumClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-full h-full transition-transform duration-300" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            {spotifyData?.albumImageUrl ? (
              <img src={spotifyData.albumImageUrl} alt={spotifyData.title || 'Album'} className={`absolute w-full h-full rounded-2xl object-cover shadow-lg transition-transform duration-300 ${isHovering ? 'scale-105' : ''}`} style={{ backfaceVisibility: 'hidden' }} />
            ) : (
              <div className={`absolute w-full h-full rounded-2xl shadow-lg flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-amber-600 to-yellow-700' : 'bg-gradient-to-br from-pink-400 to-rose-500'}`} style={{ backfaceVisibility: 'hidden' }}>
                <Music />
              </div>
            )}
            <div className={`absolute w-full h-full rounded-2xl shadow-lg flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-amber-600 to-yellow-700' : 'bg-gradient-to-br from-pink-400 to-rose-500'}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              {spotifyData?.isPlaying ? (
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold truncate max-w-[160px]">{spotifyData?.title || 'Not Playing'}</p>
          <p className="text-sm text-[var(--muted)] truncate max-w-[160px]">{spotifyData?.artist || 'Spotify'}</p>
        </div>
        {spotifyData?.isPlaying && (
          <div className="w-full max-w-[140px]">
            <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden relative">
              <div className="h-full bg-[var(--pink)] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export function GitHubGraph() {
  const [weeks, setWeeks] = useState<number[][]>([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/ashupun?y=last');
        const data = await response.json();
        const contributions = data.contributions || [];
        const last154Days = contributions.slice(-154);
        const formatted: number[][] = [];
        for (let i = 0; i < last154Days.length; i += 7) {
          const week = last154Days.slice(i, i + 7).map((day: { count: number }) => day.count);
          formatted.push(week);
        }
        setWeeks(formatted);
      } catch {
        setWeeks(Array.from({ length: 22 }, () => Array.from({ length: 7 }, () => 0)));
      }
    };
    fetchContributions();
  }, []);

  const getColor = (count: number) => {
    if (count >= 10) return 'bg-[#39d353]';
    if (count >= 5) return 'bg-[#26a641]';
    if (count >= 2) return 'bg-[#006d32]';
    if (count >= 1) return 'bg-[#0e4429]';
    return 'bg-[var(--border)]';
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="label"><GitHub /> Contributions</div>
      <div className="flex-1 flex items-center">
        <div className="flex gap-[3px] overflow-hidden">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {week.map((count, j) => (
                <div
                  key={j}
                  className={`w-[10px] h-[10px] rounded-sm ${getColor(count)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LocalTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ukTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(ukTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card h-full flex flex-col">
      <div className="label"><Bolt /> Local Time</div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-[var(--pink)]">{time || '--:--'}</p>
        <p className="text-xs text-[var(--muted)] mt-1">London, UK</p>
      </div>
    </div>
  );
}

export function Interests() {
  const interests = [
    { name: 'Gaming', color: '#8b5cf6' },
    { name: 'Baking', color: '#f472b6' },
    { name: 'Photography', color: '#06b6d4' },
    { name: 'Anime', color: '#ef4444' },
    { name: 'Travel', color: '#22c55e' },
    { name: 'Coffee', color: '#f59e0b' },
    { name: 'Digital Art', color: '#ec4899' },
  ];
  return (
    <div className="card h-full">
      <div className="label"><Heart /> Interests & Hobbies</div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span
            key={interest.name}
            className="px-3 py-1.5 rounded-full bg-[var(--pink-light)] text-[var(--pink)] border border-[var(--pink-border)] text-sm transition-all duration-300 cursor-default hover:scale-105"
            style={{
              ['--hover-color' as string]: interest.color,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = `${interest.color}20`;
              el.style.borderColor = interest.color;
              el.style.color = interest.color;
              el.style.boxShadow = `0 0 12px ${interest.color}40`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = '';
              el.style.borderColor = '';
              el.style.color = '';
              el.style.boxShadow = '';
            }}
          >
            {interest.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Tools() {
  return (
    <div className="card h-full">
      <div className="label"><Monitor /> What I Use</div>
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-[var(--muted)] text-xs mb-3 font-medium">Hardware</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-[var(--muted)]"><Laptop /> <span className="text-[var(--fg)]">MacBook Pro M4</span></li>
            <li className="flex items-center gap-2 text-[var(--muted)]"><Computer /> <span className="text-[var(--fg)]">Gaming PC</span></li>
            <li className="flex items-center gap-2 text-[var(--muted)]"><Smartphone /> <span className="text-[var(--fg)]">iPhone 15 Pro</span></li>
            <li className="flex items-center gap-2 text-[var(--muted)]"><Tablet /> <span className="text-[var(--fg)]">iPad Pro 11"</span></li>
          </ul>
        </div>
        <div>
          <p className="text-[var(--muted)] text-xs mb-3 font-medium">Software</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-[var(--muted)]"><V0 /> <span className="text-[var(--fg)]">v0</span></li>
            <li className="flex items-center gap-2 text-[var(--muted)]"><Code /> <span className="text-[var(--fg)]">VSCode</span></li>
            <li className="flex items-center gap-2 text-[var(--muted)]"><Figma /> <span className="text-[var(--fg)]">Figma</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

