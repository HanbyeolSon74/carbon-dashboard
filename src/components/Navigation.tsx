"use client";
import Link from "next/link";
import { fetchCompanies } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    fetchCompanies().then((data) =>
      setCompanies(data.map((c) => ({ id: c.id, name: c.name })))
    );
  }, []);

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Carbon Dashboard</h2>
      <nav className="space-y-2">
        {companies.map((c) => (
          <Link
            key={c.id}
            href={`/companies/${c.id}`}
            className="block px-2 py-1 rounded hover:bg-gray-700"
          >
            {c.name}
          </Link>
        ))}
        <Link
          href="/posts"
          className="block px-2 py-1 rounded hover:bg-gray-700 mt-4"
        >
          Reports
        </Link>
      </nav>
    </aside>
  );
}
