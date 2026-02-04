import FAQ from "./components/Faq";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import VideoMain from "./components/VideoMain";

export default function HomePage() {
  return (
    <>
      <VideoMain />
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <FAQ />
      <Footer />
    </>
  );
}
