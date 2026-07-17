"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import { api } from "@/lib/api";
import { PaginatedApiResponse } from "@/types/api-response.types";
import { BookingListItem } from "@/types/booking.type";
import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import { formatCurrency } from "@/helpers/format.helpers";

export default function MyBookingsPage() {
  const [page, setPage] = useState(1);

  const {
    data: bookingResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", "my", page],
    queryFn: async () => {
      const response = await api.get<PaginatedApiResponse<BookingListItem>>(
        "/booking/my",
        {
          params: {
            page,
            limit: 10,
          },
        },
      );

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
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>

          <p className="mt-2 text-gray-400">
            View and manage your court bookings.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
            <h2 className="text-xl font-semibold">No bookings yet</h2>

            <p className="mt-2 text-gray-400">
              Book a court to see your bookings here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-lime-400 px-6 py-3 font-bold text-black"
            >
              Explore Courts
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 space-y-4">
              {bookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/bookings/${booking.id}`}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-lime-400"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-lime-400">
                        {booking.bookingCode}
                      </p>

                      <h2 className="mt-2 text-xl font-semibold">
                        {booking.court.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-400">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(booking.totalPrice)}
                      </p>

                      <div className="mt-3">
                        <BookingStatusBadge status={booking.status}/>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {meta && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Page {meta.page} of {meta.totalPages}
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={meta.page <= 1}
                    onClick={() => setPage((current) => current - 1)}
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => setPage((current) => current + 1)}
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
    </main>
  );
}
