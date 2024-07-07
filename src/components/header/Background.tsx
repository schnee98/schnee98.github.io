"use client";

import { RefObject, useEffect, useRef } from "react";
import styles from "@/styles/page.module.css";

const ANIMATION_DURATION = 8000;

const renderWord = (content: string) =>
  `<span class=${styles.swiftUpSpan}><i class=${styles.swiftUpIcon}>${content}</i></span>`;

const renderNode = (node: Element, index: number) => node.setAttribute("style", `animation-delay: ${index * 0.2}s;`);

const renderSwiftUpElement = (element: Element, ref: RefObject<HTMLDivElement>) => {
  const words = element?.textContent?.split(" ") || [];

  element.innerHTML = "";

  words.forEach((_, index) => (words[index] = renderWord(words[index])));

  element.innerHTML = words.join(" ");

  const children = ref.current?.querySelectorAll("span > i");
  children?.forEach(renderNode);
};

const startAnimation = (ref: RefObject<HTMLDivElement>) => {
  const swiftUpElements = ref.current?.querySelectorAll(".swift-up-text");
  swiftUpElements?.forEach((elem) => renderSwiftUpElement(elem, ref));
};

const Background = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startAnimation(textRef);
    const interval = setInterval(() => startAnimation(textRef), ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={textRef} className={styles.animatedText}>
      <div className={styles.background}></div>
      <h1 className={`swift-up-text ${styles.swiftUpH1}`}>Welcome To </h1>
      <h1 className={`swift-up-text ${styles.swiftUpH1}`}>Schnee&rsquo;s Blog!</h1>
    </div>
  );
};

export default Background;
