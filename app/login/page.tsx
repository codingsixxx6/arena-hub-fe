"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative h-screen overflow-hidden bg-slate-950">

      {/* Background */}
      <Image
        src="/images/Arena-Hub.png"
        alt="ArenaHub"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-extrabold tracking-wide text-lime-400">
          ARENAHUB
        </h1>

        <Link
          href="#"
          className="text-sm text-gray-300 hover:text-lime-400 transition"
        >
          Need Help?
        </Link>
      </nav>

      {/* Login Card */}
      <div className="relative z-10 flex h-full items-center justify-center px-5">

        <div className="w-full max-w-md rounded-3xl border border-white/10 p-10 backdrop-blur shadow-2xl">

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Welcome Back, Athlete
            </h2>

            <p className="mt-2 text-gray-400">
              Login to book your next court
            </p>
          </div>

          <form className="space-y-5">

            {/* Email */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  placeholder="coach@arenahub.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-4 pl-11 pr-4 text-white outline-none transition focus:border-lime-400"
                />
              </div>
            </div>

            {/* Password */}

            <div>

              <div className="mb-2 flex justify-between">

                <label className="text-xs uppercase tracking-widest text-gray-400">
                  Password
                </label>

                <Link
                  href="/register"
                  className="text-xs text-lime-400 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-4 pl-11 pr-12 text-white outline-none transition focus:border-lime-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <label className="flex items-center gap-3 text-sm text-gray-400">

              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-lime-400"
              />

              Keep me signed in

            </label>

            {/* Login */}

            <button
              className="w-full rounded-xl bg-lime-400 py-4 font-bold uppercase tracking-wider text-black transition hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,.5)]"
            >
              LOGIN
            </button>

          </form>

          {/* Divider */}

          <div className="my-8 flex items-center">

            <div className="h-px flex-1 bg-slate-700" />

            <span className="mx-4 text-xs uppercase text-gray-500">
              Or Continue With
            </span>

            <div className="h-px flex-1 bg-slate-700" />

          </div>

          {/* Social */}

          {/* <div className="grid grid-cols-2 gap-4">

            <button className="rounded-xl border border-slate-700 bg-slate-800 py-3 text-white transition hover:bg-slate-700">
              Google
            </button>

            <button className="rounded-xl border border-slate-700 bg-slate-800 py-3 text-white transition hover:bg-slate-700">
              Apple
            </button>

          </div> */}

          {/* Register */}

          <p className="mt-8 text-center text-gray-400">

            {"Don't have an account?"}{" "}

            <Link
              href="/register"
              className="font-semibold text-lime-400 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>
    </main>
  );
}