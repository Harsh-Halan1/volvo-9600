'use client';

import React from 'react';

/**
 * Engineering title block — fixed bottom-right.
 * Styled as a real drawing title block with table cells.
 * Fades out based on assembly progress (handled by parent via opacity prop).
 */
interface TitleBlockProps {
  opacity?: number;
}

export default function TitleBlock({ opacity = 1 }: TitleBlockProps) {
  const cellStyle: React.CSSProperties = {
    padding: '3px 8px',
    border: '1px solid rgba(100, 160, 220, 0.35)',
    fontFamily: 'var(--font-blueprint)',
    fontSize: '9px',
    color: 'rgba(100, 160, 220, 0.60)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  };

  const labelStyle: React.CSSProperties = {
    ...cellStyle,
    fontSize: '8px',
    color: 'var(--text-tertiary)',
    letterSpacing: '0.1em',
  };

  return (
    <div
      id="title-block"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 20,
        background: 'rgba(100, 160, 220, 0.05)',
        border: '1px solid rgba(100, 160, 220, 0.25)',
        opacity,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }}
    >
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={labelStyle}>DRAWING NO.</td>
            <td style={cellStyle}>SC-VB11R-9600-2025</td>
          </tr>
          <tr>
            <td style={labelStyle}>PROJECT</td>
            <td style={cellStyle}>VOLVO 9600 XL — LUXURY SLEEPER</td>
          </tr>
          <tr>
            <td style={labelStyle}>PREPARED BY</td>
            <td style={cellStyle}>SURENDRA &amp; CO.</td>
          </tr>
          <tr>
            <td style={labelStyle}>ADDRESS</td>
            <td style={cellStyle}>BAREJA, AHMEDABAD</td>
          </tr>
          <tr>
            <td style={labelStyle}>SCALE</td>
            <td style={cellStyle}>1:50</td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                ...cellStyle,
                textAlign: 'center',
                fontSize: '8px',
                letterSpacing: '0.15em',
              }}
            >
              COACH BODY BUILDERS — EST. 2000
            </td>
          </tr>
        </tbody>
      </table>

      {/* Mobile scaling */}
      <style jsx>{`
        @media (max-width: 767px) {
          #title-block {
            bottom: 8px !important;
            right: 8px !important;
            transform: scale(0.7);
            transform-origin: bottom right;
          }
        }
      `}</style>
    </div>
  );
}
