import { motion } from 'motion/react';
import { BIOGRAPHY } from '../data/portfolioData';
import Contact from './Contact';

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const specs: { k: string; v: string; link?: string }[] = [
    { k: 'PHYSICAL_LOCATION', v: BIOGRAPHY.details.location },
    { k: 'CONTACT_ADDRESS', v: BIOGRAPHY.details.email, link: `mailto:${BIOGRAPHY.details.email}` },
    { k: 'STACK_FOCUS', v: BIOGRAPHY.details.currentFocus },
    { k: 'COLLAB_ROLES', v: BIOGRAPHY.details.collaboration },
    { k: 'INTERESTS', v: BIOGRAPHY.details.interests },
  ];

  return (
    <section id="link" className="relative border-b border-line">
      <div className="grid lg:grid-cols-12">
        {/* BIO SLAB */}
        <div className="lg:col-span-7 lg:border-r border-line px-4 md:px-16 lg:pl-20 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-[10px] tracking-[0.22em] text-hazard red-glow font-bold mb-4"
          >
            [ METADATA :: SYSTEM_ARCH ]
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(2.6rem,8vw,6.5rem)]"
          >
            About<span className="text-hazard red-glow">_</span>
            <span className="text-phos-dim">me</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-8 space-y-5 text-sm leading-relaxed text-phos-dim max-w-2xl"
          >
            <p className="text-base text-phos font-bold border-l-2 border-hazard pl-4">
              {BIOGRAPHY.aboutMeLong}
            </p>
            <p>
              Constructing for digital permanence, rejecting ephemeral design
              movements. <span className="font-serif italic text-phos/80 text-lg halftone">rigid grids, raw type, mechanical intent.</span>
            </p>
          </motion.div>

          {/* SPECS TELEMETRY */}
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
            {specs.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="bg-crt p-4"
              >
                <dt className="text-[9px] tracking-[0.22em] text-phos-faint font-bold">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs text-phos font-bold">
                  {s.link ? (
                    <a
                      href={s.link}
                      className="underline decoration-hazard underline-offset-4 hover:text-hazard transition-colors select-all"
                    >
                      {s.v}
                    </a>
                  ) : (
                    <span className="select-all">{s.v}</span>
                  )}
                </dd>
              </motion.div>
            ))}

            <div className="bg-crt p-4 flex items-end justify-between gap-4">
              <div className="space-y-1 text-[9px] tracking-[0.2em] text-phos-faint">
                <div>ACTIVE_SINCE: {BIOGRAPHY.yearsActive}</div>
                <div className="text-term green-glow">STATUS: INDEPENDENT</div>
              </div>
              <div className="barcode h-6 w-20 text-phos/40" />
            </div>
          </dl>

          {/* registration marks */}
          <div className="mt-8 flex items-center gap-4 text-[10px] text-phos-faint tracking-[0.2em]">
            <span className="text-hazard">®</span>
            <span>REG. ID: SAHA-04</span>
            <span className="text-phos-faint">|</span>
            <span>© {new Date().getFullYear()}</span>
            <span className="text-phos-faint">|</span>
            <span className="text-hazard">™</span>
          </div>
        </div>

        {/* CONTACT SLAB */}
        <div className="lg:col-span-5 px-4 md:px-16 lg:pr-20 py-14 md:py-20 bg-crt-1/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-[10px] tracking-[0.22em] text-hazard red-glow font-bold mb-4"
          >
            &gt;&gt; INITIATE CONTACT DECK
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(1.6rem,3.5vw,2.6rem)] break-words"
          >
            Initiate
            <br />
            Communication<span className="text-hazard red-glow">.</span>
          </motion.h3>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            href={`mailto:${BIOGRAPHY.details.email}`}
            className="block mt-6 mb-8 text-sm md:text-base font-bold text-hazard red-glow hover:text-phos transition-colors border-b border-line pb-4 select-all break-all"
          >
            {BIOGRAPHY.details.email}
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            <Contact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
