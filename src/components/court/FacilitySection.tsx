import Image from "next/image";
import {
  Car,
  Coffee,
  LucideIcon,
  ShowerHead,
  Shirt,
  Toilet,
  Wifi,
} from "lucide-react";
import { Facility } from "@/types/venue.types";

type FacilitySectionProps = {
  facilities: Facility[];
  imageUrl?: string;
};

const facilityIcons: Record<string, LucideIcon> = {
  parking: Car,
  shirt: Shirt,
  shower: ShowerHead,
  toilet: Toilet,
  coffee: Coffee,
  wifi: Wifi,
};

export default function FacilitySection({
  facilities,
  imageUrl,
}: FacilitySectionProps) {
  return (
    <section className="bg-slate-900/50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-400">
              Facilities
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Everything You Need
            </h2>

            <p className="mt-3 max-w-xl leading-relaxed text-gray-400">
              Enjoy convenient facilities designed to make your time at
              ArenaHub more comfortable.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {facilities.map((facility) => {
                const Icon = facilityIcons[facility.icon!];

                return (
                  <div
                    key={facility.id}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                  >
                    {Icon && (
                      <Icon
                        size={26}
                        className="text-lime-400"
                      />
                    )}

                    <h3 className="mt-4 font-semibold">
                      {facility.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {imageUrl && (
            <div className="relative min-h-96 overflow-hidden rounded-3xl">
              <Image
                src={imageUrl}
                alt="ArenaHub facilities"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}