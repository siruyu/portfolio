import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'index', num: '00', label: 'INDEX' },
  { id: 'cases', num: '01', label: 'CASES' },
  { id: 'core', num: '02', label: 'CORE' },
  { id: 'link', num: '03', label: 'LINK' },
];

export default function HudNav() {
  const [active, setActive] = useState('index');
  const [clock, setClock] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => {
      const s = fmt.formatToParts(new Date());
      const g = (type: string) => s.find((p) => p.type === type)?.value ?? '';
      setClock(
        `${g('year')}-${g('month')}-${g('day')} ${g('hour')}:${g('minute')}:${g('second')} IST`,
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY + window.innerHeight * 0.35;
      let current = 'index';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= pos) current = s.id;
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── Top status rail ─────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-10 border-b border-line bg-crt/90 flex items-center justify-between px-3 md:px-6 text-[10px] tracking-[0.18em] text-phos-dim">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="font-bold text-phos anim-flicker whitespace-nowrap">
            TACTICAL_TELEMETRY
          </span>
          <span className="text-hazard hidden sm:inline whitespace-nowrap">
            :: CORE SUITE
          </span>
          <span className="hidden md:inline text-phos-faint overflow-hidden text-ellipsis whitespace-nowrap">
            EST.2024 // INDIA ASIA INGRESS
          </span>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap">
          <span className="tabular-nums text-phos/80 select-all">{clock}</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-term anim-dot inline-block" />
            <span className="text-term hidden sm:inline">SYS:ONLINE</span>
          </span>
        </div>
      </header>

      {/* ── Left index rail (desktop) ───────────────────── */}
      <nav className="fixed left-0 top-10 bottom-10 hidden lg:flex w-14 flex-col items-center justify-between border-r border-line bg-crt-1/80 z-50 py-4">
        <button
          onClick={() => jump('index')}
          className="text-[10px] font-bold text-hazard red-glow tracking-widest hover:text-phos transition-colors"
        >
          A//S
        </button>

        <div className="flex flex-col gap-1">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => jump(s.id)}
                className={`group flex items-center gap-2 px-3 py-2 text-[10px] font-bold tracking-[0.2em] transition-colors duration-200 ${
                  isActive
                    ? 'bg-hazard text-crt'
                    : 'text-phos-faint hover:text-phos'
                }`}
                title={s.label}
              >
                <span className={isActive ? '' : 'group-hover:text-hazard'}>
                  {s.num}
                </span>
                {isActive && <span className="text-crt text-[8px]">&lt;</span>}
              </button>
            );
          })}
        </div>

        <span className="text-[9px] tracking-[0.3em] text-phos-faint [writing-mode:vertical-rl]">
          ONLINE
        </span>
      </nav>

      {/* ── Mobile condensed nav ────────────────────────── */}
      <nav className="lg:hidden fixed left-0 right-0 top-10 z-50 border-b border-line bg-crt-1/90 px-3 flex items-center justify-between text-[10px]">
        <span className="text-hazard red-glow font-bold tracking-widest">
          A//S
        </span>
        <div className="flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              className={`px-3 py-2.5 tracking-[0.2em] ${
                active === s.id ? 'bg-hazard text-crt font-bold' : 'text-phos-dim'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
