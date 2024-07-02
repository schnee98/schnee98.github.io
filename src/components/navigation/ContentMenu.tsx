"use client";

import styles from "@/styles/post.module.css";
import { useEffect, useMemo, useState } from "react";
import ContentSidebar from "./ContentSidebar";

export default function ContentMenu() {
  const [isClicked, setIsClicked] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [headers, setHeaders] = useState<Element[]>([]);

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

  useEffect(() => {
    const main = document.querySelector("main > article");
    if (main) {
      const elementsWithId = main.querySelectorAll("[id]");
      setHeaders([...elementsWithId]);
    }
  }, []);

  return (
    <div onClick={handleClick}>
      <svg
        className={className}
        width="36"
        height="36"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 12h.01M8 12h.01M16 12h.01"
        />
      </svg>
      {headers.length > 0 && isClicked && <ContentSidebar headers={headers} />}
    </div>
  );
}
