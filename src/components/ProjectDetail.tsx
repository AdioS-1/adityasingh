import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Check, Copy, Share2 } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { playTick, playOpenCaseStudy } from '../utils/audio';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSelectNextProject: (nextProject: Project) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onSelectNextProject,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Scroll to top on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onBack]);

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    playTick(680, 0.03);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${project.title} — Case Study by Veronica PW`,
        text: project.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <article
      id={`case-study-${project.slug}`}
      className="min-h-screen pt-28 sm:pt-36 pb-32 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto animate-fade-in"
    >
      {/* Top Nav: Back to Work & Share */}
      <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-white/[0.08]">
        <button
          id="back-to-work-button"
          onClick={() => {
            playTick(420, 0.02);
            onBack();
          }}
          className="group flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#A6ACB8] hover:text-[#FFA800] transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-[#FFA800] flex items-center justify-center transition-colors">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          </div>
          <span>RETURN TO ARCHIVE (ESC)</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            id="share-case-study-button"
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono text-[#A6ACB8] hover:text-[#F4F4F2] transition-colors focus:outline-none"
          >
            <Share2 size={13} />
            <span>{shareFeedback ? 'LINK COPIED' : 'SHARE'}</span>
          </button>
          <span className="text-xs font-mono text-[#68717E] hidden sm:inline">
            {project.number} / 0{PROJECTS.length}
          </span>
        </div>
      </div>

      {/* Case Study Editorial Header */}
      <header className="py-12 sm:py-20 space-y-8">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-[#FFA800]">
          <span>{project.number}</span>
          <span>—</span>
          <span>{project.category.toUpperCase()}</span>
          <span>—</span>
          <span className="text-[#68717E]">{project.year}</span>
        </div>

        <h1
          id="case-study-title"
          className="text-[clamp(3rem,8.5vw,7.8rem)] font-medium tracking-[-0.045em] leading-[0.92] text-[#F4F4F2]"
        >
          {project.title}
        </h1>

        <p className="text-lg sm:text-2xl text-[#A6ACB8] max-w-3xl font-light leading-relaxed">
          {project.summary}
        </p>

        {/* Project Metadata Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/[0.08] text-xs">
          <div>
            <div className="text-[#68717E] uppercase tracking-widest font-mono text-[10px] mb-1.5">
              CLIENT
            </div>
            <div className="text-[#F4F4F2] font-medium text-sm">{project.client}</div>
          </div>
          <div>
            <div className="text-[#68717E] uppercase tracking-widest font-mono text-[10px] mb-1.5">
              YEAR
            </div>
            <div className="text-[#F4F4F2] font-medium text-sm">{project.year}</div>
          </div>
          <div>
            <div className="text-[#68717E] uppercase tracking-widest font-mono text-[10px] mb-1.5">
              ROLE
            </div>
            <div className="text-[#F4F4F2] font-medium text-sm">{project.role}</div>
          </div>
          <div>
            <div className="text-[#68717E] uppercase tracking-widest font-mono text-[10px] mb-1.5">
              SERVICES
            </div>
            <div className="text-[#A6ACB8] text-xs leading-relaxed">
              {project.services.join(' • ')}
            </div>
          </div>
        </div>
      </header>

      {/* Monumental Hero Image Visual */}
      <section className="relative my-8 sm:my-14 overflow-hidden rounded-[24px] sm:rounded-[36px] border border-white/[0.08] bg-[#0D1118]">
        <div className="aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
          <img
            src={project.heroImage}
            alt={`${project.title} master visual`}
            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
          />
        </div>
        {project.liveUrl && (
          <div className="absolute bottom-6 right-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#080B11]/85 backdrop-blur-md border border-white/15 text-xs uppercase tracking-wider text-[#F4F4F2] hover:text-[#00FFE0] hover:border-[#00FFE0] transition-all"
            >
              <span>EXPLORE LIVE PLATFORM</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </section>

      {/* Overview, Challenge & Approach In Asymmetric Columns */}
      <section className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 border-b border-white/[0.08]">
        <div className="lg:col-span-4 space-y-4">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#FFA800]">
            CONTEXT & INTENT
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F4F4F2]">
            Bridging conceptual depth with sensory execution.
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-12 text-[#A6ACB8] font-light leading-relaxed text-base sm:text-lg">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#F4F4F2] mb-3">
              THE OVERVIEW
            </h3>
            <p>{project.overview}</p>
          </div>

          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#FFA800] mb-3">
              THE CHALLENGE
            </h3>
            <p>{project.challenge}</p>
          </div>

          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#00FFE0] mb-3">
              OUR STRATEGIC APPROACH
            </h3>
            <p>{project.approach}</p>
          </div>
        </div>
      </section>

      {/* Interactive Design System Specimen: Typography & Color Swatches */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08] space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#00FFE0] mb-2">
              FOUNDATIONAL TOKENS
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#F4F4F2]">
              Design System & Chromatic Spectrum
            </h2>
          </div>
          <span className="text-xs font-mono text-[#68717E]">
            GRID: {project.designSystem.gridMetric}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Typography Specimen */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[24px] bg-[#0D1118] border border-white/[0.08] space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#68717E] flex justify-between">
              <span>TYPOGRAPHY SYSTEM</span>
              <span className="text-[#FFA800]">OPTICAL HARMONY</span>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#68717E] block mb-1">
                  Primary Typeface
                </span>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F2]">
                  {project.designSystem.primaryFont}
                </div>
                <p className="text-xs font-mono text-[#A6ACB8] tracking-widest mt-1">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk 0123456789
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono text-[#68717E] block mb-1">
                  Editorial Accent Font
                </span>
                <div className="text-3xl sm:text-4xl font-serif italic text-[#FFA800]">
                  {project.designSystem.secondaryFont}
                </div>
                <p className="text-xs font-serif italic text-[#A6ACB8] mt-1">
                  Atmospheric, evocative, tailored for editorial tension.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Color Palette */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-[24px] bg-[#0D1118] border border-white/[0.08] space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#68717E] flex justify-between">
              <span>COLOR PALETTE (CLICK TO COPY HEX)</span>
              <span className="text-[#00FFE0]">WCAG COMPLIANT</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {project.designSystem.colors.map((color, cIdx) => (
                <button
                  key={cIdx}
                  id={`color-swatch-${cIdx}`}
                  onClick={() => handleCopyHex(color.hex)}
                  className="group text-left p-3.5 rounded-2xl bg-[#111722] border border-white/10 hover:border-white/30 transition-all focus:outline-none"
                >
                  <div
                    className="h-12 w-full rounded-xl mb-3 border border-white/10 shadow-inner transition-transform group-hover:scale-[1.02]"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-[#F4F4F2]">{color.name}</span>
                    {copiedHex === color.hex ? (
                      <Check size={13} className="text-emerald-400" />
                    ) : (
                      <Copy size={13} className="text-[#68717E] group-hover:text-[#FFA800] transition-colors" />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-[#68717E] mt-0.5 flex justify-between">
                    <span>{color.hex}</span>
                    <span className="opacity-75">{color.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Exploration Gallery */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08] space-y-12">
        <div className="space-y-2">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#FFA800]">
            VISUAL ARTIFACTS
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#F4F4F2]">
            Detailed Explorations & Compositions
          </h2>
        </div>

        <div className="space-y-12">
          {project.gallery.map((item, gIdx) => (
            <figure key={gIdx} className="space-y-3">
              <div className="rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#0D1118] border border-white/[0.08]">
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-auto object-cover filter brightness-[0.92] contrast-[1.05]"
                />
              </div>
              <figcaption className="flex items-center justify-between text-xs font-mono text-[#68717E] px-2">
                <span>FIGURE {gIdx + 1}</span>
                <span className="text-[#A6ACB8]">{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Outcome & Tangible Impact Metrics */}
      <section className="py-16 sm:py-24 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[#00FFE0]">
            OUTCOME & RECEPTION
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F4F4F2]">
            Measurable impact on culture and market share.
          </h2>
          <p className="text-base text-[#A6ACB8] font-light leading-relaxed pt-2">
            {project.outcome}
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 self-center">
          {project.impact.map((stat, sIdx) => (
            <div
              key={sIdx}
              className="p-6 rounded-2xl bg-[#0D1118] border border-white/[0.08] flex flex-col justify-between h-36"
            >
              <div className="text-3xl sm:text-4xl font-medium tracking-tight text-[#FFA800]">
                {stat.metric}
              </div>
              <div className="text-xs text-[#A6ACB8] font-mono uppercase tracking-wider leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Project Footer Navigation */}
      <footer className="pt-20 sm:pt-28">
        <div className="text-xs font-mono tracking-widest text-[#68717E] uppercase mb-4">
          NEXT CASE STUDY
        </div>

        <button
          id="next-project-button"
          onClick={() => {
            playOpenCaseStudy();
            onSelectNextProject(nextProject);
          }}
          className="group text-left block w-full focus:outline-none"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-8 border-b border-white/20 group-hover:border-[#FFA800] transition-colors">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#00FFE0]">{nextProject.number} / NEXT</span>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors duration-300">
                {nextProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors">
              <span>EXPLORE CASE STUDY</span>
              <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-[#FFA800] group-hover:bg-[#FFA800] group-hover:text-[#080B11] flex items-center justify-center transition-all">
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </button>
      </footer>
    </article>
  );
};
