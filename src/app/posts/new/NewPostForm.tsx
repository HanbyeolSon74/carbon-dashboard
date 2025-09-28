"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrUpdatePost } from "@/lib/api";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createOrUpdatePost({
        title,
        content,
        resourceUid: companyId,
        dateTime: new Date().toISOString(),
      });
      router.push("/posts");
      router.refresh();
    } catch {
      setError("Failed to create post. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-2xl space-y-6 border border-gray-200"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Company ID (resourceUid)
        </label>
        <input
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150"
          rows={10}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
              w-full sm:w-auto 
              px-6 py-3 text-lg font-bold rounded-lg shadow-md 
              transition duration-200 ease-in-out
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed opacity-75 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
              }
            `}
      >
        {isSubmitting ? "Submitting..." : "Create Report"}
      </button>
    </form>
  );
}
