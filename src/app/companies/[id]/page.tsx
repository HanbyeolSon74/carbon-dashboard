import { fetchCompanies } from "@/lib/api";
import Navigation from "@/components/Navigation";
import EmissionsChart from "@/components/EmissionsChart";
import ChartSkeleton from "@/components/ChartSkeleton";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

async function ChartSection({ company }: { company: any }) {
  const totalEmissions = company.emissions.reduce(
    (sum: number, e: { emissions: number }) => sum + e.emissions,
    0
  );
  const latestEmissions =
    company.emissions.length > 0
      ? company.emissions[company.emissions.length - 1].emissions
      : 0;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <p className="text-sm uppercase text-gray-500 font-medium">
            Total Emissions (tCO2e)
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-1">
            {totalEmissions.toFixed(0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <p className="text-sm uppercase text-gray-500 font-medium">
            Latest Monthly Emissions
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-1">
            {latestEmissions.toFixed(0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <p className="text-sm uppercase text-gray-500 font-medium">Country</p>

          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {company.country}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <EmissionsChart company={company} />
      </div>
    </section>
  );
}

export default async function CompanyPage({ params }: Props) {
  const companies = await fetchCompanies();
  const company = companies.find((c) => c.id === params.id);

  if (!company) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg text-center">
            <h1 className="text-3xl font-extrabold text-red-500 mb-2">404</h1>
            <p className="text-xl text-gray-700">Company Not Found 🧐</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />

      <main className="flex-1 p-8 space-y-8">
        <header className="pb-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {company.name} Overview 🏢
          </h1>

          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
            <p className="text-sm font-medium text-gray-600">
              Country:{" "}
              <span className="font-bold text-gray-800">{company.country}</span>
            </p>
          </div>
        </header>

        <Suspense fallback={<ChartSkeleton />}>
          <ChartSection company={company} />
        </Suspense>
      </main>
    </div>
  );
}
