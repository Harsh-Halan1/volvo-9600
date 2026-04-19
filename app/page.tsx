import CanvasHero from '../components/CanvasHero';
import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'Volvo 9600 XL | Premium Sleeper Coach',
  description: 'Discover the pinnacle of commercial travel with the Volvo 9600 XL Premium Sleeper Coach.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0c10]">
      {/* 
        The Hero Section renders the pinned canvas and scrubs 
        the image sequence based on scroll position.
      */}
      <CanvasHero />
      
      {/* 
        The Contact Form section slides into view organically 
        after the pinning completes.
      */}
      <ContactForm />
      
      {/* Minimal Footer */}
      <footer className="w-full bg-[#060709] py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Volvo Buses. All rights reserved.</p>
        <p className="mt-2">This is a concept landing page.</p>
      </footer>
    </main>
  );
}
