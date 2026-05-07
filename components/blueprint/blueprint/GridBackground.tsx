'use client';

import React from 'react';

/**
 * Fixed full-viewport grid background overlay.
 * Opacity is driven by CSS custom property --grid-opacity via moodController.
 */
export default function GridBackground() {
  return <div className="blueprint-grid" aria-hidden="true" />;
}
