'use client';

import React, { useState } from 'react';
import ChamferedButton from '../ui/ChamferedButton';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function BlueprintCommissionForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      email: (form.elements.namedItem('workEmail') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      coachType: (form.elements.namedItem('coachType') as HTMLSelectElement).value,
      requirements: (form.elements.namedItem('requirements') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setFormState('success');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setFormState('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: 'var(--bg-elevated)',
    border: '1px solid rgba(200, 133, 26, 0.20)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-blueprint)',
    fontSize: '12px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-blueprint)',
    fontSize: '10px',
    color: 'var(--text-tertiary)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '4px',
    display: 'block',
  };

  return (
    <section id="commission" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-base)', padding: '80px 24px', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div className="glow-blueprint" style={{ top: '-200px', left: '-200px' }} />
      <div className="glow-amber" style={{ bottom: '-200px', right: '-200px' }} />

      {/* Blueprint callback strip */}
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.15em', marginBottom: '40px', padding: '12px 0', borderTop: '1px dashed rgba(100,160,220,0.2)', borderBottom: '1px dashed rgba(100,160,220,0.2)' }}>
        DRAWING NO: [YOURS TO BE ASSIGNED] · SURENDRA &amp; CO. · BAREJA, AHD
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
        {/* Left column */}
        <div>
          <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--accent-amber)', letterSpacing: '0.3em', marginBottom: '12px' }}>COMMISSION</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px' }}>
            Start Your <span style={{ background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-amber-l))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Build.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '440px' }}>
            25 years of building coaches for India&apos;s roads. Every vehicle is commissioned individually — no assembly lines, no stock units. Tell us what you need.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
            {['Custom-Built to Specification', 'AIS 052 Fully Compliant', 'Volvo-Certified Chassis', 'Pan-India Delivery'].map((b) => (
              <div key={b} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>▸ {b}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="tel:+919825039111" style={{ fontFamily: 'var(--font-blueprint)', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>📞 +91 98250 39111</a>
            <a href="mailto:surendra_bareja@yahoo.com" style={{ fontFamily: 'var(--font-blueprint)', fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>✉ surendra_bareja@yahoo.com</a>
          </div>
        </div>

        {/* Right column — Form */}
        <div style={{ border: '1px solid var(--border-amber)', overflow: 'hidden' }}>
          {/* Form header bar */}
          <div style={{ background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-amber-l))', padding: '10px 16px', fontFamily: 'var(--font-blueprint)', fontSize: '11px', color: 'var(--bg-base)', letterSpacing: '0.1em' }}>
            COMMISSION REQUEST FORM · SC-CR-001
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input name="fullName" required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-amber)'; e.target.style.boxShadow = '0 0 0 2px rgba(200,133,26,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(200,133,26,0.20)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={labelStyle}>Work Email</label>
                <input name="workEmail" type="email" required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-amber)'; e.target.style.boxShadow = '0 0 0 2px rgba(200,133,26,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(200,133,26,0.20)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={labelStyle}>Company / Organisation</label>
                <input name="company" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-amber)'; e.target.style.boxShadow = '0 0 0 2px rgba(200,133,26,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(200,133,26,0.20)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input name="phone" type="tel" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-amber)'; e.target.style.boxShadow = '0 0 0 2px rgba(200,133,26,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(200,133,26,0.20)'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div>
                <label style={labelStyle}>Coach Type</label>
                <select name="coachType" id="coach-type-select" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-amber)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(200,133,26,0.20)'; }}>
                  <option value="">Select type...</option>
                  <option value="Luxury Sleeper">Luxury Sleeper</option>
                  <option value="Semi-Sleeper">Semi-Sleeper</option>
                  <option value="Seater Coach">Seater Coach</option>
                  <option value="School/Institutional">School / Institutional</option>
                  <option value="Other/Custom">Other / Custom</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Requirements</label>
                <textarea name="requirements" id="requirements-textarea" rows={4} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-amber)'; e.target.style.boxShadow = '0 0 0 2px rgba(200,133,26,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(200,133,26,0.20)'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              {formState === 'idle' && (
                <ChamferedButton type="submit" variant="amber" fullWidth>SUBMIT COMMISSION REQUEST →</ChamferedButton>
              )}
              {formState === 'loading' && (
                <ChamferedButton variant="amber" fullWidth disabled>PROCESSING...</ChamferedButton>
              )}
              {formState === 'success' && (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '13px', color: '#4ADE80', letterSpacing: '0.1em', marginBottom: '8px' }}>✓ REQUEST SUBMITTED</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>We&apos;ll be in touch within 1 business day.</div>
                </div>
              )}
              {formState === 'error' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '13px', color: '#F87171', marginBottom: '8px' }}>✕ SUBMISSION FAILED</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{errorMsg}</div>
                  <ChamferedButton onClick={() => setFormState('idle')} variant="amber" fullWidth>TRY AGAIN</ChamferedButton>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
