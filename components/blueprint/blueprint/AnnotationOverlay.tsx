'use client';

import React from 'react';
import type { AnnotationConfig } from '../../../lib/blueprintPhaseConfig';

/**
 * Phase-specific SVG annotation overlay.
 * Renders dimension lines + callout boxes pointing to specific areas of the bus.
 * Positions are percentage-based to scale with the canvas viewport.
 */
interface AnnotationOverlayProps {
  annotations: AnnotationConfig[];
  opacity?: number;
  phase: number;
}

export default function AnnotationOverlay({ annotations, opacity = 1, phase }: AnnotationOverlayProps) {
  if (annotations.length === 0 || phase === 5) return null;

  const textColor = 'rgba(100, 160, 220, 0.80)';
  const lineColor = 'rgba(100, 160, 220, 0.50)';
  const boxFill = 'rgba(10, 22, 40, 0.85)';
  const boxStroke = 'rgba(100, 160, 220, 0.30)';

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
        opacity,
        transition: 'opacity 0.5s ease',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {annotations.map((ann) => {
        // Callout box offset based on direction
        const boxWidth = 28;
        const boxHeight = 4;
        let boxX = ann.x;
        let boxY = ann.y;
        let lineEndX = ann.x;
        let lineEndY = ann.y;

        switch (ann.direction) {
          case 'right':
            boxX = ann.x + 3;
            boxY = ann.y - boxHeight / 2;
            lineEndX = ann.x + 3;
            lineEndY = ann.y;
            break;
          case 'left':
            boxX = ann.x - boxWidth - 3;
            boxY = ann.y - boxHeight / 2;
            lineEndX = ann.x - 3;
            lineEndY = ann.y;
            break;
          case 'up':
            boxX = ann.x - boxWidth / 2;
            boxY = ann.y - boxHeight - 3;
            lineEndX = ann.x;
            lineEndY = ann.y - 3;
            break;
          case 'down':
            boxX = ann.x - boxWidth / 2;
            boxY = ann.y + 3;
            lineEndX = ann.x;
            lineEndY = ann.y + 3;
            break;
        }

        return (
          <g key={ann.id}>
            {/* Leader line — from bus area to callout box */}
            <line
              x1={ann.x}
              y1={ann.y}
              x2={lineEndX}
              y2={lineEndY}
              stroke={lineColor}
              strokeWidth="0.15"
              strokeDasharray="0.5,0.3"
            />

            {/* Dot at annotation point */}
            <circle cx={ann.x} cy={ann.y} r="0.4" fill={textColor} />

            {/* Callout box */}
            <rect
              x={boxX}
              y={boxY}
              width={boxWidth}
              height={boxHeight}
              fill={boxFill}
              stroke={boxStroke}
              strokeWidth="0.1"
            />

            {/* Callout text */}
            <text
              x={boxX + 1}
              y={boxY + boxHeight * 0.7}
              fill={textColor}
              fontSize="1.8"
              fontFamily="var(--font-blueprint)"
              letterSpacing="0.08em"
            >
              ▸ {ann.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
