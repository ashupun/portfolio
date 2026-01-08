'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { User, Mail, Cloud, Music, Pen, Monitor, GitHub, Twitter, LinkedIn, Arrow, Laptop, Computer, Smartphone, Figma, Code, V0, Sparkles, Signal, Heart, Clock, Star, Spotify } from './icons';
import { blogs as blogData, getExcerpt } from '../data/blogs';

function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, style };
}

export function About({ typing = true }: { typing?: boolean }) {
  const [displayedText, setDisplayedText] = useState(typing ? '' : "Hello! I'm Ashu nice to meet you");
  const fullText = "Hello! I'm Ashu nice to meet you";
  const tilt = useTilt(5);

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
    <div ref={tilt.ref} style={tilt.style} className="card h-full overflow-hidden gradient-bg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="label !mb-0">
          <User /> About Me
        </div>
        <div className="flex gap-3">
          <a
            href="https://x.com/ashubun"
            className="text-[var(--muted)] hover:text-[var(--pink)] transition-all hover:scale-110"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/ashubun/"
            className="text-[var(--muted)] hover:text-[var(--pink)] transition-all hover:scale-110"
          >
            <LinkedIn />
          </a>
          <a
            href="https://github.com/ashupun"
            className="text-[var(--muted)] hover:text-[var(--pink)] transition-all hover:scale-110"
          >
            <GitHub />
          </a>
        </div>
      </div>
      <div className="about-hero mb-6">
        <div className="profile-image relative rounded-xl overflow-hidden profile-glow">
          <Image
            src="/profilepicture.jpg"
            alt="Ashu Pun"
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 100px, 360px"
            priority
          />
        </div>
        <div className="intro-text">
          <h1 className="text-lg font-semibold mb-2">
            {renderText()}
            <span className="inline-block w-[2px] h-[1.1em] bg-[var(--fg)] ml-0.5 align-middle cursor-blink" />
          </h1>
          <p className="text-base md:text-sm text-[var(--muted)]">
            A designer and engineer based in London.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] pt-6">
        <div className="label">
          <Star /> Fun Facts
        </div>
        <ul className="text-base md:text-sm space-y-2">
          <li className="hover:translate-x-1 transition-transform">• Cat lover =^..^=</li>
          <li className="hover:translate-x-1 transition-transform">• Cupcake decorator</li>
          <li className="hover:translate-x-1 transition-transform">• Aspiring coder</li>
        </ul>
      </div>
      <div className="border-t border-[var(--border)] pt-6 mt-auto">
        <div className="label">
          <Mail /> Contact
        </div>
        <p className="text-base md:text-sm">
          Feel free to reach out at{" "}
          <a
            href="mailto:ashupun@outlook.com"
            className="text-[var(--pink)] hover:underline"
          >
            ashupun@outlook.com
          </a>
        </p>
      </div>
      <div className="border-t border-[var(--border)] pt-6 mt-6">
        <p className="text-xs text-[var(--muted)]">Made with ♡</p>
      </div>
    </div>
  );
}

export function LocalTime() {
  const [time, setTime] = useState<string>('');
  const tilt = useTilt(15);

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
    <div ref={tilt.ref} style={tilt.style} className="card h-full flex flex-col">
      <div className="label !mb-1 md:!mb-2">
        <Clock /> Time
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-xl md:text-2xl font-bold text-[var(--pink)] flex">
          {(time || '--:--').split('').map((char, i) => (
            <span
              key={i}
              className="inline-block transition-transform duration-200 hover:scale-125 hover:-translate-y-1"
            >
              {char}
            </span>
          ))}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1">London, UK</p>
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
  const tilt = useTilt(15);

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
    <div ref={tilt.ref} style={tilt.style} className="card h-full flex flex-col">
      <div className="label !mb-1 md:!mb-3">
        <Signal />
        Status
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg md:text-2xl font-semibold flex items-center gap-2 md:gap-3" style={{ color }}>
          <span className="relative flex h-3 w-3 md:h-4 md:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }} />
            <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4" style={{ backgroundColor: color, boxShadow: `0 0 20px 5px ${color}` }} />
          </span>
          {status?.status?.toUpperCase() || 'LOADING...'}
        </p>
      </div>
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
  const [isHovered, setIsHovered] = useState(false);
  const tilt = useTilt(15);

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
    <div
      ref={tilt.ref}
      style={tilt.style}
      className="card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="label !mb-0 md:!mb-1">
        <span className={`transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`}><Cloud /></span>
        Weather
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className={`text-xl md:text-lg font-semibold transition-all duration-300 ${isHovered ? 'scale-110 text-[var(--pink)]' : ''}`}>
          {weather?.temp ?? '--'}°C
        </p>
        <p className="text-xs md:text-sm text-[var(--muted)]">{weather?.condition ?? 'Loading...'}</p>
      </div>
    </div>
  );
}

export function Location() {
  const tilt = useTilt(8);

  return (
    <div ref={tilt.ref} style={tilt.style} className="card h-full !p-0 overflow-hidden">
      <div className="relative w-full h-full">
        <img
          src="/map.png"
          alt="London, UK"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <a href="https://www.google.com/maps?ll=51.5074,-0.1278&z=13&t=m&hl=en&gl=GB&mapclient=embed" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-lg flex items-center gap-1.5 text-[#333] hover:scale-105 transition-transform">
          <svg className="w-4 h-4 text-[var(--pink)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          London, UK
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const [isDark, setIsDark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const tilt = useTilt(15);

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
      ref={tilt.ref as unknown as React.RefObject<HTMLAnchorElement>}
      style={tilt.style}
      href="/projects"
      className="card h-full flex flex-col cursor-pointer group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="label !mb-1 md:!mb-2">
        <Code /> Projects
        <span className="ml-auto transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"><Arrow /></span>
      </div>
      <div
        className={`flex-1 rounded-lg flex items-center justify-center relative overflow-hidden transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-amber-800/40 via-orange-900/30 to-yellow-900/30' : 'bg-gradient-to-br from-pink-200/60 via-rose-100/50 to-orange-100/40'}`}
        style={{
          backgroundSize: isHovered ? '200% 200%' : '100% 100%',
          animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
          boxShadow: isHovered ? `inset 0 0 30px ${isDark ? 'rgba(212, 165, 116, 0.2)' : 'rgba(232, 145, 168, 0.3)'}` : 'none',
        }}
      >
        {floatingIcons.map((item, i) => (
          <span
            key={i}
            className="absolute text-[10px] md:text-sm transition-all duration-500"
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
          <p className={`text-xs md:text-sm font-medium transition-all duration-300 ${isHovered ? 'scale-110 text-[var(--pink)]' : ''}`}>View All</p>
        </div>
      </div>
    </a>
  );
}

export function Skills() {
  const tilt = useTilt(10);
  const skills = [
    { name: 'UI/UX', label: 'UI', color: 'var(--pink)' },
    { name: 'HTML/CSS', label: '</>', color: '#e34c26' },
    { name: 'Collab', label: 'Co', color: '#10b981' },
    { name: 'Notion', label: 'N', color: '#6b7280' },
  ];

  return (
    <div ref={tilt.ref} style={tilt.style} className="card h-full flex flex-col overflow-hidden">
      <div className="label"><Sparkles /> Skills</div>
      <div className="flex-1 flex flex-col justify-center gap-2 md:gap-4">
        {skills.map((skill, i) => (
          <div key={skill.name} className="flex items-center gap-2 md:gap-3 min-w-0 group cursor-default">
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold text-[10px] md:text-xs flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                backgroundColor: `${skill.color}20`,
                color: skill.color,
              }}
            >
              {skill.label}
            </div>
            <p className="text-xs md:text-sm font-medium truncate transition-all duration-300 group-hover:translate-x-1">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const sortedBlogs = [...blogData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const postItColors = ['#e0f2fe', '#fef3c7'];

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

export function Blog() {
  const recentBlogs = sortedBlogs.slice(0, 2);
  const tilt = useTilt(8);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={tilt.ref} style={tilt.style} className="card h-full flex flex-col overflow-hidden">
      <div className="label">
        <Pen /> Blog
        <a href="/blog" className="ml-auto text-[var(--muted)] text-xs md:text-sm cursor-pointer hover:text-[var(--pink)] transition-all hover:translate-x-1">Read More →</a>
      </div>
      <div className="flex-1 relative">
        {recentBlogs.map((blog, i) => (
          <a
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="absolute p-3 md:p-5 rounded-lg shadow-lg transition-all duration-300 cursor-pointer w-[200px] md:w-[280px]"
            style={{
              backgroundColor: postItColors[i],
              transform: `rotate(${i === 0 ? -3 : 2}deg) ${hoveredIndex === i ? 'translateY(-8px) scale(1.02)' : ''}`,
              left: i === 0 ? '2%' : '35%',
              top: i === 0 ? '5%' : '12%',
              zIndex: hoveredIndex === i ? 10 : i,
              boxShadow: hoveredIndex === i ? '0 20px 40px rgba(0,0,0,0.2)' : '',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`absolute -top-2 md:-top-2.5 left-4 md:left-6 w-4 h-4 md:w-5 md:h-5 rounded-full bg-slate-400 border-2 border-slate-500 shadow-sm transition-transform ${hoveredIndex === i ? 'scale-110' : ''}`} />
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <Pen />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wide text-slate-500">Blog</span>
            </div>
            <h3 className="font-bold text-sm md:text-lg text-slate-800 leading-tight mb-1">{blog.title}</h3>
            <p className="text-xs md:text-sm text-slate-500 mb-2 md:mb-3">{getTimeAgo(blog.date)}</p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed line-clamp-3 md:line-clamp-5">{getExcerpt(blog.content)}</p>
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
  const tilt = useTilt(10);

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
    const interval = setInterval(fetchSpotify, 5000);
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

  return (
    <div ref={tilt.ref} style={tilt.style} className="card h-full flex flex-col">
      <div className="label"><Spotify /> Listening to Spotify</div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 md:gap-5 p-2">
        <div
          className="w-24 h-24 md:w-32 md:h-32 cursor-pointer relative"
          style={{ perspective: '1000px' }}
          onClick={handleAlbumClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            style={{ boxShadow: `0 0 30px 10px ${isDark ? 'rgba(212, 165, 116, 0.4)' : 'rgba(232, 145, 168, 0.4)'}` }}
          />
          <div
            className="relative w-full h-full transition-transform duration-300"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              animation: spotifyData?.isPlaying && isHovering ? 'spin-slow 8s linear infinite' : 'none',
            }}
          >
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
        <div className="text-center w-full px-2">
          <p className={`text-base md:text-sm font-semibold truncate transition-all duration-300 ${isHovering ? 'text-[var(--pink)]' : ''}`}>{spotifyData?.title || 'Not Playing'}</p>
          <p className="text-base md:text-sm text-[var(--muted)] truncate">{spotifyData?.artist || 'Spotify'}</p>
        </div>
      </div>
    </div>
  );
}

export function GitHubGraph() {
  const [weeks, setWeeks] = useState<number[][]>([]);
  const tilt = useTilt(12);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/ashupun?y=last');
        const data = await response.json();
        const contributions = data.contributions || [];
        const last70Days = contributions.slice(-70);
        const formatted: number[][] = [];
        for (let i = 0; i < last70Days.length; i += 7) {
          const week = last70Days.slice(i, i + 7).map((day: { count: number }) => day.count);
          formatted.push(week);
        }
        setWeeks(formatted);
      } catch {
        setWeeks(Array.from({ length: 10 }, () => Array.from({ length: 7 }, () => 0)));
      }
    };
    fetchContributions();
  }, []);

  const getColor = (count: number) => {
    if (count >= 10) return '#39d353';
    if (count >= 5) return '#26a641';
    if (count >= 2) return '#006d32';
    if (count >= 1) return '#0e4429';
    return 'var(--border)';
  };

  return (
    <div ref={tilt.ref} style={tilt.style} className="card h-full flex flex-col">
      <div className="label"><a href="https://github.com/ashupun" className="hover:text-[var(--pink)] transition-colors hover:scale-110 inline-block"><GitHub /></a> Contributions</div>
      <div className="flex-1 flex items-center justify-center p-2">
        <div className="flex gap-[3px] md:gap-1 overflow-hidden">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px] md:gap-1">
              {week.map((count, j) => {
                const color = getColor(count);
                return (
                  <div
                    key={j}
                    className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-sm transition-all duration-200 hover:scale-150 cursor-default"
                    style={{
                      backgroundColor: color,
                    }}
                    onMouseEnter={(e) => {
                      if (count > 0) {
                        e.currentTarget.style.boxShadow = `0 0 8px ${color}`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Interests() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(12);

  const interests = [
    { name: 'Gaming', color: '#8b5cf6' },
    { name: 'Baking', color: '#f472b6' },
    { name: 'Anime', color: '#ef4444' },
    { name: 'Travel', color: '#22c55e' },
    { name: 'Digital Art', color: '#ec4899' },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div ref={(el) => { containerRef.current = el; if (tilt.ref.current !== el) tilt.ref.current = el; }} style={tilt.style} className="card h-full overflow-hidden flex flex-col">
      <div className="label !mb-1 md:!mb-2"><Heart /> Hobbies</div>
      <div className="flex-1 flex flex-wrap gap-1 md:gap-1.5 content-start overflow-hidden">
        {interests.map((interest, index) => (
          <span
            key={interest.name}
            className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-[var(--pink-light)] text-[var(--pink)] border border-[var(--pink-border)] text-xs md:text-sm transition-all duration-300 cursor-default hover:scale-110 group"
            style={{
              ['--hover-color' as string]: interest.color,
              ...(isMobile && isVisible ? {
                backgroundColor: `${interest.color}20`,
                borderColor: interest.color,
                color: interest.color,
                boxShadow: `0 0 12px ${interest.color}40`,
                animation: `interest-pop 0.4s ease-out ${index * 0.08}s both`,
              } : {}),
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = `${interest.color}20`;
              el.style.borderColor = interest.color;
              el.style.color = interest.color;
              el.style.boxShadow = `0 0 16px ${interest.color}60`;
              el.style.transform = 'scale(1.1) translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (isMobile && isVisible) return;
              const el = e.currentTarget;
              el.style.backgroundColor = '';
              el.style.borderColor = '';
              el.style.color = '';
              el.style.boxShadow = '';
              el.style.transform = '';
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
  const tilt = useTilt(10);
  const hardware = [
    { icon: <Laptop />, name: 'MacBook Pro M4' },
    { icon: <Computer />, name: 'Gaming PC' },
    { icon: <Smartphone />, name: 'iPhone 15 Pro' },
    

  ];
  const software = [
    { icon: <Figma />, name: 'Figma' },
    { icon: <Code />, name: 'VSCode' },
    { icon: <V0 />, name: 'v0' },
  ];

  return (
    <div ref={tilt.ref} style={tilt.style} className="card h-full overflow-hidden flex flex-col">
      <div className="label !mb-2"><Monitor /> What I Use</div>
      <div className="flex-1 flex gap-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-semibold text-[var(--muted)] mb-2">Hardware</p>
          <div className="space-y-1.5">
            {hardware.map((item) => (
              <div key={item.name} className="flex items-center gap-2 group cursor-default">
                <span className="text-[var(--muted)] transition-all duration-300 group-hover:text-[var(--pink)] group-hover:scale-110">{item.icon}</span>
                <span className="text-xs md:text-sm transition-all duration-300 group-hover:text-[var(--pink)]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs md:text-sm font-semibold text-[var(--muted)] mb-2">Software</p>
          <div className="space-y-1.5">
            {software.map((item) => (
              <div key={item.name} className="flex items-center gap-2 group cursor-default">
                <span className="text-[var(--muted)] transition-all duration-300 group-hover:text-[var(--pink)] group-hover:scale-110">{item.icon}</span>
                <span className="text-xs md:text-sm transition-all duration-300 group-hover:text-[var(--pink)]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechStack() {
  const tilt = useTilt(12);
  const technologies = [
    { name: 'Next.js', color: '#000000' },
    { name: 'React', color: '#61dafb' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'Python', color: '#3776ab' },
  ];

  return (
    <div ref={tilt.ref} style={tilt.style} className="card">
      <div className="label !mb-2"><Code /> Tech Stack</div>
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-[var(--border)] transition-all duration-300 cursor-default hover:scale-110"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${tech.color}30`;
              e.currentTarget.style.boxShadow = `0 0 12px ${tech.color}40`;
              e.currentTarget.style.borderColor = tech.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = '';
            }}
          >
            <span className="text-xs md:text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Learning() {
  const tilt = useTilt(12);
  const learning = [
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Git', color: '#f05032' },
    { name: 'AWS', color: '#ff9900' },
  ];

  return (
    <div ref={tilt.ref} style={tilt.style} className="card">
      <div className="label !mb-2"><Sparkles /> Learning</div>
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {learning.map((tech) => (
          <div
            key={tech.name}
            className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-[var(--border)] transition-all duration-300 cursor-default hover:scale-110"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${tech.color}30`;
              e.currentTarget.style.boxShadow = `0 0 12px ${tech.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <span className="text-xs md:text-sm font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
