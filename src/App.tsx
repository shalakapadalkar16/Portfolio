import { useCallback, useEffect, useMemo, useState } from 'react';
import { About } from './components/About';
import { CommandPalette, type Command } from './components/CommandPalette';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Metrics } from './components/Metrics';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Toast } from './components/Toast';
import { profile, sections } from './data/profile';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { asset, prefersReducedMotion, scrollToId } from './lib/utils';

const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

/** Scroll to the contact form and put the cursor in the first field. */
const openContactForm = () => {
  scrollToId('contact');
  window.setTimeout(
    () => document.getElementById('cf-name')?.focus({ preventScroll: true }),
    prefersReducedMotion() ? 0 : 500,
  );
};

export default function App() {
  const { theme, toggle } = useTheme();
  const { message, notify } = useToast();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // ⌘K / Ctrl+K toggles the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const { links } = profile;
    const list: Command[] = [
      { id: 'top', label: 'Home', group: 'Navigate', hint: '#top', run: () => scrollToId('top') },
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        label: s.label,
        group: 'Navigate' as const,
        hint: `#${s.id}`,
        run: () => scrollToId(s.id),
      })),
      { id: 'message', label: 'Send a message', group: 'Actions', run: openContactForm },
      { id: 'theme', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, group: 'Actions', run: toggle },
      { id: 'linkedin', label: 'Open LinkedIn', group: 'Links', hint: '↗', run: () => openUrl(links.linkedin) },
    ];
    if (links.github) list.push({ id: 'github', label: 'Open GitHub', group: 'Links', hint: '↗', run: () => openUrl(links.github) });
    if (links.resume) list.push({ id: 'resume', label: 'View résumé (PDF)', group: 'Links', hint: '↗', run: () => openUrl(asset(links.resume)) });
    return list;
  }, [theme, toggle]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero />
        <Metrics />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact notify={notify} />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
      <Toast message={message} />
    </>
  );
}
