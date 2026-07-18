import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import Button from "../ui/button";

const navigation = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Facilities",
    href: "#facilities",
  },
  {
    name: "Courts",
    href: "#courts",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#020617] pt-28">
      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-lime-400/20 bg-gradient-to-br from-lime-400/15 via-slate-900 to-slate-900 p-12 md:p-20">
          {/* Glow */}

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-lime-400/20 blur-[140px]" />

          <div className="relative">
            <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-xl font-semibold text-lime-400">
              Ready to Play?
            </span>

            <h2 className="mt-8 text-5xl font-bold leading-tight text-white md:text-6xl">
              Experience Premium Padel
              <br />
              at ARENA<span className="text-lime-400">HUB</span> Today.
            </h2>

            <p className="mt-8 max-w-2xl text-xl font-semibold leading-8 text-slate-300">
              Booking court kini lebih mudah. Pilih jadwalmu, datang bersama
              teman, dan rasakan pengalaman bermain padel terbaik di Arena Hub.
            </p>

            <Link href="/courts">
              <Button className="flex items-center mt-8">
                Book Court
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}

      <div
        id="contact"
        className="mx-auto mt-24 max-w-7xl border-t border-slate-800 px-6 py-16"
      >
        <div className="grid gap-16 lg:grid-cols-4">
          {/* Logo */}

          <div>
            <h3 className="text-5xl font-bold text-white">
              ARENA
              <span className="text-lime-400">HUB</span>
            </h3>

            <p className="mt-6 leading-8 text-slate-300 text-xl font-semibold">
              Premium indoor padel venue yang menghadirkan pengalaman bermain
              nyaman, modern, dan profesional untuk semua kalangan.
            </p>
          </div>

          {/* Navigation */}

          <div className="text-xl">
            <h4 className="font-semibold text-white">Navigation</h4>

            <div className="mt-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-slate-300 transition hover:text-lime-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}

          <div className="text-xl text-slate-300">
            <h4 className="font-semibold text-white">Contact</h4>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-lime-400" />

                <p>
                  Jl. Panglima No. 9
                  <br />
                  Jakarta Selatan
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={20} className="text-lime-400" />
                <p>+62 821-7049-6833</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="text-lime-400" />

                <p>arenahub@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xl text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Arena Hub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-lime-400">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-lime-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
