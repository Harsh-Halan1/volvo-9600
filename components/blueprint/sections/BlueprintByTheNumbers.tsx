'use client';

import React from 'react';
import StatCounter from '../ui/StatCounter';

/**
 * By the Numbers — engineering-table-styled stat cards.
 * 4 stats with animated counters: Years, Coaches, Revenue, Berths.
 */
export default function BlueprintByTheNumbers() {
  const stats = [
    { value: 25, suffix: '+', label: 'YEARS IN OPERATION', sublabel: 'EST. 2000 · BAREJA, AHMEDABAD' },
    { value: 500, suffix: '+', label: 'COACHES DELIVERED', sublabel: 'PAN-INDIA FLEET OPERATIONS' },
    { value: 800, suffix: 'Cr', prefix: '₹', label: 'REVENUE GENERATED', sublabel: 'ACROSS ALL OPERATIONS' },
    { value: 40, suffix: '', label: 'BERTHS PER COACH', sublabel: 'DOUBLE DECK SLEEPER CONFIG' },
  ];

  return (
    <section
      id="by-the-numbers"
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'var(--bg-base)',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '48px' }}>
          <div
            style={{
              fontFamily: 'var(--font-blueprint)',
              fontSize: '10px',
              color: 'var(--accent-blueprint)',
              letterSpacing: '0.3em',
              marginBottom: '12px',
            }}
          >
            SC-STATS-001
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            BUILT OVER DECADES
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
            }}
          >
            The figures behind 25 years of engineering.
          </p>
        </div>

        {/* Stat cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="chamfer-tl"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-amber)',
                padding: '32px 24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Faint diagonal amber watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '120px',
                  height: '120px',
                  background: 'var(--accent-amber)',
                  opacity: 0.03,
                  transform: 'rotate(45deg)',
                  pointerEvents: 'none',
                }}
              />

              {/* Number */}
              <div
                style={{
                  fontSize: 'clamp(48px, 8vw, 80px)',
                  color: 'var(--accent-amber)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                <StatCounter
                  endValue={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              {/* Thin amber rule */}
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: 'rgba(200, 133, 26, 0.25)',
                  margin: '12px 0',
                }}
              />

              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-blueprint)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                  marginBottom: '4px',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-blueprint)',
                  fontSize: '9px',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.05em',
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
