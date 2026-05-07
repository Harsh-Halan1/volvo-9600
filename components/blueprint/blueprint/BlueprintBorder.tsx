'use client';

import React from 'react';

/**
 * Full-viewport SVG overlay creating the engineering drawing border:
 * - Outer + inner border rectangles
 * - Corner marks (cross marks at 4 corners)
 * - Top dimension line with "12,640 mm" label
 * - Left dimension line with "3,200 mm" label
 * - Bottom-center phase label
 */
interface BlueprintBorderProps {
  phaseLabel?: string;
}

export default function BlueprintBorder({ phaseLabel = 'PHASE 1: THE FOUNDATION' }: BlueprintBorderProps) {
  const lineColor = 'rgba(100, 160, 220, 0.40)';
  const innerLineColor = 'rgba(100, 160, 220, 0.20)';
  const textColor = 'rgba(100, 160, 220, 0.60)';
  const margin = 20;
  const innerMargin = 40;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Outer border */}
      <rect
        x={margin}
        y={margin}
        width={1000 - margin * 2}
        height={600 - margin * 2}
        fill="none"
        stroke={lineColor}
        strokeWidth="1"
      />

      {/* Inner border */}
      <rect
        x={innerMargin}
        y={innerMargin}
        width={1000 - innerMargin * 2}
        height={600 - innerMargin * 2}
        fill="none"
        stroke={innerLineColor}
        strokeWidth="0.5"
      />

      {/* Corner marks — top-left */}
      <line x1={margin - 8} y1={margin} x2={margin + 8} y2={margin} stroke={lineColor} strokeWidth="0.5" />
      <line x1={margin} y1={margin - 8} x2={margin} y2={margin + 8} stroke={lineColor} strokeWidth="0.5" />
      <text x={margin + 3} y={margin - 3} fill={textColor} fontSize="5" fontFamily="var(--font-blueprint)">A1</text>

      {/* Corner marks — top-right */}
      <line x1={1000 - margin - 8} y1={margin} x2={1000 - margin + 8} y2={margin} stroke={lineColor} strokeWidth="0.5" />
      <line x1={1000 - margin} y1={margin - 8} x2={1000 - margin} y2={margin + 8} stroke={lineColor} strokeWidth="0.5" />
      <text x={1000 - margin - 14} y={margin - 3} fill={textColor} fontSize="5" fontFamily="var(--font-blueprint)">A2</text>

      {/* Corner marks — bottom-left */}
      <line x1={margin - 8} y1={600 - margin} x2={margin + 8} y2={600 - margin} stroke={lineColor} strokeWidth="0.5" />
      <line x1={margin} y1={600 - margin - 8} x2={margin} y2={600 - margin + 8} stroke={lineColor} strokeWidth="0.5" />
      <text x={margin + 3} y={600 - margin + 9} fill={textColor} fontSize="5" fontFamily="var(--font-blueprint)">B1</text>

      {/* Corner marks — bottom-right */}
      <line x1={1000 - margin - 8} y1={600 - margin} x2={1000 - margin + 8} y2={600 - margin} stroke={lineColor} strokeWidth="0.5" />
      <line x1={1000 - margin} y1={600 - margin - 8} x2={1000 - margin} y2={600 - margin + 8} stroke={lineColor} strokeWidth="0.5" />
      <text x={1000 - margin - 14} y={600 - margin + 9} fill={textColor} fontSize="5" fontFamily="var(--font-blueprint)">B2</text>

      {/* Top dimension line with arrows */}
      <defs>
        <marker id="arrowRight" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10" fill="none" stroke={textColor} strokeWidth="1" />
        </marker>
        <marker id="arrowLeft" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M10,0 L0,5 L10,10" fill="none" stroke={textColor} strokeWidth="1" />
        </marker>
        <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0" fill="none" stroke={textColor} strokeWidth="1" />
        </marker>
        <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,10 L5,0 L10,10" fill="none" stroke={textColor} strokeWidth="1" />
        </marker>
      </defs>

      {/* Top dimension arrow line */}
      <line
        x1={innerMargin + 10}
        y1={margin + 8}
        x2={1000 - innerMargin - 10}
        y2={margin + 8}
        stroke={textColor}
        strokeWidth="0.5"
        markerStart="url(#arrowLeft)"
        markerEnd="url(#arrowRight)"
      />
      <text
        x={500}
        y={margin + 6}
        fill={textColor}
        fontSize="6"
        fontFamily="var(--font-blueprint)"
        textAnchor="middle"
        letterSpacing="0.15em"
      >
        12,640 mm
      </text>

      {/* Left dimension arrow line */}
      <line
        x1={margin + 8}
        y1={innerMargin + 10}
        x2={margin + 8}
        y2={600 - innerMargin - 10}
        stroke={textColor}
        strokeWidth="0.5"
        markerStart="url(#arrowUp)"
        markerEnd="url(#arrowDown)"
      />
      <text
        x={margin + 6}
        y={300}
        fill={textColor}
        fontSize="6"
        fontFamily="var(--font-blueprint)"
        textAnchor="middle"
        letterSpacing="0.15em"
        transform={`rotate(-90, ${margin + 6}, 300)`}
      >
        3,200 mm
      </text>

      {/* Phase label — bottom center */}
      <text
        x={500}
        y={600 - margin - 4}
        fill={textColor}
        fontSize="7"
        fontFamily="var(--font-blueprint)"
        textAnchor="middle"
        letterSpacing="0.25em"
      >
        {phaseLabel}
      </text>
    </svg>
  );
}
