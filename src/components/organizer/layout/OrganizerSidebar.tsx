"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  LayoutGrid,
  LoaderCircle,
  LogOut,
} from "lucide-react";

import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/stores/useAuthStore";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { label: "Venue Settings", href: "/dashboard/venue", icon: Building2 },
  { label: "Courts", href: "/dashboard/courts", icon: LayoutGrid },
];

type OrganizerSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrganizerSidebar({
  isOpen,
  onClose,
}: OrganizerSidebarProps) {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);

  const { logout, isLoggingOut } = useLogout();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-slate-950 text-white transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <Link
            href="/dashboard"
            className="text-xl font-extrabold tracking-wide text-white"
          >
            ARENA<span className="text-lime-400">HUB</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-lime-400 text-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-900 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user.fullName}</p>

                <p className="mt-1 text-xs text-gray-500">Venue Admin</p>
              </div>

              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => logout()}
                className="shrink-0 text-gray-400 transition hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Logout"
              >
                {isLoggingOut ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <LogOut size={18} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
