import Hero from "@/components/homepage/Hero";
import WhySection from "@/components/homepage/WhySection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <WhySection />
    </>
  );
}
