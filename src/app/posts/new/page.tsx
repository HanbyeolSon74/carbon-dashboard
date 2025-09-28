// src/app/posts/new/page.tsx
"use client";
import { useState } from "react";
import { createOrUpdatePost } from "@/lib/api";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createOrUpdatePost({
        title,
        content,
        dateTime: new Date().toISOString().slice(0, 7), // YYYY-MM
        resourceUid: "c1", // 임시: 첫 회사에 연결
      });
      router.push("/posts");
    } catch (err) {
      setError("Failed to save post. Try again.");
    }
  };

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">New Post</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </form>
      </main>
    </div>
  );
}
