import { useState, useEffect } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ContactMessage } from '../types';

type Phase = 'idle' | 'sending' | 'sent' | 'error';

const SEND_LOGS = [
  'INIT_TRANSMIT_SEQ // VERIFY PARAMS',
  'ENCRYPTING :: 128-BIT MODULAR VECTOR',
  'PACKET_STREAMING >> PRODUCTION NODE',
  'VERIFY_RELAYS :: CONFIRM RECEIPT',
  'ACKNOWLEDGED // PAYLOAD REGISTERED',
];

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [logCount, setLogCount] = useState(0);
  const [error, setError] = useState('');
  const [archive, setArchive] = useState<ContactMessage[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('studio_transmissions');
      if (stored) setArchive(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('IDENTIFICATION_ERROR: SUPPLY SENDER ID.');
    if (!validateEmail(email))
      return setError('VECTOR_ERROR: MALFORMED TRANSMISSION ADDRESS.');
    if (message.trim().length < 10)
      return setError('DIRECTIVE_ERROR: PAYLOAD MIN 10 SYMBOLS.');

    setPhase('sending');
    setLogCount(0);
    for (let i = 0; i <= SEND_LOGS.length; i++) {
      await new Promise((r) => setTimeout(r, 420));
      setLogCount(i);
    }
    await new Promise((r) => setTimeout(r, 500));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error('server');
      const entry: ContactMessage = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };
      const updated = [entry, ...archive];
      setArchive(updated);
      localStorage.setItem('studio_transmissions', JSON.stringify(updated));
      setPhase('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setPhase('error');
      setError('RELAY_FAILURE: NODE UNREACHABLE. RETRY LATER.');
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {phase === 'error' && (
        <div className="border border-hazard bg-hazard/10 p-3 text-[10px] text-phos flex gap-2">
          <span className="text-hazard">!</span>
          <span>{error}</span>
        </div>
      )}

      {phase === 'sending' && (
        <div className="border border-hazard bg-crt-1 p-4 space-y-3">
          <div className="flex justify-between text-[10px]">
            <span className="text-hazard red-glow font-bold anim-blink">
              &gt;&gt; BROADCAST_STREAM_LIVE...
            </span>
            <span className="text-phos-faint">VECTOR ENCRYPTION</span>
          </div>
          <div className="bg-crt h-32 overflow-hidden p-3 text-[10px] text-phos-dim space-y-1 border border-line">
            {SEND_LOGS.slice(0, logCount).map((l, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-term">{'>'}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'sent' && (
        <div className="border border-term/50 bg-term/10 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-term anim-dot inline-block" />
            <div>
              <h4 className="font-display text-sm text-term green-glow uppercase tracking-widest">
                TRANSMISSION OK // LOGGED
              </h4>
              <p className="text-[10px] text-phos-dim">
                DIRECTIVE REGISTERED IN ARCHIVE.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPhase('idle')}
            className="border border-term/40 text-term text-[10px] tracking-[0.2em] px-4 py-2 hover:bg-term hover:text-crt transition-colors"
          >
            &lt; NEW RELAY SIGNAL &gt;
          </button>
        </div>
      )}

      {/* FIELDS */}
      <Field label="01. IDENTIFICATION // SENDER ID">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="YOUR_NAME"
          disabled={phase === 'sending'}
          className="w-full bg-transparent border-b border-line py-3 font-mono text-xs text-phos placeholder-phos-faint focus:outline-none focus:border-hazard transition-colors"
        />
      </Field>

      <Field label="02. TRANSMISSION VECTOR // ADDRESS">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL_ADDRESS"
          disabled={phase === 'sending'}
          className="w-full bg-transparent border-b border-line py-3 font-mono text-xs text-phos placeholder-phos-faint focus:outline-none focus:border-hazard transition-colors"
        />
      </Field>

      <Field label="03. THE DIRECTIVE // SPEC">
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="PROJECT_DETAILS (MIN 10)"
          disabled={phase === 'sending'}
          className="w-full bg-transparent border-b border-line py-3 font-mono text-xs text-phos placeholder-phos-faint focus:outline-none focus:border-hazard resize-none transition-colors"
        />
      </Field>

      <button
        type="submit"
        disabled={phase === 'sending'}
        className="group flex justify-between items-center bg-hazard text-crt font-display text-xs tracking-[0.2em] px-6 py-4 mt-1 hover:bg-crt hover:text-phos hover:border hover:border-hazard transition-colors"
      >
        <span>[ TRANSMIT ]</span>
        <span className="group-hover:text-hazard">&gt;&gt;&gt;</span>
      </button>

      {/* ARCHIVE */}
      {archive.length > 0 && phase !== 'sending' && (
        <div className="border border-line bg-crt-1 p-3 space-y-2">
          <div className="flex justify-between items-center text-[9px] tracking-[0.2em] text-phos-faint border-b border-line pb-2">
            <span>ARCHIVED_RELAYS ({archive.length})</span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('studio_transmissions');
                setArchive([]);
              }}
              className="text-hazard hover:text-phos transition-colors"
            >
              PURGE
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-auto">
            {archive.map((m, i) => (
              <div key={i} className="text-[10px] border-b border-line/50 pb-2">
                <div className="flex justify-between text-phos-faint">
                  <span className="text-phos font-bold">{m.name}</span>
                  <span>{m.timestamp}</span>
                </div>
                <div className="text-term/80 text-[9px]">{m.email}</div>
                <p className="text-phos-dim mt-1">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[9px] tracking-[0.22em] text-phos-faint font-bold">
        {label}
      </span>
      {children}
    </label>
  );
}