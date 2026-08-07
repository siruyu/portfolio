import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAPABILITIES } from '../data/portfolioData';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Capabilities() {
  const [open, setOpen] = useState<string | null>('cap3');

  return (
    <section id="core" className="relative border-b border-line">
      <div className="grid lg:grid-cols-12">
        {/* left sticky header */}
        <div className="lg:col-span-5 lg:border-r border-line px-4 md:px-16 lg:pl-20 lg:pr-12 py-14 md:py-20">
          <div className="lg:sticky lg:top-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-[10px] tracking-[0.22em] text-hazard red-glow font-bold mb-4"
            >
              &lt; SYSTEM_ENGINEERING_TOOLKIT &gt;
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(2.6rem,7vw,5.5rem)]"
            >
              Core
              <br />
              Matrix<span className="text-hazard red-glow">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-xs text-[11px] leading-relaxed text-phos-dim"
            >
              Assembling modular web platforms requires a balance of engineering
              logic and raw aesthetic intention.
            </motion.p>

            {/* status slab */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-crt-2 border border-line p-4 text-[9px] tracking-[0.2em] space-y-2"
            >
              <div className="flex justify-between">
                <span className="text-phos-faint">CPU_STATUS</span>
                <span className="text-term green-glow">OPTIMAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-phos-faint">THREAD_POOLS</span>
                <span className="text-phos">LIVE</span>
              </div>
              <div className="h-1 bg-line relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-hazard"
                  style={{ width: '62%' }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* right accordion */}
        <div className="lg:col-span-7 bg-line grid grid-cols-1 gap-px">
          {CAPABILITIES.map((cap) => {
            const isOpen = open === cap.id;
            return (
              <div key={cap.id} className="bg-crt">
                <button
                  onClick={() => setOpen(isOpen ? null : cap.id)}
                  className={`w-full flex items-center justify-between gap-4 px-4 md:px-10 py-6 md:py-8 text-left transition-colors duration-200 ${
                    isOpen
                      ? 'bg-phos text-crt'
                      : 'hover:bg-crt-2 text-phos'
                  }`}
                >
                  <div className="flex items-center gap-5 md:gap-10 min-w-0">
                    <span
                      className={`font-display text-3xl md:text-5xl ${
                        isOpen ? 'text-hazard' : 'text-phos-faint'
                      }`}
                    >
                      {cap.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display uppercase tracking-tight text-base md:text-2xl leading-tight">
                        {cap.title}
                      </h3>
                      <p
                        className={`mt-1 text-[10px] tracking-[0.15em] truncate ${
                          isOpen ? 'text-crt/60' : 'text-phos-faint'
                        }`}
                      >
                        {cap.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xl font-bold shrink-0 ${
                      isOpen ? 'text-hazard' : 'text-phos-faint'
                    }`}
                  >
                    {isOpen ? '[-]' : '[+]'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <div className="bg-crt border-t border-line px-4 md:px-10 py-6 space-y-4">
                        <p className="text-xs md:text-sm leading-relaxed text-phos-dim">
                          {cap.description}
                        </p>
                        <div className="w-10 h-0.5 bg-hazard" />
                        <ul className="grid md:grid-cols-2 gap-3">
                          {cap.details.map((d, i) => (
                            <li
                              key={i}
                              className="text-[11px] leading-relaxed text-phos-dim flex gap-2"
                            >
                              <span className="text-hazard">//</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
