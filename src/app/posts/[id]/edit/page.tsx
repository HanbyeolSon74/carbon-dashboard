"use client";

import { useState, useEffect } from "react";
import { fetchPost, createOrUpdatePost } from "@/lib/api";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import { Post } from "@/types/models";
import Link from "next/link";

interface EditPostPageProps {
  params: {
    id: string | string[];
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();

  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const fetchedPost = await fetchPost(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
          setTitle(fetchedPost.title);
          setContent(fetchedPost.content);
        } else {
          setError("Report not found for editing.");
        }
      } catch (err) {
        setError("Failed to load report data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    if (!post) {
      setError("Cannot save: Post data is missing.");
      setIsSaving(false);
      return;
    }

    try {
      await createOrUpdatePost({
        id: postId,
        title,
        content,
        dateTime: post.dateTime,
        resourceUid: post.resourceUid,
      });

      router.replace(`/posts/${postId}`);
      router.refresh();
    } catch (err) {
      setError(
        `Failed to save changes. Please check network and try again. (${
          (err as Error).message
        })`
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 flex justify-center items-start max-w-4xl mx-auto">
          <p className="text-lg text-gray-500 mt-20">
            Loading report for editing...
          </p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 space-y-4 max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
            {error}
          </div>
          <Link
            href="/posts"
            className="text-green-600 hover:text-green-800 transition duration-150 text-sm font-medium"
          >
            &larr; Back to Reports List
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />

      <main className="flex-1 p-8 space-y-8 max-w-4xl mx-auto">
        <header className="pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Edit Report: {post?.title} ✏️
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200 space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150"
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150"
              rows={10}
              required
            />
          </div>

          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            Report ID: {postId} | Company: {post?.resourceUid}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`
              w-full sm:w-auto 
              px-6 py-3 text-lg font-bold rounded-lg shadow-md 
              transition duration-200 ease-in-out
              ${
                isSaving
                  ? "bg-green-400 cursor-not-allowed opacity-75 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
              }
            `}
          >
            {isSaving ? "Updating Report..." : "Save Changes"}
          </button>
        </form>
      </main>
    </div>
  );
}
