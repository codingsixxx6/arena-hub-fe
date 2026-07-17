import Image from "next/image";
import { Star } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy Players" },
  { value: "4.9", label: "Average Rating" },
  { value: "12K+", label: "Bookings Completed" },
  { value: "98%", label: "Would Recommend" },
];

const testimonials = [
  {
    name: "Farhan Riski",
    role: "Software Engineer",
    image: "/images/User-first.png",
    review:
      "Arena Hub benar-benar memberikan pengalaman bermain yang berbeda. Lapangannya bersih, pencahayaannya sangat baik, dan proses booking sangat mudah.",
  },
  {
    name: "Muhammad Rifqy",
    role: "Entrepreneur",
    image: "/images/User-second.png",
    review:
      "Cafe & Lounge-nya nyaman untuk meeting santai setelah bermain. Seluruh fasilitas terasa premium dan terawat.",
  },
  {
    name: "Aditya Pratama",
    role: "Content Creator",
    image: "/images/User-third.png",
    review:
      "Saya sudah mencoba banyak venue padel di Jakarta. Arena Hub menjadi salah satu favorit saya karena kualitas court dan pelayanannya konsisten.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#020617] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-5 py-2 text-xl font-semibold text-lime-400">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            disukai oleh 
            <br />
            ratusan pemain padel
          </h2>

          <p className="mt-6 text-xl font-semibold leading-8 text-slate-300">
            Kepuasan pelanggan adalah prioritas kami. Lihat bagaimana pengalaman
            mereka setelah bermain di Arena Hub.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xl">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-slate-800 bg-[#111827] p-8 text-center transition hover:-translate-y-2 hover:border-lime-400/40"
            >
              <h3 className="text-4xl font-bold text-lime-400">{item.value}</h3>

              <p className="mt-3 text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[30px] border border-slate-800 bg-[#111827] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:shadow-[0_0_30px_rgba(200,255,0,.12)]"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white">{item.name}</h4>

                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-lime-400 text-lime-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-8 text-slate-300 text-xl">{item.review}</p>
            </article>
          ))}
        </div>

        {/* Google Rating */}
        <div className="mt-20 rounded-4xl border border-lime-400/20 bg-lime-400/10 p-10 text-center text-xl">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={24}
                className="fill-lime-400 text-lime-400"
              />
            ))}
          </div>

          <h3 className="mt-6 text-3xl font-bold text-white">4.9 / 5.0</h3>

        <p className="mt-3 text-xl text-slate-300">
            Berdasarkan lebih dari{" "}
            <span className="font-semibold text-white">500+</span> ulasan
            pelanggan.
          </p>

          <p className="mt-2 text-sm text-lime-400">Google Reviews</p>
        </div>
      </div>
    </section>
  );
}
