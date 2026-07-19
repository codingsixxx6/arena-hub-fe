'use client'

import { useAuthStore } from "@/stores/useAuthStore";
import { UserRole } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import {ReactNode, useEffect} from "react";

export default function AuthLayout({children}: {children: ReactNode}){
    const user = useAuthStore(state => state.user)
    const router = useRouter()

    useEffect(()=> {
        if(!user) return;

        if(user.role === UserRole.VENUE_ADMIN) {
            router.replace('/dashboard')
            return;
        }

        router.replace('/')

    }, [user, router])


    if(user) return null

    return children
}