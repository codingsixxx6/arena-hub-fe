"use client";

import { useState } from "react";

import BookingCard from "./booking-card";
import BookingSummary from "./booking-summary";

import { dummyCourts } from "../data/dummy-booking";
import { TimeSlot } from "../types/booking.types";


export default function BookingGrid() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null);

  function handleSelectSlot(courtId: number, slot: TimeSlot) {
    setSelectedCourtId(courtId);
    setSelectedSlot(slot);
  }

  return (
    <section className="mt-16">
      {/* Header */}

      <div className="mb-8">
        <span className="text-sm font-medium uppercase tracking-widest text-lime-400">
          Available Courts
        </span>

        <h2 className="mt-3 text-3xl font-bold text-white">
          Choose Your Court
        </h2>

        <p className="mt-2 text-slate-400">
          Pilih lapangan dan jam bermain yang tersedia.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-8 lg:grid-cols-2">
        {dummyCourts.map((court) => (
          <BookingCard
            key={court.id}
            court={court}
            selectedSlotId={
              selectedCourtId === court.id ? selectedSlot?.id : undefined
            }
            onSelectSlot={(slot) => handleSelectSlot(court.id, slot)}
          />
        ))}
      </div>

      <BookingSummary
        courtName={
          selectedCourtId
            ? dummyCourts.find((court) => court.id === selectedCourtId)?.name
            : undefined
        }
        slot={selectedSlot}
      />
    </section>
  );
}
