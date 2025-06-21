import Footer from "@/components/Footer";
import Hero from "@/components/homepage/Hero";
import DemoSection from "@/components/homepage/DemoSection";
import WhySection from "@/components/homepage/WhySection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero/>
      <WhySection />
      <DemoSection />
      <Footer />
    </div>
  );
}
