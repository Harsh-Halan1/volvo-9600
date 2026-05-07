# Surendra & Co. — Alternative UI Concept #1
## "The Blueprint" — Engineering Drawing Aesthetic
### Complete Project Specification

**Version:** 1.0  
**Concept Name:** The Blueprint  
**Core Idea:** The page opens as a pure technical engineering drawing. As the user scrolls and the bus assembles, the blueprint progressively "comes to life" — annotation lines dissolve into real geometry, spec sheets become polished content, and a line drawing becomes a finished vehicle.  
**Stack:** Next.js 14, React, Tailwind CSS, GSAP ScrollTrigger  

---

## Table of Contents

1. [Concept Philosophy](#1-concept-philosophy)
2. [The Central Metaphor — How It Works Visually](#2-the-central-metaphor)
3. [Asset Strategy](#3-asset-strategy)
4. [Theme & Design System](#4-theme--design-system)
5. [Page Architecture Overview](#5-page-architecture-overview)
6. [Section-by-Section Flow](#6-section-by-section-flow)
7. [The Blueprint-to-Reality Transition System](#7-the-blueprint-to-reality-transition-system)
8. [Bus Silhouette Navigation Element](#8-bus-silhouette-navigation-element)
9. [Frame & Canvas Architecture](#9-frame--canvas-architecture)
10. [Mobile Strategy](#10-mobile-strategy)
11. [GSAP Scroll Architecture](#11-gsap-scroll-architecture)
12. [Component Inventory](#12-component-inventory)
13. [Responsive Breakpoints](#13-responsive-breakpoints)
14. [Performance Checklist](#14-performance-checklist)
15. [File & Folder Structure](#15-file--folder-structure)
16. [Known Risks & Mitigations](#16-known-risks--mitigations)

---

## 1. Concept Philosophy

### The Insight
Every bus Surendra & Co. delivers began as a drawing. A line on paper. A dimension written in a drafter's hand. The bus does not start on the shop floor — it starts on the drawing board.

Most manufacturer websites show the finished product and work backwards. This concept does the opposite: it starts at the very beginning of how a coach is born — as a technical blueprint — and walks the user forward through the entire creation. By the time the user reaches the contact form, they have witnessed the entire manufacturing story, told in the visual language of engineering itself.

### Why This Works for B2B
Fleet operators, government transport officials, and institutional buyers understand technical drawings. This aesthetic speaks their language. It says: we think like engineers, not salespeople. It positions Surendra & Co. as a technical partner, not a vendor.

### The Emotional Arc
```
Page Load       ->  Pure blueprint. Cold precision. Analytical.
Assembly begins ->  Lines gain weight. Annotations appear. Technical excitement.
Phase 3-4       ->  Color bleeds in. Warmth builds. Craft becomes visible.
Phase 5         ->  Full reality — the finished bus in warm studio light.
Below animation ->  Warm industrial aesthetic. Credibility. Trust.
Contact form    ->  Invitation to start the drawing together.
```

The user's emotional journey mirrors the physical journey of the bus: from an abstract idea to a real, tangible vehicle on the road.

---

## 2. The Central Metaphor

### What the User Sees at Load

The page opens to what appears to be a large-format technical engineering drawing on a drafting table.

- Dark navy background (#0A1628) with a faint engineering grid — 24px spaced horizontal and vertical lines, 1px, rgba(100,160,220,0.08) — suggesting graph paper or a CAD canvas.
- Every text element looks like it was placed by a drafting tool — thin, precise, monospaced.
- The central viewport (where the assembly frames play) is framed as a technical drawing cutout — a rectangle with dimension arrows on all sides, annotation tick marks at corners, a title block in the bottom-right corner (like real engineering drawings have).
- The heading "SURENDRA & CO." appears as if it is the title of the drawing, placed in the title block.

### How the Metaphor Evolves Through Scroll

The "blueprint coming to life" is achieved through a global progress variable (0.0 at top of assembly section -> 1.0 at bottom) that drives a set of CSS custom property transitions across the entire page:

```
Progress 0.0  ->  Pure blueprint. Navy bg, cyan/white lines, mono fonts only.
Progress 0.3  ->  Grid lines begin to fade. First amber tones appear in accents.
Progress 0.6  ->  Background warms slightly. Cards gain depth and shadows.
Progress 1.0  ->  Full "reality" mode — the industrial premium theme fully active.
```

Below the assembly section, the page is fully "real" — warm industrial aesthetic, no more blueprint grid.

### The Annotation Layer
Throughout the assembly section, engineering-style annotation overlays sit on top of the canvas frames. These are SVG elements — dimension lines with arrows, leader lines pointing to key parts of the bus with spec callouts, hatching patterns on cross-sections.

For example, during Phase 2 (Drivetrain), an annotation line extends from the engine area in the frame to a callout box: [B11R — 430 HP / 2100 Nm].

These annotations are positioned to work with the specific frames being shown. They appear when entering a phase and dissolve when leaving it.

---

## 3. Asset Strategy

### Desktop: 732 Frames (Same Priority-Tier Approach)

Same three-tier loading system as the primary UI:
- Tier 1: Every 5th frame (~147 frames) loaded before page reveals. ~6-9MB.
- Tier 2: Remaining frames loaded via requestIdleCallback queue in background.
- Tier 3: On-demand promotion for fast-scroll fallback.

Loading gate: page does not reveal until all 147 priority frames are loaded.

Frame naming: /public/assets/frames/ezgif-frame-001.jpg through ezgif-frame-732.jpg.

### Mobile: 732 Frames (Same Canvas Approach)

Key decision: On mobile, this UI uses the same canvas + frame scrubbing approach as desktop. The reason: the Blueprint concept's framing device (the technical drawing border around the canvas) is central to the identity of this UI and must be preserved on mobile. A video scrubbing approach or static key frames would break the blueprint framing metaphor.

The mobile layout adapts the blueprint framing device to portrait orientation (described in Mobile Strategy section), but the underlying canvas + frame scrubbing mechanism is identical.

Mobile frame loading is identical to desktop — priority tier system, same loader code, same gate.

The one concession for mobile performance: On screens narrower than 480px, the canvas is drawn at 0.75 x devicePixelRatio instead of full DPR. This halves the memory cost of the canvas buffer on small phones while remaining visually acceptable.

### Blueprint SVG Assets

A set of SVG files are needed for the annotation overlay and the bus silhouette navigation element. These are static assets, not generated at runtime.

Required SVG files:

| File | Description |
|---|---|
| blueprint-border.svg | The technical drawing border — corner marks, dimension arrows, title block outline |
| bus-silhouette-side.svg | Side-profile line drawing of the Volvo 9600 XL, broken into 5 named path groups (one per phase) |
| grid-texture.svg | The engineering grid tile (24x24px, used as CSS background-image repeat) |
| annotation-phase-1.svg | Dimension lines + callouts for Phase 1 (chassis) |
| annotation-phase-2.svg | Dimension lines + callouts for Phase 2 (drivetrain) |
| annotation-phase-3.svg | Dimension lines + callouts for Phase 3 (interior) |
| annotation-phase-4.svg | Dimension lines + callouts for Phase 4 (exterior) |
| annotation-phase-5.svg | Minimal — mostly cleared for the beauty shot |

The bus silhouette SVG is the most important asset. It must be drawn by hand (or traced from a reference image of the 9600 XL) with the 5 component groups clearly separated by SVG group id:

```
Group id="phase-1-chassis"    ->  lower frame, axle lines
Group id="phase-2-drivetrain" ->  wheel circles, engine box outline
Group id="phase-3-interior"   ->  interior pod lines, deck divider
Group id="phase-4-exterior"   ->  body panels, window outlines
Group id="phase-5-livery"     ->  brand markings, final details
```

### Key Frame Exports (5 images)
5 JPEG exports at phase boundary frames. Used as og:image and in mobile annotation overlays. Same as primary UI spec.

---

## 4. Theme & Design System

### Phase-Aware Color System

This UI has two modes — Blueprint Mode (progress 0.0) and Reality Mode (progress 1.0). CSS custom properties are interpolated via JavaScript on scroll.

```css
:root {
  /* BLUEPRINT MODE */
  --bg-base:           #0A1628;   /* Dark drafting navy */
  --bg-surface:        #0F1E35;   /* Slightly lifted surface */
  --bg-elevated:       #152540;   /* Card backgrounds */

  --grid-line:         rgba(100, 160, 220, 0.08);   /* Blueprint grid */
  --annotation-line:   rgba(100, 160, 220, 0.60);   /* Dimension lines */
  --annotation-fill:   rgba(100, 160, 220, 0.08);   /* Callout box fill */

  --accent-blueprint:  #4A9EE8;   /* Blueprint cyan-blue — primary in Phase 1-2 */
  --accent-amber:      #C8851A;   /* Industrial amber — primary in Phase 3-5 + below */
  --accent-amber-l:    #E8A832;   /* Lighter amber */

  --text-primary:      #C8DCF0;   /* Blueprint off-white — cold blue tint */
  --text-secondary:    #6A8BAA;   /* Muted blueprint blue */
  --text-tertiary:     #3A5570;   /* Very muted, for captions */

  --border-blueprint:  rgba(74, 158, 232, 0.25);
  --border-amber:      rgba(200, 133, 26, 0.25);

  /* REALITY MODE TARGET VALUES (JS lerps towards these) */
  --bg-base-real:        #0D1A24;
  --bg-surface-real:     #152030;
  --text-primary-real:   #EDE8DF;
  --text-secondary-real: #8A9BAB;
}
```

### Typography

Three fonts, each with a specific role:

Share Tech Mono — all text during blueprint mode. Engineering / annotation font. Looks like military stencil lettering, not a code editor. Used for: loading screen, nav labels, phase annotations, spec values, dimension callouts, footer.

Barlow Condensed 800 — large headings in both modes. Hero title, phase titles, section headings. Condensed proportions read as engineered precision.

DM Sans 400/500 — body copy in static sections below animation only (Reality Mode). Warm and readable. Never used during the animation.

Import via next/font/google, not @import in CSS.

### Blueprint Grid Background

Applied to the body or outermost page wrapper:

```css
body {
  background-color: var(--bg-base);
  background-image: url('/assets/svg/grid-texture.svg');
  background-size: 24px 24px;
  background-repeat: repeat;
}
```

The grid SVG tile is a 24x24px square with two 1px lines (right edge and bottom edge) at rgba(100,160,220,0.08). As assembly section nears completion, the grid fades out by transitioning --grid-opacity to 0 via JavaScript.

### The Title Block (Fixed Element)

Bottom-right corner of the viewport during blueprint mode. A fixed element styled as a real engineering drawing title block:

```
+-------------------+----------------------------------+
| DRAWING NO.       |  SC-VB11R-9600-2025             |
+-------------------+----------------------------------+
| PROJECT           |  VOLVO 9600 XL — LUXURY SLEEPER |
+-------------------+----------------------------------+
| PREPARED BY       |  SURENDRA & CO.                 |
+-------------------+----------------------------------+
| ADDRESS           |  BAREJA, AHMEDABAD              |
+-------------------+----------------------------------+
| SCALE             |  1:50                           |
+-------------------+---------------------------------+
| COACH BODY BUILDERS — EST. 2000                      |
+------------------------------------------------------+
```

- All text: Share Tech Mono, 9-11px, var(--annotation-line)
- Borders: 1px solid var(--annotation-line)
- Background: var(--annotation-fill)
- Position: fixed, bottom: 24px, right: 24px, z-index: 20
- Fades out as assembly progress reaches 0.8
- On mobile: scaled to 70%, repositioned to bottom: 8px, right: 8px

---

## 5. Page Architecture Overview

```
+----------------------------------------------------------------------+
|  LOADING SCREEN                               (full screen, z-100)  |
+----------------------------------------------------------------------+
|  [Engineering grid bg — full page, fades as scroll progresses]      |
|                                                                      |
|  NAVIGATION BAR                               (fixed, z-50)         |
|  [Blueprint style at top -> Reality style as scroll progresses]     |
|                                                                      |
|  CANVAS                                       (fixed full-screen)   |
|  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   |
|  HERO — "THE DRAWING BOARD"                   (100vh)               |
|  [Blueprint framing device wraps the canvas]                        |
|  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   |
|  ASSEMBLY SECTION                             (500vh)               |
|    [Blueprint border + annotation SVG overlay on canvas]            |
|    [Bus silhouette nav — left rail, desktop only]                   |
|    [Spec sheet panel — right side]                                  |
|    [Title block — bottom right, fixed]                              |
|  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   |
|  [Assembly end — solid bg slides over canvas]                       |
+----------------------------------------------------------------------+
|  BY THE NUMBERS                               (static)              |
|  OUR RANGE                                    (static)              |
|  THE MAKING                                   (static)              |
|  CERTIFICATIONS                               (static)              |
|  COMMISSION / CONTACT FORM                    (static)              |
|  FOOTER                                       (static)              |
+----------------------------------------------------------------------+
```

The canvas element is position: fixed, full screen. All animation-section overlays are layered on top using z-index. Static sections below the animation have a solid background that covers the canvas as the user scrolls past.

---

## 6. Section-by-Section Flow

---

### 6.1 Loading State

Displayed immediately on mount. Dismissed when all 147 priority frames are loaded.

The loading screen IS the first impression of the blueprint concept — it is not a generic spinner. It sets the tone for everything that follows.

LAYOUT:
```
Full screen · background: #0A1628 · grid texture overlay

         +------------------------------------------+
         |                                          |
         |    [Bus side-profile silhouette SVG]     |
         |    [Drawing itself left to right —       |
         |     SVG stroke-dashoffset animation]     |
         |                                          |
         |    SC-VB11R-9600-2025                    |
         |    SURENDRA & CO.                        |
         |    - - - - - - - - - - - - - - - - -     |
         |    LOADING TECHNICAL DRAWINGS            |
         |    ################......   72%          |
         |    FRAME 106 / 147                       |
         |                                          |
         +------------------------------------------+
```

THE DRAWING ANIMATION:
The bus silhouette SVG uses the stroke-dasharray / stroke-dashoffset technique. The bus outline appears to be drawn from left to right, like a pen tracing it in real time. The stroke is driven by actual loading progress, not a timer:

```js
const totalStroke = busPathElement.getTotalLength();
busPathElement.style.strokeDasharray = totalStroke;

function onFrameLoaded(loadedCount, totalCount) {
  const progress = loadedCount / totalCount;
  busPathElement.style.strokeDashoffset = totalStroke * (1 - progress);
  progressBar.style.width = (progress * 100) + '%';
  frameCounter.textContent = 'FRAME ' + loadedCount + ' / ' + totalCount;
}
```

As the bus silhouette completes drawing, the progress bar fills. They finish together. This is the best possible use of a loading screen — it is informative, on-brand, and sets up the blueprint metaphor before the page even loads.

TEXT ELEMENTS (all Share Tech Mono):
- Drawing number: SC-VB11R-9600-2025 — 11px, var(--annotation-line), tracking-[0.2em]
- Company name: SURENDRA & CO. — 18px, var(--text-primary)
- Status label: LOADING TECHNICAL DRAWINGS — 10px, var(--text-secondary), tracking-[0.35em]
- Frame counter: FRAME 106 / 147 — 10px, var(--text-tertiary), updates live

PROGRESS BAR:
- Width: 280px max, height: 2px
- Track: var(--border-blueprint)
- Fill: animated left-to-right, color var(--accent-blueprint)

EXIT ANIMATION SEQUENCE:
1. Bus silhouette stroke fades out (500ms)
2. Bus silhouette fill fades in — outline becomes solid fill (300ms)
3. Text and progress bar fade out (300ms)
4. Loading screen opacity transitions to 0 (600ms)
Total: ~1400ms — feels intentional and ceremonial, not slow.

---

### 6.2 Navigation Bar

Fixed, full-width, z-50.

BLUEPRINT MODE (over assembly section):
- Background: rgba(10, 22, 40, 0.75), backdrop-filter: blur(8px)
- Bottom border: 1px solid var(--annotation-line) — looks like a drawing cut line
- All text: Share Tech Mono

REALITY MODE (below assembly section):
- Background: var(--bg-surface), backdrop-filter: blur(10px)
- Bottom border: 1px solid var(--border-amber)
- Text shifts to Barlow Condensed and DM Sans
- Transition: all 600ms ease

LEFT SIDE:
- Logo container: 44x44px, border: 1px solid var(--border-blueprint), background: var(--annotation-fill), rounded-lg
- Logo image: /Logo.png, 32x32px, object-contain. Desaturated at 30% opacity in Blueprint mode (as if printed on a drawing), transitions to full color in Reality mode via filter: saturate()
- Company name: SURENDRA & CO. — Share Tech Mono, 13px, var(--text-secondary), tracking-[0.3em]

RIGHT SIDE (desktop):
- Nav links: "DRAWINGS", "RANGE", "PROCESS", "CONTACT"
- Share Tech Mono, 11px, var(--text-secondary)
- Hover in blueprint mode: var(--accent-blueprint)
- Hover in reality mode: var(--accent-amber)
- Each link has a [>] prefix character that appears on hover — mimicking a drawing pointer annotation

CTA BUTTON — "COMMISSION BUILD":
NOT a rounded pill. Instead: a rectangle with a chamfered top-right corner.
clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)
Border: 1px solid var(--border-blueprint)
Font: Share Tech Mono, 11px
In Reality Mode: transitions to a standard rounded button with amber border

MOBILE HAMBURGER:
Three horizontal dashes styled as annotation lines (wider than typical hamburger, thinner, more precise).

MOBILE DRAWER:
Full-screen overlay, navy background, grid texture, links stacked vertically with annotation-style horizontal rule dividers between each.

---

### 6.3 Hero — "The Drawing Board"

Height: 100vh

The canvas shows frame 001 — the bare chassis in 3/4 view. Multiple layers sit on top.

THE BLUEPRINT FRAME BORDER:
A full-viewport SVG overlay creates the illusion of a technical drawing's border. It is position: absolute, full viewport, pointer-events: none.

```
+-+-------------------------------------------------------+-+
| | <-------- 12,640 mm ------------------------------>   | | <- dimension line
+-+                                                       +-+
| |                                                       | |
|^|              [CANVAS CONTENT]                         |^|
|||                                                       |||
|3|                                                       |3|
|,|                                                       |,|
|2|                                                       |2|
|0|                                                       |0|
|0|                                                       |0|
|||                                                       |||
|v|                                                       |v|
| |                                                       | |
+-+                                                       +-+
| |     <- PHASE 1: THE BARE FOUNDATION ->                | | <- phase label
+-+-------------------------------------------------------+-+
                                       [TITLE BLOCK ------]
```

SVG BLUEPRINT BORDER ELEMENTS:
- Outer border rectangle: 1px, var(--annotation-line) at 40% opacity
- Inner border rectangle (inset 20px from outer): 0.5px, var(--annotation-line) at 20% opacity
- Corner marks: + shaped cross marks at all four corners, 16px size, with tiny text annotations (A1, A2, B1, B2) as on real engineering drawings
- Top dimension line: horizontal arrow spanning full width, label "12,640 mm" — the real Volvo 9600 XL exterior length
- Left dimension line: vertical arrow, label "3,200 mm" — real height
- Phase label: bottom-center text showing current phase name, updates dynamically via JavaScript as scroll progresses
- All text: Share Tech Mono, 9-10px, var(--annotation-line)

HERO TEXT (centered, inside the blueprint frame):
```
DRG NO: SC-VB11R-9600-2025         <- Share Tech Mono, 11px, text-tertiary
                                   
COACH BODY MANUFACTURE             <- Share Tech Mono, 13px, text-secondary, tracking-[0.4em]
- - - - - - - - - - - - -          <- thin horizontal rule, annotation-line, 200px
V O L V O   9 6 0 0  X L           <- Barlow Condensed 800, clamp(32px,6vw,72px), text-primary
                                   
SURENDRA & CO.                     <- Share Tech Mono, 14px, accent-blueprint, tracking-[0.5em]
                                   
SCROLL TO ASSEMBLE [v]             <- Share Tech Mono, 10px, text-tertiary, pulsing opacity
```

The space between each character in "V O L V O   9 6 0 0  X L" is intentional letter-spacing — makes it read as a stenciled designation.

ANIMATION ON LOAD:
Each text line fades in and slides up 8px over 400ms, with 120ms stagger between lines. Total entry: ~900ms.

EXIT ANIMATION:
As user scrolls into the assembly section, the hero text fades out over the first 10% of the assembly scroll range. The blueprint border SVG stays — it persists throughout the entire assembly section.

---

### 6.4 Assembly Section

Height: 500vh
Canvas: Fixed full-screen, frame scrubbing, both devices.

LAYER STACK (bottom to top, all fixed or inside sticky container):
```
Layer 1: Canvas (frame animation)         z-index: 1
Layer 2: Dark overlay (legibility)        z-index: 2   rgba(10,22,40, 0.35)
Layer 3: Blueprint border SVG             z-index: 3   pointer-events: none
Layer 4: Annotation overlay SVG           z-index: 4   pointer-events: none, per-phase
Layer 5: Bus silhouette nav (left)        z-index: 5
Layer 6: Spec sheet panel (right)         z-index: 5
Layer 7: Title block (bottom-right)       z-index: 5   fixed, fades at progress 0.8
Layer 8: Phase label (bottom-center)      z-index: 5   inside blueprint border line
Layer 9: Navigation bar                   z-index: 50
```

PHASE BOUNDARIES (same as primary UI):

| Phase | Scroll Range | Frame Range |
|---|---|---|
| 1 — The Foundation | 0-20% | 1-146 |
| 2 — Drivetrain Integration | 20-40% | 147-292 |
| 3 — Interior Architecture | 40-60% | 293-438 |
| 4 — The Exterior Shell | 60-80% | 439-584 |
| 5 — The Finished Masterpiece | 80-100% | 585-732 |

ANNOTATION SVG OVERLAYS:
Each phase has a dedicated annotation SVG that fades in at phase start and out at phase end. These overlays sit directly on the canvas.

Annotation elements:
- Dimension lines: 1px lines, var(--annotation-line), with arrowheads at both ends, pointing to specific areas of the bus visible in the frame
- Callout boxes: small rectangles with annotation-fill background and blueprint border, attached via leader lines
- Text inside callouts: Share Tech Mono, 9-10px, var(--text-primary)

CRITICAL IMPLEMENTATION NOTE: Annotation positions are percentage-based coordinates calibrated to the actual frames. Before building these SVGs, the developer must:
1. Open the key frame for each phase (use the exported key frame JPEGs)
2. Identify the pixel coordinates of each annotation target (e.g., the engine compartment position in the Phase 2 frame)
3. Convert to percentages of the frame's width/height
4. Encode as SVG line endpoint coordinates using viewBox percentages so they scale with the canvas

ANNOTATION CONTENT PER PHASE:

Phase 1 — Foundation (frame ~080):
- Annotation pointing to main longitudinal beam: [> HIGH-TENSILE STRUCTURAL STEEL]
- Annotation pointing to lower chassis: [> AIS 052 COMPLIANT UNDERFRAME]
- Annotation pointing to axle mount area: [> COMMERCIAL GRADE AXLE ASSEMBLY]
- Full-width horizontal dimension line at bottom: [12,640 mm WHEELBASE]

Phase 2 — Drivetrain (frame ~220):
- Annotation pointing to engine compartment: [> VOLVO B11R · 430 HP · EURO VI]
- Annotation pointing to rear wheel cluster: [> DUAL-TYRE REAR AXLE · TUBELESS]
- Annotation pointing to front wheel: [> SINGLE-TYRE FRONT AXLE]
- Annotation pointing to fuel tank area: [> 400L FUEL CAPACITY]

Phase 3 — Interior (frame ~380):
- Annotation pointing to upper deck zone: [> UPPER DECK · 20 BERTHS]
- Annotation pointing to lower deck zone: [> LOWER DECK · 20 BERTHS]
- Annotation pointing to upholstery: [> BLUE / TAN LEATHER UPHOLSTERY]
- Annotation pointing to floor: [> WOOD-PATTERN THEATRE FLOOR]
- Annotation pointing to curtains: [> YELLOW PRIVACY CURTAINS]

Phase 4 — Exterior (frame ~540):
- Annotation pointing to body panels: [> SILVER METALLIC ALLOY PANELS]
- Annotation pointing to windshield: [> LAMINATED SAFETY GLASS]
- Annotation pointing to side windows: [> PANORAMIC TINTED GLASS]
- Annotation pointing to roofline: [> AERODYNAMIC ROOFLINE PROFILE]

Phase 5 — Complete (frame ~720):
All previous annotations fade OUT. The finished bus needs no annotation.
Single centered text at 90% scroll progress, fading in: "DRAWING COMPLETE · READY FOR COMMISSION" — Share Tech Mono, 13px, var(--accent-amber), tracking-[0.3em]

SPEC SHEET PANEL (Right Rail):
During each phase, a spec sheet panel slides in from the right. Styled as a form from an engineering manual — NOT a glassmorphic card.

Panel styling:
- Background: var(--annotation-fill)
- Border: 1px solid var(--border-blueprint)
- Top accent bar: 2px solid var(--accent-blueprint) in phases 1-2, transitions to var(--accent-amber) in phases 3-5 (matches Blueprint to Reality transition)
- All text: Share Tech Mono, 10-12px
- Corner style: NOT rounded. Sharp 90° corners with chamfered top-right (clip-path)
- Width: 340px desktop, full-width mobile

Panel layout:
```
+----------------------------------------------------------+
| COMPONENT SPEC SHEET                   REF: SC-01-F      |
| -------------------------------------------------------- |
| COMPONENT  | STRUCTURAL FRAME ASSEMBLY                   |
| MATERIAL   | HIGH-TENSILE STEEL (Grade 550)              |
| COMPLIANCE | AIS 052 : 2008 (MoRTH)                     |
| WELD TYPE  | MIG/TIG Structural                          |
| -------------------------------------------------------- |
| REMARKS    | Primary load-bearing structure. All joints  |
|            | tested to 3x rated load specification.     |
| -------------------------------------------------------- |
| VERIFIED   | SURENDRA & CO. QC DEPT.                    |
+----------------------------------------------------------+
```

Slide animation: enters from right (x: 500 -> 0), holds center, exits to right. Easing: power1.inOut (slightly mechanical feeling, not bouncy).

PANEL CONTENT PER PHASE:

Phase 1 — Foundation:
```
REF: SC-01-CHASSIS
COMPONENT    | STRUCTURAL FRAME ASSEMBLY
MATERIAL     | HIGH-TENSILE STEEL (550 MPa)
COMPLIANCE   | AIS 052 : 2008 CERTIFIED
WELD TYPE    | MIG / TIG STRUCTURAL
SURFACE      | ANTI-CORROSION PRIMER COAT
```

Phase 2 — Drivetrain:
```
REF: SC-02-DRVTRAIN
COMPONENT    | VOLVO B11R POWERTRAIN
ENGINE       | 11L INLINE-6 DIESEL
OUTPUT       | 430 HP @ 1,800 RPM
TORQUE       | 2,100 Nm @ 1,050 RPM
EMISSION     | EURO VI COMPLIANT
TRANSMISSION | I-SHIFT 12-SPEED AUTO
```

Phase 3 — Interior:
```
REF: SC-03-INTERIOR
LAYOUT       | DOUBLE DECK SLEEPER
BERTHS       | 40 (20 UPPER / 20 LOWER)
UPHOLSTERY   | BLUE / TAN LEATHER
FLOORING     | WOOD-PATTERN THEATRE
AC SYSTEM    | DUAL-ZONE CLIMATE CTRL
CURTAINS     | YELLOW PRIVACY SCREEN
```

Phase 4 — Exterior:
```
REF: SC-04-EXTERIOR
BODY PANELS  | SILVER METALLIC ALLOY
GLASS TYPE   | PANORAMIC TINTED FLOAT
WINDSHIELD   | LAMINATED SAFETY GLASS
SEALING      | WEATHERPROOF GASKET
PAINT        | CUSTOM LIVERY AVAILABLE
```

Phase 5 — Complete:
```
REF: SC-05-COMPLETE
STATUS       | MANUFACTURING COMPLETE
DIMENSIONS   | L:12,640 x H:3,200mm
WEIGHT       | ~16,500 KG (UNLADEN)
TESTING      | FULL QC INSPECTION PASS
DELIVERY     | PAN-INDIA TRANSPORT AVAIL
COMMISSION   | [> BEGIN YOUR BUILD BELOW]
```

---

### 6.5 By the Numbers

First static section below the animation. Background transitions from blueprint navy to the same color but without the grid overlay.

SECTION HEADER:
- Reference label: SC-STATS-001 — Share Tech Mono, 10px, var(--accent-blueprint), tracking-[0.3em]
- Title: "BUILT OVER DECADES" — Barlow Condensed 800, clamp(36px,5vw,64px), var(--text-primary)
- Subtitle: "The figures behind 25 years of engineering." — DM Sans 400, 18px, var(--text-secondary)

STAT CARDS (4 on desktop in a row — 2x2 on mobile):

Each card is a hybrid — carries faint blueprint-table border feel, but with warmth:
- Background: var(--bg-surface)
- Border: 1px solid var(--border-amber)
- Top-left chamfered corner (clip-path) — echoes engineering language
- Very faint diagonal amber watermark in card background — like a certification stamp

Card layout:
```
+----------------------------------------------+
|                                              |
|  25+                                         | <- Barlow Condensed 800, 80px, amber
|  - - - - - - - - - - - - - - - - - - - -     | <- thin amber rule
|  YEARS IN OPERATION                          | <- Share Tech Mono, 11px, text-secondary
|  EST. 2000 · BAREJA, AHMEDABAD               | <- Share Tech Mono, 9px, text-tertiary
|                                              |
+----------------------------------------------+
```

Numbers animate from 0 to final value on scroll-into-view using CountUp.js or a custom requestAnimationFrame counter.

Four stats: 25+ Years, 500+ Coaches, Rs.800Cr Revenue, 40 Berths.

---

### 6.6 Our Range

Background: var(--bg-surface).

SECTION HEADER:
- Reference: SC-RANGE-002
- Title: "EVERY COACH. ENGINEERED HERE."
- Subtitle: "From luxury sleeper to institutional transport — built to your specification."

COACH CARDS (3-column grid desktop, 1-column mobile):

The card design leans hardest into the blueprint theme even in Reality Mode. Each card top half is a side-profile line drawing / silhouette of the coach type (SVG, white/cyan strokes on dark background). NOT a photo — a precise engineering line drawing with minimal dimension annotations.

```
+----------------------------------------+
| +--------------------------------------+ |
| |  [SVG side-profile silhouette]       | |
| |  <-------- 12,640mm ----------------->| |
| +--------------------------------------+ |
|                                        |
|  LUXURY SLEEPER COACH                  | <- Barlow Condensed 700, 20px
|  SC-TYPE-01 · VOLVO B11R               | <- Share Tech Mono, 10px, blueprint
|  - - - - - - - - - - - - - - - - - -   |
|  > 40 Premium Berths                   | <- DM Sans 14px, text-secondary
|  > Dual-Deck Layout                    |
|  > AIS 052 Compliant                   |
|  - - - - - - - - - - - - - - - - - -   |
|  [ REQUEST SPEC SHEET -> ]             |
+----------------------------------------+
```

The [>] bullet marker is the same annotation pointer character used in the spec sheet panels — maintains visual language consistency.

REQUEST SPEC SHEET BUTTON: Smooth-scrolls to contact form and pre-fills the coach type dropdown and prepopulates the requirements textarea with "Request full specification sheet for [type name]".

Coach types to include initially:
1. Luxury Sleeper Coach (the 9600 XL shown in the animation)
2. Semi-Sleeper Coach — 2+1 reclining seats
3. Seater Coach — standard day-route
4. School / Institutional Bus

---

### 6.7 The Making — Process Timeline

Background: var(--bg-base).

SECTION HEADER:
- Reference: SC-PROCESS-003
- Title: "FROM ORDER TO ROAD."
- Subtitle: "A 16-week journey, hand-built in Ahmedabad."

GANTT CHART LAYOUT:
Instead of a typical icon-based timeline, this section uses a Gantt-chart inspired horizontal timeline. Fleet procurement officers and project managers read Gantt charts every day. This is their visual language.

DESKTOP LAYOUT:
```
WEEKS:  01  02  03  04  05  06  07  08  09  10  11  12  13  14  15  16
        |                                                              |
 01 .   [########]
 DESIGN & CONSULTATION

 02 .                  [####################################]
 CHASSIS FABRICATION

 03 .                                              [################]
 INTERIOR FIT-OUT & FINISHING

 04 .                                                           [#####]
 QC INSPECTION & DELIVERY
```

- Week markers and row labels: Share Tech Mono, 9px, var(--text-tertiary)
- Each bar: amber gradient fill, height: 16px, border-radius: 3px
- Step title: Barlow Condensed 700, 18px, var(--text-primary)
- Step number: Share Tech Mono, 10px, var(--text-tertiary)

ANIMATION: Each Gantt bar animates its width from 0 to full length as the section scrolls into view, with 200ms stagger between each step. Looks like watching a project plan being laid out.

STEP DESCRIPTIONS:
Below each bar (or in expandable accordion on mobile), 2-3 lines of DM Sans 14px:

Step 1 — Design & Consultation (Weeks 1-2): "We begin with your requirements — route type, passenger load, comfort tier, and customizations. Engineers produce a detailed floor plan and specification sheet before any fabrication begins."

Step 2 — Chassis Fabrication (Weeks 3-8): "The Volvo chassis arrives. Our structural team builds the steel cage — every weld, every joint to AIS 052 specification. This is the foundation everything else is built upon."

Step 3 — Interior Fit-Out & Finishing (Weeks 9-14): "Berths, upholstery, flooring, AC systems, electrical, and exterior panels are installed simultaneously. Your livery is applied to the finished exterior."

Step 4 — QC Inspection & Delivery (Weeks 15-16): "Full structural integrity test, road-load simulation, electrical systems check, and RTO documentation. Coach is then transported to your depot."

MOBILE LAYOUT: Gantt rotates to a vertical stacked layout. Each step is a full-width row. The "bar" becomes a horizontal fill indicator showing relative duration.

---

### 6.8 Certifications & Compliance

Background: var(--bg-surface).

SECTION HEADER:
- Reference: SC-COMPLIANCE-004
- Title: "CERTIFIED TO EVERY STANDARD."

CERTIFICATION STAMP CARDS:
Each certification is displayed as a card styled to look like an official government certification stamp / seal. The double-border treatment mimics real official document stamps.

```
+----------------------------------------------------+
|                                                    |
|   +============================================+   |
|   ||  *                                *       ||  |
|   ||     AIS 052                               ||  |
|   ||     COACH BODY                            ||  |
|   ||     STANDARD                              ||  |
|   ||  *                                *       ||  |
|   +============================================+   |
|                                                    |
|  Ministry of Road Transport & Highways             |
|  Government of India                               |
|  Coach Body Code Compliance                        |
|                                                    |
+----------------------------------------------------+
```

The double-border box is achieved via CSS:
box-shadow: inset 0 0 0 4px var(--bg-surface), inset 0 0 0 6px var(--border-amber)
This creates a double-rule border that reads as an official stamp without extra DOM elements.

Certification name inside uses Barlow Condensed 800, large — the "stamp" text.
Issuing body below: Share Tech Mono, 10px.

Cards in 2x2 grid desktop, single column mobile.

Certifications to include:
1. AIS 052 — Coach Body Standard, MoRTH
2. BS VI / Euro VI — Emission Compliance (Volvo engine level)
3. ISO 9001 — Quality Management (confirm with client)
4. BIS Certification — if applicable (confirm with client)

Below the cards:
"All vehicles are subject to full pre-delivery inspection and arrive with complete RTO documentation." — DM Sans 14px, text-secondary, centered.

---

### 6.9 Commission Section (Contact Form)

Background: var(--bg-base), two ambient glow orbs — one blueprint blue at top-left, one amber at bottom-right, 600px diameter, blur(160px), opacity: 0.12.

SECTION HEADER — FINAL CALLBACK TO BLUEPRINT METAPHOR:
A full-bleed strip at the top of this section:
```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DRAWING NO: [YOURS TO BE ASSIGNED] · SURENDRA & CO. · BAREJA, AHD
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

Share Tech Mono, 10px, var(--text-tertiary). The dashes are the annotation-style separator.

Below this strip:
"Start Your Build." — Barlow Condensed 800, 56px. "Build." in amber gradient.

Emotional payoff: "DRAWING NO: [YOURS TO BE ASSIGNED]" — the user's commission will become a new drawing in Surendra & Co.'s catalog. The blank drawing number slot invites them to fill it.

LEFT COLUMN:
- Subheading: COMMISSION — Share Tech Mono, amber, tracked
- Main heading: Start Your Build. — Barlow Condensed 800
- Description paragraph: "25 years of building coaches for India's roads. Every vehicle is commissioned individually — no assembly lines, no stock units. Tell us what you need."
- Trust bullets with [>] annotation markers:
  > Custom-Built to Specification
  > AIS 052 Fully Compliant
  > Volvo-Certified Chassis
  > Pan-India Delivery
- Contact info: phone, email, address — all Share Tech Mono, with amber hover on icons

RIGHT COLUMN — THE FORM:
Styled as a fillable section from an engineering document. NOT a rounded glassmorphic card.

Container:
- Flat, sharp-cornered
- Border: 1px solid var(--border-amber)
- Top bar: amber filled, height: 40px, containing text "COMMISSION REQUEST FORM · SC-CR-001" in Share Tech Mono, 11px, dark text (var(--bg-base))

Fields (floating label pattern, same functionality as primary UI):
1. Full Name
2. Work Email
3. Company / Organisation
4. Phone Number
5. Coach Type (select dropdown): Luxury Sleeper, Semi-Sleeper, Seater Coach, School/Institutional, Other/Custom
6. Requirements (textarea, 4 rows)

Each input:
- Label: uppercase, Share Tech Mono, 10px, floating above the field
- Border: 1px solid var(--border-amber) at 40% opacity
- Focus: full amber border, faint amber glow box-shadow
- Background: var(--bg-elevated)

Submit button:
Full-width, amber background, Barlow Condensed 700, 20px, dark text.
Text: "SUBMIT COMMISSION REQUEST"
Hover: slightly lighter amber, border appears (1px solid var(--accent-amber-l)), scale 1.01.

Form states:
- Idle: "SUBMIT COMMISSION REQUEST" + ArrowRight icon
- Loading: spinning loader + "PROCESSING..."
- Success: CheckCircle + "REQUEST SUBMITTED" + green message "We'll be in touch within 1 business day."
- Error: XCircle + "SUBMISSION FAILED" + red error message + "TRY AGAIN"

API: Form POSTs to /api/contact (Next.js route). Use Resend or Nodemailer to deliver to surendra_bareja@yahoo.com.

---

### 6.10 Footer

Background: #060810 (deepest dark — visually distinct from the rest of the page).

TOP ELEMENT — ENGINEERING SEPARATOR:
```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  SC-VB11R-9600 SERIES · SURENDRA & CO. · BAREJA, AHMEDABAD
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Share Tech Mono, 9px, var(--text-tertiary). Maintains blueprint document language through to the very end.

3-COLUMN FOOTER LAYOUT:

Column 1 — Brand:
- Logo box (same as navbar) + SURENDRA & CO. in Barlow Condensed 700
- COACH BODY BUILDERS — Share Tech Mono, amber, tracked
- One sentence: "Precision-engineered coaches, built by hand in Ahmedabad for over 25 years."

Column 2 — Contact:
- GET IN TOUCH — Share Tech Mono label
- +91 98250 39111 — phone icon, amber on hover, tel: link
- surendra_bareja@yahoo.com — mail icon, amber on hover, mailto: link

Column 3 — Location:
- FIND US — Share Tech Mono label
- N. H. No. 8, Near APMC Market, Bareja – 382425, Taluka Daskroi, District Ahmedabad
- Map pin icon that links to Google Maps (new tab)

BOTTOM BAR:
- Left: © 2025 Surendra & Co. All rights reserved.
- Right: Privacy Policy · Terms of Service
- Both Share Tech Mono, 10px, var(--text-tertiary)

---

## 7. The Blueprint-to-Reality Transition System

This is the defining technical system of this UI. A single globalProgress value (0.0 -> 1.0) interpolates CSS custom properties across the entire page as the user scrolls through the assembly section.

### The Interpolation Function

```js
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function updateGlobalMood(progress) {
  const root = document.documentElement;

  // Grid fades out completely
  const gridOpacity = lerp(0.08, 0, progress);
  root.style.setProperty('--grid-opacity', gridOpacity);

  // Text warms from cold blue-white to warm off-white
  const r = Math.round(lerp(200, 237, progress));
  const g = Math.round(lerp(220, 232, progress));
  const b = Math.round(lerp(240, 223, progress));
  root.style.setProperty('--text-primary', `rgb(${r},${g},${b})`);

  // Annotation lines fade out faster (gone by progress 0.7)
  const annOpacity = lerp(0.60, 0, Math.min(1, progress / 0.7));
  root.style.setProperty('--annotation-opacity', annOpacity);

  // Title block fades from progress 0.7 to 1.0
  const titleOpacity = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3);
  document.getElementById('title-block').style.opacity = titleOpacity;
}
```

All setProperty calls happen inside a single requestAnimationFrame callback per scroll tick — never directly in scroll or GSAP onUpdate handler — to prevent forced reflow.

### What Changes at Each Progress Value

| Progress | Visual State |
|---|---|
| 0.0 | Full blueprint. Grid fully visible. All text cold blue-white. Annotations at full opacity. |
| 0.2 | Grid fading. Blueprint cyan accent transitioning towards amber. |
| 0.4 | Grid at 50% opacity. Text beginning to warm. Interior frame's warmth starts showing. |
| 0.6 | Grid almost gone. Annotation lines thinning. Text noticeably warmer. |
| 0.8 | Grid fully gone. Annotations invisible. Title block fading. Amber fully dominant. |
| 1.0 | Full reality. Warm off-white text. Amber accents everywhere. Clean industrial look. |

---

## 8. Bus Silhouette Navigation Element

A persistent left-rail HUD during the assembly section — a side-profile SVG of the Volvo 9600 XL with 5 component zones that progressively illuminate as the user scrolls.

Position: fixed, left: 24px, vertically centered in viewport, visible only during assembly section.
Size: 140px wide on desktop. Hidden on mobile (replaced by 5-dot phase indicator at top).

ACTIVATION BEHAVIOR:
- Inactive phase groups: opacity 0.15
- Active phase group: opacity 1.0, transition 400ms
- Completed (past) phase groups: opacity 0.40 — they were built, they persist but dimmer

By Phase 5, all 5 groups are illuminated (varying opacities), and the bus silhouette is as close to fully visible as it will be — communicating that the build is complete.

LABEL BELOW THE SVG:
```
PHASE 03
THE INTERIOR
```
Share Tech Mono, 9px. Updates dynamically.

MOBILE REPLACEMENT:
On mobile, the left-rail silhouette is hidden. A 5-dot phase indicator with Share Tech Mono labels sits at the top of the mobile viewport, below the navbar. Blueprint styled (cyan dots, annotation font).

---

## 9. Frame & Canvas Architecture

Frame loading is identical to the primary UI specification in all technical details. Key points:

Frame naming: /public/assets/frames/ezgif-frame-001.jpg through ezgif-frame-732.jpg (3-digit zero-padded).

Priority loading: every 5th frame first (~147 frames loaded before page reveals).

Background loading: remaining frames via requestIdleCallback, 6 concurrent Image() loaders.

getNearestFrame() fallback: when target frame unavailable, finds nearest loaded frame by scanning outward (lo--, hi++) from target.

Canvas DPR scaling:
```js
const dpr = isMobile ? Math.min(window.devicePixelRatio, 1.5) : (window.devicePixelRatio || 1);
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);
```

drawFrameCover() — cover-fit logic for correct aspect ratio rendering (same implementation as primary UI).

ADDITION SPECIFIC TO THIS UI:
The canvas fires a custom 'frameChanged' event on each update so annotation overlay components can listen and react to specific frame numbers if micro-positioning adjustments are needed:

```js
canvas.dispatchEvent(new CustomEvent('frameChanged', {
  detail: { frame: frameIndex, progress: scrollProgress }
}));
```

---

## 10. Mobile Strategy

Mobile uses the same canvas + 732-frame scrubbing approach as desktop. The blueprint framing device adapts to portrait orientation.

MOBILE BLUEPRINT FRAME ADJUSTMENTS:
- Dimension lines: only the left (height) dimension line is shown — horizontal width line is removed (no space in portrait)
- Title block: scaled to 70%, repositioned to bottom: 8px, right: 8px
- Corner marks: preserved — they define the "drawing" edge
- Phase label at bottom-center: font reduced to 9px, may be truncated to just the phase number

MOBILE CANVAS PERFORMANCE:
DPR capped at 1.5x on all mobile devices. On very low-end phones (deviceMemory < 3GB, detectable via navigator.deviceMemory API), cap at 1.0x:

```js
const mem = navigator.deviceMemory || 4; // default 4 if API unavailable
const maxDPR = mem < 3 ? 1.0 : 1.5;
const dpr = Math.min(window.devicePixelRatio, maxDPR);
```

MOBILE SPEC SHEET PANEL:
On mobile (< 768px), the spec sheet panel does NOT slide in from the right — no viewport width for it. Instead:
- It appears as a bottom drawer, sliding up from below
- Height: 40vh
- Same spec sheet table content and styling
- A thin drag handle at the top: a 32px x 4px rounded rect, var(--border-blueprint)
- Label at drag handle: "SPEC SHEET · DRAG DOWN TO DISMISS" — Share Tech Mono, 9px
- Appears automatically on phase entry, auto-dismisses on phase exit
- A small upward arrow indicator at bottom of canvas shows the panel is available before it slides up

MOBILE ANNOTATION SVGS:
Mobile annotation SVGs are simplified versions — fewer callout lines, larger text (11px instead of 9px), positioned to avoid overlap with the bottom drawer panel. Maximum 2-3 annotations per phase on mobile (vs 4-5 on desktop).

---

## 11. GSAP Scroll Architecture

Core ScrollTrigger setup (same as primary UI):

```js
ScrollTrigger.create({
  trigger: '#assembly-section',
  start: 'top top',
  end: 'bottom bottom',
  pin: '#assembly-sticky',
  scrub: 0.5,
  onUpdate: (self) => {
    updateFrame(self.progress);
    updatePhase(self.progress);
    updateSpecPanel(self.progress);
    updateAnnotation(self.progress);
    updateBusSilhouette(self.progress);
    updateGlobalMood(self.progress);          // Blueprint-to-Reality
    // title block fade handled inside updateGlobalMood
  }
});
```

scrub: 0.5 gives a 500ms lag behind actual scroll — smooths fast scroll movements.

PHASE DETECTION:

```js
const PHASE_BOUNDARIES = [0, 0.20, 0.40, 0.60, 0.80, 1.0];

function getCurrentPhase(progress) {
  for (let i = 0; i < 5; i++) {
    if (progress >= PHASE_BOUNDARIES[i] && progress < PHASE_BOUNDARIES[i + 1]) {
      return i + 1;
    }
  }
  return 5;
}
```

ANNOTATION MANAGEMENT:

```js
let currentAnnotationPhase = null;

function updateAnnotation(progress) {
  const phase = getCurrentPhase(progress);
  if (phase === currentAnnotationPhase) return;

  if (currentAnnotationPhase) {
    gsap.to(`#annotation-phase-${currentAnnotationPhase}`, {
      opacity: 0, duration: 0.3, ease: 'power1.in'
    });
  }

  if (phase < 5) { // Phase 5 has no annotation
    gsap.to(`#annotation-phase-${phase}`, {
      opacity: 1, duration: 0.5, ease: 'power1.out'
    });
  }

  currentAnnotationPhase = phase;
}
```

BUS SILHOUETTE UPDATE:

```js
function updateBusSilhouette(progress) {
  const phase = getCurrentPhase(progress);

  for (let i = 1; i <= 5; i++) {
    const group = document.getElementById(`silhouette-phase-${i}`);
    if (!group) continue;
    if (i < phase) {
      group.style.opacity = 0.40;  // completed — dimmer but visible
    } else if (i === phase) {
      group.style.opacity = 1.0;   // active
    } else {
      group.style.opacity = 0.15;  // not yet built
    }
  }
}
```

HERO EXIT ANIMATION:
```js
ScrollTrigger.create({
  trigger: '#assembly-section',
  start: 'top top',
  end: '10% top',
  scrub: true,
  onUpdate: (self) => {
    gsap.set('#hero-content', {
      opacity: 1 - self.progress,
      y: self.progress * -30
    });
  }
});
```

---

## 12. Component Inventory

```
/components
  /layout
    Navbar.tsx                — Fixed header, blueprint -> reality style transition
    Footer.tsx                — Blueprint-styled footer with drawing separator
    LoadingScreen.tsx         — SVG stroke-draw animation + progress bar

  /canvas
    FrameCanvas.tsx           — Canvas element + frame rendering + frameChanged event
    FrameLoader.ts            — Priority-tier preloader (identical to primary UI)

  /blueprint
    BlueprintBorder.tsx       — Full-viewport SVG frame overlay (dimension lines, corner marks)
    TitleBlock.tsx            — Engineering title block (fixed, bottom-right, fades at end)
    AnnotationOverlay.tsx     — Phase-specific SVG annotation layer (accepts phase prop)
    BusSilhouetteNav.tsx      — Left-rail progressive SVG with 5 group zones
    MoodController.ts         — globalProgress -> CSS variable interpolator
    GridBackground.tsx        — Body wrapper applying grid texture

  /assembly
    AssemblySection.tsx       — 500vh scroll container + all GSAP initialization
    SpecSheetPanel.tsx        — Engineering spec sheet sliding panel (desktop) + drawer (mobile)
    SpecSheetData.ts          — Static spec table data for all 5 phases

  /sections
    HeroDrawingBoard.tsx      — Hero overlay — blueprint frame + centered drawing text
    ByTheNumbers.tsx          — Stat counter cards
    OurRange.tsx              — Coach type cards with SVG silhouette drawings
    TheMaking.tsx             — Gantt chart process timeline
    Certifications.tsx        — Stamp-style compliance cards
    CommissionForm.tsx        — Engineering-form-styled contact form

  /ui
    ChamferedButton.tsx       — Button with clip-path chamfered top-right corner
    GanttBar.tsx              — Individual animated Gantt bar with label
    StatCounter.tsx           — Animated number counter with RAF
    SpecRow.tsx               — Single key|value row for spec sheet tables
    AnnotationCallout.tsx     — Individual callout box (leader line + box + text)
```

---

## 13. Responsive Breakpoints

Same as primary UI specification:

```
Base (< 640px)    — Mobile portrait. Canvas scrubbing. Bottom-drawer spec panel.
                    Simplified 2-3 annotations per phase. 5-dot phase indicator at top.
sm (640-767px)    — Mobile landscape. Same as base.
md (768-1023px)   — Tablet. Left-rail silhouette nav appears. Side spec panel.
lg (1024-1279px)  — Standard desktop. Full layout.
xl (1280px+)      — Large desktop. Max-width content container (1280px).
```

Device switch (canvas vs no canvas) is not applicable here — both devices use canvas.

---

## 14. Performance Checklist

ALL items from primary UI performance checklist apply, plus:

BLUEPRINT-SPECIFIC ITEMS:
- [ ] Blueprint border SVG is a single optimized SVG file, not inline JSX
- [ ] All 5 annotation SVGs run through SVGO before deployment
- [ ] Bus silhouette SVG total stroke length pre-calculated and stored as a constant in the code (avoid calling getTotalLength() at runtime on every frame)
- [ ] CSS custom property updates (updateGlobalMood) batched in one requestAnimationFrame tick — never directly in scroll callback
- [ ] Grid texture is a CSS background-image SVG tile, not a DOM element — zero layout cost
- [ ] Mobile canvas DPR capped at 1.5x (1.0x on < 3GB RAM devices via navigator.deviceMemory)
- [ ] Annotation SVGs for phases NOT yet active are display: none (not just opacity: 0) — removes them from paint entirely
- [ ] BusSilhouetteNav uses will-change: opacity on each group to promote GPU compositing

---

## 15. File & Folder Structure

```
surendra-co-blueprint/
|
+-- public/
|   +-- assets/
|   |   +-- frames/
|   |   |   +-- ezgif-frame-001.jpg
|   |   |   +-- ... (732 frames total)
|   |   |   +-- ezgif-frame-732.jpg
|   |   |
|   |   +-- svg/
|   |   |   +-- blueprint-border.svg
|   |   |   +-- bus-silhouette-side.svg
|   |   |   +-- grid-texture.svg
|   |   |   +-- annotation-phase-1.svg
|   |   |   +-- annotation-phase-2.svg
|   |   |   +-- annotation-phase-3.svg
|   |   |   +-- annotation-phase-4.svg
|   |   |   +-- annotation-phase-5.svg
|   |   |
|   |   +-- keyframes/
|   |       +-- phase-1-chassis.jpg
|   |       +-- phase-2-drivetrain.jpg
|   |       +-- phase-3-interior.jpg
|   |       +-- phase-4-exterior.jpg
|   |       +-- phase-5-complete.jpg
|   |
|   +-- Logo.png
|
+-- src/
|   +-- app/
|   |   +-- layout.tsx         — Root layout, font imports, metadata
|   |   +-- page.tsx           — Main page composition
|   |   +-- api/
|   |       +-- contact/
|   |           +-- route.ts   — Email delivery API route
|   |
|   +-- components/
|   |   +-- [all components as listed in Component Inventory]
|   |
|   +-- lib/
|   |   +-- frameLoader.ts     — Priority-tier preloader
|   |   +-- specSheetData.ts   — All 5 phase spec table data
|   |   +-- moodController.ts  — Blueprint-to-Reality CSS interpolator
|   |   +-- phaseConfig.ts     — Phase boundaries, frame ranges, annotation coords
|   |
|   +-- styles/
|       +-- globals.css        — All CSS variables, grid texture, base resets
|
+-- tailwind.config.ts
+-- next.config.mjs
+-- package.json
```

---

## 16. Known Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Annotation SVG positions misaligned with actual frame content | High | Medium | Positions must be calibrated per frame after frames are finalized. Budget 4-6 hours specifically for annotation position calibration. Use the exported key frames as reference images during positioning. |
| Bus silhouette SVG requires professional drawing | Medium | High | Trace from a reference image of the 9600 XL using Inkscape (free). If skills are unavailable, a simplified 5-rectangle abstraction can substitute without losing the concept identity. |
| CSS variable interpolation causes jank on low-end Android | Medium | Medium | All setProperty calls are batched inside one RAF tick. Test specifically on Redmi Note / Samsung A-series devices. |
| Mobile canvas + 732 frames causes memory issues on 3GB RAM phones | Medium | High | DPR capped at 1.5x (1.0x on < 3GB). navigator.deviceMemory check implemented. |
| Client may find the blueprint concept "too technical" or cold | Medium | Low | The loading screen's bus-drawing animation and the warm amber-amber transition in Phase 3-5 will win over even non-technical viewers. Have a 10-second screen recording ready to show the concept before the client opens it. |
| Engineering grid texture conflicts with canvas content legibility | Low | Medium | Grid opacity is 0.08 — extremely subtle. If conflict exists, apply a CSS mask-image within the canvas viewport area that hides the grid only where the canvas shows through. |
| Share Tech Mono fails to load on very old browsers or slow connections | Low | Low | Add monospace fallback: font-family: 'Share Tech Mono', 'Courier New', monospace. The fallback is acceptable. |
| Annotation callouts cover key parts of the bus frame | Possible | Medium | Review each annotation against its target frame. Callout positions are adjustable by editing the annotation SVG coordinates in phaseConfig.ts. Budget time for this review pass. |

---

*End of Specification — Alternative UI Concept #1: "The Blueprint"*
*All annotation positions must be calibrated against actual frames before development completes.*
