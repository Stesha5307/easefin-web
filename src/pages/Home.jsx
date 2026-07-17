import React from "react";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Statistics from "@/components/home/Statistics";
import Features from "@/components/home/Features";
import Mission from "@/components/home/Mission";
import CallToAction from "@/components/home/CallToAction";
import { useLanguage } from "@/components/LanguageContext";

export default function Home() {
  const { isRTL } = useLanguage();

  return (
    <main className={`easefin-home ${isRTL ? "rtl" : "ltr"}`}>
      <div className="easefin-intro">
        <Header />
        <Hero />
      </div>
      <Services />
      <Statistics />
      <Features />
      <Mission />
      <CallToAction />
    </main>
  );
}
