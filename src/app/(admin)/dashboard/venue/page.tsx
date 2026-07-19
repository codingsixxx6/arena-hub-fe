"use client";

import Button from "@/components/ui/button";
import BankInformationSection from "@/components/organizer/venue/BankInformationSection";
import OperatingHoursSection from "@/components/organizer/venue/OperatingHoursSection";
import VenueInformationSection from "@/components/organizer/venue/VenueInformationSection";
import { formatOperatingTime } from "@/helpers/format.helpers";
import {
  useMyVenue,
  useUpdateOperatingHours,
  useUpdateVenue,
} from "@/hooks/useVenueAdmin";
import { DayOfWeek, OperatingHour, VenueForm } from "@/types/venue.types";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VenueSettingsPage() {
  const { data: venue, isLoading } = useMyVenue();
  const updateVenueMutation = useUpdateVenue();
  const updateOperatingHoursMutation = useUpdateOperatingHours();

  const [form, setForm] = useState<VenueForm>({
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    city: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
  });

  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([]);

  useEffect(() => {
    if (!venue) return;

    console.log(venue);

    setForm({
      name: venue.name ?? "",
      description: venue.description ?? "",
      phoneNumber: venue.phoneNumber ?? "",
      address: venue.address ?? "",
      city: venue.city ?? "",
      bankName: venue.bankName ?? "",
      accountHolder: venue.accountHolder ?? "",
      accountNumber: venue.accountNumber ?? "",
    });

    setOperatingHours(
      venue.operatingHours.map((item) => ({
        ...item,
        openTime: formatOperatingTime(item.openTime),
        closeTime: formatOperatingTime(item.closeTime),
      })),
    );
  }, [venue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeChange = (
    day: DayOfWeek,
    field: "openTime" | "closeTime",
    value: string,
  ) => {
    setOperatingHours((prev) =>
      prev.map((item) =>
        item.dayOfWeek === day
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const handleClosedChange = (day: DayOfWeek, checked: boolean) => {
    setOperatingHours((prev) =>
      prev.map((item) =>
        item.dayOfWeek === day
          ? {
              ...item,
              isClosed: checked,
            }
          : item,
      ),
    );
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateVenueMutation.mutateAsync(form);

      await updateOperatingHoursMutation.mutateAsync(operatingHours);

      toast.success("Venue updated successfully.");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <LoaderCircle className="animate-spin" />
      </main>
    );
  }

  return (
    <div className="min-h-screen px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">Venue Settings</h1>
          <p className="mt-2 text-gray-400">
            Update your venue information and banking details.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-8">
          <form onSubmit={handleSubmit} className="space-y-7">
            <VenueInformationSection form={form} onChange={handleChange} />

            <BankInformationSection form={form} onChange={handleChange} />
            <OperatingHoursSection
              operatingHours={operatingHours}
              onTimeChange={handleTimeChange}
              onClosedChange={handleClosedChange}
            />
            <div className="flex justify-end mt-5">
              <Button type="submit" disabled={updateVenueMutation.isPending}>
                {updateVenueMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
