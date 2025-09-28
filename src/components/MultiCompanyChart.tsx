// src/components/MultiCompanyChart.tsx
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
  // 모든 회사의 yearMonth를 합쳐서 고유 리스트
  const allMonths = Array.from(
    new Set(companies.flatMap((c) => c.emissions.map((e) => e.yearMonth)))
  ).sort();

  // 차트용 데이터 생성
  const data = allMonths.map((month) => {
    const item: Record<string, string | number> = { month };
    companies.forEach((c) => {
      const e = c.emissions.find((em) => em.yearMonth === month);
      item[c.name] = e ? e.emissions : 0;
    });
    return item;
  });

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-bold mb-2">Emissions Comparison</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {companies.map((c, idx) => (
            <Line
              key={c.id}
              type="monotone"
              dataKey={c.name}
              stroke={colors[idx % colors.length]}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
