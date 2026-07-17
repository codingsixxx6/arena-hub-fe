"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingFilter() {
  const [date, setDate] = useState<Date>();

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/10 p-8 backdrop-blur-xl">

      {/* Header */}

      <div className="mb-8">

        <span className="text-xl font-medium uppercase tracking-widest text-lime-300">
          Booking Filter
        </span>

        <h2 className="mt-3 text-5xl font-semibold text-white">
          pilihlah lapangan yang tersedia
        </h2>

        <p className="mt-2 text-xl text-slate-300">
          Pilih tanggal, lapangan, jumlah pemain, dan durasi permainan.
        </p>

      </div>

      {/* Form */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Date */}
        <div className="space-y-2">

          <label className="text-xl font-medium text-slate-300 p-5">
            Date
          </label>

          <DatePicker
            
            value={date}
            onChange={setDate}
            placeholder="Select playing date"
          />

        </div>

        {/* Court */}

        <div className="space-y-2">

          <label className="text-xl font-medium text-slate-300">
            Court
          </label>

          <Select>

            <SelectTrigger className="h-14 w-full rounded-2xl">

              <SelectValue placeholder="Select Court" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Courts
              </SelectItem>

              <SelectItem value="1">
                Court 1
              </SelectItem>

              <SelectItem value="2">
                Court 2
              </SelectItem>

              <SelectItem value="3">
                Court 3
              </SelectItem>

              <SelectItem value="4">
                Court 4
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        {/* Players */}

        <div className="space-y-2">

          <label className="text-xl font-medium text-slate-300">
            Players
          </label>

          <Select>

            <SelectTrigger className="h-14 w-full rounded-2xl">

              <SelectValue placeholder="Select Players" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="2">
                2 Players
              </SelectItem>

              <SelectItem value="3">
                3 Players
              </SelectItem>

              <SelectItem value="4">
                4 Players
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        {/* Duration */}

        <div className="space-y-2">

          <label className="text-xl font-medium text-slate-300">
            Duration
          </label>

          <Select>

            <SelectTrigger className="h-14 w-full rounded-2xl">

              <SelectValue placeholder="Select Duration" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="60">
                60 Minutes
              </SelectItem>

              <SelectItem value="90">
                90 Minutes
              </SelectItem>

              <SelectItem value="120">
                120 Minutes
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </div>

      {/* Button */}

      <div className="mt-8 flex justify-end">

        <Button
          size="lg"
          className="min-w-56 text-black bg-lime-400"
        >
          Search Availability
        </Button>

      </div>

    </section>
  );
}