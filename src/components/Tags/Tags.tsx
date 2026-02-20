"use client";
import { useState } from "react";

import { Dropdown } from "../Dropdown/Dropdown";
import { SelectedTags } from "../SelectedTags/SelectedTags";

import { Tag } from "@/types";

import styles from "./Tags.module.css";

interface Props {
  tags: Tag[];
  selectedTags?: Tag[];
  onTagSelect: (tag: Tag) => void;
  onTagRemove: (tag: Tag) => void;
}

export function Tags({ tags, selectedTags, onTagRemove, onTagSelect }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTags = tags
    .filter((t) => !selectedTags?.includes(t))
    .filter((t) => t.toLowerCase().includes(query.toLowerCase()));

  function handleSelect(tag: string) {
    onTagSelect(tag);
    setIsOpen(false);
  }

  const shouldRenderDropdown = isOpen && filteredTags.length > 0;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <input
            name="query"
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            placeholder="Search on tags"
          />

          {shouldRenderDropdown && (
            <Dropdown
              tags={filteredTags}
              onSelect={(tag) => handleSelect(tag)}
            />
          )}
        </div>
      </div>
      <SelectedTags tags={selectedTags} onRemove={(tag) => onTagRemove(tag)} />
    </>
  );
}
