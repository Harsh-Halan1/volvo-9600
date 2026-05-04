"use client";

import React from "react";

interface CoachType {
  name: string;
  spec: string;
  features: string[];
  accentColor: string;
  svgPath: string; // Simple SVG side-profile description
}

const COACH_TYPES: CoachType[] = [
  {
    name: "Luxury Sleeper Coach",
    spec: "2×1 berth · 40 premium sleepers",
    accentColor: "#C8851A",
    svgPath: "M",
    features: [
      "Volvo B11R Chassis",
      "Italian Leather Upholstery",
      "Dual-Zone Climate Control",
      "AIS 052 Certified",
    ],
  },
  {
    name: "Semi-Sleeper Coach",
    spec: "2+1 seating · Reclining seats",
    accentColor: "#3A7FBF",
    svgPath: "M",
    features: [
      "Volvo Chassis Platform",
      "Ergonomic Reclining Seats",
      "Overhead Storage Bays",
      "Reading Light Per Seat",
    ],
  },
  {
    name: "Seater Coach",
    spec: "Standard long-route day travel",
    accentColor: "#8B5CF6",
    svgPath: "M",
    features: [
      "Commercial Grade Chassis",
      "High-Back Cushioned Seats",
      "Panoramic Windows",
      "Luggage Compartment",
    ],
  },
  {
    name: "Institutional Bus",
    spec: "School · Corporate · Transport",
    accentColor: "#C8851A",
    svgPath: "M",
    features: [
      "Reinforced Safety Frame",
      "Emergency Exit Compliant",
      "Low Floor Entry Option",
      "GPS & Fleet Ready",
    ],
  },
];

// Simple SVG bus silhouette component
function BusSilhouette({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 280 100" className="w-full" style={{ height: "90px" }} aria-hidden>
      {/* Bus body */}
      <rect x="10" y="20" width="240" height="60" rx="8" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Windows */}
      {[30, 70, 110, 150, 190].map((x) => (
        <rect key={x} x={x} y="28" width="28" height="18" rx="3" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      ))}
      {/* Door */}
      <rect x="222" y="30" width="16" height="30" rx="2" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {/* Wheels */}
      <circle cx="65"  cy="82" r="14" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="65"  cy="82" r="7"  fill={color} fillOpacity="0.15" />
      <circle cx="195" cy="82" r="14" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="195" cy="82" r="7"  fill={color} fillOpacity="0.15" />
      {/* Front */}
      <rect x="250" y="25" width="16" height="50" rx="4" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Headlight */}
      <rect x="255" y="32" width="8" height="12" rx="2" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

export default function OurRange() {
  return (
    <section
      id="our-range"
      className="relative w-full py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "#152030" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] text-[#3A7FBF] tracking-[0.4em] uppercase mb-4">
            Our Range
          </p>
          <h2
            className="font-barlow font-black text-[#EDE8DF] leading-none"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Every Coach. Engineered Here.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {COACH_TYPES.map((coach) => (
            <div
              key={coach.name}
              className="glass-card flex flex-col overflow-hidden group cursor-default"
              style={{ padding: 0 }}
            >
              {/* Illustration area */}
              <div
                className="px-6 pt-6 pb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${coach.accentColor}08, transparent)`,
                  borderBottom: `1px solid ${coach.accentColor}20`,
                  height: "120px",
                }}
              >
                <BusSilhouette color={coach.accentColor} />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Title */}
                <div>
                  <h3
                    className="font-barlow font-bold text-[#EDE8DF] leading-tight"
                    style={{ fontSize: "19px" }}
                  >
                    {coach.name}
                  </h3>
                  <p className="font-body text-[13px] text-[#8A9BAB] mt-0.5">
                    {coach.spec}
                  </p>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-1.5 flex-1">
                  {coach.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: coach.accentColor }}
                      />
                      <span className="font-body text-[13px] text-[#8A9BAB]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() =>
                    document
                      .querySelector("#contact-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-2 w-full text-center font-body text-[13px] font-medium py-2 rounded-lg border transition-all duration-200 cursor-pointer"
                  style={{
                    color: coach.accentColor,
                    borderColor: `${coach.accentColor}30`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${coach.accentColor}12`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  Enquire Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
