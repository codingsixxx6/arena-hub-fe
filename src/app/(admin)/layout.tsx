"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OrganizerSidebar from "@/components/organizer/layout/OrganizerSidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRole } from "@/types/auth.types";
import { Menu } from "lucide-react";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== UserRole.VENUE_ADMIN) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user || user.role !== UserRole.VENUE_ADMIN) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 md:hidden">
        <p className="text-xl font-extrabold tracking-wide text-white">
          ARENA<span className="text-lime-400">HUB</span>
        </p>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-400 transition hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close navigation menu"
        />
      )}

      <OrganizerSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-h-screen md:ml-64">{children}</main>
    </div>
  );
}
