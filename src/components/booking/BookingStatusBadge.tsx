import { BookingStatus } from "@/types/booking.type";

type BookingStatusBadgeProps = {
  status: BookingStatus;
};

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING_PAYMENT: {
    label: "Pending Payment",
    className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  },
  WAITING_VERIFICATION: {
    label: "Waiting Verification",
    className: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "border-lime-500/30 bg-lime-500/10 text-lime-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "border-red-500/30 bg-red-500/10 text-red-400",
  },
  COMPLETED: {
  label: "Completed",
  className: "border-slate-500/30 bg-slate-500/10 text-slate-300",
},
};

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}