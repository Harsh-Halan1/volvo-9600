import HeroReveal from "../components/HeroReveal";
import HorizontalScroll from "../components/HorizontalScroll";
import BentoGrid from "../components/BentoGrid";
import ConversionSection from "../components/ConversionSection";

export const metadata = {
  title: "Surendra & Co. | Master Coach Body Builders — Ahmedabad",
  description:
    "Experience the art of coachbuilding. Surendra & Co. — master coachbuilders crafting premium sleeper coaches with 25+ years of engineering excellence. Custom-built Volvo 9600 XL coaches.",
  icons: {
    icon: "/Logo.png",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0F1A]">
      {/* Phase 1: Hero Reveal — Pinned canvas + CRAFTED. + Color Wipe */}
      <HeroReveal />

      {/* Phase 2: Deep Dive — Horizontal scroll craftsmanship cards */}
      <HorizontalScroll />

      {/* Phase 3: Bento Grid — Specifications & legacy */}
      <BentoGrid />

      {/* Phase 4: Conversion — Form + Footer */}
      <ConversionSection />
    </main>
  );
}
