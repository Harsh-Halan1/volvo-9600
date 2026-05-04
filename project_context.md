# Project Context: Surendra & Co. Volvo 9600 XL Landing Page

## Project Overview
This project is a premium, responsive, single-page landing site for the **Volvo 9600 XL Premium Sleeper Coach**, built for Surendra & Co., master coachbuilders in Ahmedabad. The main objective is to provide a high-end, continuous cinematic interactive movie experience using a unified GSAP orchestrator, combining a 3D WebGL-style bus assembly sequence with glassmorphic HUD traversal overlays.

## Key Features & Architecture
1. **MasterNarrative Orchestrator**:
   - The entire website abandons traditional discrete scrolling sections in favor of a single `MasterNarrative` orchestrator.
   - The 732-frame image sequence assembly effect is implemented on a `<canvas>` that is `position: fixed` behind the entire document, perfectly synced to the global scrollbar using `ScrollTrigger`.

2. **Glassmorphic HUD Overlays**:
   - Foreground content uses a heavy frosted glass aesthetic (`backdrop-blur-2xl`) allowing the continuous bus assembly animation to be seen moving through the content.
   - Features a **Bus-Layout Bento Grid** and **Bus-Layout Craftsmanship Section** where UI cards are mapped via CSS Grid to exactly match the side-profile of a bus, and animate in horizontally to simulate the vehicle driving past the camera.

3. **Call-to-Action (CTA) & Conversion**:
   - "Start Your Build" buttons that implement smooth scroll to the `ConversionSection` at the bottom of the cinematic timeline.
   - Secure serverless API route (`/api/contact`) to handle contact form submissions.
   - **Database**: Lead data is securely stored in a Supabase database (lazily loaded to support preview environments without DB).
   - **Notifications**: Automated email notifications triggered via the Resend API upon successful form submission.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (`@gsap/react`, `gsap`, `ScrollTrigger`)
- **Smooth Scrolling**: Lenis (`lenis`, `studio-freight/react-lenis`)
- **Icons**: Lucide React
- **Database**: Supabase
- **Email Service**: Resend

## Current Status
The project has successfully transitioned from modular sections to the `MasterNarrative` interactive movie architecture. The global canvas pinning, horizontal glassmorphic HUD bus traversal animations, and lazy-loaded DB endpoints are fully implemented and passing Vercel static builds.

## Environment Variables Needed
To run the project locally with full backend capabilities, a `.env.local` file is required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
*(Note: If these are not provided, the contact API safely bypasses execution and returns a mock success response.)*
