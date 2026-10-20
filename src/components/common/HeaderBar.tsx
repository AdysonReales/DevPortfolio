import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, ArrowLeft } from 'lucide-react';
import type { PortfolioScreen } from '../../types';
import { siteConfig } from '../../data/siteConfig';
import { soundEngine } from '../../audio/soundEngine';

interface HeaderBarProps {
  currentScreen: PortfolioScreen;
  onNavigate: (screen: PortfolioScreen) => void;
  onOpenMenu: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenMenu
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(soundEngine.enabled);

  const toggleSound = () => {
    const next = soundEngine.toggle();
    setSoundOn(next);
  };

  const getScreenCode = (screen: PortfolioScreen) => {
    const item = siteConfig.menuItems.find(m => m.id === screen);
    return item ? item.code : '00';
  };

  return (
    <header className="relative z-30 w-full px-4 md:px-10 py-4 flex items-center justify-between border-b-4 border-[#080808] bg-[#F5F5F2] select-none shadow-[0_4px_0_#080808]">
      {/* Brand Identity / Home Button */}
      <div className="flex items-center gap-3">
        {currentScreen !== 'home' && currentScreen !== 'title' && (
          <button
            onClick={() => {
              soundEngine.playCancel();
              onNavigate('home');
            }}
            className="p5-badge-tag black flex items-center gap-1 hover:bg-[#E60012] transition-colors cursor-pointer text-xs"
            title="Return to Dashboard [ESC]"
          >
            <ArrowLeft size={14} />
            <span>BACK</span>
          </button>
        )}

        <button
          onClick={() => {
            soundEngine.playConfirm();
            onNavigate('home');
          }}
          className="flex items-center gap-2 text-left cursor-pointer group"
        >
          <div className="w-8 h-8 bg-[#E60012] text-white flex items-center justify-center font-black text-sm rotate-3 group-hover:rotate-12 transition-transform shadow-[2px_2px_0_#080808]">
            AR
          </div>
          <div className="flex flex-col">
            <span className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#080808] leading-none group-hover:text-[#E60012] transition-colors">
              {siteConfig.name}
            </span>
            <span className="font-mono text-[10px] font-bold text-[#8B8B8B] tracking-widest leading-none">
              INFILTRATION OS // 2026
            </span>
          </div>
        </button>
      </div>

      {/* Screen Identifier Badge */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="p5-badge-tag black text-xs">
          [{getScreenCode(currentScreen)}]
        </span>
        <span className="p5-badge-tag red text-xs font-bold uppercase tracking-wider">
          {currentScreen} SCREEN
        </span>
      </div>

      {/* Quick Actions: Audio Toggle & Full Menu Launcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          className={`p5-badge-tag flex items-center gap-2 px-3 py-1.5 cursor-pointer border-2 border-[#080808] transition-colors ${
            soundOn ? 'bg-[#FFDE00] text-[#080808]' : 'bg-[#080808] text-white hover:bg-[#E60012]'
          }`}
          title={soundOn ? 'Sound FX Enabled' : 'Sound FX Muted'}
          aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
        >
          {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span className="hidden md:inline text-[11px] font-mono">
            {soundOn ? 'SFX: ON' : 'SFX: OFF'}
          </span>
        </button>

        <button
          onClick={() => {
            soundEngine.playTick();
            onOpenMenu();
          }}
          className="p5-btn secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
          aria-label="Open navigation menu"
        >
          <Menu size={16} />
          <span className="font-['Bebas_Neue'] text-lg">MENU</span>
        </button>
      </div>
    </header>
  );
};
