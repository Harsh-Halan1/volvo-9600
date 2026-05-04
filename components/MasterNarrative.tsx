"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
import ConversionSection from "./ConversionSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME_COUNT = 732;

const preloadImages = (): HTMLImageElement[] => {
  const images: HTMLImageElement[] = new Array(FRAME_COUNT);
  
  // Fast loading sequence: load every 10th frame first for quick keyframing, then fill gaps
  const sequence: number[] = [];
  for (let i = 1; i <= FRAME_COUNT; i += 10) sequence.push(i);
  for (let i = 1; i <= FRAME_COUNT; i++) {
    if ((i - 1) % 10 !== 0) sequence.push(i);
  }

  sequence.forEach((i) => {
    const img = new Image();
    const padded = i.toString().padStart(3, "0");
    img.src = `/assets/ezgif-frame-${padded}.jpg`;
    images[i - 1] = img; // 0-indexed
  });

  return images;
};

const CRAFT_CARDS = [
  {
    number: "01",
    title: "Unyielding Framework",
    subtitle: "Structural Engineering",
    description: "Precision-welded high-tensile steel framework engineered for maximum safety and decades of endurance.",
    accentColor: "#D4AF37",
  },
  {
    number: "02",
    title: "Seamless Integration",
    subtitle: "Chassis Mating",
    description: "Flawless fusion of Volvo B11R heavy-duty chassis with custom body architecture. 430HP engine.",
    accentColor: "#06B6D4",
  },
  {
    number: "03",
    title: "Bespoke Architecture",
    subtitle: "Interior Design",
    description: "Custom-engineered floor plans designed for optimal passenger flow, thermal insulation, and acoustic isolation.",
    accentColor: "#8B5CF6",
  },
  {
    number: "04",
    title: "Handcrafted Luxury",
    subtitle: "Finishing & Detail",
    description: "Premium sleeper pods finished with Italian-grade upholstery, mood lighting systems, and individual climate zones.",
    accentColor: "#F59E0B",
  },
];

export default function MasterNarrative() {
  const mainRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const introRef = useRef<HTMLElement>(null);
  const craftSectionRef = useRef<HTMLElement>(null);
  const bentoSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload frames
  useEffect(() => {
    const imgs = preloadImages();
    setImages(imgs);

    let loadedCount = 0;
    imgs.forEach((img) => {
      if (!img) return;
      const onLoad = () => {
        loadedCount++;
        // Unlock early for fast perceived performance
        if (loadedCount > 15) {
          setLoaded(true);
        }
      };
      if (img.complete) onLoad();
      else img.onload = onLoad;
    });

    setTimeout(() => setLoaded(true), 2000);
  }, []);

  useGSAP(
    () => {
      if (!loaded || !canvasRef.current || !mainRef.current || images.length === 0) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const drawFrame = (index: number) => {
        let img = images[index];
        
        // Nearest loaded frame fallback
        if (!img || !img.complete) {
          for (let i = index - 1; i >= 0; i--) {
            if (images[i] && images[i].complete) {
              img = images[i];
              break;
            }
          }
        }
        
        if (!img || !img.complete) return;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const cx = (canvas.width - img.width * ratio) / 2;
        const cy = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
      };

      const frameTracker = { frame: 0 };

      // Handle Resize
      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(Math.round(frameTracker.frame));
      };
      onResize(); // Initial sizing
      window.addEventListener("resize", onResize);

      if (images[0]?.complete) drawFrame(0);

      // ── 1. GLOBAL CANVAS TIMELINE ──
      // Scrubs frames 0 to 732 based on the entire scroll distance of mainRef
      gsap.to(frameTracker, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => drawFrame(Math.round(frameTracker.frame)),
      });

      // ── 2. INTRO OVERLAY ──
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      introTl.to(".intro-crafted", { scale: 1.5, opacity: 0, ease: "power1.inOut" });

      // ── 3. CRAFT HUD CARDS (BUS LAYOUT TRAVERSAL) ──
      const craftTl = gsap.timeline({
        scrollTrigger: {
          trigger: craftSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
      
      // Slide in from right
      craftTl.fromTo(".craft-bus-container", 
        { x: "150vw", opacity: 0.5 },
        { x: "0vw", opacity: 1, duration: 2, ease: "power3.out" }
      );
      // Hold in the center
      craftTl.to({}, { duration: 3 });
      // Slide out to left
      craftTl.to(".craft-bus-container", 
        { x: "-150vw", opacity: 0.5, duration: 2, ease: "power3.in" }
      );

      // ── 4. BENTO GRID BUS TRAVERSAL ──
      const bentoPieces = gsap.utils.toArray<HTMLElement>(".bento-piece");
      const bentoTl = gsap.timeline({
        scrollTrigger: {
          trigger: bentoSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
      
      // Fly in randomly from off-screen
      bentoTl.from(bentoPieces, {
        opacity: 0,
        z: 500,
        y: () => gsap.utils.random(-300, 300),
        x: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-15, 15),
        duration: 2,
        stagger: 0.1,
        ease: "power3.out"
      });
      // Hold in formation
      bentoTl.to({}, { duration: 2 });
      // Fly out (traverse past camera)
      bentoTl.to(bentoPieces, {
        opacity: 0,
        scale: 1.5,
        duration: 1.5,
        stagger: 0.05,
        ease: "power2.in"
      });

      return () => {
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: mainRef, dependencies: [loaded, images] }
  );

  return (
    <main ref={mainRef} className="relative w-full bg-[#0A0F1A]">
      {/* ── LOADING STATE ── */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0F1A]">
          <div className="relative mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
          </div>
          <p className="text-[#D4AF37]/60 text-sm font-semibold tracking-[0.3em] uppercase">
            Assembling Timeline
          </p>
        </div>
      )}

      {/* ── 1. GLOBAL BACKGROUND CANVAS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        {/* Subtle dark overlay so glassmorphic text is legible */}
        <div className="absolute inset-0 bg-[#0A0F1A]/30" />
      </div>

      {/* ── NAVIGATION BAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
            <img src="/Logo.png" alt="Surendra & Co." className="w-7 h-7 object-contain" />
          </div>
          <span className="text-sm font-bold tracking-wider text-white/80 hidden md:block">
            SURENDRA & CO.
          </span>
        </div>
        <button
          onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
          className="pointer-events-auto px-6 py-2.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-md text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.1)]"
        >
          Start Your Build
        </button>
      </nav>

      <div className="relative z-10 w-full flex flex-col pointer-events-none">
        {/* ── 2. INTRO OVERLAY ── */}
        <section ref={introRef} className="h-[150vh] flex flex-col items-center justify-center relative">
          <div className="intro-crafted absolute flex flex-col items-center">
             <p className="text-sm font-bold tracking-[0.5em] uppercase text-[#D4AF37] mb-6 drop-shadow-lg">
               Master Coachbuilders
             </p>
             <h1 className="text-[12vw] font-black text-white/80 tracking-tighter leading-none drop-shadow-2xl mix-blend-overlay">
               CRAFTED.
             </h1>
          </div>
        </section>

        {/* ── 3. CRAFTSMANSHIP HUD (BUS LAYOUT) ── */}
        <section ref={craftSectionRef} className="h-[400vh] relative">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
             <div className="craft-bus-container absolute w-full max-w-5xl aspect-auto md:aspect-[2.2/1] grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 px-4 md:px-12">
                
                {/* Handcrafted Luxury (Front) */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-center rounded-3xl md:rounded-tl-[80px] md:rounded-bl-3xl col-start-1 col-span-1 row-start-1 row-span-2 relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 left-10 w-16 h-[3px] rounded-full bg-[#F59E0B]" />
                   <span className="text-4xl font-black tracking-tighter text-[#F59E0B]/30 mb-2">01</span>
                   <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">Handcrafted Luxury</h3>
                   <p className="text-sm text-white/60 font-medium">Premium sleeper pods finished with Italian-grade upholstery, mood lighting systems, and individual climate zones.</p>
                </div>

                {/* Bespoke Architecture (Roof) */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-center rounded-3xl md:rounded-tr-[40px] md:rounded-bl-none col-start-2 col-span-2 row-start-1 row-span-1 relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 left-10 w-16 h-[3px] rounded-full bg-[#8B5CF6]" />
                   <div className="flex items-center gap-4 mb-2">
                     <span className="text-4xl font-black tracking-tighter text-[#8B5CF6]/30">02</span>
                     <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">Bespoke Architecture</h3>
                   </div>
                   <p className="text-sm text-white/60 font-medium max-w-lg">Custom-engineered floor plans designed for optimal passenger flow, thermal insulation, and acoustic isolation.</p>
                </div>

                {/* Unyielding Framework (Chassis) */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-center rounded-3xl md:rounded-b-[40px] md:rounded-t-md col-start-2 col-span-1 row-start-2 row-span-1 relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 left-10 w-16 h-[3px] rounded-full bg-[#D4AF37]" />
                   <span className="text-3xl font-black tracking-tighter text-[#D4AF37]/30 mb-1">03</span>
                   <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">Unyielding Framework</h3>
                   <p className="text-xs text-white/60 font-medium">Precision-welded high-tensile steel framework engineered for maximum safety and decades of endurance.</p>
                </div>

                {/* Seamless Integration (Engine) */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-center rounded-3xl md:rounded-br-[80px] md:rounded-tl-md col-start-3 col-span-1 row-start-2 row-span-1 relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 left-10 w-16 h-[3px] rounded-full bg-[#06B6D4]" />
                   <span className="text-3xl font-black tracking-tighter text-[#06B6D4]/30 mb-1">04</span>
                   <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">Seamless Integration</h3>
                   <p className="text-xs text-white/60 font-medium">Flawless fusion of Volvo B11R heavy-duty chassis with custom body architecture. 430HP engine.</p>
                </div>
             </div>
          </div>
        </section>

        {/* ── 4. BENTO GRID (BUS TRAVERSAL) ── */}
        <section ref={bentoSectionRef} className="h-[400vh] relative">
           <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 md:p-12 perspective-[1000px]">
              
              <div className="text-center mb-12 bento-piece opacity-0">
                <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#06B6D4] mb-3 drop-shadow-lg">
                  Specifications
                </p>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white drop-shadow-2xl">
                  Built Different.
                </h2>
              </div>

              {/* The Bus Grid */}
              <div className="w-full max-w-6xl aspect-auto md:aspect-[2.2/1] grid grid-cols-2 md:grid-cols-6 grid-rows-none md:grid-rows-4 gap-3 md:gap-4">
                 
                 {/* Driver/Front (Col 1-2, Row 1-3) */}
                 <div className="bento-piece hidden md:flex col-start-1 col-span-2 row-start-1 row-span-3 rounded-tl-[80px] rounded-bl-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 flex-col justify-end relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 to-transparent" />
                    <Gauge className="text-[#06B6D4] mb-4 opacity-50 relative z-10" size={32} />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#06B6D4] mb-1 relative z-10">Volvo B11R</p>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2 relative z-10">430 HP</h3>
                    <p className="text-xs text-white/50 font-medium relative z-10">I-Shift · Disc Brakes</p>
                 </div>

                 {/* Roof (Col 3-6, Row 1) */}
                 <div className="bento-piece hidden md:flex col-start-3 col-span-4 row-start-1 row-span-1 rounded-tr-[40px] rounded-tl-xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
                    <blockquote className="text-lg md:text-xl font-bold tracking-tight text-white/90 italic relative z-10">
                      &ldquo;We don&apos;t build coaches. We engineer experiences.&rdquo;
                    </blockquote>
                 </div>

                 {/* Body/Interior (Col 3-6, Row 2-3) */}
                 <div className="bento-piece hidden md:flex col-start-3 col-span-4 row-start-2 row-span-2 rounded-lg bg-white/5 backdrop-blur-2xl border border-white/10 p-8 flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent" />
                    <Users className="text-[#8B5CF6] mb-4 opacity-50 relative z-10" size={32} />
                    <div className="flex items-baseline gap-3 mb-2 relative z-10">
                       <span className="text-5xl font-black tracking-tighter text-white">40</span>
                       <span className="text-sm font-bold text-[#D4AF37]">Premium Berths</span>
                    </div>
                    <p className="text-sm text-white/60 font-medium relative z-10 max-w-lg">
                       Individual sleeper pods with mood lighting, climate zones, USB charging, and Italian-grade upholstery.
                    </p>
                 </div>

                 {/* Wheel 1 / Legacy (Col 2, Row 4) */}
                 <div className="bento-piece hidden md:flex col-start-2 col-span-1 row-start-4 row-span-1 rounded-b-full rounded-t-xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D4AF37]/10" />
                    <span className="text-3xl font-black text-white relative z-10">25+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1 relative z-10">Years</span>
                 </div>

                 {/* Safety (Col 3-4, Row 4) */}
                 <div className="bento-piece hidden md:flex col-start-3 col-span-2 row-start-4 row-span-1 rounded-b-2xl rounded-t-lg bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex-col justify-center relative overflow-hidden">
                    <Shield className="text-white/40 mb-2 relative z-10" size={20} />
                    <h3 className="text-lg font-bold text-white relative z-10">AIS 052</h3>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider relative z-10">Fully Compliant</p>
                 </div>

                 {/* Wheel 2 / Delivered (Col 5, Row 4) */}
                 <div className="bento-piece hidden md:flex col-start-5 col-span-1 row-start-4 row-span-1 rounded-b-full rounded-t-xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#06B6D4]/10" />
                    <span className="text-3xl font-black text-white relative z-10">500</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1 relative z-10">Coaches</span>
                 </div>

                 {/* Rear / Revenue (Col 6, Row 4) */}
                 <div className="bento-piece hidden md:flex col-start-6 col-span-1 row-start-4 row-span-1 rounded-br-[40px] rounded-bl-lg rounded-t-xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex-col items-end justify-center text-right relative overflow-hidden">
                    <span className="text-2xl font-black text-[#D4AF37] relative z-10">800 Cr</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1 relative z-10">Revenue</span>
                 </div>

                 {/* Mobile Fallback Grid (Visible only on small screens) */}
                 <div className="md:hidden col-span-2 space-y-4">
                    {/* ... simple stacked glass cards for mobile ... */}
                    <div className="bento-piece bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                       <h3 className="text-xl font-bold text-white mb-1">Volvo B11R</h3>
                       <p className="text-sm text-white/60">430 HP · I-Shift</p>
                    </div>
                    <div className="bento-piece bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                       <h3 className="text-xl font-bold text-white mb-1">40 Premium Berths</h3>
                       <p className="text-sm text-white/60">Italian-grade upholstery & climate zones.</p>
                    </div>
                    <div className="bento-piece bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex justify-between items-center">
                       <div>
                          <h3 className="text-xl font-bold text-white">25+ Years</h3>
                          <p className="text-xs text-white/50 uppercase tracking-widest">Legacy</p>
                       </div>
                       <div className="text-right">
                          <h3 className="text-xl font-bold text-white">500+</h3>
                          <p className="text-xs text-white/50 uppercase tracking-widest">Delivered</p>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </section>

        {/* ── 5. CONTACT OVERLAY ── */}
        <section id="contact-section" ref={contactSectionRef} className="relative z-20 mt-[20vh] bg-[#0A0F1A]/80 backdrop-blur-3xl border-t border-white/10 pointer-events-auto">
           <ConversionSection />
        </section>

      </div>
    </main>
  );
}
