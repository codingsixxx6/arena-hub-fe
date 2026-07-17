import { LoaderCircle } from "lucide-react";

import { formatTime } from "@/helpers/format.helpers";
import { CourtAvailability } from "@/types/court.types";

type TimeSlotSelectionProps = {
  availability: CourtAvailability | undefined;
  selectedSlotIndexes: number[];
  isLoading: boolean;
  isError: boolean;
  onSelectSlot: (index: number) => void;
};

export default function TimeSlotSelection({
  availability,
  selectedSlotIndexes,
  isLoading,
  isError,
  onSelectSlot,
}: TimeSlotSelectionProps) {
  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">3. Choose Time Slots</h2>

          <p className="mt-2 text-gray-400">
            Select consecutive available time slots.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-slate-700" />
            Available
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-lime-400" />
            Selected
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-slate-800" />
            Booked
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center gap-2 text-gray-400">
          <LoaderCircle className="size-5 animate-spin" />

          <span>Checking availability...</span>
        </div>
      )}

      {isError && (
        <p className="mt-6 text-red-400">
          Failed to load court availability.
        </p>
      )}

      {availability && (
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {availability.slots.map((slot, index) => {
            const isSelected = selectedSlotIndexes.includes(index);

            return (
              <button
                key={slot.startTime}
                type="button"
                disabled={!slot.available}
                onClick={() => onSelectSlot(index)}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  !slot.available
                    ? "cursor-not-allowed border-white/5 bg-slate-900/50 text-gray-600 line-through"
                    : isSelected
                      ? "border-lime-400 bg-lime-400 text-black"
                      : "border-white/10 bg-slate-900 text-white hover:border-lime-400"
                }`}
              >
                {formatTime(slot.startTime)}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}