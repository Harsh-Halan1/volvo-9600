"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import EnterOverlay from './EnterOverlay';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME_COUNT = 732;

// ──────────────────────────────────────────────────
// FEATURE FLAG: Set to true to show KPI counters
// in the narrative overlays. Set false to hide them.
// ──────────────────────────────────────────────────
const SHOW_KPI_COUNTERS = true;

const preloadImages = () => {
  const images: HTMLImageElement[] = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    const currentFrame = i.toString().padStart(3, '0');
    img.src = `/assets/ezgif-frame-${currentFrame}.jpg`;
    images.push(img);
  }
  return images;
};

export default function CanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [siteEntered, setSiteEntered] = useState(false);
  
  // Section Refs (7 overlays)
  const introRef = useRef<HTMLDivElement>(null);
  const foundationRef = useRef<HTMLDivElement>(null);
  const mechanicsRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  
  // SVG Hotspot Refs
  const hotspot1Line = useRef<SVGPathElement>(null);
  const hotspot2Line = useRef<SVGPathElement>(null);

  // KPI Counter Refs
  const kpiCoachesRef = useRef<HTMLSpanElement>(null);
  const kpiYearsRef = useRef<HTMLSpanElement>(null);
  const kpiSalesRef = useRef<HTMLSpanElement>(null);
  const kpiBerthsRef = useRef<HTMLSpanElement>(null);

  // ── Force Scroll-to-Top on Reload ──
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Tell browser not to restore scroll position
      window.history.scrollRestoration = 'manual';
      
      // Kill any leftover GSAP ScrollTrigger instances from HMR / stale state
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      // Force scroll to top immediately
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Also force scroll to top right before unload (so on reload it starts at 0)
      const handleBeforeUnload = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  // ── Check if audio already played this session ──
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyPlayed = sessionStorage.getItem('surendra_audio_played');
      if (alreadyPlayed === 'true') {
        setSiteEntered(true);
      }
    }
  }, []);

  // Preloading
  useEffect(() => {
    const imgs = preloadImages();
    setImages(imgs);
    
    let loadedCount = 0;
    imgs.forEach(img => {
      img.onload = () => {
        loadedCount++;
        // Allow Interaction when 50 frames load representing initial scroll stability
        if (loadedCount > 50 && !loaded) {
          setLoaded(true);
        }
      };
    });
    
    setTimeout(() => setLoaded(true), 2000); // Fallback
  }, []);

  useGSAP(() => {
    if (!siteEntered || !loaded || !canvasRef.current || !containerRef.current || images.length === 0) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Initial resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawFrame = (index: number) => {
      if (!images[index]) return;
      const img = images[index];
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0,0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);  
    };

    // Draw first frame initially
    if (images[0].complete) drawFrame(0);

    // Handle resize
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(frameTracker.frame));
    };
    window.addEventListener('resize', onResize);

    const frameTracker = { frame: 0 };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=8000",
      }
    });

    // 1. Scrub Frame Sequence (0 to 100 timeline duration)
    tl.to(frameTracker, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      duration: 100,
      onUpdate: () => {
        drawFrame(Math.round(frameTracker.frame));
      }
    }, 0);

    // Initial Hide for all overlays
    gsap.set([foundationRef.current, mechanicsRef.current, layoutRef.current, interiorRef.current, shellRef.current, revealRef.current], { y: 20, opacity: 0, filter: "blur(4px)" });
    gsap.set([hotspot1Line.current, hotspot2Line.current], { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 });

    // ── 0-12% (The Introduction) ──
    tl.to(introRef.current, { y: -20, opacity: 0, filter: "blur(4px)", duration: 2 }, 10);

    // ── 15-28% (The Foundation / Unyielding Framework) ──
    tl.to(foundationRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2 }, 15);
    tl.to(hotspot1Line.current, { opacity: 1, strokeDashoffset: 0, duration: 3 }, 15);
    if (SHOW_KPI_COUNTERS) {
      const yearsCounter = { val: 0 };
      tl.to(yearsCounter, { val: 25, roundProps: "val", duration: 5, onUpdate: () => { if(kpiYearsRef.current) kpiYearsRef.current.innerText = yearsCounter.val.toString() } }, 15);
    }
    tl.to(foundationRef.current, { y: -20, opacity: 0, filter: "blur(4px)", duration: 2 }, 26);
    tl.to(hotspot1Line.current, { opacity: 0, duration: 2 }, 26);

    // ── 30-45% (Seamless Integration / Mechanics) ──
    tl.to(mechanicsRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2 }, 30);
    if (SHOW_KPI_COUNTERS) {
      const coachesCounter = { val: 0 };
      tl.to(coachesCounter, { val: 500, roundProps: "val", duration: 5, onUpdate: () => { if(kpiCoachesRef.current) kpiCoachesRef.current.innerText = coachesCounter.val.toString() } }, 30);
    }
    tl.to(mechanicsRef.current, { y: -20, opacity: 0, filter: "blur(4px)", duration: 2 }, 43);

    // ── 48-58% (Bespoke Architecture / Layout) ──
    tl.to(layoutRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2 }, 48);
    tl.to(layoutRef.current, { y: -20, opacity: 0, filter: "blur(4px)", duration: 2 }, 56);

    // ── 60-72% (Handcrafted Luxury / Interior) ──
    tl.to(interiorRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2 }, 60);
    tl.to(hotspot2Line.current, { opacity: 1, strokeDashoffset: 0, duration: 3 }, 60);
    if (SHOW_KPI_COUNTERS) {
      const berthsCounter = { val: 0 };
      tl.to(berthsCounter, { val: 40, roundProps: "val", duration: 5, onUpdate: () => { if(kpiBerthsRef.current) kpiBerthsRef.current.innerText = berthsCounter.val.toString() } }, 60);
    }
    tl.to(interiorRef.current, { y: -20, opacity: 0, filter: "blur(4px)", duration: 2 }, 70);
    tl.to(hotspot2Line.current, { opacity: 0, duration: 2 }, 70);

    // ── 75-85% (Precision Bodywork / Shell) ──
    tl.to(shellRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2 }, 75);
    tl.to(shellRef.current, { y: -20, opacity: 0, filter: "blur(4px)", duration: 2 }, 83);

    // ── 88-100% (The Final Masterpiece / Reveal) ──
    tl.to(revealRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2 }, 88);
    if (SHOW_KPI_COUNTERS) {
      const salesCounter = { val: 0 };
      tl.to(salesCounter, { val: 800, roundProps: "val", duration: 5, onUpdate: () => { if(kpiSalesRef.current) kpiSalesRef.current.innerText = salesCounter.val.toString() } }, 88);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [siteEntered, loaded, images]);
  
  const overlayClass = "absolute max-w-xl p-8 md:p-10 rounded-3xl backdrop-blur-sm bg-black/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]";

  return (
    <>
      {/* Enter Site Overlay (one-time audio welcome) */}
      {!siteEntered && <EnterOverlay onEnter={() => setSiteEntered(true)} />}

      <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
        
        {/* Loading Indicator — only after user clicks Enter, while images still loading */}
        {!loaded || !siteEntered && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium tracking-wide">ASSEMBLING THE COACH...</p>
          </div>
        )}

        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* SVG Hotspots Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
          <path 
            ref={hotspot1Line}
            d="M 20vw 45vh L 50vw 75vh" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            fill="none" 
            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          />
          <path 
            ref={hotspot2Line}
            d="M 80vw 55vh L 50vw 35vh" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            fill="none" 
            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
          />
        </svg>

        {/* ═══════════════════════════════════════════════ */}
        {/* ═══  NARRATIVE OVERLAYS  ═══════════════════ */}
        {/* ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          
          {/* ── 0-12% The Introduction ── */}
          <div ref={introRef} className={`${overlayClass} top-[20%] left-[8%]`} style={{ y: 0, opacity: 1, filter: "blur(0px)" }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              The Premium<br />Sleeper Coach.
            </h1>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Custom-crafted by Surendra & Co. Scroll to see our build process.
            </p>
          </div>

          {/* ── 15-28% Unyielding Framework ── */}
          <div ref={foundationRef} className={`${overlayClass} top-[25%] left-[8%]`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Unyielding Framework.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Precision structural engineering built for maximum safety and endurance on Indian roads.
            </p>
            {SHOW_KPI_COUNTERS && (
              <div className="mt-8 flex items-center space-x-12">
                <div>
                  <div className="text-5xl font-bold text-white drop-shadow-md"><span ref={kpiYearsRef}>0</span><span className="text-2xl text-blue-400">+</span></div>
                  <div className="text-sm uppercase tracking-widest text-gray-400 mt-1">Years of Expertise</div>
                </div>
              </div>
            )}
          </div>

          {/* ── 30-45% Seamless Integration ── */}
          <div ref={mechanicsRef} className={`${overlayClass} top-[30%] left-[8%]`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Seamless Integration.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Flawless mating of heavy-duty chassis mechanics with custom architecture.
            </p>
            {SHOW_KPI_COUNTERS && (
              <div className="mt-8 flex items-center space-x-12">
                <div>
                  <div className="text-5xl font-bold text-white drop-shadow-md"><span ref={kpiCoachesRef}>0</span><span className="text-2xl text-blue-400">+</span></div>
                  <div className="text-sm uppercase tracking-widest text-gray-400 mt-1">Coaches Delivered</div>
                </div>
              </div>
            )}
          </div>

          {/* ── 48-58% Bespoke Architecture ── */}
          <div ref={layoutRef} className={`${overlayClass} top-[40%] left-[8%]`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Bespoke Architecture.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Custom-engineered floor plans designed for optimal passenger flow and comfort.
            </p>
          </div>

          {/* ── 60-72% Handcrafted Luxury ── */}
          <div ref={interiorRef} className={`${overlayClass} top-[45%] right-[8%] left-auto`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Handcrafted Luxury.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Premium sleeper pods finished with uncompromising attention to detail and high-grade materials.
            </p>
            {SHOW_KPI_COUNTERS && (
              <div className="mt-8">
                <div className="text-5xl font-bold text-white drop-shadow-md"><span ref={kpiBerthsRef}>0</span></div>
                <div className="text-sm uppercase tracking-widest text-blue-400 mt-1 font-semibold">Premium Berths</div>
              </div>
            )}
          </div>

          {/* ── 75-85% Precision Bodywork ── */}
          <div ref={shellRef} className={`${overlayClass} top-[35%] left-[8%]`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Precision Bodywork.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Aerodynamic exterior paneling, molded and sealed to absolute perfection.
            </p>
          </div>

          {/* ── 88-100% The Final Masterpiece ── */}
          <div ref={revealRef} className={`${overlayClass} top-[40%] right-[8%] left-auto pointer-events-auto`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              The Final Masterpiece.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Built by Surendra & Co. Ready for the fleet.
            </p>
            {SHOW_KPI_COUNTERS && (
              <div className="mt-6 mb-4">
                <div className="text-5xl font-bold text-white drop-shadow-md">₹<span ref={kpiSalesRef}>0</span><span className="text-2xl text-blue-400"> Cr+</span></div>
                <div className="text-sm uppercase tracking-widest text-gray-400 mt-1">Revenue Generated</div>
              </div>
            )}
            <button 
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-4 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Start Your Build
            </button>
          </div>

        </div>

        {/* Subtle scroll down indicator */}
        {/*<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 z-20 pointer-events-none">
          <span className="text-gray-400 text-sm tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>*/}

      </div>
    </>
  );
}
