// src/components/EmissionsChart.tsx
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

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-bold mb-2">Emissions Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="emissions" stroke="#1f77b4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
