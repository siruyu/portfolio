import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  ChevronRight, 
  Clock, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  Compass, 
  Instagram, 
  Github, 
  Linkedin, 
  FileText 
} from 'lucide-react';
import { Project, SystemSettings } from './types';
import { PROJECTS, CAPABILITIES, BIOGRAPHY } from './data/portfolioData';
import resumePdf from './assets/Resume_AISIK_SAHA.pdf';

import NetworkBackground from './components/NetworkBackground';
import SideNavBar from './components/SideNavBar';
import ProjectModal from './components/ProjectModal';
import ControlPanel from './components/ControlPanel';
import CapabilityAccordion from './components/CapabilityAccordion';
import ContactForm from './components/ContactForm';

export default function App() {
  // 1. App Settings States
  const [settings, setSettings] = useState<SystemSettings>({
    accentColor: 'red',
    sphereSpeed: 1.0,
    particleDensity: 350,
    showGridLines: true,
    wireframeStyle: 'points-and-lines',
    matrixRain: false
  });

  // 2. Modals and drawers toggles
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 3. Realistic cinematic loader
  const [isSystemLoading, setIsSystemLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingLogs = [
    'CONNECTING TO CENTRAL DEPLOYMENT Relays...',
    'STRUCTURING THEMATIC SPATIAL COORDINATES...',
    'INITIALIZING 3D SYSTEM MATRIX OVERLAYS...',
    'CALIBRATING LIGHTWEIGHT RENDER THREADS...',
    'SYSTEM METADATA LOADED STABLE // INGRESS GRANTED.'
  ];

  // 4. Scrolling trackers
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [activeDeveloperQuoteIndex, setActiveDeveloperQuoteIndex] = useState(0);

  const developerLogs = [
    "REJECTING EPHEMERAL PATTERNS PREFERRING COMPACT CODES.",
    "CURRENT_STACK: REACT 19 + VITE + TAILWIND 4 + EXPRESS.",
    "CRAFTING EXPERIMENTAL CLIENT FLUID GRIDS SINCE EST. 2024.",
    "LOCATED INDEPENDENT GRID NODES: INDIA ASIA INGRESS."
  ];

  // Map settings color adjustments dynamically to the DOM
  useEffect(() => {
    const root = document.documentElement;
    const colors = {
      red: '#ff5545',
      cyan: '#06b6d4',
      lime: '#84cc16',
      amber: '#f2a104'
    };
    const accentColors = {
      red: '#ff3b30',
      cyan: '#0891b2',
      lime: '#65a30d',
      amber: '#d97706'
    };

    root.style.setProperty('--color-primary-container', colors[settings.accentColor]);
    root.style.setProperty('--color-primary-accent', accentColors[settings.accentColor]);
  }, [settings.accentColor]);

  // System time ticker logic
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTimeStr(date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle developer logs ticker
  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveDeveloperQuoteIndex(prev => (prev + 1) % developerLogs.length);
    }, 6000);
    return () => clearInterval(logInterval);
  }, []);

  // Run initial cinematic system checks
  useEffect(() => {
    if (loadingStep < loadingLogs.length) {
      const delay = loadingStep === 0 ? 300 : loadingStep === 3 ? 500 : 250;
      const timer = setTimeout(() => {
        setLoadingStep(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsSystemLoading(false);
      }, 700);
      return () => clearTimeout(finishTimer);
    }
  }, [loadingStep]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Loader screen
  if (isSystemLoading) {
    return (
      <div className="fixed inset-0 bg-[#0e0e0e] text-[#e2e2e2] flex flex-col justify-between p-10 z-50 font-mono">
        <div className="flex justify-between items-center text-xs text-[#e2e2e2]/40">
          <span>COSMIC DIRECTIVE INTEGRATION SYSTEM</span>
          <span className="animate-spin text-primary-container font-extrabold">//</span>
        </div>

        <div className="max-w-xl space-y-4">
          <div className="text-xs text-primary-container border-l-2 border-primary-container pl-4 font-bold tracking-widest">
            SYSTEM LOADER v1.45.0
          </div>
          <h1 className="text-3xl font-extrabold uppercase text-[#e2e2e2] tracking-tighter sm:text-4xl">
            AISIK_SAHA.<br />PORTFOLIO_CORE
          </h1>

          <div className="space-y-1 pt-6 text-[10px] text-[#e2e2e2]/70">
            {loadingLogs.slice(0, loadingStep).map((log, idx) => (
              <div key={idx} className="flex gap-2.5 items-center">
                <ChevronRight className="w-3 h-3 text-primary-container shrink-0" />
                <span>{log}</span>
              </div>
            ))}
            {loadingStep < loadingLogs.length && (
              <div className="flex gap-2.5 items-center animate-pulse">
                <span className="w-2.5 h-2.5 bg-primary-container rounded-full shrink-0" />
                <span className="text-primary-container">COMPILING COMPONENT STACK...</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-[#e2e2e2]/30 border-t border-[#e2e2e2]/10 pt-4">
          <span>CRITICAL_ALIGNMENT: COMPLETED</span>
          <span>EST_WARPING_TIME: 1200ms</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#131313] text-[#e2e2e2] min-h-screen relative font-mono overflow-x-hidden selection:bg-primary-container selection:text-surface flex">
      
      {/* 3D and Particle canvases in background stack */}
      <NetworkBackground settings={settings} />

      {/* Responsive Left Navigation panels */}
      <SideNavBar 
        onToggleControlPanel={() => setIsControlPanelOpen(true)} 
        accentColor={settings.accentColor}
      />

      {/* Main Container Layout */}
      <main className="flex-1 lg:ml-20 min-h-screen flex flex-col justify-between pt-20 lg:pt-0">
        
        {/* Dynamic header tracker ticker (visible on top header) */}
        <header className="fixed top-0 left-0 lg:left-20 right-0 z-20 hidden md:flex h-12 bg-surface/40 backdrop-blur-md border-b border-[#e2e2e2]/5 items-center justify-between px-10 text-[10px] text-[#e2e2e2]/50">
          <div className="flex items-center gap-6">
            <span className="font-bold text-primary-container">INGRESS STATUS: HIGH_FIDELITY</span>
            <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-ping" />
            <span className="text-white/30 hidden lg:inline">|</span>
            <span className="hidden lg:inline uppercase animate-pulse duration-[3000ms] text-[#e2e2e2]/60">
              {developerLogs[activeDeveloperQuoteIndex]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-3.5 h-3.5 text-primary-container animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-bold text-[#e2e2e2]/80 tabular-nums select-all">{currentTimeStr}</span>
          </div>
        </header>

        {/* SECTION 1: HERO CONTAINER (Intro screen) */}
        <section 
          id="home" 
          className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-[1440px] mx-auto border-b border-[#e2e2e2]/10 relative overflow-hidden pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 w-full">
            <div className="md:col-span-12 relative">
              <span className="font-sans text-xs font-bold text-primary-container bg-primary-container/10 border border-primary-container/20 px-3 py-1 uppercase tracking-[0.2em] inline-block mb-3 animate-bounce">
                PORTFOLIO
              </span>
              <h1 className="font-sans text-[11vw] md:text-[8.5vw] font-extrabold leading-none tracking-tighter text-[#e2e2e2] uppercase select-all relative">
                Aisik_SAHA
              </h1>
              
              {/* Divider lines animating via standard CSS scale transition on viewport triggers */}
              <div className="w-full h-px bg-[#e2e2e2]/30 mt-6 mb-8 relative">
                <div className="absolute top-0 left-0 h-full bg-primary-container w-1/4" />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-4">
                <p className="font-mono text-sm md:text-base leading-relaxed text-[#e2e2e2]/80 max-w-xl bg-surface/65 backdrop-blur-md p-5 border border-[#e2e2e2]/10 relative">
                  <span className="absolute -top-1.5 -left-1.5 text-primary-container text-xs font-bold font-mono bg-surface px-1">BIO</span>
                  {BIOGRAPHY.tagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative">
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="bg-primary-container text-surface font-sans font-extrabold text-[#131313] hover:bg-white px-8 py-4 text-xs uppercase tracking-widest transition-colors duration-300 border border-transparent flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <span>Let's Build</span>
                    <ArrowRight className="w-4 h-4 text-[#131313] transition-transform group-hover:translate-x-1.5" />
                  </button>

                  <a 
                    href={resumePdf}
                    download="Resume_AISIK_SAHA.pdf"
                    className="border border-[#e2e2e2]/20 hover:border-primary-container hover:bg-primary-container/5 text-[#e2e2e2] hover:text-primary-container font-sans font-bold px-8 py-4 text-xs uppercase tracking-widest transition-all duration-300 inline-block"
                  >
                    RESUME
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Corner crosshair indices */}
          <div className="absolute top-10 left-10 text-[9px] text-[#e2e2e2]/25 font-bold select-none pointer-events-none hidden md:block">
            GRID_COORD_X00_Y00
          </div>
          <div className="absolute bottom-10 right-10 text-[9px] text-[#e2e2e2]/25 font-bold select-none pointer-events-none hidden md:block">
            SYSTEM_DECK_ACTIVE
          </div>
        </section>

        {/* SECTION 2: PORTFOLIO WORKS (Cases listing) */}
        <section 
          id="projects" 
          className="py-16 md:py-28 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-[#e2e2e2]/10 w-full"
        >
          {/* Header section of works */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-mono text-xs text-primary-container font-bold tracking-widest block mb-1">
                // CREATIVE WORK INGRESS / CHRONO
              </span>
              <h2 className="font-sans text-4xl md:text-6xl font-extrabold uppercase text-[#e2e2e2] tracking-tighter">
                projects
              </h2>
            </div>
            <p className="font-mono text-xs text-[#e2e2e2]/50 max-w-xs md:text-right">
              Viewing compiled cases with robust system metrics. Click on any case study to explore full architecture parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* FEATURED CASE PANEL - Ossuary digital graveyard */}
            <div 
              onClick={() => setSelectedProject(PROJECTS[0])}
              className="md:col-span-12 relative min-h-[460px] md:h-[550px] border border-[#e2e2e2]/10 bg-surface-card/25 backdrop-blur-md overflow-hidden group cursor-pointer flex flex-col justify-between p-6 md:p-10 select-none hover:border-primary-container/60 transition-all duration-500"
            >
              {/* Cover background images with dark contrast overlays */}
              <div className="absolute inset-0 z-0">
                <img 
                  alt={PROJECTS[0].title} 
                  src={PROJECTS[0].image} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale contrast-[1.1] brightness-[0.35] hover:brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/55 to-transparent" />
              </div>

              {/* Decorative tags */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="font-mono text-xs text-primary-container font-bold bg-[#131313]/85 backdrop-blur-sm border border-primary-container/20 px-3 py-1 uppercase tracking-widest">
                  {PROJECTS[0].category}
                </span>
                <span className="font-sans text-[11px] text-[#e2e2e2]/30 font-bold bg-[#131313]/80 p-1 border border-white/5 uppercase select-none">
                  SYS_ARCH_X00
                </span>
              </div>

              {/* Detailed descriptive core */}
              <div className="relative z-10 space-y-4 max-w-2xl pt-24 md:pt-0">
                <h3 className="font-sans text-3xl md:text-5xl font-extrabold uppercase text-[#e2e2e2] tracking-tighter leading-none group-hover:text-primary-container transition-colors">
                  {PROJECTS[0].title}
                </h3>
                <p className="font-mono text-xs md:text-sm text-[#e2e2e2]/70 leading-relaxed max-w-xl">
                  {PROJECTS[0].tagline}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {PROJECTS[0].techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[9px] bg-black/70 text-[#e2e2e2]/70 border border-[#e2e2e2]/10 px-2.5 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions bar */}
              <div className="relative z-10 border-t border-[#e2e2e2]/10 pt-4 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-[#e2e2e2]/40 tracking-wider">
                  TIMELINE DEPLOYMENT: {PROJECTS[0].duration}
                </span>
                <div className="bg-primary-container/10 border border-primary-container/20 group-hover:bg-primary-container px-5 py-2.5 text-primary-container group-hover:text-[#131313] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300">
                  <span>VIEW CASE</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* SECONDARY CASES: MUSICA */}
            <div 
              onClick={() => setSelectedProject(PROJECTS[1])}
              className="md:col-span-6 border border-[#e2e2e2]/10 bg-surface-card/20 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:border-primary-container/50 hover:bg-primary-container/5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-sans text-5xl font-extrabold text-[#e2e2e2]/20 group-hover:text-primary-container transition-all">
                  01
                </span>
                <div className="w-9 h-9 border border-[#e2e2e2]/10 flex items-center justify-center text-primary-container/80 group-hover:rotate-45 transition-transform bg-[#131313]/60">
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[10px] text-primary-container font-bold uppercase tracking-widest bg-primary-container/10 px-2 py-0.5 border border-primary-container/20 inline-block">
                  {PROJECTS[1].category}
                </span>
                <h4 className="font-sans text-2xl font-extrabold uppercase text-[#e2e2e2] tracking-tight group-hover:text-primary-container transition-colors">
                  {PROJECTS[1].title}
                </h4>
                <p className="font-mono text-xs text-[#e2e2e2]/70 leading-relaxed">
                  {PROJECTS[1].tagline}
                </p>
              </div>
            </div>

            {/* SECONDARY CASES: UI/UX Architecture */}
            <div 
              onClick={() => setSelectedProject(PROJECTS[2])}
              className="md:col-span-6 border border-[#e2e2e2]/10 bg-surface-card/20 backdrop-blur-md p-6 md:p-8 flex flex-col justify-between group cursor-pointer hover:border-primary-container/50 hover:bg-surface-card-high/40 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-sans text-5xl font-extrabold text-[#e2e2e2]/20 group-hover:text-white transition-all">
                  02
                </span>
                <div className="w-9 h-9 border border-[#e2e2e2]/10 flex items-center justify-center text-primary-container/80 group-hover:rotate-45 transition-transform bg-[#131313]/60">
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[10px] text-[#e2e2e2]/40 font-bold uppercase tracking-widest bg-surface-card-highest px-2 py-0.5 border border-white/5 inline-block">
                  {PROJECTS[2].category}
                </span>
                <h4 className="font-sans text-2xl font-extrabold uppercase text-[#e2e2e2] tracking-tight group-hover:text-white transition-colors">
                  {PROJECTS[2].title}
                </h4>
                <p className="font-mono text-xs text-[#e2e2e2]/70 leading-relaxed">
                  {PROJECTS[2].tagline}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: CORE CAPABILITIES (Skill accordions mapping) */}
        <section 
          id="capabilities" 
          className="py-16 md:py-28 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-[#e2e2e2]/10 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left label display descriptions */}
            <div className="lg:col-span-4 lg:border-r border-[#e2e2e2]/10 lg:pr-10">
              <span className="font-mono text-xs text-primary-container font-bold tracking-widest block mb-1">
                // SYSTEM_ENGINEERING_TOOLKIT
              </span>
              <h2 className="font-sans text-4xl md:text-5xl font-extrabold uppercase text-[#e2e2e2] tracking-tighter sticky top-24 leading-none">
                Core<br className="hidden lg:block" /> Capabilities
              </h2>
              <div className="font-mono text-xs text-[#e2e2e2]/50 mt-4 leading-relaxed sticky top-48 max-w-xs space-y-3">
                <p>
                  Assembling modular web platforms requires a balance of engineering logic and raw aesthetic intention.
                </p>
                <div className="bg-surface p-3.5 border border-[#e2e2e2]/10 text-primary-container text-[10px] space-y-1">
                  <div>CPU_STATUS: OPTIMAL</div>
                  <div>THREADING_POOLS: LIVE</div>
                </div>
              </div>
            </div>

            {/* Right Accordion lists triggers */}
            <div className="lg:col-span-8">
              <CapabilityAccordion capabilities={CAPABILITIES} />
            </div>

          </div>
        </section>

        {/* SECTION 4: ABOUT ME & FORM (Double panel layout) */}
        <section 
          id="about" 
          className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 border-b border-[#e2e2e2]/10"
        >
          {/* Left Block: Biography statistics */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#e2e2e2]/10 p-6 md:p-12 md:py-24 flex flex-col justify-between gap-12 bg-surface/20 backdrop-blur-sm relative">
            
            <div className="space-y-6">
              <span className="font-mono text-xs text-primary-container font-bold tracking-[0.2em] uppercase bg-primary-container/10 border border-primary-container/20 px-3 py-1 inline-block">
                METADATA SYSTEM_ARCH
              </span>
              <h2 className="font-sans text-5xl md:text-7xl font-extrabold text-[#e2e2e2] uppercase break-words leading-none tracking-tighter">
                ABOUT<br />me
              </h2>
              
              <div className="font-mono text-sm leading-relaxed text-[#e2e2e2]/80 max-w-2xl space-y-4">
                <p className="text-base text-white font-bold select-all">
                  "{BIOGRAPHY.aboutMeLong}"
                </p>
                
                {/* Specific biography specs grid metrics mapped */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 pt-6 border-t border-[#e2e2e2]/10 mt-6 md:mt-10">
                  <div className="space-y-1">
                    <span className="font-sans text-[10px] text-primary-container font-bold uppercase tracking-wider block">PHYSICAL_LOCATION</span>
                    <span className="text-xs text-[#e2e2e2] font-semibold">{BIOGRAPHY.details.location}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-sans text-[10px] text-primary-container font-bold uppercase tracking-wider block">CONTACT_ADDRESS</span>
                    <a href={`mailto:${BIOGRAPHY.details.email}`} className="text-xs text-[#e2e2e2] hover:text-primary-container underline underline-offset-4 font-semibold select-all">
                      {BIOGRAPHY.details.email}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-sans text-[10px] text-primary-container font-bold uppercase tracking-wider block">STACK_FOCUS</span>
                    <span className="text-xs text-[#e2e2e2] font-semibold">{BIOGRAPHY.details.currentFocus}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-sans text-[10px] text-primary-container font-bold uppercase tracking-wider block">COLLABORATION_ROLES</span>
                    <span className="text-xs text-[#e2e2e2] font-semibold">{BIOGRAPHY.details.collaboration}</span>
                  </div>

                  <div className="space-y-1 md:col-span-2 pt-2">
                    <span className="font-sans text-[10px] text-primary-container font-bold uppercase tracking-wider block">INTERESTS_TAGS</span>
                    <span className="text-xs text-[#e2e2e2] font-semibold">{BIOGRAPHY.details.interests}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom active year tags */}
            <div className="pt-6 border-t border-[#e2e2e2]/10 flex flex-wrap gap-8 text-[11px] font-bold text-[#e2e2e2]/40 uppercase tracking-widest mt-8">
              <span>ACTIVE_SINCE: {BIOGRAPHY.yearsActive}</span>
              <span className="text-primary-container">STATUS_LEVEL: INDEPENDENT</span>
              <span>COVERAGE: GLOBAL</span>
            </div>
          </div>

          {/* Right Block: Transmitter form coordinates */}
          <div className="lg:col-span-5 p-6 md:p-12 md:py-24 flex flex-col justify-between bg-surface-dim/40 backdrop-blur-md">
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs text-primary-container font-bold tracking-widest block mb-1">
                  // INITIATE CONTACT DECK
                </span>
                <h3 className="font-sans text-3xl md:text-4xl font-extrabold text-[#e2e2e2] uppercase leading-none tracking-tighter">
                  INITIATE<br />COMMUNICATION.
                </h3>
              </div>
              
              <a 
                href={`mailto:${BIOGRAPHY.details.email}`} 
                className="block font-sans text-xl md:text-2xl font-extrabold text-primary-container hover:text-white transition-colors duration-300 select-all break-all leading-none border-b border-[#e2e2e2]/10 pb-4"
              >
                {BIOGRAPHY.details.email}
              </a>

              {/* Functional contacts module form */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FOOTER SECTION: Dynamic metadata coordinates */}
        <footer className="w-full relative bg-surface-dim/95 border-t border-[#e2e2e2]/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-12 py-12 gap-8 w-full max-w-[1440px] mx-auto">
            
            <div className="space-y-1">
              <span className="font-sans text-lg font-extrabold text-[#e2e2e2] uppercase tracking-tighter">
                aisik_saha
              </span>
              <p className="text-[10px] text-[#e2e2e2]/40 uppercase tracking-wider">
                © {new Date().getFullYear()} PORTFOLIO. BUILT FOR CONSTANT DEPLOYMENT.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs uppercase text-[#e2e2e2]/50 font-semibold">
              <a href="https://www.instagram.com/_siruyu/" className="hover:text-primary-container underline decoration-transparent hover:decoration-primary-container transition-all duration-300" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://github.com/siruyu" className="hover:text-primary-container underline decoration-transparent hover:decoration-primary-container transition-all duration-300" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com" className="hover:text-primary-container underline decoration-transparent hover:decoration-primary-container transition-all duration-300" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>

          </div>
        </footer>

      </main>

      {/* CASE STUDIES DETAILED OVERLAYS MODALS DRAWER */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* SYSTEM GRAPHICS CONTROLS POPUP CONSOLE */}
      <ControlPanel 
        settings={settings}
        onChangeSettings={setSettings}
        isOpen={isControlPanelOpen}
        onClose={() => setIsControlPanelOpen(false)}
      />

    </div>
  );
}
