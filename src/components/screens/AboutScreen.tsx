import React from 'react';
import { GraduationCap, Code2, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const AboutScreen: React.FC = () => {
  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-70px)] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="p5-badge-tag black text-xs">DOSSIER FILE // 03</span>
          <span className="p5-badge-tag red text-xs font-bold">OPERATIVE PROFILE</span>
        </div>
        <div className="font-mono text-xs font-bold text-[#080808]/70 tracking-widest hidden sm:block">
          CLEARANCE: LEVEL 04 // PHANTOM SYSTEM
        </div>
      </div>

      {/* Main Asymmetrical Character Dossier Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Col: Stylized Operative Silhouette & RPG Persona Stats Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-md">
            {/* Background Red Graphic Shard */}
            <div 
              className="absolute -inset-4 bg-[#E60012] -rotate-3 z-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)'
              }}
            />

            {/* Profile Frame */}
            <div className="relative z-10 bg-[#080808] text-white p-6 sm:p-8 border-4 border-white shadow-[10px_10px_0_#080808] overflow-hidden">
              <div className="absolute inset-0 p5-halftone-pattern dark opacity-40 pointer-events-none" />

              {/* Graphic Persona Mask / Character Symbol */}
              <div className="flex flex-col items-center text-center pb-6 border-b-2 border-white/20">
                <div className="relative w-28 h-28 mb-4">
                  <div className="absolute inset-0 bg-[#E60012] rotate-45 flex items-center justify-center shadow-[4px_4px_0_#FFFFFF]">
                    <span className="font-['Bebas_Neue'] text-5xl text-white -rotate-45 font-black">
                      AR
                    </span>
                  </div>
                  {/* Decorative P5 Star */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 text-[#FFDE00]">
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" />
                    </svg>
                  </div>
                </div>

                <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider leading-none mt-2">
                  {siteConfig.name}
                </h2>
                <span className="font-mono text-xs text-[#FFDE00] font-bold tracking-widest uppercase mt-1">
                  CALLSIGN: {siteConfig.alias} // {siteConfig.callsign}
                </span>
              </div>

              {/* RPG Character Attribute Table */}
              <div className="flex flex-col gap-3 pt-6 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#8B8B8B] font-bold">CLASS:</span>
                  <span className="text-white font-bold bg-[#E60012] px-2 py-0.5">
                    SOFTWARE DEVELOPER
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#8B8B8B] font-bold">ARCANA:</span>
                  <span className="text-[#FFDE00] font-black">THE CHARIOT</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#8B8B8B] font-bold">ACADEMIC BASE:</span>
                  <span className="text-white font-semibold">MAPÚA UNIVERSITY</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#8B8B8B] font-bold">DEGREE / TRACK:</span>
                  <span className="text-white font-semibold">B.S. COMPUTER SCIENCE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8B8B8B] font-bold">SPECIALIZATION:</span>
                  <span className="text-[#E60012] font-black bg-white px-2 py-0.5">
                    APPLICATION DEVELOPMENT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Biography, Engineering Philosophy & Education */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Statement Box */}
          <div className="p5-card bg-[#F5F5F2] p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="p5-badge-tag black text-xs font-bold">
                OPERATIVE PHILOSOPHY
              </span>
            </div>

            <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-[#080808] leading-tight tracking-wide mb-3">
              "WHERE RIGOROUS SYSTEM ARCHITECTURE MEETS KINETIC ARTISTRY."
            </h3>

            <div className="flex flex-col gap-3 text-base text-[#080808] font-medium leading-relaxed">
              <p>
                I am a Computer Science student at Mapúa University dedicated to constructing performant, scalable applications and visceral digital worlds.
              </p>
              <p>
                My work exists right at the boundary between software engineering and creative technology. Whether building full-stack web applications, engineering game mechanics and audio-visual sync in Unity, or automating tooling pipelines between Figma and game engines, I prioritize crisp responsiveness, intentional aesthetics, and robust code.
              </p>
            </div>
          </div>

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#080808] text-white border-2 border-white/20 shadow-[4px_4px_0_#E60012]">
              <div className="flex items-center gap-2 text-[#FFDE00] font-['Bebas_Neue'] text-xl mb-1">
                <Code2 size={20} />
                <span>SYSTEM ENGINEERING</span>
              </div>
              <p className="text-xs text-[#C0C0BA] leading-relaxed">
                Clean state architectures, robust type systems with TypeScript and C#, optimized algorithms, and reliable database designs.
              </p>
            </div>

            <div className="p-5 bg-[#E60012] text-white border-2 border-[#080808] shadow-[4px_4px_0_#080808]">
              <div className="flex items-center gap-2 text-white font-['Bebas_Neue'] text-xl mb-1">
                <Sparkles size={20} />
                <span>GAME & CREATIVE TECH</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                Physics mechanics, audio-reactive inputs, narrative branching in Ren'Py, and custom vector-to-engine UI tooling pipelines.
              </p>
            </div>
          </div>

          {/* Education Highlight Card */}
          <div className="p-4 bg-white border-2 border-[#080808] flex items-center justify-between shadow-[4px_4px_0_#080808]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#080808] text-white flex items-center justify-center">
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="font-['Bebas_Neue'] text-xl text-[#080808] leading-none">
                  MAPÚA UNIVERSITY
                </div>
                <div className="font-mono text-xs text-[#8B8B8B] font-bold">
                  B.S. in Computer Science — Application Development Specialization
                </div>
              </div>
            </div>
            <span className="p5-badge-tag yellow text-xs font-bold hidden sm:inline">
              UNDERGRADUATE
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t-2 border-[#080808]/20 flex items-center justify-between text-xs font-mono font-bold text-[#080808]">
        <span>ALL DOSSIER RECORDS MAINTAINED HONESTLY FROM GITHUB</span>
        <span>A. REALES // PORTFOLIO SYSTEM</span>
      </div>
    </div>
  );
};
