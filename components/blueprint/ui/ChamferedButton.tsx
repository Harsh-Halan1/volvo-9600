'use client';

import React from 'react';

interface ChamferedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'blueprint' | 'amber';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function ChamferedButton({
  children,
  onClick,
  type = 'button',
  variant = 'blueprint',
  fullWidth = false,
  disabled = false,
  className = '',
}: ChamferedButtonProps) {
  const isAmber = variant === 'amber';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 24px',
        fontFamily: 'var(--font-blueprint)',
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        color: isAmber ? 'var(--bg-base)' : 'var(--text-primary)',
        background: isAmber
          ? 'linear-gradient(135deg, var(--accent-amber), var(--accent-amber-l))'
          : 'transparent',
        border: `1px solid ${isAmber ? 'var(--accent-amber)' : 'var(--border-blueprint)'}`,
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </button>
  );
}
