"use client";
import { Company } from "@/types/models";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  companies: Company[];
}

export default function MultiCompanyChart({ companies }: Props) {
  const allMonths = Array.from(
    new Set(companies.flatMap((c) => c.emissions.map((e) => e.yearMonth)))
  ).sort();

  const data = allMonths.map((month) => {
    const item: Record<string, string | number> = { month };
    companies.forEach((c) => {
      const e = c.emissions.find((em) => em.yearMonth === month);
      item[c.name] = e ? e.emissions : 0;
    });
    return item;
  });

  const colors = [
    "#34D399",
    "#60A5FA",
    "#FBBF24",
    "#F87171",
    "#A78BFA",
    "#FB923C",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition duration-300 hover:shadow-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        기업별 배출량 비교 (Emissions Comparison)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
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
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "20px", fontSize: "14px" }}
            height={36}
          />

          {companies.map((c, idx) => (
            <Line
              key={c.id}
              type="monotone"
              dataKey={c.name}
              stroke={colors[idx % colors.length]}
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                fill: colors[idx % colors.length],
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
