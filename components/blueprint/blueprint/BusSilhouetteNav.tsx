'use client';

import React from 'react';
import { PHASES } from '../../../lib/blueprintPhaseConfig';

/**
 * Bus Silhouette Navigation — Left rail (desktop) / 5-dot indicator (mobile).
 *
 * Desktop: Fixed left-rail with simplified bus side-profile SVG.
 * 5 groups progressively illuminate as phases complete.
 *
 * Mobile: Horizontal 5-dot phase indicator below navbar.
 */
interface BusSilhouetteNavProps {
  currentPhase: number;
  isMobile?: boolean;
}

export default function BusSilhouetteNav({ currentPhase, isMobile = false }: BusSilhouetteNavProps) {
  if (isMobile) {
    return <MobilePhaseIndicator currentPhase={currentPhase} />;
  }

  return <DesktopSilhouette currentPhase={currentPhase} />;
}

/** Desktop: Simplified bus side-profile SVG with 5 group zones */
function DesktopSilhouette({ currentPhase }: { currentPhase: number }) {
  function getOpacity(phase: number): number {
    if (phase < currentPhase) return 0.40; // completed
    if (phase === currentPhase) return 1.0; // active
    return 0.15; // not yet built
  }

  const lineColor = 'rgba(100, 160, 220, 1)';

  return (
    <div
      style={{
        position: 'fixed',
        left: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <svg
        width="140"
        height="56"
        viewBox="0 0 140 56"
        fill="none"
        aria-label="Bus assembly progress"
      >
        {/* Phase 1 — Chassis / lower frame */}
        <g id="silhouette-phase-1" style={{ opacity: getOpacity(1), transition: 'opacity 0.4s ease', willChange: 'opacity' }}>
          <line x1="10" y1="44" x2="130" y2="44" stroke={lineColor} strokeWidth="1.5" />
          <line x1="10" y1="44" x2="10" y2="38" stroke={lineColor} strokeWidth="1" />
          <line x1="130" y1="44" x2="130" y2="38" stroke={lineColor} strokeWidth="1" />
          <line x1="10" y1="48" x2="130" y2="48" stroke={lineColor} strokeWidth="0.5" strokeDasharray="2,2" />
        </g>

        {/* Phase 2 — Drivetrain / wheels */}
        <g id="silhouette-phase-2" style={{ opacity: getOpacity(2), transition: 'opacity 0.4s ease', willChange: 'opacity' }}>
          <circle cx="28" cy="48" r="7" stroke={lineColor} strokeWidth="1" fill="none" />
          <circle cx="28" cy="48" r="3" stroke={lineColor} strokeWidth="0.5" fill="none" />
          <circle cx="112" cy="48" r="7" stroke={lineColor} strokeWidth="1" fill="none" />
          <circle cx="112" cy="48" r="3" stroke={lineColor} strokeWidth="0.5" fill="none" />
          <rect x="15" y="36" width="18" height="8" stroke={lineColor} strokeWidth="0.5" fill="none" rx="1" />
        </g>

        {/* Phase 3 — Interior / deck lines */}
        <g id="silhouette-phase-3" style={{ opacity: getOpacity(3), transition: 'opacity 0.4s ease', willChange: 'opacity' }}>
          <line x1="14" y1="28" x2="126" y2="28" stroke={lineColor} strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="14" y1="20" x2="126" y2="20" stroke={lineColor} strokeWidth="0.5" strokeDasharray="3,2" />
        </g>

        {/* Phase 4 — Exterior / body panels */}
        <g id="silhouette-phase-4" style={{ opacity: getOpacity(4), transition: 'opacity 0.4s ease', willChange: 'opacity' }}>
          <path
            d="M 14 38 L 14 12 Q 14 8, 22 8 L 118 8 Q 126 8, 126 12 L 126 38"
            stroke={lineColor}
            strokeWidth="1"
            fill="none"
          />
          <line x1="20" y1="12" x2="54" y2="12" stroke={lineColor} strokeWidth="0.5" />
          <line x1="60" y1="12" x2="122" y2="12" stroke={lineColor} strokeWidth="0.5" />
        </g>

        {/* Phase 5 — Livery / final details */}
        <g id="silhouette-phase-5" style={{ opacity: getOpacity(5), transition: 'opacity 0.4s ease', willChange: 'opacity' }}>
          <rect x="16" y="14" width="36" height="10" stroke={lineColor} strokeWidth="0.3" fill="none" rx="1" />
          <rect x="56" y="14" width="66" height="10" stroke={lineColor} strokeWidth="0.3" fill="none" rx="1" />
          <line x1="60" y1="4" x2="100" y2="4" stroke={lineColor} strokeWidth="0.3" />
          <line x1="60" y1="4" x2="60" y2="8" stroke={lineColor} strokeWidth="0.3" />
          <line x1="100" y1="4" x2="100" y2="8" stroke={lineColor} strokeWidth="0.3" />
        </g>
      </svg>

      {/* Phase label */}
      <div
        style={{
          fontFamily: 'var(--font-blueprint)',
          fontSize: '9px',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          letterSpacing: '0.15em',
          lineHeight: '1.5',
        }}
      >
        <div>PHASE {String(currentPhase).padStart(2, '0')}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '8px' }}>
          {PHASES[currentPhase - 1]?.shortName || ''}
        </div>
      </div>
    </div>
  );
}

/** Mobile: Horizontal dot phase indicator */
function MobilePhaseIndicator({ currentPhase }: { currentPhase: number }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '56px',
        left: 0,
        right: 0,
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '8px 0',
        background: 'rgba(10, 22, 40, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {[1, 2, 3, 4, 5].map((phase) => {
        const isActive = phase === currentPhase;
        const isCompleted = phase < currentPhase;
        return (
          <div key={phase} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                borderRadius: '50%',
                background: isActive
                  ? 'var(--accent-blueprint)'
                  : isCompleted
                  ? 'rgba(100, 160, 220, 0.40)'
                  : 'rgba(100, 160, 220, 0.15)',
                border: isActive ? '1px solid var(--accent-blueprint)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
            {isActive && (
              <span
                style={{
                  fontFamily: 'var(--font-blueprint)',
                  fontSize: '7px',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.1em',
                }}
              >
                {PHASES[phase - 1]?.shortName || ''}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
