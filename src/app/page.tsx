import { CatsView } from "@/components/CatsView/CatsView";

async function getTags() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`);

  if (!res.ok) {
    throw new Error("Failed to fetch cat tags");
  }

  return res.json();
}

export default async function Home() {
  const tags = await getTags();

  return (
    <main>
      <CatsView tags={tags} />
    </main>
  );
}
