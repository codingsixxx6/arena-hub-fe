"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { api } from "@/lib/api"
import { ApiResponse } from "@/types/api-response.types";
import { useState } from "react";
import { formatTime } from "@/helpers/format.helpers";
import { CourtAvailability } from "@/types/court.types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { CreateBookingPayload, CreatedBooking } from "@/types/booking.type";
import CourtSelection from "@/components/court/CourtSelection";
import DateSelection from "@/components/court/DateSelection";
import TimeSlotSelection from "@/components/court/TimeSlotSelection";
import BookingSummary from "@/components/court/BookingSummary";
import { Venue } from "@/types/venue.types";

export default function CourtsPage() {
  const [selectedCourtId, setSelectedCourtId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [selectedSlotIndexes, setSelectedSlotIndexes] = useState<number[]>([]);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= today;
  const {
    data: venue,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["venue"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Venue>>("/venue");

      return response.data.data;
    },
  });

  const {
    data: availability,
    isLoading: isAvailabilityLoading,
    isError: isAvailabilityError,
  } = useQuery({
    queryKey: ["availability", selectedCourtId, date],
    queryFn: async () => {
      const response = await api.get<ApiResponse<CourtAvailability>>(
        `/court/${selectedCourtId}/availability`,
        {
          params: {
            date,
          },
        },
      );

      return response.data.data;
    },
    enabled: !!selectedCourtId && isValidDate,
  });

  const { mutate: createBooking, isPending: isCreatingBooking } = useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const response = await api.post<ApiResponse<CreatedBooking>>(
        "/booking",
        payload,
      );

      return response.data.data;
    },
    onSuccess: (booking) => {
      router.push(`/bookings/${booking.id}`);
    },
  });

  const selectedSlots =
    availability?.slots.filter((_, index) =>
      selectedSlotIndexes.includes(index),
    ) ?? [];

  const firstSelectedSlot = selectedSlots[0];
  const lastSelectedSlot = selectedSlots[selectedSlots.length - 1];
  const selectedStartTime = firstSelectedSlot?.startTime;
  const selectedEndTime = lastSelectedSlot?.endTime;
  const duration = selectedSlots.length;
  const totalPrice = duration * (availability?.court.pricePerHour ?? 0);

  const handleSelectCourt = (courtId: string) => {
    setSelectedCourtId(courtId);
    setDate("");
    setSelectedSlotIndexes([]);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    setSelectedSlotIndexes([]);
  };

  const handleSelectSlot = (index: number) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!availability) return;

    const slot = availability.slots[index];

    if (!slot.available) return;

    setSelectedSlotIndexes((current) => {
      if (current.includes(index)) {
        const sortedIndexes = [...current].sort((a, b) => a - b);

        const firstIndex = sortedIndexes[0];
        const lastIndex = sortedIndexes[sortedIndexes.length - 1];

        if (index === firstIndex || index === lastIndex) {
          return current.filter((slotIndex) => slotIndex !== index);
        }

        return current;
      }

      if (current.length === 0) {
        return [index];
      }

      const sortedIndexes = [...current].sort((a, b) => a - b);

      const firstIndex = sortedIndexes[0];
      const lastIndex = sortedIndexes[sortedIndexes.length - 1];

      if (index === firstIndex - 1 || index === lastIndex + 1) {
        return [...current, index].sort((a, b) => a - b);
      }

      return current;
    });
  };

  const handleContinueBooking = () => {
    if (!user || !selectedCourtId || !date || selectedSlots.length === 0) {
      return;
    }

    createBooking({
      courtId: selectedCourtId,
      date,
      slots: selectedSlots.map((slot) => formatTime(slot.startTime)),
    });
  };
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <LoaderCircle className="animate-spin" />
      </main>
    );
  }

  if (isError || !venue) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Failed to load venue
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">
            Our Courts
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Choose Your Court
          </h1>

          <p className="mt-3 text-gray-400">
            Select a court, date, and available time at {venue.name}.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <CourtSelection
              courts={venue.courts}
              selectedCourtId={selectedCourtId}
              onSelectCourt={handleSelectCourt}
            />

            {selectedCourtId && (
              <DateSelection
                date={date}
                minDate={today}
                onDateChange={handleDateChange}
              />
            )}

            {date && (
              <TimeSlotSelection
                availability={availability}
                selectedSlotIndexes={selectedSlotIndexes}
                isLoading={isAvailabilityLoading}
                isError={isAvailabilityError}
                onSelectSlot={handleSelectSlot}
              />
            )}
          </div>

          <BookingSummary
            availability={availability}
            date={date}
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
            duration={duration}
            totalPrice={totalPrice}
            isCreatingBooking={isCreatingBooking}
            onContinueBooking={handleContinueBooking}
          />
        </div>
      </div>
    </main>
  );
}
