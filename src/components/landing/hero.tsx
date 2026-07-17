import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Background.png')",
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/10 blur-[180px]" />

      {/* Content */}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <span className="rounded-full border border-lime-400/40 bg-lime-400/10 px-5 py-2 text-xl font-semibold text-lime-300">
          Premium Padel Experience
        </span>

        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
            Tingkatkan Permainanmu
          <br />
          Bersama{" "}
          <span>
            ARENA<span className="text-lime-400">HUB</span>
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl font-semibold leading-8 text-slate-300">
          Nikmati pengalaman bermain padel terbaik dengan lapangan berstandar
          internasional, fasilitas premium, serta sistem booking yang cepat dan
          mudah.
        </p>

        {/* Button */}

        <div className="mt-12 flex flex-col gap-5 sm:flex-row text-xl font-semibold">
          <Link
            href="/booking"
            className="rounded-2xl bg-lime-400 px-8 py-4 font-semibold text-slate-950 transition hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,255,0,.4)]"
          >
            Book Court
          </Link>

          <Link
            href="#facilities"
            className="rounded-2xl border border-slate-700 bg-white/5 px-8 py-4 font-medium backdrop-blur-md transition hover:border-lime-400"
          >
            Explore Facilities
          </Link>
        </div>

        {/* Statistics */}

        <div className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 backdrop-blur-xl">
          <Stat number="4" label="Premium Courts" />

          <Stat number="5K+" label="Bookings" />

          <Stat number="4.9★" label="Google Rating" />

          <Stat number="24/7" label="Online Booking" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-white/5 p-6 hover:border-lime-400">
      <h2 className="text-4xl font-bold text-lime-400">{number}</h2>

      <p className="mt-2 text-slate-300">{label}</p>
    </div>
  );
}
