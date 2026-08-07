import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Project } from './types';

import Effects from './components/Effects';
import BootLoader from './components/BootLoader';
import HudNav from './components/HudNav';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Capabilities from './components/Capabilities';
import About from './components/About';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);

  const finishBoot = useCallback(() => setBooting(false), []);

  // Lock body scroll during boot and when a case is open
  useEffect(() => {
    const lock = booting || Boolean(selected);
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [booting, selected]);

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-crt text-phos font-mono selection:bg-hazard selection:text-crt">
      <AnimatePresence>
        {booting && <BootLoader onComplete={finishBoot} />}
      </AnimatePresence>

      <Effects />
      <HudNav />
      <Ticker />

      <main className="pt-10 pb-10 lg:pl-14">
        <Hero />
        <Projects onOpen={setSelected} />
        <Capabilities />
        <About />
      </main>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}