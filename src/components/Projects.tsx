import { motion } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

const ease = [0.16, 1, 0.3, 1] as const;

const CARD_PROJECTS = ['tbrls', 'apisim', 'evolve', 'ossuary'];

function StatusChip({ p }: { p: Project }) {
  const live = Boolean(p.liveUrl);
  return (
    <span
      className={`flex items-center gap-1.5 text-[9px] tracking-[0.2em] font-bold ${
        live ? 'text-term green-glow' : 'text-phos-faint'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 inline-block ${live ? 'bg-term anim-dot' : 'bg-phos-faint'}`}
      />
      {live ? 'DEPLOYED' : 'ARCHIVED'}
    </span>
  );
}

interface RowCardProps {
  key?: string;
  p: Project;
  idx: number;
  onOpen: (p: Project) => void;
}

function RowCard({ p, idx, onOpen }: RowCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease, delay: idx * 0.06 }}
      onClick={() => onOpen(p)}
      className="group cursor-pointer bg-crt border-b border-line px-4 md:px-16 lg:pl-20 py-7 md:py-9 grid gap-4 md:gap-8 md:grid-cols-12 items-center transition-colors duration-200 hover:bg-phos"
    >
      <span className="md:col-span-1 font-display text-4xl md:text-6xl text-phos-faint group-hover:text-hazard group-hover:red-glow transition-colors">
        {p.number}
      </span>
      <div className="md:col-span-6 space-y-1">
        <span className="text-[9px] tracking-[0.25em] text-hazard font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden md:block">
          &gt;&gt;
        </span>
        <h4 className="font-display uppercase leading-none tracking-tight text-lg md:text-2xl text-phos group-hover:text-crt transition-colors">
          {p.title}
        </h4>
        <p className="text-[10px] md:text-xs text-phos-dim group-hover:text-crt/70 transition-colors line-clamp-2">
          {p.tagline}
        </p>
      </div>
      <div className="md:col-span-2">
        <span className="text-[9px] tracking-[0.2em] text-phos-dim group-hover:text-crt/60 transition-colors border border-line group-hover:border-crt/30 px-2 py-1">
          {p.category}
        </span>
      </div>
      <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
        <StatusChip p={p} />
        <span className="text-phos-dim group-hover:text-crt text-sm font-bold">
          &gt;
        </span>
      </div>
    </motion.article>
  );
}

interface FeaturedCardProps {
  key?: string;
  p: Project;
  onOpen: (p: Project) => void;
}

function FeaturedCard({ p, onOpen }: FeaturedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      onClick={() => onOpen(p)}
      className="group relative cursor-pointer border-b border-line overflow-hidden bg-crt-1"
    >
      <div className="grid md:grid-cols-2 min-h-[380px] md:min-h-[520px]">
        {/* image slab */}
        <div className="relative overflow-hidden border-b md:border-b-0 md:border-r border-line">
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.25] brightness-[0.45] transition-all duration-[1.2s] group-hover:grayscale-0 group-hover:brightness-[0.7]"
          />
          {/* halftone raster overlay */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(238,238,238,0.35) 1px, transparent 0)',
              backgroundSize: '4px 4px',
              mixBlendMode: 'multiply',
            }}
          />
          <span className="absolute top-4 left-4 bg-crt/80 border border-line px-2 py-1 text-[9px] tracking-[0.25em] text-hazard red-glow font-bold">
            FLAG_{p.number}
          </span>
        </div>

        {/* data slab */}
        <div className="flex flex-col justify-between p-6 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="font-display text-7xl md:text-9xl text-phos-faint group-hover:text-hazard transition-colors duration-300">
              {p.number}
            </span>
            <StatusChip p={p} />
          </div>

          <div className="space-y-4">
            <span className="text-[9px] tracking-[0.25em] text-phos-dim border border-line bg-crt-2 px-2 py-1 inline-block">
              {p.category}
            </span>
            <h3 className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(1.6rem,4vw,3rem)] group-hover:text-hazard transition-colors duration-300">
              {p.title}
            </h3>
            <p className="max-w-xl text-xs md:text-sm leading-relaxed text-phos-dim">
              {p.tagline}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {p.techStack.map((t) => (
                <span
                  key={t}
                  className="text-[9px] tracking-[0.15em] text-phos-dim border border-line px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-4 flex justify-between items-center text-[10px] tracking-[0.2em] text-phos-dim">
            <span>TIMELINE: {p.duration.toUpperCase()}</span>
            <span className="font-bold text-hazard group-hover:red-glow">
              [ OPEN &gt;&gt;&gt; ]
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="cases" className="relative border-b border-line">
      {/* header block */}
      <div className="px-4 md:px-16 lg:pl-20 py-14 md:py-20 grid gap-6 md:grid-cols-12 items-end border-b border-line">
        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 text-[10px] tracking-[0.22em] text-hazard red-glow font-bold mb-4"
          >
            <span>&gt;&gt; CASE_ARCHIVE // CHRONO</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(2.6rem,8vw,6.5rem)]"
          >
            Projects
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-4 md:text-right text-[10px] tracking-[0.2em] text-phos-dim space-y-1"
        >
          <div>REGISTERED_CASES: <span className="text-phos font-bold">0{PROJECTS.length}</span></div>
          <div>SELECT TO DECRYPT FULL PARAMS</div>
        </motion.div>
      </div>

      {PROJECTS.map((p, idx) =>
        CARD_PROJECTS.includes(p.id) ? (
          <FeaturedCard key={p.id} p={p} onOpen={onOpen} />
        ) : (
          <RowCard key={p.id} p={p} idx={idx} onOpen={onOpen} />
        ),
      )}
    </section>
  );
}