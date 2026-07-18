"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import { api } from "@/lib/api";
import { PaginatedApiResponse } from "@/types/api-response.types";
import { AdminBookingListItem } from "@/types/booking.type";
import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import { formatCurrency } from "@/helpers/format.helpers";

export default function AdminBookingsPage() {
  const [page, setPage] = useState(1);

  const {
    data: bookingResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin", "bookings", page],
    queryFn: async () => {
      const response = await api.get<
        PaginatedApiResponse<AdminBookingListItem>
      >("/booking", {
        params: {
          page,
          limit: 10,
        },
      });

      return response.data;
    },
  });

  const bookings = bookingResponse?.data ?? [];
  const meta = bookingResponse?.meta;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <LoaderCircle className="animate-spin" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Failed to load bookings
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">
            Booking Management
          </h1>

          <p className="mt-2 text-gray-400">
            Manage player court bookings.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
            <h2 className="text-xl font-semibold">
              No bookings
            </h2>

            <p className="mt-2 text-gray-400">
              Player bookings will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-225 text-left">
                <thead className="bg-slate-900">
                  <tr className="text-sm text-gray-400">
                    <th className="px-6 py-4">Booking</th>
                    <th className="px-6 py-4">Player</th>
                    <th className="px-6 py-4">Court</th>
                    <th className="px-6 py-4">Schedule</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-white/10 bg-slate-950"
                    >
                      <td className="px-6 py-5">
                        <Link
                          href={`/dashboard/bookings/${booking.id}`}
                          className="font-medium text-lime-400 hover:underline"
                        >
                          {booking.bookingCode}
                        </Link>
                      </td>

                      <td className="px-6 py-5">
                        {booking.player.fullName}
                      </td>

                      <td className="px-6 py-5">
                        {booking.court.name}
                      </td>

                      <td className="px-6 py-5">
                        <p>{booking.date}</p>

                        <p className="mt-1 text-sm text-gray-400">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        {formatCurrency(booking.totalPrice)}
                      </td>

                      <td className="px-6 py-5">
                        <BookingStatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {meta && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Page {meta.page} of {meta.totalPages}
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={meta.page == 1}
                    onClick={() =>
                      setPage((current) => current - 1)
                    }
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={meta.page == meta.totalPages}
                    onClick={() =>
                      setPage((current) => current + 1)
                    }
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}