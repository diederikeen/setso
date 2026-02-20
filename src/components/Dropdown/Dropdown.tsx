import { Tag } from "@/types";

import styles from "./Dropdown.module.css";

interface Props {
  tags: Tag[];
  onSelect: (tag: Tag) => void;
}

export function Dropdown({ tags, onSelect }: Props) {
  return (
    <ul className={styles.dropdown}>
      {tags.map((tag) => (
        <li className={styles.dropdownItem} key={tag}>
          <button onMouseDown={() => onSelect(tag)}>{tag}</button>
        </li>
      ))}
    </ul>
  );
}
