import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleSound, getSoundState, playTick } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  isProjectDetailOpen?: boolean;
  onBackToWork?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
  isProjectDetailOpen,
  onBackToWork,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const state = toggleSound();
    setSoundActive(state);
  };

  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'about', label: 'ABOUT' },
    { id: 'services', label: 'SERVICES' },
    { id: 'playbook', label: 'PLAYBOOK' },
    { id: 'play', label: 'PLAY' },
  ];

  const handleItemClick = (id: string) => {
    playTick(520, 0.02);
    if (isProjectDetailOpen && onBackToWork) {
      onBackToWork();
      setTimeout(() => onNavigate(id), 120);
    } else {
      onNavigate(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080B11]/85 backdrop-blur-md border-b border-white/[0.07] py-4'
            : 'bg-transparent py-6 lg:py-8'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[5vw] flex items-center justify-between">
          {/* Brand / Name */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-button"
              onClick={() => handleItemClick('hero')}
              className="group text-left flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFA800]"
            >
              <div className="flex items-center gap-2">
                <span className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#F4F4F2] group-hover:text-[#FFA800] transition-colors duration-200">
                  VERONICA PW
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0] animate-pulse" />
              </div>
              <span className="text-[10px] tracking-[0.1em] text-[#68717E] uppercase font-medium hidden sm:inline-block">
                Creative Visual Designer
              </span>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-7 lg:gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && !isProjectDetailOpen;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className="relative group py-1 text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 flex items-center gap-1.5 focus:outline-none"
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-[#F4F4F2]'
                        : 'text-[#A6ACB8] group-hover:text-[#FFA800] group-hover:translate-x-0.5'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800] shadow-[0_0_8px_#FFA800]" />
                  )}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[#FFA800] to-[#00FFE0] transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-70'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Audio toggle, Availability & Contact */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Audio Feedback Toggle */}
            <button
              id="audio-toggle-button"
              onClick={handleSoundToggle}
              title={soundActive ? 'Disable ambient sound effects' : 'Enable ambient micro sound'}
              aria-label="Toggle Sound Effects"
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-[#A6ACB8] hover:text-[#00FFE0] transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#00FFE0]"
            >
              {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Availability Pill (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#111722]/50 text-[10px] tracking-[0.08em] text-[#A6ACB8] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Q2/Q3</span>
            </div>

            {/* Contact CTA */}
            <button
              id="nav-contact-button"
              onClick={() => {
                playTick(600, 0.03);
                onOpenContact();
              }}
              className="relative px-4 py-2 rounded-full border border-[#FFA800]/40 hover:border-[#FFA800] bg-[#FFA800]/10 hover:bg-[#FFA800] text-[#FFA800] hover:text-[#080B11] text-[11px] lg:text-[12px] font-bold tracking-[0.14em] uppercase transition-all duration-200 flex items-center gap-1.5 group focus:outline-none shadow-[0_0_15px_rgba(255,168,0,0.12)] hover:shadow-[0_0_20px_rgba(255,168,0,0.3)]"
            >
              <span>CONTACT</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden p-2 rounded-lg border border-white/10 text-[#F4F4F2] hover:text-[#FFA800] hover:border-white/30 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-40 bg-[#080B11]/98 backdrop-blur-2xl flex flex-col justify-between px-6 py-24 md:hidden transition-all duration-300"
        >
          <div className="space-y-6 mt-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#68717E] mb-6">
              Navigation / 2026
            </div>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className="block text-left w-full text-3xl font-light tracking-[-0.03em] text-[#F4F4F2] hover:text-[#FFA800] transition-colors py-2 flex items-center justify-between border-b border-white/[0.07]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-[#68717E]">0{index + 1}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between text-xs tracking-wider text-[#A6ACB8]">
              <span>STATUS</span>
              <span className="text-[#00FFE0] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFE0]" />
                Available Worldwide
              </span>
            </div>
            <button
              id="mobile-start-project-cta"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 rounded-xl bg-[#FFA800] text-[#080B11] font-bold text-sm tracking-[0.14em] uppercase flex items-center justify-center gap-2"
            >
              <span>LET'S MAKE SOMETHING</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
