"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/api";
import Link from "next/link";

interface PostActionsProps {
  postId: string;
}

export default function PostActions({ postId }: PostActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this report? This action cannot be undone."
      )
    )
      return;

    setIsDeleting(true);
    setError(null);

    try {
      await deletePost(postId);
      router.push("/posts");
      router.refresh();
    } catch {
      setError("Failed to delete the report. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="pt-4 border-t border-gray-100 flex justify-end space-x-4">
      <Link
        href={`/posts/${postId}/edit`}
        className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition duration-200 text-blue-600 border border-blue-500 hover:bg-blue-50"
      >
        Edit Report
      </Link>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition duration-200 ${
          isDeleting
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <div className="absolute right-0 mt-2 p-2 bg-red-500 text-white text-xs rounded-lg shadow-xl whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
