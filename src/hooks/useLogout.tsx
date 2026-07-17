"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { ApiResponse } from "@/types/api-response.types";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const clearUser = useAuthStore((state) => state.clearUser);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const response =
        await api.post<ApiResponse<null>>("/auth/logout");

      return response.data;
    },

    onSuccess: (response) => {
      clearUser();

      queryClient.clear();

      toast.success(response.message);

      router.replace("/login");
    },

    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(
        error.response?.data?.message ?? "Failed to logout",
      );
    },
  });

  return {
    logout,
    isLoggingOut: isPending,
  };
}