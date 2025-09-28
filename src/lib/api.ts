import { Company, Post } from "@/types/models";

let _companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", emissions: 120 },
      { yearMonth: "2024-02", emissions: 110 },
      { yearMonth: "2024-03", emissions: 95 },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", emissions: 80 },
      { yearMonth: "2024-02", emissions: 105 },
      { yearMonth: "2024-03", emissions: 120 },
    ],
  },
];

let _posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report for Q1",
    resourceUid: "c1",
    dateTime: "2024-02",
    content:
      "This report covers the first quarter of 2024. Acme Corp's emissions show a slight downward trend due to increased renewable energy consumption in February and March.",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCompanies(): Promise<Company[]> {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(jitter());
  return _posts;
}

export async function fetchPost(id: string): Promise<Post | null> {
  await delay(jitter());
  const post = _posts.find((p) => p.id === id);
  return post || null;
}

export async function createOrUpdatePost(
  p: Omit<Post, "id"> & { id?: string }
): Promise<Post> {
  await delay(jitter());

  if (maybeFail())
    throw new Error("Save failed: Network or server issue occurred.");

  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  }

  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}

export async function deletePost(id: string): Promise<void> {
  await delay(jitter());

  if (maybeFail()) throw new Error("Delete failed: Server did not respond.");
  _posts = _posts.filter((p) => p.id !== id);
}
