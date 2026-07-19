import SectionCard from "@/components/ui/SectionCard";
import { formatOperatingTime } from "@/helpers/format.helpers";
import { DayOfWeek, OperatingHour } from "@/types/venue.types";

interface OperatingHoursSectionProps {
  operatingHours: OperatingHour[];
  onTimeChange: (
    day: DayOfWeek,
    field: "openTime" | "closeTime",
    value: string,
  ) => void;
  onClosedChange: (day: DayOfWeek, checked: boolean) => void;
}

export default function OperatingHoursSection({
  operatingHours,
  onTimeChange,
  onClosedChange
}: OperatingHoursSectionProps) {
    console.table(operatingHours);
  return (
    <SectionCard
      title="Operating Hours"
      description="Set your weekly operating schedule."
    >
      <div className="space-y-4">
        {operatingHours.map((hour) => (
          <div
            key={hour.dayOfWeek}
            className="grid grid-cols-1 items-center gap-4 rounded-lg border border-white/10 p-4 md:grid-cols-4"
          >
            <div>
              <p className="font-medium">{hour.dayOfWeek}</p>
            </div>

            <input
              type="time"
              value={hour.openTime}
              disabled={hour.isClosed}
              onChange={(e) =>
                onTimeChange(hour.dayOfWeek, "openTime", e.target.value)
              }
              className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
            />

            <input
              type="time"
              value={hour.closeTime}
              disabled={hour.isClosed}
              onChange={(e) =>
                onTimeChange(hour.dayOfWeek, "closeTime", e.target.value)
              }
              className="rounded-lg border border-white/10 bg-slate-800 px-3 py-2"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hour.isClosed}
                onChange={(e) =>
                  onClosedChange(hour.dayOfWeek, e.target.checked)
                }
              />
              Closed
            </label>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
