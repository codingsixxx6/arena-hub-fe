import { Building2, Coffee, Car, ShowerHead } from "lucide-react";
import Image from "next/image";

const facilities = [
  {
    icon: Building2,
    title: "Premium Courts",
    description:
      "Lapangan padel berstandar internasional dengan permukaan berkualitas tinggi.",
    Image: "images/Premium-court.png",
  },
  {
    icon: Coffee,
    title: "Cafe & Lounge",
    description:
      "Area santai yang nyaman untuk bersantai sebelum maupun sesudah bermain.",
    Image: "images/Cafe-lounge.png",
  },
  {
    icon: ShowerHead,
    title: "Shower Room",
    description: "Ruang bilas yang bersih dan nyaman untuk seluruh pemain.",
    Image: "images/Shower-room.png",
  },
  {
    icon: Car,
    title: "Free Parking",
    description:
      "Area parkir yang luas dan aman untuk kendaraan roda dua maupun roda empat.",
    Image: "images/Free-parking.png",
  },
];

export default function About() {
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
            {facilities.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:bg-slate-900"
              >
                <Image
                  src={`/${item.Image}`}
                  alt={item.title}
                  fill
                  className="absolute inset-0 -z-10 object-cover opacity-75 rounded-2xl"
                />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 transition group-hover:bg-lime-400 group-hover:text-slate-900">
                  <item.icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {item.title}
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
