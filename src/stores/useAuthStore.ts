import { create } from "zustand";
import { AuthStore } from "@/types/auth.types";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthReady: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsAuthReady: (isAuthReady) => set({isAuthReady})
}));
