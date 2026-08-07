import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-crt/70" onClick={onClose} />

      <motion.aside
        className="relative w-full max-w-2xl h-full bg-crt-1 border-l border-line overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-60" />

        {/* corner brackets */}
        <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-hazard" />
        <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-hazard" />
        <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-hazard" />
        <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-hazard" />

        <div className="relative p-6 md:p-10 flex flex-col min-h-full">
          {/* header */}
          <div className="flex justify-between items-center border-b border-line pb-4 mb-8">
            <span className="text-[10px] tracking-[0.25em] text-hazard red-glow font-bold">
              CASE_ARCHIVE // SYSTEM_{project.number}
            </span>
            <button
              onClick={onClose}
              className="text-phos-dim hover:bg-hazard hover:text-crt px-3 py-2 text-xs font-bold border border-line hover:border-hazard transition-colors"
            >
              [ X CLOSE ]
            </button>
          </div>

          {/* title block */}
          <div className="space-y-4">
            <span className="text-[9px] tracking-[0.25em] text-phos-dim border border-line bg-crt-2 px-2 py-1 inline-block">
              {project.category}
            </span>
            <h3 className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(1.8rem,6vw,3.2rem)]">
              {project.title}
            </h3>
            <p className="text-sm text-phos-dim">{project.tagline}</p>
          </div>

          {/* spec table */}
          <dl className="mt-8 grid grid-cols-2 gap-px bg-line border border-line">
            <div className="bg-crt p-4">
              <dt className="text-[9px] tracking-[0.22em] text-phos-faint">CHRONO_TIMELINE</dt>
              <dd className="mt-1 text-xs text-phos font-bold">{project.duration}</dd>
            </div>
            <div className="bg-crt p-4">
              <dt className="text-[9px] tracking-[0.22em] text-phos-faint">METRIC_ROLE</dt>
              <dd className="mt-1 text-xs text-phos font-bold">{project.role}</dd>
            </div>
            <div className="bg-crt p-4 col-span-2">
              <dt className="text-[9px] tracking-[0.22em] text-phos-faint">STACK_MODULES</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] tracking-[0.15em] text-phos-dim border border-line px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {/* body blocks */}
          <div className="mt-8 space-y-8">
            <Block title="PROJECT_OVERVIEW">{project.description}</Block>
            <Block title="ENCOUNTERED_ROADBLOCKS" accent>
              {project.challenges}
            </Block>
            <Block title="SOLUTION_IMPL" frame>
              {project.solutions}
            </Block>

            {/* blueprint diagnostic */}
            <div>
              <span className="text-[9px] tracking-[0.22em] text-phos-faint font-bold block mb-2">
                SYSTEM_DIAGNOSTIC_MAP
              </span>
              <pre className="p-4 bg-crt border border-line text-[10px] text-hazard red-glow overflow-x-auto">
{`{
  "system_id"    : "0x${project.id.toUpperCase()}_DEV",
  "cluster"      : "cloud-ingress-node-asia",
  "runtime"      : "PROD_STABLE_VERIFIED",
  "compression"  : "5.45:1",
  "frame_overhead": "0.45ms",
  "mem_leak"     : "0_ERR_DETECTOR"
}`}
              </pre>
            </div>
          </div>

          {/* actions */}
          <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row gap-3 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex justify-between items-center bg-hazard text-crt font-display text-xs tracking-[0.2em] px-5 py-4 hover:bg-crt hover:text-phos hover:border hover:border-hazard transition-colors"
              >
                <span>[ LIVE DEPLOYMENT ]</span>
                <span>&gt;&gt;&gt;</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex justify-between items-center border border-line-hi text-phos text-xs tracking-[0.2em] px-5 py-4 hover:border-hazard hover:text-hazard transition-colors"
              >
                <span>&lt; REPOS_SOURCE &gt;</span>
                <span>GIT</span>
              </a>
            )}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function Block({
  title,
  accent,
  frame,
  children,
}: {
  title: string;
  accent?: boolean;
  frame?: boolean;
  children: string;
}) {
  return (
    <div>
      <span className="text-[9px] tracking-[0.22em] text-phos-faint font-bold block mb-2">
        {accent ? '!' : '//'} {title}
      </span>
      <p
        className={`text-[13px] leading-relaxed text-phos-dim ${
          frame ? 'bg-crt-2 p-4 border border-line' : ''
        } ${accent ? 'border-l-2 border-hazard pl-4' : ''}`}
      >
        {children}
      </p>
    </div>
  );
}
