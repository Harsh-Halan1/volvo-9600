// Priority-tier frame preloader for The Blueprint UI
// Identical logic to primary UI but as a standalone module

import { TOTAL_FRAMES, PRIORITY_FRAME_STEP, getFramePath } from './blueprintPhaseConfig';

export type LoadProgressCallback = (loaded: number, total: number) => void;

/**
 * Frame cache — stores loaded Image objects keyed by 1-based frame index
 */
const frameCache = new Map<number, HTMLImageElement>();

/**
 * Returns a cached frame image or null
 */
export function getFrame(index: number): HTMLImageElement | null {
  return frameCache.get(index) || null;
}

/**
 * Gets the nearest loaded frame to the target index.
 * Scans outward (lo--, hi++) from target.
 */
export function getNearestFrame(target: number): HTMLImageElement | null {
  if (frameCache.has(target)) return frameCache.get(target)!;

  let lo = target - 1;
  let hi = target + 1;
  while (lo >= 1 || hi <= TOTAL_FRAMES) {
    if (lo >= 1 && frameCache.has(lo)) return frameCache.get(lo)!;
    if (hi <= TOTAL_FRAMES && frameCache.has(hi)) return frameCache.get(hi)!;
    lo--;
    hi++;
  }
  return null;
}

/**
 * Load a single frame and cache it
 */
function loadFrame(index: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (frameCache.has(index)) {
      resolve(frameCache.get(index)!);
      return;
    }
    const img = new Image();
    img.onload = () => {
      frameCache.set(index, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = getFramePath(index);
  });
}

/**
 * TIER 1: Load priority frames (every Nth frame) — blocks page reveal
 */
export async function loadPriorityFrames(onProgress?: LoadProgressCallback): Promise<void> {
  const priorityIndices: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i += PRIORITY_FRAME_STEP) {
    priorityIndices.push(i);
  }

  let loaded = 0;
  const total = priorityIndices.length;

  // Load in batches of 8 for parallelism
  const BATCH_SIZE = 8;
  for (let i = 0; i < priorityIndices.length; i += BATCH_SIZE) {
    const batch = priorityIndices.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (idx) => {
        try {
          await loadFrame(idx);
        } catch {
          // Skip failed frames silently
        }
        loaded++;
        onProgress?.(loaded, total);
      })
    );
  }
}

/**
 * TIER 2: Load remaining frames in background via requestIdleCallback
 */
export function loadRemainingFrames(): void {
  const remaining: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if (!frameCache.has(i)) {
      remaining.push(i);
    }
  }

  let cursor = 0;
  const CONCURRENT = 6;

  function loadNext() {
    if (cursor >= remaining.length) return;

    const batch = remaining.slice(cursor, cursor + CONCURRENT);
    cursor += CONCURRENT;

    Promise.all(batch.map((idx) => loadFrame(idx).catch(() => null))).then(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadNext);
      } else {
        setTimeout(loadNext, 16);
      }
    });
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadNext);
  } else {
    setTimeout(loadNext, 100);
  }
}
