"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Briefcase,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-30px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export default function ConversionSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ fullName: "", email: "", company: "", message: "" });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to submit form. Please try again later."
      );
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════════
          CONVERSION SECTION — "Start Your Build"
          ══════════════════════════════════════════════ */}
      <section
        id="contact-section"
        className="relative w-full min-h-screen flex items-center justify-center bg-[#0A0F1A] py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      >
        {/* Ambient orbs */}
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[180px] pointer-events-none orb-animate" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#06B6D4]/4 blur-[150px] pointer-events-none orb-animate-reverse" />

        <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Left: Copy ── */}
          <motion.div
            className="flex flex-col justify-center"
            {...fadeInUp}
          >
            <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#D4AF37] mb-4">
              Commission
            </p>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[0.9] mb-6">
              Start Your
              <br />
              <span className="text-gradient-gold">Build.</span>
            </h2>
            <p className="text-lg text-white/40 leading-relaxed mb-10 max-w-md font-medium">
              Ready to commission a custom coach? Connect with Surendra & Co.
              to discuss your requirements, fleet specifications, and get a
              detailed quote.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-6 text-xs text-white/20 uppercase tracking-[0.2em] font-bold">
              <span>Custom-Built</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span>Durable</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span>Premium</span>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            className="glass-card-strong p-8 md:p-12 rounded-3xl"
            {...fadeInUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          >
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Full Name */}
              <div className="floating-field">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder=" "
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
                <label htmlFor="fullName">Full Name</label>
              </div>

              {/* Email */}
              <div className="floating-field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                <label htmlFor="email">Work Email</label>
              </div>

              {/* Company */}
              <div className="floating-field">
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder=" "
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
                <label htmlFor="company">Company</label>
              </div>

              {/* Message */}
              <div className="floating-field">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none"
                />
                <label htmlFor="message">Requirements</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-[#D4AF37] hover:bg-[#E8C547] text-[#0A0F1A] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm tracking-wide uppercase"
              >
                {status === "idle" && (
                  <>
                    <span>Request Consultation</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
                {status === "loading" && (
                  <div className="loading-spinner" />
                )}
                {status === "success" && (
                  <>
                    <span>Sent Successfully</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
                {status === "error" && <span>Try Again</span>}
              </button>

              {/* Status Messages */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm mt-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>
                    We&apos;ve received your request and will be in touch shortly.
                  </span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer className="relative w-full bg-[#060810] py-16 md:py-20 border-t border-white/5 overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
          {/* Brand */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-lg shadow-[#D4AF37]/5 hover:scale-105 transition-transform duration-500">
                <Image
                  src="/Logo.png"
                  alt="Surendra & Co. Logo"
                  fill
                  className="object-contain p-2.5"
                />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-wider text-gradient-gold">
                  SURENDRA & CO.
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Briefcase size={12} className="text-[#D4AF37]/60" />
                  <p className="text-[#D4AF37]/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Coach Body Builders
                  </p>
                </div>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed border-l-2 border-[#D4AF37]/20 pl-4 font-medium">
              Specialists in all types of coach body building. Delivering
              premium quality, innovative design, and unmatched durability for
              commercial travel.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#D4AF37] inline-block rounded-full" />
              Contact Us
            </h4>

            <div className="flex flex-col gap-4 mt-1">
              <a
                href="tel:+919825039111"
                className="flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/15 group-hover:text-[#D4AF37] transition-all border border-white/5">
                  <Phone size={16} />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  +91 98250 39111
                </span>
              </a>

              <a
                href="mailto:surendra_bareja@yahoo.com"
                className="flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/15 group-hover:text-[#D4AF37] transition-all border border-white/5">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  surendra_bareja@yahoo.com
                </span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-5 max-w-xs">
            <h4 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#D4AF37] inline-block rounded-full" />
              Location
            </h4>

            <div className="flex items-start gap-4 text-white/40 mt-1 group">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-0.5 group-hover:bg-[#D4AF37]/15 group-hover:text-[#D4AF37] transition-all duration-300">
                <MapPin size={16} />
              </div>
              <div className="text-sm leading-relaxed space-y-0.5 font-semibold group-hover:text-white/50 transition-colors">
                <p>N. H. No. 8, Near APMC Market</p>
                <p>Bareja – 382425</p>
                <p>Taluka: Daskroi</p>
                <p>District: Ahmedabad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-xs text-white/20 font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} Surendra & Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/20 font-semibold">
            <span className="hover:text-white/40 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white/40 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
