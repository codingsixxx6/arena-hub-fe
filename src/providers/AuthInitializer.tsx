"use client";

import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response.types";
import { AuthUser } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AuthInitializer({ children }: { children: ReactNode }) {
  const { setUser, clearUser, isAuthReady, setIsAuthReady } = useAuthStore();
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<AuthUser>>("/auth/me");

      return res.data.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
      setIsAuthReady(true)
      
    }

    if (isError) {
      clearUser();
      setIsAuthReady(true)
      
    }
  }, [data, isSuccess, isError, setUser, clearUser, setIsAuthReady]);

  if(!isAuthReady) return null

  return children
}
