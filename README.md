# Volvo 9600 XL Landing Page

A premium, responsive, single-page landing site for the **Volvo 9600 XL Premium Sleeper Coach**. Designed with a high-end, cinematic aesthetic, this project features interactive scroll animations and a robust lead-generation backend.

## ✨ Key Features

- **Cinematic Experience**: A scroll-tied image sequence assembly effect built with HTML5 Canvas and optimized with GSAP for smooth performance.
- **Premium UI/UX**: Dark mode aesthetic, responsive design, and polished micro-interactions.
- **Smooth Navigation**: "Configure Yours" call-to-action buttons feature smooth scrolling directly to the contact form.
- **Serverless Backend**: Secure Next.js API routes handle form submissions without needing a dedicated backend server.
- **Data Persistence**: Lead generation data is securely stored in a Supabase PostgreSQL database.
- **Automated Email Notifications**: Real-time email alerts triggered by the Resend API upon successful lead submission.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & HTML5 Canvas
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/)
- **Emails**: [Resend](https://resend.com/)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and npm/yarn/pnpm installed.

### 1. Clone the repository and install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following keys. You will need to obtain these from your Supabase and Resend dashboards:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

### 3. Database Setup

Run the provided `supabase_setup.sql` script in your Supabase SQL Editor to initialize the necessary table (`leads`) for the contact form.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable React components (UI elements, Contact Form, Canvas Animation).
- `public/`: Static assets (images, sequence frames).
- `src/`: Additional source code, utilities, or libraries.

## 📜 License

This project is intended for demonstration purposes. All Volvo trademarks and imagery belong to their respective owners.
