import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { playTick } from '../utils/audio';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Brand Identity']);
  const [budget, setBudget] = useState('£10k — £25k');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const serviceOptions = [
    'Brand Identity',
    'UI / UX Systems',
    'Editorial Web Design',
    'Motion & 3D Visuals',
    'Art Direction',
    'Packaging Design',
  ];

  const budgetOptions = ['£5k — £10k', '£10k — £25k', '£25k — £50k', '£50k+'];

  const toggleService = (srv: string) => {
    playTick(500, 0.02);
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTick(660, 0.04);
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
      // onClose();
    }, 3000);
  };

  return (
    <div
      id="inquiry-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#080B11]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        id="inquiry-modal-content"
        className="relative w-full max-w-2xl bg-[#0D1118] border border-white/15 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] my-8"
      >
        {/* Close Button */}
        <button
          id="close-inquiry-modal"
          onClick={() => {
            playTick(420, 0.02);
            onClose();
          }}
          aria-label="Close project inquiry dialog"
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-[#A6ACB8] hover:text-[#FFA800] transition-colors"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FFA800]">
                <Sparkles size={12} />
                <span>DIRECT COMMISSION INQUIRY</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#F4F4F2]">
                Start a New <span className="font-serif italic text-[#FFA800]">Collaboration</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#A6ACB8] font-light">
                Tell me about your vision, timeline, and project requirements. Responses are typically returned within 24–48 hours.
              </p>
            </div>

            {/* Service Selection Chips */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#68717E] block">
                SELECT DISCIPLINES
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                        isChecked
                          ? 'bg-[#FFA800] text-[#080B11] font-bold shadow-[0_0_12px_rgba(255,168,0,0.3)]'
                          : 'bg-[#111722] text-[#A6ACB8] hover:text-white border border-white/10'
                      }`}
                    >
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#68717E] block">
                ESTIMATED BUDGET RANGE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => {
                      playTick(520, 0.02);
                      setBudget(b);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center border transition-all ${
                      budget === b
                        ? 'border-[#00FFE0] bg-[#00FFE0]/10 text-[#00FFE0] font-semibold'
                        : 'border-white/10 bg-[#111722] text-[#A6ACB8] hover:border-white/25'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#68717E]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#111722] border border-white/10 text-sm text-[#F4F4F2] placeholder-[#68717E] focus:outline-none focus:border-[#FFA800] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#68717E]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="julian@venture.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#111722] border border-white/10 text-sm text-[#F4F4F2] placeholder-[#68717E] focus:outline-none focus:border-[#FFA800] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-[#68717E]">Company / Venture (Optional)</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Aura Sound Labs / Independent"
                className="w-full px-4 py-3 rounded-xl bg-[#111722] border border-white/10 text-sm text-[#F4F4F2] placeholder-[#68717E] focus:outline-none focus:border-[#FFA800] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-[#68717E]">Project Brief & Scope *</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Outline your objectives, target audience, timeline, and any creative references..."
                className="w-full px-4 py-3 rounded-xl bg-[#111722] border border-white/10 text-sm text-[#F4F4F2] placeholder-[#68717E] focus:outline-none focus:border-[#FFA800] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#FFA800] hover:bg-[#ffb726] text-[#080B11] font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,168,0,0.3)] focus:outline-none"
            >
              <span>TRANSMIT INQUIRY BRIEF</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-medium text-[#F4F4F2]">Inquiry Dispatched</h3>
              <p className="text-sm text-[#A6ACB8] max-w-md mx-auto">
                Thank you, {name}. Your inquiry has been securely queued. Veronica will review the parameters and contact you at {email} within 24–48 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-[#F4F4F2] hover:border-[#FFA800] transition-colors"
            >
              RETURN TO SITE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
