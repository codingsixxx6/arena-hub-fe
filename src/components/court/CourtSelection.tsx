import { formatCurrency } from "@/helpers/format.helpers";
import { Court } from "@/types/venue.types";
import Image from "next/image";

type CourtSelectionProps = {
  courts: Court[];
  selectedCourtId: string;
  onSelectCourt: (courtId: string) => void;
};

export default function CourtSelection({
  courts,
  selectedCourtId,
  onSelectCourt,
}: CourtSelectionProps) {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold">1. Select Court</h2>

        <p className="mt-2 text-gray-400">Choose the court you want to book.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {courts.map((court) => {
          const isSelected = selectedCourtId === court.id;

          return (
            <button
              key={court.id}
              type="button"
              onClick={() => onSelectCourt(court.id)}
              className={`rounded-2xl border text-left transition overflow-hidden ${
                isSelected
                  ? "border-lime-400 bg-lime-400/5"
                  : "border-white/10 bg-slate-900 hover:border-white/20"
              }`}
            >
              <div className="relative w-full h-100">
                <Image
                  src={court.imageUrl}
                  alt={court.name}
                  sizes="100%"
                  loading="eager"
                  fill
                  className="absolute w-full h-full object-cover opacity-75"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-lime-400">
                  {court.sportType}
                </p>

                <h3 className="mt-2 text-xl font-semibold">{court.name}</h3>

                <p className="mt-4 text-sm text-gray-400">
                  {formatCurrency(court.pricePerHour)} / hour
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
