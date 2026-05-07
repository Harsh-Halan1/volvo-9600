'use client';

import React from 'react';

const CERTS = [
  { name: 'AIS 052', subtitle: 'COACH BODY STANDARD', issuer: 'Ministry of Road Transport & Highways', body: 'Government of India', detail: 'Coach Body Code Compliance' },
  { name: 'BS VI', subtitle: 'EMISSION COMPLIANCE', issuer: 'Central Pollution Control Board', body: 'Government of India', detail: 'Euro VI Equivalent Standard' },
  { name: 'ISO 9001', subtitle: 'QUALITY MANAGEMENT', issuer: 'International Organization', body: 'for Standardization', detail: 'Quality Management System' },
  { name: 'BIS', subtitle: 'CERTIFICATION', issuer: 'Bureau of Indian Standards', body: 'Government of India', detail: 'Product Safety Certification' },
];

export default function BlueprintCertifications() {
  return (
    <section id="certifications" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-surface)', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--accent-blueprint)', letterSpacing: '0.3em', marginBottom: '12px' }}>SC-COMPLIANCE-004</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>CERTIFIED TO EVERY STANDARD.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {CERTS.map((cert, i) => (
            <div key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-amber)', padding: '24px', position: 'relative' }}>
              {/* Double-border stamp */}
              <div style={{ boxShadow: 'inset 0 0 0 4px var(--bg-surface), inset 0 0 0 6px rgba(200,133,26,0.3)', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '28px', color: 'var(--accent-amber)', letterSpacing: '0.05em' }}>{cert.name}</div>
                <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.15em', marginTop: '4px' }}>{cert.subtitle}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'center' }}>
                <div>{cert.issuer}</div>
                <div>{cert.body}</div>
                <div style={{ color: 'var(--text-tertiary)', marginTop: '4px' }}>{cert.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px', maxWidth: '700px', margin: '40px auto 0' }}>
          All vehicles are subject to full pre-delivery inspection and arrive with complete RTO documentation.
        </p>
      </div>
    </section>
  );
}
