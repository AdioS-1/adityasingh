import React from 'react';
import { ArrowUpRight, Sparkles, Award, Globe, Compass } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface AboutProps {
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  return (
    <section
      id="about-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* Section Subtitle */}
      <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em] pb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0]" />
        <span>02 / EDITORIAL BIOGRAPHY & ETHOS</span>
      </div>

      {/* Monumental Headline */}
      <div className="pb-16 sm:pb-24">
        <h2
          id="about-heading"
          className="text-[clamp(2.6rem,7vw,6.4rem)] font-normal tracking-[-0.05em] leading-[0.94] text-[#F4F4F2]"
        >
          DESIGNING IDEAS <br />
          INTO <span className="font-serif italic text-[#FFA800]">VISUAL</span> <br />
          EXPERIENCES.
        </h2>
      </div>

      {/* Main Editorial Grid: Portrait + Philosophy + Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Art-Directed Portrait Image */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#0D1118] border border-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.5)] aspect-[4/5] group">
            <img
              src={DESIGNER_INFO.profileImage}
              alt="Veronica PW Creative Visual Designer Portrait"
              loading="lazy"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient & Fine Noise Overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B11]/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Corner Badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#080B11]/80 backdrop-blur-md border border-white/10 text-[#F4F4F2]">
                {DESIGNER_INFO.name}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFA800]/20 border border-[#FFA800]/40 text-[#FFA800]">
                LONDON / 2026
              </span>
            </div>
          </div>

          {/* Quick Stats Strip Below Portrait */}
          <div className="grid grid-cols-2 gap-4">
            {DESIGNER_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0D1118] border border-white/[0.06] space-y-1"
              >
                <div className="text-2xl font-semibold text-[#FFA800] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-[#68717E] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Philosophy, Working Style & Distinct Metadata Blocks */}
        <div className="lg:col-span-7 space-y-12">
          {/* Philosophy Paragraphs */}
          <div className="space-y-6 text-[#A6ACB8] text-base sm:text-xl font-light leading-relaxed">
            <p className="text-xl sm:text-2xl text-[#F4F4F2] font-normal leading-snug">
              I believe graphic design is not decoration—it is the translation of human emotion, industrial logic, and computational systems into unforgettable visual resonance.
            </p>

            <p>
              Operating from London, I partner with founders, venture design studios, and luxury cultural ateliers to build enduring brand worlds. Every project begins with obsessive typographic reduction and culminates in atmospheric, fluid digital environments that defy generic web conventions.
            </p>

            <p>
              Rather than defaulting to cookie-cutter design tokens or ephemeral aesthetic trends, my methodology emphasizes mathematical grid harmony, tactile material depth, and deliberate whitespace.
            </p>
          </div>

          {/* Editorial Metadata Blocks (As requested in Section 8) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
            {/* Block 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#68717E]">
                <Globe size={12} className="text-[#00FFE0]" />
                <span>BASED IN</span>
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-[#F4F4F2]">
                {DESIGNER_INFO.location}
              </div>
              <p className="text-xs text-[#68717E]">
                Originally from Saint-P • Operating globally across GMT, CET & EST
              </p>
            </div>

            {/* Block 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#68717E]">
                <Compass size={12} className="text-[#FFA800]" />
                <span>SPECIALIZED IN</span>
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-[#F4F4F2]">
                BRANDING / UI / UX / MOTION
              </div>
              <p className="text-xs text-[#68717E]">
                Art direction, spatial systems, generative typography
              </p>
            </div>

            {/* Block 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#68717E]">
                <Sparkles size={12} className="text-emerald-400" />
                <span>AVAILABLE FOR</span>
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-[#00FFE0]">
                FREELANCE / COMMISSIONS
              </div>
              <p className="text-xs text-[#68717E]">
                Selected direct commissions for Q2/Q3 2026
              </p>
            </div>
          </div>

          {/* Three Design Pillars */}
          <div className="pt-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#68717E]">
              CORE PILLARS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0D1118]/80 border border-white/[0.06] space-y-2">
                <div className="text-xs font-mono text-[#FFA800]">01 / TYPOGRAPHY FIRST</div>
                <p className="text-xs text-[#A6ACB8] leading-relaxed">
                  Treating type as structural architecture rather than mere informational captions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D1118]/80 border border-white/[0.06] space-y-2">
                <div className="text-xs font-mono text-[#00FFE0]">02 / KINETIC IDENTITY</div>
                <p className="text-xs text-[#A6ACB8] leading-relaxed">
                  Choreographing dynamic behaviors and responsive atmospheres that feel alive.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D1118]/80 border border-white/[0.06] space-y-2">
                <div className="text-xs font-mono text-[#F4F4F2]">03 / TACTILE PRECISION</div>
                <p className="text-xs text-[#A6ACB8] leading-relaxed">
                  Infusing screen pixels with the depth, grain, and physical permanence of luxury print.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Collaboration CTA */}
          <div className="pt-4">
            <button
              id="about-collaborate-button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#111722] hover:bg-[#FFA800] border border-white/15 hover:border-[#FFA800] text-xs font-bold uppercase tracking-[0.16em] text-[#F4F4F2] hover:text-[#080B11] transition-all duration-300 group shadow-lg"
            >
              <span>DISCUSS A COMMISSION</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
