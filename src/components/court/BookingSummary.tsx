import { formatCurrency, formatTime } from "@/helpers/format.helpers";
import { CourtAvailability } from "@/types/court.types";
import Button from "../ui/button";

type BookingSummaryProps = {
  availability: CourtAvailability | undefined;
  date: string;
  selectedStartTime: string | undefined;
  selectedEndTime: string | undefined;
  duration: number;
  totalPrice: number;
  isCreatingBooking: boolean;
  onContinueBooking: () => void;
};

export default function BookingSummary({
  availability,
  date,
  selectedStartTime,
  selectedEndTime,
  duration,
  totalPrice,
  isCreatingBooking,
  onContinueBooking,
}: BookingSummaryProps) {
  return (
    <aside className="lg:col-span-4">
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:sticky lg:top-24">
        <h2 className="text-2xl font-bold">Booking Summary</h2>

        {!availability || !selectedStartTime || !selectedEndTime ? (
          <div className="flex min-h-64 items-center justify-center py-10 text-center">
            <p className="max-w-xs text-sm leading-6 text-gray-400">
              Select a court, date, and time slot to see your booking summary.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-400">Court</span>

                <span className="text-right font-medium">
                  {availability.court.name}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-400">Date</span>

                <span className="text-right font-medium">{date}</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-400">Time</span>

                <span className="text-right font-medium">
                  {formatTime(selectedStartTime)} -{" "}
                  {formatTime(selectedEndTime)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-400">Duration</span>

                <span className="text-right font-medium">
                  {duration} {duration === 1 ? "hour" : "hours"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-400">Price per Hour</span>

                <span className="text-right font-medium">
                  {formatCurrency(availability.court.pricePerHour)}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-semibold">Total</span>

                <span className="text-2xl font-bold text-lime-400">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              onClick={onContinueBooking}
              disabled={isCreatingBooking}
              className="w-full mt-5"
            >
              {isCreatingBooking
                ? "Creating Booking..."
                : "Continue Booking"}
            </Button>
          </>
        )}
      </div>
    </aside>
  );
}