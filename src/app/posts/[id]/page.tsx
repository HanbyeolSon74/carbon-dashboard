import { fetchPosts } from "@/lib/api";

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const posts = await fetchPosts();
  const post = posts.find((p) => p.id === params.id);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 text-white p-4 min-h-screen">
        Navigation
      </div>
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4">{post.dateTime}</p>
        <div className="bg-white rounded-xl shadow p-4">{post.content}</div>
      </main>
    </div>
  );
}
