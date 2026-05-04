import CanvasHero from '../components/CanvasHero';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Surendra & Co. | Premium Coach Body Builders',
  description: 'Experience the craftsmanship of Surendra & Co. — premier coach body builders delivering custom sleeper coaches with unmatched quality.',
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
