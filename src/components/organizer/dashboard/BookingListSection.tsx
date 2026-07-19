import Link from "next/link";

import { DashboardBookingItem as DashboardBookingItemType } from "@/types/dashboard.types"
import DashboardBookingItem from "./DashboardBookingItem";

type BookingListSectionProps = {
  title: string;
  description: string;
  bookings: DashboardBookingItemType[];
  variant: "pending" | "upcoming";
  emptyMessage: string;
};

export default function BookingListSection({
  title,
  description,
  bookings,
  variant,
  emptyMessage,
}: BookingListSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>

        <Link
          href="/dashboard/bookings"
          className="text-sm font-semibold text-lime-400 transition hover:text-lime-300"
        >
          View all bookings
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-sm text-gray-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {bookings.map((booking) => (
            <DashboardBookingItem
              key={booking.id}
              booking={booking}
              variant={variant}
            />
          ))}
        </div>
      )}
    </section>
  );
}