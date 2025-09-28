import Navigation from "@/components/Navigation";
import { fetchCompanies } from "@/lib/api";
import { Suspense } from "react";
import ChartSkeleton from "@/components/ChartSkeleton";
import MultiCompanyChart from "@/components/MultiCompanyChart";

import { Company, GhgEmission } from "@/types/models";

interface EmissionStats {
  totalEmissions: number;
  totalCompanies: number;
  avgMonthlyEmissions: number;
  totalMonthsReported: number;
}

function calculateStats(companies: Company[]): EmissionStats {
  const totalEmissions = companies.reduce<number>(
    (sum, c) => sum + c.emissions.reduce((eSum, e) => eSum + e.emissions, 0),
    0
  );

  const totalCompanies = companies.length;

  const allMonths = new Set<string>();
  companies.forEach((c) =>
    c.emissions.forEach((e) => allMonths.add(e.yearMonth))
  );
  const totalMonthsReported = allMonths.size;

  const avgMonthlyEmissions =
    totalMonthsReported > 0 && totalCompanies > 0
      ? totalEmissions / (totalCompanies * totalMonthsReported)
      : 0;

  return {
    totalEmissions,
    totalCompanies,
    avgMonthlyEmissions,
    totalMonthsReported,
  };
}

function CarbonTaxWidget({ totalEmissions }: { totalEmissions: number }) {
  const TAX_RATE_USD_PER_TON = 50;
  const estimatedCost = totalEmissions * TAX_RATE_USD_PER_TON;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
      <p className="text-sm uppercase text-gray-500 font-medium flex justify-between items-center">
        Estimated Carbon Tax 💰
        <span className="text-xs text-red-500 font-bold">@ $50/tCO2e</span>
      </p>
      <p className="text-3xl font-bold text-gray-800 mt-1">
        ${estimatedCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        <span className="text-xl font-normal text-gray-500">USD</span>
      </p>
    </div>
  );
}

async function ChartWrapper() {
  const companies: Company[] = await fetchCompanies();
  const {
    totalEmissions,
    totalCompanies,
    avgMonthlyEmissions,
    totalMonthsReported,
  } = calculateStats(companies);

  if (totalCompanies === 0) {
    return (
      <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-lg border border-gray-200">
        <p>표시할 기업 데이터가 없습니다. 새로운 기업을 추가해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <p className="text-sm uppercase text-gray-500 font-medium">
            Total Reported Emissions
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {totalEmissions.toFixed(0)}{" "}
            <span className="text-xl font-normal text-gray-500">tCO2e</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <p className="text-sm uppercase text-gray-500 font-medium">
            Reporting Companies
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {totalCompanies}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <p className="text-sm uppercase text-gray-500 font-medium">
            Avg Monthly Emissions
            <span className="text-xs text-gray-400">
              ({totalMonthsReported} Mos)
            </span>
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {avgMonthlyEmissions.toFixed(0)}{" "}
            <span className="text-xl font-normal text-gray-500">tCO2e</span>
          </p>
        </div>

        <CarbonTaxWidget totalEmissions={totalEmissions} />
      </div>

      <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex justify-between items-center">
          <span>Total Company Emissions Trend</span>

          <div className="text-sm text-gray-500">
            Showing: All Available Data
          </div>
        </h2>
        <MultiCompanyChart companies={companies} />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />

      <main className="flex-1 p-8 space-y-8">
        <header className="pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Carbon Emissions Dashboard 📊
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            통합된 탄소 배출량 데이터 및 분석
          </p>
        </header>

        <Suspense fallback={<ChartSkeleton />}>
          <ChartWrapper />
        </Suspense>
      </main>
    </div>
  );
}
