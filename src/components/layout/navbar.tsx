"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "  "
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-full items-center justify-between px-6  bg-slate-900/5 backdrop-blur-2xl shadow-2xl">
        {/* Logo */}

        <Link href="/" className="text-5xl font-bold tracking-tight">
          ARENA<span className="text-lime-400">HUB</span>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-10 lg:flex text-2xl font-semibold">
          <Link
            href="#about"
            className="text-slate-300 hover:text-lime-400 transition"
          >
            About
          </Link>

          <Link
            href="#facilities"
            className="text-slate-300 hover:text-lime-400 transition"
          >
            Facilities
          </Link>

          <Link
            href="#courts"
            className="text-slate-300 hover:text-lime-400 transition"
          >
            Courts
          </Link>

          <Link
            href="#contact"
            className="text-slate-300 hover:text-lime-400 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Right */}

        <div className="hidden items-center gap-4 lg:flex text-xl font-semibold">
          <Link
            href="/login"
            className="rounded-xl border border-slate-700 px-5 py-2.5 text-xl font-semibold transition hover:border-lime-400 hover:text-lime-400"
          >
            Login
          </Link>

          <Link
            href="/booking"
            className="rounded-xl bg-lime-400 px-6 py-2.5 font-semibold text-slate-950 shadow-[0_0_25px_rgba(200,255,0,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(200,255,0,.45)]"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile */}

        <button className="lg:hidden">
          <Menu />
        </button>
      </div>
    </header>
  );
}
