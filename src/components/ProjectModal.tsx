import React from 'react';
import { X, ArrowRight, Github, ExternalLink, Cpu, Terminal } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-surface-dim/80 backdrop-blur-md transition-opacity duration-300">
      {/* Outer transparent backdrop to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main modal slate drawer panel */}
      <div className="relative w-full max-w-2xl h-full bg-[#131313] border-l border-[#e2e2e2]/10 p-8 md:p-12 overflow-y-auto flex flex-col justify-between z-10 shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header toolbar controls */}
        <div>
          <div className="flex justify-between items-center border-b border-[#e2e2e2]/10 pb-6 mb-8">
            <span className="font-mono text-xs text-primary-container font-bold tracking-[0.2em] uppercase">
              CASE ARCHIVE // SYSTEM_{project.number}
            </span>
            <button
              onClick={onClose}
              className="group bg-surface-card hover:bg-primary-container border border-[#e2e2e2]/10 hover:border-transparent p-2 text-[#e2e2e2] hover:text-surface transition-colors duration-200"
              aria-label="Close panel"
            >
              <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Large display titles */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#e2e2e2]/40 bg-[#e2e2e2]/5 px-3 py-1 inline-block border border-[#e2e2e2]/10 uppercase tracking-widest">
              {project.category}
            </span>
            <h3 className="font-sans text-4xl md:text-5xl font-extrabold text-[#e2e2e2] uppercase leading-none tracking-tighter">
              {project.title}
            </h3>
            <p className="font-mono text-sm text-primary-container italic mt-2">
              {project.tagline}
            </p>
          </div>

          {/* Quick specs section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 mt-8 border-t border-b border-[#e2e2e2]/10 py-6">
            <div>
              <span className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-wider block">CHRONO TIMELINE</span>
              <span className="font-mono text-xs text-[#e2e2e2] font-semibold">{project.duration}</span>
            </div>
            <div>
              <span className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-wider block">METRIC ROLE</span>
              <span className="font-mono text-xs text-[#e2e2e2] font-semibold">{project.role}</span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-wider block">STACK MODULES</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-[9px] bg-surface-card-highest text-[#e2e2e2]/80 border border-[#e2e2e2]/10 px-1.5 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rich content breakdown */}
          <div className="mt-8 space-y-8">
            <div>
              <h4 className="font-sans text-xs text-[#e2e2e2] font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                <Terminal className="w-3.5 h-3.5 text-primary-container" /> PROJECT EXECUTIVES OVERVIEW
              </h4>
              <p className="font-mono text-[13px] text-[#e2e2e2]/80 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h4 className="font-sans text-xs text-[#e2e2e2] font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                <Cpu className="w-3.5 h-3.5 text-primary-container" /> ENCOUNTERED ROADBLOCKS
              </h4>
              <p className="font-mono text-[13px] text-[#e2e2e2]/80 leading-relaxed border-l-2 border-primary-accent/40 pl-4 py-1">
                {project.challenges}
              </p>
            </div>

            <div>
              <h4 className="font-sans text-xs text-[#e2e2e2] font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                <ArrowRight className="w-3.5 h-3.5 text-primary-container" /> SOLUTION IMPLEMENTATION
              </h4>
              <p className="font-mono text-[13px] text-[#e2e2e2]/80 leading-relaxed bg-[#e2e2e2]/5 p-4 border border-[#e2e2e2]/10 select-all">
                {project.solutions}
              </p>
            </div>

            {/* Simulated Architecture Blueprint Section */}
            <div>
              <span className="font-sans text-[10px] text-[#e2e2e2]/30 uppercase tracking-widest block mb-2 font-bold">SYSTEM DIAGNOSTIC MAP</span>
              <pre className="p-4 bg-surface-dim border border-[#e2e2e2]/10 text-[10px] text-primary-container/80 font-mono rounded overflow-x-auto">
                {`{
  "system_id": "0x${project.id.toUpperCase()}_DEV",
  "deployment_cluster": "cloud-ingress-node-asia",
  "runtime_status": "PROD_STABLE_VERIFIED",
  "compression_ratio": "5.45:1",
  "frame_overhead": "0.45ms",
  "memory_leak_check": "0_ERR_DETECTOR"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer toolbar actions */}
        <div className="mt-12 pt-6 border-t border-[#e2e2e2]/10 flex flex-col sm:flex-row gap-4">
          <a
            href={project.liveUrl || "#"}
            className="flex-1 flex justify-between items-center bg-primary-container hover:bg-white text-[#131313] font-mono hover:text-[#131313] p-4 text-xs font-bold uppercase tracking-widest transition-colors duration-300"
            target="_blank"
            rel="noreferrer"
          >
            <span>LIVE DEPLOYMENT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          
          <a
            href={project.githubUrl || "#"}
            className="flex-1 flex justify-between items-center bg-surface-card hover:bg-surface-card-highest text-[#e2e2e2] font-mono p-4 text-xs border border-[#e2e2e2]/10 hover:border-primary-container/40 transition-all duration-300"
            target="_blank"
            rel="noreferrer"
          >
            <span>REPOS SOURCE</span>
            <Github className="w-3.5 h-3.5 text-primary-container" />
          </a>
        </div>

      </div>
    </div>
  );
}
