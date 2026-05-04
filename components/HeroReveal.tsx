"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME_COUNT = 732;

const preloadImages = (): HTMLImageElement[] => {
  const images: HTMLImageElement[] = new Array(FRAME_COUNT);
  
  // Optimal loading sequence: load every 5th frame first for quick keyframing, then fill gaps
  const sequence: number[] = [];
  for (let i = 1; i <= FRAME_COUNT; i += 5) sequence.push(i);
  for (let i = 1; i <= FRAME_COUNT; i++) {
    if ((i - 1) % 5 !== 0) sequence.push(i);
  }

  sequence.forEach((i) => {
    const img = new Image();
    const padded = i.toString().padStart(3, "0");
    img.src = `/assets/ezgif-frame-${padded}.jpg`;
    images[i - 1] = img; // 0-indexed
  });

  return images;
};

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const craftedRef = useRef<HTMLDivElement>(null);
  const colorWipeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Force scroll to top on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const handleBeforeUnload = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, []);

  // Preload frames
  useEffect(() => {
    const imgs = preloadImages();
    setImages(imgs);

    let loadedCount = 0;
    imgs.forEach((img) => {
      if (!img) return;
      const onLoad = () => {
        loadedCount++;
        // Unlock scroll after just 15 frames are loaded to avoid long wait
        if (loadedCount > 15) {
          setLoaded(true);
        }
      };
      if (img.complete) {
        onLoad();
      } else {
        img.onload = onLoad;
      }
    });

    // Fallback
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  // GSAP Animation
  useGSAP(
    () => {
      if (
        !loaded ||
        !canvasRef.current ||
        !sectionRef.current ||
        images.length === 0
      )
        return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const drawFrame = (index: number) => {
        let img = images[index];
        
        // If current frame isn't loaded yet, find the closest previous loaded frame
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
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          cx,
          cy,
          img.width * ratio,
          img.height * ratio
        );
      };

      // Draw first frame
      if (images[0]?.complete) drawFrame(0);

      // Handle resize
      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(Math.round(frameTracker.frame));
      };
      window.addEventListener("resize", onResize);

      const frameTracker = { frame: 0 };

      // Master timeline pinned to this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: "+=6000",
          refreshPriority: 1,
        },
      });

      // ── Scrub image sequence (0→80 of timeline) ──
      tl.to(
        frameTracker,
        {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          duration: 80,
          onUpdate: () => {
            drawFrame(Math.round(frameTracker.frame));
          },
        },
        0
      );

      // ── "CRAFTED." text scales up slowly (0→60) ──
      if (craftedRef.current) {
        gsap.set(craftedRef.current, { scale: 1, opacity: 0.08 });
        tl.to(
          craftedRef.current,
          {
            scale: 1.8,
            opacity: 0.15,
            ease: "none",
            duration: 60,
          },
          0
        );
      }

      // ── Subtitle fades out early (8→16) ──
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
        tl.to(
          subtitleRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 8,
            ease: "power2.in",
          },
          8
        );
      }

      // ── Scroll hint fades out (2→8) ──
      if (scrollHintRef.current) {
        tl.to(
          scrollHintRef.current,
          {
            opacity: 0,
            duration: 6,
          },
          2
        );
      }

      // ── Color wipe: Gold sweeps up from bottom (40→60) ──
      if (colorWipeRef.current) {
        gsap.set(colorWipeRef.current, { yPercent: 100, opacity: 0 });
        tl.to(
          colorWipeRef.current,
          {
            yPercent: 0,
            opacity: 0.9,
            duration: 15,
            ease: "power2.inOut",
          },
          40
        );
        // Then it fades back out as we transition (60→75)
        tl.to(
          colorWipeRef.current,
          {
            opacity: 0,
            duration: 10,
            ease: "power2.out",
          },
          62
        );
      }

      // ── Bus zoom-wipe transition (75→90): Scale up + fade out ──
      tl.to(
        canvasRef.current,
        {
          scale: 2.5,
          opacity: 0,
          duration: 15,
          ease: "power3.in",
        },
        75
      );

      // ── CRAFTED text fades out with the bus ──
      if (craftedRef.current) {
        tl.to(
          craftedRef.current,
          {
            opacity: 0,
            scale: 2.2,
            duration: 12,
            ease: "power2.in",
          },
          75
        );
      }

      // ── Hold at end for transition breathing room (90→100) ──
      tl.to({}, { duration: 10 }, 90);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: sectionRef, dependencies: [loaded, images] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0F1A] overflow-hidden"
    >
      {/* ── Loading State ── */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0F1A]">
          <div className="relative mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
          </div>
          <p className="text-[#D4AF37]/60 text-sm font-semibold tracking-[0.3em] uppercase">
            Assembling
          </p>
        </div>
      )}

      {/* ── Ambient Gradient Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[150px] orb-animate" />
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#06B6D4]/5 blur-[130px] orb-animate-reverse" />
        <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full bg-[#D4AF37]/3 blur-[100px] orb-animate" />
      </div>

      {/* ── "CRAFTED." Massive Background Text ── */}
      <div
        ref={craftedRef}
        className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none"
      >
        <span
          className="text-[18vw] md:text-[20vw] font-extrabold tracking-tighter text-white/[0.04] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)" }}
        >
          CRAFTED.
        </span>
      </div>

      {/* ── Gold Color Wipe ── */}
      <div
        ref={colorWipeRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.08) 50%, transparent 100%)",
        }}
      />

      {/* ── Canvas (Image Sequence) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-[3]"
        style={{ transformOrigin: "center center" }}
      />

      {/* ── Hero Copy Overlay ── */}
      <div
        ref={subtitleRef}
        className="absolute bottom-[12%] left-0 right-0 z-[10] pointer-events-none px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-[#D4AF37] mb-4">
            Surendra & Co. — Master Coachbuilders
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.9] mb-6">
            The Premium
            <br />
            Sleeper Coach.
          </h1>
          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto font-medium">
            Scroll to witness 25 years of engineering mastery — from raw steel
            to road-ready perfection.
          </p>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-[10] pointer-events-none"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
      </div>

      {/* ── Top Navigation Bar ── */}
      <nav className="absolute top-0 left-0 right-0 z-[20] px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
            <img
              src="/Logo.png"
              alt="Surendra & Co."
              className="w-7 h-7 object-contain"
            />
          </div>
          <span className="text-sm font-bold tracking-wider text-white/80 hidden md:block">
            SURENDRA & CO.
          </span>
        </div>
        <button
          onClick={() => {
            document
              .getElementById("contact-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="pointer-events-auto px-6 py-2.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer"
        >
          Start Your Build
        </button>
      </nav>
    </section>
  );
}
