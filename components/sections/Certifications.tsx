"use client";

import React from "react";
import { Shield, Award, CheckCircle, Star } from "lucide-react";

interface Cert {
  code: string;
  name: string;
  issuer: string;
  icon: React.ReactNode;
  color: string;
}

const CERTIFICATIONS: Cert[] = [
  {
    code: "AIS 052",
    name: "Body Code Compliance",
    issuer: "Ministry of Road Transport & Highways, Govt. of India",
    icon: <Shield size={36} />,
    color: "#C8851A",
  },
  {
    code: "BS VI / Euro VI",
    name: "Emission Compliance",
    issuer: "Volvo Engine-Level Certification · BS VI Certified",
    icon: <CheckCircle size={36} />,
    color: "#3A7FBF",
  },
  {
    code: "ISO 9001",
    name: "Quality Management",
    issuer: "International Organization for Standardization",
    icon: <Award size={36} />,
    color: "#8B5CF6",
  },
  {
    code: "RTO Compliant",
    name: "Full Pre-Delivery Inspection",
    issuer: "Regional Transport Office Documentation · All States",
    icon: <Star size={36} />,
    color: "#C8851A",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "#152030" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] text-[#C8851A] tracking-[0.4em] uppercase mb-4">
            Certifications &amp; Compliance
          </p>
          <h2
            className="font-barlow font-black text-[#EDE8DF] leading-none"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            Built to Every Standard.
          </h2>
          <p className="font-body text-[15px] text-[#8A9BAB] mt-4 max-w-xl mx-auto">
            For fleet buyers and institutional procurement, compliance is non-negotiable.
            Every Surendra coach meets the full spectrum.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.code}
              className="glass-card p-7 flex items-start gap-5 group"
              style={{ borderLeft: `3px solid ${cert.color}30` }}
            >
              {/* Icon */}
              <div
                className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${cert.color}12`,
                  color: cert.color,
                  boxShadow: `0 0 20px ${cert.color}15`,
                }}
              >
                {cert.icon}
              </div>

              {/* Text */}
              <div>
                <h3
                  className="font-barlow font-bold text-[#EDE8DF] leading-tight mb-1"
                  style={{ fontSize: "22px" }}
                >
                  {cert.code}
                </h3>
                <p className="font-body text-[14px] text-[#8A9BAB] mb-2">
                  {cert.name}
                </p>
                <p className="font-mono text-[10px] text-[#556A7A] tracking-[0.05em] leading-relaxed">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center font-body text-[13px] text-[#556A7A] mt-10 leading-relaxed max-w-2xl mx-auto">
          All vehicles are subject to full pre-delivery inspection and arrive with complete
          RTO documentation — ready for immediate fleet deployment.
        </p>
      </div>
    </section>
  );
}
