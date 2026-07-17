"use client";

import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  Star,
  Users,
} from "lucide-react";

import SlotCard from "./slot-card";

import {
  Court,
  TimeSlot,
} from "../types/booking.types";

interface BookingCardProps {
  court: Court;
  selectedSlotId?: string;
  onSelectSlot: (slot: TimeSlot) => void;
}

export default function BookingCard({
  court,
  selectedSlotId,
  onSelectSlot,
}: BookingCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">

      {/* Image */}

      <div className="relative h-64">

        <Image
          src={court.image}
          alt={court.name}
          fill
          className="object-cover"
        />

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-2xl font-bold text-white">
              {court.name}
            </h3>

            <p className="mt-2 text-slate-400">
              {court.description}
            </p>

          </div>

          <div className="flex items-center gap-1 text-lime-400">

            <Star
              size={18}
              fill="currentColor"
            />

            <span>{court.rating}</span>

          </div>

        </div>

        {/* Court Info */}

        <div className="mt-6 flex gap-6">

          <div className="flex items-center gap-2 text-slate-300">

            <Users size={18} />

            <span>{court.capacity} Players</span>

          </div>

          <div className="flex items-center gap-2 text-slate-300">

            <Building2 size={18} />

            <span>
              {court.indoor ? "Indoor" : "Outdoor"}
            </span>

          </div>

        </div>

        {/* Features */}

        <div className="mt-6 grid gap-3">

          {court.features.map((feature) => (

            <div
              key={feature}
              className="flex items-center gap-2"
            >

              <CheckCircle2
                size={16}
                className="text-lime-400"
              />

              <span className="text-slate-300">
                {feature}
              </span>

            </div>

          ))}

        </div>

        {/* Available Slots */}

        <div className="mt-8">

          <h4 className="mb-4 text-lg font-semibold text-white">
            Available Time
          </h4>

          <div className="grid grid-cols-3 gap-3">

            {court.slots.map((slot) => (

              <SlotCard
                key={slot.id}
                slot={slot}
                selected={selectedSlotId === slot.id}
                onSelect={onSelectSlot}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}