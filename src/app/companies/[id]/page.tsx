import { fetchCompanies } from "@/lib/api";
import Navigation from "@/components/Navigation";
import EmissionsChart from "@/components/EmissionsChart";

interface Props {
  params: { id: string };
}

export default async function CompanyPage({ params }: Props) {
  const companies = await fetchCompanies();
  const company = companies.find((c) => c.id === params.id);

  if (!company) return <div>Company not found</div>;

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 bg-gray-50 p-6 min-h-screen space-y-6">
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <p>Country: {company.country}</p>
        <EmissionsChart company={company} />
      </main>
    </div>
  );
}
