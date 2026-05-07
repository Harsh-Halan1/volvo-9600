'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GanttBarProps {
  /** Width as percentage 0-100 */
  widthPercent: number;
  /** Left offset as percentage 0-100 */
  leftPercent: number;
  delay?: number;
  label: string;
}

export default function GanttBar({ widthPercent, leftPercent, delay = 0, label }: GanttBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '16px' }}>
      <div
        style={{
          position: 'absolute',
          left: `${leftPercent}%`,
          width: visible ? `${widthPercent}%` : '0%',
          height: '16px',
          borderRadius: '3px',
          background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-amber-l))',
          transformOrigin: 'left center',
          transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
        title={label}
      />
    </div>
  );
}
