"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "@/lib/api";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Post } from "@/types/models";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetched = await fetchPosts();
        setPosts(fetched);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 flex justify-center items-start max-w-4xl mx-auto">
          <p className="text-lg text-gray-500 mt-20">Loading posts...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 flex justify-center items-start max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
            {error}
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
            Carbon Reports 📄
          </h1>

          <Link
            href="/posts/new"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
          >
            <span className="text-xl mr-1">+</span> New Report
          </Link>
        </header>

        <section className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-500">No reports available.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 transition duration-200 hover:shadow-xl hover:border-green-300"
                >
                  <Link href={`/posts/${p.id}`} className="block p-5">
                    <h2 className="text-xl font-bold text-gray-800 transition duration-150 hover:text-green-600">
                      {p.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Published: {p.dateTime} | Company: {p.resourceUid}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
