"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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

const LIMIT = 10;
const PAGE = 0;

export function CatGrid({ selectedTags }: Props) {
  const isMounted = useRef(false);
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(PAGE);
  const [resetKey, setResetKey] = useState(0);

  const formattedTags = useMemo(() => selectedTags.join(","), [selectedTags]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchCats() {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/cats`);
      url.searchParams.set("skip", String(page * LIMIT));
      url.searchParams.set("limit", String(LIMIT));
      url.searchParams.set("tags", formattedTags);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch cats");
        }
        const data = await res.json();
        setCats((prev) => [...(prev || []), ...data]);
      } catch {
        setError("Whoops, something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, [page, resetKey]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setCats(null);
    setPage(0);
    setResetKey((prev) => prev + 1);
  }, [formattedTags]);

  if (error) {
    return <div>{error}</div>;
  }

  const isLoadMoreDisabled = (cats?.length || 0) < LIMIT;

  return (
    <div>
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
      {isLoading && <div>Finding your cats...</div>}
      <div className={styles.footer}>
        <button
          className={styles.button}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoadMoreDisabled}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
