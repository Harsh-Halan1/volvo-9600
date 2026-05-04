"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CraftCard {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  decorShape: "circle" | "diamond" | "triangle" | "hexagon";
}

const CRAFT_CARDS: CraftCard[] = [
  {
    number: "01",
    title: "Unyielding Framework",
    subtitle: "Structural Engineering",
    description:
      "Precision-welded high-tensile steel framework engineered for maximum safety and decades of endurance on India's most demanding highways. Every joint stress-tested to exceed AIS 052 standards.",
    gradient: "card-gradient-gold",
    accentColor: "#D4AF37",
    decorShape: "diamond",
  },
  {
    number: "02",
    title: "Seamless Integration",
    subtitle: "Chassis Mating",
    description:
      "Flawless fusion of Volvo B11R heavy-duty chassis with custom body architecture. 430HP engine, I-Shift transmission, and disc brakes — harmonized into a single engineering masterwork.",
    gradient: "card-gradient-cyan",
    accentColor: "#06B6D4",
    decorShape: "circle",
  },
  {
    number: "03",
    title: "Bespoke Architecture",
    subtitle: "Interior Design",
    description:
      "Custom-engineered floor plans designed for optimal passenger flow, thermal insulation, and acoustic isolation. Every millimeter mapped to maximize comfort across 40 premium berths.",
    gradient: "card-gradient-purple",
    accentColor: "#8B5CF6",
    decorShape: "hexagon",
  },
  {
    number: "04",
    title: "Handcrafted Luxury",
    subtitle: "Finishing & Detail",
    description:
      "Premium sleeper pods finished with Italian-grade upholstery, mood lighting systems, individual climate zones, and USB charging — uncompromising attention to every passenger touchpoint.",
    gradient: "card-gradient-amber",
    accentColor: "#F59E0B",
    decorShape: "triangle",
  },
];

function DecorShape({
  type,
  color,
}: {
  type: CraftCard["decorShape"];
  color: string;
}) {
  const base = "absolute top-8 right-8 pointer-events-none";

  switch (type) {
    case "circle":
      return (
        <div
          className={base}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            opacity: 0.1,
          }}
        />
      );
    case "diamond":
      return (
        <div
          className={base}
          style={{
            width: 100,
            height: 100,
            border: `2px solid ${color}`,
            transform: "rotate(45deg)",
            opacity: 0.1,
          }}
        />
      );
    case "triangle":
      return (
        <div
          className={base}
          style={{
            width: 0,
            height: 0,
            borderLeft: "60px solid transparent",
            borderRight: "60px solid transparent",
            borderBottom: `100px solid ${color}`,
            opacity: 0.08,
          }}
        />
      );
    case "hexagon":
      return (
        <svg
          className={base}
          width="120"
          height="120"
          viewBox="0 0 120 120"
          style={{ opacity: 0.08 }}
        >
          <polygon
            points="60,5 110,30 110,90 60,115 10,90 10,30"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      );
  }
}

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const track = trackRef.current;

      // Calculate how far left the track needs to move so its right edge meets the screen's right edge
      const getScrollAmount = () => -(track.offsetWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // The pin will last for exactly the width of the track
          end: () => `+=${track.offsetWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0F1A] overflow-hidden flex flex-col"
    >
      {/* Section heading */}
      <div className="shrink-0 px-8 md:px-16 pt-12 pb-6 z-10">
        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#D4AF37] mb-2">
          The Craft
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
          Deep Dive.
        </h2>
      </div>

      {/* Wrapper to isolate the track from flex layout constraints */}
      <div className="relative flex-1 w-full">
        {/* The Track: Absolutely positioned with max-content width to prevent any crushing by parent elements */}
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-6 md:gap-8 px-[5vw]"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {CRAFT_CARDS.map((card, i) => (
            <div
              key={card.number}
              className={`
                relative flex-shrink-0
                w-[85vw] md:w-[60vw] lg:w-[48vw]
                h-[65vh]
                rounded-3xl ${card.gradient} glass-card-strong
                p-10 md:p-14 flex flex-col justify-between overflow-hidden group
              `}
            >
              {/* Decorative shape */}
              <DecorShape type={card.decorShape} color={card.accentColor} />

              {/* Accent top bar */}
              <div
                className="absolute top-0 left-10 w-16 h-[3px] rounded-full"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* Top: Number + Subtitle + Title */}
              <div>
                <div className="flex items-baseline gap-4 mb-6">
                  <span
                    className="text-7xl md:text-8xl font-extrabold tracking-tighter leading-none"
                    style={{ color: card.accentColor, opacity: 0.25 }}
                  >
                    {card.number}
                  </span>
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/40">
                    {card.subtitle}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-[1.1] mb-6">
                  {card.title}
                </h3>
              </div>

              {/* Bottom: Description + Progress dots */}
              <div>
                <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl font-medium">
                  {card.description}
                </p>

                {/* Progress indicator */}
                <div className="flex items-center gap-3 mt-8">
                  {CRAFT_CARDS.map((_, j) => (
                    <div
                      key={j}
                      className="h-[2px] rounded-full"
                      style={{
                        width: j === i ? 40 : 16,
                        backgroundColor:
                          j === i
                            ? card.accentColor
                            : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Background glow orb */}
              <div
                className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-700"
                style={{ backgroundColor: card.accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
