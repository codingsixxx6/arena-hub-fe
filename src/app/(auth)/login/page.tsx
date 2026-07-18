"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, MailWarning } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authLoginInput, authLoginSchema } from "@/features/auth/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/api-response.types";
import { api } from "@/lib/api";
import { AuthUser } from "@/types/auth.types";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  const router = useRouter();
  const {setUser} = useAuthStore()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<authLoginInput>({
    resolver: zodResolver(authLoginSchema),
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (payload: authLoginInput) => {
      return api.post<ApiResponse<AuthUser>>("/auth/login", payload);
    },
    onSuccess: (res) => {
      const user = res.data.data;
      setUnverifiedEmail(null); // reset banner kalau sebelumnya sempat muncul
      setUser(user)
      toast.success(res.data.message);

      if (user.role === "VENUE_ADMIN") {
        router.replace("/dashboard");
        return;
      }

      router.replace("/");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      if (err?.response?.status === 403) {
        setUnverifiedEmail(getValues("email"));
        toast.error(err.response.data?.message ?? "Akun belum diverifikasi");
        return;
      }

      setUnverifiedEmail(null);
      toast.error(err?.response?.data?.message ?? "Login gagal");
    },
  });

  const { mutate: resendMutation, isPending: isResending } = useMutation({
    mutationFn: async (email: string) => {
      return api.post<ApiResponse<null>>("/auth/resend-verification", { email });
    },
    onSuccess: (res) => {
      toast.success(res.data.message ?? "Email verifikasi terkirim, cek inbox kamu");
    },
    onError: (err: AxiosError<ApiResponse<null>>) => {
      toast.error(err?.response?.data?.message ?? "Gagal mengirim ulang email verifikasi");
    },
  });

  const onSubmit: SubmitHandler<authLoginInput> = (data) => {
    loginMutation(data);
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/Arenahub.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0  backdrop-blur-[2px]" />

      {/* Login Card */}
      <section className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-[28px] border-black bg-black-700/30 p-8 shadow-2xl backdrop-blur">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              ARENA<span className="text-lime-400">HUB</span>
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Welcome back. Sign in to continue your sports journey.
            </p>
          </div>

          {/* Form */}

          {unverifiedEmail && (
            <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4">
              <MailWarning className="mt-0.5 shrink-0 text-amber-400" size={18} />
              <div className="text-sm">
                <p className="text-amber-200">
                  Akun <span className="font-semibold">{unverifiedEmail}</span> belum diverifikasi.
                </p>
                <button
                  type="button"
                  disabled={isResending}
                  onClick={() => resendMutation(unverifiedEmail)}
                  className="mt-2 font-semibold text-lime-400 hover:underline disabled:opacity-50"
                >
                  {isResending ? "Mengirim..." : "Kirim ulang email verifikasi"}
                </button>
              </div>
            </div>
          )}
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Email Address
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="arenahub@gmail.com"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-lime-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 py-3 pl-4 pr-12 text-white placeholder:text-slate-500 outline-none transition-all focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                />

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-red-600">{errors.password?.message}</p>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                <input type="checkbox" className="accent-lime-400" />
                Remember Me
              </label>
            </div>

            {/* Login */}
            <button type="submit" className="w-full rounded-2xl bg-lime-400 py-3.5 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_35px_rgba(200,255,0,.45)] active:scale-[.98]">
              Login
            </button>
          </form>

          {/* Footer */}

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">
              {" Don't have an account?"}{" "}
              <Link
                href="/register"
                className="font-semibold text-lime-400 transition hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
