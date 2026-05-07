'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  endValue: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function StatCounter({
  endValue,
  suffix = '',
  prefix = '',
  duration = 2000,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * endValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [endValue, duration]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
      {prefix}{count}{suffix}
    </span>
  );
}
