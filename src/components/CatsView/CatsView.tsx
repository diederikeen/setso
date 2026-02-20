"use client";
import { useState } from "react";
import { Tag } from "@/types";

import { Tags } from "../Tags/Tags";
import { CatGrid } from "../CatGrid/CatGrid";

interface Props {
  tags: Tag[];
}

export function CatsView({ tags }: Props) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  return (
    <>
      <Tags
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={(tag) => setSelectedTags((prev) => [...prev, tag])}
        onTagRemove={(tag) =>
          setSelectedTags((prev) => prev.filter((t) => t !== tag))
        }
      />

      <CatGrid selectedTags={selectedTags} />
    </>
  );
}
