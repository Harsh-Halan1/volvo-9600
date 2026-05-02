"use client";

import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 732;

const preloadImages = () => {
  const images = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    const currentFrame = i.toString().padStart(3, '0');
    // Using string prefix directly from the public assets directory
    img.src = `/assets/ezgif-frame-${currentFrame}.jpg`;
    images.push(img);
  }
  return images;
};

export default function CanvasHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  // Progressive preloader to avoid huge startup lag
  useEffect(() => {
    const imgs = preloadImages();
    setImages(imgs);
    
    // We consider it "loaded" enough to start reading after the first 10 frames are ready
    // You could also wait for 100% depending on latency, but progressive scrubbing feels better.
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
    
    // Fallback if cached
    setTimeout(() => setLoaded(true), 1500);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !images || images.length === 0) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const drawFrame = (index: number) => {
      if (!images[index]) return;
      
      // Resize canvas internals to match actual window bounds
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const img = images[index];
      
      // Calculate scaling to 'cover' equivalent
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0,0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);  
    };

    // Initial draw
    if (images[0].complete) {
      drawFrame(0);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPos = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within the sequence block
      const scrollableDistance = containerHeight - viewportHeight;
      const relativeScroll = Math.max(0, scrollPos - containerTop);
      
      const fraction = Math.min(1, relativeScroll / scrollableDistance);
      const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(fraction * FRAME_COUNT)));
      
      setActiveFrameIndex(frameIndex);
      
      requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => drawFrame(activeFrameIndex));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => drawFrame(activeFrameIndex));
    };
  }, [images, loaded]);
  
  // Logic for text overlays: show at specific completion blocks
  // 0% -> Welcome
  // 25% -> Heavy Duty Chassis
  // 50% -> Premium Sleeper
  // 75% -> Panoramic Vision
  
  const completion = activeFrameIndex / FRAME_COUNT;
  
  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '800vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="loading-spinner mb-4"></div>
            <p className="text-gray-400 font-medium tracking-wide">ASSEMBLING 9600 XL...</p>
          </div>
        )}

        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Overlays */}
        <div className="absolute inset-x-8 top-1/8 pointer-events-none">
          
          <div className={`transition-all duration-700 ease-in-out absolute max-w-xl p-8 md:p-10 rounded-3xl backdrop-blur-xs bg-black/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            ${completion >= 0 && completion < 0.20 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              The Volvo 9600 XL.
            </h1>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              A masterclass in engineering. Scroll to assemble.
            </p>
          </div>

          <div className={`transition-all duration-700 ease-in-out absolute max-w-xl p-8 md:p-10 rounded-3xl backdrop-blur-xs bg-black/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            ${completion >= 0.22 && completion < 0.45 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Heavy-Duty Chassis.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Built on an unstinting foundation of steel and power.
            </p>
          </div>
          
          <div className={`transition-all duration-700 ease-in-out absolute max-w-xl p-8 md:p-10 rounded-3xl backdrop-blur-xs bg-black/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            ${completion >= 0.48 && completion < 0.70 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Maximum Comfort.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Premium double-deck sleeper interior designed for tranquility.
            </p>
          </div>

          <div className={`transition-all duration-700 ease-in-out absolute max-w-xl p-8 md:p-10 rounded-3xl backdrop-blur-xs bg-black/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            ${completion >= 0.72 && completion < 0.95 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Panoramic Vision.
            </h2>
            <p className="text-xl mt-4 text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
              Seeing the world with absolute clarity and control.
            </p>
          </div>
          
        </div>
        
        {/* Subtle scroll down indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${completion > 0.1 ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-gray-400 text-sm tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div>

      </div>
    </div>
  );
}
