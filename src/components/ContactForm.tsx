import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, CheckCircle2, AlertTriangle, MessageSquare, Trash2 } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Interactive processing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionLog, setTransmissionLog] = useState<string[]>([]);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  // Retained localized list of transmissions
  const [messageArchive, setMessageArchive] = useState<ContactMessage[]>([]);

  // Load transmissions archive on initialization
  useEffect(() => {
    try {
      const stored = localStorage.getItem('studio_transmissions');
      if (stored) {
        setMessageArchive(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage lookup failed", e);
    }
  }, []);

  const handleClearTransmissions = () => {
    localStorage.removeItem('studio_transmissions');
    setMessageArchive([]);
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim()) {
      setErrorText('IDENTIFICATION_ERROR: Name field must not be empty.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorText('VECTOR_ERROR: Enter a valid transmission address (Email).');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorText('DIRECTIVE_ERROR: Directive content too short. Min 10 characters.');
      return;
    }

    setIsSubmitting(true);
    setTransmissionLog([]);
    setSentSuccessfully(false);

    const logs = [
      'INIT_TRANSMIT_SEQUENCE: Verifying parameters...',
      'ENCRYPTING: Core handshakes establishing via SSL...',
      'PACKET_STREAMING: Sending 128-bit modular vector payload...',
      'VERIFYING_RELAYS: Confirming receipt with production node...',
      'ACKNOWLEDGEMENT_RECEIVED: Payload registered with ID ' + Math.random().toString(36).substring(2, 9).toUpperCase()
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 450));
      setTransmissionLog(prev => [...prev, logs[i]]);
    }

    await new Promise(r => setTimeout(r, 600));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error('Server error');

      const newMessage: ContactMessage = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString()
      };

      const updatedArchive = [newMessage, ...messageArchive];
      setMessageArchive(updatedArchive);
      localStorage.setItem('studio_transmissions', JSON.stringify(updatedArchive));

      setIsSubmitting(false);
      setSentSuccessfully(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setIsSubmitting(false);
      setErrorText('RELAY_FAILURE: Could not reach transmission server. Please try again later.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Visual error feedback warnings */}
      {errorText && (
        <div className="border border-primary-accent bg-primary-accent/10 p-4 text-xs font-mono text-white flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-primary-accent shrink-0" />
          <span>{errorText}</span>
        </div>
      )}

      {/* Main submission states overlay logic */}
      {isSubmitting ? (
        <div className="bg-[#0e0e0e] border border-primary-container/40 p-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-primary-container font-bold uppercase animate-pulse">
              // BROADCAST_STREAM_LIVE...
            </span>
            <span className="text-[#e2e2e2]/40">Vector Encryption</span>
          </div>
          <div className="space-y-1 bg-black/50 p-3 h-36 font-mono text-[10px] text-[#e2e2e2]/80 overflow-y-auto">
            {transmissionLog.map((line, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-primary-container">{`>`}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-[3px] bg-surface-card-highest relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-primary-container w-2/3 animate-infinite-loading" style={{ animation: 'scanline-infinite 1s linear infinite' }} />
          </div>
        </div>
      ) : sentSuccessfully ? (
        <div className="border border-green-500 bg-green-950/20 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
            <div>
              <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider">
                TRANSMISSION OK // LOGGED
              </h4>
              <p className="font-mono text-xs text-white/60">
                Your creative directive has bypassed relays and been logged.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSentSuccessfully(false)}
            className="px-4 py-2 border border-green-500/30 hover:bg-green-500/10 text-[10px] font-mono text-green-400 uppercase tracking-widest transition-colors"
          >
            Create New Relay Signal
          </button>
        </div>
      ) : (
        /* Native Brutalist Contact form matched exactly to screenshot */
        <form onSubmit={handleTransmit} className="space-y-6">
          {/* Identifiers Input */}
          <div className="flex flex-col gap-2 group">
            <label className="font-mono text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold transition-colors group-focus-within:text-primary-container">
              01. IDENTIFICATION // SENDER NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
              className="w-full bg-transparent border-b border-[#e2e2e2]/20 py-3.5 font-mono text-xs text-[#e2e2e2] placeholder-[#e2e2e2]/20 rounded-none transition-all focus:outline-none focus:border-primary-container"
            />
          </div>

          {/* Email Vector Input */}
          <div className="flex flex-col gap-2 group">
            <label className="font-mono text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold transition-colors group-focus-within:text-primary-container">
              02. TRANSMISSION VECTOR // ADDRESS
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-[#e2e2e2]/20 py-3.5 font-mono text-xs text-[#e2e2e2] placeholder-[#e2e2e2]/20 rounded-none transition-all focus:outline-none focus:border-primary-container"
            />
          </div>

          {/* Message Content Area */}
          <div className="flex flex-col gap-2 group">
            <label className="font-mono text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold transition-colors group-focus-within:text-primary-container">
              03. THE DIRECTIVE // PROJECT SPECIFICATION
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="PROJECT DETAILS (MIN 10 SYMBOLS)..."
              className="w-full bg-transparent border-b border-[#e2e2e2]/20 py-3.5 font-mono text-xs text-[#e2e2e2] placeholder-[#e2e2e2]/20 rounded-none resize-none transition-all focus:outline-none focus:border-primary-container"
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full bg-primary-container hover:bg-[#e2e2e2] text-[#131313] font-sans font-bold text-[11px] py-4 px-6 mt-4 hover:text-[#131313] transition-all duration-300 uppercase tracking-widest flex justify-between items-center group cursor-pointer"
          >
            <span>Transmit</span>
            <ArrowRight className="w-4 h-4 text-[#131313] transition-transform group-hover:translate-x-2" />
          </button>
        </form>
      )}

      {/* TRANSMISSIONS RECORD LOG (Client verification feature) */}
      {messageArchive.length > 0 && (
        <div className="border border-[#e2e2e2]/10 bg-surface-dim p-4 space-y-3 pt-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#e2e2e2]/10">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#e2e2e2]/50 font-bold">
              <MessageSquare className="w-3.5 h-3.5 text-primary-container" /> ARCHIVED RELAYS ({messageArchive.length})
            </div>
            <button
              onClick={handleClearTransmissions}
              className="text-primary-container hover:text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-1"
              title="Clear all stored logs"
            >
              <Trash2 className="w-3 h-3" /> Clear logs
            </button>
          </div>

          <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
            {messageArchive.map((msg, idx) => (
              <div key={idx} className="text-[10px] font-mono border-b border-[#e2e2e2]/5 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between text-[#e2e2e2]/40 mb-1">
                  <span className="font-bold text-[#e2e2e2]/70 capitalize">{msg.name}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="text-[#e2e2e2]/50 flex items-center gap-1 text-[9px] mb-1 italic">
                  Address: <span className="text-primary-container select-all">{msg.email}</span>
                </div>
                <p className="text-[#e2e2e2]/85 bg-black/40 p-2 border border-[#e2e2e2]/5 rounded-sm line-clamp-3">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
