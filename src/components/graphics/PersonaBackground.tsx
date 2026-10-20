import React, { useEffect, useState } from 'react';
import type { PortfolioScreen } from '../../types';
import { PhantomCutout } from './PhantomCutout';

interface PersonaBackgroundProps {
  currentScreen: PortfolioScreen;
}

export const PersonaBackground: React.FC<PersonaBackgroundProps> = ({ currentScreen }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized offset [-1, 1]
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxOffset = {
    x: mousePos.x * 14,
    y: mousePos.y * 14,
  };

  return (
    <div 
      className="p5-bg-system fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{
        backgroundColor: 
          currentScreen === 'title' || currentScreen === 'home' || currentScreen === 'about'
            ? 'var(--p5-white)'
            : 'var(--p5-black)',
        transition: 'background-color 0.4s ease'
      }}
      aria-hidden="true"
    >
      {/* Dynamic Background Layout Variants based on Screen */}
      {(currentScreen === 'title' || currentScreen === 'home') && (
        <>
          {/* Halftone Pattern Layer */}
          <div className="absolute inset-0 p5-halftone-pattern opacity-80" />

          {/* Persona Title Silhouette Composition */}
          <div 
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${parallaxOffset.x * -0.6}px, ${parallaxOffset.y * -0.6}px, 0)`
            }}
          >
            <PhantomCutout />
          </div>

          {/* Giant Background Monospace Watermark */}
          <div 
            className="absolute -bottom-10 -left-6 font-mono text-[14vw] font-black text-black/[0.04] leading-none tracking-tighter uppercase whitespace-nowrap pointer-events-none"
            style={{ transform: 'skewX(-10deg)' }}
          >
            SYSTEM_ACTIVE
          </div>
        </>
      )}

      {currentScreen === 'projects' && (
        <>
          {/* Crimson & Black Infiltration Background */}
          <div className="absolute inset-0 bg-[#080808]" />
          
          {/* Giant Angular Red Polygon Split */}
          <div 
            className="absolute -top-[20%] -right-[15%] w-[75vw] h-[140vh] bg-[#E60012] transition-transform duration-300 ease-out"
            style={{
              clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
              transform: `translate3d(${parallaxOffset.x * 0.8}px, ${parallaxOffset.y * 0.8}px, 0)`
            }}
          />

          {/* Dark Negative Window */}
          <div 
            className="absolute top-[10%] right-[12%] w-[45vw] h-[75vh] bg-[#080808] border-4 border-white/20"
            style={{
              clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)',
              transform: 'skewX(-6deg)'
            }}
          />

          {/* Halftone & diagonal stripes */}
          <div className="absolute inset-0 p5-halftone-pattern dark opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 h-4 p5-caution-ribbon" />

          {/* Background Watermark */}
          <div 
            className="absolute -top-10 left-10 font-['Bebas_Neue'] text-[18vw] font-black text-white/[0.03] leading-none uppercase"
          >
            TARGET ARCHIVE
          </div>
        </>
      )}

      {currentScreen === 'about' && (
        <>
          {/* White and Crimson Dossier Theme */}
          <div className="absolute inset-0 p5-halftone-pattern opacity-60" />

          {/* Angular Crimson Block Behind Profile Position */}
          <div 
            className="absolute top-0 right-0 w-[55vw] h-full bg-[#E60012] transition-transform duration-300 ease-out"
            style={{
              clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 15% 100%)',
              transform: `translate3d(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px, 0)`
            }}
          />

          {/* Sharp Black Contrast Shard */}
          <div 
            className="absolute -bottom-10 right-[35%] w-[25vw] h-[80vh] bg-[#080808]"
            style={{
              clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0% 100%)',
              transform: 'skewX(-8deg)'
            }}
          />

          {/* Watermark Dossier */}
          <div 
            className="absolute top-1/2 left-8 -translate-y-1/2 font-['Bebas_Neue'] text-[15vw] font-black text-black/[0.04] leading-none uppercase"
          >
            DOSSIER
          </div>
        </>
      )}

      {currentScreen === 'skills' && (
        <>
          {/* Deep Black & Yellow Alert Armory Theme */}
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="absolute inset-0 p5-stripes-bg opacity-30" />

          {/* Sharp Red and Yellow Graphic Splices */}
          <div 
            className="absolute top-0 left-0 w-[40vw] h-[120vh] bg-[#E60012] opacity-80"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 40% 100%, 0 100%)',
              transform: `translate3d(${parallaxOffset.x * -0.7}px, ${parallaxOffset.y * -0.7}px, 0)`
            }}
          />

          <div 
            className="absolute bottom-0 right-0 w-[50vw] h-[70vh] bg-[#141414] border-t-8 border-[#FFDE00]"
            style={{
              clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)'
            }}
          />

          {/* Watermark Armory */}
          <div 
            className="absolute bottom-6 right-10 font-['Bebas_Neue'] text-[16vw] font-black text-white/[0.04] leading-none uppercase"
          >
            ARMORY
          </div>
        </>
      )}

      {currentScreen === 'experience' && (
        <>
          {/* Infiltration Timeline Dark Background */}
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="absolute inset-0 p5-halftone-pattern dark opacity-30" />

          {/* Diagonal Angular Rails */}
          <div 
            className="absolute -top-[10%] left-[25%] w-3 h-[130vh] bg-[#E60012] -rotate-[15deg] opacity-70"
          />
          <div 
            className="absolute -top-[10%] left-[28%] w-1 h-[130vh] bg-white -rotate-[15deg] opacity-40"
          />

          {/* Massive Chapter Watermark */}
          <div 
            className="absolute top-1/3 -right-20 font-['Bebas_Neue'] text-[18vw] font-black text-white/[0.03] leading-none uppercase -rotate-90 select-none"
          >
            INFILTRATION
          </div>
        </>
      )}

      {currentScreen === 'contact' && (
        <>
          {/* Calling Card Full Impact Red Screen */}
          <div className="absolute inset-0 bg-[#E60012]" />
          
          {/* Comic Action Hatching */}
          <div className="absolute inset-0 p5-stripes-bg opacity-40" />

          {/* Dramatic Black Slanted Center Panel */}
          <div 
            className="absolute top-0 right-[5%] w-[65vw] h-[130vh] bg-[#080808] transition-transform duration-300"
            style={{
              clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0% 100%)',
              transform: `translate3d(${parallaxOffset.x * 0.7}px, ${parallaxOffset.y * 0.7}px, 0)`
            }}
          />

          {/* P5 Stylized Star Accents */}
          <div className="absolute top-12 left-12 w-24 h-24 opacity-60">
            <svg viewBox="0 0 100 100" fill="#080808">
              <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" />
            </svg>
          </div>
          <div className="absolute bottom-16 right-16 w-32 h-32 opacity-40">
            <svg viewBox="0 0 100 100" fill="#FFFFFF">
              <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" />
            </svg>
          </div>

          {/* TAKE YOUR HEART Watermark */}
          <div 
            className="absolute -bottom-10 left-6 font-['Bebas_Neue'] text-[15vw] font-black text-white/[0.08] leading-none uppercase"
          >
            TAKE YOUR HEART
          </div>
        </>
      )}
    </div>
  );
};
