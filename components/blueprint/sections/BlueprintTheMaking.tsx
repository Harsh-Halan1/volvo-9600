'use client';

import React from 'react';
import GanttBar from '../ui/GanttBar';

const STEPS = [
  {
    num: '01',
    title: 'DESIGN & CONSULTATION',
    weeks: 'Weeks 1-2',
    left: 0,
    width: 12.5,
    desc: 'We begin with your requirements — route type, passenger load, comfort tier, and customizations. Engineers produce a detailed floor plan and specification sheet before any fabrication begins.',
  },
  {
    num: '02',
    title: 'CHASSIS FABRICATION',
    weeks: 'Weeks 3-8',
    left: 12.5,
    width: 37.5,
    desc: 'The Volvo chassis arrives. Our structural team builds the steel cage — every weld, every joint to AIS 052 specification. This is the foundation everything else is built upon.',
  },
  {
    num: '03',
    title: 'INTERIOR FIT-OUT & FINISHING',
    weeks: 'Weeks 9-14',
    left: 50,
    width: 37.5,
    desc: 'Berths, upholstery, flooring, AC systems, electrical, and exterior panels are installed simultaneously. Your livery is applied to the finished exterior.',
  },
  {
    num: '04',
    title: 'QC INSPECTION & DELIVERY',
    weeks: 'Weeks 15-16',
    left: 87.5,
    width: 12.5,
    desc: 'Full structural integrity test, road-load simulation, electrical systems check, and RTO documentation. Coach is then transported to your depot.',
  },
];

export default function BlueprintTheMaking() {
  return (
    <section id="the-making" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-base)', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--accent-blueprint)', letterSpacing: '0.3em', marginBottom: '12px' }}>SC-PROCESS-003</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '12px' }}>FROM ORDER TO ROAD.</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '500px' }}>A 16-week journey, hand-built in Ahmedabad.</p>
        </div>

        {/* Week markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '0 4px' }}>
          {[1, 4, 8, 12, 16].map((w) => (
            <span key={w} style={{ fontFamily: 'var(--font-blueprint)', fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>W{String(w).padStart(2, '0')}</span>
          ))}
        </div>

        {/* Gantt bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {STEPS.map((step, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-blueprint)', fontSize: '10px', color: 'var(--text-tertiary)' }}>{step.num}.</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>{step.title}</span>
              </div>
              <GanttBar widthPercent={step.width} leftPercent={step.left} delay={i * 200} label={step.title} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontFamily: 'var(--font-blueprint)', fontSize: '9px', color: 'var(--text-tertiary)' }}>{step.weeks}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '8px', maxWidth: '700px' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
