"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RevenueChartItem } from "@/types/dashboard.types";
import {
  formatCompactNumber,
  formatCurrency,
  formatDate,
  formatShortDate,
} from "@/helpers/format.helpers";

type RevenueChartProps = {
  data: RevenueChartItem[];
};

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <div>
        <h2 className="text-xl font-semibold">Revenue Overview</h2>

        <p className="mt-1 text-sm text-gray-400">
          Revenue performance over the last 7 days.
        </p>
      </div>

      <div className="mt-8 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="date"
              tickFormatter={formatShortDate}
              stroke="#64748b"
            />

            <YAxis tickFormatter={formatCompactNumber} stroke="#64748b" />

            <Tooltip
              formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
              labelFormatter={(label) => formatDate(String(label))}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#84cc16"
              fill="#84cc16"
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
