import CanvasHero from '../components/CanvasHero';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Volvo 9600 XL | Premium Sleeper Coach',
  description: 'Discover the pinnacle of commercial travel with the Volvo 9600 XL Premium Sleeper Coach.',
  icons: {
    icon: '/Logo.png',
  },
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
      
      {/* Footer Section */}
      <Footer />
    </main>
  );
}
