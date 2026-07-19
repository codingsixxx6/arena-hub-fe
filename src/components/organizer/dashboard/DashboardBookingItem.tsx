import Link from "next/link";

import {
  formatCurrency,
  formatDate,
  formatElapsedTime,
} from "@/helpers/format.helpers";
import { DashboardBookingItem as DashboardBookingItemType } from "@/types/dashboard.types";

type DashboardBookingItemProps = {
  booking: DashboardBookingItemType;
  variant: "pending" | "upcoming";
};

export default function DashboardBookingItem({
  booking,
  variant,
}: DashboardBookingItemProps) {
  const isPending = variant === "pending";

  return (
    <Link
      href={`/dashboard/bookings/${booking.id}`}
      className="group block rounded-xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-lime-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-lime-400">
            {booking.bookingCode}
          </p>

          <h3 className="mt-1 font-semibold">{booking.player.fullName}</h3>

          <p className="mt-1 text-sm text-gray-400">{booking.court.name}</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">{formatCurrency(booking.totalPrice)}</p>

          <p className="mt-1 text-sm text-gray-400">
            {formatDate(booking.date)}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {booking.startTime} - {booking.endTime}
          </p>
        </div>
      </div>

      {isPending && (
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-xs text-yellow-400">
            {booking.waitingSince
              ? `Waiting ${formatElapsedTime(booking.waitingSince)}`
              : "Waiting for verification"}
          </p>

          <span className="text-sm font-semibold text-lime-400 transition group-hover:text-lime-300">
            Review Payment →
          </span>
        </div>
      )}
    </Link>
  );
}
