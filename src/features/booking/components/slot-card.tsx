"use client";

import { TimeSlot } from "../types/booking.types";

interface SlotCardProps {
  slot: TimeSlot;
  selected?: boolean;
  onSelect?: (slot: TimeSlot) => void;
}

export default function SlotCard({
  slot,
  selected = false,
  onSelect,
}: SlotCardProps) {
  const isDisabled = !slot.available;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onSelect?.(slot)}
      className={`
        flex flex-col items-center justify-center
        rounded-2xl border p-4 transition-all duration-300

        ${
          selected
            ? "border-lime-400 bg-lime-400 text-slate-900 shadow-[0_0_20px_rgba(163,230,53,.25)]"
            : isDisabled
            ? "cursor-not-allowed border-slate-800 bg-slate-900 opacity-50"
            : "border-slate-700 bg-slate-950 hover:-translate-y-1 hover:border-lime-400 hover:bg-slate-900"
        }
      `}
    >
      <span
        className={`text-lg font-bold ${
          selected ? "text-slate-900" : "text-white"
        }`}
      >
        {slot.startTime}
      </span>

      <span
        className={`mt-1 text-xs ${
          selected ? "text-slate-800" : "text-slate-400"
        }`}
      >
        {slot.endTime}
      </span>

      <span
        className={`mt-3 text-sm font-medium ${
          selected ? "text-slate-900" : "text-lime-400"
        }`}
      >
        Rp {slot.price.toLocaleString("id-ID")}
      </span>

      <span
        className={`mt-2 text-xs font-medium ${
          isDisabled
            ? "text-red-400"
            : selected
            ? "text-slate-800"
            : "text-green-400"
        }`}
      >
        {isDisabled ? "Booked" : "Available"}
      </span>
    </button>
  );
}