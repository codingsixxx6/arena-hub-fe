import Image from "next/image";
import { Court } from "@/types/venue.types";
import { formatCurrency } from "@/helpers/format.helpers";

interface CourtsProps {
  courts: Court[] | undefined;
}

export default function Courts({ courts }: CourtsProps) {
  return (
    <section id="courts" className="bg-[#020617] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-5 py-2 text-xl font-semibold text-lime-400">
            Our Courts
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            pilihlah lapangan
            <br />
            sesuai dengan permainanmu
          </h2>

          <p className="mt-6 text-xl font-semibold leading-8 text-slate-300">
            Seluruh court di Arena Hub menggunakan standar kualitas yang sama.
            Pilih court favoritmu, lihat jadwal yang tersedia, lalu booking
            hanya dalam beberapa langkah.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-2">
          {courts?.map((court) => (
            <div
              key={court.id}
              className="group overflow-hidden rounded-[30px] border border-slate-800 bg-[#111827] transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/50 hover:shadow-[0_0_35px_rgba(200,255,0,.15)]"
            >
              {/* Image */}

              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={court.imageUrl}
                  alt={court.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute" />
              </div>

              {/* Content */}

              <div className="p-8">
                {/* Title */}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {court.name}
                    </h3>

                    <p className="mt-1 text-xl text-slate-300">
                      {court.sportType}
                    </p>
                  </div>

                  <span className="rounded-full bg-lime-400/10 px-4 py-2 text-xl font-semibold text-lime-400">
                    {court.status}
                  </span>
                </div>

                {/* Pricing */}

                <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-5">
                  <div className="flex items-center justify-between">
                    <div>Price per Hour: </div>
                    <p className="font-bold text-xl">{formatCurrency(court.pricePerHour)} /hour</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
