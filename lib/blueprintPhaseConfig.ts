// Phase configuration for The Blueprint UI
// All phase boundaries, frame ranges, labels and annotation data

export const TOTAL_FRAMES = 732;
export const PRIORITY_FRAME_STEP = 5;
export const PRIORITY_FRAME_COUNT = Math.ceil(TOTAL_FRAMES / PRIORITY_FRAME_STEP); // ~147

export const PHASE_BOUNDARIES = [0, 0.20, 0.40, 0.60, 0.80, 1.0] as const;

export interface PhaseConfig {
  id: number;
  name: string;
  shortName: string;
  ref: string;
  frameStart: number;
  frameEnd: number;
  scrollStart: number;
  scrollEnd: number;
  keyFrame: number;
  annotations: AnnotationConfig[];
}

export interface AnnotationConfig {
  id: string;
  label: string;
  /** Position as percentage of canvas viewport (0-100) */
  x: number;
  y: number;
  /** Leader line direction: which side the callout box extends to */
  direction: 'left' | 'right' | 'up' | 'down';
}

export const PHASES: PhaseConfig[] = [
  {
    id: 1,
    name: 'THE FOUNDATION',
    shortName: 'CHASSIS',
    ref: 'SC-01-CHASSIS',
    frameStart: 1,
    frameEnd: 146,
    scrollStart: 0,
    scrollEnd: 0.20,
    keyFrame: 80,
    annotations: [
      { id: 'p1-a1', label: 'HIGH-TENSILE STRUCTURAL STEEL', x: 50, y: 65, direction: 'right' },
      { id: 'p1-a2', label: 'AIS 052 COMPLIANT UNDERFRAME', x: 30, y: 78, direction: 'left' },
      { id: 'p1-a3', label: 'COMMERCIAL GRADE AXLE ASSEMBLY', x: 72, y: 82, direction: 'right' },
    ],
  },
  {
    id: 2,
    name: 'DRIVETRAIN INTEGRATION',
    shortName: 'DRIVETRAIN',
    ref: 'SC-02-DRVTRAIN',
    frameStart: 147,
    frameEnd: 292,
    scrollStart: 0.20,
    scrollEnd: 0.40,
    keyFrame: 220,
    annotations: [
      { id: 'p2-a1', label: 'VOLVO B11R · 430 HP · EURO VI', x: 25, y: 55, direction: 'left' },
      { id: 'p2-a2', label: 'DUAL-TYRE REAR AXLE · TUBELESS', x: 75, y: 78, direction: 'right' },
      { id: 'p2-a3', label: '400L FUEL CAPACITY', x: 55, y: 70, direction: 'right' },
    ],
  },
  {
    id: 3,
    name: 'INTERIOR ARCHITECTURE',
    shortName: 'INTERIOR',
    ref: 'SC-03-INTERIOR',
    frameStart: 293,
    frameEnd: 438,
    scrollStart: 0.40,
    scrollEnd: 0.60,
    keyFrame: 380,
    annotations: [
      { id: 'p3-a1', label: 'UPPER DECK · 20 BERTHS', x: 45, y: 30, direction: 'left' },
      { id: 'p3-a2', label: 'LOWER DECK · 20 BERTHS', x: 45, y: 60, direction: 'left' },
      { id: 'p3-a3', label: 'BLUE / TAN LEATHER UPHOLSTERY', x: 65, y: 45, direction: 'right' },
    ],
  },
  {
    id: 4,
    name: 'THE EXTERIOR SHELL',
    shortName: 'EXTERIOR',
    ref: 'SC-04-EXTERIOR',
    frameStart: 439,
    frameEnd: 584,
    scrollStart: 0.60,
    scrollEnd: 0.80,
    keyFrame: 540,
    annotations: [
      { id: 'p4-a1', label: 'SILVER METALLIC ALLOY PANELS', x: 40, y: 40, direction: 'left' },
      { id: 'p4-a2', label: 'LAMINATED SAFETY GLASS', x: 25, y: 30, direction: 'left' },
      { id: 'p4-a3', label: 'AERODYNAMIC ROOFLINE PROFILE', x: 50, y: 18, direction: 'right' },
    ],
  },
  {
    id: 5,
    name: 'THE FINISHED MASTERPIECE',
    shortName: 'COMPLETE',
    ref: 'SC-05-COMPLETE',
    frameStart: 585,
    frameEnd: 732,
    scrollStart: 0.80,
    scrollEnd: 1.0,
    keyFrame: 720,
    annotations: [], // Phase 5 has no annotations — the finished bus speaks for itself
  },
];

export function getCurrentPhase(progress: number): number {
  for (let i = 0; i < 5; i++) {
    if (progress >= PHASE_BOUNDARIES[i] && progress < PHASE_BOUNDARIES[i + 1]) {
      return i + 1;
    }
  }
  return 5;
}

export function getFrameForProgress(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.round(1 + clamped * (TOTAL_FRAMES - 1));
}

export function getFramePath(frameNumber: number): string {
  const padded = String(frameNumber).padStart(3, '0');
  return `/assets/ezgif-frame-${padded}.jpg`;
}
