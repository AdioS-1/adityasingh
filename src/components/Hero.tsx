import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { playTick } from '../utils/audio';

interface HeroProps {
  onScrollToWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToWork }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset from screen center (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      // Damped target offset (approx 20-30px)
      setMouseOffset({ x: x * 26, y: y * 24 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen min-h-[760px] flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto overflow-hidden select-none"
    >
      {/* Atmospheric Cinematic Lighting Orbs */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Deep Atmospheric Blue Glow */}
        <div
          className="absolute -top-[10%] left-[15%] w-[62vw] max-w-[850px] h-[60vh] rounded-full bg-radial from-[#1677FF]/22 via-[#31577F]/16 to-transparent blur-[120px] will-change-transform transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
          }}
        />

        {/* Diagonal Soft Cyan Beam Accent */}
        <div
          className="absolute top-[32%] right-[5%] w-[45vw] max-w-[600px] h-[45vh] rounded-full bg-radial from-[#00FFE0]/14 via-[#31577F]/10 to-transparent blur-[110px] will-change-transform transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${-mouseOffset.x * 1.2}px, ${-mouseOffset.y * 1.2}px, 0)`,
          }}
        />

        {/* Warm Orange Horizon Glimmer */}
        <div
          className="absolute bottom-[12%] left-[42%] w-[35vw] max-w-[450px] h-[35vh] rounded-full bg-radial from-[#FFA800]/12 via-transparent to-transparent blur-[100px] will-change-transform transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
          }}
        />
      </div>

      {/* Top Subtle Tag / Agency Reference */}
      <div className="flex items-center justify-between pt-2 pb-4 text-[#68717E] text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-medium border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
          <span>EDITORIAL PORTFOLIO / 2026 EDITION</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#A6ACB8]">
          <Sparkles size={12} className="text-[#00FFE0]" />
          <span>VISUAL DIRECTION & SPATIAL SYSTEMS</span>
        </div>
      </div>

      {/* Monumental Hero Typography */}
      <div className="my-auto py-10 sm:py-14 relative">
        <div className="flex flex-col">
          {/* Line 1: Creative */}
          <div className="overflow-hidden">
            <h1
              id="hero-title-line-1"
              className="text-[clamp(3.5rem,10.8vw,9.8rem)] font-medium tracking-[-0.055em] leading-[0.9] text-[#F4F4F2] select-text transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)`,
              }}
            >
              Creative
            </h1>
          </div>

          {/* Line 2: visual (Asymmetric Shift, Serif Italic, Vibrant Orange) */}
          <div className="flex items-baseline justify-end sm:justify-start sm:pl-[24vw] md:pl-[28vw] -mt-1 sm:-mt-3 overflow-hidden">
            <span
              id="hero-title-line-2"
              className="font-serif italic font-normal text-[clamp(3.8rem,11.5vw,10.5rem)] leading-[0.9] text-[#FFA800] tracking-[-0.03em] drop-shadow-[0_0_35px_rgba(255,168,0,0.22)] select-text transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${-mouseOffset.x * 0.35}px, ${-mouseOffset.y * 0.35}px, 0)`,
              }}
            >
              visual
            </span>
          </div>

          {/* Line 3: designer (Clean Geometric Sans, Shifted Alignment) */}
          <div className="overflow-hidden sm:pl-[12vw] md:pl-[16vw] -mt-1 sm:-mt-3">
            <h2
              id="hero-title-line-3"
              className="text-[clamp(3.5rem,10.8vw,9.8rem)] font-medium tracking-[-0.055em] leading-[0.9] text-[#F4F4F2] select-text transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`,
              }}
            >
              designer
            </h2>
          </div>
        </div>

        {/* Subtle Decorative Editorial Coordinate Stamp */}
        <div className="absolute -right-2 top-8 hidden xl:flex flex-col items-end gap-1 text-[10px] font-mono tracking-[0.18em] text-[#68717E] opacity-60">
          <span>51.5074° N, 0.1278° W</span>
          <span>CURATED ARCHIVE [01-06]</span>
          <span className="text-[#00FFE0]">REF: 87029-AWW-FWA</span>
        </div>
      </div>

      {/* Hero Metadata & Scroll Explorer Indicator (Matching the prompt and reference image perfectly) */}
      <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        {/* Left Metadata Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 lg:gap-20 text-[11px] sm:text-[12px] uppercase font-medium">
          {/* Column 1 */}
          <div className="space-y-2">
            <div className="text-[#A6ACB8] tracking-[0.14em] flex flex-col leading-relaxed">
              <span className="text-[#F4F4F2] font-semibold">WEB & MOBILE / UX&UI</span>
              <span>/ BRANDING</span>
            </div>
            <p className="text-[#68717E] tracking-[0.08em] normal-case text-xs">
              Currently available for freelance worldwide
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <div className="text-[#A6ACB8] tracking-[0.14em] flex flex-col leading-relaxed">
              <span className="text-[#F4F4F2] font-semibold">BASED IN LONDON</span>
              <span className="text-[#68717E]">BORN IN SAINT-P</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0]" />
              <span className="text-[10px] tracking-[0.1em] text-[#00FFE0]">
                ACCEPTING DIRECT COMMISSIONS
              </span>
            </div>
          </div>
        </div>

        {/* Right Scroll Indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <button
            id="hero-scroll-indicator-button"
            onClick={() => {
              playTick(480, 0.03);
              onScrollToWork();
            }}
            data-cursor="pointer"
            className="group flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#A6ACB8] hover:text-[#FFA800] transition-colors duration-200 focus:outline-none"
          >
            <span>EXPLORE SELECTED WORK</span>
            <div className="w-8 h-8 rounded-full border border-white/15 group-hover:border-[#FFA800] flex items-center justify-center transition-colors duration-200 group-hover:translate-y-1">
              <ArrowDown size={14} className="text-[#F4F4F2] group-hover:text-[#FFA800] animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
