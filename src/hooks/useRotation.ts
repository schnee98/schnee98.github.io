import styles from "@/styles/post.module.css";
import { useMemo } from "react";
import { useState } from "react";

export function useRotation() {
  const [clicked, setClicked] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(true);

  const className = useMemo(() => {
    if (initialLoaded) {
      return undefined;
    }
    return clicked ? styles["rotate-start"] : styles["rotate-end"];
  }, [clicked, initialLoaded]);

  const onClick = () => {
    setClicked(!clicked);
    setInitialLoaded(false);
  };

  return {
    clicked,
    onClick,
    className,
  };
}
