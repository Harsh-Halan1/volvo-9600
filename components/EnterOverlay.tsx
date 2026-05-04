"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface EnterOverlayProps {
  onEnter: () => void;
}

export default function EnterOverlay({ onEnter }: EnterOverlayProps) {
  const [fading, setFading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-create the audio element
    audioRef.current = new Audio('/Surendra & Co..mp3');
    audioRef.current.volume = 0.7;
  }, []);

  const handleEnter = () => {
    // Play audio (user gesture unlocks audio context)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Silently fail if browser still blocks
      });
    }

    // Mark as played for this session
    sessionStorage.setItem('surendra_audio_played', 'true');

    // Fade out
    setFading(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060709] transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Logo */}
      <div className="relative w-28 h-28 mb-8 animate-pulse-slow">
        <Image
          src="/Logo.png"
          alt="Surendra & Co. Logo"
          fill
          className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          priority
        />
      </div>

      {/* Company name */}
      <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-wider mb-3">
        Surendra & Co.
      </h1>
      <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-12 font-medium">
        Premium Coach Body Builders
      </p>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        className="group relative px-12 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm
          hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
          transition-all duration-500 cursor-pointer"
      >
        <span className="text-white text-sm font-semibold uppercase tracking-[0.25em] group-hover:tracking-[0.35em] transition-all duration-500">
          Enter Site
        </span>
      </button>

      {/* Subtle hint */}
      <p className="text-gray-600 text-xs mt-6 tracking-wide">
        🔊 Audio experience included
      </p>
    </div>
  );
}
