"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
 User,
  Eye,
  EyeOff,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">

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

        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-lime-400"
        >
          ARENAHUB
        </Link>

        <Link
          href="#"
          className="text-sm text-gray-300 hover:text-lime-400 transition"
        >
          Need Help?
        </Link>

      </nav>

      {/* Register Card */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="w-full max-w-md rounded-3xl border border-white/10 p-10 backdrop-blur shadow-2xl">

          {/* Heading */}

          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold text-white">
              Join ArenaHub
            </h1>

            <p className="mt-2 text-gray-400">
              Create your account and start booking your next game.
            </p>

          </div>

          {/* Form */}

          <form className="space-y-5">

            {/* Full Name */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-4 pl-11 pr-4 text-white outline-none transition focus:border-lime-400"
                />

              </div>

            </div>

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
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-4 pl-11 pr-4 text-white outline-none transition focus:border-lime-400"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                Password
              </label>

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
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Confirm Password */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-4 pl-11 pr-12 text-white outline-none transition focus:border-lime-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Terms */}

            <label className="flex items-start gap-3 text-sm text-gray-400">

              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-lime-400"
              />

              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-lime-400 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-lime-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>

            </label>

            {/* Button */}

            <button
              className="w-full rounded-xl bg-lime-400 py-4 font-bold uppercase tracking-wider text-black transition hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,.45)]"
            >
              CREATE ACCOUNT
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

          {/* Social Login */}

          {/* <div className="grid grid-cols-2 gap-4">

            <button className="rounded-xl border border-slate-700 bg-slate-800 py-3 text-white transition hover:bg-slate-700">
              Google
            </button>

            <button className="rounded-xl border border-slate-700 bg-slate-800 py-3 text-white transition hover:bg-slate-700">
              Apple
            </button>

          </div> */}

          {/* Footer */}

          <p className="mt-8 text-center text-gray-400">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-lime-400 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}