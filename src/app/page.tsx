"use client";
import Navbar from "../components/layout/navbar";
import Hero from "../components/landing/hero";
import About from "@/components/landing/about";
import Facilities from "@/components/landing/facilities";
import Courts from "@/components/landing/courts";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <main className="bg-[#020617] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Courts />
      <Testimonials />
      <Footer />
    </main>
  );
}
