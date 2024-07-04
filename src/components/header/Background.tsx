"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import styles from "@/styles/page.module.css";

const startAnimation = (ref: RefObject<HTMLDivElement>) => {
  const swiftUpElements = ref.current?.querySelectorAll(".swift-up-text");
  swiftUpElements?.forEach((elem) => {
    const words = elem?.textContent?.split(" ") || [];

    elem.innerHTML = "";

    words.forEach(
      (el, index) =>
        (words[index] = `<span class=${styles.swiftUpSpan}><i class=${styles.swiftUpIcon}>${words[index]}</i></span>`)
    );

    elem.innerHTML = words.join(" ");

    const children = ref.current?.querySelectorAll("span > i");
    children?.forEach((node, index) => node.setAttribute("style", `animation-delay: ${index * 0.2}s;`));
  });
};

const Background = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startAnimation(textRef);
    const interval = setInterval(() => startAnimation(textRef), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={textRef} className={styles.animatedText}>
      <div className={styles.background}></div>
      <h1 className={`swift-up-text ${styles.swiftUpH1}`}>Welcome To </h1>
      <h1 className={`swift-up-text ${styles.swiftUpH1}`}>Schnee&rsquo;s Blog</h1>
    </div>
  );
};

export default Background;
