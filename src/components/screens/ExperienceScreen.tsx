import React, { useState } from 'react';
import { Building, ChevronRight, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../../data/experience';
import type { ExperienceItem } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

export const ExperienceScreen: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem>(experienceData[0]);

  const getTypeBadge = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'ACADEMIC':
        return 'bg-[#FFDE00] text-[#080808]';
      case 'GAME JAM':
        return 'bg-[#E60012] text-white';
      case 'SYSTEM ARCHITECTURE':
        return 'bg-white text-[#080808]';
      case 'RESEARCH':
        return 'bg-[#FFDE00] text-[#080808]';
      default:
        return 'bg-[#8B8B8B] text-white';
    }
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-70px)] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="p5-badge-tag yellow text-xs font-black">
            MISSION LOG // 05
          </span>
          <h1 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider leading-none drop-shadow-[3px_3px_0_#080808]">
            CHRONOLOGICAL INFILTRATION ARCHIVE
          </h1>
        </div>
        <div className="font-mono text-xs text-white/70 font-bold tracking-widest hidden sm:block">
          RECORDS LOGGED: [0{experienceData.length}] // TIMELINE ACTIVE
        </div>
      </div>

      {/* Main Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Interactive Angular Timeline Nodes */}
        <div className="lg:col-span-5 flex flex-col gap-4 relative">
          {/* Vertical Connecting Accent Line */}
          <div className="absolute top-4 bottom-4 left-6 w-1 bg-[#E60012] -z-10 hidden sm:block opacity-60" />

          {experienceData.map((exp, idx) => {
            const isSelected = selectedExp.id === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  soundEngine.playConfirm();
                  setSelectedExp(exp);
                }}
                onMouseEnter={() => {
                  if (!isSelected) {
                    soundEngine.playTick();
                    setSelectedExp(exp);
                  }
                }}
                className={`relative group text-left p-4 sm:p-5 flex items-start gap-4 transition-all duration-150 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-[#E60012] border-white text-white translate-x-4 shadow-[8px_8px_0_#080808]'
                    : 'bg-[#080808]/90 border-white/20 text-white hover:border-[#FFDE00] hover:translate-x-2'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0% 100%)',
                  transform: `rotate(${idx % 2 === 0 ? -1 : 1.2}deg) ${
                    isSelected ? 'translateX(16px)' : ''
                  }`
                }}
              >
                {/* Node Number */}
                <div
                  className={`w-10 h-10 flex-shrink-0 flex items-center justify-center font-['Bebas_Neue'] text-2xl font-black ${
                    isSelected
                      ? 'bg-white text-[#E60012]'
                      : 'bg-[#141414] text-[#FFDE00] border border-white/20'
                  }`}
                  style={{ transform: 'rotate(-4deg)' }}
                >
                  0{idx + 1}
                </div>

                {/* Content info */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-black px-2 py-0.5 tracking-wider uppercase ${getTypeBadge(
                        exp.type
                      )}`}
                    >
                      {exp.type}
                    </span>
                    <span className="font-mono text-[11px] text-[#C0C0BA] font-bold">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs text-white/80 mt-1">
                    {exp.organization}
                  </p>
                </div>

                <ChevronRight
                  size={20}
                  className={`self-center transition-transform ${
                    isSelected ? 'translate-x-1 text-white' : 'text-white/30'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Expanded Infiltration Dossier */}
        <div className="lg:col-span-7 flex flex-col items-stretch">
          <div 
            className="p5-card bg-[#F5F5F2] text-[#080808] p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0% 100%)'
            }}
          >
            {/* Background Halftone & Giant Code */}
            <div className="absolute inset-0 p5-halftone-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-2 right-4 font-['Bebas_Neue'] text-8xl text-black/[0.06] font-black leading-none pointer-events-none select-none">
              {selectedExp.code.split(' ')[1] || '01'}
            </div>

            {/* Infiltration Header */}
            <div className="relative z-10 border-b-3 border-[#080808] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="p5-badge-tag black text-xs">
                  {selectedExp.code}
                </span>
                <span className={`p5-badge-tag text-xs font-black ${getTypeBadge(selectedExp.type)}`}>
                  {selectedExp.type}
                </span>
                <span className="p5-badge-tag white border border-[#080808] text-xs font-mono font-bold">
                  {selectedExp.period}
                </span>
              </div>

              <h2 className="font-['Bebas_Neue'] text-3xl sm:text-5xl text-[#080808] leading-tight tracking-wide">
                {selectedExp.role}
              </h2>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#E60012] mt-1 tracking-wider uppercase">
                <Building size={16} />
                <span>{selectedExp.organization}</span>
              </div>
            </div>

            {/* Operational Highlights */}
            <div className="relative z-10">
              <h4 className="font-mono text-xs font-bold tracking-widest text-[#8B8B8B] uppercase mb-3">
                MISSION OUTCOMES & RESPONSIBILITIES:
              </h4>
              <ul className="flex flex-col gap-3">
                {selectedExp.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-white border-l-4 border-[#080808] text-sm font-medium leading-relaxed flex items-start gap-3 shadow-[2px_2px_0_rgba(0,0,0,0.06)]"
                  >
                    <CheckCircle2 size={18} className="text-[#E60012] flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipped Technologies */}
            <div className="relative z-10 pt-2">
              <h4 className="font-mono text-xs font-bold tracking-widest text-[#8B8B8B] uppercase mb-2">
                DEPLOYED TOOLS & TECH:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp.techStack.map(tech => (
                  <span
                    key={tech}
                    className="p5-badge-tag black text-xs px-3 py-1 font-mono font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t-2 border-white/20 flex items-center justify-between text-xs font-mono font-bold text-white/70">
        <span>VERIFIED TIMELINE OF ACADEMIC & INDEPENDENT MILESTONES</span>
        <span>A. REALES // ARCHIVE SYSTEM</span>
      </div>
    </div>
  );
};
