"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Tag } from "@/types";

import styles from "./CatGrid.module.css";

interface Props {
  selectedTags: Tag[];
}

type Cat = {
  id: string;
  tags: Tag[];
  mimetyoe: "string";
  createdAt: "string";
};

export function CatGrid({ selectedTags }: Props) {
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formattedTags = useMemo(() => selectedTags.join(","), [selectedTags]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchCats() {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/cats`);

      try {
        url.searchParams.set("tags", formattedTags);
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch cats");
        }
        const data = await res.json();
        setCats(data);
      } catch {
        setError("Whoops, something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, [formattedTags]);

  if (isLoading) {
    return <div>Finding your cats...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.grid}>
      {cats?.map((cat) => (
        <div className={styles.imageWrapper} key={cat.id}>
          <Image
            src={`https://cataas.com/cat/${cat.id}`}
            alt="cat"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
