import Footer from "@/components/Footer";
import Hero from "@/components/homepage/Hero";
import StepSections from "@/components/homepage/StepSection";
import WhySection from "@/components/homepage/WhySection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)]">
      <Navbar />
      <Hero/>
      <WhySection />
      <StepSections />
      <Footer />
    </div>
  );
}
