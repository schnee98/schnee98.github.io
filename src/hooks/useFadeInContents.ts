import { useEffect } from "react";
import { RefObject } from "react";

export function useFadeInContents(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (ref.current == null || ref.current.children == null) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.opacity = "1";
          } else {
            element.style.opacity = "0";
          }
        });
      },
      { threshold: 0.1 }
    );
    const contents = Array.from(ref.current.children);

    contents.forEach((content) => observer.observe(content));
    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
