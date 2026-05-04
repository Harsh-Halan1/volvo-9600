# Project Context: Volvo 9600 XL Landing Page

## Project Overview
This project is a premium, responsive, single-page landing site for the **Volvo 9600 XL Premium Sleeper Coach**. The main objective is to provide a high-end, cinematic user experience showcasing the vehicle, combined with a lead generation form.

## Key Features & Requirements
1. **Cinematic Aesthetic & Animations**:
   - Scroll-tied image sequence assembly effect implemented via a performant HTML5 Canvas.
   - Smooth animations and transitions powered by GSAP (`@gsap/react`, `gsap`).
   - Premium design featuring dark mode aesthetics, smooth scroll, and polished UI components.

2. **Call-to-Action (CTA)**:
   - "Configure Yours" buttons that implement smooth scroll to the contact form section at the bottom of the page, rather than jumping abruptly.

3. **Backend Integration**:
   - Secure serverless API route to handle contact form submissions.
   - **Database**: Lead data is securely stored in a Supabase database.
   - **Notifications**: Automated email notifications triggered via the Resend API upon successful form submission.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Database**: Supabase
- **Email Service**: Resend

## Current Status
The project is structurally complete. Core landing page UI, the canvas-based scroll animation, and backend integrations (Supabase & Resend) have been configured. The "Configure Yours" smooth scrolling functionality to the contact section is implemented.

## Environment Variables Needed
To run the project locally, a `.env.local` file is required with the following keys:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- (Optional) Recipient email configuration for notifications.
