"use client";

import React, { useEffect, useRef, useState } from "react";
import { Ruler, Wrench, Layers, ShieldCheck } from "lucide-react";

interface Step {
  number: string;
  title: string;
  timeline: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Design & Consultation",
    timeline: "Week 1–2",
    icon: <Ruler size={24} />,
    description:
      "We begin with your requirements — route type, passenger load, comfort tier, and any customisations. Our engineers produce a detailed floor plan and specification sheet before a single frame is cut.",
  },
  {
    number: "02",
    title: "Fabrication",
    timeline: "Week 3–8",
    icon: <Wrench size={24} />,
    description:
      "The chassis arrives from Volvo. Our structural team begins the steel cage — every weld, every joint performed to AIS 052 specification. This phase produces the fundamental architecture of the coach.",
  },
  {
    number: "03",
    title: "Fit-Out & Finishing",
    timeline: "Week 9–14",
    icon: <Layers size={24} />,
    description:
      "Interior installation: berths, upholstery, flooring, electrical, AC systems, curtains, lighting. Simultaneously, exterior panels are fitted and painted to your specified livery.",
  },
  {
    number: "04",
    title: "QC & Delivery",
    timeline: "Week 15–16",
    icon: <ShieldCheck size={24} />,
    description:
      "Full quality control pass: structural integrity check, road-load simulation, electrical systems test, RTO documentation. Coach is transported to your depot — fully compliant, fully yours.",
  },
];

export default function TheMaking() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const [revealed,  setRevealed]  = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="the-making"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "#0D1A24" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] text-[#C8851A] tracking-[0.4em] uppercase mb-4">
            The Process
          </p>
          <h2
            className="font-barlow font-black text-[#EDE8DF] leading-none"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            From Order to Road.
          </h2>
        </div>

        {/* ── DESKTOP: Horizontal timeline ── */}
        <div className="hidden md:block">
          {/* Connecting line */}
          <div className="relative mb-12">
            <div
              className="h-[1px] bg-[rgba(200,133,26,0.12)] w-full"
              style={{ position: "relative" }}
            >
              <div
                ref={lineRef}
                className="absolute top-0 left-0 h-full"
                style={{
                  backgroundColor: "#C8851A",
                  width: revealed ? "100%" : "0%",
                  transition: "width 1.2s ease-out",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                }}
              >
                {/* Watermark step number */}
                <span
                  className="absolute -top-4 -right-2 font-barlow font-black select-none pointer-events-none leading-none"
                  style={{ fontSize: "96px", color: "#556A7A", opacity: 0.12 }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: "rgba(200,133,26,0.12)",
                    color: "#C8851A",
                  }}
                >
                  {step.icon}
                </div>

                {/* Timeline callout */}
                <p className="font-mono text-[10px] text-[#C8851A] tracking-[0.2em] uppercase relative z-10">
                  {step.timeline}
                </p>

                {/* Title */}
                <h3
                  className="font-barlow font-bold text-[#EDE8DF] leading-tight relative z-10"
                  style={{ fontSize: "20px" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[13px] text-[#8A9BAB] leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: Vertical timeline ── */}
        <div className="md:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              {/* Left: dot + line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(200,133,26,0.15)", color: "#C8851A" }}
                >
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="w-[1px] flex-1 mt-2"
                    style={{
                      backgroundColor: "#C8851A",
                      opacity: revealed ? 0.3 : 0,
                      transition: `opacity 0.6s ease ${i * 0.15 + 0.3}s`,
                      minHeight: "48px",
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div
                className="pb-8 flex flex-col gap-2"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
                }}
              >
                <p className="font-mono text-[10px] text-[#C8851A] tracking-[0.2em] uppercase">
                  {step.timeline}
                </p>
                <h3
                  className="font-barlow font-bold text-[#EDE8DF] leading-tight"
                  style={{ fontSize: "20px" }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-[13px] text-[#8A9BAB] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
