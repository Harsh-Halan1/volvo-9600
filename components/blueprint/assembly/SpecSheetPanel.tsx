'use client';

import React, { useState } from 'react';
import SpecRow from '../ui/SpecRow';
import { SPEC_DATA } from '../../../lib/blueprintSpecData';

/**
 * Engineering spec sheet panel.
 * Desktop: slides in from right as a side panel.
 * Mobile: collapsible bottom tab — collapsed by default, tap to expand.
 */
interface SpecSheetPanelProps {
  phase: number;
  isVisible: boolean;
  isMobile: boolean;
}

export default function SpecSheetPanel({ phase, isVisible, isMobile }: SpecSheetPanelProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const spec = SPEC_DATA[phase];
  if (!spec) return null;

  const accentColor = phase <= 2 ? 'var(--accent-blueprint)' : 'var(--accent-amber)';

  if (isMobile) {
    return (
      <>
        {/* Collapsed tab — always visible during assembly */}
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          style={{
            position: 'fixed',
            bottom: mobileExpanded ? '40vh' : '0',
            left: 0,
            right: 0,
            zIndex: 7,
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(10, 22, 40, 0.92)',
            backdropFilter: 'blur(12px)',
            borderTop: `1px solid ${accentColor}`,
            border: 'none',
            borderTopWidth: '2px',
            borderTopStyle: 'solid',
            borderTopColor: accentColor,
            cursor: 'pointer',
            transition: 'bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-label={mobileExpanded ? 'Collapse spec sheet' : 'Expand spec sheet'}
        >
          <span
            style={{
              fontFamily: 'var(--font-blueprint)',
              fontSize: '9px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.15em',
            }}
          >
            SPEC SHEET · {spec.ref}
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            style={{
              transform: mobileExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path d="M2 6 L5 3 L8 6" />
          </svg>
        </button>

        {/* Expanded drawer */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40vh',
            zIndex: 6,
            background: 'rgba(10, 22, 40, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: `2px solid ${accentColor}`,
            transform: mobileExpanded ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Content */}
          <div style={{ padding: '12px 16px', overflowY: 'auto', flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-blueprint)',
                fontSize: '10px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.15em',
                marginBottom: '8px',
              }}
            >
              COMPONENT SPEC SHEET — REF: {spec.ref}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {spec.entries.map((entry) => (
                  <SpecRow key={entry.key} label={entry.key} value={entry.value} />
                ))}
              </tbody>
            </table>
            {spec.remarks && (
              <div
                style={{
                  marginTop: '8px',
                  padding: '6px 8px',
                  borderTop: '1px solid rgba(100, 160, 220, 0.1)',
                  fontFamily: 'var(--font-blueprint)',
                  fontSize: '9px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                REMARKS: {spec.remarks}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Desktop: right side panel
  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: `translateY(-50%) translateX(${isVisible ? '0' : '500px'})`,
        width: '340px',
        zIndex: 5,
        background: 'rgba(100, 160, 220, 0.06)',
        border: '1px solid var(--border-blueprint)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '2px', background: accentColor }} />

      {/* Header */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(100, 160, 220, 0.1)',
          fontFamily: 'var(--font-blueprint)',
          fontSize: '10px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.15em',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>COMPONENT SPEC SHEET</span>
        <span>REF: {spec.ref}</span>
      </div>

      {/* Spec table */}
      <div style={{ padding: '8px 16px 16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {spec.entries.map((entry) => (
              <SpecRow key={entry.key} label={entry.key} value={entry.value} />
            ))}
          </tbody>
        </table>
        {spec.remarks && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px',
              borderTop: '1px dashed rgba(100, 160, 220, 0.15)',
              fontFamily: 'var(--font-blueprint)',
              fontSize: '9px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            REMARKS: {spec.remarks}
          </div>
        )}

        {/* Verified stamp */}
        <div
          style={{
            marginTop: '8px',
            padding: '6px 8px',
            borderTop: '1px solid rgba(100, 160, 220, 0.1)',
            fontFamily: 'var(--font-blueprint)',
            fontSize: '8px',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.12em',
          }}
        >
          VERIFIED — SURENDRA &amp; CO. QC DEPT.
        </div>
      </div>
    </div>
  );
}
