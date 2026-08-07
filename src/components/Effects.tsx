/**
 * CRT_TELETYPE FX LAYER
 * Fixed, non-interactive overlay simulating the display hardware:
 * scanlines, mechanical noise, sweep beam, column grid + corner brackets.
 */

const bracket =
  'absolute w-4 h-4 border-hazard/70';

export default function Effects() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
        {/* Phosphor retention / horizontal scan sweep */}
        <div
          className="absolute inset-0 crt-scanlines opacity-90"
        />
        {/* Slow moving electron beam */}
        <div
          className="absolute left-0 h-px w-full bg-hazard/15"
          style={{
            animation: 'scan-vert 7s linear infinite',
          }}
        />
        {/* Mechanical grain */}
        <div className="absolute inset-0 noise-layer opacity-[0.05] mix-blend-screen" />

        {/* Corner registration brackets */}
        <div className={`${bracket} top-0 left-0 border-t-2 border-l-2`} />
        <div className={`${bracket} top-0 right-0 border-t-2 border-r-2`} />
        <div className={`${bracket} bottom-0 left-0 border-b-2 border-l-2`} />
        <div className={`${bracket} bottom-0 right-0 border-b-2 border-r-2`} />

        {/* Crosshair indices */}
        <span className="absolute top-2 left-6 text-[9px] tracking-[0.2em] text-phos-faint">
          + 0,0
        </span>
        <span className="absolute bottom-2 right-6 text-[9px] tracking-[0.2em] text-phos-faint">
          FRAME:SHARP // 60HZ
        </span>
      </div>
    </>
  );
}
