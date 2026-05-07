'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { loadPriorityFrames, loadRemainingFrames } from '../../../lib/blueprintFrameLoader';
import { PRIORITY_FRAME_COUNT } from '../../../lib/blueprintPhaseConfig';

/**
 * Loading screen with bus silhouette SVG stroke-draw animation.
 * The bus outline draws itself left-to-right driven by actual loading progress.
 * Dismissed when all priority frames are loaded.
 */
interface BlueprintLoadingScreenProps {
  onComplete: () => void;
}

export default function BlueprintLoadingScreen({ onComplete }: BlueprintLoadingScreenProps) {
  const [loaded, setLoaded] = useState(0);
  const [total] = useState(PRIORITY_FRAME_COUNT);
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>('loading');
  const pathRef = useRef<SVGPathElement>(null);
  const pathLengthRef = useRef(0);

  const handleProgress = useCallback((loadedCount: number, totalCount: number) => {
    setLoaded(loadedCount);
  }, []);

  useEffect(() => {
    // Measure path length once
    if (pathRef.current) {
      pathLengthRef.current = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = String(pathLengthRef.current);
      pathRef.current.style.strokeDashoffset = String(pathLengthRef.current);
    }

    // Start loading
    loadPriorityFrames(handleProgress).then(() => {
      // Start exit sequence
      setPhase('exit');
      loadRemainingFrames();

      // Exit animation: ~1400ms
      setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 1400);
    });
  }, [onComplete, handleProgress]);

  // Update stroke offset based on progress
  useEffect(() => {
    if (pathRef.current && pathLengthRef.current > 0) {
      const progress = loaded / total;
      pathRef.current.style.strokeDashoffset = String(
        pathLengthRef.current * (1 - progress)
      );
    }
  }, [loaded, total]);

  if (phase === 'done') return null;

  const progress = loaded / total;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#0A1628',
        backgroundImage: 'url(/assets/svg/grid-texture.svg)',
        backgroundSize: '24px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.6s ease 0.8s',
      }}
    >
      {/* Bus silhouette SVG — draws itself */}
      <svg
        width="320"
        height="100"
        viewBox="0 0 320 100"
        fill="none"
        style={{
          opacity: phase === 'exit' ? 0 : 1,
          transition: 'opacity 0.5s ease',
          maxWidth: '80vw',
        }}
      >
        <path
          ref={pathRef}
          d="M 20 75 L 20 30 Q 20 20, 35 20 L 270 20 Q 285 20, 285 30 L 285 75
             M 20 75 L 300 75
             M 30 30 L 80 30 L 80 55 L 30 55 Z
             M 90 30 L 275 30 L 275 55 L 90 55
             M 55 75 A 12 12 0 1 0 55 76
             M 255 75 A 12 12 0 1 0 255 76"
          stroke="rgba(100, 160, 220, 0.80)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'stroke-dashoffset 0.15s linear',
          }}
        />

        {/* Fill glow on exit */}
        {phase === 'exit' && (
          <path
            d="M 20 75 L 20 30 Q 20 20, 35 20 L 270 20 Q 285 20, 285 30 L 285 75 L 20 75 Z"
            fill="rgba(100, 160, 220, 0.08)"
            style={{
              animation: 'fadeIn 0.3s ease 0.5s forwards',
              opacity: 0,
            }}
          />
        )}
      </svg>

      {/* Text info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: phase === 'exit' ? 0 : 1,
          transition: 'opacity 0.3s ease 0.2s',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '11px',
            color: 'rgba(100, 160, 220, 0.60)',
            letterSpacing: '0.2em',
          }}
        >
          SC-VB11R-9600-2025
        </div>
        <div
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '18px',
            color: 'var(--text-primary)',
          }}
        >
          SURENDRA &amp; CO.
        </div>

        {/* Separator */}
        <div
          style={{
            width: '200px',
            height: '1px',
            background: 'rgba(100, 160, 220, 0.20)',
            margin: '4px 0',
          }}
        />

        {/* Status label */}
        <div
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.35em',
          }}
        >
          LOADING TECHNICAL DRAWINGS
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '280px',
            maxWidth: '80vw',
            height: '2px',
            background: 'var(--border-blueprint)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress * 100}%`,
              background: 'var(--accent-blueprint)',
              transition: 'width 0.15s linear',
            }}
          />
        </div>

        {/* Frame counter */}
        <div
          style={{
            fontFamily: 'var(--font-blueprint)',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
          }}
        >
          FRAME {loaded} / {total}
        </div>
      </div>
    </div>
  );
}
