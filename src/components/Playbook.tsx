import React, { useState } from 'react';
import { PLAYBOOK_STEPS } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export const Playbook: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const handleSelectStep = (idx: number) => {
    playTick(480 + idx * 40, 0.02);
    setSelectedStep(idx);
  };

  return (
    <section
      id="playbook-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0]" />
            <span>04 / METHODOLOGY & WORKING PROCESS</span>
          </div>
          <h2
            id="playbook-heading"
            className="text-[clamp(2.5rem,6.5vw,5.6rem)] font-normal tracking-[-0.05em] leading-[0.95] text-[#F4F4F2]"
          >
            THE <span className="font-serif italic text-[#00FFE0]">PLAYBOOK</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#A6ACB8] max-w-sm font-light leading-relaxed">
          A rigorous 5-phase framework engineered to eliminate guesswork and manifest radical creative clarity.
        </p>
      </div>

      {/* Step Selector Tab Pills */}
      <div className="flex overflow-x-auto gap-3 py-8 no-scrollbar border-b border-white/[0.06]">
        {PLAYBOOK_STEPS.map((step, idx) => {
          const isSelected = selectedStep === idx;
          return (
            <button
              key={step.number}
              id={`playbook-tab-${idx}`}
              onClick={() => handleSelectStep(idx)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 flex items-center gap-2.5 focus:outline-none ${
                isSelected
                  ? 'bg-[#FFA800] text-[#080B11] font-bold shadow-[0_0_15px_rgba(255,168,0,0.3)]'
                  : 'bg-[#0D1118] text-[#A6ACB8] hover:text-[#F4F4F2] border border-white/10 hover:border-white/20'
              }`}
            >
              <span>{step.number}</span>
              <span>—</span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Feature Showcase */}
      {PLAYBOOK_STEPS[selectedStep] && (
        <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-6xl sm:text-8xl font-serif italic text-[#FFA800] font-normal leading-none">
              {PLAYBOOK_STEPS[selectedStep].number}
            </div>
            <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#F4F4F2]">
              {PLAYBOOK_STEPS[selectedStep].title}
            </h3>
            <p className="text-lg sm:text-xl text-[#F4F4F2] font-light leading-snug">
              {PLAYBOOK_STEPS[selectedStep].tagline}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8 p-6 sm:p-10 rounded-[28px] bg-[#0D1118] border border-white/[0.08]">
            <p className="text-sm sm:text-base text-[#A6ACB8] font-light leading-relaxed">
              {PLAYBOOK_STEPS[selectedStep].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-white/[0.06]">
              {/* Key Methods */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFA800] block">
                  KEY ACTIVITIES & METHODS
                </span>
                <ul className="space-y-2 text-xs font-mono text-[#F4F4F2]">
                  {PLAYBOOK_STEPS[selectedStep].methods.map((method, mIdx) => (
                    <li key={mIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#FFA800]" />
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tangible Deliverables */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#00FFE0] block">
                  PHASE OUTPUT DELIVERABLES
                </span>
                <ul className="space-y-2 text-xs font-mono text-[#A6ACB8]">
                  {PLAYBOOK_STEPS[selectedStep].deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00FFE0]" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
