import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Globe, Sparkles } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { playTick } from '../utils/audio';

interface ContactProps {
  onOpenInquiry: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenInquiry }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    playTick(640, 0.03);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact-section"
      className="py-24 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08]"
    >
      {/* Editorial Header */}
      <div className="flex items-center gap-3 text-[#68717E] text-[11px] font-mono uppercase tracking-[0.18em] pb-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
        <span>07 / ENGAGEMENT & INQUIRIES</span>
      </div>

      {/* Massive Typographic Headline */}
      <div className="pb-16 sm:pb-24">
        <h2
          id="contact-huge-heading"
          className="text-[clamp(3.2rem,10.2vw,9.6rem)] font-normal tracking-[-0.055em] leading-[0.9] text-[#F4F4F2]"
        >
          LET'S <br />
          MAKE <br />
          <span className="font-serif italic text-[#FFA800] drop-shadow-[0_0_30px_rgba(255,168,0,0.25)]">
            SOMETHING.
          </span>
        </h2>
      </div>

      {/* Interactive CTA & Direct Channel Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        {/* Left Column: Large CTA Card */}
        <div className="lg:col-span-7 space-y-8">
          <button
            id="start-a-project-cta"
            onClick={() => {
              playTick(600, 0.03);
              onOpenInquiry();
            }}
            data-cursor="pointer"
            className="group w-full text-left p-8 sm:p-12 rounded-[28px] sm:rounded-[36px] bg-[#0D1118] border border-white/10 hover:border-[#FFA800] hover:bg-[#111722] transition-all duration-400 relative overflow-hidden focus:outline-none shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00FFE0]">
                  <Sparkles size={14} />
                  <span>COMMISSION RESERVATIONS</span>
                </div>
                <div className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors">
                  START A PROJECT →
                </div>
                <p className="text-xs sm:text-sm text-[#A6ACB8] font-light max-w-md">
                  Initiate our direct onboarding flow to outline scope, timelines, and tailored deliverables.
                </p>
              </div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/15 group-hover:border-[#FFA800] group-hover:bg-[#FFA800] flex items-center justify-center transition-all duration-300 flex-shrink-0">
                <ArrowUpRight
                  size={24}
                  className="text-[#F4F4F2] group-hover:text-[#080B11] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </button>

          {/* Quick Email Copy Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D1118] border border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#111722] border border-white/10 flex items-center justify-center text-[#FFA800]">
                <Mail size={16} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#68717E]">
                  DIRECT DISPATCH
                </div>
                <div className="text-sm font-medium text-[#F4F4F2] select-all">
                  {DESIGNER_INFO.email}
                </div>
              </div>
            </div>

            <button
              id="copy-email-button"
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-xl bg-[#111722] hover:bg-[#FFA800] text-xs font-mono uppercase tracking-wider text-[#A6ACB8] hover:text-[#080B11] border border-white/10 hover:border-[#FFA800] transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span>ADDRESS COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Social Links & Availability Pill */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#0D1118] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#68717E] uppercase">
              <span>ONLINE ARCHIVES</span>
              <span className="text-[#00FFE0]">NETWORK</span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {DESIGNER_INFO.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`social-link-${social.name.toLowerCase()}`}
                  className="py-3.5 flex items-center justify-between text-sm font-medium text-[#A6ACB8] hover:text-[#FFA800] transition-colors group"
                >
                  <span className="tracking-wide">{social.name}</span>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#68717E] group-hover:text-[#FFA800]">
                    <span>{social.handle}</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00FFE0] animate-ping" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#A6ACB8]">
                {DESIGNER_INFO.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
