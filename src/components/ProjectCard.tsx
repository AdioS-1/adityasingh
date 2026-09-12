import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { playTick, playOpenCaseStudy } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  index,
}) => {
  const handleClick = () => {
    playOpenCaseStudy();
    onSelectProject(project);
  };

  // Determine layout structure based on project layoutVariant
  const isFullBleed = project.layoutVariant === 'full-bleed';
  const isSplitDuo = project.layoutVariant === 'split-duo';
  const isTall = project.layoutVariant === 'tall-editorial';
  const isAsymmetric = project.layoutVariant === 'asymmetric-banner';

  return (
    <article
      id={`project-card-${project.slug}`}
      data-cursor="project"
      data-cursor-label="VIEW"
      onClick={handleClick}
      onMouseEnter={() => playTick(620, 0.015, 'sine', 0.008)}
      className="group relative cursor-pointer block transition-transform duration-500 will-change-transform"
    >
      {/* CASE 1: Full Bleed Monolithic Layout */}
      {isFullBleed && (
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0D1118] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={project.heroImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-[#080B11]/40 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500" />
            
            {/* Top Bar Floating Meta */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none text-xs tracking-wider uppercase font-medium">
              <span className="px-3 py-1 rounded-full bg-[#080B11]/70 backdrop-blur-md border border-white/10 text-[#FFA800] font-mono">
                {project.number}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#080B11]/70 backdrop-blur-md border border-white/10 text-[#A6ACB8] font-mono">
                {project.year}
              </span>
            </div>

            {/* Bottom Content In Overlay */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.14em] uppercase text-[#00FFE0] font-semibold">
                    {project.category}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[11px] tracking-[0.1em] uppercase text-[#A6ACB8]">
                    Client: {project.client}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.04em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-[#A6ACB8] line-clamp-2 max-w-xl font-light">
                  {project.summary}
                </p>
              </div>

              <div className="flex items-center gap-4 self-start md:self-end">
                <span className="text-xs uppercase tracking-[0.16em] text-[#F4F4F2] font-semibold flex items-center gap-2 group-hover:text-[#FFA800] transition-colors">
                  Case Study
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE 2: Split-Duo Layout (Asymmetrical 2-column) */}
      {isSplitDuo && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#0D1118]/60 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
          <div className={`lg:col-span-7 overflow-hidden rounded-[18px] sm:rounded-[24px] aspect-[16/10] bg-[#111722] relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
            <img
              src={project.heroImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-[#080B11]/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#080B11]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#00FFE0]">
              {project.number}
            </div>
          </div>

          <div className={`lg:col-span-5 flex flex-col justify-between h-full space-y-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#68717E] font-medium font-mono">
                <span className="text-[#FFA800]">{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.04em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-[#A6ACB8] font-light leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="flex flex-wrap gap-2">
                {project.services.slice(0, 3).map((service, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 bg-[#111722] text-[#A6ACB8]"
                  >
                    {service}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] tracking-wider text-[#68717E] uppercase">
                  ROLE: {project.role}
                </span>
                <span className="w-8 h-8 rounded-full border border-white/15 group-hover:border-[#FFA800] group-hover:bg-[#FFA800] flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight size={14} className="text-[#F4F4F2] group-hover:text-[#080B11] transition-colors" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE 3: Tall Editorial Layout (Vertical Emphasis) */}
      {isTall && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#0D1118]/60 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
          <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#68717E]">
                <span className="text-[#00FFE0]">{project.number}</span>
                <span>/</span>
                <span>{project.year}</span>
                <span>/</span>
                <span>{project.category}</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-medium tracking-[-0.04em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-[#A6ACB8] font-light leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <div className="text-[11px] font-mono text-[#68717E] uppercase">
                COMMISSIONED BY: <span className="text-[#F4F4F2]">{project.client}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFA800]">
                <span>VIEW CASE STUDY ARCHIVE</span>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-[18px] sm:rounded-[24px] aspect-[16/11] lg:aspect-auto lg:min-h-[460px] bg-[#111722] relative">
            <img
              src={project.heroImage}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B11]/60 via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* CASE 4: Asymmetric Banner Layout */}
      {isAsymmetric && (
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#0D1118] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-8 aspect-[16/9] md:aspect-auto md:min-h-[420px] overflow-hidden relative">
              <img
                src={project.heroImage}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D1118] hidden md:block" />
            </div>

            <div className="md:col-span-4 p-6 sm:p-10 flex flex-col justify-between bg-[#0D1118] space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#68717E]">
                  <span className="text-[#FFA800]">{project.number}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.03em] text-[#F4F4F2] group-hover:text-[#00FFE0] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A6ACB8] font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#68717E]">
                  SYSTEM: {project.category}
                </div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors">
                  <span>DISCOVER</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
