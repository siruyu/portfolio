import React, { useEffect, useRef, useState } from 'react';
import { SystemSettings } from '../types';

interface NetworkBackgroundProps {
  settings: SystemSettings;
}

export default function NetworkBackground({ settings }: NetworkBackgroundProps) {
  const sphereCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const nebulaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ lastScrollTop: 0, scrollDelta: 0 });

  // Map settings color choices to actual hex values for styling
  const getColorHex = (colorName: 'red' | 'cyan' | 'lime' | 'amber') => {
    switch (colorName) {
      case 'cyan': return '#06b6d4';
      case 'lime': return '#84cc16';
      case 'amber': return '#f59e0b';
      case 'red':
      default: return '#ff5545'; // Custom orange-red primary
    }
  };

  useEffect(() => {
    const colorHex = getColorHex(settings.accentColor);
    
    // -----------------------------------------------------------------
    // 1. NEBULA CANVAS: Particle backdrop drifting on scroll
    // -----------------------------------------------------------------
    const nCanvas = nebulaCanvasRef.current;
    if (!nCanvas) return;
    const nCtx = nCanvas.getContext('2d');
    if (!nCtx) return;

    let nWidth = (nCanvas.width = window.innerWidth);
    let nHeight = (nCanvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      alpha: number;
    }

    let stars: Star[] = [];
    const maxStars = settings.particleDensity;

    const createStar = (initZRandom = true): Star => ({
      x: Math.random() * nWidth,
      y: Math.random() * nHeight,
      z: initZRandom ? Math.random() * nWidth : nWidth,
      vx: (Math.random() - 0.5) * 0.2 * settings.sphereSpeed,
      vy: (Math.random() - 0.5) * 0.2 * settings.sphereSpeed,
      vz: -Math.random() * 2 * settings.sphereSpeed,
      size: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.9 ? colorHex : '#ffffff',
      alpha: Math.random() * 0.6 + 0.1
    });

    const initStars = () => {
      stars = [];
      for (let i = 0; i < maxStars; i++) {
        stars.push(createStar(true));
      }
    };
    initStars();

    const resizeBackdrop = () => {
      if (!nCanvas) return;
      nWidth = nCanvas.width = window.innerWidth;
      nHeight = nCanvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', resizeBackdrop);

    // -----------------------------------------------------------------
    // 2. 3D WIREFRAME SPHERE CANVAS (Pure mathematical 3D on 2D Context)
    // -----------------------------------------------------------------
    const sCanvas = sphereCanvasRef.current;
    if (!sCanvas) return;
    const sCtx = sCanvas.getContext('2d');
    if (!sCtx) return;

    let sWidth = (sCanvas.width = sCanvas.parentElement?.clientWidth || 600);
    let sHeight = (sCanvas.height = sCanvas.parentElement?.clientHeight || 600);

    const resizeSphere = () => {
      if (!sCanvas || !sCanvas.parentElement) return;
      sWidth = sCanvas.width = sCanvas.parentElement.clientWidth || 600;
      sHeight = sCanvas.height = sCanvas.parentElement.clientHeight || 600;
    };
    window.addEventListener('resize', resizeSphere);

    // Generate Points on a 3D Sphere of a given radius
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    const sphereRadius = 160;
    // We'll use layout divisions to structure lines properly
    const rings = 12;
    const pointsPerRing = 18;
    const vertices: Point3D[] = [];

    // Top point
    vertices.push({ x: 0, y: -sphereRadius, z: 0 });

    for (let r = 1; r < rings; r++) {
      const phi = (Math.PI * r) / rings;
      for (let p = 0; p < pointsPerRing; p++) {
        const theta = (2 * Math.PI * p) / pointsPerRing;
        vertices.push({
          x: sphereRadius * Math.sin(phi) * Math.cos(theta),
          y: sphereRadius * Math.cos(phi),
          z: sphereRadius * Math.sin(phi) * Math.sin(theta)
        });
      }
    }
    // Bottom point
    vertices.push({ x: 0, y: sphereRadius, z: 0 });

    // Track original connection meshes to draw lines cleanly
    // A connection represents pairs of vertex indices
    const connections: [number, number][] = [];

    // Lateral connections (longitude lines)
    for (let r = 1; r < rings - 1; r++) {
      const ringOffset = 1 + (r - 1) * pointsPerRing;
      const nextRingOffset = 1 + r * pointsPerRing;
      for (let p = 0; p < pointsPerRing; p++) {
        const current = ringOffset + p;
        const nextCol = ringOffset + ((p + 1) % pointsPerRing);
        const below = nextRingOffset + p;

        // Draw longitudinal rings
        connections.push([current, nextCol]);
        // Draw latitudinal connections
        connections.push([current, below]);
      }
    }

    // Connect poles
    for (let p = 0; p < pointsPerRing; p++) {
      // Connect top pole (index 0) to first ring
      connections.push([0, 1 + p]);
      // Connect bottom pole (last index) to last ring
      const lastRingStart = 1 + (rings - 2) * pointsPerRing;
      connections.push([vertices.length - 1, lastRingStart + p]);
    }

    // Rotations variables
    let angleX = 0;
    let angleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      scrollRef.current.scrollDelta = (scrollTop - scrollRef.current.lastScrollTop) * 0.15;
      scrollRef.current.lastScrollTop = scrollTop;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // System render loop
    let animationFrameId: number;

    const tick = () => {
      // 1. UPDATE NEBULA BACKDROP
      nCtx.fillStyle = 'rgba(19, 19, 19, 0.25)'; // Clear with slight trail mapping
      nCtx.fillRect(0, 0, nWidth, nHeight);

      stars.forEach((star) => {
        // Star updates
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz - scrollRef.current.scrollDelta * 1.2;

        if (star.z < 1) {
          const fresh = createStar(false);
          Object.assign(star, fresh);
        } else if (star.z > nWidth) {
          const fresh = createStar(false);
          Object.assign(star, fresh);
        }

        // Projection
        const scale = nWidth / star.z;
        const x2d = (star.x - nWidth / 2) * scale + nWidth / 2;
        const y2d = (star.y - nHeight / 2) * scale + nHeight / 2;
        const projectedSize = star.size * scale;

        if (x2d > 0 && x2d < nWidth && y2d > 0 && y2d < nHeight && star.z > 0) {
          nCtx.fillStyle = star.color;
          nCtx.globalAlpha = star.alpha;
          nCtx.beginPath();
          nCtx.arc(x2d, y2d, Math.min(projectedSize, 4), 0, Math.PI * 2);
          nCtx.fill();
        }
      });
      nCtx.globalAlpha = 1.0; // Reset alpha

      // Decay scroll delta
      scrollRef.current.scrollDelta *= 0.92;

      // 2. UPDATE AND RENDERING 3D SPHERE WIREFRAME
      sCtx.clearRect(0, 0, sWidth, sHeight);

      // Smooth mouse filtering interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Spin velocities base
      const speedFactor = settings.sphereSpeed;
      angleY += 0.003 * speedFactor + mouseRef.current.x * 0.01;
      angleX += 0.002 * speedFactor - mouseRef.current.y * 0.01;

      // Transform and project points
      const projected: { x: number; y: number; z: number; visible: boolean }[] = [];
      const fov = 350; // Camera perspective viewport lens
      const centerX = sWidth / 2;
      const centerY = sHeight / 2;

      vertices.forEach((v) => {
        // Rotate Y
        let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;

        // Rotate X
        let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
        let y2 = v.y * cosX - z1 * sinX;
        let z2 = v.y * sinX + z1 * cosX;

        // Position on depth Z
        const zDepth = z2 + 400; // Push depth camera distance
        
        // Simple projection onto 2D viewport
        const factor = fov / zDepth;
        const px = x1 * factor + centerX;
        const py = y2 * factor + centerY;

        projected.push({
          x: px,
          y: py,
          z: zDepth,
          visible: zDepth > 10 // Behind camera guard
        });
      });

      // DRAW LINES
      if (settings.wireframeStyle !== 'points') {
        sCtx.lineWidth = 0.8;
        connections.forEach(([i, j]) => {
          const pt1 = projected[i];
          const pt2 = projected[j];

          if (pt1.visible && pt2.visible) {
            // Check coordinate limits to stay in canvas
            const dist = Math.max(pt1.z, pt2.z);
            // Dynamic alpha based on vertex depth
            const alphaFactor = Math.max(0.05, 1 - (dist - 240) / 320);

            sCtx.strokeStyle = colorHex;
            sCtx.globalAlpha = alphaFactor * 0.45;
            
            sCtx.beginPath();
            sCtx.moveTo(pt1.x, pt1.y);
            sCtx.lineTo(pt2.x, pt2.y);
            sCtx.stroke();
          }
        });
      }

      // DRAW POINTS (NODES)
      if (settings.wireframeStyle !== 'lines') {
        projected.forEach((pt, idx) => {
          if (pt.visible) {
            const sizeMap = pt.z < 400 ? 2.5 : 1.2;
            const ptAlpha = Math.max(0.1, 1 - (pt.z - 240) / 320);

            sCtx.fillStyle = idx === 0 || idx === vertices.length - 1 ? '#ffffff' : colorHex;
            sCtx.globalAlpha = ptAlpha * 0.8;
            sCtx.beginPath();
            sCtx.arc(pt.x, pt.y, sizeMap, 0, Math.PI * 2);
            sCtx.fill();
            
            // Add subtle glow on the poles
            if (idx === 0 || idx === vertices.length - 1) {
              sCtx.shadowColor = colorHex;
              sCtx.shadowBlur = 8;
              sCtx.beginPath();
              sCtx.arc(pt.x, pt.y, sizeMap * 1.8, 0, Math.PI * 2);
              sCtx.strokeStyle = colorHex;
              sCtx.stroke();
              sCtx.shadowBlur = 0; // reset
            }
          }
        });
      }

      sCtx.globalAlpha = 1.0; // Reset overall opacity
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up connections on unmount
    return () => {
      window.removeEventListener('resize', resizeBackdrop);
      window.removeEventListener('resize', resizeSphere);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings]);

  return (
    <>
      {/* 1. Backdrop starry dust drift */}
      <canvas
        id="nebulaCanvas"
        ref={nebulaCanvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-50"
      />

      {/* 2. Interactive grid overlay lines lines for that raw structure system (subtle background layout) */}
      <div className="fixed inset-0 pointer-events-none z-0 grid grid-cols-4 md:grid-cols-12 gap-6 px-10 opacity-[0.03]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-l border-on-surface h-full" />
        ))}
      </div>

      {/* 3. Wireframe Floating 3D Node Sphere strictly bound to target hero placement */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85 mix-blend-screen flex items-center justify-center">
        <canvas
          id="three-sphere-canvas"
          ref={sphereCanvasRef}
          className="w-full max-w-[550px] aspect-square transition-transform duration-300"
        />
      </div>
    </>
  );
}
