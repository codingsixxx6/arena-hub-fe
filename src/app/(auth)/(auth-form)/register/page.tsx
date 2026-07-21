"use client";

import {
  authRegisterInput,
  authRegisterSchema,
} from "@/features/auth/validations/auth.validation";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authRegisterInput>({
    resolver: zodResolver(authRegisterSchema),
  });
  const { mutate: authRegisterMutation, isPending } = useMutation({
    mutationFn: async (body: authRegisterInput) => {
      return await api.post("/auth/register", { ...body, role: "PLAYER" });
    },
    onSuccess: (res) => {
      route.push("/login");
      toast.success(res.data.message);
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      toast.error(err.response?.data.message);
    },
  });
  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Arenahub.png')",
      }}
    >
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="rounded-[28px] border-black bg-black-700/30 p-8 shadow-xl backdrop-blur">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href={"/"}>
              <h1 className="text-3xl font-bold text-white">
                ARENA<span className="text-lime-400">HUB</span>
              </h1>
            </Link>

            <p className="mt-3 text-slate-400 text-sm">
              {"Join Indonesia's fastest growing sports community."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit((body) => authRegisterMutation(body))}
            className="space-y-5"
          >
            {/* Full Name */}

            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">
                Full Name
              </label>

              <input
                {...register("fullName")}
                type="text"
                placeholder="Arena Hub"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>
            <p className="text-red-600">{errors.fullName?.message}</p>

            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">
                Email Address
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="arenahub@gmail.com"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>
            <p className="text-red-600">{errors.email?.message}</p>

            {/* Password */}
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3  text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>
            <p className="text-red-600">{errors.password?.message}</p>
            {/* Confirm Password */}
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">
                Confirm Password
              </label>

              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>
            <p className="text-red-600">{errors.confirmPassword?.message}</p>
            {/* Register */}

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-lime-400 py-3.5 font-semibold text-slate-900 transition duration-300 hover:shadow-[0_0_35px_rgba(200,255,0,.45)] hover:brightness-110 active:scale-[.98]"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}

          <p className="mt-8 text-center text-sm text-slate-400">
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
