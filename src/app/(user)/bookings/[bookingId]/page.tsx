"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  CheckCircle,
  Clock,
  LoaderCircle,
  Upload,
  XCircle,
} from "lucide-react";

import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response.types";
import { BookingDetail } from "@/types/booking.type";
import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import BookingInformation from "@/components/booking/BookingInformation";
import { useCountdown } from "@/hooks/useCountdown";
import Image from "next/image";

export default function BookingDetailPage() {
  const { bookingId } = useParams<{ bookingId: string }>();

  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);

  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<BookingDetail>>(
        `/booking/${bookingId}`,
      );

      return response.data.data;
    },
  });

  const { mutate: cancelBooking, isPending: isCancelling } = useMutation({
    mutationFn: async () => {
      const response = await api.patch<ApiResponse<BookingDetail>>(
        `/booking/${bookingId}/cancel`,
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["booking", bookingId],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings", "my"],
      });
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(error.response?.data?.message ?? "Failed to cancel booking");
    },
  });
  const handleCancelBooking = () => {
    cancelBooking();
  };

  const { mutate: uploadPayment, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("paymentProof", file);

      const response = await api.patch<ApiResponse<BookingDetail>>(
        `/booking/${bookingId}/payment`,
        formData,
      );

      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);

      setFile(null);

      queryClient.invalidateQueries({
        queryKey: ["booking", bookingId],
      });
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      toast.error(
        error.response?.data?.message ?? "Failed to upload payment proof",
      );
    },
  });

  const handleUploadPayment = () => {
    if (!file) {
      toast.error("Please select payment proof");

      return;
    }

    uploadPayment(file);
  };

  const { formattedTime: formattedTimeLeft, isExpired } = useCountdown(
    booking?.status === "PENDING_PAYMENT" ? booking.paymentDeadline : null,
  );

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
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm text-lime-400">{booking.bookingCode}</p>
          <div className="flex justify-between items-center">
            <h1 className="mt-2 text-3xl font-bold">Booking Detail</h1>
            <BookingStatusBadge status={booking.status} />
          </div>
        </div>

        <BookingInformation
          courtName={booking.court.name}
          date={booking.date}
          startTime={booking.startTime}
          endTime={booking.endTime}
          totalPrice={booking.totalPrice}
        />

        {booking.status === "PENDING_PAYMENT" && (
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-slate-900 p-6">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 text-yellow-400" />

              <div>
                <h2 className="text-xl font-semibold">Complete Payment</h2>

                <p className="mt-1 text-sm text-gray-400">
                  Upload your payment proof before the payment deadline.
                </p>
              </div>
            </div>
            {booking.rejectReason && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm font-semibold text-red-400">
                  Payment Rejected
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  {booking.rejectReason}
                </p>
              </div>
            )}

            <div className="my-8 text-center">
              <p className="text-sm text-gray-400">Time remaining</p>

              <p className="mt-2 text-4xl font-bold text-yellow-400">
                {formattedTimeLeft}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Payment Proof
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0];

                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm"
              />

              {file && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={isUploading || isExpired}
              onClick={handleUploadPayment}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload Payment Proof
                </>
              )}
            </button>
            <button
              type="button"
              disabled={isCancelling}
              onClick={handleCancelBooking}
              className="mt-6 w-full rounded-xl border border-red-500/30 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCancelling ? "Cancelling..." : "Cancel Booking"}
            </button>
          </div>
        )}

        {booking.status === "WAITING_VERIFICATION" && (
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-slate-900 p-6">
            <div className="flex items-start gap-4">
              <Clock className="mt-1 text-yellow-400" />

              <div>
                <h2 className="text-xl font-semibold">Payment Submitted</h2>

                <p className="mt-1 text-gray-400">
                  Your payment proof is waiting for venue verification.
                </p>
              </div>
            </div>

            {booking.paymentProofUrl && (
              <div className="mt-6">
                <p className="mb-3 text-sm text-gray-400">Payment Proof</p>

                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-950">
                  <Image
                    src={booking.paymentProofUrl}
                    alt="Payment proof"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {booking.status === "CONFIRMED" && (
          <div className="mt-6 rounded-2xl border border-green-500/20 bg-slate-900 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 text-green-400" />

              <div>
                <h2 className="text-xl font-semibold">Booking Confirmed</h2>

                <p className="mt-1 text-gray-400">
                  Your payment has been verified and your booking is confirmed.
                </p>
              </div>
            </div>
          </div>
        )}

        {booking.status === "CANCELLED" && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-slate-900 p-6">
            <div className="flex items-start gap-4">
              <XCircle className="mt-1 text-red-400" />

              <div>
                <h2 className="text-xl font-semibold">Booking Cancelled</h2>

                <p className="mt-1 text-gray-400">
                  This booking is no longer active.
                </p>
              </div>
            </div>
          </div>
        )}

        {booking.status === "COMPLETED" && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="mt-1 text-gray-400" />

              <div>
                <h2 className="text-xl font-semibold">Booking Completed</h2>

                <p className="mt-1 text-gray-400">
                  This booking has been completed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
