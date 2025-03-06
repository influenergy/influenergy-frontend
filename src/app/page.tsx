import Blog from "@/components/home/Blog";
import Footer from "@/components/home/Footer";
import GetInTouch from "@/components/home/GetInTouch";
import Header from "@/components/home/Header";
// import HearFromInfluencer from "@/components/home/HearFromInfluencer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import InfluEnergySection from "@/components/home/Influenergy";
import NewsLetter from "@/components/home/NewsLetter";
import WeEmpowerBrand from "@/components/home/WeEmpowerBrand";
import WhatWeDo from "@/components/home/WhatWeDo";
import WhoAreWe from "@/components/home/WhoAreWe";
import WhyWeDoIt from "@/components/home/WhyWeDoIt";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main content with consistent spacing */}
      <div className="w-full max-w-[1920px] mx-auto">
        <InfluEnergySection />
        <WhoAreWe />
        <HowItWorks />
        <WhatWeDo />
        <WhyWeDoIt />
        {/* <HearFromInfluencer /> */}
        <WeEmpowerBrand />
        <Blog />
        <GetInTouch />
        <NewsLetter />
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
