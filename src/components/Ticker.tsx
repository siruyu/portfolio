import { BIOGRAPHY } from '../data/portfolioData';

const ITEMS = [
  'SYSTEMS NOMINAL',
  'CREATIVE SYSTEM DEVELOPER',
  'EST.2024',
  'REJECTING EPHEMERAL PATTERNS',
  'REACT.19 / VITE / TYPESCRIPT',
  'CURRENT_FOCUS: PRISMA + SQLITE',
  'INDIA ASIA INGRESS',
  'BUILT FOR DIGITAL PERMANENCE',
  'BIOMETRIC GRADE: HIGH FIDELITY',
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-10 border-t border-line bg-crt-1/95 flex items-center overflow-hidden">
      <span className="flex items-center h-full px-3 bg-hazard text-crt text-[10px] font-bold tracking-widest shrink-0">
        &gt;&gt;&gt;
      </span>
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div
          className="inline-flex items-center gap-[3vw] pr-[3vw]"
          style={{ animation: 'ticker-x 32s linear infinite' }}
        >
          {row.map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] tracking-[0.25em] text-phos-dim"
            >
              <span className="text-hazard mr-[3vw]">///</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}