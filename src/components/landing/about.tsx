import Image from "next/image";
import DynamicIcon from "../ui/DynamicIcons";
import { Facility } from "@/types/venue.types";

interface AboutProps {
  facilities: Facility[] | undefined
}

export default function About({facilities}: AboutProps) {

  return (
    <section id="about" className="relative overflow-hidden bg-[#020617] py-28">
      {/* Glow Background */}

      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-lime-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}

          <div>
            <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-xl font-semibold text-lime-400">
              About Arena Hub
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              Premium Padel Club
              <br />
              Built for Everyone.
            </h2>

            <p className="mt-8 text-xl font-semibold leading-8 text-slate-300">
              Arena Hub menghadirkan pengalaman bermain padel yang modern,
              nyaman, dan profesional. Kami percaya bahwa olahraga bukan hanya
              tentang pertandingan, tetapi juga tentang pengalaman, kenyamanan,
              dan komunitas yang tumbuh bersama.
            </p>

            <p className="mt-6 text-xl font-semibold leading-8 text-slate-300">
              Dengan fasilitas premium, sistem booking online yang mudah, serta
              pelayanan terbaik, Arena Hub menjadi tempat ideal untuk bermain
              bersama teman, keluarga, maupun rekan kerja.
            </p>
          </div>

          {/* Right */}

          <div className="grid gap-6 sm:grid-cols-2">
            {facilities?.map((item) => (
              <div
                key={item.name}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:bg-slate-900"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="absolute inset-0 -z-10 object-cover opacity-75 rounded-2xl"
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 transition group-hover:bg-lime-400 group-hover:text-slate-900">
                  <DynamicIcon name={item.icon} size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {item.name}
                </h3>

                <p className="mt-3 leading-7 text-xl text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
