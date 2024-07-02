"use client";

import styles from "@/styles/post.module.css";
import { useMemo, useState } from "react";

export default function PostMenu() {
  const [isClicked, setIsClicked] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const className = useMemo(() => {
    if (isInitialLoad) {
      return undefined;
    }
    return isClicked ? styles.rotateStartAnimation : styles.rotateEndAnimation;
  }, [isClicked, isInitialLoad]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsInitialLoad(false);
  };

  return (
    <div onClick={handleClick}>
      <svg className={className} width="24" height="24" viewBox="0 0 18 18">
        <polyline
          fill="none"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="2 12, 16 12"
        ></polyline>
        <polyline
          fill="none"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="2 5, 16 5"
        ></polyline>
      </svg>
    </div>
  );
}
