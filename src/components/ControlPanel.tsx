import React from 'react';
import { X, RefreshCw, Zap, Sliders, Layers, Eye, Grid } from 'lucide-react';
import { SystemSettings } from '../types';

interface ControlPanelProps {
  settings: SystemSettings;
  onChangeSettings: (settings: SystemSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlPanel({ settings, onChangeSettings, isOpen, onClose }: ControlPanelProps) {
  if (!isOpen) return null;

  const handleColorChange = (color: 'red' | 'cyan' | 'lime' | 'amber') => {
    onChangeSettings({ ...settings, accentColor: color });
  };

  const handleSliderSelection = (key: keyof SystemSettings, val: number) => {
    onChangeSettings({ ...settings, [key]: val });
  };

  const handleStyleChange = (style: 'points-and-lines' | 'lines' | 'points') => {
    onChangeSettings({ ...settings, wireframeStyle: style });
  };

  const toggleGrid = () => {
    onChangeSettings({ ...settings, showGridLines: !settings.showGridLines });
  };

  const resetToFactoryDef = () => {
    onChangeSettings({
      accentColor: 'red',
      sphereSpeed: 1.0,
      particleDensity: 400,
      showGridLines: true,
      wireframeStyle: 'points-and-lines',
      matrixRain: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dim/90 backdrop-blur-md p-4">
      {/* Click outside backdrop dismiss */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main console window */}
      <div className="relative w-full max-w-md bg-[#131313] border border-primary-container/40 text-[#e2e2e2] p-6 shadow-2xl z-10 scanline-pulse">
        
        {/* Border grid brackets deco */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary-container" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary-container" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-primary-container" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-primary-container" />

        {/* Title and control headers */}
        <div className="flex justify-between items-center border-b border-[#e2e2e2]/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary-container animate-spin" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary-container">
              GRAPHICS PARAMETERS CONSOLE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#e2e2e2]/60 hover:text-primary-container transition-colors"
            title="Dismiss settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting sliders and triggers */}
        <div className="space-y-6">
          {/* Accent Color Selection */}
          <div className="space-y-2">
            <label className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold block flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> 01. COLOR CODES (ACCENT)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['red', 'cyan', 'lime', 'amber'] as const).map((color) => {
                const isSelected = settings.accentColor === color;
                const classMap: Record<string, string> = {
                  red: 'bg-[#ff5545]',
                  cyan: 'bg-[#06b6d4]',
                  lime: 'bg-[#84cc16]',
                  amber: 'bg-[#f59e0b]'
                };
                return (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`h-9 relative border transition-all duration-200 capitalize text-[10px] font-bold ${
                      isSelected 
                        ? 'border-white text-white' 
                        : 'border-[#e2e2e2]/10 text-[#e2e2e2]/50 hover:border-[#e2e2e2]/40'
                    }`}
                  >
                    <span className={`absolute top-1 left-1.5 w-2 h-2 rounded-full ${classMap[color]}`} />
                    <span className="pl-4">{color}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sphere Vector Speed Customizer */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold block flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> 02. SPHERE SPIN RATE
              </label>
              <span className="font-mono text-[10px] text-primary-container font-bold">
                {settings.sphereSpeed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={settings.sphereSpeed}
              onChange={(e) => handleSliderSelection('sphereSpeed', parseFloat(e.target.value))}
              className="w-full h-1 bg-surface-card-highest appearance-none cursor-pointer accent-primary-container border-none outline-none"
            />
          </div>

          {/* Star Node Particle Density */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold block flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> 03. NODE CLUSTER DENSITY
              </label>
              <span className="font-mono text-[10px] text-primary-container font-bold">
                {settings.particleDensity} nodes
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="800"
              step="50"
              value={settings.particleDensity}
              onChange={(e) => handleSliderSelection('particleDensity', parseInt(e.target.value))}
              className="w-full h-1 bg-surface-card-highest appearance-none cursor-pointer accent-primary-container border-none outline-none"
            />
          </div>

          {/* Grid Render Styles Selector */}
          <div className="space-y-2">
            <label className="font-sans text-[10px] text-[#e2e2e2]/40 uppercase tracking-widest font-bold block flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> 04. MESH GRAPHICS LOOK
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['points-and-lines', 'lines', 'points'] as const).map((style) => {
                const isSelected = settings.wireframeStyle === style;
                const labels: Record<string, string> = {
                  'points-and-lines': 'Mesh Matrix',
                  'lines': 'Wireframe',
                  'points': 'Vertices'
                };
                return (
                  <button
                    key={style}
                    onClick={() => handleStyleChange(style)}
                    className={`h-9 border text-[9px] font-mono uppercase tracking-tighter ${
                      isSelected 
                        ? 'border-primary-container bg-primary-container/10 text-white font-bold' 
                        : 'border-[#e2e2e2]/10 text-[#e2e2e2]/50 hover:border-[#e2e2e2]/30'
                    }`}
                  >
                    {labels[style]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagonal Structural Grid Layout Lines */}
          <div className="flex items-center justify-between border-t border-[#e2e2e2]/5 pt-4">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-[#e2e2e2]/60" />
              <div>
                <span className="font-sans text-xs text-[#e2e2e2] font-semibold block uppercase tracking-wider">
                  STRUCTURAL MATRIX LINES
                </span>
                <span className="text-[9px] font-mono text-[#e2e2e2]/30 block">
                  Draw subtle alignment grid lines
                </span>
              </div>
            </div>
            <button
              onClick={toggleGrid}
              className={`w-12 h-6 border flex items-center transition-colors duration-200 ${
                settings.showGridLines ? 'bg-primary-container/20 border-primary-container' : 'bg-surface-card border-[#e2e2e2]/10'
              }`}
            >
              <div className={`w-4.5 h-4.5 mx-0.5 border transition-all ${
                settings.showGridLines ? 'translate-x-[22px] bg-primary-container border-primary-container' : 'bg-[#e2e2e2]/40 border-[#e2e2e2]/20'
              }`} />
            </button>
          </div>
        </div>

        {/* Toolbar action logs for reset settings */}
        <div className="mt-8 pt-4 border-t border-[#e2e2e2]/10 flex justify-between items-center bg-surface-dim -mx-6 -mb-6 p-4">
          <span className="font-mono text-[9px] text-[#e2e2e2]/30">
            SYSTEM_INTEGRY_CHECK: OK
          </span>

          <button
            onClick={resetToFactoryDef}
            className="flex items-center gap-1 px-3 py-1.5 border border-[#e2e2e2]/10 bg-surface-card hover:bg-white text-[10px] font-mono text-[#e2e2e2]/60 hover:text-surface uppercase tracking-wider transition-colors duration-300"
          >
            <RefreshCw className="w-3 h-3" /> Restore Specs
          </button>
        </div>

      </div>
    </div>
  );
}
