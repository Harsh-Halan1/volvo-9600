"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Zap,
  Users,
  Award,
  TrendingUp,
  Quote,
  Gauge,
  Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ──────────────────────────────────────────────
// FEATURE FLAG: Toggle between image and gradient+icon modes
// Set to true for images, false for gradient+icon cards
// ──────────────────────────────────────────────
const USE_IMAGES = true;

// Counter animation hook
function useCounter(
  ref: React.RefObject<HTMLSpanElement | null>,
  target: number,
  prefix = "",
  suffix = ""
) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: target,
              duration: 2.5,
              ease: "power2.out",
              roundProps: "val",
              onUpdate: () => {
                el.innerText = `${prefix}${counter.val}${suffix}`;
              },
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, target, prefix, suffix]);
}

const fadeInUp = {
  initial: { opacity: 0, y: 50, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export default function BentoGrid() {
  const yearsRef = useRef<HTMLSpanElement>(null);
  const coachesRef = useRef<HTMLSpanElement>(null);
  const berthsRef = useRef<HTMLSpanElement>(null);
  const revenueRef = useRef<HTMLSpanElement>(null);

  useCounter(yearsRef, 25, "", "+");
  useCounter(coachesRef, 500, "", "+");
  useCounter(berthsRef, 40);
  useCounter(revenueRef, 800, "₹", " Cr+");

  return (
    <section className="relative w-full bg-[#0A0F1A] py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Section Header */}
      <motion.div className="max-w-7xl mx-auto mb-16 md:mb-20" {...fadeInUp}>
        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#D4AF37] mb-3">
          Specifications
        </p>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white leading-[0.95]">
          Built Different.
        </h2>
        <p className="text-lg text-white/40 mt-4 max-w-lg font-medium">
          Every specification engineered for the road. Every detail crafted for
          the passenger.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[300px]">
        {/* ── Card 1: Safety Standards (Large, spans 2 cols) ── */}
        <motion.div
          className="relative col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden group"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0 }}
        >
          {USE_IMAGES ? (
            <>
              <img
                src="/bento/framework.png"
                alt="Steel Framework"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/15 via-[#0A0F1A] to-[#D4AF37]/5" />
          )}
          <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-end">
            {!USE_IMAGES && (
              <Shield
                className="text-[#D4AF37] mb-4 opacity-60"
                size={36}
                strokeWidth={1.5}
              />
            )}
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
              AIS 052 Compliant
            </h3>
            <p className="text-sm text-white/50 font-medium max-w-md">
              Full compliance with Indian automotive safety standards. Rollover
              protection, crash-tested structures, and fire-retardant materials
              throughout.
            </p>
          </div>
          <div className="absolute top-6 right-6 z-10">
            <Shield
              className="text-[#D4AF37]/40"
              size={24}
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* ── Card 2: Chassis Specs ── */}
        <motion.div
          className="relative col-span-1 row-span-1 rounded-3xl overflow-hidden group"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
        >
          {USE_IMAGES ? (
            <>
              <img
                src="/bento/engine.png"
                alt="Volvo Engine"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/70 to-[#0A0F1A]/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/15 via-[#0A0F1A] to-[#06B6D4]/5" />
          )}
          <div className="relative z-10 h-full p-8 flex flex-col justify-end">
            {!USE_IMAGES && (
              <Gauge
                className="text-[#06B6D4] mb-3 opacity-60"
                size={32}
                strokeWidth={1.5}
              />
            )}
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#06B6D4] mb-1">
              Volvo B11R
            </p>
            <h3 className="text-xl font-extrabold tracking-tight text-white mb-1">
              430 HP
            </h3>
            <p className="text-xs text-white/40 font-medium">
              I-Shift · Disc Brakes · Euro VI
            </p>
          </div>
        </motion.div>

        {/* ── Card 3: Build Legacy (Counter) ── */}
        <motion.div
          className="relative col-span-1 row-span-1 glass-card-strong rounded-3xl overflow-hidden"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/8 to-transparent" />
          <div className="relative z-10 h-full p-8 flex flex-col justify-center items-start">
            <Award
              className="text-[#D4AF37]/50 mb-4"
              size={28}
              strokeWidth={1.5}
            />
            <span
              ref={yearsRef}
              className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gradient-gold leading-none"
            >
              0
            </span>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mt-2">
              Years of Excellence
            </p>
          </div>
        </motion.div>

        {/* ── Card 4: Interior Shot (Large, spans 2 cols) ── */}
        <motion.div
          className="relative col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden group"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        >
          {USE_IMAGES ? (
            <>
              <img
                src="/bento/interior.png"
                alt="Premium Interior"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/50 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/12 via-[#0A0F1A] to-[#F59E0B]/8" />
          )}
          <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-end">
            {!USE_IMAGES && (
              <Users
                className="text-[#8B5CF6] mb-3 opacity-60"
                size={32}
                strokeWidth={1.5}
              />
            )}
            <div className="flex items-baseline gap-3 mb-2">
              <span
                ref={berthsRef}
                className="text-4xl font-extrabold tracking-tighter text-white"
              >
                0
              </span>
              <span className="text-sm font-bold text-[#D4AF37]">
                Premium Berths
              </span>
            </div>
            <p className="text-sm text-white/50 font-medium max-w-md">
              Individual sleeper pods with mood lighting, climate zones, USB
              charging, and Italian-grade upholstery.
            </p>
          </div>
        </motion.div>

        {/* ── Card 5: Coaches Delivered ── */}
        <motion.div
          className="relative col-span-1 row-span-1 glass-card-strong rounded-3xl overflow-hidden"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/8 to-transparent" />
          <div className="relative z-10 h-full p-8 flex flex-col justify-center items-start">
            <Wrench
              className="text-[#06B6D4]/50 mb-4"
              size={28}
              strokeWidth={1.5}
            />
            <span
              ref={coachesRef}
              className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-none"
            >
              0
            </span>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mt-2">
              Coaches Delivered
            </p>
          </div>
        </motion.div>

        {/* ── Card 6: Revenue ── */}
        <motion.div
          className="relative col-span-1 row-span-1 glass-card-strong rounded-3xl overflow-hidden"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#F59E0B]/5" />
          <div className="relative z-10 h-full p-8 flex flex-col justify-center items-start">
            <TrendingUp
              className="text-[#D4AF37]/50 mb-4"
              size={28}
              strokeWidth={1.5}
            />
            <span
              ref={revenueRef}
              className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gradient-gold leading-none"
            >
              ₹0
            </span>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mt-2">
              Revenue Generated
            </p>
          </div>
        </motion.div>

        {/* ── Card 7: Highway Beauty (full width) ── */}
        <motion.div
          className="relative col-span-1 md:col-span-2 lg:col-span-4 row-span-1 rounded-3xl overflow-hidden group"
          {...fadeInUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.35 }}
        >
          {USE_IMAGES ? (
            <>
              <img
                src="/bento/highway.png"
                alt="Coach on Highway"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A] via-[#0A0F1A]/40 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#0A0F1A] to-[#06B6D4]/8" />
          )}
          <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-center max-w-xl">
            {!USE_IMAGES && (
              <Quote
                className="text-[#D4AF37]/30 mb-4"
                size={40}
                strokeWidth={1}
              />
            )}
            <blockquote className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug italic">
              &ldquo;We don&apos;t build coaches.
              <br />
              We engineer experiences.&rdquo;
            </blockquote>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37]/60 mt-4">
              — The Surendra & Co. Philosophy
            </p>
          </div>
        </motion.div>
      </div>

      {/* Ambient background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/3 blur-[200px] pointer-events-none" />
    </section>
  );
}
