"use client";
import { Company } from "@/types/models";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  company: Company;
}

export default function EmissionsChart({ company }: Props) {
  const data = company.emissions.map((e) => ({
    month: e.yearMonth,
    emissions: e.emissions,
  }));

  const primaryColor = "#10B981";
  const activeDotColor = "#059669";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        {company.name} - Emissions Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            stroke="#E5E7EB"
            vertical={false}
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            style={{ fontSize: "12px", fill: "#6B7280" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "12px", fill: "#6B7280" }}
          />

          <Tooltip
            formatter={(value) => [`${value} tCO2e`, "Emissions"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          />

          <Line
            type="monotone"
            dataKey="emissions"
            stroke={primaryColor}
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: activeDotColor,
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
