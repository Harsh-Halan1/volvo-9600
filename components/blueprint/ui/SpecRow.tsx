'use client';

import React from 'react';

interface SpecRowProps {
  label: string;
  value: string;
}

export default function SpecRow({ label, value }: SpecRowProps) {
  return (
    <tr>
      <td
        style={{
          padding: '6px 8px',
          borderBottom: '1px solid rgba(100, 160, 220, 0.1)',
          color: 'var(--text-tertiary)',
          whiteSpace: 'nowrap',
          width: '110px',
          fontSize: '10px',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-blueprint)',
          verticalAlign: 'top',
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: '6px 8px',
          borderBottom: '1px solid rgba(100, 160, 220, 0.1)',
          color: 'var(--text-primary)',
          fontSize: '11px',
          fontFamily: 'var(--font-blueprint)',
          verticalAlign: 'top',
        }}
      >
        {value}
      </td>
    </tr>
  );
}
