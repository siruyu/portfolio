import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';

const BOOT_LINES = [
  'INITIALIZING TACTICAL TELEMETRY SUITE v4.0.0',
  'MOUNTING MODULAR GRID MATRICES ......... OK',
  'CALIBRATING PHOSPHOR OUTPUT ............ OK',
  `LOADING CASE ARCHIVE [${String(PROJECTS.length).padStart(2, '0')} UNITS] ........ OK`,
  'HANDSHAKE :: CORE.NODE.INDIA ........... OK',
  'INGRESS GRANTED // SYSTEM ONLINE',
];

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (lineCount < BOOT_LINES.length) {
      const t = setTimeout(() => setLineCount((c) => c + 1), 300 + Math.random() * 220);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [lineCount, onComplete]);

  useEffect(() => {
    if (progress < 100) {
      const t = setTimeout(() => setProgress((p) => Math.min(100, p + Math.floor(Math.random() * 18) + 6)), 170);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-crt flex flex-col justify-between p-4 md:p-10"
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(2px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 crt-scanlines pointer-events-none" />
      <div className="absolute inset-0 noise-layer opacity-[0.06] pointer-events-none" />

      {/* Top status rail */}
      <div className="relative flex justify-between items-center text-[10px] text-phos-dim tracking-[0.15em]">
        <span className="text-hazard red-glow font-bold">&gt;&gt; TACTICAL_TELEMETRY::BOOT_SEQ</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-term anim-dot inline-block" />
          <span className="text-term">PWR</span>
        </span>
      </div>

      {/* Core boot block */}
      <div className="relative max-w-3xl space-y-6">
        <div className="text-[10px] text-hazard red-glow font-bold tracking-[0.25em] border-l-2 border-hazard pl-3">
          SYSTEM_LOADER :: CORE.PORTFOLIO
        </div>
        <h1 className="font-display text-3xl md:text-6xl uppercase leading-[0.9] tracking-tight anim-flicker">
          AISIK_SAHA<span className="text-hazard red-glow">.</span>
          <br />
          <span className="text-phos-dim">PORTFOLIO_CORE</span>
        </h1>

        {/* Boot log */}
        <div className="space-y-1 text-[10px] md:text-xs text-phos-dim">
          {BOOT_LINES.slice(0, lineCount).map((line, idx) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-term">{'>'}</span>
              <span className={line.startsWith('INGRESS') ? 'text-term green-glow' : ''}>{line}</span>
            </motion.div>
          ))}
          {lineCount < BOOT_LINES.length && (
            <div className="flex gap-3 text-hazard">
              <span className="anim-blink">&gt;</span>
              <span className="anim-blink">EXECUTING...</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[9px] text-phos-faint tracking-[0.2em] mb-1">
            <span>LOAD</span>
            <span className="text-phos-dim tabular-nums">{progress}%</span>
          </div>
          <div className="h-[3px] bg-line relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-hazard"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="relative flex justify-between items-center text-[9px] text-phos-faint border-t border-line pt-3 tracking-[0.2em]">
        <span>UNIT / D-01</span>
        <span>REV 4.0.0</span>
        <span className="hidden md:inline">PHOSPHOR: STABLE</span>
      </div>
    </motion.div>
  );
}
