import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { PortfolioScreen } from '../../types';
import { soundEngine } from '../../audio/soundEngine';
import { PhantomCutout } from '../graphics/PhantomCutout';

interface TitleScreenProps {
  onStart: (target?: PortfolioScreen) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLHeadingElement>(null);
  const name2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const systemTagsRef = useRef<HTMLDivElement>(null);

  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const menuItems = [
    { id: 'home', label: 'START // DASHBOARD', code: '01' },
    { id: 'projects', label: 'MISSIONS // PROJECTS', code: '02' },
    { id: 'about', label: 'DOSSIER // ABOUT ME', code: '03' },
    { id: 'skills', label: 'THE ARMORY // TECH', code: '04' },
    { id: 'experience', label: 'INFILTRATIONS // EXP', code: '05' },
    { id: 'contact', label: 'CALLING CARD // CONTACT', code: '06' },
  ];

  // GSAP Cinematic Opening Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationFinished(true);
        }
      });
      timelineRef.current = tl;

      // Phase 1: White viewport -> Massive irregular black shape sweeping diagonally
      tl.set(containerRef.current, { opacity: 1 })
        .fromTo(
          silhouetteRef.current,
          { xPercent: 120, yPercent: -40, opacity: 0 },
          { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }
        )
        // Phase 2: Graphic formation & Staggered Oversized Typography
        .fromTo(
          name1Ref.current,
          { x: -160, opacity: 0, skewX: -15 },
          { x: 0, opacity: 1, skewX: -6, duration: 0.55, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          name2Ref.current,
          { x: -180, opacity: 0, skewX: -18 },
          { x: 0, opacity: 1, skewX: -6, duration: 0.55, ease: 'power3.out' },
          '-=0.4'
        )
        // Supporting typography and system tags
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.25'
        )
        .fromTo(
          systemTagsRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4 },
          '-=0.2'
        )
        // Phase 3 & 4: Title reveal and interactive menu
        .fromTo(
          menuRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.15'
        )
        .fromTo(
          promptRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation on Title Screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Skip animation if still playing
        if (timelineRef.current && !timelineRef.current.progress()) {
          timelineRef.current.progress(1);
          setAnimationFinished(true);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundEngine.playTick();
        setSelectedIdx(prev => (prev + 1) % menuItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundEngine.playTick();
        setSelectedIdx(prev => (prev - 1 + menuItems.length) % menuItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        soundEngine.playConfirm();
        const target = menuItems[selectedIdx].id as PortfolioScreen;
        onStart(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, menuItems, onStart]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
      setAnimationFinished(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F5F5F2] text-[#080808] flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
    >
      {/* Halftone Texture Overlay */}
      <div className="absolute inset-0 p5-halftone-pattern opacity-80 pointer-events-none" />

      {/* Layer 2: Massive Dominant Black Silhouette from Reference */}
      <div
        ref={silhouetteRef}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <PhantomCutout />
      </div>

      {/* Top Bar: Small Typographic System Identity */}
      <div
        ref={systemTagsRef}
        className="relative z-10 flex items-start justify-between w-full"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="p5-badge-tag black text-xs">A.R // 2026</span>
            <span className="p5-badge-tag red text-xs">P5 SYSTEM PROTOCOL</span>
          </div>
          <span className="font-mono text-xs text-[#080808] font-bold tracking-widest uppercase mt-1">
            MAPÚA UNIVERSITY // CS APPS
          </span>
        </div>

        {/* Skip Animation Button */}
        {!animationFinished && (
          <button
            onClick={handleSkip}
            className="p5-badge-tag black hover:bg-[#E60012] transition-colors text-xs font-mono font-bold cursor-pointer border-2 border-[#080808] px-3 py-1"
          >
            SKIP INTRO [ESC]
          </button>
        )}
      </div>

      {/* Center Left: Oversized Aggressive Asymmetrical Name Typography */}
      <div className="relative z-10 max-w-3xl my-auto py-8">
        <div className="inline-block mb-3">
          <div className="p5-badge-tag yellow text-xs sm:text-sm font-black tracking-widest px-3 py-1 mb-2">
            ★ PHANTOM ARCHITECT // DEV DOSSIER ★
          </div>
        </div>

        <div className="flex flex-col leading-none">
          <h1
            ref={name1Ref}
            className="p5-title-giant font-black text-black tracking-tighter drop-shadow-[5px_5px_0_#E60012]"
          >
            ADYSON
          </h1>
          <h1
            ref={name2Ref}
            className="p5-title-giant font-black text-black tracking-tighter drop-shadow-[6px_6px_0_#FFFFFF]"
            style={{ marginTop: '-0.15em' }}
          >
            REALES
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="flex flex-wrap items-center gap-2 mt-4 font-['Bebas_Neue'] text-xl sm:text-2xl md:text-3xl tracking-wider text-[#080808]"
        >
          <span className="p5-cutout-word alt text-white">SOFTWARE DEVELOPER</span>
          <span className="p5-cutout-word black text-white">GAME DESIGNER</span>
          <span className="p5-cutout-word white text-black">UI/UX ENGINEER</span>
        </div>

        {/* Interactive Title Screen Menu */}
        <div ref={menuRef} className="mt-8 flex flex-col gap-2 max-w-lg">
          {menuItems.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playConfirm();
                  onStart(item.id as PortfolioScreen);
                }}
                onMouseEnter={() => {
                  soundEngine.playTick();
                  setSelectedIdx(idx);
                }}
                className={`relative flex items-center gap-3 px-4 py-2 text-left font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-wide transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'text-white translate-x-4 scale-105'
                    : 'text-[#080808] hover:translate-x-2'
                }`}
                style={{
                  transform: `rotate(${(idx % 2 === 0 ? -1.5 : 2)}deg) ${
                    isSelected ? 'translateX(18px) scale(1.04)' : ''
                  }`
                }}
              >
                {/* Active Red Highlight Polygon Background */}
                <div
                  className={`absolute inset-0 transition-opacity duration-150 ${
                    isSelected ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: '#E60012',
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
                    boxShadow: '4px 4px 0 #080808',
                    zIndex: -1
                  }}
                />

                <span
                  className={`font-mono text-xs font-bold tracking-widest ${
                    isSelected ? 'text-[#FFDE00]' : 'text-[#8B8B8B]'
                  }`}
                >
                  [{item.code}]
                </span>
                <span className="relative z-10">{item.label}</span>
                {isSelected && (
                  <span className="font-mono text-xs tracking-widest ml-auto text-white hidden sm:inline">
                    SELECT ↵
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar: System Status and Looping Action Prompt */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6 border-t-2 border-[#080808]/20">
        <div className="flex flex-col text-xs font-mono font-bold text-[#080808]/70">
          <span>TARGET: HIGH-OCTANE APPS & IMMERSIVE GAMES</span>
          <span>STACK: REACT // TYPESCRIPT // UNITY // C# // LUAU // NODE</span>
        </div>

        <div
          ref={promptRef}
          onClick={() => {
            soundEngine.playConfirm();
            onStart(menuItems[selectedIdx].id as PortfolioScreen);
          }}
          className="cursor-pointer group flex items-center gap-3"
        >
          <div className="p5-badge-tag black text-xs tracking-widest animate-pulse">
            PRESS [ENTER] OR CLICK TO INFILTRATE
          </div>
          <div className="w-8 h-8 bg-[#E60012] text-white flex items-center justify-center font-bold text-lg transform rotate-45 group-hover:rotate-90 transition-transform">
            <span className="-rotate-45">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
};
