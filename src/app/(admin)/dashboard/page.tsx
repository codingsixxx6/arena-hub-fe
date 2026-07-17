"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import BookingListSection from "@/components/dashboard/BookingListSection";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { formatCurrency } from "@/helpers/format.helpers";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api-response.types";
import { DashboardData } from "@/types/dashboard.types"; 

export default function DashboardPage() {
  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<DashboardData>>("/dashboard");

      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <LoaderCircle className="animate-spin" />
      </main>
    );
  }

  if (isError || !dashboard) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Failed to load dashboard
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="mt-2 text-gray-400">
            Overview of your venue performance.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Bookings"
            value={dashboard.summary.totalBookings}
            description={`${dashboard.summary.confirmedBookings} confirmed • ${dashboard.summary.cancelledBookings} cancelled`}
          />

          <SummaryCard
            label="Today's Bookings"
            value={dashboard.summary.todayBookings}
            description="Scheduled for today"
          />

          <SummaryCard
            label="Pending Verification"
            value={dashboard.summary.pendingVerification}
            description="Requires your attention"
            valueClassName="text-yellow-400"
          />

          <SummaryCard
            label="Total Revenue"
            value={formatCurrency(dashboard.summary.totalRevenue)}
            description={`${formatCurrency(dashboard.summary.todayRevenue)} today`}
            valueClassName="text-lime-400"
          />
        </div>

        <div className="mt-6">
          <RevenueChart data={dashboard.revenueChart} />
        </div>

        <div className="mt-6 space-y-6">
          <BookingListSection
            title="Pending Verification"
            description="Payments waiting for your review."
            bookings={dashboard.pendingVerification}
            variant="pending"
            emptyMessage="No payments waiting for verification."
          />

          <BookingListSection
            title="Upcoming Bookings"
            description="Confirmed bookings scheduled for upcoming sessions."
            bookings={dashboard.upcomingBookings.slice(0, 3)}
            variant="upcoming"
            emptyMessage="No upcoming bookings."
          />
        </div>
      </div>
    </div>
  );
}
