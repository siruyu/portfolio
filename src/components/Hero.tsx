import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BIOGRAPHY, PROJECTS } from '../data/portfolioData';
import resumePdf from '../assets/Resume_AISIK_SAHA.pdf';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  }),
};

export default function Hero() {
  const [uptime, setUptime] = useState(0);
  const [load, setLoad] = useState(43);

  useEffect(() => {
    const i = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(
      () => setLoad(30 + Math.floor(Math.random() * 40)),
      1200,
    );
    return () => clearInterval(i);
  }, []);

  const bootDate = useMemo(
    () => new Date().toISOString().slice(0, 10),
    [],
  );

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const telemetry: { k: string; v: string; acc?: boolean }[] = [
    { k: 'UPTIME_SEC', v: String(uptime).padStart(6, '0'), acc: true },
    { k: 'LOAD_%', v: String(load).padStart(2, '0') },
    { k: 'SECTOR', v: 'INDIA / ASIA' },
    { k: 'PROC_CORE', v: BIOGRAPHY.role.toUpperCase() },
    { k: 'ARCHIVE', v: `${String(PROJECTS.length).padStart(2, '0')}_CASES` },
    { k: 'BOOT', v: bootDate },
  ];

  return (
    <section
      id="index"
      className="relative min-h-screen border-b border-line overflow-hidden flex items-center"
    >
      {/* Sweep beam behind the macro type */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-hazard/10 to-transparent"
        style={{ animation: 'beam-x 6s ease-in-out infinite' }}
      />

      <div className="relative w-full max-w-none px-4 md:px-16 lg:pl-20 pt-24 pb-20">
        {/* micro rail */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.22em] text-phos-dim mb-6"
        >
          <span className="text-phos-faint">[</span>
          <span className="text-hazard red-glow font-bold">
            SYSTEM.ID :: {BIOGRAPHY.name.toUpperCase()}
          </span>
          <span className="text-phos-faint">]</span>
          <span className="hidden sm:inline text-phos-faint">///</span>
          <span className="hidden sm:inline">{BIOGRAPHY.role.toUpperCase()}</span>
        </motion.div>

        {/* Macro typography */}
        <h1 className="font-display uppercase leading-[0.85] tracking-tight">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="block text-[clamp(2.4rem,13vw,10rem)] anim-flicker"
          >
            Aisik
          </motion.span>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="block text-[clamp(2.4rem,13vw,10rem)] text-phos-dim"
          >
            Saha
            <span className="text-hazard red-glow">.</span>
          </motion.span>
        </h1>

        {/* Rule + sub line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 flex items-center gap-4"
        >
          <span className="h-px w-16 bg-hazard" />
          <span className="text-[11px] tracking-[0.2em] text-phos-dim">
            CREATIVE SYSTEM DEVELOPER
          </span>
          <span className="h-px flex-1 bg-line" />
        </motion.div>

        <p
          className="mt-6 max-w-2xl text-xs md:text-sm leading-relaxed text-phos-dim"
        >
          {BIOGRAPHY.tagline}
        </p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-9 flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => jump('cases')}
            className="group bg-hazard text-crt font-display text-xs tracking-[0.2em] px-7 py-4 flex items-center justify-between gap-6 hover:bg-crt hover:text-phos hover:border hover:border-hazard transition-colors"
          >
            [ INITIATE // VIEW CASES ]<span className="group-hover:text-hazard"> &gt;&gt;</span>
          </button>
          <a
            href={resumePdf}
            download="Resume_AISIK_SAHA.pdf"
            className="border border-line-hi text-phos font-bold text-xs tracking-[0.2em] px-7 py-4 flex items-center justify-between gap-6 hover:border-hazard hover:text-hazard red-glow transition-colors"
          >
            &lt; RETRIEVE RESUME &gt;
          </a>
        </motion.div>

        {/* warning-tape accent */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-10 hazard-stripes h-1.5 w-full max-w-2xl"
        />
      </div>

      {/* Right telemetry slab */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="hidden md:flex flex-col justify-between self-stretch w-[280px] bg-crt-2 border-l border-line p-6"
      >
        <div className="flex justify-between items-center text-[9px] tracking-[0.2em] text-phos-faint">
          <span>CORE.TELEMETRY</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-term anim-dot inline-block" />
            LIVE
          </span>
        </div>

        <dl className="space-y-4">
          {telemetry.map((t) => (
            <div key={t.k} className="border-t border-line pt-3">
              <dt className="text-[9px] tracking-[0.2em] text-phos-faint">
                {t.k}
              </dt>
              <dd
                className={`mt-1 text-sm font-bold tabular-nums ${
                  t.acc ? 'text-hazard red-glow' : 'text-phos'
                }`}
              >
                {t.v}
              </dd>
            </div>
          ))}
        </dl>

        {/* barcode deco */}
        <div className="barcode h-6 self-start text-phos/40 w-28" />
        <div className="text-[8px] tracking-[0.25em] text-phos-faint">
          + GRID_COORD_X00_Y00
        </div>
      </motion.div>
    </section>
  );
}