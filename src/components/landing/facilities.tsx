import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const facilities = [
  {
    title: "Premium Courts",
    description:
      "Nikmati pengalaman bermain padel di lapangan berstandar internasional yang dirancang untuk memberikan performa terbaik. Setiap court menggunakan material berkualitas tinggi dengan pencahayaan profesional sehingga nyaman digunakan baik siang maupun malam.",
    image: "/images/Premium-court.png",
    features: [
      "International Standard Court",
      "Premium Artificial Turf",
      "Professional LED Lighting",
      "Anti-slip Playing Surface",
      "High Quality Tempered Glass",
      "Comfortable Player Area",
    ],
  },
  {
    title: "Cafe & Lounge",
    description:
      "Tidak hanya bermain, Arena Hub juga menghadirkan area Cafe & Lounge yang nyaman sebagai tempat berkumpul bersama teman, keluarga, maupun rekan kerja. Nikmati berbagai pilihan makanan dan minuman sambil menunggu jadwal bermain.",
    image: "/images/Cafe-lounge.png",
    features: [
      "Fresh Coffee & Beverage",
      "Snacks & Light Meals",
      "Indoor & Outdoor Seating",
      "High-Speed Wi-Fi",
      "Charging Station",
      "Comfortable Waiting Area",
    ],
  },
  {
    title: "Shower Room",
    description:
      "Setelah pertandingan selesai, Anda dapat menyegarkan diri di ruang bilas yang bersih dan nyaman. Setiap fasilitas dirawat secara rutin untuk menjaga kebersihan dan kenyamanan seluruh pengunjung.",
    image: "/images/Shower-room.png",
    features: [
      "Private Shower",
      "Changing Area",
      "Clean & Hygienic",
      "Daily Cleaning",
      "Good Ventilation",
      "Comfortable Interior",
    ],
  },
  {
    title: "Free Parking",
    description:
      "Arena Hub menyediakan area parkir yang luas sehingga pengunjung dapat datang menggunakan kendaraan pribadi tanpa kesulitan mencari tempat parkir. Area parkir mudah diakses dan berada dekat dengan pintu masuk.",
    image: "/images/Free-parking.png",
    features: [
      "Free Parking",
      "Car & Motorcycle Area",
      "Easy Access",
      "Security Monitoring",
      "Wide Parking Space",
      "Close to Main Entrance",
    ],
  },
];

export default function Facilities() {
  return (
    <section id="facilities" className="bg-[#020617] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto mb-24 max-w-3xl text-center">
          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-5 py-2 text-sm font-medium text-lime-400 text-xl font-semibold">
            Our Facilities
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            semua yang kamu butuhkan
            <br />
            sebelum dan sesudah pertandingan
          </h2>

          <p className="mt-6 text-xl font-semibold leading-8 text-slate-300">
            Arena Hub dirancang untuk memberikan pengalaman bermain padel yang
            lengkap. Mulai dari lapangan berkualitas internasional hingga
            fasilitas pendukung yang membuat setiap kunjungan terasa lebih
            nyaman.
          </p>
        </div>

        {/* Content */}

        <div className="space-y-40">
          {facilities.map((facility, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={facility.title}
                className={`grid items-center gap-16 lg:grid-cols-2 text-md${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}

                <div className="group overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content */}

                <div>
                  <h3 className="text-4xl font-bold text-white">
                    {facility.title}
                  </h3>

                  <p className="mt-6 text-lg leading-8 text-slate-300 text-xl">
                    {facility.description}
                  </p>

                  <div className="mt-10 grid gap-5 sm:grid-cols-2">
                    {facility.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-lime-400" />

                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
