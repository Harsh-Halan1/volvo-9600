// Blueprint-to-Reality CSS Variable Interpolator
// Drives the global mood transition from cold blueprint to warm reality

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Updates CSS custom properties based on global assembly progress.
 * Called inside a requestAnimationFrame callback — never directly in scroll handler.
 *
 * progress: 0.0 = pure blueprint, 1.0 = full reality
 */
export function updateGlobalMood(progress: number): void {
  const root = document.documentElement;
  const p = Math.max(0, Math.min(1, progress));

  // Grid fades out completely
  const gridOpacity = lerp(0.08, 0, p);
  root.style.setProperty('--grid-opacity', String(gridOpacity));

  // Text warms from cold blue-white (200,220,240) to warm off-white (237,232,223)
  const tr = Math.round(lerp(200, 237, p));
  const tg = Math.round(lerp(220, 232, p));
  const tb = Math.round(lerp(240, 223, p));
  root.style.setProperty('--text-primary', `rgb(${tr},${tg},${tb})`);

  // Secondary text warms
  const sr = Math.round(lerp(106, 138, p));
  const sg = Math.round(lerp(139, 155, p));
  const sb = Math.round(lerp(170, 171, p));
  root.style.setProperty('--text-secondary', `rgb(${sr},${sg},${sb})`);

  // Background warms slightly
  const bgr = Math.round(lerp(10, 13, p));
  const bgg = Math.round(lerp(22, 26, p));
  const bgb = Math.round(lerp(40, 36, p));
  root.style.setProperty('--bg-base', `rgb(${bgr},${bgg},${bgb})`);

  // Annotation lines fade out faster (gone by progress 0.7)
  const annOpacity = lerp(0.60, 0, Math.min(1, p / 0.7));
  root.style.setProperty('--annotation-opacity', String(annOpacity));

  // Accent color transitions from blueprint cyan to amber
  const ar = Math.round(lerp(74, 200, p));
  const ag = Math.round(lerp(158, 133, p));
  const ab = Math.round(lerp(232, 26, p));
  root.style.setProperty('--accent-active', `rgb(${ar},${ag},${ab})`);

  // Border transitions
  root.style.setProperty('--border-active-opacity', String(lerp(0.25, 0.25, p)));
}

/**
 * Resets all mood CSS vars to pure blueprint state
 */
export function resetToBlueprint(): void {
  updateGlobalMood(0);
}

/**
 * Sets full reality mode
 */
export function setRealityMode(): void {
  updateGlobalMood(1);
}
