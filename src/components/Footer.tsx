import React, { useEffect, useState } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { playTick } from '../utils/audio';

export const Footer: React.FC = () => {
  const [londonTime, setLondonTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in London timezone
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLondonTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    playTick(500, 0.02);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="py-12 px-5 sm:px-8 lg:px-[5vw] max-w-[1440px] mx-auto border-t border-white/[0.08] text-[11px] font-mono uppercase tracking-[0.14em] text-[#68717E]"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Copyright */}
        <div className="flex items-center gap-3">
          <span className="text-[#F4F4F2] font-semibold">© 2026 {DESIGNER_INFO.name}</span>
          <span className="text-white/20">•</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

        {/* Center: Live London Time & Colophon */}
        <div className="flex items-center gap-4 text-[#A6ACB8]">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#FFA800]" />
            <span>LONDON GMT {londonTime}</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="hidden sm:inline">DARK EDITORIAL CRAFT</span>
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center gap-4">
          <button
            id="back-to-top-button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[#A6ACB8] hover:text-[#FFA800] transition-colors focus:outline-none"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full border border-white/10 group-hover:border-[#FFA800] flex items-center justify-center transition-colors group-hover:-translate-y-0.5">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
