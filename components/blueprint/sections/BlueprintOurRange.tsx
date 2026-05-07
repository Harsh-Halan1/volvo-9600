'use client';

import React from 'react';

interface CoachData {
  name: string;
  type: string;
  features: string[];
  formValue: string;
  length: string;
}

const COACHES: CoachData[] = [
  { name: 'LUXURY SLEEPER COACH', type: 'SC-TYPE-01 · VOLVO B11R', features: ['40 Premium Berths', 'Dual-Deck Layout', 'AIS 052 Compliant'], formValue: 'Luxury Sleeper', length: '12,640mm' },
  { name: 'SEMI-SLEEPER COACH', type: 'SC-TYPE-02 · 2+1 CONFIG', features: ['2+1 Reclining Seats', 'Premium Comfort', 'Long-Route Optimised'], formValue: 'Semi-Sleeper', length: '12,200mm' },
  { name: 'SEATER COACH', type: 'SC-TYPE-03 · STANDARD', features: ['High-Density Seating', 'Day-Route Ready', 'Cost Efficient'], formValue: 'Seater Coach', length: '10,800mm' },
  { name: 'SCHOOL / INSTITUTIONAL BUS', type: 'SC-TYPE-04 · CUSTOM', features: ['Safety Priority Design', 'GPS Tracking Ready', 'Custom Livery'], formValue: 'School/Institutional', length: '9,200mm' },
];

function BusSilhouetteSVG({ length }: { length: string }) {
  return (
    <svg width="240" height="72" viewBox="0 0 240 72" fill="none">
      <path d="M 12 56 L 12 20 Q 12 12, 24 12 L 216 12 Q 228 12, 228 20 L 228 56 L 12 56 Z" stroke="rgba(100,160,220,0.6)" strokeWidth="1" />
      <rect x="16" y="16" width="40" height="16" stroke="rgba(100,160,220,0.4)" strokeWidth="0.5" fill="none" rx="1" />
      <rect x="62" y="16" width="160" height="16" stroke="rgba(100,160,220,0.4)" strokeWidth="0.5" fill="none" rx="1" />
      <circle cx="40" cy="60" r="8" stroke="rgba(100,160,220,0.6)" strokeWidth="1" fill="none" />
      <circle cx="40" cy="60" r="4" stroke="rgba(100,160,220,0.3)" strokeWidth="0.5" fill="none" />
      <circle cx="200" cy="60" r="8" stroke="rgba(100,160,220,0.6)" strokeWidth="1" fill="none" />
      <circle cx="200" cy="60" r="4" stroke="rgba(100,160,220,0.3)" strokeWidth="0.5" fill="none" />
      <text x="120" y="71" fill="rgba(100,160,220,0.5)" fontSize="5" fontFamily="var(--font-blueprint)" textAnchor="middle">{length}</text>
    </svg>
  );
}

export default function BlueprintOurRange() {
  const handleSpecRequest = (coachType: string) => {
    const el = document.getElementById('commission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const select = document.getElementById('coach-type-select') as HTMLSelectElement | null;
        const textarea = document.getElementById('requirements-textarea') as HTMLTextAreaElement | null;
        if (select) select.value = coachType;
        if (textarea) textarea.value = `Request full specification sheet for ${coachType}`;
      }, 800);
    }
  };

  return (
    <section id="our-range" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-surface)', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--accent-blueprint)', letterSpacing: '0.3em', marginBottom: '12px' }}>SC-RANGE-002</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '12px' }}>EVERY COACH. ENGINEERED HERE.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px' }}>From luxury sleeper to institutional transport — built to your specification.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {COACHES.map((coach, i) => (
            <div key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-blueprint)', overflow: 'hidden', transition: 'border-color 0.3s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,158,232,0.5)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,158,232,0.25)'; }}>
              <div style={{ background: 'rgba(10,22,40,0.8)', padding: '24px 16px', borderBottom: '1px solid var(--border-blueprint)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                <BusSilhouetteSVG length={coach.length} />
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '4px' }}>{coach.name}</h3>
                <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--accent-blueprint)', letterSpacing: '0.1em', marginBottom: '12px' }}>{coach.type}</div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(100,160,220,0.1)', margin: '12px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  {coach.features.map((f, fi) => (
                    <div key={fi} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>▸ {f}</div>
                  ))}
                </div>
                <div style={{ width: '100%', height: '1px', background: 'rgba(100,160,220,0.1)', margin: '12px 0' }} />
                <button onClick={() => handleSpecRequest(coach.formValue)}
                  style={{ background: 'none', border: 'none', fontFamily: 'var(--font-blueprint)', fontSize: '11px', color: 'var(--accent-blueprint)', letterSpacing: '0.1em', cursor: 'pointer', padding: '0', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--accent-amber)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--accent-blueprint)'; }}>
                  [ REQUEST SPEC SHEET → ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
