import { CalendarDays, ShieldCheck, Trophy } from "lucide-react";

export default function BookingHeader() {
  return (
    <section className="text-center">
      {/* Badge */}

      <span className="inline-flex items-center rounded-full border border-lime-400/30 bg-lime-400/10 px-5 py-2 text-xl font-medium text-lime-400">
        Book Your Court
      </span>

      {/* Title */}

      <h1 className="mt-6 text-5xl font-extrabold text-white md:text-6xl">
        pesan lapangan
        <br />
        pilihan kamu
      </h1>

      {/* Description */}

      <p className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-8 text-slate-300">
        Pilih lapangan, tentukan tanggal bermain, dan lihat jadwal yang tersedia
        secara real-time. Booking hanya membutuhkan beberapa langkah sederhana.
      </p>

      {/* Info */}

      <div className="mt-14 flex flex-wrap items-center justify-center gap-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10">
            <CalendarDays className="h-6 w-6 text-lime-400" />
          </div>

          <div className="text-left">
            <p className="text-xl font-semibold text-white">
              Real-Time Availability
            </p>

            <p className="text-lg text-slate-300">Selalu terupdate</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10">
            <ShieldCheck className="h-6 w-6 text-lime-400" />
          </div>

          <div className="text-left">
            <p className="text-xl font-semibold text-white">Secure Booking</p>

            <p className="text-lg text-slate-300">Aman & cepat</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10">
            <Trophy className="h-6 w-6 text-lime-400" />
          </div>

          <div className="text-left">
            <p className="text-xl font-semibold text-white">Premium Courts</p>

            <p className="text-lg text-slate-300">Standar internasional</p>
          </div>
        </div>
      </div>
    </section>
  );
}
