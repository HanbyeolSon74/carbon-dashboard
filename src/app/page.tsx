import Navigation from "@/components/Navigation";
import { fetchCompanies } from "@/lib/api";
import MultiCompanyChart from "@/components/MultiCompanyChart";

export default async function DashboardPage() {
  const companies = await fetchCompanies();

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 bg-gray-50 p-6 min-h-screen space-y-6">
        <h1 className="text-2xl font-bold">Carbon Dashboard</h1>
        {companies.length > 0 && <MultiCompanyChart companies={companies} />}
      </main>
    </div>
  );
}
