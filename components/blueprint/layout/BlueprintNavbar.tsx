'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ChamferedButton from '../ui/ChamferedButton';

/**
 * Blueprint-styled fixed navigation bar.
 * Transitions from blueprint mode (cyan, mono font, sharp corners)
 * to reality mode (amber, warm, rounded) based on scroll progress.
 */
export default function BlueprintNavbar() {
  const [isRealityMode, setIsRealityMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Watch scroll to toggle reality mode (once past the assembly section)
  useEffect(() => {
    function handleScroll() {
      const assemblyEl = document.getElementById('assembly-section');
      if (assemblyEl) {
        const rect = assemblyEl.getBoundingClientRect();
        setIsRealityMode(rect.bottom < 0);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'DRAWINGS', href: '#assembly-section' },
    { label: 'RANGE', href: '#our-range' },
    { label: 'PROCESS', href: '#the-making' },
    { label: 'CONTACT', href: '#commission' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: isRealityMode
            ? 'rgba(15, 30, 53, 0.9)'
            : 'rgba(10, 22, 40, 0.75)',
          backdropFilter: `blur(${isRealityMode ? '10' : '8'}px)`,
          borderBottom: `1px solid ${
            isRealityMode
              ? 'rgba(200, 133, 26, 0.25)'
              : 'rgba(100, 160, 220, 0.35)'
          }`,
          transition: 'all 0.6s ease',
        }}
      >
        {/* LEFT: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              border: `1px solid ${isRealityMode ? 'var(--border-amber)' : 'var(--border-blueprint)'}`,
              background: 'rgba(100, 160, 220, 0.05)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transition: 'border-color 0.6s ease',
            }}
          >
            <Image
              src="/Logo.png"
              alt="Surendra & Co."
              width={32}
              height={32}
              style={{
                objectFit: 'contain',
                filter: isRealityMode ? 'saturate(1)' : 'saturate(0.3)',
                opacity: isRealityMode ? 1 : 0.5,
                transition: 'all 0.6s ease',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-blueprint)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.3em',
            }}
          >
            SURENDRA &amp; CO.
          </span>
        </div>

        {/* RIGHT: Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-blueprint)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  padding: '4px 0',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = isRealityMode
                    ? 'var(--accent-amber)'
                    : 'var(--accent-blueprint)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                {link.label}
              </button>
            ))}
            <ChamferedButton
              onClick={() => handleNavClick('#commission')}
              variant={isRealityMode ? 'amber' : 'blueprint'}
            >
              COMMISSION BUILD
            </ChamferedButton>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '28px',
                  height: '1px',
                  background: 'rgba(100, 160, 220, 0.60)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: mobileMenuOpen
                    ? i === 0
                      ? 'translateY(6px) rotate(45deg)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'translateY(-6px) rotate(-45deg)'
                    : 'none',
                  opacity: mobileMenuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 45,
            background: 'rgba(10, 22, 40, 0.97)',
            backgroundImage: 'url(/assets/svg/grid-texture.svg)',
            backgroundSize: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0',
            opacity: mobileMenuOpen ? 1 : 0,
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {navLinks.map((link, i) => (
            <React.Fragment key={link.label}>
              {i > 0 && (
                <hr
                  style={{
                    width: '200px',
                    border: 'none',
                    borderTop: '1px solid rgba(100, 160, 220, 0.15)',
                    margin: '0',
                  }}
                />
              )}
              <button
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-blueprint)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.4em',
                  cursor: 'pointer',
                  padding: '20px 0',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--accent-blueprint)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                [{'>'}] {link.label}
              </button>
            </React.Fragment>
          ))}
          <div style={{ marginTop: '32px' }}>
            <ChamferedButton onClick={() => handleNavClick('#commission')} variant="amber">
              COMMISSION BUILD
            </ChamferedButton>
          </div>
        </div>
      )}
    </>
  );
}
