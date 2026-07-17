"use client";

import { Button } from "@/components/ui/button";
import { TimeSlot } from "../types/booking.types";

interface BookingSummaryProps {
  courtName?: string;
  slot?: TimeSlot | null;
}

export default function BookingSummary({
  courtName,
  slot,
}: BookingSummaryProps) {
  if (!slot) {
    return (
      <section className="mt-10 rounded-3xl border border-dashed border-slate-700 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">
          Booking Summary
        </h3>

        <p className="mt-3 text-slate-400">
          Pilih salah satu slot waktu untuk melihat ringkasan booking.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-3xl border border-lime-400/20 bg-slate-900/60 p-8">

      <h3 className="text-2xl font-bold text-white">
        Booking Summary
      </h3>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">

          <span className="text-slate-400">
            Court
          </span>

          <span className="font-medium text-white">
            {courtName}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">
            Time
          </span>

          <span className="font-medium text-white">
            {slot.startTime} - {slot.endTime}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-400">
            Price
          </span>

          <span className="font-semibold text-lime-400">
            Rp {slot.price.toLocaleString("id-ID")}
          </span>

        </div>

      </div>

      <Button
        className="mt-8 h-12 w-full"
        size="lg"
      >
        Continue Booking
      </Button>

    </section>
  );
}