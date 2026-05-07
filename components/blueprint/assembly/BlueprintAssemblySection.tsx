'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlueprintCanvas from '../canvas/BlueprintCanvas';
import BlueprintBorder from '../blueprint/BlueprintBorder';
import AnnotationOverlay from '../blueprint/AnnotationOverlay';
import BusSilhouetteNav from '../blueprint/BusSilhouetteNav';
import TitleBlock from '../blueprint/TitleBlock';
import SpecSheetPanel from './SpecSheetPanel';
import { PHASES, getCurrentPhase, PHASE_BOUNDARIES } from '../../../lib/blueprintPhaseConfig';
import { updateGlobalMood } from '../../../lib/blueprintMoodController';

gsap.registerPlugin(ScrollTrigger);

/**
 * 500vh scroll container for the assembly animation.
 * Initializes GSAP ScrollTrigger and manages all overlay components.
 */
export default function BlueprintAssemblySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [titleBlockOpacity, setTitleBlockOpacity] = useState(1);
  const prevPhaseRef = useRef(1);

  // Detect mobile
  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Batch mood updates in RAF
  const pendingProgress = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const scheduleMoodUpdate = useCallback((p: number) => {
    pendingProgress.current = p;
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        if (pendingProgress.current !== null) {
          updateGlobalMood(pendingProgress.current);

          // Title block fade from progress 0.7 to 1.0
          const tb = pendingProgress.current < 0.7
            ? 1
            : 1 - ((pendingProgress.current - 0.7) / 0.3);
          setTitleBlockOpacity(Math.max(0, Math.min(1, tb)));
        }
        rafId.current = null;
      });
    }
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        const newPhase = getCurrentPhase(p);
        if (newPhase !== prevPhaseRef.current) {
          prevPhaseRef.current = newPhase;
          setPhase(newPhase);
        }

        scheduleMoodUpdate(p);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [scheduleMoodUpdate]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const currentPhaseData = PHASES[phase - 1];
  const phaseLabel = currentPhaseData
    ? `PHASE ${phase}: ${currentPhaseData.name}`
    : 'PHASE 1: THE FOUNDATION';

  // Annotation opacity: fade in/out at phase transitions
  const phaseProgress =
    currentPhaseData
      ? (progress - currentPhaseData.scrollStart) / (currentPhaseData.scrollEnd - currentPhaseData.scrollStart)
      : 0;
  const annotationOpacity =
    phase === 5
      ? 0
      : phaseProgress < 0.1
      ? phaseProgress / 0.1
      : phaseProgress > 0.9
      ? (1 - phaseProgress) / 0.1
      : 1;

  return (
    <section
      id="assembly-section"
      ref={sectionRef}
      style={{ height: '500vh', position: 'relative' }}
    >
      <div
        id="assembly-sticky"
        ref={stickyRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Layer 1: Canvas */}
        <BlueprintCanvas progress={progress} isMobile={isMobile} />

        {/* Layer 2: Dark overlay for legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10, 22, 40, 0.35)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Layer 3: Blueprint border SVG */}
        <BlueprintBorder phaseLabel={phaseLabel} />

        {/* Layer 4: Annotation overlay — desktop only (mobile frames are rotated 90°, positions don't match) */}
        {currentPhaseData && !isMobile && (
          <AnnotationOverlay
            annotations={currentPhaseData.annotations}
            opacity={annotationOpacity}
            phase={phase}
          />
        )}

        {/* Layer 5: Bus silhouette nav (desktop) / dot indicator (mobile) */}
        <BusSilhouetteNav currentPhase={phase} isMobile={isMobile} />

        {/* Layer 6: Spec sheet panel */}
        <SpecSheetPanel phase={phase} isVisible={true} isMobile={isMobile} />

        {/* Layer 7: Title block */}
        <TitleBlock opacity={titleBlockOpacity} />

        {/* Phase 5 completion text */}
        {phase === 5 && progress > 0.9 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 6,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-blueprint)',
                fontSize: '13px',
                color: 'var(--accent-amber)',
                letterSpacing: '0.3em',
                textAlign: 'center',
                opacity: Math.min(1, (progress - 0.9) / 0.05),
                transition: 'opacity 0.3s ease',
              }}
            >
              DRAWING COMPLETE · READY FOR COMMISSION
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
