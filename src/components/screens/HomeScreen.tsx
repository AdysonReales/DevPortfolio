import React from 'react';
import { ArrowRight, Gamepad2, Wrench, User, Send } from 'lucide-react';
import type { PortfolioScreen } from '../../types';
import { siteConfig } from '../../data/siteConfig';
import { projectsData } from '../../data/projects';
import { soundEngine } from '../../audio/soundEngine';

interface HomeScreenProps {
  onNavigate: (screen: PortfolioScreen) => void;
  onOpenProject: (projectId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenProject }) => {
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-70px)] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="p5-badge-tag black text-xs">STATUS: ONLINE</span>
          <span className="p5-badge-tag yellow text-xs font-bold">READY TO INFILTRATE</span>
        </div>
        <div className="font-mono text-xs font-bold text-[#8B8B8B] tracking-wider hidden sm:block">
          LOCATION: {siteConfig.location} // {siteConfig.affiliation}
        </div>
      </div>

      {/* Main Grid: Headline & Actions on Left, Featured Mission Target on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Col: Aggressive Headline & Quick Navigation Actions */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-block">
            <span className="p5-cutout-word alt text-white font-['Bebas_Neue'] text-lg tracking-widest">
              MISSION OBJECTIVE
            </span>
          </div>

          <div className="flex flex-col leading-[0.88] select-none">
            <h1 className="p5-title-giant text-[#080808] drop-shadow-[5px_5px_0_#E60012]">
              FULL-STACK SYSTEMS.
            </h1>
            <h1 className="p5-title-giant text-[#080808] drop-shadow-[5px_5px_0_#FFFFFF]">
              PLAYABLE WORLDS.
            </h1>
            <h1 className="p5-title-giant text-[#E60012] drop-shadow-[5px_5px_0_#080808]">
              TOOLS WITH PURPOSE.
            </h1>
          </div>

          <p className="max-w-xl text-lg font-medium text-[#080808] border-l-4 border-[#E60012] pl-4 py-1 bg-white/60 backdrop-blur-xs">
            {siteConfig.bio[0]} {siteConfig.bio[1]}
          </p>

          {/* Action Callouts */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() => {
                soundEngine.playConfirm();
                onNavigate('projects');
              }}
              className="p5-btn primary flex items-center gap-3 text-lg"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => {
                soundEngine.playConfirm();
                onNavigate('games');
              }}
              className="p5-btn secondary flex items-center gap-2 text-lg"
            >
              <Gamepad2 size={18} />
              <span>EXPLORE GAMES</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playConfirm();
                onNavigate('tools');
              }}
              className="p5-btn flex items-center gap-2 text-lg bg-[#080808] text-white hover:bg-[#E60012]"
            >
              <Wrench size={18} />
              <span>OPEN TOOLS</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playConfirm();
                onNavigate('about');
              }}
              className="p5-btn secondary flex items-center gap-2 text-lg"
            >
              <User size={18} />
              <span>VIEW DOSSIER</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playConfirm();
                onNavigate('contact');
              }}
              className="p5-btn flex items-center gap-2 text-lg bg-[#080808] text-white hover:bg-[#E60012]"
            >
              <Send size={18} />
              <span>SEND CALLING CARD</span>
            </button>
          </div>
        </div>

        {/* Right Col: Prominent Featured Target Card with Persona Graphic Flares */}
        <div className="lg:col-span-5 flex flex-col items-stretch">
          <div className="relative">
            {/* Top Tape Sticker */}
            <div className="absolute -top-3 left-6 z-20">
              <span className="p5-badge-tag yellow text-xs font-black shadow-[3px_3px_0_#080808]">
                ★ TOP PRIORITY TARGET ★
              </span>
            </div>

            {/* Featured Project Panel */}
            <div 
              className="p5-card dark p-6 sm:p-8 flex flex-col gap-4 relative overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)'
              }}
            >
              {/* Internal Halftone */}
              <div className="absolute inset-0 p5-halftone-pattern dark opacity-30 pointer-events-none" />

              <div className="flex items-center justify-between border-b-2 border-white/20 pb-3 relative z-10">
                <span className="font-mono text-xs text-[#FFDE00] font-bold tracking-widest">
                  [{featuredProject.number}]
                </span>
                <span className="p5-badge-tag red text-[11px]">
                  {featuredProject.category}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide leading-none">
                  {featuredProject.title}
                </h3>
                <p className="font-mono text-xs text-[#E1E1DC] mt-1 tracking-wider uppercase">
                  {featuredProject.tagline}
                </p>
              </div>

              <p className="text-sm text-[#C0C0BA] line-clamp-3 relative z-10">
                {featuredProject.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {featuredProject.techStack.map(tech => (
                  <span
                    key={tech}
                    className="p5-badge-tag white text-[10px] py-0.5 px-2 font-mono font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Inspect Button */}
              <button
                onClick={() => {
                  soundEngine.playConfirm();
                  onOpenProject(featuredProject.id);
                }}
                className="mt-2 p5-btn primary w-full text-base py-3 flex items-center justify-center gap-2 cursor-pointer relative z-10"
              >
                <span>OPEN TARGET DOSSIER</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Stats Grid Underneath */}
          <div className="grid grid-cols-3 gap-2 mt-4 select-none">
            <div className="p-3 bg-[#080808] text-white border-2 border-white/30 text-center transform -rotate-1">
              <div className="font-mono text-[10px] text-[#FFDE00] tracking-widest">FOCUS</div>
              <div className="font-['Bebas_Neue'] text-xl leading-none mt-1">FULL STACK</div>
            </div>
            <div className="p-3 bg-[#E60012] text-white border-2 border-[#080808] text-center transform rotate-1">
              <div className="font-mono text-[10px] text-white tracking-widest">GAMES</div>
              <div className="font-['Bebas_Neue'] text-xl leading-none mt-1">2 BUILDS</div>
            </div>
            <div className="p-3 bg-white text-[#080808] border-2 border-[#080808] text-center transform -rotate-1 shadow-[3px_3px_0_#080808]">
              <div className="font-mono text-[10px] text-[#080808] font-bold tracking-widest">TOOLS</div>
              <div className="font-['Bebas_Neue'] text-xl leading-none mt-1">3 SLOTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker Bar */}
      <div className="mt-8 pt-4 border-t-2 border-[#080808]/20 flex flex-wrap items-center justify-between text-xs font-mono font-bold text-[#080808]">
        <div className="flex items-center gap-4">
          <span>NAVIGATION: [CLICK MENU] OR [KEYBOARD ARROWS]</span>
          <span className="hidden md:inline text-[#E60012]">●</span>
          <span className="hidden md:inline">SYSTEM: PHANTOM_ARCHITECT_V2</span>
        </div>
        <div className="text-right">
          ADYSON REALES // ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </div>
  );
};
