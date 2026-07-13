import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import FeatureSection from "@/components/FeatureSection";
import EvolutionSection from "@/components/EvolutionSection";
import SourcingSection from "@/components/SourcingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3ECD6]">
      <main className="relative z-10 bg-[#F3ECD6] mb-[100vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Nav />
        <Hero />
        <Marquee />
        <Products />
        <FeatureSection />
        <EvolutionSection />
        <SourcingSection />
      </main>
      <Footer />
    </div>
  );
}
