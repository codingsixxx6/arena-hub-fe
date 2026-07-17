"use client";

import Link from "next/link";
import { LoaderCircle, LogOut, Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/useLogout";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const [userClicked, setUserClicked] = useState<boolean>(false);
  const onUserClicked = () => {
    setUserClicked(!userClicked);
  };
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
        scrolled ? "  " : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-full items-center justify-between px-6  bg-slate-900/5 backdrop-blur-2xl shadow-2xl">
        {/* Logo */}

        <Link href="/" className="text-5xl font-bold tracking-tight text-white">
          ARENA<span className="text-lime-400">HUB</span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-10 lg:flex text-2xl font-semibold">
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
          </nav>

          {/* Right */}

          <div className="hidden items-center gap-4 lg:flex text-xl font-semibold">
            {!user && (
              <Link
                href="/login"
                className="rounded-xl border border-slate-700 px-5 py-2.5 text-xl font-semibold transition hover:border-lime-400 hover:text-lime-400"
              >
                Login
              </Link>
            )}
            {user && (
              <div className="relative">
                <button
                  onClick={onUserClicked}
                  className="cursor-pointer border-2 border-white hover:border-2  hover:border-lime-400 rounded-full"
                >
                  <UserRound size={50} color="white" />
                </button>
                {userClicked && (
                  <div className="absolute right-0 p-7 bg-[#020617] flex flex-col gap-7 border border-lime-400 rounded-xl text-white mt-7 *:hover:text-lime-400 *:hover:cursor-pointer">
                    <p className="text-nowrap">{user.fullName}</p>
                    <Link href="/bookings">My Bookings</Link>
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

        {/* Mobile */}

        <button className="lg:hidden">
          <Menu />
        </button>
      </div>
    </header>
  );
}
