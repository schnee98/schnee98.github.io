import { RefObject } from "react";
import styles from "@/styles/animation.module.css";
import { useEffect } from "react";

export function useBackgroundAnimation(
  ref: RefObject<HTMLElement>,
  duration: number,
  delay: number
) {
  useEffect(() => {
    startAnimation(ref, delay);
    const interval = setInterval(() => {
      startAnimation(ref, delay);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [duration, ref, delay]);
}

function renderWord(content: string) {
  return `<span class=${styles["up-span"]}><i class=${styles["up-icon"]}>${content}</i></span>`;
}

function renderNode(node: Element, index: number, delay: number) {
  node.setAttribute("style", `animation-delay: ${index * delay}s;`);
}

function renderSwiftUpElement(
  element: Element,
  ref: RefObject<HTMLElement>,
  delay: number
) {
  const words = element?.textContent?.split(" ") || [];

  element.innerHTML = "";

  words.forEach((_, index) => (words[index] = renderWord(words[index])));

  element.innerHTML = words.join(" ");

  const children = ref.current?.querySelectorAll("span > i");
  children?.forEach((node, index) => {
    renderNode(node, index, delay);
  });
}

function startAnimation(ref: RefObject<HTMLElement>, delay: number) {
  const swiftUpElements = ref.current?.querySelectorAll(".swift-up-text");
  swiftUpElements?.forEach((elem) => renderSwiftUpElement(elem, ref, delay));
}
