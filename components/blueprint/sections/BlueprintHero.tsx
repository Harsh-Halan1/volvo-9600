'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero — "The Drawing Board"
 * Blueprint frame + centered stencil text on top of the canvas.
 * Fades out as the user scrolls into the assembly section.
 */
export default function BlueprintHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Hero exit animation — fades out as assembly begins
  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: '#assembly-section',
      start: 'top top',
      end: '10% top',
      scrub: true,
      onUpdate: (self) => {
        if (contentRef.current) {
          gsap.set(contentRef.current, {
            opacity: 1 - self.progress,
            y: self.progress * -30,
          });
        }
        setIsVisible(self.progress < 0.95);
      },
    });

    return () => trigger.kill();
  }, []);

  // Staggered entry animation
  useEffect(() => {
    if (!contentRef.current) return;
    const lines = contentRef.current.querySelectorAll('.hero-line');
    gsap.fromTo(
      lines,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, delay: 0.5 }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        ref={contentRef}
        id="hero-content"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
        }}
      >
        {/* Drawing number */}
        <div
          className="hero-line"
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.2em',
            opacity: 0,
          }}
        >
          DRG NO: SC-VB11R-9600-2025
        </div>

        {/* Subtitle */}
        <div
          className="hero-line"
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.4em',
            opacity: 0,
          }}
        >
          COACH BODY MANUFACTURE
        </div>

        {/* Thin horizontal rule */}
        <div
          className="hero-line"
          style={{
            width: '200px',
            height: '1px',
            background: 'rgba(100, 160, 220, 0.35)',
            opacity: 0,
          }}
        />

        {/* Main title — stenciled */}
        <h1
          className="hero-line"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(32px, 6vw, 72px)',
            color: 'var(--text-primary)',
            letterSpacing: '0.15em',
            lineHeight: 1,
            margin: '8px 0',
            opacity: 0,
          }}
        >
          S U R E N D R A &nbsp; &amp; &nbsp; C O .
        </h1>

        {/* Scroll prompt */}
        <div
          className="hero-line animate-pulse-opacity"
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.15em',
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: 0,
          }}
        >
          SCROLL TO ASSEMBLE
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M5 2 L5 8 M2 5 L5 8 L8 5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
