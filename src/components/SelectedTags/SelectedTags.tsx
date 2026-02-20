import { Tag } from "@/types";

import styles from "./SelectedTags.module.css";

interface Props {
  tags?: Tag[];
  onRemove: (tag: Tag) => void;
}

export function SelectedTags({ tags, onRemove }: Props) {
  return (
    <div className={styles.wrapper}>
      {tags?.map((tag) => (
        <button onClick={() => onRemove(tag)} key={tag} className={styles.pill}>
          {tag} <span>x</span>
        </button>
      ))}
    </div>
  );
}
