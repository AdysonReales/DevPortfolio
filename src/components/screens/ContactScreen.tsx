import React, { useState } from 'react';
import { Mail, ExternalLink, Copy, Check, Send, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';
import { siteConfig } from '../../data/siteConfig';
import { soundEngine } from '../../audio/soundEngine';

export const ContactScreen: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.socials.email);
    soundEngine.playConfirm();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      soundEngine.playCancel();
      alert('Please fill out all operative fields before transmitting!');
      return;
    }

    soundEngine.playConfirm();
    // Honest mailto delivery as required by specification
    const subject = encodeURIComponent(`[CALLING CARD // INQUIRY] From ${formState.name}: ${formState.subject || 'Collaboration'}`);
    const body = encodeURIComponent(
      `Operative Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${siteConfig.socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-70px)] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="p5-badge-tag black text-xs font-black">
            TARGET DESTINATION // 06
          </span>
          <span className="p5-badge-tag yellow text-xs font-black">
            CALLING CARD TRANSMISSION
          </span>
        </div>
        <div className="font-mono text-xs text-white/90 font-bold tracking-widest hidden sm:block">
          STATUS: READY FOR DISPATCH // SECURE LINE
        </div>
      </div>

      {/* Main Grid: Calling Card Banner on Left, Transmission Console on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Bold Graphic Headline & Social Coordinates */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <div className="inline-block">
            <span className="p5-cutout-word black text-white font-['Bebas_Neue'] text-xl tracking-widest">
              ★ OFFICIAL CALLING CARD ★
            </span>
          </div>

          <div className="flex flex-col leading-[0.88] select-none">
            <h1 className="p5-title-giant text-white drop-shadow-[6px_6px_0_#080808]">
              LET'S BUILD
            </h1>
            <h1 className="p5-title-giant text-[#080808] drop-shadow-[6px_6px_0_#FFFFFF]">
              SOMETHING.
            </h1>
          </div>

          <p className="max-w-lg text-lg font-bold text-white bg-black/60 backdrop-blur-xs border-l-4 border-[#FFDE00] pl-4 py-2">
            Interested in engineering an application, collaborating on game mechanics, or discussing a role? Transmit your signal directly.
          </p>

          {/* Direct Verified Links */}
          <div className="flex flex-col gap-3 w-full max-w-md">
            <button
              onClick={handleCopyEmail}
              className="p5-card bg-white text-[#080808] p-4 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#E60012]" />
                <span className="font-mono text-sm font-bold">
                  {siteConfig.socials.email}
                </span>
              </div>
              <span className="p5-badge-tag black text-[11px] group-hover:bg-[#E60012] transition-colors">
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'COPIED!' : 'COPY'}</span>
              </span>
            </button>

            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p5-card dark p-4 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon size={20} className="text-[#FFDE00]" />
                <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">
                  GITHUB // @AdysonReales
                </span>
              </div>
              <ExternalLink size={18} className="text-white/60 group-hover:text-white" />
            </a>

            <a
              href={siteConfig.socials.itch}
              target="_blank"
              rel="noreferrer"
              className="p5-card bg-[#080808] text-white border-2 border-white p-4 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={20} className="text-[#E60012]" />
                <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">
                  ITCH.IO // @ssukimaru
                </span>
              </div>
              <ExternalLink size={18} className="text-white/60 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Right Column: Calling Card Dispatch Console */}
        <div className="lg:col-span-6 flex flex-col items-stretch">
          <form
            onSubmit={handleTransmit}
            className="p5-card bg-[#080808] text-white p-6 sm:p-8 flex flex-col gap-4 border-4 border-white shadow-[12px_12px_0_#080808] relative overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0% 100%)'
            }}
          >
            {/* Halftone Overlay */}
            <div className="absolute inset-0 p5-halftone-pattern dark opacity-30 pointer-events-none" />

            <div className="border-b-2 border-white/20 pb-3 relative z-10 flex items-center justify-between">
              <div>
                <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide">
                  DISPATCH CONSOLE
                </h3>
                <span className="font-mono text-xs text-[#FFDE00] font-bold tracking-wider uppercase">
                  TRANSMIT TO: {siteConfig.name}
                </span>
              </div>
              <span className="p5-badge-tag red text-xs font-bold">
                ENCRYPTED
              </span>
            </div>

            <div className="flex flex-col gap-1 relative z-10">
              <label className="font-mono text-xs font-bold text-[#E1E1DC] tracking-wider uppercase">
                YOUR CODENAME / NAME *
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. Akira Kurusu / Phantom Recruit"
                className="w-full bg-[#141414] border-2 border-white/30 text-white font-mono text-sm px-4 py-2.5 focus:border-[#FFDE00] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1 relative z-10">
              <label className="font-mono text-xs font-bold text-[#E1E1DC] tracking-wider uppercase">
                YOUR FREQUENCY / EMAIL *
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                placeholder="operative@domain.com"
                className="w-full bg-[#141414] border-2 border-white/30 text-white font-mono text-sm px-4 py-2.5 focus:border-[#FFDE00] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1 relative z-10">
              <label className="font-mono text-xs font-bold text-[#E1E1DC] tracking-wider uppercase">
                OPERATION OBJECTIVE / SUBJECT
              </label>
              <input
                type="text"
                value={formState.subject}
                onChange={e => setFormState({ ...formState, subject: e.target.value })}
                placeholder="Project Collaboration / Opportunity"
                className="w-full bg-[#141414] border-2 border-white/30 text-white font-mono text-sm px-4 py-2.5 focus:border-[#FFDE00] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1 relative z-10">
              <label className="font-mono text-xs font-bold text-[#E1E1DC] tracking-wider uppercase">
                TRANSMISSION MESSAGE *
              </label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                placeholder="State your proposition, project goals, or questions..."
                className="w-full bg-[#141414] border-2 border-white/30 text-white font-mono text-sm p-4 focus:border-[#FFDE00] focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="p5-btn primary w-full py-4 text-xl flex items-center justify-center gap-2 cursor-pointer mt-2 relative z-10"
            >
              <Send size={20} />
              <span>TRANSMIT CALLING CARD</span>
            </button>

            <span className="font-mono text-[10px] text-white/50 text-center uppercase tracking-wider relative z-10">
              Direct connection via mail client protocol. No fake submission screens.
            </span>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t-2 border-white/30 flex items-center justify-between text-xs font-mono font-bold text-white">
        <span>TAKE YOUR HEART // CALLING CARD TRANSMITTED</span>
        <span>A. REALES // 2026</span>
      </div>
    </div>
  );
};
