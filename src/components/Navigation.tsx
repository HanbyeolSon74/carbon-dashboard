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
    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen shadow-2xl">
      <Link href="/" className="group block mb-8 transition duration-300">
        <h2 className="text-xl font-extrabold tracking-wider border-b border-gray-700/50 pb-3">
          <span className="text-green-400">🌱</span> Carbon Dashboard
        </h2>
      </Link>

      <nav className="space-y-2">
        <p className="text-xs font-semibold uppercase text-gray-400 mt-4 mb-2 tracking-wider">
          Companies
        </p>

        {companies.map((c) => (
          <Link
            key={c.id}
            href={`/companies/${c.id}`}
            className="flex items-center px-3 py-2 rounded-lg text-sm transition duration-150 hover:bg-gray-700 hover:text-white"
          >
            {c.name}
          </Link>
        ))}

        <div className="pt-4 border-t border-gray-700/50">
          <Link
            href="/posts"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition duration-150 hover:bg-gray-700 hover:text-white"
          >
            📄 Reports
          </Link>
        </div>
      </nav>
    </aside>
  );
}
