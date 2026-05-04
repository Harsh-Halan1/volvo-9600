"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel?: string;
}

const STATS: StatItem[] = [
  { value: 25, suffix: "+", label: "Years",   sublabel: "In Operation"         },
  { value: 500, suffix: "+", label: "Coaches", sublabel: "Delivered Across India" },
  { value: 800, prefix: "₹", suffix: "Cr", label: "Revenue", sublabel: "Total Fleet Value" },
  { value: 40, label: "Berths",  sublabel: "Per Premium Coach"    },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, reveal }: { stat: StatItem; reveal: boolean }) {
  const count = useCountUp(stat.value, 1800, reveal);
  return (
    <div
      className="glass-card flex flex-col items-center text-center p-8 md:p-10 transition-all duration-500"
      style={{
        opacity: reveal ? 1 : 0,
        transform: reveal ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <p
        className="font-barlow font-black leading-none mb-3"
        style={{ fontSize: "clamp(52px, 7vw, 72px)", color: "#C8851A" }}
      >
        {stat.prefix ?? ""}{count}{stat.suffix ?? ""}
      </p>
      <p className="font-body font-medium text-[14px] uppercase tracking-[0.15em] text-[#8A9BAB]">
        {stat.label}
      </p>
      {stat.sublabel && (
        <p className="font-mono text-[10px] text-[#556A7A] tracking-[0.1em] uppercase mt-1">
          {stat.sublabel}
        </p>
      )}
    </div>
  );
}

export default function ByTheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="by-the-numbers"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "#0D1A24" }}
    >
      {/* Top amber gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, #C8851A, transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] text-[#C8851A] tracking-[0.4em] uppercase mb-4">
            Built Over Decades
          </p>
          <h2
            className="font-barlow font-black text-[#EDE8DF] leading-none"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            The Numbers Don&apos;t Lie
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <StatCard stat={stat} reveal={revealed} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
