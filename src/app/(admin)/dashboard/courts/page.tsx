"use client";

import { LoaderCircle, Plus } from "lucide-react";

import { useCourts } from "@/hooks/useCourt";
import StatusBadge from "@/components/organizer/court/StatusBadge";
import { formatCurrency } from "@/helpers/format.helpers";
import CreateCourtDialog from "@/components/organizer/court/CreateCourtDialog";
import EditCourtDialog from "@/components/organizer/court/EditCourtDialog";

export default function CourtsPage() {
  const { data: courts, isLoading } = useCourts();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <LoaderCircle className="animate-spin" />
      </main>
    );
  }

  return (
    <div className="min-h-screen px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Court Management</h1>
            <p className="mt-2 text-gray-400">Manage your venue courts.</p>
          </div>

          <CreateCourtDialog />
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">Court</th>
                <th className="px-4 py-3 text-left">Sport</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {courts?.map((court) => (
                <tr key={court.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{court.name}</td>

                  <td className="px-4 py-3">{court.sportType}</td>

                  <td className="px-4 py-3 text-right">
                    {formatCurrency(court.pricePerHour)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={court.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    <EditCourtDialog court={court} />
                  </td>
                </tr>
              ))}

              {courts?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No courts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
