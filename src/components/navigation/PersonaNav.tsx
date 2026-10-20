import React, { useEffect } from 'react';
import type { PortfolioScreen } from '../../types';
import { siteConfig } from '../../data/siteConfig';
import { soundEngine } from '../../audio/soundEngine';

interface PersonaNavProps {
  currentScreen: PortfolioScreen;
  onNavigate: (screen: PortfolioScreen) => void;
  isOpen: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

export const PersonaNav: React.FC<PersonaNavProps> = ({
  currentScreen,
  onNavigate,
  isOpen,
  onClose,
  isFloating = false
}) => {
  // Arrow key navigation when navigation is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = siteConfig.menuItems;
      const currentIndex = items.findIndex(item => item.id === currentScreen);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundEngine.playTick();
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate(items[nextIndex].id as PortfolioScreen);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundEngine.playTick();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate(items[prevIndex].id as PortfolioScreen);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        soundEngine.playCancel();
        if (onClose) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentScreen, onNavigate, onClose]);

  if (!isOpen && isFloating) return null;

  return (
    <nav
      className={`p5-nav-wrapper ${
        isFloating
          ? 'fixed inset-0 z-40 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6'
          : 'relative z-20 flex flex-col items-start gap-3 my-4'
      }`}
      aria-label="Persona 5 Menu"
    >
      {isFloating && (
        <button
          onClick={() => {
            soundEngine.playCancel();
            if (onClose) onClose();
          }}
          className="absolute top-6 right-6 p5-badge-tag black text-base px-4 py-2 border-2 border-white hover:bg-[#E60012] transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          ✕ CLOSE [ESC]
        </button>
      )}

      <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-xl">
        {siteConfig.menuItems.map((item, index) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playConfirm();
                onNavigate(item.id as PortfolioScreen);
                if (onClose && isFloating) onClose();
              }}
              onMouseEnter={() => {
                if (!isActive) soundEngine.playTick();
              }}
              className={`p5-nav-item group text-left ${isActive ? 'active' : ''}`}
              style={{
                transform: `rotate(${item.angle}deg) ${isActive ? 'translateX(24px)' : 'translateX(0)'}`,
                marginLeft: `${(index % 3) * 16}px`
              }}
              tabIndex={0}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Animated Sharp Background Box */}
              <div 
                className="menu-bg" 
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0% 100%)'
                }}
              />

              {/* Triangle Indicator Arrow */}
              <div className="menu-indicator" />

              {/* Content Text with Code number */}
              <div className="menu-text flex items-baseline gap-3 relative z-10">
                <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#FFDE00] opacity-80 group-hover:opacity-100">
                  [{item.code}]
                </span>
                <span className="font-['Bebas_Neue'] text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase">
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
