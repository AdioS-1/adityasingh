import React, { useState } from 'react';
import { TOOLS_LIST } from '../data/portfolioData';
import { ToolItem } from '../types';
import { playTick } from '../utils/audio';

export const Tools: React.FC = () => {
  const [hoveredTool, setHoveredTool] = useState<ToolItem | null>(null);

  return (
    <section
      id="tools-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
            <span>05 / TECHNICAL STACK & INSTRUMENTATION</span>
          </div>
          <h2
            id="tools-heading"
            className="text-[clamp(2.5rem,6.5vw,5.6rem)] font-normal tracking-[-0.05em] leading-[0.95] text-[#F4F4F2]"
          >
            TOOL <span className="font-serif italic text-[#FFA800]">ARSENAL</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#A6ACB8] max-w-sm font-light leading-relaxed">
          The specialized software, languages, and generative pipelines utilized to translate ideas into high-fidelity reality.
        </p>
      </div>

      {/* Grid of Minimal Tool Badges (Reflecting the reference image side-panel aesthetic) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-12">
        {TOOLS_LIST.map((tool) => {
          const isHovered = hoveredTool?.id === tool.id;
          return (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              onMouseEnter={() => {
                setHoveredTool(tool);
                playTick(600, 0.015, 'sine', 0.008);
              }}
              onMouseLeave={() => setHoveredTool(null)}
              className="p-5 sm:p-6 rounded-2xl bg-[#0D1118] border border-white/[0.06] hover:border-white/20 transition-all duration-300 relative group cursor-pointer flex flex-col justify-between h-44 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-start justify-between">
                {/* Monogram Box Inspired by the Reference Image (Ai, Fg, Ae) */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm tracking-tighter transition-all duration-300 ${
                    tool.iconType === 'illustrator'
                      ? 'bg-[#330000] text-[#FF9A00] border border-[#FF9A00]/30 group-hover:shadow-[0_0_15px_rgba(255,154,0,0.4)]'
                      : tool.iconType === 'aftereffects'
                      ? 'bg-[#000033] text-[#9999FF] border border-[#9999FF]/30 group-hover:shadow-[0_0_15px_rgba(153,153,255,0.4)]'
                      : tool.iconType === 'photoshop'
                      ? 'bg-[#001E36] text-[#31A8FF] border border-[#31A8FF]/30 group-hover:shadow-[0_0_15px_rgba(49,168,255,0.4)]'
                      : tool.iconType === 'figma'
                      ? 'bg-[#1E1E1E] text-[#F24E1E] border border-[#F24E1E]/30 group-hover:shadow-[0_0_15px_rgba(242,78,30,0.4)]'
                      : tool.iconType === 'blender'
                      ? 'bg-[#2A1800] text-[#EA7600] border border-[#EA7600]/30 group-hover:shadow-[0_0_15px_rgba(234,118,0,0.4)]'
                      : 'bg-[#111722] text-[#00FFE0] border border-[#00FFE0]/30 group-hover:shadow-[0_0_15px_rgba(0,255,224,0.4)]'
                  }`}
                >
                  {tool.shortName}
                </div>

                <span className="text-[10px] font-mono text-[#68717E] uppercase">
                  {tool.yearsOfUse}
                </span>
              </div>

              <div className="space-y-1 mt-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-xs font-mono text-[#68717E] group-hover:text-[#00FFE0] transition-colors">
                    {tool.proficiency}%
                  </span>
                </div>
                <p className="text-[11px] text-[#A6ACB8] line-clamp-2 font-light">
                  {tool.focus}
                </p>
              </div>

              {/* Bottom Subtle Proficiency Bar */}
              <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-[#31577F] to-[#FFA800] transition-all duration-500"
                  style={{ width: `${tool.proficiency}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
