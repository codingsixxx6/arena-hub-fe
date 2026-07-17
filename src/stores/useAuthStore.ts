import { create } from "zustand";

export interface User {
    email: string | null,
    fullName: string | null,
    role: string | null,
    id: string | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null


}
interface AuthState {
    user: User | null,
    setUser: (payload: User | null ) => void,
    clearAuth: () => void

}
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (payload) => set({user: payload}), 
    clearAuth: () => set({user: null})
}))