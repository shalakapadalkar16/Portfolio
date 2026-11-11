import { useEffect, useRef, useState } from 'react';
import { profile, sections } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Theme } from '../hooks/useTheme';
import { MoonIcon, SearchIcon, SunIcon } from './Icons';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export function Header({ theme, onToggleTheme, onOpenPalette }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const active = useActiveSection(sections.map((s) => s.id));

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="scroll-progress" ref={progress} aria-hidden="true" />
      <nav className="nav container" aria-label="Primary">
        <a href="#top" className="brand" aria-label={`${profile.name}, back to top`}>
          <span className="brand-mark">{initials}</span>
          <span className="brand-text">{profile.name}</span>
        </a>

        <ul id="nav-links" className={`nav-links${menuOpen ? ' open' : ''}`}>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? 'active' : undefined}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="palette-trigger" onClick={onOpenPalette} aria-label="Open command palette">
            <SearchIcon />
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            className="icon-btn nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
