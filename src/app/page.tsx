"use client";

import { Suspense, lazy, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import { Loader } from "@/components/common/Loader";
import dynamic from "next/dynamic";
const HearFromInfluencer = dynamic(
  () => import("@/components/home/HearFromInfluencer"),
  {
    ssr: false,
  }
);
const WhoAreWe = lazy(() => import("@/components/home/WhoAreWe"));
// import Banner from "@/components/home/Banner";
// const Banner = lazy(() => import("@/components/home/Banner"));
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const WhatWeDo = lazy(() => import("@/components/home/WhatWeDo"));
const WhyWeDoIt = lazy(() => import("@/components/home/WhyWeDoIt"));
// const WeEmpowerBrand = lazy(() => import("@/components/home/WeEmpowerBrand"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const Stats = lazy(() => import("@/components/home/Stats"));
const GetInTouch = lazy(() => import("@/components/home/GetInTouch"));
// const NewsLetter = lazy(() => import("@/components/home/NewsLetter"));
const Footer = lazy(() => import("@/components/home/Footer"));

function SearchParamsComponent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [searchParams]);

  return null;
}

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center">
      {/* <Banner /> */}
      {/* <div className="w-full max-w-[1920px] mx-auto"> */}
      <Header />
      <HeroSection />
      {/* </div> */}

      <div className="w-full max-w-[1920px] mx-auto">
        {/* <InfluEnergySection /> */}

        <Suspense fallback={<Loader />}>
          <div id="who-we-are">
            <WhoAreWe />
          </div>
        </Suspense>

        <Suspense fallback={<Loader />}>

          <div id="what-we-do">
            <WhatWeDo />
          </div>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <HearFromInfluencer />
          <div id="stats">

            <Stats />
          </div>
          <div id="why-we-do-it">
            <WhyWeDoIt />
          </div>

          <div id="testimonials">
            <Testimonials />
          </div>
        </Suspense>


        <Suspense fallback={<Loader />}>
          {/* <div id="blog">
            <Blog />
          </div> */}
          <div id="get-in-touch">
            <GetInTouch />
          </div>
          {/* <NewsLetter /> */}
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading search parameters...</div>}>
        <SearchParamsComponent />
      </Suspense>
    </section>
  );
}
