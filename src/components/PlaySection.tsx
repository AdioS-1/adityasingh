import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Maximize2, RefreshCw } from 'lucide-react';
import { PLAY_EXPERIMENTS } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export const PlaySection: React.FC = () => {
  const [activeExperiment, setActiveExperiment] = useState<string>(PLAY_EXPERIMENTS[0].id);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const animRef = useRef<number | null>(null);

  // Interactive generative canvas wave simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    let step = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(8, 11, 17, 0.25)';
      ctx.fillRect(0, 0, width, height);

      step += 0.025;

      const lines = 16;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const factor = (i / lines) * 2;
        const orangeOrCyan = i % 2 === 0 ? 'rgba(255, 168, 0, 0.65)' : 'rgba(0, 255, 224, 0.55)';
        ctx.strokeStyle = orangeOrCyan;
        ctx.lineWidth = 1.2;

        for (let x = 0; x < width; x += 12) {
          const distToMouse = Math.hypot(x - mouseX, height / 2 - mouseY);
          const mouseWave = Math.sin(distToMouse * 0.04 - step * 2) * Math.max(0, 40 - distToMouse * 0.1);
          const wave = Math.sin(x * 0.008 + step + factor) * 45;
          const y = height / 2 + wave + mouseWave + (i - lines / 2) * 9;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section
      id="play-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
            <span>06 / EXPERIMENTAL LAB & SANDBOX</span>
          </div>
          <h2
            id="play-heading"
            className="text-[clamp(2.5rem,6.5vw,5.6rem)] font-normal tracking-[-0.05em] leading-[0.95] text-[#F4F4F2]"
          >
            LAB / <span className="font-serif italic text-[#FFA800]">PLAY</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#A6ACB8] max-w-sm font-light leading-relaxed">
          Unconstrained personal inquiries into generative algorithms, kinetic typography, and procedural geometry.
        </p>
      </div>

      {/* Interactive Canvas Stage */}
      <div className="mt-12 rounded-[28px] sm:rounded-[36px] bg-[#0D1118] border border-white/[0.1] overflow-hidden relative group">
        <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00FFE0]">
            <Sparkles size={14} />
            <span>REACTIVE LISSAJOUS INTERACTION MESH</span>
          </div>
          <span className="text-[#68717E] hidden sm:inline">
            MOVE CURSOR OVER CANVAS TO PERTURB VECTORS
          </span>
        </div>

        <div className="relative w-full h-[320px] sm:h-[380px] bg-[#080B11]" data-cursor="drag">
          <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

          <div className="absolute bottom-4 left-6 pointer-events-none text-xs font-mono text-[#68717E]">
            REAL-TIME 60FPS SHADER CANVAS • HARMONIC WAVE MATRIX
          </div>
        </div>
      </div>

      {/* Experiments Catalog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {PLAY_EXPERIMENTS.map((exp) => {
          const isSelected = activeExperiment === exp.id;
          return (
            <div
              key={exp.id}
              id={`experiment-card-${exp.id}`}
              onClick={() => {
                playTick(560, 0.02);
                setActiveExperiment(exp.id);
              }}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-4 ${
                isSelected
                  ? 'bg-[#111722] border-[#FFA800]/50 shadow-[0_0_25px_rgba(255,168,0,0.15)]'
                  : 'bg-[#0D1118] border-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#080B11] relative">
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#080B11]/80 text-[10px] font-mono text-[#FFA800]">
                  {exp.number}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-[#00FFE0] tracking-wider">
                  {exp.medium}
                </div>
                <h3 className="text-base font-medium text-[#F4F4F2] tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-xs text-[#A6ACB8] line-clamp-2 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#080B11] text-[#68717E]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
