"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchPost } from "@/lib/api";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import PostActions from "./PostActions";
import { Post } from "@/types/models";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid post ID.");
      setLoading(false);
      return;
    }

    const postId = Array.isArray(id) ? id[0] : id;

    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetched = await fetchPost(postId);
        if (!fetched) {
          setError(`Post with ID (${id}) not found.`);
          setPost(null);
        } else {
          setPost(fetched);
        }
      } catch (err) {
        setError("Failed to fetch the post.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 flex justify-center items-start max-w-4xl mx-auto">
          <p className="text-lg text-gray-500 mt-20">Loading post...</p>
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
            &larr; Back to Posts List
          </Link>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1 p-8 space-y-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Post Not Found
          </h1>
          <p className="text-gray-500">
            The requested post ID ({id}) does not exist.
          </p>
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
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Published: {post.dateTime} | Company ID: {post.resourceUid}
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200 space-y-6">
          <article className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </p>
          </article>

          <PostActions postId={post.id} />
        </div>

        <Link
          href="/posts"
          className="text-green-600 hover:text-green-800 transition duration-150 text-sm font-medium"
        >
          &larr; Back to Posts List
        </Link>
      </main>
    </div>
  );
}
