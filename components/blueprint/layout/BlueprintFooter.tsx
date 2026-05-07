'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Blueprint-styled footer.
 * Engineering separator + 3-column layout + bottom bar.
 */
export default function BlueprintFooter() {
  return (
    <footer
      style={{
        background: '#060810',
        padding: '0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Engineering separator */}
      <div
        style={{
          padding: '16px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-blueprint)',
          fontSize: '9px',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.2em',
          borderTop: '1px dashed rgba(100, 160, 220, 0.2)',
          borderBottom: '1px dashed rgba(100, 160, 220, 0.2)',
        }}
      >
        SC-VB11R-9600 SERIES · SURENDRA &amp; CO. · BAREJA, AHMEDABAD
      </div>

      {/* 3-Column content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          padding: '48px 24px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Column 1 — Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                border: '1px solid var(--border-amber)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'rgba(200, 133, 26, 0.05)',
              }}
            >
              <Image src="/Logo.png" alt="Surendra & Co." width={32} height={32} style={{ objectFit: 'contain' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)' }}>
              SURENDRA &amp; CO.
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-blueprint)',
              fontSize: '10px',
              color: 'var(--accent-amber)',
              letterSpacing: '0.25em',
              marginBottom: '12px',
            }}
          >
            COACH BODY BUILDERS
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Precision-engineered coaches, built by hand in Ahmedabad for over 25 years.
          </p>
        </div>

        {/* Column 2 — Contact */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-blueprint)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.2em',
              marginBottom: '16px',
            }}
          >
            GET IN TOUCH
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="tel:+919825039111"
              style={{
                fontFamily: 'var(--font-blueprint)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-amber)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 98250 39111
            </a>
            <a
              href="mailto:surendra_bareja@yahoo.com"
              style={{
                fontFamily: 'var(--font-blueprint)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-amber)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              surendra_bareja@yahoo.com
            </a>
          </div>
        </div>

        {/* Column 3 — Location */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-blueprint)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.2em',
              marginBottom: '16px',
            }}
          >
            FIND US
          </div>
          <a
            href="https://maps.google.com/?q=Bareja+Ahmedabad"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              lineHeight: '1.6',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-amber)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            N. H. No. 8, Near APMC Market, Bareja – 382425, Taluka Daskroi, District Ahmedabad
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderTop: '1px solid rgba(100, 160, 220, 0.1)',
          fontFamily: 'var(--font-blueprint)',
          fontSize: '10px',
          color: 'var(--text-tertiary)',
          flexWrap: 'wrap',
          gap: '8px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <span>© 2025 Surendra &amp; Co. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span>·</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
