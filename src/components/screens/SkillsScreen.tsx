import React, { useState } from 'react';
import { skillsData } from '../../data/skills';
import type { SkillCategory } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

export const SkillsScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(skillsData[0]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'MASTER':
        return 'bg-[#E60012] text-white border-[#E60012]';
      case 'SPECIALIST':
        return 'bg-[#FFDE00] text-[#080808] border-[#FFDE00] font-black';
      case 'PROFICIENT':
        return 'bg-white text-[#080808] border-white font-bold';
      default:
        return 'bg-[#8B8B8B] text-white border-[#8B8B8B]';
    }
  };

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-70px)] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="p5-badge-tag yellow text-xs font-black">
            STATUS ARSENAL // 04
          </span>
          <h1 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider leading-none drop-shadow-[3px_3px_0_#080808]">
            THE ARMORY // COMBAT CAPABILITIES
          </h1>
        </div>
        <div className="font-mono text-xs text-white/70 font-bold tracking-widest hidden sm:block">
          SKILL CATEGORIES: [0{skillsData.length}] // NO FAKE PERCENTAGES
        </div>
      </div>

      {/* Main Armory Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Category Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {skillsData.map((cat, idx) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playConfirm();
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => {
                  if (!isSelected) {
                    soundEngine.playTick();
                    setActiveCategory(cat);
                  }
                }}
                className={`relative group text-left p-4 sm:p-5 flex items-center justify-between transition-all duration-150 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-[#E60012] border-white text-white translate-x-4 shadow-[8px_8px_0_#080808]'
                    : 'bg-[#080808]/90 border-white/20 text-white hover:border-[#FFDE00] hover:translate-x-2'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0% 100%)',
                  transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg) ${
                    isSelected ? 'translateX(16px)' : ''
                  }`
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-black tracking-widest ${
                      isSelected ? 'text-[#FFDE00]' : 'text-[#8B8B8B]'
                    }`}
                  >
                    [{cat.rank}]
                  </span>
                  <div>
                    <h3 className="font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-wide leading-none">
                      {cat.title}
                    </h3>
                    <p className="font-mono text-[10px] text-white/70 font-bold uppercase mt-1">
                      {cat.sub}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-3 h-3 bg-[#FFDE00] rotate-45 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Skill Arsenal Display */}
        <div className="lg:col-span-8 flex flex-col items-stretch">
          <div 
            className="p5-card bg-[#080808] text-white p-6 sm:p-8 flex flex-col gap-6 relative border-4 border-white shadow-[10px_10px_0_#E60012] overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0% 100%)'
            }}
          >
            {/* Background Halftone */}
            <div className="absolute inset-0 p5-halftone-pattern dark opacity-30 pointer-events-none" />

            {/* Category Header */}
            <div className="relative z-10 border-b-2 border-white/20 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="p5-badge-tag red text-xs font-bold">
                  {activeCategory.rank}
                </span>
                <span className="p5-badge-tag yellow text-xs font-black">
                  ACTIVE WEAPON TREE
                </span>
              </div>
              <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl text-white leading-none tracking-wide">
                {activeCategory.title}
              </h2>
              <p className="font-mono text-xs text-[#FFDE00] font-bold tracking-wider uppercase mt-1">
                {activeCategory.sub}
              </p>
              <p className="text-sm text-[#C0C0BA] font-medium mt-3 max-w-2xl leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* Skills List with Tier Badges & Context */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCategory.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="p-4 bg-[#141414] border-2 border-white/20 hover:border-[#E60012] transition-colors shadow-[4px_4px_0_rgba(0,0,0,0.5)] flex flex-col justify-between"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? -0.8 : 0.8}deg)`
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 tracking-widest uppercase border ${getTierColor(
                        skill.tier
                      )}`}
                    >
                      {skill.tier}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-[#8B8B8B] leading-relaxed">
                    {skill.context}
                  </p>
                </div>
              ))}
            </div>

            {/* Tier Legend */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="text-[#8B8B8B] font-bold">TIER CLASSIFICATIONS:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#E60012]" />
                <span className="text-white">MASTER (Production Core)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#FFDE00]" />
                <span className="text-white">SPECIALIST (High Competency)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-white" />
                <span className="text-white">PROFICIENT (Operational)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t-2 border-white/20 flex items-center justify-between text-xs font-mono font-bold text-white/70">
        <span>AUTHENTIC SKILLS RECORDED DIRECTLY FROM ACTIVE REPOSITORIES</span>
        <span>STATUS: COMBAT READY</span>
      </div>
    </div>
  );
};
