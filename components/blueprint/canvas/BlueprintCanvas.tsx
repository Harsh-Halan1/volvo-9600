'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { getFrameForProgress } from '../../../lib/blueprintPhaseConfig';
import { getNearestFrame, getFrame } from '../../../lib/blueprintFrameLoader';

/**
 * Full-screen fixed canvas for frame scrubbing.
 * On mobile, frames are rotated 90° clockwise to fit portrait orientation.
 *
 * FIX: Canvas sizing is separated from frame drawing so that resizing the
 * canvas buffer (which clears it) always immediately redraws the current frame.
 * The previous bug was: resize cleared the canvas, then the early-return on
 * "same frame index" skipped the redraw, leaving a blank screen.
 */
interface BlueprintCanvasProps {
  progress: number;
  isMobile: boolean;
}

export default function BlueprintCanvas({ progress, isMobile }: BlueprintCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameRef = useRef<number>(-1);
  const lastImgRef = useRef<HTMLImageElement | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  const drawFrameCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasW: number,
      canvasH: number
    ) => {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const scale = Math.max(canvasW / imgW, canvasH / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const dx = (canvasW - drawW) / 2;
      const dy = (canvasH - drawH) / 2;
      ctx.drawImage(img, dx, dy, drawW, drawH);
    },
    []
  );

  /** Core draw routine — always draws the given image to the canvas */
  const drawToCanvas = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { w: cssW, h: cssH, dpr } = sizeRef.current;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // reset transform to DPR scale
      ctx.clearRect(0, 0, cssW, cssH);

      if (isMobile) {
        ctx.translate(cssW, 0);
        ctx.rotate(Math.PI / 2);
        drawFrameCover(ctx, img, cssH, cssW);
      } else {
        drawFrameCover(ctx, img, cssW, cssH);
      }

      ctx.restore();
    },
    [isMobile, drawFrameCover]
  );

  /** Size the canvas buffer — only when dimensions actually change */
  const ensureCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const mem = (navigator as { deviceMemory?: number }).deviceMemory || 4;
    const maxDPR = isMobile ? (mem < 3 ? 1.0 : 1.5) : (window.devicePixelRatio || 1);
    const dpr = Math.min(window.devicePixelRatio || 1, maxDPR);
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;

    // Only resize if dimensions changed — resizing clears the canvas
    if (sizeRef.current.w === cssW && sizeRef.current.h === cssH && sizeRef.current.dpr === dpr) {
      return false; // no resize happened
    }

    sizeRef.current = { w: cssW, h: cssH, dpr };
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    return true; // resize happened, canvas was cleared
  }, [isMobile]);

  // Main render effect
  useEffect(() => {
    ensureCanvasSize();

    const frameIndex = getFrameForProgress(progress);
    const img = getFrame(frameIndex) || getNearestFrame(frameIndex);

    if (img) {
      lastImgRef.current = img;
      lastFrameRef.current = frameIndex;
      drawToCanvas(img);
    } else if (lastImgRef.current) {
      // No frame available yet — keep showing the last successfully drawn frame
      drawToCanvas(lastImgRef.current);
    }
  }, [progress, ensureCanvasSize, drawToCanvas]);

  // Handle resize — redraw with current frame
  useEffect(() => {
    function handleResize() {
      const resized = ensureCanvasSize();
      if (resized && lastImgRef.current) {
        drawToCanvas(lastImgRef.current);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ensureCanvasSize, drawToCanvas]);

  return (
    <canvas
      ref={canvasRef}
      id="assembly-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}
    />
  );
}
