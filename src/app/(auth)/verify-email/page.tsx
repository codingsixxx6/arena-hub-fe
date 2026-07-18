"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token tidak ditemukan di URL");
      return;
    }

    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus("success");
        setMessage("Email kamu berhasil diverifikasi. Silakan login.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err?.response?.data?.message ?? "Verifikasi gagal");
      });
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="max-w-md text-center">
        {status === "loading" && <p>Memverifikasi email kamu...</p>}
        {status !== "loading" && <p>{message}</p>}
      </div>
    </div>
  );
}
