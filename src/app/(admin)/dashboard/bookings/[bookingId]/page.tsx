"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response.types";
import { AdminBookingDetail } from "@/types/booking.type";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";
import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import BookingInformation from "@/components/booking/BookingInformation";

export default function AdminBookingDetailPage() {
  const [rejectReason, setRejectReason] = useState("");
  const { bookingId } = useParams<{
    bookingId: string;
  }>();
  const queryClient = useQueryClient();

  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin", "booking", bookingId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<AdminBookingDetail>>(
        `/booking/${bookingId}`,
      );

      return response.data.data;
    },
  });

  const { mutate: approveBooking, isPending: isApproving } = useMutation({
    mutationFn: async () => {
      return api.patch(`/booking/${bookingId}/approve`);
    },
    onSuccess: async (response) => {
      toast.success(response.data.message);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "booking", bookingId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin", "bookings"],
      });
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const { mutate: rejectBooking, isPending: isRejecting } = useMutation({
    mutationFn: async () => {
      return api.patch(`/booking/${bookingId}/reject`, {
        rejectReason,
      });
    },
    onSuccess: async (response) => {
      toast.success(response.data.message);

      setRejectReason("");

      await queryClient.invalidateQueries({
        queryKey: ["admin", "booking", bookingId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin", "bookings"],
      });
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data.message);
    },
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <LoaderCircle className="animate-spin" />
      </main>
    );
  }

  if (isError || !booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Booking not found
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-sm font-medium text-lime-400">
            {booking.bookingCode}
          </p>

          <h1 className="mt-2 text-3xl font-bold">Booking Detail</h1>

          <p className="mt-2 text-gray-400">
            Review player booking and payment information.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Player Information</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Full Name</span>

                  <span className="text-right">{booking.player.fullName}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Email</span>

                  <span className="text-right">{booking.player.email}</span>
                </div>
              </div>
            </section>

            <BookingInformation
              courtName={booking.court.name}
              date={booking.date}
              startTime={booking.startTime}
              endTime={booking.endTime}
              totalPrice={booking.totalPrice}
            />
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Booking Status</h2>
              <div className="mt-4">
                <BookingStatusBadge status={booking.status} />
              </div>

              {booking.rejectReason && (
                <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-sm font-semibold text-red-400">
                    Reject Reason
                  </p>

                  <p className="mt-2 text-sm text-gray-300">
                    {booking.rejectReason}
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Payment Proof</h2>

              {booking.paymentProofUrl ? (
                <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-slate-950">
                  <Image
                    src={booking.paymentProofUrl}
                    alt="Payment proof"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center text-gray-400">
                  No payment proof uploaded
                </div>
              )}
            </section>
            {booking.status === "WAITING_VERIFICATION" && (
              <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <h2 className="text-xl font-semibold">Verification Action</h2>

                <p className="mt-2 text-sm text-gray-400">
                  Review the payment proof before approving or rejecting this
                  booking.
                </p>

                <div className="mt-6">
                  <label className="text-sm text-gray-400">Reject Reason</label>

                  <textarea
                    value={rejectReason}
                    onChange={(event) => setRejectReason(event.target.value)}
                    placeholder="Enter reject reason..."
                    rows={3}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-950 p-4 text-white outline-none transition focus:border-red-400"
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    disabled={isApproving || isRejecting}
                    onClick={() => approveBooking()}
                    className="rounded-xl bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isApproving ? "Approving..." : "Approve"}
                  </button>

                  <button
                    type="button"
                    disabled={isApproving || isRejecting}
                    onClick={() => rejectBooking()}
                    className="rounded-xl border border-red-500/30 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRejecting ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
