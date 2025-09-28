// src/app/posts/page.tsx
import { fetchPosts } from "@/lib/api";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <Link
          href="/posts/new"
          className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Post
        </Link>
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.id} className="bg-white rounded-xl shadow p-4">
              <Link href={`/posts/${p.id}`} className="block">
                <h2 className="text-lg font-bold">{p.title}</h2>
                <p className="text-gray-500">{p.dateTime}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
