import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { playTick } from '../utils/audio';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Branding', 'UI/UX', 'Editorial', 'Spatial', 'Motion'];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleFilter = (cat: string) => {
    playTick(500, 0.02);
    setSelectedCategory(cat);
  };

  return (
    <section
      id="work-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-white/[0.08]">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
            <span>01 / ARCHIVE & CASE STUDIES</span>
          </div>
          <h2
            id="selected-work-heading"
            className="text-[clamp(2.8rem,7.5vw,6.8rem)] font-normal tracking-[-0.05em] leading-[0.92] text-[#F4F4F2]"
          >
            SELECTED <br className="hidden sm:block" />
            <span className="font-serif italic text-[#FFA800]">WORK</span>
          </h2>
        </div>

        {/* Categories / Disciplines Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-end">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-button-${cat.toLowerCase()}`}
                onClick={() => handleFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-medium transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-[#F4F4F2] text-[#080B11] font-bold shadow-[0_0_12px_rgba(244,244,242,0.3)]'
                    : 'bg-[#111722] text-[#A6ACB8] hover:text-[#F4F4F2] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                <span>{cat}</span>
                {cat === 'ALL' && (
                  <span className="ml-1.5 opacity-60 text-[10px]">({PROJECTS.length})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Varied Asymmetrical Project Gallery */}
      <div className="pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>

      {/* Bottom Archive Note */}
      <div className="pt-16 text-center">
        <p className="text-xs tracking-[0.14em] text-[#68717E] uppercase font-mono">
          Showing {filteredProjects.length} of {PROJECTS.length} curated case studies • Additional archives available upon NDA request
        </p>
      </div>
    </section>
  );
};
