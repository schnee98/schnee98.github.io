"use client";

import { useRef } from "react";
import styles from "./Background.module.css";
import { useBackgroundAnimation } from "@/hooks/useBackgroundAnimation";

const Background = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useBackgroundAnimation(textRef, 10_000, 0.2);

  return (
    <div ref={textRef}>
      <div className={styles.background}></div>
      <h1 className={`swift-up-text ${styles.heading}`}>Welcome To </h1>
      <h1 className={`swift-up-text ${styles.heading}`}>
        Schnee&rsquo;s Blog!
      </h1>
    </div>
  );
};

export default Background;
