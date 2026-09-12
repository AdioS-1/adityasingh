import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export const Services: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(SERVICES[0].id);

  const handleMouseEnter = (id: string) => {
    setActiveServiceId(id);
    playTick(580, 0.015, 'sine', 0.008);
  };

  return (
    <section
      id="services-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
            <span>03 / DISCIPLINES & CAPABILITIES</span>
          </div>
          <h2
            id="services-heading"
            className="text-[clamp(2.5rem,6.5vw,5.6rem)] font-normal tracking-[-0.05em] leading-[0.95] text-[#F4F4F2]"
          >
            WHAT <span className="font-serif italic text-[#FFA800]">I DO</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#A6ACB8] max-w-sm font-light leading-relaxed">
          Comprehensive creative direction and end-to-end execution across physical, digital, and spatial touchpoints.
        </p>
      </div>

      {/* Editorial Horizontal Rows (Expandable on hover) */}
      <div className="divide-y divide-white/[0.08] relative">
        {SERVICES.map((service, index) => {
          const isExpanded = activeServiceId === service.id;
          const isEven = index % 2 === 0;
          const accentColor = isEven ? '#FFA800' : '#00FFE0';

          return (
            <div
              key={service.id}
              id={`service-row-${service.id}`}
              onMouseEnter={() => handleMouseEnter(service.id)}
              className={`group py-8 sm:py-10 transition-all duration-300 relative cursor-pointer ${
                isExpanded ? 'bg-[#0D1118]/60 px-4 sm:px-8 rounded-2xl' : 'hover:bg-white/[0.02] px-2 sm:px-4'
              }`}
            >
              {/* Primary Row Summary */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-baseline gap-6 sm:gap-10 transition-transform duration-300 group-hover:translate-x-2 sm:group-hover:translate-x-3">
                  <span
                    className="text-sm sm:text-base font-mono font-medium transition-colors duration-200"
                    style={{ color: isExpanded ? accentColor : '#68717E' }}
                  >
                    {service.number}
                  </span>

                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.035em] text-[#F4F4F2] group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 self-end lg:self-center">
                  <span className="text-xs sm:text-sm text-[#A6ACB8] font-light hidden md:inline-block max-w-md text-right truncate">
                    {service.subtitle}
                  </span>

                  <div
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/40"
                    style={{
                      borderColor: isExpanded ? accentColor : undefined,
                      backgroundColor: isExpanded ? `${accentColor}18` : undefined,
                    }}
                  >
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300"
                      style={{
                        color: isExpanded ? accentColor : '#A6ACB8',
                        transform: isExpanded ? 'translate(2px, -2px)' : 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Expandable Area on Active/Hover State */}
              {isExpanded && (
                <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm sm:text-base text-[#A6ACB8] font-light leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#68717E] block">
                        CORE DELIVERABLES
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#111722] border border-white/10 text-[#F4F4F2]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex items-center justify-end">
                    <div className="relative w-full max-w-xs aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                      <img
                        src={service.previewImage}
                        alt={`${service.title} preview`}
                        loading="lazy"
                        className="w-full h-full object-cover filter contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B11]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 text-[10px] font-mono uppercase text-[#FFA800] tracking-wider">
                        ARTIFACT PREVIEW
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
