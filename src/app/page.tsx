"use client"; // Add this directive to mark as a Client Component

import { Suspense, lazy } from "react";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import InfluEnergySection from "@/components/home/Influenergy";
import { Loader } from "@/components/common/Loader";
const WhoAreWe = lazy(() => import("@/components/home/WhoAreWe"));
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const WhatWeDo = lazy(() => import("@/components/home/WhatWeDo"));
const WhyWeDoIt = lazy(() => import("@/components/home/WhyWeDoIt"));
const WeEmpowerBrand = lazy(() => import("@/components/home/WeEmpowerBrand"));
const Blog = lazy(() => import("@/components/home/Blog"));
const GetInTouch = lazy(() => import("@/components/home/GetInTouch"));
const NewsLetter = lazy(() => import("@/components/home/NewsLetter"));
const Footer = lazy(() => import("@/components/home/Footer"));

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center overflow-hidden">
      <Header />
      <HeroSection />

      <div className="w-full max-w-[1920px] mx-auto">
        <InfluEnergySection />

        <Suspense fallback={<Loader />}>
          <WhoAreWe />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <WhatWeDo />
          <WhyWeDoIt />
          <WeEmpowerBrand />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Blog />
          <GetInTouch />
          <NewsLetter />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      </div>
    </section>
  );
}
