"use client";

import styles from "@/styles/post.module.css";
import { useEffect, useMemo, useState } from "react";
import ContentSidebar from "./ContentSidebar";
import IconPointTriple from "@/assets/icon-point-triple.svg?react";

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
    <>
      <IconPointTriple
        width={36}
        height={36}
        className={className}
        onClick={handleClick}
      />
      {headers.length > 0 && isClicked && (
        <ContentSidebar headers={headers} handleClick={handleClick} />
      )}
    </>
  );
}
