import React, { useEffect, useState } from 'react';
import { Home, Grid, Info, Mail, Settings, ShieldAlert } from 'lucide-react';

interface SideNavBarProps {
  onToggleControlPanel: () => void;
  accentColor: string;
}

export default function SideNavBar({ onToggleControlPanel, accentColor }: SideNavBarProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'capabilities', 'about'];
      const scrollPosition = window.scrollY + 250; // offset focus

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getActiveIndicatorStyle = (sectionId: string) => {
    if (activeSection === sectionId) {
      return {
        backgroundColor: "var(--color-primary-container)", // Highlight Primary-Container red
        color: '#131313'
      };
    }
    return {};
  };

  return (
    <>
      {/* desktop vertical left sidebar bar view */}
      <nav className="fixed left-0 top-0 h-full w-20 hidden lg:flex flex-col bg-surface-dim/80 backdrop-blur-md border-r border-[#e2e2e2]/10 z-30 py-8 items-center justify-between">
        <div className="flex flex-col items-center mt-6">
        </div>

        {/* menu action buttons */}
        <div className="flex flex-col items-center gap-4 flex-1 justify-center">
          <button
            onClick={() => scrollToSection('home')}
            style={getActiveIndicatorStyle('home')}
            className="group flex items-center justify-center w-11 h-11 text-[#e2e2e2] hover:bg-[#e2e2e2]/5 border border-[#e2e2e2]/10 transition-all duration-300"
            title="Index / Intro"
          >
            <Home className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
          </button>

          <button
            onClick={() => scrollToSection('projects')}
            style={getActiveIndicatorStyle('projects')}
            className="group flex items-center justify-center w-11 h-11 text-[#e2e2e2] hover:bg-[#e2e2e2]/5 border border-[#e2e2e2]/10 transition-all duration-300"
            title="Projects Catalog"
          >
            <Grid className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
          </button>

          <button
            onClick={() => scrollToSection('capabilities')}
            style={getActiveIndicatorStyle('capabilities')}
            className="group flex items-center justify-center w-11 h-11 text-[#e2e2e2] hover:bg-[#e2e2e2]/5 border border-[#e2e2e2]/10 transition-all duration-300"
            title="Skills & Execution"
          >
            <Info className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
          </button>

          <button
            onClick={() => scrollToSection('about')}
            style={getActiveIndicatorStyle('about')}
            className="group flex items-center justify-center w-11 h-11 text-[#e2e2e2] hover:bg-[#e2e2e2]/5 border border-[#e2e2e2]/10 transition-all duration-300"
            title="Client Integration"
          >
            <Mail className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* System parameters panel dashboard toggle */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onToggleControlPanel}
            className="group flex items-center justify-center w-11 h-11 text-primary-container hover:bg-primary-container/10 border border-primary-container/20 animate-pulse cursor-pointer transition-all duration-300"
            title="Console Settings"
          >
            <Settings className="w-[18px] h-[18px] group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Mobile Top Minimal Nav Bar */}
      <nav className="fixed top-0 left-0 w-full z-30 lg:hidden bg-surface-dim/95 backdrop-blur-md border-b border-[#e2e2e2]/10 px-5 py-4">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <span 
            onClick={() => scrollToSection('home')}
            className="font-sans font-bold text-lg tracking-tight text-[#e2e2e2] uppercase select-none cursor-pointer hover:text-primary-container transition-colors"
          >
            PORT_FOLIO
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('about')}
              className="text-xs uppercase font-bold tracking-wider text-[#e2e2e2]/60 hover:text-primary-container transition-colors py-1 px-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-xs uppercase font-bold tracking-wider text-[#e2e2e2]/60 hover:text-primary-container transition-colors py-1 px-2"
            >
              Cases
            </button>
            <button
              onClick={onToggleControlPanel}
              className="bg-primary-container/10 border border-primary-container/20 p-2 text-primary-container"
              title="System Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
