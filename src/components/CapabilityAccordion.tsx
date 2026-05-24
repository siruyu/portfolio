import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Capability } from '../types';

interface CapabilityAccordionProps {
  capabilities: Capability[];
}

export default function CapabilityAccordion({ capabilities }: CapabilityAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>('cap3'); // Default active on cap3 (Creative Engineering) as seen in screenshot!

  const handleToggle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null); // Accordion toggle support
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="flex flex-col border-t border-l border-r border-[#e2e2e2]/10 md:border-l-0 md:border-t-0 md:border-r-0">
      {capabilities.map((item) => {
        const isOpen = expandedId === item.id;
        return (
          <div key={item.id} className="border-b border-[#e2e2e2]/10">
            {/* Header / Click Trigger */}
            <div
              onClick={() => handleToggle(item.id)}
              className={`group transition-all duration-300 cursor-pointer p-4 md:p-6 flex items-center justify-between ${
                isOpen 
                  ? 'bg-white text-[#131313]' 
                  : 'hover:bg-surface-card-high/40 text-[#e2e2e2]'
              }`}
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className={`font-sans text-3xl font-extrabold tracking-tighter ${
                  isOpen ? 'text-[#131313]' : 'text-[#e2e2e2]/40 group-hover:text-primary-container transition-colors'
                }`}>
                  {item.num}
                </span>
                <h3 className={`font-mono text-xs md:text-sm uppercase font-bold tracking-widest transition-transform ${
                  isOpen ? '' : 'group-hover:translate-x-3 duration-300'
                }`}>
                  {item.title}
                </h3>
              </div>

              {/* Status symbols trigger custom code style + / - */}
              <span className={`font-mono font-bold text-lg leading-none ${
                isOpen ? 'text-[#131313]' : 'text-primary-container'
              }`}>
                {isOpen ? '-' : '+'}
              </span>
            </div>

            {/* Slide-out detail drawer items */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[350px] border-b border-[#e2e2e2]/10 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="p-6 md:p-8 bg-[#131313] text-white space-y-4">
                <p className="font-mono text-sm leading-relaxed text-[#e2e2e2]/80">
                  {item.description}
                </p>
                <div className="w-12 h-0.5 bg-primary-container" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {item.details.map((detail, index) => (
                    <li key={index} className="font-mono text-xs text-[#e2e2e2]/60 flex items-start gap-2.5">
                      <span className="text-primary-container mt-0.5">//</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
