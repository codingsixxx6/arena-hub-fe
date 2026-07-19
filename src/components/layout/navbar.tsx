"use client";

import Link from "next/link";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/useLogout";
import Button from "../ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const [userClicked, setUserClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const onUserClicked = () => {
    setUserClicked(!userClicked);
  };

  // Efek 1: Menangani deteksi scroll untuk efek glassmorphism navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efek 2: Mengunci scroll layar utama saat mobile menu sedang terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Pembersihan (cleanup) jika komponen dilepas (unmount) tiba-tiba
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? " " : "bg-slate-900"
      }`}
    >
      <div className="h-20 px-6 flex items-center bg-slate-900/5 backdrop-blur-2xl shadow-2xl">
        <div className="flex justify-between w-full max-w-7xl mx-auto items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-white"
          >
            ARENA<span className="text-lime-400">HUB</span>
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center gap-10">
            <nav className="hidden items-center gap-7 lg:flex text-lg font-semibold">
              {pathname === "/" ? (
                <>
                  <Link
                    href="#about"
                    className="text-slate-300 hover:text-lime-400 transition"
                  >
                    About
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
                </>
              ) : (
                <Link
                  href="/"
                  className="text-slate-300 hover:text-lime-400 transition"
                >
                  Home
                </Link>
              )}
              {user && (
                <Link
                  href="/bookings"
                  className="text-slate-300 hover:text-lime-400 transition"
                >
                  My Bookings
                </Link>
              )}
            </nav>

            {/* Right Desktop */}
            <div className="hidden items-center gap-4 lg:flex font-semibold">
              {!user && (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
              {user && (
                <div className="relative">
                  <button
                    onClick={onUserClicked}
                    className="cursor-pointer border-2 border-white hover:border-lime-400 rounded-full p-0.5 transition"
                  >
                    <UserRound size={30} color="white" />
                  </button>
                  {userClicked && (
                    <div className="absolute right-0 p-7 bg-[#020617] flex flex-col gap-7 border border-white/30 rounded-xl text-white mt-7 *:hover:text-lime-400 *:hover:cursor-pointer">
                      <p className="text-nowrap">{user.fullName}</p>
                      <button
                        type="button"
                        disabled={isLoggingOut}
                        onClick={() => logout()}
                        className="text-gray-400 transition hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-5"
                        aria-label="Logout"
                      >
                        Log Out
                        <LogOut size={18} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="lg:hidden text-white hover:text-lime-400 transition focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed left-0 top-20 w-full h-[calc(100vh-5rem)] bg-slate-900 px-6 py-4 flex flex-col divide-y divide-white/10 text-white text-xl font-medium overflow-y-auto">
          <Link 
            href="/" 
            className="py-5 hover:text-lime-400 transition" 
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link 
            href="/courts" 
            className="py-5 hover:text-lime-400 transition" 
            onClick={() => setIsOpen(false)}
          >
            Explore
          </Link>

          {user ? (
            <>
              <Link 
                href="/bookings" 
                className="py-5 hover:text-lime-400 transition" 
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>

              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="py-5 text-gray-400 transition hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-5 w-full text-left"
                aria-label="Logout"
              >
                Log Out
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="py-5 text-lime-400 font-semibold" 
              onClick={() => setIsOpen(false)}
            >
              Login Account
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
