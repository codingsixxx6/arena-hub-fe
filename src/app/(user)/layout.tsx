'use client'

import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRole } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PlayerLayout({children}: {children: React.ReactNode}){
    const user = useAuthStore(state => state.user)
    const router = useRouter()

    useEffect(()=>{
        if(!user){
            router.replace('/login')
            return;
        }

        if(user.role !== UserRole.PLAYER) {
            router.replace('/')
            return;
        }
    }, [user, router])

    if(!user || user.role !== UserRole.PLAYER) {
        return null;
    }
    return (
        <>
            <Navbar />

            {children}
        </>
    )
}