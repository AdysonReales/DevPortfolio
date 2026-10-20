import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { soundEngine } from '../../audio/soundEngine';

interface ScreenTransitionProps {
  isTransitioning: boolean;
  variant?: 'diagonal' | 'red-impact' | 'layered-panel';
  onMidpoint?: () => void;
  onComplete?: () => void;
}

export const ScreenTransition: React.FC<ScreenTransitionProps> = ({
  isTransitioning,
  variant = 'diagonal',
  onMidpoint,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTransitioning || !containerRef.current) return;

    soundEngine.playTransition();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      if (variant === 'diagonal') {
        // High speed P5 diagonal slash wipe
        tl.set(containerRef.current, { display: 'block', pointerEvents: 'all' })
          .set([panel1Ref.current, panel2Ref.current], { xPercent: -120, skewX: -15 })
          .to(panel1Ref.current, {
            xPercent: 0,
            duration: 0.28,
            ease: 'power3.inOut'
          })
          .to(panel2Ref.current, {
            xPercent: 0,
            duration: 0.26,
            ease: 'power3.inOut'
          }, '-=0.2')
          .call(() => {
            if (onMidpoint) onMidpoint();
          })
          .to(panel2Ref.current, {
            xPercent: 120,
            duration: 0.28,
            ease: 'power3.inOut'
          }, '+=0.05')
          .to(panel1Ref.current, {
            xPercent: 120,
            duration: 0.28,
            ease: 'power3.inOut'
          }, '-=0.2')
          .set(containerRef.current, { display: 'none', pointerEvents: 'none' });
      } else if (variant === 'red-impact') {
        // Red impact explosion wipe
        tl.set(containerRef.current, { display: 'block', pointerEvents: 'all' })
          .set(panel2Ref.current, { scaleY: 0, transformOrigin: 'bottom center', skewX: 0 })
          .to(panel2Ref.current, {
            scaleY: 1,
            duration: 0.25,
            ease: 'power4.inOut'
          })
          .call(() => {
            if (onMidpoint) onMidpoint();
          })
          .to(panel2Ref.current, {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 0.28,
            ease: 'power4.inOut'
          }, '+=0.05')
          .set(containerRef.current, { display: 'none', pointerEvents: 'none' });
      } else {
        // Layered 3-panel staggered sweep
        tl.set(containerRef.current, { display: 'block', pointerEvents: 'all' })
          .set([panel1Ref.current, panel2Ref.current, panel3Ref.current], { yPercent: 100, skewX: 0 })
          .to(panel1Ref.current, { yPercent: 0, duration: 0.22, ease: 'power2.inOut' })
          .to(panel3Ref.current, { yPercent: 0, duration: 0.24, ease: 'power2.inOut' }, '-=0.18')
          .to(panel2Ref.current, { yPercent: 0, duration: 0.26, ease: 'power2.inOut' }, '-=0.18')
          .call(() => {
            if (onMidpoint) onMidpoint();
          })
          .to([panel2Ref.current, panel3Ref.current, panel1Ref.current], {
            yPercent: -100,
            stagger: 0.05,
            duration: 0.25,
            ease: 'power2.inOut'
          }, '+=0.05')
          .set(containerRef.current, { display: 'none', pointerEvents: 'none' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning, variant, onMidpoint, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none hidden overflow-hidden"
      aria-hidden="true"
    >
      {/* Panel 1: Black Layer */}
      <div
        ref={panel1Ref}
        className="absolute inset-0 bg-[#080808]"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute inset-0 p5-halftone-pattern dark opacity-30" />
      </div>

      {/* Panel 3: White Accent Shard */}
      <div
        ref={panel3Ref}
        className="absolute inset-0 bg-[#F5F5F2]"
        style={{ transformOrigin: 'center' }}
      />

      {/* Panel 2: Primary Crimson Layer with Branding */}
      <div
        ref={panel2Ref}
        className="absolute inset-0 bg-[#E60012] flex items-center justify-center overflow-hidden"
        style={{ transformOrigin: 'center' }}
      >
        <div className="absolute inset-0 p5-stripes-bg opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
          <div className="p5-badge-tag black mb-4 text-sm font-bold tracking-widest px-4 py-1">
            TARGET INFILTRATION
          </div>
          <div className="font-['Bebas_Neue'] text-white text-6xl md:text-8xl tracking-wider leading-none drop-shadow-[5px_5px_0_#080808]">
            LOADING DATA...
          </div>
          <div className="font-mono text-white/80 text-xs tracking-[0.3em] uppercase mt-2">
            A. REALES // PORTFOLIO PROTOCOL
          </div>
        </div>
      </div>
    </div>
  );
};
